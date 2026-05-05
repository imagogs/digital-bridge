import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getLessonsForModule } from '../data/lessonsManager';
import { tools } from '../data/tools';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LessonOverlay } from './LessonOverlay';
import type { Lesson } from '../data/lessons';

// ── Responsive hook ──────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return width;
}

// ── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg: '#fbf6ec',
  ink: '#1d1933',
  inkDim: 'rgba(29,25,51,0.55)',
  inkMute: 'rgba(29,25,51,0.35)',
  cream: '#f4ecd9',
  yellow: '#ffd166',
  pink: '#ff8da3',
  blue: '#5b8def',
  green: '#5cc4a3',
  purple: '#8b5cf6',
  orange: '#ff9b6a',
  serif: '"Fraunces", "Cormorant Garamond", Georgia, serif',
  sans: '"Space Grotesk", "Inter", system-ui, sans-serif',
  mono: '"DM Mono", "Fira Mono", monospace',
};

function hsl(hue: number, s = 72, l = 62) {
  return `hsl(${hue}, ${s}%, ${l}%)`;
}
function hslSoft(hue: number) {
  return `hsl(${hue}, 60%, 93%)`;
}

// ── Group data ───────────────────────────────────────────────────────────────
interface Group {
  id: string;
  code: string;
  titleKey: string;
  descKey: string;
  hue: number;
  toolId: string | null;
  signature: string;
  locked: boolean;
}

const GROUPS: Group[] = [
  { id: 'identita',     code: 'G01', titleKey: 'lib.g01.title', descKey: 'lib.g01.desc', hue: 248, toolId: 'spid',        signature: 'shield',    locked: false },
  { id: 'posta',        code: 'G02', titleKey: 'lib.g02.title', descKey: 'lib.g02.desc', hue: 218, toolId: 'pec',         signature: 'envelope',  locked: false },
  { id: 'comunicazione',code: 'G03', titleKey: 'lib.g03.title', descKey: 'lib.g03.desc', hue: 168, toolId: 'email',       signature: 'phone',     locked: false },
  { id: 'office',       code: 'G04', titleKey: 'lib.g04.title', descKey: 'lib.g04.desc', hue: 208, toolId: 'word',        signature: 'page',      locked: false },
  { id: 'fogli',        code: 'G05', titleKey: 'lib.g05.title', descKey: 'lib.g05.desc', hue: 142, toolId: 'excel',       signature: 'grid',      locked: false },
  { id: 'pa',           code: 'G06', titleKey: 'lib.g06.title', descKey: 'lib.g06.desc', hue: 268, toolId: 'portali-pa', signature: 'columns',   locked: false },
  { id: 'salute',       code: 'G07', titleKey: 'lib.g07.title', descKey: 'lib.g07.desc', hue: 12,  toolId: null,          signature: 'cross',     locked: true  },
  { id: 'pagamenti',    code: 'G08', titleKey: 'lib.g08.title', descKey: 'lib.g08.desc', hue: 38,  toolId: null,          signature: 'piggy',     locked: true  },
  { id: 'sicurezza',    code: 'G09', titleKey: 'lib.g09.title', descKey: 'lib.g09.desc', hue: 282, toolId: null,          signature: 'lock',      locked: true  },
  { id: 'lavoro',       code: 'G10', titleKey: 'lib.g10.title', descKey: 'lib.g10.desc', hue: 190, toolId: null,          signature: 'briefcase', locked: true  },
];

