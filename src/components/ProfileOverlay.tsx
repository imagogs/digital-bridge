import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { X, Trophy, Clock, LogOut, Star, Zap, Download, Pencil, Check, ImageIcon, User, Smile, Globe, Camera } from 'lucide-react';

// ── Image helpers ─────────────────────────────────────────────────────────────
async function compressImage(file: File, maxPx = 400): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob(b => resolve(b!), 'image/jpeg', 0.85);
    };
    img.src = url;
  });
}

async function uploadAvatarFile(file: File, userId: string, supabaseClient: any): Promise<string> {
  const compressed = await compressImage(file);
  const path = `${userId}/avatar.jpg`;
  const { error } = await supabaseClient.storage
    .from('avatars')
    .upload(path, compressed, { upsert: true, contentType: 'image/jpeg' });
  if (error) throw error;
  const { data } = supabaseClient.storage.from('avatars').getPublicUrl(path);
  return `${data.publicUrl}?t=${Date.now()}`;
}

// ── Avatar helpers ────────────────────────────────────────────────────────────
export const EMOJI_AVATARS = ['🦁', '🐻', '🐼', '🦊', '🐯', '🦅', '🐬', '🦋', '🌟', '🚀', '🎯', '⚡'];
const EMOJI_BG: Record<string, string> = {
  '🦁':'#d97706','🐻':'#78350f','🐼':'#1f2937','🦊':'#c2410c','🐯':'#b45309',
  '🦅':'#1d4ed8','🐬':'#0369a1','🦋':'#7c3aed','🌟':'#ca8a04','🚀':'#6d28d9',
  '🎯':'#dc2626','⚡':'#d97706',
};

export function isEmojiAvatar(url: string | undefined): boolean {
  if (!url) return false;
  return !url.includes('/') && !url.includes('.') && url.length <= 4;
}

export function AvatarDisplay({
  photoURL, displayName, size = 80, className = '',
}: { photoURL?: string; displayName?: string; size?: number; className?: string }) {
  const initials = (displayName || 'U').split(' ').slice(0, 2).map(w => w[0]?.toUpperCase()).join('');
  const s = size;
  const fontSize = s * 0.4;

  if (isEmojiAvatar(photoURL)) {
    return (
      <div
        className={className}
        style={{
          width: s, height: s, borderRadius: s * 0.25,
          background: EMOJI_BG[photoURL!] || '#4f46e5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: fontSize, lineHeight: 1, flexShrink: 0, userSelect: 'none',
        }}
      >{photoURL}</div>
    );
  }
  if (photoURL?.startsWith('http')) {
    return (
      <img
        src={photoURL} alt="Avatar"
        className={className}
        style={{ width: s, height: s, borderRadius: s * 0.25, objectFit: 'cover', flexShrink: 0 }}
        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
    );
  }
  return (
    <div
      className={className}
      style={{
        width: s, height: s, borderRadius: s * 0.25,
        background: 'rgba(99,102,241,0.15)',
        border: '2px solid rgba(99,102,241,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: s * 0.28, fontWeight: 600, color: '#a5b4fc',
        flexShrink: 0, userSelect: 'none',
      }}
    >{initials || <User style={{ width: s * 0.4, height: s * 0.4, color: '#818cf8' }} />}</div>
  );
}
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { supabase } from '../lib/supabase';
import { tools } from '../data/tools';
import { getLessonsForModule } from '../data/lessonsManager';
import { useEscapeKey } from '../hooks/useEscapeKey';

// All unlocked base modules
const baseTools = tools.filter(t => !t.locked);
const moduleLabels = Object.fromEntries(baseTools.map(t => [t.id, t.name]));

