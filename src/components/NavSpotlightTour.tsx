import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SpotlightStep {
  selector: string;
  titleIT: string;
  titleEN: string;
  descIT: string;
  descEN: string;
  color: string;
}

const STEPS: SpotlightStep[] = [
  {
    selector: '[data-tour="nav-home"]',
    titleIT: '🏠 Home',
    titleEN: '🏠 Home',
    descIT: 'Il tuo pannello principale. Trovi i progressi, lo streak giornaliero e il modulo consigliato da continuare.',
    descEN: 'Your main dashboard. See your progress, daily streak and the recommended module to continue.',
    color: '#6366f1',
  },
  {
    selector: '[data-tour="nav-library"]',
    titleIT: '📚 Biblioteca',
    titleEN: '📚 Library',
    descIT: 'Esplora tutti i moduli di apprendimento. Scegli un argomento e inizia le lezioni al tuo ritmo.',
    descEN: 'Explore all learning modules. Choose a topic and start lessons at your own pace.',
    color: '#60a5fa',
  },
  {
    selector: '[data-tour="nav-progress"]',
    titleIT: '📈 Progressi',
    titleEN: '📈 Progress',
    descIT: 'Visualizza le ore di studio, il livello raggiunto, i certificati ottenuti e la tua attività settimanale.',
    descEN: 'View your study hours, current level, earned certificates and weekly activity.',
    color: '#34d399',
  },
  {
    selector: '[data-tour="nav-certification"]',
    titleIT: '🎓 Certificazioni',
    titleEN: '🎓 Certifications',
    descIT: "Sostieni l'esame finale per ogni modulo e ottieni il tuo certificato DIGITAL BRIDGE ufficiale.",
    descEN: 'Take the final exam for each module and earn your official DIGITAL BRIDGE certificate.',
    color: '#fbbf24',
  },
  {
    selector: '[data-tour="nav-chat"]',
    titleIT: '💬 Sofia — AI Teacher',
    titleEN: '💬 Sofia — AI Teacher',
    descIT: 'La tua insegnante virtuale AI. Chiedile aiuto in qualsiasi momento: spiegazioni, dubbi, guida passo dopo passo.',
    descEN: 'Your virtual AI teacher. Ask for help any time: explanations, questions, step-by-step guidance.',
    color: '#3b82f6',
  },
  {
    selector: '[data-tour="nav-profile"]',
    titleIT: '⚙️ Impostazioni',
    titleEN: '⚙️ Settings',
    descIT: 'Modifica il tuo profilo, cambia la lingua, carica una foto e fai il logout dal tuo account.',
    descEN: 'Edit your profile, change language, upload a photo and log out of your account.',
    color: '#a78bfa',
  },
];

const PAD = 10;

export function NavSpotlightTour({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const updateRect = () => {
    const el = document.querySelector(current.selector);
    if (el) setRect(el.getBoundingClientRect());
  };

  useEffect(() => {
    const t = setTimeout(updateRect, 60);
    window.addEventListener('resize', updateRect);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateRect);
    };
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  const goNext = () => {
    if (isLast) onClose();
    else setStep(s => s + 1);
  };

  if (!rect) return null;

  const W = window.innerWidth;
  const H = window.innerHeight;

  const sTop    = Math.max(0, rect.top    - PAD);
  const sLeft   = Math.max(0, rect.left   - PAD);
  const sRight  = Math.min(W, rect.right  + PAD);
  const sBottom = Math.min(H, rect.bottom + PAD);
  const sW = sRight - sLeft;
  const sH = sBottom - sTop;

  // Callout sits above the spotlight
  const calloutBottomPx = H - sTop + 16;

  return (
    <motion.div
      className="fixed inset-0 z-[300]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* ── Dark overlay — 4 panels around the spotlight ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: sTop, background: 'rgba(0,0,0,0.8)', transition: 'height 0.3s' }} />
      <div style={{ position: 'absolute', top: sBottom, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', transition: 'top 0.3s' }} />
      <div style={{ position: 'absolute', top: sTop, height: sH, left: 0, width: sLeft, background: 'rgba(0,0,0,0.8)', transition: 'all 0.3s' }} />
      <div style={{ position: 'absolute', top: sTop, height: sH, left: sRight, right: 0, background: 'rgba(0,0,0,0.8)', transition: 'all 0.3s' }} />

      {/* ── Spotlight ring ── */}
      <motion.div
        key={`ring-${step}`}
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
        style={{
          position: 'absolute',
          top: sTop, left: sLeft,
          width: sW, height: sH,
          borderRadius: 14,
          border: `2px solid ${current.color}`,
          boxShadow: `0 0 0 5px ${current.color}28, 0 0 28px ${current.color}55`,
          pointerEvents: 'none',
        }}
      />

      {/* ── Callout bubble ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`callout-${step}`}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          style={{
            position: 'absolute',
            bottom: calloutBottomPx,
            left: 16, right: 16,
            background: 'linear-gradient(160deg, #12121e, #0e0e18)',
            borderRadius: 22,
            padding: '20px 20px 16px',
            border: `1px solid ${current.color}38`,
            boxShadow: `0 16px 60px rgba(0,0,0,0.85), 0 0 0 1px ${current.color}18`,
          }}
        >
          {/* Step counter */}
          <div style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.22em', color: current.color, marginBottom: 6, fontWeight: 700 }}>
            {step + 1} / {STEPS.length}
          </div>

          {/* Title */}
          <h3 style={{ margin: '0 0 8px', fontFamily: '"Fraunces", Georgia, serif', fontSize: 21, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
            {lang === 'it' ? current.titleIT : current.titleEN}
          </h3>

          {/* Description */}
          <p style={{ margin: '0 0 14px', fontSize: 13.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.6 }}>
            {lang === 'it' ? current.descIT : current.descEN}
          </p>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{
                height: 4, borderRadius: 99,
                width: i === step ? 18 : 4,
                background: i === step ? current.color : 'rgba(255,255,255,0.12)',
                transition: 'all 0.25s',
              }} />
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={onClose}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 12, color: 'rgba(255,255,255,0.28)',
                padding: '6px 0', fontFamily: 'monospace', letterSpacing: '0.08em',
              }}
            >
              {lang === 'it' ? 'Salta' : 'Skip'}
            </button>
            <button
              onClick={goNext}
              style={{
                background: `linear-gradient(135deg, ${current.color}ee, ${current.color}99)`,
                border: 'none', cursor: 'pointer',
                borderRadius: 12, padding: '10px 22px',
                fontSize: 13, fontWeight: 600, color: '#fff',
                display: 'flex', alignItems: 'center', gap: 5,
                boxShadow: `0 4px 18px ${current.color}45`,
              }}
            >
              {isLast
                ? (lang === 'it' ? '🎉 Inizia!' : '🎉 Start!')
                : (lang === 'it' ? 'Avanti' : 'Next')}
              {!isLast && <ChevronRight style={{ width: 14, height: 14 }} />}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Top-right skip button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 16, right: 16,
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 99, padding: '6px 12px 6px 10px',
          display: 'flex', alignItems: 'center', gap: 5,
          cursor: 'pointer', color: 'rgba(255,255,255,0.35)',
          fontSize: 11, fontFamily: 'monospace',
        }}
      >
        <X style={{ width: 11, height: 11 }} />
        {lang === 'it' ? 'Salta' : 'Skip'}
      </button>
    </motion.div>
  );
}