// ── SVG Room Illustrations ───────────────────────────────────────────────────
function RoomIllustration({ group, size = 240 }: { group: Group; size?: number }) {
  const accent = hsl(group.hue, 70, 58);
  const accentLight = hsl(group.hue, 55, 78);
  const accentBg = hsl(group.hue, 50, 92);
  const bookColors = [
    hsl(group.hue, 68, 52), hsl(group.hue + 30, 60, 60),
    hsl(group.hue - 20, 72, 55), hsl(group.hue + 15, 55, 65),
    hsl(group.hue - 40, 65, 50),
  ];
  return (
    <svg width={size} height={size * 0.78} viewBox="0 0 240 187" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="187" rx="16" fill={accentBg} />
      <line x1="0" y1="125" x2="240" y2="125" stroke={accentLight} strokeWidth="0.5" strokeOpacity="0.6" />
      <line x1="0" y1="60" x2="240" y2="60" stroke={accentLight} strokeWidth="0.3" strokeOpacity="0.3" />
      <rect x="0" y="150" width="240" height="37" fill={accentLight} fillOpacity="0.4" />
      <rect x="0" y="149" width="240" height="2" fill={accentLight} fillOpacity="0.8" />
      <rect x="20" y="90" width="120" height="58" rx="4" fill={T.ink} fillOpacity="0.06" />
      <rect x="20" y="143" width="120" height="5" rx="2" fill={T.ink} fillOpacity="0.18" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const bw = [14, 18, 12, 16, 13, 17][i];
        const bh = [50, 42, 54, 46, 52, 40][i];
        const bx = 26 + [0, 16, 36, 50, 68, 83][i];
        return (
          <g key={i} className={`rm-book b${i + 1}`}>
            <rect x={bx} y={143 - bh} width={bw} height={bh} rx="2" fill={bookColors[i % bookColors.length]} />
            <rect x={bx} y={143 - bh} width={bw} height="4" rx="2" fill="rgba(255,255,255,0.3)" />
            <rect x={bx + 2} y={143 - bh + 8} width={bw - 4} height="1.5" rx="1" fill="rgba(255,255,255,0.25)" />
            <rect x={bx + 2} y={143 - bh + 12} width={bw - 6} height="1.5" rx="1" fill="rgba(255,255,255,0.2)" />
          </g>
        );
      })}
      <SignatureObject type={group.signature} accent={accent} x={160} y={90} />
      <g className="rm-lamp-shade">
        <rect x="192" y="30" width="24" height="18" rx="3" fill={T.yellow} fillOpacity="0.85" />
        <rect x="203" y="48" width="2" height="20" fill={T.ink} fillOpacity="0.3" />
        <ellipse cx="204" cy="70" rx="8" ry="3" fill={T.ink} fillOpacity="0.15" />
        <ellipse cx="204" cy="50" rx="18" ry="12" fill={T.yellow} className="rm-lamp-glow" fillOpacity="0.15" />
      </g>
      <g className="rm-plant">
        <rect x="10" y="140" width="14" height="10" rx="3" fill={hsl(group.hue, 40, 45)} fillOpacity="0.6" />
        <ellipse cx="17" cy="138" rx="10" ry="14" fill={T.green} fillOpacity="0.75" />
        <ellipse cx="11" cy="132" rx="7" ry="10" fill={T.green} fillOpacity="0.6" />
        <ellipse cx="23" cy="130" rx="8" ry="11" fill={T.green} fillOpacity="0.55" />
      </g>
      <rect x="20" y="162" width="38" height="16" rx="8" fill={T.ink} fillOpacity="0.1" />
      <text x="39" y="174" textAnchor="middle" fontFamily={T.mono} fontSize="9" fill={T.ink} fillOpacity="0.5">{group.code}</text>
    </svg>
  );
}

