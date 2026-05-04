import { Shield, MailCheck, Video, Table2, FileText, Building2, ShieldAlert, PenLine, Bot, Monitor } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  level: 'base' | 'intermediate';
  locked: boolean;
  moduleCode: string;
  totalSessions: number;
  totalMinutes: number;
}

export const tools: Tool[] = [
  // ─── BASE (M01–M06) ────────────────────────────────────────────────────────
  {
    id: 'spid', name: 'SPID & CIE', moduleCode: 'M01', level: 'base', locked: false,
    totalSessions: 3, totalMinutes: 45,
    description: "La tua identità digitale per accedere a tutti i servizi della Pubblica Amministrazione italiana.",
    icon: Shield, color: '#1d4ed8',
  },
  {
    id: 'pec', name: 'PEC', moduleCode: 'M02', level: 'base', locked: false,
    totalSessions: 2, totalMinutes: 30,
    description: "La Posta Elettronica Certificata: l'equivalente digitale della raccomandata con ricevuta di ritorno.",
    icon: MailCheck, color: '#4f46e5',
  },
  {
    id: 'email', name: 'Email & Video', moduleCode: 'M03', level: 'base', locked: false,
    totalSessions: 2, totalMinutes: 30,
    description: "Comunicare in modo professionale: gestire la posta elettronica e partecipare a riunioni online.",
    icon: Video, color: '#059669',
  },
  {
    id: 'word', name: 'Microsoft Word', moduleCode: 'M04', level: 'base', locked: false,
    totalSessions: 4, totalMinutes: 80,
    description: "Creare e formattare documenti professionali: lettere, CV, relazioni e moduli.",
    icon: FileText, color: '#1e40af',
  },
  {
    id: 'excel', name: 'Excel', moduleCode: 'M05', level: 'base', locked: false,
    totalSessions: 4, totalMinutes: 80,
    description: "I fogli di calcolo per il lavoro: gestire dati, calcoli automatici e tabelle professionali.",
    icon: Table2, color: '#15803d',
  },
  {
    id: 'portali-pa', name: 'Portali PA', moduleCode: 'M06', level: 'base', locked: false,
    totalSessions: 3, totalMinutes: 45,
    description: "Navigare i portali della Pubblica Amministrazione: INPS, Agenzia delle Entrate e molto altro.",
    icon: Building2, color: '#7c3aed',
  },

  // ─── INTERMEDIATE (M07–M10) ───────────────────────────────────────────────
  {
    id: 'sicurezza', name: 'Sicurezza Online', moduleCode: 'M07', level: 'intermediate', locked: true,
    totalSessions: 2, totalMinutes: 30,
    description: "Proteggiti online: password sicure, riconoscere le truffe, navigare in sicurezza.",
    icon: ShieldAlert, color: '#065f46',
  },
  {
    id: 'firma-digitale', name: 'Firma Digitale', moduleCode: 'M08', level: 'intermediate', locked: true,
    totalSessions: 1, totalMinutes: 15,
    description: "Firmare documenti digitalmente con valore legale: firma elettronica qualificata.",
    icon: PenLine, color: '#134e4a',
  },
  {
    id: 'ai-tools', name: 'Strumenti AI', moduleCode: 'M09', level: 'intermediate', locked: true,
    totalSessions: 2, totalMinutes: 40,
    description: "Introduzione agli strumenti di intelligenza artificiale per il lavoro quotidiano.",
    icon: Bot, color: '#1e3a5f',
  },
  {
    id: 'lavoro-remoto', name: 'Lavoro Remoto', moduleCode: 'M10', level: 'intermediate', locked: true,
    totalSessions: 2, totalMinutes: 30,
    description: "Strumenti collaborativi per il lavoro da remoto: Teams, Drive, calendari condivisi.",
    icon: Monitor, color: '#292524',
  },
];

export const baseModules = tools.filter(t => t.level === 'base');
export const intermediateModules = tools.filter(t => t.level === 'intermediate');
