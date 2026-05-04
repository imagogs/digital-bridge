import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, MailCheck, Video, Table2, FileText, Building2, KeyRound, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { supabase } from '../lib/supabase';

export function LoginScreen() {
  const { signInWithGoogle } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const handleGoogleLogin = async () => {
    const code = inviteCode.trim().toUpperCase();

    // Codice obbligatorio
    if (!code) {
      setCodeError(t('login.codeRequired'));
      return;
    }

    setIsLoading(true);
    setError('');
    setCodeError('');

    try {
      // Valida il codice contro la tabella Supabase invite_codes
      const { data, error: dbError } = await supabase
        .from('invite_codes')
        .select('code')
        .eq('code', code)
        .single();

      if (dbError || !data) {
        setCodeError(t('login.codeInvalidDB'));
        setIsLoading(false);
        return;
      }

      // Codice valido → procedi con Google OAuth
      await signInWithGoogle();
    } catch (e: any) {
      setError('Errore di connessione. Riprova tra qualche secondo.');
      setIsLoading(false);
    }
  };

  const modules = [
    { icon: Shield,   label: 'SPID & CIE',  color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20',   code: 'M01' },
    { icon: MailCheck,label: 'PEC',          color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20',code: 'M02' },
    { icon: Video,    label: 'Email & Video',color: 'text-emerald-400',bg: 'bg-emerald-500/10 border-emerald-500/20',code:'M03' },
    { icon: FileText, label: 'Word',         color: 'text-blue-300',   bg: 'bg-blue-500/10 border-blue-500/20',   code: 'M04' },
    { icon: Table2,   label: 'Excel',        color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20', code: 'M05' },
    { icon: Building2,label: 'Portali PA',   color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20',code:'M06' },
  ];

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
      {/* Animated background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      {/* Language toggle top-right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageToggle />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-white/30 text-xs font-mono tracking-[0.4em] uppercase mb-4">
              {t('app.tagline')}
            </p>
            <h1 className="font-serif text-6xl font-medium text-white mb-1 drop-shadow-2xl">DIGITAL</h1>
            <h1 className="font-serif text-6xl font-medium text-white mb-8 drop-shadow-2xl">BRIDGE</h1>
          </motion.div>

          {/* 6-module grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-3 gap-2 mb-8"
          >
            {modules.map(({ icon: Icon, label, color, bg, code }) => (
              <div key={code} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border ${bg}`}>
                <Icon className={`w-4 h-4 ${color}`} />
                <span className={`text-[10px] font-bold font-mono ${color}`}>{code}</span>
                <span className="text-xs font-medium text-white/60 leading-tight text-center">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Login card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-zinc-900/80 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
          >
            <h2 className="font-serif text-xl text-white mb-2">{t('login.start')}</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6">{t('login.desc')}</p>

            {/* Invite code field — sempre visibile, obbligatorio */}
            <div className="mb-5">
              <label className="flex items-center gap-2 text-white/40 text-xs mb-2">
                <KeyRound className="w-3.5 h-3.5" />
                {t('login.codeLabel')}
              </label>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => { setInviteCode(e.target.value.toUpperCase()); setCodeError(''); }}
                placeholder="Es. PONTE2026"
                className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white placeholder-white/20 rounded-xl text-sm focus:outline-none focus:border-indigo-500/60 font-mono tracking-wider uppercase transition-colors"
                maxLength={24}
                onKeyDown={(e) => { if (e.key === 'Enter') handleGoogleLogin(); }}
              />
              <AnimatePresence>
                {codeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 text-red-400 text-xs text-left"
                  >
                    {codeError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white hover:bg-white/90 text-black font-semibold rounded-xl transition-all disabled:opacity-60 shadow-lg"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {isLoading ? t('login.verifying') : t('login.google')}
            </button>

            {error && <p className="mt-3 text-red-400 text-sm text-center">{error}</p>}

            <p className="mt-5 text-white/25 text-xs text-center leading-relaxed whitespace-pre-line">
              {t('login.gdpr')}
            </p>
          </motion.div>

          <p className="mt-5 text-white/15 text-xs">{t('login.footer')}</p>
        </motion.div>
      </div>
    </div>
  );
}
