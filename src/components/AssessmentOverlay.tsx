import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Laptop, ArrowRight } from 'lucide-react';

export function AssessmentOverlay() {
  const { profile, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);

  if (!profile || profile.assessmentCompleted) return null;

  const questions: { question: string; options: string[] }[] = t('assessment.questions');

  const handleSelectOption = (index: number) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishAssessment(newAnswers);
    }
  };

  const finishAssessment = async (finalAnswers: number[]) => {
    setIsFinishing(true);
    const score = finalAnswers.reduce((a, b) => a + b, 0);
    let level: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
    if (score >= 5) level = 'advanced';
    else if (score >= 2) level = 'intermediate';

    setTimeout(async () => {
      await updateProfile({ level, assessmentCompleted: true });
      setIsFinishing(false);
    }, 1800);
  };

  const questionLabel = (t('assessment.questionOf') as string)
    .replace('{n}', String(currentStep + 1))
    .replace('{total}', String(questions.length));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ y: 40, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 h-1 bg-blue-500/20 w-full">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-5 border border-blue-500/30">
            <Laptop className="w-7 h-7 text-blue-400" />
          </div>

          {isFinishing ? (
            <div className="py-10">
              <h2 className="text-2xl font-serif text-white mb-3">{t('assessment.analyzing')}</h2>
              <p className="text-white/50 text-sm mb-6">{t('assessment.analyzingDesc')}</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {currentStep === 0 && (
                  <div className="mb-4">
                    <p className="text-white font-medium mb-1">{t('assessment.welcome')}</p>
                    <p className="text-white/50 text-sm">{t('assessment.intro')}</p>
                  </div>
                )}
                <div className="text-xs font-mono text-blue-400 mb-2">{questionLabel}</div>
                <h2 className="text-xl font-serif text-white mb-6">{questions[currentStep].question}</h2>
                <div className="space-y-3">
                  {questions[currentStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className="w-full p-4 text-left bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 hover:border-white/20 rounded-xl transition-all text-white/80 group flex items-center justify-between"
                    >
                      <span className="text-sm">{option}</span>
                      <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
