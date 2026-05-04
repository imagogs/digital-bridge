import { supabase } from './supabase';

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
}

/**
 * Call this every time a lesson is completed.
 * Updates the user_streaks table and returns the new streak value.
 * Falls back to localStorage for users who aren't signed in.
 */
export async function updateStreak(userId: string | null): Promise<StreakData> {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // ── Guest mode: localStorage fallback ────────────────────────────────────
  if (!userId) {
    const raw = localStorage.getItem('db_streak');
    const local: StreakData = raw
      ? JSON.parse(raw)
      : { currentStreak: 0, longestStreak: 0, lastStudyDate: null };

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];

    let next: StreakData;
    if (local.lastStudyDate === today) {
      next = local; // already counted today
    } else if (local.lastStudyDate === yStr) {
      next = {
        currentStreak: local.currentStreak + 1,
        longestStreak: Math.max(local.longestStreak, local.currentStreak + 1),
        lastStudyDate: today,
      };
    } else {
      next = { currentStreak: 1, longestStreak: Math.max(local.longestStreak, 1), lastStudyDate: today };
    }

    localStorage.setItem('db_streak', JSON.stringify(next));
    return next;
  }

  // ── Authenticated: Supabase upsert ────────────────────────────────────────
  try {
    const { data: existing } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];

    let newCurrent: number;
    if (!existing || existing.last_study_date === null) {
      newCurrent = 1;
    } else if (existing.last_study_date === today) {
      // Already studied today — no change
      return {
        currentStreak: existing.current_streak,
        longestStreak: existing.longest_streak,
        lastStudyDate: existing.last_study_date,
      };
    } else if (existing.last_study_date === yStr) {
      newCurrent = existing.current_streak + 1;
    } else {
      newCurrent = 1; // streak broken
    }

    const newLongest = Math.max(existing?.longest_streak ?? 0, newCurrent);

    await supabase.from('user_streaks').upsert(
      {
        user_id: userId,
        last_study_date: today,
        current_streak: newCurrent,
        longest_streak: newLongest,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );

    return { currentStreak: newCurrent, longestStreak: newLongest, lastStudyDate: today };
  } catch {
    // Network error — return current localStorage value as fallback
    const raw = localStorage.getItem('db_streak');
    return raw ? JSON.parse(raw) : { currentStreak: 0, longestStreak: 0, lastStudyDate: null };
  }
}

/** Read the streak without updating it (for display). */
export async function getStreak(userId: string | null): Promise<StreakData> {
  if (!userId) {
    const raw = localStorage.getItem('db_streak');
    return raw ? JSON.parse(raw) : { currentStreak: 0, longestStreak: 0, lastStudyDate: null };
  }

  try {
    const { data } = await supabase
      .from('user_streaks')
      .select('current_streak, longest_streak, last_study_date')
      .eq('user_id', userId)
      .single();

    if (!data) return { currentStreak: 0, longestStreak: 0, lastStudyDate: null };
    return {
      currentStreak: data.current_streak,
      longestStreak: data.longest_streak,
      lastStudyDate: data.last_study_date,
    };
  } catch {
    return { currentStreak: 0, longestStreak: 0, lastStudyDate: null };
  }
}
