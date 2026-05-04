import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// ── Storage helpers ────────────────────────────────────────────────────────────
export const ONBOARDING_KEY = 'db_onboarding_v1';

export function hasSeenOnboarding(): boolean {
  try { return localStorage.getItem(ONBOARDING_KEY) === 'done'; }
  catch { return false; }
}

export function markOnboardingDone(): void {
  try { localStorage.setItem(ONBOARDING_KEY, 'done'); }
  catch {}
}

// ── Illustrations ──────────────────────────────────────────────────────────────

function WelcomeIllustration() {
  const particles = [
    { x: '18%', y: '22%', r: 3, delay: 0 },
    { x: '78%', y: '18%', r: 2, delay: 0.4 },
    { x: '12%', y: '68%', r: 2.5, delay: 0.8 },
    { x: '82%', y: '72%', r: 2, delay: 0.2 },
    { x: '50%', y: '12%', r: 1.5, delay: 1.0 },
    { x: '88%', y: '44%', r: 2, delay: 0.6 },
    { x: '6%',  y: '42%', r: 1.5, delay: 1.2 },
    { x: '62%', y: '80%', r: 2, delay: 0.3 },
  ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.15, 0.55, 0.15], scale: [0.7, 1.3, 0.7] }}
          transition={{ delay: p.delay, repeat: Infinity, duration: 2.2 + i * 0.3, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: p.x, top: p.y,
            width: p.r * 2, height: p.r * 2, borderRadius: '50%',
            background: '#818cf8',
          }}
        />
      ))}

      {/* Glow ring */}
      <motion.div
        animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.15, 0.3, 0.15] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{
          position: 'absolute', width: 120, height: 120, borderRadius: '50%',
          border: '1px solid #818cf8',
          boxShadow: '0 0 40px 8px rgba(129,140,248,0.15)',
        }}
      />

      {/* Icon */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ fontSize: 52, lineHeight: 1, filter: 'drop-shadow(0 0 24px rgba(129,140,248,0.6))', marginBottom: 12 }}
      >
        🎓
      </motion.div>

      {/* Wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{
          fontFamily: '"Fraunces", "Cormorant Garamond", Georgia, serif',
          fontSize: 20, fontWeight: 700, letterSpacing: '0.22em',
          background: 'linear-gradient(135deg, #fff 0%, #c7d2fe 55%, #818cf8 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          DIGITAL BRIDGE
        </div>
        <div style={{ width: 64, height: 1.5, background: 'linear-gradient(90deg, transparent, #818cf8, transparent)', margin: '8px auto 0' }} />
      </motion.div>
    </div>
  );
}

function LibraryIllustration() {
  const rooms = [
    { icon: '🔐', color: '#818cf8', label: 'SPID' },
    { icon: '📧', color: '#60a5fa', label: 'PEC' },
    { icon: '📝', color: '#34d399', label: 'Word' },
    { icon: '📊', color: '#4ade80', label: 'Excel' },
    { icon: '🏛️', color: '#a78bfa', label: 'PA' },
    { icon: '❤️', color: '#f87171', label: 'Salute' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: 24 }}>
        {rooms.map((room, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.75, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.07, type: 'spring', stiffness: 300, damping: 22 }}
            style={{
              width: 72, height: 64, borderRadius: 12,
              background: `${room.color}14`,
              border: `1px solid ${room.color}35`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 4,
            }}
          >
            <span style={{ fontSize: 22 }}>{room.icon}</span>
            <span style={{ fontSize: 8, color: room.color, fontFamily: 'monospace', letterSpacing: 1, fontWeight: 700 }}>{room.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LessonsIllustration() {
  const items = ["Cos'è e a cosa serve", 'Come si attiva', 'Come si usa'];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 24px' }}>
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 24 }}
        style={{
          width: '100%', maxWidth: 240,
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 16, padding: 16,
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9, flexShrink: 0,
            background: '#34d39922', border: '1px solid #34d39940',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
          }}>📖</div>
          <div>
            <div style={{ fontSize: 8, color: '#34d399', fontFamily: 'monospace', letterSpacing: '0.18em' }}>M01 · LEZIONE 1</div>
            <div style={{ fontSize: 12, color: '#fff', fontWeight: 600, lineHeight: 1.2 }}>Cos'è lo SPID?</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, marginBottom: 12, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }} animate={{ width: '60%' }}
            transition={{ delay: 0.45, duration: 0.9, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #34d399, #059669)', borderRadius: 99 }}
          />
        </div>

        {/* Lesson steps */}
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.1 }}
            style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: i < items.length - 1 ? 7 : 0 }}
          >
            <div style={{
              width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
              background: i < 2 ? '#34d399' : 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 8, color: '#fff', fontWeight: 700,
            }}>
              {i < 2 ? '✓' : ''}
            </div>
            <span style={{ fontSize: 10, color: i < 2 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}>{item}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function ProgressIllustration() {
  const days = [3, 5, 2, 7, 4, 6, 5];
  const max = 7;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '12px 20px' }}>
      {/* Left: streak + XP */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: 40, filter: 'drop-shadow(0 0 14px rgba(251,146,60,0.55))' }}>🔥</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#fb923c', lineHeight: 1 }}>7</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', letterSpacing: '0.15em' }}>GIORNI</div>
        </motion.div>

        {/* XP bar */}
        <div style={{ width: 110 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>XP</span>
            <span style={{ fontSize: 8, color: '#fb923c', fontFamily: 'monospace' }}>340/500</span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }} animate={{ width: '68%' }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #fb923c, #fbbf24)', borderRadius: 99 }}
            />
          </div>
        </div>

        {/* Level badge */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          style={{
            padding: '3px 10px', borderRadius: 99,
            background: 'rgba(251,146,60,0.12)', border: '1px solid rgba(251,146,60,0.35)',
            fontSize: 9, color: '#fb923c', fontFamily: 'monospace', letterSpacing: '0.15em', fontWeight: 700,
          }}
        >
          LIVELLO 2
        </motion.div>
      </div>

      {/* Right: mini bar chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80 }}>
        {days.map((val, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${(val / max) * 72}px`, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: 'easeOut' }}
            style={{
              width: 14, borderRadius: '4px 4px 2px 2px',
              background: i === 3 ? 'linear-gradient(180deg, #fb923c, #f97316)' : 'rgba(255,255,255,0.1)',
              alignSelf: 'flex-end',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CertIllustration() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.12, type: 'spring', stiffness: 220, damping: 22 }}
        style={{
          width: 196, borderRadius: 14, padding: 18, textAlign: 'center',
          background: 'linear-gradient(160deg, #1c1600, #2a1e04)',
          border: '1px solid rgba(251,191,36,0.3)',
          boxShadow: '0 8px 40px rgba(251,191,36,0.08), inset 0 0 0 1px rgba(251,191,36,0.06)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div style={{ position: 'absolute', top: 0, inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.1), transparent 60%)' }} />

        {/* Corner accents */}
        {[[0, 0], [0, 'auto'], ['auto', 0], ['auto', 'auto']].map(([t2, r2], i) => (
          <div key={i} style={{
            position: 'absolute',
            top: t2 === 0 ? 8 : undefined, bottom: t2 === 'auto' ? 8 : undefined,
            left: r2 === 0 ? 8 : undefined, right: r2 === 'auto' ? 8 : undefined,
            width: 10, height: 10,
            borderTop: t2 === 0 ? '1.5px solid rgba(251,191,36,0.5)' : undefined,
            borderBottom: t2 === 'auto' ? '1.5px solid rgba(251,191,36,0.5)' : undefined,
            borderLeft: r2 === 0 ? '1.5px solid rgba(251,191,36,0.5)' : undefined,
            borderRight: r2 === 'auto' ? '1.5px solid rgba(251,191,36,0.5)' : undefined,
          }} />
        ))}

        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 8, color: '#fbbf24', fontFamily: 'monospace', letterSpacing: '0.28em', marginBottom: 8 }}>CERTIFICATO UFFICIALE</div>

          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            style={{ fontSize: 34, marginBottom: 6, filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.5))' }}
          >🏅</motion.div>

          <div style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '0.16em',
            fontFamily: '"Fraunces", Georgia, serif',
            background: 'linear-gradient(135deg, #fef3c7, #fbbf24)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: 4,
          }}>
            DIGITAL BRIDGE
          </div>

          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Modulo M01 · SPID & Identità Digitale</div>

          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.35), transparent)', marginBottom: 10 }} />

          <div style={{ fontSize: 10, color: 'rgba(251,243,199,0.8)', fontFamily: 'monospace' }}>Nome Cognome</div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', marginTop: 4 }}>2025 · ImagoAI · MedsendX Italia</div>
        </div>
      </motion.div>
    </div>
  );
}