function SignatureObject({ type, accent, x, y }: { type: string; accent: string; x: number; y: number }) {
  switch (type) {
    case 'shield':
      return (
        <g transform={`translate(${x},${y})`}>
          <path d="M20 5 L35 10 L35 26 Q35 36 20 42 Q5 36 5 26 L5 10 Z" fill={accent} fillOpacity="0.9" />
          <path d="M14 22 L18 26 L26 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case 'envelope':
      return (
        <g transform={`translate(${x},${y})`}>
          <rect x="4" y="10" width="32" height="24" rx="4" fill={accent} fillOpacity="0.9" />
          <path d="M4 14 L20 24 L36 14" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <rect x="12" y="30" width="16" height="2" rx="1" fill="white" fillOpacity="0.4" />
        </g>
      );
    case 'phone':
      return (
        <g transform={`translate(${x},${y})`}>
          <rect x="11" y="5" width="18" height="32" rx="4" fill={accent} fillOpacity="0.9" />
          <rect x="14" y="10" width="12" height="18" rx="2" fill="white" fillOpacity="0.9" />
          <circle cx="20" cy="33" r="2" fill="white" fillOpacity="0.6" />
        </g>
      );
    case 'page':
      return (
        <g transform={`translate(${x},${y})`}>
          <rect x="8" y="4" width="24" height="30" rx="3" fill={accent} fillOpacity="0.9" />
          <rect x="12" y="10" width="16" height="2" rx="1" fill="white" fillOpacity="0.7" />
          <rect x="12" y="15" width="12" height="2" rx="1" fill="white" fillOpacity="0.5" />
          <rect x="12" y="20" width="14" height="2" rx="1" fill="white" fillOpacity="0.5" />
          <rect x="12" y="25" width="10" height="2" rx="1" fill="white" fillOpacity="0.5" />
          <path d="M26 4 L32 10 L26 10 Z" fill="white" fillOpacity="0.3" />
        </g>
      );
    case 'grid':
      return (
        <g transform={`translate(${x},${y})`}>
          <rect x="5" y="5" width="30" height="32" rx="4" fill={accent} fillOpacity="0.9" />
          {[0, 1, 2].map(row => [0, 1, 2].map(col => (
            <rect key={`${row}-${col}`} x={8 + col * 9} y={10 + row * 9} width="7" height="7" rx="1"
              fill="white" fillOpacity={row === 0 ? 0.7 : 0.35} />
          )))}
        </g>
      );
    case 'columns':
      return (
        <g transform={`translate(${x},${y})`}>
          <rect x="5" y="30" width="30" height="8" rx="2" fill={accent} fillOpacity="0.9" />
          {[0, 1, 2].map(i => (
            <rect key={i} x={8 + i * 10} y={12} width="8" height={18} rx="2" fill={accent} fillOpacity="0.7" />
          ))}
          <rect x="5" y="10" width="30" height="4" rx="2" fill={accent} fillOpacity="0.9" />
        </g>
      );
    case 'cross':
      return (
        <g transform={`translate(${x},${y})`}>
          <rect x="14" y="5" width="12" height="32" rx="4" fill={accent} fillOpacity="0.9" />
          <rect x="5" y="14" width="30" height="12" rx="4" fill={accent} fillOpacity="0.9" />
        </g>
      );
    case 'piggy':
      return (
        <g transform={`translate(${x},${y})`}>
          <ellipse cx="20" cy="22" rx="14" ry="13" fill={accent} fillOpacity="0.9" />
          <circle cx="27" cy="18" r="4" fill={accent} fillOpacity="0.7" />
          <circle cx="16" cy="18" r="3" fill="white" fillOpacity="0.4" />
          <rect x="16" y="8" width="8" height="3" rx="1.5" fill={accent} fillOpacity="0.7" />
          <rect x="13" y="32" width="4" height="8" rx="2" fill={accent} fillOpacity="0.7" />
          <rect x="23" y="32" width="4" height="8" rx="2" fill={accent} fillOpacity="0.7" />
        </g>
      );
    case 'lock':
      return (
        <g transform={`translate(${x},${y})`}>
          <rect x="8" y="18" width="24" height="20" rx="4" fill={accent} fillOpacity="0.9" />
          <path d="M12 18 L12 12 Q12 4 20 4 Q28 4 28 12 L28 18" stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round" fillOpacity="0.9" />
          <circle cx="20" cy="27" r="3" fill="white" fillOpacity="0.7" />
          <rect x="19" y="28" width="2" height="5" rx="1" fill="white" fillOpacity="0.5" />
        </g>
      );
    case 'briefcase':
      return (
        <g transform={`translate(${x},${y})`}>
          <rect x="5" y="14" width="30" height="22" rx="4" fill={accent} fillOpacity="0.9" />
          <path d="M14 14 L14 10 Q14 6 20 6 Q26 6 26 10 L26 14" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          <rect x="5" y="22" width="30" height="3" rx="1" fill="white" fillOpacity="0.25" />
          <rect x="17" y="20" width="6" height="7" rx="2" fill="white" fillOpacity="0.4" />
        </g>
      );
    default:
      return null;
  }
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: '14px 18px',
      boxShadow: '0 2px 8px rgba(29,25,51,.05)',
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: '0.22em', color: T.inkMute }}>{label.toUpperCase()}</div>
      <div style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 500, color: T.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 7, height: 7, borderRadius: 4, background: color, display: 'inline-block', flexShrink: 0 }} />
        {value}
      </div>
    </div>
  );
}

