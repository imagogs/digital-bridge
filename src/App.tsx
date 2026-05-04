import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LayoutDashboard, BookOpen, TrendingUp, GraduationCap, Users, Loader2 } from 'lucide-react';
import { ModuleOverlay } from './components/ModuleOverlay';
import { AIChat } from './components/AIChat';
import { ProfileOverlay } from './components/ProfileOverlay';
import { AssessmentOverlay } from './components/AssessmentOverlay';
import { LoginScreen } from './components/LoginScreen';
import { LanguageToggle } from './components/LanguageToggle';
import { HomeDashboard } from './components/HomeDashboard';
import { ProgressScreen } from './components/ProgressScreen';
import { Biblioteca } from './components/Biblioteca';
import { useAuth } from './contexts/AuthContext';
import { useLanguage } from './contexts/LanguageContext';
import { tools } from './data/tools';
import { getExamForModule } from './data/exams';
import { supabase } from './lib/supabase';
import { updateStreak, type StreakData } from './lib/streakTracker';

// Lazy-load heavy components not needed at startup
const Library3D = lazy(() => import('./components/Library3D').then(m => ({ default: m.Library3D })));
const CertificationExam = lazy(() => import('./components/CertificationExam').then(m => ({ default: m.CertificationExam })));
const CoordinatorPanel = lazy(() => import('./components/CoordinatorPanel').then(m => ({ default: m.CoordinatorPanel })));

const LazyFallback = () => (
  <div className="flex items-center justify-center w-full h-full">
    <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
  </div>
);

export type Section = 'home' | 'library' | 'progress' | 'certification';