export function ProfileOverlay({ onClose }: { onClose: () => void }) {
  const { user, profile, signInWithGoogle, signOut, updateProfile } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const [chartData, setChartData] = useState<{ topic: string; ore: number }[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [totalXP, setTotalXP] = useState(0);

  // ── Edit mode state ────────────────────────────────────────────────────────
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhoto, setEditPhoto] = useState('');
  const [avatarTab, setAvatarTab] = useState<'emoji' | 'url' | 'upload'>('emoji');
  const [saving, setSaving] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState('');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEscapeKey(onClose);

  const levelLabels: Record<string, { label: string; color: string }> = {
    none: { label: t('level.none'), color: 'text-white/50' },
    beginner: { label: t('level.beginner'), color: 'text-blue-400' },
    intermediate: { label: t('level.intermediate'), color: 'text-yellow-400' },
    advanced: { label: t('level.advanced'), color: 'text-green-400' },
  };

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const { data: progress } = await supabase
        .from('lesson_progress')
        .select('lesson_id, xp')
        .eq('user_id', user.id);

      if (progress) {
        const xp = progress.reduce((sum: number, r: any) => sum + (r.xp || 0), 0);
        setTotalXP(xp);

        // Build a lookup: lesson_id → duration in minutes (real values from lesson data)
        const lessonDurationMap: Record<string, number> = {};
        baseTools.forEach(tool => {
          getLessonsForModule(tool.id, lang as 'it' | 'en').forEach(lesson => {
            lessonDurationMap[lesson.id] = parseInt(lesson.duration) || 10;
          });
        });

        // Sum real minutes per module from completed lessons
        const moduleMinutes: Record<string, number> = {};
        progress.forEach((r: any) => {
          // Find which module this lesson belongs to
          const tool = baseTools.find(tool =>
            getLessonsForModule(tool.id, lang as 'it' | 'en').some(l => l.id === r.lesson_id)
          );
          if (tool) {
            const minutes = lessonDurationMap[r.lesson_id] || 10;
            moduleMinutes[tool.id] = (moduleMinutes[tool.id] || 0) + minutes;
          }
        });

        setChartData(baseTools.map(tool => ({
          topic: tool.name.split(' ')[0], // short label for chart
          ore: parseFloat(((moduleMinutes[tool.id] || 0) / 60).toFixed(1)),
        })));
      } else {
        setChartData(baseTools.map(tool => ({ topic: tool.name.split(' ')[0], ore: 0 })));
      }

      const { data: certs } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id);
      setCertificates(certs || []);
    };

    fetchData();
  }, [user]);

  const lvl = levelLabels[profile?.level || 'none'];

  const handleStartEdit = () => {
    setEditName(profile?.displayName || '');
    setEditPhoto(profile?.photoURL || '');
    setAvatarTab(isEmojiAvatar(profile?.photoURL) ? 'emoji' : 'emoji');
    setPendingFile(null);
    setUploadPreview('');
    setUploadError('');
    setEditMode(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setUploadError('File troppo grande (max 5MB)'); return; }
    setPendingFile(file);
    setUploadError('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      const preview = ev.target?.result as string;
      setUploadPreview(preview);
      setEditPhoto(preview);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    let photoURL = editPhoto.trim() || profile?.photoURL || '';
    if (pendingFile && user) {
      try {
        photoURL = await uploadAvatarFile(pendingFile, user.id, supabase);
      } catch {
        photoURL = uploadPreview || photoURL;
      }
    }
    await updateProfile({
      displayName: editName.trim() || profile?.displayName || '',
      photoURL,
    });
    setSaving(false);
    setEditMode(false);
    setPendingFile(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ y: 40, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 40, scale: 0.95 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white/40 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!user ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 border border-blue-500/30">
              <Star className="w-9 h-9 text-blue-400" />
            </div>
            <h2 className="text-2xl font-serif text-white mb-3">{t('profile.yourJourney')}</h2>
            <p className="text-white/50 text-sm max-w-sm mb-8 leading-relaxed">{t('profile.loginDesc')}</p>
            <button
              onClick={signInWithGoogle}
              className="flex items-center gap-3 px-7 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t('profile.signIn')}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* User header */}
            <div className="flex items-start gap-5">
              {/* Avatar */}
              <div className="relative shrink-0 group">
                <AvatarDisplay
                  photoURL={editMode ? editPhoto : profile?.photoURL}
                  displayName={editMode ? editName : profile?.displayName}
                  size={80}
                  className="border-2 border-zinc-700"
                />
                {!editMode && (
                  <button
                    onClick={handleStartEdit}
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 border-2 border-zinc-900 flex items-center justify-center transition-all shadow-lg"
                    title="Modifica avatar"
                  >
                    <Pencil className="w-3 h-3 text-white" />
                  </button>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {editMode ? (
                  /* ── Edit fields ─────────────────────────────────────────── */
                  <div className="space-y-3">
                    {/* Name */}
                    <div>
                      <label className="text-white/40 text-[10px] font-mono uppercase tracking-wider block mb-1">Nome / Nickname</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        placeholder="Il tuo nome"
                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500/50 placeholder-white/20"
                      />
                    </div>

                    {/* Avatar picker */}
                    <div>
                      <label className="text-white/40 text-[10px] font-mono uppercase tracking-wider block mb-2">Foto profilo</label>
                      {/* Tabs */}
                      <div className="flex gap-1 mb-3 p-1 bg-zinc-800 rounded-xl w-fit">
                        <button
                          onClick={() => setAvatarTab('emoji')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${avatarTab === 'emoji' ? 'bg-zinc-600 text-white' : 'text-white/40 hover:text-white'}`}
                        >
                          <Smile className="w-3 h-3" /> Avatar
                        </button>
                        <button
                          onClick={() => setAvatarTab('upload')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${avatarTab === 'upload' ? 'bg-zinc-600 text-white' : 'text-white/40 hover:text-white'}`}
                        >
                          <Camera className="w-3 h-3" /> Carica foto
                        </button>
                        <button
                          onClick={() => setAvatarTab('url')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${avatarTab === 'url' ? 'bg-zinc-600 text-white' : 'text-white/40 hover:text-white'}`}
                        >
                          <ImageIcon className="w-3 h-3" /> URL
                        </button>
                      </div>

                      {avatarTab === 'emoji' && (
                        <div className="grid grid-cols-6 gap-2">
                          {EMOJI_AVATARS.map(emoji => (
                            <button
                              key={emoji}
                              onClick={() => { setEditPhoto(emoji); setPendingFile(null); }}
                              className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all border-2 ${
                                editPhoto === emoji
                                  ? 'border-indigo-500 scale-110 shadow-lg shadow-indigo-500/30'
                                  : 'border-transparent bg-zinc-800 hover:bg-zinc-700 hover:scale-105'
                              }`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}

                      {avatarTab === 'upload' && (
                        <div className="flex flex-col items-center gap-3 py-2">
                          {uploadPreview ? (
                            <img src={uploadPreview} className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/50" alt="Anteprima" />
                          ) : (
                            <div className="w-20 h-20 rounded-2xl bg-zinc-800 border-2 border-dashed border-white/20 flex items-center justify-center">
                              <Camera className="w-7 h-7 text-white/30" />
                            </div>
                          )}
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-medium rounded-xl transition-colors"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            {uploadPreview ? 'Cambia immagine' : 'Scegli immagine'}
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          {uploadError && <p className="text-red-400 text-xs">{uploadError}</p>}
                          <p className="text-white/25 text-xs text-center">JPG, PNG, WebP · max 5MB</p>
                        </div>
                      )}

                      {avatarTab === 'url' && (
                        <input
                          type="url"
                          value={isEmojiAvatar(editPhoto) ? '' : editPhoto}
                          onChange={e => { setEditPhoto(e.target.value); setPendingFile(null); }}
                          placeholder="https://..."
                          className="w-full bg-zinc-800 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500/50 placeholder-white/20"
                        />
                      )}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleSaveEdit}
                        disabled={saving}
                        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {saving ? 'Salvataggio…' : 'Salva'}
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white/50 text-xs rounded-xl transition-colors"
                      >
                        Annulla
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ── View mode ───────────────────────────────────────────── */
                  <>
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="font-serif text-2xl text-white">{profile?.displayName || user.email}</h2>
                        <p className="text-white/40 text-sm mt-0.5">{user.email}</p>
                      </div>
                      <button
                        onClick={handleStartEdit}
                        className="p-2 text-white/30 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors ml-2 shrink-0"
                        title="Modifica profilo"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className={`text-sm font-medium ${lvl.color}`}>{lvl.label}</span>
                      {totalXP > 0 && (
                        <span className="flex items-center gap-1 text-sm text-yellow-400">
                          <Zap className="w-3.5 h-3.5" />
                          {totalXP} {t('profile.xpTotal')}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {!editMode && (
                <button
                  onClick={signOut}
                  title={t('profile.signOut')}
                  className="p-2.5 text-white/40 hover:text-red-400 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors shrink-0"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Language & settings row */}
            {!editMode && (
              <div className="flex items-center justify-between py-3 px-4 bg-zinc-800/50 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-white/40" />
                  <span className="text-sm text-white/60">{lang === 'it' ? 'Lingua' : 'Language'}</span>
                </div>
                <div className="flex gap-1 p-0.5 bg-zinc-800 rounded-lg">
                  {(['it', 'en'] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                        lang === l ? 'bg-zinc-600 text-white shadow-sm' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {l === 'it' ? '🇮🇹 IT' : '🇬🇧 EN'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Study hours chart */}
              <div className="bg-black/30 border border-white/5 p-5 rounded-2xl">
                <div className="flex items-center gap-2 mb-5">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-medium text-white">{t('profile.studyHours')}</h3>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <XAxis dataKey="topic" stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip
                        cursor={{ fill: '#ffffff08' }}
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #ffffff10', borderRadius: '8px', fontSize: '12px' }}
                        formatter={(v: any) => [`${v} h`, 'Studio']}
                      />
                      <Bar dataKey="ore" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, i) => (
                          <Cell key={i} fill={entry.ore > 0 ? '#3b82f6' : '#27272a'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Certificates */}
              <div className="bg-black/30 border border-white/5 p-5 rounded-2xl flex flex-col">
                <div className="flex items-center gap-2 mb-5">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <h3 className="text-sm font-medium text-white">{t('profile.certificates')}</h3>
                </div>
                <div className="flex-1 space-y-3">
                  {certificates.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-8">
                      <Trophy className="w-10 h-10 text-white/10 mb-3" />
                      <p className="text-white/30 text-sm">{t('profile.noCerts')}</p>
                      <p className="text-white/20 text-xs mt-1">{t('profile.noCertsDesc')}</p>
                    </div>
                  ) : (
                    certificates.map((cert, idx) => (
                      <div key={idx} className="flex gap-3 p-3 bg-zinc-800/50 border border-white/5 rounded-xl items-center">
                        <div className="w-9 h-9 bg-yellow-500/20 rounded-full flex items-center justify-center shrink-0">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{moduleLabels[cert.module_id] || cert.module_id}</p>
                          <p className="text-xs text-white/40">{cert.score ? `${cert.score}% · ` : ''}{new Date(cert.passed_at || cert.earned_at || Date.now()).toLocaleDateString('it-IT')}</p>
                        </div>
                        <button
                          onClick={async () => {
                            const { generateCertificatePDF } = await import('../lib/generateCertificate');
                            generateCertificatePDF({
                              userName: profile?.displayName || user?.email || 'Utente',
                              moduleName: moduleLabels[cert.module_id] || cert.module_id,
                              moduleCode: tools.find(t => t.id === cert.module_id)?.moduleCode || cert.module_id.toUpperCase(),
                              score: cert.score || 100,
                              date: new Date(cert.passed_at || cert.earned_at || Date.now()),
                            });
                          }}
                          className="p-1.5 text-white/30 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all shrink-0"
                          title="Scarica certificato PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white/20 text-xs">
                {t('profile.registeredOn')} {new Date(profile?.createdAt || Date.now()).toLocaleDateString('it-IT')} · {t('profile.version')}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