// ── Room Card ────────────────────────────────────────────────────────────────
function RoomCard({ group, completedLessons, earnedCertificates, onClick, compact }: {
  group: Group;
  completedLessons: string[];
  earnedCertificates: string[];
  onClick: () => void;
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const { t, lang } = useLanguage();
  const lessons = group.toolId ? getLessonsForModule(group.toolId, lang) : [];
  const done = lessons.filter(l => completedLessons.includes(l.id)).length;
  const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0;
  const certified = group.toolId ? earnedCertificates.includes(group.toolId) : false;
  const accent = hsl(group.hue, 70, 58);
  const accentSoft = hslSoft(group.hue);

  return (
    <motion.div
      className="rm-card"
      onClick={group.locked ? undefined : onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        cursor: group.locked ? 'default' : 'pointer',
        boxShadow: hovered && !group.locked
          ? '0 24px 48px rgba(29,25,51,.14), 0 8px 16px rgba(29,25,51,.06)'
          : '0 4px 12px rgba(29,25,51,.05)',
        transform: hovered && !group.locked ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.32s cubic-bezier(.2,.8,.3,1.2)',
        opacity: group.locked ? 0.65 : 1, position: 'relative',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: group.locked ? 0.65 : 1, y: 0 }}
      transition={{ delay: 0.04 * GROUPS.indexOf(group) }}
    >
      {/* Illustration */}
      <div style={{ position: 'relative', background: accentSoft }}>
        <RoomIllustration group={group} size={compact ? 200 : 280} />
        {certified && (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            background: T.yellow, color: T.ink, fontFamily: T.mono,
            fontSize: 9, fontWeight: 600, letterSpacing: '0.15em',
            padding: '4px 10px', borderRadius: 999,
            boxShadow: '0 2px 8px rgba(255,209,102,.5)',
          }}>✦ {t('lib.certBadge')}</div>
        )}
        {group.locked && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(251,246,236,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(2px)',
          }}>
            <div style={{
              background: T.ink, color: T.cream, fontFamily: T.mono,
              fontSize: 10, letterSpacing: '0.22em', padding: '8px 16px', borderRadius: 999,
            }}>{t('lib.comingSoon')}</div>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: compact ? '12px 14px 16px' : '16px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: T.inkMute, letterSpacing: '0.2em' }}>{group.code}</span>
          {!group.locked && pct > 0 && (
            <span style={{ fontFamily: T.mono, fontSize: 10, color: accent }}>{pct}%</span>
          )}
        </div>
        <h3 style={{ margin: 0, fontFamily: T.serif, fontSize: compact ? 16 : 20, fontWeight: 500, color: T.ink, lineHeight: 1.2 }}>
          {t(group.titleKey)}
        </h3>
        {!compact && (
          <p style={{ margin: '6px 0 12px', fontFamily: T.sans, fontSize: 12, color: T.inkDim, lineHeight: 1.5 }}>
            {t(group.descKey)}
          </p>
        )}
        {!group.locked && (
          <div style={{ height: 3, background: '#f0ece2', borderRadius: 999, overflow: 'hidden', marginTop: compact ? 8 : 0 }}>
            <motion.div
              style={{ height: '100%', background: accent, borderRadius: 999 }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Chip ─────────────────────────────────────────────────────────────────────
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      background: '#fff', borderRadius: 999, padding: '6px 14px',
      fontFamily: T.sans, fontSize: 12, color: T.inkDim,
      boxShadow: '0 1px 4px rgba(29,25,51,.07)',
      display: 'inline-flex', alignItems: 'center',
    }}>{children}</span>
  );
}

