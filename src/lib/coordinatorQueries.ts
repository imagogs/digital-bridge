import { supabase } from './supabase';
import { getLessonsForModule } from '../data/lessonsManager';

// The 6 base modules and how many lessons each has
const BASE_MODULES = ['spid', 'pec', 'email', 'word', 'excel', 'portali-pa'] as const;
type ModuleId = typeof BASE_MODULES[number];

function getLessonCount(moduleId: string): number {
  return getLessonsForModule(moduleId, 'it').length;
}

function getLessonIds(moduleId: string): string[] {
  return getLessonsForModule(moduleId, 'it').map(l => l.id);
}

export interface StudentData {
  id: string;
  name: string;
  contactEmail: string;
  lastActivity: string;
  // Module progress 0-100%
  spid: number;
  pec: number;
  emailMod: number;
  word: number;
  excel: number;
  portaliPa: number;
  status: 'active' | 'inactive' | 'at-risk' | 'complete';
  alert: string | null;
}

function computeModulePct(completedIds: string[], moduleId: string): number {
  const total = getLessonCount(moduleId);
  if (total === 0) return 0;
  const lessonIds = getLessonIds(moduleId);
  const done = completedIds.filter(id => lessonIds.includes(id)).length;
  return Math.round((done / total) * 100);
}

function computeStatus(
  pcts: number[],
  lastDate: string | null
): { status: StudentData['status']; alert: string | null } {
  const allComplete = pcts.every(p => p === 100);
  if (allComplete) return { status: 'complete', alert: null };

  const now = new Date();
  const last = lastDate ? new Date(lastDate) : null;
  const daysSince = last
    ? Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))
    : 999;

  if (daysSince >= 7) {
    return {
      status: 'inactive',
      alert: `Inattivo/a da ${daysSince} giorni`,
    };
  }

  // At-risk: previous module complete but current at 0%
  for (let i = 1; i < pcts.length; i++) {
    if (pcts[i - 1] === 100 && pcts[i] === 0) {
      const moduleNames = ['SPID', 'PEC', 'Email', 'Word', 'Excel', 'Portali PA'];
      return {
        status: 'at-risk',
        alert: `Bloccato/a al modulo ${moduleNames[i]}`,
      };
    }
  }

  return { status: 'active', alert: null };
}

function formatLastActivity(isoString: string | null): string {
  if (!isoString) return 'mai';
  const d = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMs / 3600000);
  const diffD = Math.floor(diffMs / 86400000);

  if (diffMin < 60) return `${diffMin} min fa`;
  if (diffH < 24) return `${diffH} ore fa`;
  if (diffD === 1) return '1 giorno fa';
  return `${diffD} giorni fa`;
}

/**
 * Fetch all student progress data for the coordinator panel.
 * Requires RLS policies that allow coordinator-level access.
 */
export async function fetchAllStudentProgress(): Promise<StudentData[]> {
  // 1. Load all profiles
  const { data: profiles, error: profilesErr } = await supabase
    .from('profiles')
    .select('id, email, display_name, displayName, updated_at, updatedAt')
    .order('created_at', { ascending: true });

  if (profilesErr || !profiles) {
    console.error('coordinatorQueries: profiles fetch failed', profilesErr);
    return [];
  }

  // 2. Load all lesson progress
  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('user_id, lesson_id, completed_at');

  // 3. Build a map: userId → completed lesson IDs + latest activity
  const progressByUser: Record<string, { lessonIds: string[]; lastDate: string | null }> = {};
  for (const row of progress ?? []) {
    if (!progressByUser[row.user_id]) {
      progressByUser[row.user_id] = { lessonIds: [], lastDate: null };
    }
    progressByUser[row.user_id].lessonIds.push(row.lesson_id);
    const current = progressByUser[row.user_id].lastDate;
    if (!current || row.completed_at > current) {
      progressByUser[row.user_id].lastDate = row.completed_at;
    }
  }

  // 4. Compute per-student data
  return profiles.map((p: any): StudentData => {
    const userId = p.id;
    const userProgress = progressByUser[userId] ?? { lessonIds: [], lastDate: null };
    const completed = userProgress.lessonIds;

    const spid = computeModulePct(completed, 'spid');
    const pec = computeModulePct(completed, 'pec');
    const emailMod = computeModulePct(completed, 'email');
    const word = computeModulePct(completed, 'word');
    const excel = computeModulePct(completed, 'excel');
    const portaliPa = computeModulePct(completed, 'portali-pa');

    const pcts = [spid, pec, emailMod, word, excel, portaliPa];
    const { status, alert } = computeStatus(pcts, userProgress.lastDate);

    return {
      id: userId,
      name: p.displayName || p.display_name || p.email?.split('@')[0] || 'Utente',
      contactEmail: p.email || '',
      lastActivity: formatLastActivity(userProgress.lastDate),
      spid,
      pec,
      emailMod,
      word,
      excel,
      portaliPa,
      status,
      alert,
    };
  });
}

/**
 * Fetch top 20 users by XP for the leaderboard.
 * Names are anonymised: "Mario R."
 */
export interface LeaderboardEntry {
  rank: number;
  displayName: string;
  xp: number;
  completedModules: number;
  isCurrentUser: boolean;
}

export async function fetchLeaderboard(currentUserId: string | null): Promise<LeaderboardEntry[]> {
  // Sum XP per user from lesson_progress
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('user_id, xp');

  if (error || !data) return [];

  // Aggregate XP per user
  const xpByUser: Record<string, number> = {};
  for (const row of data) {
    xpByUser[row.user_id] = (xpByUser[row.user_id] ?? 0) + (row.xp ?? 0);
  }

  // Get display names for top users
  const sortedIds = Object.entries(xpByUser)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([id]) => id);

  if (sortedIds.length === 0) return [];

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, displayName, display_name, email')
    .in('id', sortedIds);

  const profileMap: Record<string, string> = {};
  for (const p of profiles ?? []) {
    const raw: string = p.displayName || p.display_name || p.email?.split('@')[0] || '?';
    // Anonymise: "Mario Rossi" → "Mario R."
    const parts = raw.trim().split(/\s+/);
    profileMap[p.id] =
      parts.length >= 2
        ? `${parts[0]} ${parts[parts.length - 1][0]}.`
        : parts[0];
  }

  // Count completed modules per user
  const { data: certs } = await supabase
    .from('certificates')
    .select('user_id, module_id')
    .in('user_id', sortedIds);

  const certsByUser: Record<string, number> = {};
  for (const c of certs ?? []) {
    certsByUser[c.user_id] = (certsByUser[c.user_id] ?? 0) + 1;
  }

  return sortedIds.map((id, i) => ({
    rank: i + 1,
    displayName: profileMap[id] ?? '—',
    xp: xpByUser[id] ?? 0,
    completedModules: certsByUser[id] ?? 0,
    isCurrentUser: id === currentUserId,
  }));
}
