import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Zap, CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import { Lesson } from '../data/lessons';
import { getLessonsForModule } from '../data/lessonsManager';
import { LessonOverlay } from './LessonOverlay';
import { useLanguage } from '../contexts/LanguageContext';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface ModuleOverlayProps {
  moduleId: string;
  moduleName: string;
  moduleDescription: string;
  completedLessons: string[];
  onLessonComplete: (lessonId: string, xp: number) => void;
  onClose: () => void;
}

export function ModuleOverlay({
  moduleId,
  moduleName,
  moduleDescription,
  completedLessons,
  onLessonComplete,
  onClose,
}: ModuleOverlayProps) {
  const { t, lang } = useLanguage();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  useEscapeKey(onClose);
  const lessons = getLessonsForModule(moduleId, lang);

  const isLessonUnlocked = (lesson: Lesson) => {
    if (lesson.number === 1) return true;
    const prev = lessons.find(l => l.number === lesson.number - 1);
    return prev ? completedLessons.includes(prev.id) : false;
  };

  const handleLessonComplete = (lesson: Lesson) => {
    onLessonComplete(lesson.id, lesson.xp);
    setActiveLesson(null);
  };

  const completedCount = lessons.filter(l => completedLessons.includes(l.id)).length;
  const totalXP = lessons.reduce((sum, l) => sum + l.xp, 0);

  if (activeLesson) {
    return (
      <motion.div
        key="lesson"
        className="absolute inset-0 z-40 flex items-center justify-center p-6 sm:p-10 bg-black/80 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <LessonOverlay
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          onComplete={() => handleLessonComplete(activeLesson)}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <p className="text-white/40 text-xs font-mono tracking-widest uppercase mb-1">{t('module.label')}</p>
          <h2 className="font-serif text-4xl text-white mb-2">{moduleName}</h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-md">{moduleDescription}</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full glass-panel-dark flex items-center justify-center hover:bg-white/10 transition-colors text-white/50 hover:text-white ml-4 shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="glass-panel-dark rounded-xl p-4 text-center">
          <p className="text-2xl font-medium text-white">{completedCount}/{lessons.length}</p>
          <p className="text-white/40 text-xs mt-1">{t('module.lessonsCompleted')}</p>
        </div>
        <div className="glass-panel-dark rounded-xl p-4 text-center">
          <p className="text-2xl font-medium text-yellow-400">{totalXP} XP</p>
          <p className="text-white/40 text-xs mt-1">{t('module.totalXP')}</p>
        </div>
        <div className="glass-panel-dark rounded-xl p-4 text-center">
          <p className="text-2xl font-medium text-white">
            {lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0}%
          </p>
          <p className="text-white/40 text-xs mt-1">{t('module.progress')}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full mb-6">
        <motion.div
          className="h-full bg-blue-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Lesson list */}
      <div className="space-y-3">
        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isUnlocked = isLessonUnlocked(lesson);

          return (
            <button
              key={lesson.id}
              onClick={() => isUnlocked && setActiveLesson(lesson)}
              disabled={!isUnlocked}
              className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center gap-4 ${
                isCompleted
                  ? 'border-green-500/30 bg-green-500/10 hover:bg-green-500/15'
                  : isUnlocked
                  ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                  : 'border-white/5 bg-black/20 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                isCompleted ? 'bg-green-500/20' : isUnlocked ? 'bg-white/10' : 'bg-white/5'
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : isUnlocked ? (
                  <span className="text-white/60 font-mono text-sm">{lesson.number}</span>
                ) : (
                  <Lock className="w-4 h-4 text-white/30" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`font-medium ${isCompleted ? 'text-green-300' : isUnlocked ? 'text-white' : 'text-white/40'}`}>
                  {lesson.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-white/40">
                    <Clock className="w-3 h-3" />
                    {lesson.duration}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-yellow-500/60">
                    <Zap className="w-3 h-3" />
                    {lesson.xp} XP
                  </span>
                  {!isUnlocked && (
                    <span className="text-xs text-white/30">{t('module.completePrev')}</span>
                  )}
                </div>
              </div>

              {isUnlocked && !isCompleted && <ChevronRight className="w-5 h-5 text-white/30 shrink-0" />}
              {isCompleted && <span className="text-xs text-green-400 font-medium shrink-0">{t('module.completed')}</span>}
            </button>
          );
        })}
      </div>

      {completedCount === lessons.length && lessons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-center"
        >
          <p className="text-yellow-300 font-medium mb-1">{t('module.allDone')}</p>
          <p className="text-white/60 text-sm">{t('module.allDoneDesc')}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
