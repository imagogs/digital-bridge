import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1">
      <button
        onClick={() => setLang('it')}
        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all ${
          lang === 'it'
            ? 'bg-white text-black'
            : 'text-white/40 hover:text-white'
        }`}
      >
        IT
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all ${
          lang === 'en'
            ? 'bg-white text-black'
            : 'text-white/40 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