function SofiaIllustration() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 20px' }}>
      <div style={{ width: '100%', maxWidth: 240, display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Sofia message */}
        <motion.div
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 }}
          style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}
        >
          <div style={{
            width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(167,139,250,0.18)', border: '1px solid rgba(167,139,250,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
          }}>🤖</div>
          <div style={{
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px 14px 14px 3px', padding: '9px 13px',
          }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.82)', lineHeight: 1.45 }}>
              Ciao! Sono Sofia 👋<br />Come posso aiutarti?
            </span>
          </div>
        </motion.div>

        {/* User message */}
        <motion.div
          initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.42 }}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <div style={{
            background: 'rgba(167,139,250,0.18)', border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: '14px 14px 3px 14px', padding: '9px 13px',
          }}>
            <span style={{ fontSize: 11, color: '#c4b5fd' }}>Come si attiva lo SPID?</span>
          </div>
        </motion.div>

        {/* Sofia typing */}
        <motion.div
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.75 }}
          style={{ display: 'flex', gap: 8, alignItems: 'center' }}
        >
          <div style={{
            width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(167,139,250,0.18)', border: '1px solid rgba(167,139,250,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
          }}>🤖</div>
          <div style={{
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px 14px 14px 3px', padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ delay: i * 0.16, repeat: Infinity, duration: 0.7, ease: 'easeInOut' }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa' }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Step config ────────────────────────────────────────────────────────────────
const STEPS = [
  { key: 'welcome',  accent: '#818cf8', from: '#1a174a', Illustration: WelcomeIllustration  },
  { key: 'library',  accent: '#60a5fa', from: '#0c1a38', Illustration: LibraryIllustration  },
  { key: 'lessons',  accent: '#34d399', from: '#032b29', Illustration: LessonsIllustration  },
  { key: 'progress', accent: '#fb923c', from: '#2d1600', Illustration: ProgressIllustration },
  { key: 'cert',     accent: '#fbbf24', from: '#2a1a00', Illustration: CertIllustration     },
  { key: 'sofia',    accent: '#a78bfa', from: '#1a0b3d', Illustration: SofiaIllustration    },
] as const;

// ── Component ──────────────────────────────────────────────────────────────────
interface OnboardingOverlayProps {
  onClose: () => void;
}

export function OnboardingOverlay({ onClose }: OnboardingOverlayProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const go = (delta: number) => {
    setDir(delta);
    setStep(s => Math.min(Math.max(0, s + delta), STEPS.length - 1));
  };

  const goTo = (i: number) => {
    setDir(i > step ? 1 : -1);
    setStep(i);
  };

  const finish = () => {
    markOnboardingDone();
    onClose();
  };

  const IllustrationComponent = current.Illustration;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(14px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: 400,
          background: '#0c0c14',
          borderRadius: 28,
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)',
        }}
        initial={{ opacity: 0, y: 48, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
      >
        {/* Skip / Close */}
        <button
          type="button"
          onClick={finish}
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 99, padding: '5px 10px 5px 8px',
          }}
        >
          <X style={{ width: 12, height: 12, color: 'rgba(255,255,255,0.4)' }} />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
            {t('onb.skip')}
          </span>
        </button>

        {/* ── Illustration panel ── */}
        <div
          style={{
            height: 218, position: 'relative', overflow: 'hidden',
            background: `linear-gradient(160deg, ${current.from} 0%, #090910 100%)`,
            transition: 'background 0.4s ease',
          }}
        >
          {/* Accent glow */}
          <div style={{
            position: 'absolute', top: 0, inset: 0, pointerEvents: 'none',
            background: `radial-gradient(ellipse 90% 100% at 50% -10%, ${current.accent}1a, transparent 65%)`,
            transition: 'background 0.4s ease',
          }} />
          {/* Bottom fade into card */}
          <div style={{
            position: 'absolute', bottom: 0, inset: 'auto 0 0',
            height: 40, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, transparent, #0c0c14)',
          }} />

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={{
                enter: (d: number) => ({ x: d * 48, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d * -48, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <IllustrationComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Text content ── */}
        <div style={{ padding: '20px 24px 0' }}>
          {/* Step counter */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${step}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.28em',
                color: current.accent, marginBottom: 8, fontWeight: 700,
                transition: 'color 0.3s ease',
              }}
            >
              {step + 1} / {STEPS.length}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${step}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.26 }}
            >
              <h2 style={{
                fontFamily: '"Fraunces", "Cormorant Garamond", Georgia, serif',
                fontSize: 22, fontWeight: 700, color: '#fff',
                lineHeight: 1.25, marginBottom: 10, marginTop: 0,
              }}>
                {t(`onb.${current.key}.title`)}
              </h2>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.6, margin: 0 }}>
                {t(`onb.${current.key}.desc`)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Footer: dots + buttons ── */}
        <div style={{ padding: '20px 24px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {STEPS.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                style={{
                  height: 6, borderRadius: 99, border: 'none', padding: 0, cursor: 'pointer',
                  width: i === step ? 20 : 6,
                  background: i === step ? current.accent : 'rgba(255,255,255,0.12)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {step > 0 && (
              <motion.button
                type="button"
                onClick={() => go(-1)}
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                style={{
                  width: 38, height: 38, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.05)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <ChevronLeft style={{ width: 16, height: 16, color: 'rgba(255,255,255,0.45)' }} />
              </motion.button>
            )}

            <button
              type="button"
              onClick={isLast ? finish : () => go(1)}
              style={{
                height: 38, borderRadius: 12, border: `1px solid ${current.accent}50`,
                padding: isLast ? '0 20px' : '0 16px',
                background: isLast
                  ? `linear-gradient(135deg, ${current.accent}dd, ${current.accent}99)`
                  : `${current.accent}18`,
                color: isLast ? '#fff' : current.accent,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                transition: 'all 0.25s ease',
                boxShadow: isLast ? `0 4px 20px ${current.accent}35` : 'none',
              }}
            >
              {isLast ? t('onb.start') : t('onb.next')}
              {!isLast && <ChevronRight style={{ width: 14, height: 14 }} />}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
