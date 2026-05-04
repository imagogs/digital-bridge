import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap, BookOpen, TrendingUp, Flame, Trophy,
  Bell, Pin, Info, CheckCircle2, RefreshCw,
  ChevronRight, Library, User, Clock, Target,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { tools } from '../data/tools';
import { getLessonsForModule } from '../data/lessonsManager';
import { announcements, type Announcement } from '../data/announcements';
import type { StreakData } from '../lib/streakTracker';

interface HomeDashboardProps {
  completedLessons: string[];
  onOpenModule: (id: string) => void;
  streak?: StreakData;
  earnedCertificates?: string[];
  onOpenProfile?: () => void;
  onGoToLibrary?: () => void;
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ── SVG Progress Ring ─────────────────────────────────────────────────────────
function ProgressRing({
  pct, size, stroke, color,
  trackColor = 'rgba(255,255,255,0.06)',
}: {
  pct: number; size: number; stroke: number; color: string; trackColor?: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </svg>
  );
}

// ── Weekly activity bars ──────────────────────────────────────────────────────
function WeeklyChart({ streak }: { streak?: StreakData }) {
  const dayLabels = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];
  const lastStudyISO = streak?.lastStudyDate ?? null;
  const currentStreak = streak?.currentStreak ?? 0;

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dISO = d.toISOString().split('T')[0];
    const jsDay = d.getDay(); // 0=Sun
    const label = dayLabels[jsDay === 0 ? 6 : jsDay - 1];
    const isToday = dISO === todayISO;

    let active = false;
    if (lastStudyISO && currentStreak > 0) {
      const last = new Date(lastStudyISO);
      const dDate = new Date(dISO);
      const diffFromLast = Math.round(
        (last.getTime() - dDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      active = diffFromLast >= 0 && diffFromLast < currentStreak;
    }
    return { label, isToday, active };
  });

