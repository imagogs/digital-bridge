import React, { createContext, useContext, useState } from 'react';
import it from '../locales/it';
import en from '../locales/en';

export type Lang = 'it' | 'en';

const locales = { it, en } as const;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem('db_lang') as Lang) || 'it';
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('db_lang', l);
  };

  const t = (key: string): any => {
    const dict = locales[lang] as Record<string, any>;
    return dict[key] ?? (locales['it'] as Record<string, any>)[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
