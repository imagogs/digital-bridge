import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { tools } from '../data/tools';
import { badges } from '../data/badges';
import { getLessonsForModule } from '../data/lessonsManager';
import { LeaderboardOverlay } from './LeaderboardOverlay';

interface ProgressScreenProps {
  completedLessons: string[];
  earnedCertificates: string[];
}

const levelInfo = [
  { level: 'beginner',     label: 'Principiante', minXP: 0,    maxXP: 300,  color: 'bg-blue-500',    glow: 'rgba(59,130,246,0.3)'  },
  { level: 'intermediate', label: 'Intermedio',   minXP: 300,  maxXP: 700,  color: 'bg-amber-400',   glow: 'rgba(245,158,11,0.3)'  },
  { level: 'advanced',     label: 'Avanzato',     minXP: 700,  maxXP: 1200, color: 'bg-emerald-500', glow: 'rgba(52,211,153,0.3)'  },
  { level: 'master',       label: 'Master',       minXP: 1200, maxXP: 9999, color: 'bg-violet-500',  glow: 'rgba(139,92,246,0.35)' },
];

export function ProgressScreen({ completedLessons, earnedCertificates }: ProgressScreenProps) {
  const { profile } = useAuth();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const allLessons = tools.flatMap(t => getLessonsForModule(t.id, 'it'));
  const totalXP = allLessons
    .filter(l => completedLessons.includes(l.id))
    .reduce((s, l) => s + l.xp, 0);

  const currentLevel = levelInfo.find(l => totalXP >= l.minXP && totalXP < l.maxXP) || levelInfo[0];
  const levelProgress = ((totalXP - currentLevel.minXP) / (currentLevel.maxXP - currentLevel.minXP)) * 100;

  // Badge earned logic
  const isModuleComplete = (moduleId: string) => {
    const lessons = getLessonsForModule(moduleId, 'it');
    return lessons.length > 0 && lessons.every(l => completedLessons.includes(l.id));
  };
  const hasCert = (moduleId: string) => earnedCertificates.includes(moduleId);
  const allBaseComplete = tools.filter(t => t.level === 'base').every(t => isModuleComplete(t.id));

  const isBadgeEarned = (badge: typeof badges[0]) => {
    if (badge.condition === 'first_login') return true;
    if (badge.condition === 'all_base') return allBaseComplete;
    if (badge.condition === 'module_complete' && badge.moduleId) return isModuleComplete(badge.moduleId);
    if (badge.condition === 'exam_passed' && badge.moduleId) return hasCert(badge.moduleId);
    return false;
  };

  return (
    <motion.div
      className="absolute inset-0 z-10 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-full bg-gradient-to-b from-black/75 via-black/65 to-black/85 p-6 md:p-10 relative">
        {/* Ambient glow */}
        <div
          className="absolute top-0 inset-x-0 h-64 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 100% at 50% -10%, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        />
        <div className="max-w-4xl mx-auto relative">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-white/30 text-[10px] font-mono tracking-[0.35em] uppercase mb-2">I tuoi progressi</p>
              <h1 className="font-display italic text-5xl text-white tracking-tight">Percorso & Badge</h1>
            </div>
            <button
              onClick={() => setShowLeaderboard(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 border border-amber-500/25
                         hover:bg-amber-500/18 hover:border-amber-500/40 text-amber-300
                         rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              Classifica
            </button>
          </motion.div>

          {/* XP & Level — hero card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-[#111111] border border-white/[0.07] rounded-3xl p-6 mb-5 relative overflow-hidden"
          >
            {/* Subtle level glow */}
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${currentLevel.glow} 0%, transparent 70%)`,
                transform: 'translate(30%, -30%)',
              }}
            />
            <div className="flex items-center justify-between mb-5 relative">
              <div>
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-wider mb-1.5">Livello attuale</p>
                <h2 className="font-serif text-3xl text-white">{currentLevel.label}</h2>
              </div>
              <div className="text-right">
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-wider mb-1.5">XP Totali</p>
                <p className="text-amber-400 font-bold text-4xl font-mono flex items-center gap-2 tabular-nums">
                  <Zap className="w-5 h-5" /> {totalXP.toLocaleString('it-IT')}
                </p>
              </div>
            </div>
            <div className="h-3 bg-white/[0.07] rounded-full overflow-hidden mb-2 relative">
              <motion.div
                className={`h-full rounded-full ${currentLevel.color} relative overflow-hidden`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(levelProgress, 100)}%` }}
                transition={{ duration: 0.9, delay: 0.35 }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                  }}
                />
              </motion.div>
            </div>
            <div className="flex justify-between text-[10px] text-white/25 font-mono tabular-nums mb-5">
              <span>{currentLevel.minXP} XP</span>
              <span>{currentLevel.maxXP === 9999 ? '∞' : `${currentLevel.maxXP} XP`}</span>
            </div>

            {/* Level progression */}
            <div className="flex items-center gap-3">
              {levelInfo.slice(0, 3).map((lvl, i) => {
                const reached = totalXP >= lvl.minXP;
                return (
                  <React.Fragment key={lvl.level}>
                    <div className="flex flex-col items-center gap-1.5">
                      <motion.div
                        animate={reached ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold
                          ${reached ? `${lvl.color} border-transparent text-black` : 'border-white/15 text-white/25'}`}
                      >
                        {reached ? '✓' : i + 1}
                      </motion.div>
                      <span className={`text-[10px] font-medium ${reached ? 'text-white/55' : 'text-white/20'}`}>
                        {lvl.label}
                      </span>
                    </div>
                    {i < 2 && (
                      <div className={`flex-1 h-0.5 rounded-full transition-all duration-700
                        ${totalXP >= levelInfo[i + 1].minXP ? lvl.color : 'bg-white/[0.08]'}`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </motion.div>

          {/* Module progress */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-5">
            <p className="text-white/30 text-[10px] font-mono tracking-[0.25em] uppercase mb-4">Avanzamento moduli</p>
            <div className="space-y-2.5">
              {tools.filter(t => !t.locked).map((tool) => {
                const Icon = tool.icon;
                const lessons = getLessonsForModule(tool.id, 'it');
                const done = lessons.filter(l => completedLessons.includes(l.id)).length;
                const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0;
                const certified = hasCert(tool.id);
                const isComplete = pct === 100;
                return (
                  <div
                    key={tool.id}
                    className={`flex items-center gap-4 p-4 border rounded-2xl transition-colors ${
                      isComplete
                        ? 'bg-emerald-500/6 border-emerald-500/20'
                        : 'bg-[#111111] border-white/[0.07]'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: isComplete ? '#34d39920' : `${tool.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: isComplete ? '#34d399' : tool.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-white/30 text-[10px] font-mono">{tool.moduleCode}</span>
                        <span className={`text-sm font-semibold ${isComplete ? 'text-emerald-300' : 'text-white'}`}>
                          {tool.name}
                        </span>
                        {certified && (
                          <span className="text-amber-400 text-[10px] bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.5 rounded-full font-medium">
                            🏅 Certificato
                          </span>
                        )}
                      </div>
                      <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: isComplete ? '#34d399' : tool.color }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`font-bold text-sm font-mono tabular-nums ${isComplete ? 'text-emerald-400' : 'text-white'}`}>
                        {isComplete ? '✓' : `${pct}%`}
                      </p>
                      <p className="text-white/25 text-[10px] font-mono tabular-nums">{done}/{lessons.length}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p className="text-white/30 text-[10px] font-mono tracking-[0.25em] uppercase mb-4">
              Badge — {badges.filter(isBadgeEarned).length}/{badges.length} ottenuti
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {badges.map((badge) => {
                const earned = isBadgeEarned(badge);
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-3xl border transition-all ${
                      earned
                        ? 'bg-amber-500/8 border-amber-500/25'
                        : 'bg-[#0d0d0d] border-white/[0.04] opacity-35'
                    }`}
                  >
                    <div className="text-3xl mb-2.5">{earned ? badge.icon : '🔒'}</div>
                    <p className={`text-sm font-semibold mb-1 ${earned ? 'text-white' : 'text-white/40'}`}>
                      {badge.title}
                    </p>
                    <p className="text-white/35 text-xs leading-relaxed">{badge.description}</p>
                    {earned && (
                      <p className="text-amber-400 text-[11px] mt-2.5 flex items-center gap-1 font-mono tabular-nums">
                        <Zap className="w-3 h-3" /> +{badge.xpReward} XP
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="h-16" />
        </div>
      </div>

      <AnimatePresence>
        {showLeaderboard && (
          <LeaderboardOverlay onClose={() => setShowLeaderboard(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