  return (
    <div className="flex items-end justify-between gap-1.5">
      {days.map((day, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.1 * i + 0.3, duration: 0.4, ease }}
            style={{ height: day.active ? '36px' : '20px', originY: 1 } as React.CSSProperties}
            className={`w-full rounded-lg transition-colors ${
              day.active
                ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]'
                : day.isToday
                ? 'bg-white/10 border border-white/15'
                : 'bg-white/[0.04]'
            }`}
          />
          <span className={`text-[9px] font-mono uppercase ${
            day.isToday ? 'text-white/60' : 'text-white/20'
          }`}>
            {day.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Announcement type meta ────────────────────────────────────────────────────
const annMeta: Record<
  Announcement['type'],
  { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string }
> = {
  pin:     { icon: Pin,          color: 'text-indigo-400',  bg: 'bg-indigo-500/8',  border: 'border-indigo-500/20' },
  info:    { icon: Info,         color: 'text-sky-400',     bg: 'bg-sky-500/8',     border: 'border-sky-500/20'    },
  update:  { icon: RefreshCw,    color: 'text-amber-400',   bg: 'bg-amber-500/8',   border: 'border-amber-500/20'  },
  success: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-500/20' },
};

// ── XP level thresholds ───────────────────────────────────────────────────────
const XP_LEVELS = [
  { key: 'home.lvl0', threshold: 0,   next: 100  },
  { key: 'home.lvl1', threshold: 100,  next: 300  },
  { key: 'home.lvl2', threshold: 300,  next: 600  },
  { key: 'home.lvl3', threshold: 600,  next: 1000 },
];

function getXPLevel(xp: number) {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].threshold) {
      return { ...XP_LEVELS[i], index: i };
    }
  }
  return { ...XP_LEVELS[0], index: 0 };
}

// ── Main component ────────────────────────────────────────────────────────────
export function HomeDashboard({
  completedLessons,
  onOpenModule,
  streak,
  earnedCertificates = [],
  onOpenProfile,
  onGoToLibrary,
}: HomeDashboardProps) {
  const { profile } = useAuth();
  const { t, lang } = useLanguage();
  const [expandedAnn, setExpandedAnn] = useState<string | null>(null);

  // ── Computed stats ─────────────────────────────────────────────────────────
  const allLessons = tools.flatMap(tool => getLessonsForModule(tool.id, 'it'));
  const totalLessons = allLessons.length;
  const completedLessonData = allLessons.filter(l => completedLessons.includes(l.id));
  const completedCount = completedLessonData.length;

  const totalXP = completedLessonData.reduce((sum, l) => sum + l.xp, 0);
  const overallPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Total study time (sum of lesson durations)
  const totalStudyMinutes = completedLessonData.reduce((sum, l) => {
    return sum + (parseInt(l.duration) || 10);
  }, 0);
  const studyHours = Math.floor(totalStudyMinutes / 60);
  const studyMins = totalStudyMinutes % 60;
  const studyTimeLabel = studyHours > 0
    ? `${studyHours}h ${studyMins > 0 ? studyMins + 'm' : ''}`
    : `${studyMins || 0}m`;

  // XP level
  const xpLevel = getXPLevel(totalXP);
  const xpToNext = xpLevel.next - xpLevel.threshold;
  const xpProgress = Math.min(100, Math.round(((totalXP - xpLevel.threshold) / xpToNext) * 100));

  // ── User info ──────────────────────────────────────────────────────────────
  const fullName = profile?.displayName || t('home.defaultUser');
  const firstName = fullName.split(' ')[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t('home.goodMorning') : hour < 18 ? t('home.goodAfternoon') : t('home.goodEvening');
  const initials = fullName
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w.charAt(0).toUpperCase())
    .join('');

  // ── Next module to continue ────────────────────────────────────────────────
  const baseTools = tools.filter(t => t.level === 'base');
  const inProgressModule = baseTools.find(tool => {
    const lessons = getLessonsForModule(tool.id, 'it');
    const done = lessons.filter(l => completedLessons.includes(l.id)).length;
    return done > 0 && done < lessons.length;
  });
  const nextModule = baseTools.find(tool => {
    const lessons = getLessonsForModule(tool.id, 'it');
    return !lessons.some(l => completedLessons.includes(l.id));
  });
  const activeModule = inProgressModule || nextModule;
  const activeModuleLessons = activeModule ? getLessonsForModule(activeModule.id, 'it') : [];
  const activeModuleDone = activeModuleLessons.filter(l => completedLessons.includes(l.id)).length;
  const activeModulePct = activeModuleLessons.length > 0
    ? Math.round((activeModuleDone / activeModuleLessons.length) * 100)
    : 0;

  // ── Announcements ──────────────────────────────────────────────────────────
  const unreadCount = announcements.filter(a => a.unread).length;

  return (
    <motion.div
      className="absolute inset-0 z-10 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <div className="min-h-full bg-gradient-to-b from-black/80 via-black/70 to-black/90 p-5 md:p-8 relative">

        {/* Ambient glow */}
        <div
          className="absolute top-0 inset-x-0 h-96 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 100% at 50% -5%, rgba(99,102,241,0.10) 0%, transparent 70%)' }}
        />

        <div className="max-w-2xl mx-auto relative space-y-6">

          {/* ── HEADER ──────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.5, ease }}
            className="flex items-center gap-5"
          >
            {/* Avatar — large, clickable */}
            <button
              onClick={onOpenProfile}
              className="relative shrink-0 group"
              title="Modifica profilo"
            >
              {profile?.photoURL ? (
                <img
                  src={profile.photoURL}
                  alt="Avatar"
                  className="w-20 h-20 rounded-2xl border-2 border-white/10 object-cover
                             group-hover:border-indigo-400/50 transition-colors shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-indigo-500/15 border-2 border-indigo-500/20
                               flex items-center justify-center text-2xl font-serif text-indigo-300
                               group-hover:border-indigo-400/50 transition-colors select-none shadow-lg">
                  {initials || <User className="w-8 h-8 text-indigo-400" />}
                </div>
              )}
            </button>

            {/* Name + greeting — vertically centered */}
            <div className="flex-1 min-w-0">
              <p className="text-white/40 text-sm font-light leading-none mb-1">{greeting},</p>
              <h1 className="font-display italic text-5xl md:text-6xl text-white tracking-tight leading-none truncate">
                {firstName}.
              </h1>
              <p className="text-white/30 text-xs mt-2 leading-relaxed max-w-xs">
                {completedCount === 0
                  ? t('home.firstStep')
                  : completedCount < 6
                  ? `${completedCount} ${completedCount === 1 ? t('home.lessonCountSingular') : t('home.lessonCountPlural')}`
                  : t('home.goodRhythm')}
              </p>
            </div>

            {/* Streak + bell */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              {streak && streak.currentStreak > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 20, delay: 0.3 }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-orange-500/12 border border-orange-500/30 rounded-xl"
                >
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-orange-300 text-xs font-bold tabular-nums">{streak.currentStreak}{t('home.dayAbbr')}</span>
                </motion.div>
              )}
              <button
                onClick={() => {
                  document.getElementById('section-announcements')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
              >
                <Bell className="w-4 h-4 text-white/40" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]" />
                )}
              </button>
            </div>
          </motion.div>

