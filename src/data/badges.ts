export interface Badge {
  id: string;
  moduleId: string | null;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: 'module_complete' | 'exam_passed' | 'first_login' | 'streak' | 'all_base';
}

export const badges: Badge[] = [
  {
    id: 'welcome',
    moduleId: null,
    title: 'Benvenuto a DIGITAL BRIDGE',
    description: 'Hai completato la valutazione iniziale e iniziato il tuo percorso.',
    icon: '🌟',
    xpReward: 50,
    condition: 'first_login',
  },
  {
    id: 'spid-complete',
    moduleId: 'spid',
    title: 'Identità Digitale',
    description: 'Hai completato tutte le lezioni del modulo SPID & CIE.',
    icon: '🔑',
    xpReward: 100,
    condition: 'module_complete',
  },
  {
    id: 'spid-certified',
    moduleId: 'spid',
    title: 'Certificato SPID',
    description: "Hai superato l'esame SPID con almeno il 70% delle risposte corrette.",
    icon: '🏅',
    xpReward: 200,
    condition: 'exam_passed',
  },
  {
    id: 'pec-complete',
    moduleId: 'pec',
    title: 'Master della PEC',
    description: 'Hai completato tutte le lezioni del modulo PEC.',
    icon: '📬',
    xpReward: 80,
    condition: 'module_complete',
  },
  {
    id: 'pec-certified',
    moduleId: 'pec',
    title: 'Certificato PEC',
    description: "Hai superato l'esame PEC con almeno il 70%.",
    icon: '🏅',
    xpReward: 150,
    condition: 'exam_passed',
  },
  {
    id: 'email-complete',
    moduleId: 'email',
    title: 'Comunicatore Digitale',
    description: 'Hai completato tutte le lezioni di Email & Videochiamate.',
    icon: '📧',
    xpReward: 80,
    condition: 'module_complete',
  },
  {
    id: 'email-certified',
    moduleId: 'email',
    title: 'Certificato Comunicazione',
    description: "Hai superato l'esame di Comunicazione Digitale con almeno il 70%.",
    icon: '🏅',
    xpReward: 150,
    condition: 'exam_passed',
  },
  {
    id: 'excel-complete',
    moduleId: 'excel',
    title: 'Analista di Dati',
    description: 'Hai completato tutte le lezioni del modulo Excel.',
    icon: '📊',
    xpReward: 120,
    condition: 'module_complete',
  },
  {
    id: 'excel-certified',
    moduleId: 'excel',
    title: 'Certificato Excel',
    description: "Hai superato l'esame Excel Base con almeno il 70%.",
    icon: '🏅',
    xpReward: 200,
    condition: 'exam_passed',
  },
  {
    id: 'word-complete',
    moduleId: 'word',
    title: 'Autore Digitale',
    description: 'Hai completato tutte le lezioni di Microsoft Word.',
    icon: '📝',
    xpReward: 100,
    condition: 'module_complete',
  },
  {
    id: 'portali-complete',
    moduleId: 'portali-pa',
    title: 'Cittadino Digitale',
    description: 'Hai completato il modulo Portali PA e sai accedere a tutti i servizi pubblici.',
    icon: '🏛️',
    xpReward: 100,
    condition: 'module_complete',
  },
  {
    id: 'all-base',
    moduleId: null,
    title: 'DIGITAL BRIDGE Completo',
    description: 'Hai completato tutti i 6 moduli base — sei un professionista digitale!',
    icon: '🎓',
    xpReward: 500,
    condition: 'all_base',
  },
];

export function getBadgesForModule(moduleId: string): Badge[] {
  return badges.filter(b => b.moduleId === moduleId);
}