// ── Certification section ──────────────────────────────────────────────────────
function CertificationSection({
  earnedCertificates,
  onStartExam,
}: {
  earnedCertificates: string[];
  onStartExam: (moduleId: string) => void;
}) {
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
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <p className="text-white/30 text-[10px] font-mono tracking-[0.35em] uppercase mb-2">Valida le tue competenze</p>
            <h1 className="font-serif text-4xl text-white mb-2">Certificazioni</h1>
            <p className="text-white/40 text-sm leading-relaxed">
              Supera ogni esame con almeno il 70% delle risposte corrette per ottenere il tuo certificato DIGITAL BRIDGE ufficiale.
            </p>
          </motion.div>

          {/* Base module exams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {tools.filter(t => t.level === 'base').map((tool, i) => {
              const exam = getExamForModule(tool.id);
              const certified = earnedCertificates.includes(tool.id);
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`p-5 rounded-2xl border transition-all relative overflow-hidden ${
                    certified
                      ? 'border-yellow-500/30 bg-[#111111]'
                      : 'border-white/[0.07] bg-[#111111]'
                  }`}
                >
                  {/* Top module color bar */}
                  <div
                    className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl"
                    style={{ backgroundColor: tool.color, opacity: certified ? 1 : 0.4 }}
                  />
                  {/* Module info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${tool.color}25` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: tool.color }} />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs font-mono">{tool.moduleCode}</p>
                        <p className="text-white font-medium">{tool.name}</p>
                      </div>
                    </div>
                    {certified && (
                      <span className="text-yellow-400 text-xs bg-yellow-500/15 border border-yellow-500/30 px-2.5 py-1 rounded-full shrink-0">
                        🏅 Certificato
                      </span>
                    )}
                  </div>

                  {exam ? (
                    <>
                      <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                        <span>📋 {exam.questions.length} domande</span>
                        <span>⏱️ {exam.timeMinutes} min</span>
                        <span>🎯 Soglia: {exam.passingScore}%</span>
                      </div>
                      <button
                        onClick={() => onStartExam(tool.id)}
                        className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                          certified
                            ? 'bg-yellow-500/15 hover:bg-yellow-500/25 text-yellow-400 border border-yellow-500/35'
                            : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                        }`}
                      >
                        {certified ? '🔄 Ripeti Esame' : "🎓 Sostieni l'Esame"}
                      </button>
                    </>
                  ) : (
                    <div className="py-2.5 px-4 bg-white/5 border border-white/5 rounded-xl text-center">
                      <p className="text-white/30 text-xs">Esame in preparazione — disponibile a breve</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Intermediate locked */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <p className="text-white/40 text-xs font-mono tracking-wider uppercase mb-4">
              Percorso Avanzato — disponibile dopo i moduli base
            </p>
            <div className="grid grid-cols-2 gap-3">
              {tools.filter(t => t.level === 'intermediate').map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-black/20 opacity-40"
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${tool.color}25` }}
                    >
                      <Icon className="w-4 h-4 blur-sm" style={{ color: tool.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/30 text-xs font-mono">{tool.moduleCode}</p>
                      <p className="text-white/50 text-sm truncate blur-[1px]">{tool.name}</p>
                    </div>
                    <span className="ml-auto text-white/30 text-xs shrink-0">🔒</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="h-20" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();

  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [showModule, setShowModule] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [earnedCertificates, setEarnedCertificates] = useState<string[]>([]);
  const [activeExamModuleId, setActiveExamModuleId] = useState<string | null>(null);
  const [showCoordinator, setShowCoordinator] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [streak, setStreak] = useState<StreakData>({ currentStreak: 0, longestStreak: 0, lastStudyDate: null });

  // Load progress from Supabase
  useEffect(() => {
    if (!user) {
      setCompletedLessons([]);
      setEarnedCertificates([]);
      return;
    }
    supabase
      .from('lesson_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) setCompletedLessons(data.map((r: any) => r.lesson_id));
      });
    supabase
      .from('certificates')
      .select('module_id')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) setEarnedCertificates(data.map((r: any) => r.module_id));
      });
  }, [user]);

  // Delay module opening for 3D animation
  useEffect(() => {
    if (selectedToolId) {
      const timer = setTimeout(() => setShowModule(true), 900);
      return () => clearTimeout(timer);
    } else {
      setShowModule(false);
    }
  }, [selectedToolId]);

  const handleLessonComplete = async (lessonId: string, xp: number) => {
    if (!user) return;
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
    try {
      await supabase.from('lesson_progress').upsert({
        user_id: user.id,
        lesson_id: lessonId,
        xp,
        completed_at: new Date().toISOString(),
      });
      // Update daily streak
      const newStreak = await updateStreak(user.id);
      setStreak(newStreak);
    } catch (e) { console.error(e); }
  };

  const handleExamPass = async (moduleId: string, score: number) => {
    if (!user) return;
    if (!earnedCertificates.includes(moduleId)) {
      setEarnedCertificates(prev => [...prev, moduleId]);
    }
    try {
      await supabase.from('certificates').upsert({
        user_id: user.id,
        module_id: moduleId,
        score,
        passed_at: new Date().toISOString(),
      });
    } catch (e) { console.error(e); }
  };

  // From HomeDashboard "continue" button → jump to library + open module
  const handleOpenModule = (id: string) => {
    setCurrentSection('library');
    setSelectedToolId(id);
  };

  const selectedTool = tools.find(t => t.id === selectedToolId);
  const activeExam = activeExamModuleId ? getExamForModule(activeExamModuleId) : null;

  const navItems = [
    { id: 'home' as Section, icon: LayoutDashboard, label: t('nav.home') },
    { id: 'library' as Section, icon: BookOpen, label: t('nav.library') },
    { id: 'progress' as Section, icon: TrendingUp, label: t('nav.progress') },
    { id: 'certification' as Section, icon: GraduationCap, label: t('nav.certification') },
  ];

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white/30 animate-spin" />
      </div>
    );
  }

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!user) { return <LoginScreen />; }

  // ── Main App ───────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full h-screen overflow-hidden"
      style={{ background: currentSection === 'library' ? '#fbf6ec' : '#0a0a0a' }}>

      {/* Assessment overlay */}
      <AssessmentOverlay />

      {/* ── Section screens ── */}
      <AnimatePresence mode="wait">

        {/* HOME */}
        {currentSection === 'home' && (
          <HomeDashboard
            key="home"
            completedLessons={completedLessons}
            onOpenModule={handleOpenModule}
            streak={streak}
            earnedCertificates={earnedCertificates}
            onOpenProfile={() => setShowProfile(true)}
            onGoToLibrary={() => setCurrentSection('library')}
          />
        )}

        {/* BIBLIOTECA */}
        {currentSection === 'library' && !selectedToolId && (
          <Biblioteca
            key="biblioteca"
            completedLessons={completedLessons}
            earnedCertificates={earnedCertificates}
            onOpenModule={(id) => { setSelectedToolId(id); }}
            onOpenProfile={() => setShowProfile(true)}
          />
        )}

        {/* PROGRESS */}
        {currentSection === 'progress' && (
          <ProgressScreen
            key="progress"
            completedLessons={completedLessons}
            earnedCertificates={earnedCertificates}
          />
        )}

        {/* CERTIFICATION */}
        {currentSection === 'certification' && (
          <CertificationSection
            key="certification"
            earnedCertificates={earnedCertificates}
            onStartExam={setActiveExamModuleId}
          />
        )}

      </AnimatePresence>

      {/* Placeholder for removed library hint */}
      <AnimatePresence>
        {false && (
          <motion.p
            key="library-hint-placeholder"
            className="hidden"
          ></motion.p>
        )}
      </AnimatePresence>

      {/* Book label shown during camera zoom before module overlay opens */}
      <AnimatePresence>
        {currentSection === 'library' && selectedToolId && !showModule && (
          <motion.div
            key="book-label"
            className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white/90 font-serif text-2xl tracking-tight">
              {tools.find(tool => tool.id === selectedToolId)?.name}
            </p>
            <p className="text-white/35 text-xs font-mono tracking-[0.2em] mt-1">
              {tools.find(tool => tool.id === selectedToolId)?.moduleCode}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Module overlay */}
      <AnimatePresence mode="wait">
        {showModule && selectedToolId && selectedTool && (
          <motion.div
            key="module"
            className="absolute inset-0 z-40 flex items-center justify-center p-6 sm:p-12 bg-black/75 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ModuleOverlay
              moduleId={selectedToolId}
              moduleName={selectedTool.name}
              moduleDescription={selectedTool.description}
              completedLessons={completedLessons}
              onLessonComplete={handleLessonComplete}
              onClose={() => {
                setShowModule(false);
                setSelectedToolId(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certification Exam modal */}
      <AnimatePresence>
        {activeExam && activeExamModuleId && (
          <Suspense fallback={<LazyFallback />}>
            <CertificationExam
              key={activeExamModuleId}
              exam={activeExam}
              moduleName={tools.find(t => t.id === activeExamModuleId)?.name || ''}
              onClose={() => setActiveExamModuleId(null)}
              onPass={(score) => handleExamPass(activeExamModuleId, score)}
            />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Profile Overlay */}
      <AnimatePresence>
        {showProfile && <ProfileOverlay onClose={() => setShowProfile(false)} />}
      </AnimatePresence>

      {/* Coordinator Panel modal */}
      <AnimatePresence>
        {showCoordinator && (
          <motion.div
            key="coordinator"
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Suspense fallback={<LazyFallback />}>
              <CoordinatorPanel onClose={() => setShowCoordinator(false)} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom navigation bar */}
      {!selectedToolId && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className={`flex items-center gap-1 rounded-2xl p-1.5 ${
            currentSection === 'library'
              ? 'bg-white/90 backdrop-blur-xl border border-black/[0.08] shadow-[0_4px_20px_rgba(29,25,51,0.12)]'
              : 'bg-[#111111]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.7)]'
          }`}>
            {navItems.map(({ id, icon: Icon, label }) => {
              const isActive = currentSection === id;
              const isLibrary = currentSection === 'library';
              return (
                <button
                  key={id}
                  onClick={() => setCurrentSection(id)}
                  className={`flex flex-col items-center gap-1 px-6 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                      : isLibrary
                      ? 'text-[#1d1933]/40 hover:text-[#1d1933] hover:bg-black/[0.05]'
                      : 'text-white/40 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-medium leading-none tracking-wide">{label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      <AIChat currentModule={selectedToolId} />
    </div>
  );
}
