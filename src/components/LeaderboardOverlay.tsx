import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Zap, Loader2, RefreshCw, Medal } from 'lucide-react';
import { fetchLeaderboard, type LeaderboardEntry } from '../lib/coordinatorQueries';
import { useAuth } from '../contexts/AuthContext';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface LeaderboardOverlayProps {
  onClose: () => void;
}

const RANK_STYLES: Record<number, { bg: string; border: string; text: string; icon?: string }> = {
  1: { bg: 'bg-yellow-500/15', border: 'border-yellow-500/40', text: 'text-yellow-300', icon: '🥇' },
  2: { bg: 'bg-zinc-400/10', border: 'border-zinc-400/30', text: 'text-zinc-300', icon: '🥈' },
  3: { bg: 'bg-orange-600/10', border: 'border-orange-600/30', text: 'text-orange-400', icon: '🥉' },
};

export function LeaderboardOverlay({ onClose }: LeaderboardOverlayProps) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEscapeKey(onClose);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeaderboard(user?.id ?? null);
      setEntries(data);
    } catch {
      setError('Impossibile caricare la classifica. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [user]);

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
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center">
              <Trophy className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-white">Classifica</h2>
              <p className="text-white/40 text-xs">Top 20 · nomi anonimizzati</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!loading && (
              <button
                onClick={load}
                className="p-2 text-white/40 hover:text-white bg-zinc-800 rounded-xl transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-white/40 hover:text-white bg-zinc-800 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/40">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-sm">Caricamento classifica...</p>
            </div>
          )}

          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <p className="text-white/50 text-sm text-center">{error}</p>
              <button
                onClick={load}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Riprova
              </button>
            </div>
          )}

          {!loading && !error && entries.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/40">
              <Medal className="w-8 h-8 opacity-40" />
              <p className="text-sm">Nessun dato disponibile ancora.</p>
              <p className="text-xs text-center">Completa le prime lezioni per entrare in classifica!</p>
            </div>
          )}

          {!loading && !error && entries.length > 0 && (
            <AnimatePresence>
              <div className="space-y-2">
                {entries.map((entry, i) => {
                  const rankStyle = RANK_STYLES[entry.rank];
                  const isMe = entry.isCurrentUser;
                  return (
                    <motion.div
                      key={entry.rank}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        isMe
                          ? 'bg-blue-500/15 border-blue-500/40 ring-1 ring-blue-500/30'
                          : rankStyle
                          ? `${rankStyle.bg} ${rankStyle.border}`
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      {/* Rank */}
                      <div className="w-8 text-center shrink-0">
                        {rankStyle?.icon ? (
                          <span className="text-lg">{rankStyle.icon}</span>
                        ) : (
                          <span className="text-white/40 text-sm font-mono">{entry.rank}</span>
                        )}
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isMe ? 'text-blue-300' : rankStyle ? rankStyle.text : 'text-white/80'}`}>
                          {entry.displayName}
                          {isMe && <span className="ml-1.5 text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full">Tu</span>}
                        </p>
                        <p className="text-white/30 text-xs">
                          {entry.completedModules} moduli completati
                        </p>
                      </div>

                      {/* XP */}
                      <div className="flex items-center gap-1 shrink-0">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className={`text-sm font-bold ${isMe ? 'text-blue-300' : rankStyle ? rankStyle.text : 'text-white/70'}`}>
                          {entry.xp.toLocaleString('it-IT')}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>
          )}
        </div>

        {/* Footer note */}
        <div className="px-6 py-3 border-t border-white/10 bg-zinc-900/40">
          <p className="text-white/25 text-xs text-center">
            I nomi sono anonimizzati per proteggere la privacy · dati aggiornati in tempo reale
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