// ── Group Screen ─────────────────────────────────────────────────────────────
function GroupScreen({ group, completedLessons, earnedCertificates, onClose, onStartLesson }: {
  group: Group;
  completedLessons: string[];
  earnedCertificates: string[];
  onClose: () => void;
  onStartLesson: (lesson: Lesson) => void;
}) {
  const { t, lang } = useLanguage();
  const width = useWindowWidth();
  const isMobile = width < 640;

  const tool = group.toolId ? tools.find(t => t.id === group.toolId) : null;
  const lessons = group.toolId ? getLessonsForModule(group.toolId, lang) : [];
  const done = lessons.filter(l => completedLessons.includes(l.id)).length;
  const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0;
  const accent = hsl(group.hue, 70, 58);
  const accentSoft = hslSoft(group.hue);
  const certified = group.toolId ? earnedCertificates.includes(group.toolId) : false;
  const totalXP = lessons.reduce((s, l) => s + l.xp, 0);
  const earnedXP = lessons.filter(l => completedLessons.includes(l.id)).reduce((s, l) => s + l.xp, 0);
  const nextLesson = lessons.find(l => !completedLessons.includes(l.id));

  const pad = isMobile ? '0 16px' : '0 40px';
  const navPad = isMobile ? '14px 16px' : '24px 40px';
  const heroFontSize = isMobile ? 36 : 56;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.28 }}
      style={{ minHeight: '100vh', background: T.bg, color: T.ink, fontFamily: T.sans, paddingBottom: 120, overflowY: 'auto' }}
    >
      {/* Top nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: navPad, gap: 12 }}>
        <button
          onClick={onClose}
          style={{
            background: '#fff', border: 'none', padding: '10px 18px', borderRadius: 999,
            fontFamily: T.sans, fontSize: 13, fontWeight: 500,
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(29,25,51,.08)',
            color: T.ink, display: 'flex', alignItems: 'center', gap: 6,
            minHeight: 44, whiteSpace: 'nowrap',
          }}>
          ← {t('lib.backBtn')}
        </button>
        <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.25em', color: T.inkDim, flexShrink: 0 }}>
          {t('lib.roomLabel')} {group.code}
        </div>
        <div style={{ width: isMobile ? 0 : 100, flexShrink: 0 }} />
      </div>

      <div style={{ padding: pad, maxWidth: 1200, margin: '0 auto' }}>
        {/* Hero card */}
        <div style={{
          background: accentSoft, borderRadius: 24, padding: isMobile ? '24px 20px' : '36px 40px',
          marginBottom: 16, display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
          gap: isMobile ? 20 : 32, alignItems: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -60, top: -60, width: 200, height: 200, borderRadius: '50%', background: accent, opacity: 0.08 }} />
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.25em', color: T.inkDim, marginBottom: 10 }}>
              ● {t('lib.roomLabel')} {group.code.replace('G', '')} · {t('lib.basePath')}
            </div>
            <h1 style={{ margin: 0, fontFamily: T.serif, fontSize: heroFontSize, fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.02em' }}>
              {t(group.titleKey)}
            </h1>
            <p style={{ marginTop: 12, marginBottom: 0, fontSize: 14, lineHeight: 1.6, color: T.inkDim, maxWidth: 500 }}>
              {t(group.descKey)}
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <Chip>📚 {lessons.length} {t('lib.lessonsChip')}</Chip>
              <Chip>✦ {totalXP} {t('lib.xpChip')}</Chip>
              {certified && <Chip>🏆 {t('lib.certChip')}</Chip>}
            </div>
          </div>
          {!isMobile && <RoomIllustration group={group} size={180} />}
        </div>

        {/* Stats row */}
        <div style={{
          background: '#fff', borderRadius: 18,
          padding: isMobile ? '16px 18px' : '18px 24px', marginBottom: 16,
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 12, alignItems: 'center',
          boxShadow: '0 2px 8px rgba(29,25,51,.05)',
        }}>
          {[
            { label: t('lib.lessonsCompleted'), value: `${done}/${lessons.length}` },
            { label: t('lib.xpStats'),          value: `${earnedXP} XP` },
            { label: t('lib.progressLabel'),     value: `${pct}%` },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: '0.18em', color: T.inkMute, marginBottom: 3 }}>{s.label.toUpperCase()}</div>
              <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 500 }}>{s.value}</div>
            </div>
          ))}
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: '0.18em', color: T.inkMute, marginBottom: 6 }}>{t('lib.progressBar')}</div>
            <div style={{ height: 7, background: '#f0ece2', borderRadius: 999, overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: accent, borderRadius: 999 }}
                initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Continue CTA */}
        {tool && nextLesson && (
          <div style={{
            background: T.ink, color: T.cream, borderRadius: 18,
            padding: isMobile ? '18px 20px' : '20px 26px', marginBottom: 24,
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between', gap: 16,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', right: -20, top: -30, width: 120, height: 120, borderRadius: '50%', background: T.yellow, opacity: 0.12 }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.22em', opacity: 0.6, marginBottom: 6 }}>
                {done === 0 ? t('lib.startWith') : t('lib.continueFrom')}
              </div>
              <div style={{ fontFamily: T.serif, fontSize: isMobile ? 20 : 24, fontWeight: 500 }}>{nextLesson.title}</div>
              <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>
                {nextLesson.duration} · +{nextLesson.xp} XP
              </div>
            </div>
            <button
              onClick={() => onStartLesson(nextLesson)}
              style={{
                background: T.yellow, color: T.ink, border: 'none',
                padding: '14px 24px', borderRadius: 999,
                fontFamily: T.sans, fontSize: 14, fontWeight: 700,
                cursor: 'pointer', whiteSpace: 'nowrap',
                boxShadow: `0 6px 20px ${T.yellow}88`, flexShrink: 0,
                minHeight: 48, alignSelf: isMobile ? 'stretch' : 'auto',
                textAlign: 'center',
              }}>
              ▶ {done === 0 ? t('lib.startBtn') : t('lib.resumeBtn')}
            </button>
          </div>
        )}

        {/* Lessons list */}
        {lessons.length > 0 && (
          <div>
            <h2 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 500, margin: '0 0 14px', color: T.ink }}>
              {t('lib.lessonsTitle')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {lessons.map((lesson, idx) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isUnlocked = idx === 0 || completedLessons.includes(lessons[idx - 1]?.id);
                const isClickable = isCompleted || isUnlocked;
                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={isClickable ? () => onStartLesson(lesson) : undefined}
                    style={{
                      background: '#fff', borderRadius: 14, padding: '14px 18px',
                      display: 'flex', alignItems: 'center', gap: 12,
                      boxShadow: '0 1px 4px rgba(29,25,51,.05)',
                      cursor: isClickable ? 'pointer' : 'default',
                      opacity: !isClickable ? 0.4 : 1,
                      transition: 'box-shadow .2s', minHeight: 56,
                    }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: isCompleted ? T.green : isUnlocked ? accent : '#f0ece2',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
                    }}>
                      {isCompleted ? '✓' : isUnlocked ? '▶' : String(idx + 1).padStart(2, '0')}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 500, fontSize: 14, color: T.ink, marginBottom: 2 }}>{lesson.title}</div>
                      <div style={{ fontFamily: T.mono, fontSize: 11, color: T.inkMute }}>{lesson.duration} · +{lesson.xp} XP</div>
                    </div>
                    {isCompleted && (
                      <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: '0.2em', color: T.green, background: `${T.green}20`, padding: '4px 10px', borderRadius: 999, flexShrink: 0 }}>
                        {t('lib.completedBadge')}
                      </span>
                    )}
                    {!isCompleted && isUnlocked && (
                      <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: '0.2em', color: accent, background: `${accent}20`, padding: '4px 10px', borderRadius: 999, flexShrink: 0 }}>
                        {t('lib.nextBadge')}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Library Home ─────────────────────────────────────────────────────────────