          {/* ── PROGRESS RING + STATS ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.13, duration: 0.5, ease }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
          >
            <p className="text-white/20 text-[10px] font-mono tracking-[0.25em] uppercase mb-4">
              {t('home.basePath2')}
            </p>
            <div className="flex items-center gap-5">
              {/* Donut */}
              <div className="relative shrink-0 flex items-center justify-center">
                <ProgressRing pct={overallPct} size={100} stroke={8} color="#6366f1" />
                <div className="absolute flex flex-col items-center">
                  <span className="font-mono text-xl font-bold text-white tabular-nums">{overallPct}</span>
                  <span className="text-white/30 text-[9px] font-mono">%</span>
                </div>
              </div>
              {/* 2×2 stats */}
              <div className="flex-1 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-500/8 border border-blue-500/15">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <div>
                    <p className="font-mono text-sm font-bold text-white tabular-nums">
                      {completedCount}<span className="text-white/25 text-[10px] font-normal">/{totalLessons}</span>
                    </p>
                    <p className="text-blue-300/60 text-[9px]">{t('home.lessonsLabel')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/8 border border-amber-500/15">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <div>
                    <p className="font-mono text-sm font-bold text-amber-300 tabular-nums">
                      {totalXP}<span className="text-amber-400/45 text-[10px] font-normal ml-0.5">XP</span>
                    </p>
                    <p className="text-amber-300/55 text-[9px]">{t('home.pointsLabel')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-orange-500/8 border border-orange-500/15">
                  <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <div>
                    <p className="font-mono text-sm font-bold text-orange-300 tabular-nums">
                      {streak?.currentStreak ?? 0}<span className="text-orange-400/45 text-[10px] font-normal ml-0.5">gg</span>
                    </p>
                    <p className="text-orange-300/55 text-[9px]">Streak 🔥</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-yellow-500/8 border border-yellow-500/15">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <div>
                    <p className="font-mono text-sm font-bold text-yellow-300 tabular-nums">
                      {earnedCertificates.length}<span className="text-yellow-400/45 text-[10px] font-normal ml-0.5">/6</span>
                    </p>
                    <p className="text-yellow-300/55 text-[9px]">{t('home.certsLabel')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── ACTIVITY INFOGRAPHIC ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.21, duration: 0.5, ease }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 space-y-5"
          >
            <p className="text-white/20 text-[10px] font-mono tracking-[0.25em] uppercase">
              {t('home.studyActivity')}
            </p>

            {/* Weekly activity chart */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/35 text-xs">{t('home.last7days')}</span>
                {streak && streak.currentStreak > 0 && (
                  <span className="text-indigo-400 text-[10px] font-mono">
                    {streak.currentStreak} {streak.currentStreak === 1 ? t('home.dayFull') : t('home.daysFull')} {t('home.streakSuffix')} 🔥
                  </span>
                )}
              </div>
              <WeeklyChart streak={streak} />
            </div>

            {/* Horizontal divider */}
            <div className="border-t border-white/[0.06]" />

            {/* 3-stat row */}
            <div className="grid grid-cols-3 gap-3">
              {/* Time studied */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-sky-400" />
                  <span className="text-sky-400/70 text-[9px] font-mono uppercase tracking-wider">{t('home.studyTimeLabel')}</span>
                </div>
                <p className="font-mono text-lg font-bold text-white tabular-nums leading-none">
                  {studyTimeLabel || '0m'}
                </p>
                <p className="text-white/25 text-[9px]">{t('home.totalStudy')}</p>
              </div>

              {/* Best streak */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400/70 text-[9px] font-mono uppercase tracking-wider">{t('home.recordLabel')}</span>
                </div>
                <p className="font-mono text-lg font-bold text-white tabular-nums leading-none">
                  {streak?.longestStreak ?? 0}{t('home.dayAbbr')}
                </p>
                <p className="text-white/25 text-[9px]">{t('home.bestStreak')}</p>
              </div>

              {/* XP level */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Target className="w-3 h-3 text-purple-400" />
                  <span className="text-purple-400/70 text-[9px] font-mono uppercase tracking-wider">{t('home.levelLabel')}</span>
                </div>
                <p className="font-mono text-lg font-bold text-white tabular-nums leading-none">
                  {t(xpLevel.key)}
                </p>
                <p className="text-white/25 text-[9px]">{totalXP} / {xpLevel.next} XP</p>
              </div>
            </div>

            {/* XP level progress bar */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-white/20 text-[9px] font-mono">{t(xpLevel.key)}</span>
                <span className="text-white/20 text-[9px] font-mono">
                  {t(XP_LEVELS[Math.min(xpLevel.index + 1, XP_LEVELS.length - 1)]?.key ?? 'home.lvl3')}
                </span>
              </div>
              <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #a78bfa)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1.1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
              <p className="text-white/20 text-[9px] font-mono mt-1 text-right">
                {xpLevel.next - totalXP > 0 ? `${xpLevel.next - totalXP} ${t('home.xpToNext')}` : t('home.maxLevel')}
              </p>
            </div>
          </motion.div>

          {/* ── LIBRARY CTA ──────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, ease }}
          >
            <motion.button
              onClick={onGoToLibrary}
              whileHover={{ scale: 1.015, y: -2, boxShadow: '0 16px 48px -8px rgba(99,102,241,0.40)' }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              className="w-full flex items-center gap-4 p-5 rounded-2xl
                         bg-gradient-to-r from-indigo-600/20 to-purple-600/15
                         border border-indigo-500/30 hover:border-indigo-400/55
                         transition-colors text-left group cursor-pointer"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0
                              group-hover:bg-indigo-500/30 transition-colors">
                <Library className="w-5 h-5 text-indigo-300" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                {activeModule ? (
                  <>
                    <p className="text-white/40 text-[10px] font-mono tracking-wider uppercase mb-0.5">
                      {inProgressModule ? t('home.continueFromLabel') : t('home.startWithLabel')}
                    </p>
                    <p className="text-white font-semibold text-sm">
                      {activeModule.moduleCode} · {activeModule.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1 bg-white/[0.08] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${activeModulePct}%`, backgroundColor: activeModule.color }}
                        />
                      </div>
                      <span className="text-white/30 text-[10px] font-mono tabular-nums shrink-0">
                        {activeModulePct}%
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-white/40 text-[10px] font-mono tracking-wider uppercase mb-0.5">
                      {t('home.pathComplete')}
                    </p>
                    <p className="text-white font-semibold text-sm">{t('home.goToLibrary')}</p>
                    <p className="text-white/30 text-[11px] mt-0.5">{t('home.reviewModules')}</p>
                  </>
                )}
              </div>

              {/* Arrow */}
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 group-hover:bg-indigo-500/35
                              transition-colors flex items-center justify-center shrink-0">
                <ChevronRight className="w-4 h-4 text-indigo-400" />
              </div>
            </motion.button>
          </motion.div>

          {/* ── COMUNICAZIONI DALL'ENTE ──────────────────────────────────────── */}
          <motion.div
            id="section-announcements"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, ease }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-3.5 h-3.5 text-white/20" />
              <p className="text-white/20 text-[10px] font-mono tracking-[0.25em] uppercase flex-1">
                {t('home.announcements')}
              </p>
              {unreadCount > 0 && (
                <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/12 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                  {unreadCount} {t('home.newAnn')}
                </span>
              )}
            </div>

            <div className="space-y-2">
              {announcements.map(ann => {
                const meta = annMeta[ann.type];
                const AnnIcon = meta.icon;
                const isExpanded = expandedAnn === ann.id;
                const title = lang === 'en' ? ann.title_en : ann.title_it;
                const body  = lang === 'en' ? ann.body_en  : ann.body_it;
                const dateLabel = new Date(ann.date).toLocaleDateString('it-IT', {
                  day: 'numeric', month: 'long', year: 'numeric',
                });

                return (
                  <motion.div
                    key={ann.id}
                    layout
                    className={`rounded-2xl border ${meta.bg} ${meta.border} overflow-hidden cursor-pointer`}
                    onClick={() => setExpandedAnn(isExpanded ? null : ann.id)}
                  >
                    <div className="flex items-start gap-3 p-3.5">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${meta.bg} border ${meta.border}`}>
                        <AnnIcon className={`w-3.5 h-3.5 ${meta.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-white leading-tight">{title}</p>
                          {ann.unread && (
                            <span className={`w-1.5 h-1.5 rounded-full ${meta.color.replace('text-', 'bg-')} shrink-0`} />
                          )}
                        </div>
                        <p className="text-white/25 text-[10px] font-mono">{dateLabel}</p>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-white/15 shrink-0 mt-1 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                          <p className="px-4 pb-4 text-white/50 text-sm leading-relaxed border-t border-white/[0.05] pt-3">
                            {body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Spacer for nav bar */}
          <div className="h-24" />
        </div>
      </div>
    </motion.div>
  );
}
