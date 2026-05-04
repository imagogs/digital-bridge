import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, X, Lightbulb } from 'lucide-react';
import { tools } from '../data/tools';
import { Tool3DModel } from './Tool3DModel';

interface TutorialOverlayProps {
  toolId: string;
  onClose: () => void;
  key?: React.Key;
}

export function TutorialOverlay({ toolId, onClose }: TutorialOverlayProps) {
  const tool = tools.find(t => t.id === toolId);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!tool) return null;

  const Icon = tool.icon;
  const steps = tool.steps;
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) setCurrentStepIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (!isFirstStep) setCurrentStepIndex(prev => prev - 1);
  };

  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto flex flex-col h-full max-h-[800px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full glass-panel-dark flex items-center justify-center">
            <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-medium text-white">{tool.name}</h2>
            <p className="text-white/60 text-sm uppercase tracking-widest mt-1">Lezione Interattiva</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full glass-panel-dark flex items-center justify-center hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 glass-panel-dark rounded-3xl p-8 md:p-12 flex flex-col relative overflow-hidden shadow-2xl">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/10">
          <motion.div 
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          <div className="flex flex-col justify-center relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-xl"
              >
                <div className="text-white/40 font-mono text-sm mb-4 tracking-widest">
                  PASSO {currentStepIndex + 1} DI {steps.length}
                </div>
                <h3 className="font-serif text-4xl md:text-5xl font-medium text-white mb-6 leading-tight">
                  {currentStep.title}
                </h3>
                <p className="text-xl text-white/80 leading-relaxed font-light mb-10">
                  {currentStep.description}
                </p>
                
                {currentStep.tip && (
                  <div className="glass-panel rounded-2xl p-6 flex gap-4 items-start border-l-4 border-l-yellow-500/50">
                    <Lightbulb className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-1">Consiglio</h4>
                      <p className="text-white/70 leading-relaxed">{currentStep.tip}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="hidden lg:flex items-center justify-center relative rounded-2xl overflow-hidden glass-panel bg-black/20">
            <Tool3DModel toolId={toolId} />
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/10">
          <button
            onClick={handlePrev}
            disabled={isFirstStep}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              isFirstStep
                ? 'opacity-0 pointer-events-none'
                : 'glass-panel hover:bg-white/10 text-white'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Indietro
          </button>

          <div className="flex gap-2">
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentStepIndex ? 'bg-white scale-125' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {isLastStep ? (
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all shadow-lg shadow-white/20"
            >
              Completa Lezione ✓
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all shadow-lg shadow-white/20"
            >
              Avanti
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