function LibraryHome({ completedLessons, earnedCertificates, onOpenGroup, profile, onOpenProfile }: {
  completedLessons: string[];
  earnedCertificates: string[];
  onOpenGroup: (g: Group) => void;
  profile: any;
  onOpenProfile?: () => void;
}) {
  const { t, lang } = useLanguage();
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  const totalCompleted = completedLessons.length;
  const totalXP = GROUPS.filter(g => g.toolId).reduce((s, g) => {
    const ls = getLessonsForModule(g.toolId!, lang);
    return s + ls.filter(l => completedLessons.includes(l.id)).reduce((a, l) => a + l.xp, 0);
  }, 0);
  const groupsDone = GROUPS.filter(g => {
    if (!g.toolId) return false;
    const ls = getLessonsForModule(g.toolId, lang);
    return ls.length > 0 && ls.every(l => completedLessons.includes(l.id));
  }).length;

  const firstName = (profile?.displayName || '').split(' ')[0] || '';
  const inProgress = GROUPS.find(g => {
    if (!g.toolId) return false;
    const ls = getLessonsForModule(g.toolId, lang);
    const d = ls.filter(l => completedLessons.includes(l.id)).length;
    return d > 0 && d < ls.length;
  });
  const nextGroup = inProgress || GROUPS.find(g => {
    if (!g.toolId) return false;
    const ls = getLessonsForModule(g.toolId, lang);
    return !ls.some(l => completedLessons.includes(l.id));
  });
  const nextLesson = nextGroup?.toolId
    ? getLessonsForModule(nextGroup.toolId, lang).find(l => !completedLessons.includes(l.id))
    : null;
  const headerPad = isMobile ? '14px 16px' : '24px 40px';
  const heroPad = isMobile ? '20px 16px 16px' : '28px 40px 20px';
  const contentPad = isMobile ? '0 16px' : '0 40px';

  return (
    <div style={{
      minHeight: '100vh', background: T.bg, color: T.ink,
      fontFamily: T.sans, paddingBottom: 100,
      backgroundImage: `radial-gradient(circle at 6% 0%, ${T.yellow}28 0%, transparent 32%), radial-gradient(circle at 94% 16%, ${T.pink}18 0%, transparent 36%)`,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: headerPad, gap: 12 }}>
        <div style={{ fontFamily: T.serif, fontWeight: 600, fontSize: isMobile ? 15 : 18, letterSpacing: '0.18em', color: T.ink }}>
          DIGITAL BRIDGE
        </div>
        <div style={{
          padding: '7px 14px', background: '#fff', borderRadius: 999, fontSize: 12,
          fontWeight: 500, boxShadow: '0 2px 8px rgba(0,0,0,.05)',
          display: 'flex', alignItems: 'center', gap: 6, color: T.ink,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.green, display: 'inline-block' }} />
          {totalXP} XP
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: heroPad, maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ width: 7, height: 7, borderRadius: 4, background: T.pink }} />
          <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.22em', color: T.inkDim }}>
            {firstName ? `${firstName.toUpperCase()}, ` : ''}{totalCompleted === 0 ? t('lib.welcome') : t('lib.welcomeBack')}
          </span>
        </div>
        <h1 style={{
          margin: '0 0 24px', fontFamily: T.serif,
          fontSize: isMobile ? 'clamp(38px, 9vw, 52px)' : 'clamp(52px, 6vw, 80px)',
          fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.02em',
          maxWidth: isMobile ? '100%' : 860,
        }}>
          {t('lib.hero1')}{' '}
          <span style={{
            background: T.yellow, padding: isMobile ? '1px 10px' : '2px 14px', borderRadius: 10,
            display: 'inline-block', transform: 'rotate(-1.2deg)',
          }}>{t('lib.heroBold')}</span>{' '}{t('lib.hero2')}
          <br />{t('lib.hero3')} <em style={{ fontFamily: T.serif, fontStyle: 'italic', color: T.purple }}>{t('lib.heroItalic')}</em>.
        </h1>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : '2fr 1fr 1fr 1fr',
          gap: 12, marginBottom: 36,
        }}>
          {/* Continue card */}
          {nextGroup && nextLesson ? (
            <div
              onClick={() => onOpenGroup(nextGroup)}
              style={{
                background: T.ink, color: T.cream,
                padding: isMobile ? '18px 18px' : '20px 24px',
                borderRadius: 20, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(29,25,51,.18)',
                gridColumn: isMobile ? '1 / -1' : undefined,
              }}>
              <div style={{ position: 'absolute', right: -40, top: -40, width: 140, height: 140, borderRadius: '50%', background: T.yellow, opacity: 0.12 }} />
              <div style={{ position: 'relative', minWidth: 0, flex: 1 }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.22em', opacity: 0.6, marginBottom: 3 }}>
                  {inProgress ? t('lib.continueFrom') : t('lib.startWith')}
                </div>
                <div style={{ fontFamily: T.serif, fontSize: isMobile ? 18 : 20, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {nextLesson.title}
                </div>
                <div style={{ fontSize: 12, opacity: 0.6, marginTop: 3 }}>
                  {t(nextGroup.titleKey)} · {nextLesson.duration} · +{nextLesson.xp} XP
                </div>
              </div>
              <button style={{
                background: T.yellow, color: T.ink, border: 'none',
                padding: '11px 18px', borderRadius: 999,
                fontFamily: T.sans, fontWeight: 700, fontSize: 13,
                cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                boxShadow: `0 4px 12px ${T.yellow}66`, minHeight: 44,
              }}>▶ {t('lib.continueCta')}</button>
            </div>
          ) : (
            <div style={{
              background: T.ink, color: T.cream,
              padding: '20px 24px', borderRadius: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gridColumn: isMobile ? '1 / -1' : undefined,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 500 }}>{t('lib.allComplete')}</div>
                <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>{t('lib.allCompleteDesc')}</div>
              </div>
            </div>
          )}
          <StatCard label={t('lib.roomsExplored')} value={`${groupsDone}/10`} color={T.blue} />
          <StatCard label={t('lib.xpEarned')}      value={`${totalXP}`}       color={T.green} />
          <StatCard label={t('lib.certificates')}  value={`${earnedCertificates.length}/6`} color={T.yellow} />
        </div>

        {/* Room grid */}
        <div style={{ padding: contentPad.replace('0 ', '') ? '0' : undefined }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? 'repeat(2, 1fr)'
              : `repeat(auto-fill, minmax(${isTablet ? '200px' : '240px'}, 1fr))`,
            gap: isMobile ? 12 : 20,
          }}>
            {GROUPS.map(group => (
              <RoomCard
                key={group.id}
                group={group}
                completedLessons={completedLessons}
                earnedCertificates={earnedCertificates}
                onClick={() => onOpenGroup(group)}
                compact={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CSS animations ────────────────────────────────────────────────────────────
const ROOM_STYLES = `
  .rm-book { transition: transform 0.4s cubic-bezier(.3,.8,.3,1.3); }
  .rm-card:hover .rm-book.b1 { transform: translateY(-8px) rotate(-2deg); }
  .rm-card:hover .rm-book.b2 { transform: translateY(-4px); }
  .rm-card:hover .rm-book.b3 { transform: translateY(-10px) rotate(1.5deg); }
  .rm-card:hover .rm-book.b4 { transform: translateY(-3px); }
  .rm-card:hover .rm-book.b5 { transform: translateY(-7px) rotate(-1.5deg); }
  .rm-card:hover .rm-book.b6 { transform: translateY(-5px) rotate(2deg); }
  .rm-plant { transform-origin: bottom center; transition: transform 0.5s; }
  .rm-card:hover .rm-plant { transform: rotate(-3deg); }
  .rm-lamp-glow { transition: opacity 0.4s; opacity: 0.1; }
  .rm-card:hover .rm-lamp-glow { opacity: 0.5 !important; }
`;

// ── Main Biblioteca ───────────────────────────────────────────────────────────
interface BibliotecaProps {
  completedLessons: string[];
  earnedCertificates: string[];
  onOpenModule?: (id: string) => void;
  onLessonComplete: (lessonId: string, xp: number) => void;
  onOpenProfile?: () => void;
}

export function Biblioteca({ completedLessons, earnedCertificates, onLessonComplete, onOpenProfile }: BibliotecaProps) {
  const { profile } = useAuth();
  const [activeGroup, setActiveGroup] = useState<Group | null>(() => {
    const id = sessionStorage.getItem('db_activeGroup');
    return id ? GROUPS.find(g => g.id === id) || null : null;
  });
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useMemo(() => {
    if (typeof document !== 'undefined' && !document.getElementById('biblioteca-room-styles')) {
      const s = document.createElement('style');
      s.id = 'biblioteca-room-styles';
      s.textContent = ROOM_STYLES;
      document.head.appendChild(s);
    }
  }, []);

  // Browser back button support
  useEffect(() => {
    const handler = () => {
      if (activeLesson) {
        setActiveLesson(null);
      } else if (activeGroup) {
        sessionStorage.removeItem('db_activeGroup');
        setActiveGroup(null);
      }
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [activeLesson, activeGroup]);

  const openGroup = (g: Group) => {
    sessionStorage.setItem('db_activeGroup', g.id);
    window.history.pushState({ db: 'group', id: g.id }, '');
    setTransitioning(true);
    setTimeout(() => { setActiveGroup(g); setTransitioning(false); }, 180);
  };

  const closeGroup = () => {
    sessionStorage.removeItem('db_activeGroup');
    if (window.history.state?.db === 'group') {
      window.history.back();
    } else {
      setActiveGroup(null);
    }
  };

  const startLesson = (lesson: Lesson) => {
    window.history.pushState({ db: 'lesson', id: lesson.id }, '');
    setActiveLesson(lesson);
  };

  const closeLesson = () => {
    if (window.history.state?.db === 'lesson') {
      window.history.back();
    } else {
      setActiveLesson(null);
    }
  };

  const handleLessonComplete = () => {
    if (activeLesson) onLessonComplete(activeLesson.id, activeLesson.xp);
    closeLesson();
  };

  return (
    <motion.div
      className="absolute inset-0 z-10 overflow-y-auto"
      style={{ background: T.bg }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <AnimatePresence mode="wait">
        {activeLesson ? (
          <motion.div
            key={`lesson-${activeLesson.id}`}
            className="absolute inset-0 z-20 flex items-center justify-center p-6 sm:p-10 bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LessonOverlay
              lesson={activeLesson}
              onClose={closeLesson}
              onComplete={handleLessonComplete}
            />
          </motion.div>
        ) : !activeGroup ? (
          <motion.div
            key="library-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: transitioning ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LibraryHome
              completedLessons={completedLessons}
              earnedCertificates={earnedCertificates}
              onOpenGroup={openGroup}
              profile={profile}
              onOpenProfile={onOpenProfile}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`group-${activeGroup.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: transitioning ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GroupScreen
              group={activeGroup}
              completedLessons={completedLessons}
              earnedCertificates={earnedCertificates}
              onClose={closeGroup}
              onStartLesson={startLesson}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
