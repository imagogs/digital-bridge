import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Lightbulb, CheckCircle2, XCircle, BookOpen, Zap, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, LessonScreen } from '../data/lessons';
import { useLanguage } from '../contexts/LanguageContext';

interface LessonOverlayProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: () => void;
}

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export function LessonOverlay({ lesson, onClose, onComplete }: LessonOverlayProps) {
  const { t } = useLanguage();
  const [screenIndex, setScreenIndex] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [xpEarned, setXpEarned] = useState(0);
  const [confirmExit, setConfirmExit] = useState(false);
  const [xpToasts, setXpToasts] = useState<{ id: string; value: number }[]>([]);
  const confettiOnce = useRef(false);

  // Keyboard: Escape triggers exit confirmation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (confirmExit) { onClose(); return; }
        const isSummary = lesson.screens[screenIndex]?.type === 'summary';
        if (screenIndex === 0 || isSummary) onClose();
        else setConfirmExit(true);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [screenIndex, confirmExit, lesson.screens, onClose]);

  // Fire confetti when reaching summary screen
  useEffect(() => {
    const currentScreen = lesson.screens[screenIndex];
    if (currentScreen?.type === 'summary' && !confettiOnce.current) {
      confettiOnce.current = true;
      setTimeout(() => {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ['#fbbf24', '#60a5fa', '#34d399'] });
      }, 300);
    }
  }, [screenIndex, lesson.screens]);

  const screen = lesson.screens[screenIndex];
  const isFirst = screenIndex === 0;
  const isLast = screenIndex === lesson.screens.length - 1;
  const progress = ((screenIndex + 1) / lesson.screens.length) * 100;

  const handleNext = () => {
    if (answerState === 'unanswered' && (screen.type === 'quiz' || screen.type === 'practice')) return;
    setAnswerState('unanswered');
    setSelectedAnswer(null);
    setFeedbackText('');
    if (isLast) {
      onComplete();
    } else {
      setScreenIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (isFirst) return;
    setAnswerState('unanswered');
    setSelectedAnswer(null);
    setFeedbackText('');
    setScreenIndex(prev => prev - 1);
  };

  const handleQuizAnswer = (index: number) => {
    if (answerState !== 'unanswered') return;
    setSelectedAnswer(index);
    const isCorrect = screen.options?.[index]?.correct ?? false;
    setAnswerState(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      const xpValue = Math.floor(lesson.xp / Math.max(1, lesson.screens.filter(s => s.type === 'quiz' || s.type === 'practice').length));
      setXpEarned(prev => prev + xpValue);
      const toastId = `${Date.now()}-quiz`;
      setXpToasts(prev => [...prev, { id: toastId, value: xpValue }]);
      setTimeout(() => setXpToasts(prev => prev.filter(t => t.id !== toastId)), 1500);
    }
  };

  const handlePracticeChoice = (index: number) => {
    if (answerState !== 'unanswered') return;
    setSelectedAnswer(index);
    const choice = screen.choices?.[index];
    const isCorrect = choice?.correct ?? false;
    setAnswerState(isCorrect ? 'correct' : 'incorrect');
    setFeedbackText(choice?.feedback ?? '');
    if (isCorrect) {
      const xpValue = Math.floor(lesson.xp / Math.max(1, lesson.screens.filter(s => s.type === 'quiz' || s.type === 'practice').length));
      setXpEarned(prev => prev + xpValue);
      const toastId = `${Date.now()}-practice`;
      setXpToasts(prev => [...prev, { id: toastId, value: xpValue }]);
      setTimeout(() => setXpToasts(prev => prev.filter(t => t.id !== toastId)), 1500);
    }
  };

  const canAdvance =
    screen.type === 'intro' ||
    screen.type === 'learn' ||
    screen.type === 'summary' ||
    answerState !== 'unanswered';

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto flex flex-col h-full max-h-[85vh]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => {
            const isSummary = lesson.screens[screenIndex]?.type === 'summary';
            if (screenIndex === 0 || isSummary) onClose();
            else setConfirmExit(prev => !prev);
          }}
          className="w-10 h-10 rounded-full glass-panel-dark flex items-center justify-center hover:bg-white/10 transition-colors text-white/50 hover:text-white shrink-0"
          title="Indietro"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-white/40 text-xs font-mono tracking-widest uppercase mb-1">
            {t('lesson.label')} {lesson.number} · {lesson.duration}
          </p>
          <h2 className="font-serif text-2xl text-white truncate">{lesson.title}</h2>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {xpEarned > 0 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-yellow-400 text-xs font-medium">+{xpEarned} XP</span>
            </div>
          )}
          <button
            onClick={() => {
              const isSummary = lesson.screens[screenIndex]?.type === 'summary';
              if (screenIndex === 0 || isSummary) onClose();
              else setConfirmExit(prev => !prev);
            }}
            className="w-10 h-10 rounded-full glass-panel-dark flex items-center justify-center hover:bg-white/10 transition-colors text-white/50 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>


      {/* Exit confirmation banner */}
      <AnimatePresence>
        {confirmExit && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mb-3 flex items-center gap-3 bg-orange-500/15 border border-orange-500/30 rounded-xl px-4 py-3"
          >
            <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0" />
            <p className="text-white/70 text-sm flex-1">Vuoi uscire? Il progresso non sarà salvato.</p>
            <button
              onClick={() => setConfirmExit(false)}
              className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Continua
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 text-xs rounded-lg bg-orange-500/30 hover:bg-orange-500/50 text-orange-300 transition-colors"
            >
              Esci
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-full h-1 bg-white/10 rounded-full mb-4">
        <motion.div
          className="h-full bg-blue-400 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 glass-panel-dark rounded-2xl overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={screenIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="p-8 h-full"
          >
            {/* INTRO */}
            {screen.type === 'intro' && (
              <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto py-8">
                <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="font-serif text-3xl text-white mb-4">{screen.title}</h3>
                <p className="text-white/70 text-lg leading-relaxed">{screen.content}</p>
                {screen.tip && <p className="mt-4 text-white/40 text-sm">{screen.tip}</p>}
              </div>
            )}

            {/* LEARN */}
            {screen.type === 'learn' && (
              <div className="max-w-2xl mx-auto py-4">
                <div className="text-blue-400 text-xs font-mono tracking-widest uppercase mb-3">{t('lesson.explanation')}</div>
                <h3 className="font-serif text-2xl text-white mb-5">{screen.title}</h3>
                <div className="text-white/80 text-base leading-relaxed whitespace-pre-line mb-6">{screen.content}</div>
                {screen.analogy && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 mb-4">
                    <p className="text-blue-300 text-sm font-medium uppercase tracking-wider mb-2">{t('lesson.analogy')}</p>
                    <p className="text-white/80 leading-relaxed">{screen.analogy}</p>
                  </div>
                )}
                {screen.tip && (
                  <div className="glass-panel rounded-xl p-4 flex gap-3 border-l-4 border-l-yellow-500/50">
                    <Lightbulb className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                    <p className="text-white/70 text-sm leading-relaxed">{screen.tip}</p>
                  </div>
                )}
              </div>
            )}

            {/* QUIZ */}
            {screen.type === 'quiz' && (
              <div className="max-w-2xl mx-auto py-4">
                <div className="text-purple-400 text-xs font-mono tracking-widest uppercase mb-3">{t('lesson.question')}</div>
                <h3 className="font-serif text-2xl text-white mb-6">{screen.question}</h3>
                <div className="space-y-3">
                  {screen.options?.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const showResult = answerState !== 'unanswered';
                    let btnClass = 'border border-white/10 bg-zinc-800/50 text-white/80 hover:bg-zinc-800 hover:border-white/20';
                    if (showResult && option.correct) btnClass = 'border border-green-500/50 bg-green-500/10 text-green-300';
                    else if (showResult && isSelected && !option.correct) btnClass = 'border border-red-500/50 bg-red-500/10 text-red-300';
                    else if (showResult) btnClass = 'border border-white/5 bg-zinc-900/50 text-white/30';

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={answerState !== 'unanswered'}
                        className={`w-full p-4 text-left rounded-xl transition-all flex items-center justify-between gap-3 ${btnClass}`}
                      >
                        <span>{option.text}</span>
                        {showResult && option.correct && <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />}
                        {showResult && isSelected && !option.correct && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {answerState !== 'unanswered' && screen.explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-5 p-4 rounded-xl border ${answerState === 'correct' ? 'bg-green-500/10 border-green-500/30' : 'bg-orange-500/10 border-orange-500/30'}`}
                  >
                    <p className={`text-sm font-medium mb-1 ${answerState === 'correct' ? 'text-green-400' : 'text-orange-400'}`}>
                      {answerState === 'correct' ? t('lesson.correct') : t('lesson.incorrect')}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">{screen.explanation}</p>
                  </motion.div>
                )}
              </div>
            )}

            {/* PRACTICE */}
            {screen.type === 'practice' && (
              <div className="max-w-2xl mx-auto py-4">
                <div className="text-emerald-400 text-xs font-mono tracking-widest uppercase mb-3">{t('lesson.practiceLabel')}</div>
                <h3 className="font-serif text-2xl text-white mb-4">{screen.title}</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2">{t('lesson.scenarioLabel')}</p>
                  <p className="text-white/80 leading-relaxed">{screen.scenario}</p>
                </div>
                <p className="text-white/60 text-sm mb-4">{screen.task}</p>
                <div className="space-y-3">
                  {screen.choices?.map((choice, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const showResult = answerState !== 'unanswered';
                    let btnClass = 'border border-white/10 bg-zinc-800/50 text-white/80 hover:bg-zinc-800 hover:border-white/20';
                    if (showResult && choice.correct) btnClass = 'border border-green-500/50 bg-green-500/10 text-green-300';
                    else if (showResult && isSelected && !choice.correct) btnClass = 'border border-red-500/50 bg-red-500/10 text-red-300';
                    else if (showResult) btnClass = 'border border-white/5 bg-zinc-900/50 text-white/30';

                    return (
                      <button
                        key={idx}
                        onClick={() => handlePracticeChoice(idx)}
                        disabled={answerState !== 'unanswered'}
                        className={`w-full p-4 text-left rounded-xl transition-all ${btnClass}`}
                      >
                        {choice.text}
                      </button>
                    );
                  })}
                </div>
                {feedbackText && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-5 p-4 rounded-xl border ${answerState === 'correct' ? 'bg-green-500/10 border-green-500/30' : 'bg-orange-500/10 border-orange-500/30'}`}
                  >
                    <p className={`text-sm font-medium mb-1 ${answerState === 'correct' ? 'text-green-400' : 'text-orange-400'}`}>
                      {answerState === 'correct' ? t('lesson.correctChoice') : t('lesson.incorrectChoice')}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">{feedbackText}</p>
                  </motion.div>
                )}
              </div>
            )}

            {/* SUMMARY */}
            {screen.type === 'summary' && (
              <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto py-8">
                <div className="w-20 h-20 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center mb-6 text-4xl">
                  🏅
                </div>
                <h3 className="font-serif text-3xl text-white mb-4">{screen.title}</h3>
                <p className="text-white/70 leading-relaxed whitespace-pre-line">{screen.content}</p>
                {xpEarned > 0 && (
                  <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300 text-sm font-medium">+{xpEarned} XP {t('lesson.xpEarned')}</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* XP Floating Toasts */}
      <div className="relative h-0 overflow-visible">
        <AnimatePresence>
          {xpToasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 1, y: 0, x: '-50%' }}
              animate={{ opacity: 0, y: -55 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
              className="absolute bottom-2 left-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/25 border border-yellow-500/40 rounded-full text-yellow-300 text-sm font-medium pointer-events-none whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5" />
              +{toast.value} XP
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrev}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all text-sm ${
            isFirst ? 'opacity-0 pointer-events-none' : 'glass-panel hover:bg-white/10 text-white'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          {t('lesson.back')}
        </button>

        <div className="flex gap-1.5">
          {lesson.screens.map((_, idx) => (
            <div
              key={idx}
              className={`rounded-full transition-all duration-300 ${
                idx === screenIndex ? 'w-5 h-2 bg-blue-400' : idx < screenIndex ? 'w-2 h-2 bg-white/40' : 'w-2 h-2 bg-white/15'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
            canAdvance
              ? isLast
                ? 'bg-yellow-500 hover:bg-yellow-400 text-black'
                : 'bg-white text-black hover:bg-white/90'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          {isLast ? t('lesson.complete') : t('lesson.next')}
          {!isLast && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  );
}
