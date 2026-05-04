import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, CheckCircle2, XCircle, AlertTriangle, ChevronRight, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exam } from '../data/exams';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface CertificationExamProps {
  exam: Exam;
  moduleName: string;
  onClose: () => void;
  onPass: (score: number) => void;
}

type ExamState = 'intro' | 'running' | 'review' | 'passed' | 'failed';

export function CertificationExam({ exam, moduleName, onClose, onPass }: CertificationExamProps) {
  const { lang, t } = useLanguage();
  const { profile } = useAuth();
  const [state, setState] = useState<ExamState>('intro');

  // Escape closes only when not mid-exam
  useEscapeKey(() => { if (state !== 'running') onClose(); });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(exam.questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(exam.timeMinutes * 60);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const calculateScore = useCallback((ans: (number | null)[]) => {
    const correct = ans.filter((a, i) => a === exam.questions[i].correctIndex).length;
    return Math.round((correct / exam.questions.length) * 100);
  }, [exam]);

  useEffect(() => {
    if (state !== 'running') return;
    if (timeLeft <= 0) {
      submitExam();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [state, timeLeft]);

  const submitExam = () => {
    const s = calculateScore(answers);
    setScore(s);
    const passed = s >= exam.passingScore;
    setState(passed ? 'passed' : 'failed');
    if (passed) {
      onPass(s);
      // Celebrazione coriandoli
      setTimeout(() => {
        confetti({ particleCount: 130, spread: 80, origin: { y: 0.5 }, colors: ['#fbbf24', '#60a5fa', '#34d399', '#f472b6'] });
      }, 300);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIndex;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const goNext = () => {
    setShowExplanation(false);
    if (currentQ < exam.questions.length - 1) {
      setCurrentQ(q => q + 1);
    } else {
      submitExam();
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const q = exam.questions[currentQ];
  const answered = answers[currentQ];
  const isCorrect = answered === q?.correctIndex;
  const progress = ((currentQ + 1) / exam.questions.length) * 100;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* ── INTRO ── */}
        {state === 'intro' && (
          <div className="p-8 text-center">
            <button onClick={onClose} className="absolute top-5 right-5 p-2 text-white/40 hover:text-white bg-zinc-800 rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="w-16 h-16 bg-yellow-500/20 border border-yellow-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl">
              🎓
            </div>
            <h2 className="font-serif text-2xl text-white mb-2">{exam.title}</h2>
            <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
              {t('exam.intro')} <strong className="text-white">{moduleName}</strong>.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: t('exam.questions'), value: String(exam.questions.length), icon: '📋' },
                { label: t('exam.time'), value: `${exam.timeMinutes} min`, icon: '⏱️' },
                { label: t('exam.threshold'), value: `${exam.passingScore}%`, icon: '🎯' },
              ].map((info, i) => (
                <div key={i} className="bg-zinc-800/50 border border-white/10 rounded-xl p-3 text-center">
                  <p className="text-xl mb-1">{info.icon}</p>
                  <p className="text-white font-bold text-lg">{info.value}</p>
                  <p className="text-white/40 text-xs">{info.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6 text-left">
              <p className="text-blue-300 text-sm font-medium mb-1">{t('exam.howTitle')}</p>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• {t('exam.how1')}</li>
                <li>• {t('exam.how2')}</li>
                <li>• {t('exam.how3').replace('{pct}', String(exam.passingScore))}</li>
                <li>• {t('exam.how4')}</li>
              </ul>
            </div>
            <button
              onClick={() => setState('running')}
              className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-colors text-sm"
            >
              {t('exam.start')}
            </button>
          </div>
        )}

        {/* ── RUNNING ── */}
        {state === 'running' && q && (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-800/50">
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-sm font-mono">{currentQ + 1}/{exam.questions.length}</span>
                <div className="w-32 h-1.5 bg-white/10 rounded-full">
                  <motion.div className="h-full bg-yellow-400 rounded-full" animate={{ width: `${progress}%` }} />
                </div>
              </div>
              <div className={`flex items-center gap-1.5 text-sm font-mono ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-white/60'}`}>
                <Clock className="w-3.5 h-3.5" />
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="p-6">
              <div className="text-yellow-400 text-xs font-mono tracking-widest uppercase mb-3">{t('exam.questionLabel')} {currentQ + 1}</div>
              <h3 className="font-serif text-xl text-white mb-6 leading-relaxed">{q.question}</h3>

              <div className="space-y-3 mb-4">
                {q.options.map((option, idx) => {
                  let cls = 'border border-white/10 bg-zinc-800/50 text-white/80 hover:bg-zinc-800 hover:border-white/20 cursor-pointer';
                  if (answered !== null) {
                    if (idx === q.correctIndex) cls = 'border border-green-500/60 bg-green-500/15 text-green-300 cursor-default';
                    else if (idx === answered) cls = 'border border-red-500/60 bg-red-500/15 text-red-300 cursor-default';
                    else cls = 'border border-white/5 bg-zinc-900/50 text-white/30 cursor-default';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => answered === null && handleAnswer(idx)}
                      disabled={answered !== null}
                      className={`w-full p-4 text-left rounded-xl transition-all flex items-center justify-between gap-3 text-sm ${cls}`}
                    >
                      <span>{option}</span>
                      {answered !== null && idx === q.correctIndex && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />}
                      {answered !== null && idx === answered && idx !== q.correctIndex && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border mb-4 ${isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-orange-500/10 border-orange-500/30'}`}
                  >
                    <p className={`text-xs font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-orange-400'}`}>
                      {isCorrect ? t('exam.correct') : t('exam.incorrect')}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">{q.explanation}</p>
                  </motion.div>
                </AnimatePresence>
              )}

              {answered !== null && (
                <button
                  onClick={goNext}
                  className="w-full py-3 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-colors text-sm flex items-center justify-center gap-2"
                >
                  {currentQ < exam.questions.length - 1 ? t('exam.next') : t('exam.submit')}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── PASSED ── */}
        {state === 'passed' && (
          <div className="p-10 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
              className="text-6xl mb-6">🏅</motion.div>
            <h2 className="font-serif text-3xl text-white mb-2">{t('exam.passedTitle')}</h2>
            <p className="text-white/60 mb-6">{t('exam.score')}: <span className="text-green-400 font-bold text-2xl">{score}%</span></p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5 mb-6">
              <p className="text-green-300 font-medium mb-2">{t('exam.certObtained')}</p>
              <p className="text-white/60 text-sm">
                {t('exam.certDesc')} <strong className="text-white">{moduleName}</strong>.<br />
                {t('exam.certProfile')}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-zinc-800/50 rounded-xl p-3 text-center">
                <p className="text-green-400 font-bold text-xl">{score}%</p>
                <p className="text-white/40 text-xs">{t('exam.score')}</p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-3 text-center">
                <p className="text-blue-400 font-bold text-xl">{exam.questions.filter((q, i) => answers[i] === q.correctIndex).length}/{exam.questions.length}</p>
                <p className="text-white/40 text-xs">{t('exam.correct_count')}</p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-3 text-center">
                <p className="text-yellow-400 font-bold text-xl">+200 XP</p>
                <p className="text-white/40 text-xs">{t('exam.xpEarned')}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={async () => {
                  const { generateCertificatePDF } = await import('../lib/generateCertificate');
                  generateCertificatePDF({
                    userName: profile?.displayName || t('exam.defaultUser'),
                    moduleName,
                    moduleCode: moduleName.split(' ')[0].toUpperCase(),
                    score,
                    date: new Date(),
                  });
                }}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t('exam.downloadCert')}
              </button>
              <button onClick={onClose} className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors">
                {t('exam.backToPlatform')}
              </button>
            </div>
          </div>
        )}

        {/* ── FAILED ── */}
        {state === 'failed' && (
          <div className="p-10 text-center">
            <div className="text-5xl mb-5"><AlertTriangle className="w-16 h-16 text-orange-400 mx-auto" /></div>
            <h2 className="font-serif text-2xl text-white mb-2">{t('exam.failedTitle')}</h2>
            <p className="text-white/60 mb-4">{t('exam.score')}: <span className="text-orange-400 font-bold text-2xl">{score}%</span> · {t('exam.threshold')}: {exam.passingScore}%</p>
            <p className="text-white/50 text-sm mb-6">{t('exam.failedDesc')}</p>
            <div className="flex gap-3">
              <button onClick={() => { setCurrentQ(0); setAnswers(new Array(exam.questions.length).fill(null)); setTimeLeft(exam.timeMinutes * 60); setState('running'); }}
                className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-colors text-sm">
                {t('exam.retry')}
              </button>
              <button onClick={onClose} className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors text-sm">
                {t('exam.reviewLessons')}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
