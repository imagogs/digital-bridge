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

      {/* ── Callout bubble — compact, centered above spotlight ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`callout-${step}`}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            bottom: calloutBottomPx,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `min(300px, calc(100vw - 32px))`,
            background: 'linear-gradient(160deg, #14141f, #0d0d17)',
            borderRadius: 18,
            padding: '14px 16px 12px',
            border: `1px solid ${current.color}40`,
            boxShadow: `0 8px 40px rgba(0,0,0,0.9), 0 0 0 1px ${current.color}15`,
          }}
        >
          {/* Step counter + close */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.22em', color: current.color, fontWeight: 700 }}>
              {step + 1} / {STEPS.length}
            </span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: 'rgba(255,255,255,0.25)', display: 'flex' }}>
              <X style={{ width: 12, height: 12 }} />
            </button>
          </div>

          {/* Title */}
          <h3 style={{ margin: '0 0 5px', fontFamily: '"Fraunces", Georgia, serif', fontSize: 17, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
            {lang === 'it' ? current.titleIT : current.titleEN}
          </h3>

          {/* Description */}
          <p style={{ margin: '0 0 10px', fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>
            {lang === 'it' ? current.descIT : current.descEN}
          </p>

          {/* Progress dots + Next button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {STEPS.map((_, i) => (
                <div key={i} style={{
                  height: 3, borderRadius: 99,
                  width: i === step ? 14 : 3,
                  background: i === step ? current.color : 'rgba(255,255,255,0.12)',
                  transition: 'all 0.25s',
                }} />
              ))}
            </div>
            <button
              onClick={goNext}
              style={{
                background: `linear-gradient(135deg, ${current.color}ee, ${current.color}99)`,
                border: 'none', cursor: 'pointer',
                borderRadius: 10, padding: '7px 16px',
                fontSize: 12, fontWeight: 600, color: '#fff',
                display: 'flex', alignItems: 'center', gap: 4,
                boxShadow: `0 3px 12px ${current.color}40`,
              }}
            >
              {isLast
                ? (lang === 'it' ? '🎉 Inizia!' : '🎉 Start!')
                : (lang === 'it' ? 'Avanti' : 'Next')}
              {!isLast && <ChevronRight style={{ width: 13, height: 13 }} />}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
