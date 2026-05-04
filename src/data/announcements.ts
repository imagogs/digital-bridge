export type AnnouncementType = 'pin' | 'info' | 'update' | 'success';

export interface Announcement {
  id: string;
  type: AnnouncementType;
  title_it: string;
  title_en: string;
  body_it: string;
  body_en: string;
  date: string; // YYYY-MM-DD
  unread: boolean;
}

export const announcements: Announcement[] = [
  {
    id: 'ann-1',
    type: 'pin',
    title_it: 'Benvenuto in Digital Bridge',
    title_en: 'Welcome to Digital Bridge',
    body_it:
      'Completa tutti i moduli del Percorso Base per ottenere il tuo certificato digitale ufficiale, riconosciuto dal progetto ImagoAI.',
    body_en:
      'Complete all Base Path modules to earn your official digital certificate, recognised by the ImagoAI project.',
    date: '2026-04-01',
    unread: false,
  },
  {
    id: 'ann-2',
    type: 'update',
    title_it: 'Nuovi contenuti: SPID & CIE aggiornato',
    title_en: 'New content: SPID & CIE updated',
    body_it:
      "Abbiamo aggiornato il modulo SPID & CIE con le ultime novità normative 2026. Riapri il modulo per vedere i nuovi contenuti.",
    body_en:
      'We have updated the SPID & CIE module with the latest 2026 regulatory changes. Reopen the module to see new content.',
    date: '2026-04-28',
    unread: true,
  },
  {
    id: 'ann-3',
    type: 'info',
    title_it: 'Percorso Intermedio in arrivo',
    title_en: 'Intermediate Path coming soon',
    body_it:
      'I moduli avanzati (Sicurezza Online, Firma Digitale, Strumenti AI, Lavoro Remoto) saranno sbloccati al completamento del Percorso Base.',
    body_en:
      'Advanced modules (Online Security, Digital Signature, AI Tools, Remote Work) will unlock upon completing the Base Path.',
    date: '2026-05-01',
    unread: true,
  },
  {
    id: 'ann-4',
    type: 'success',
    title_it: 'Certificazioni ora scaricabili in PDF',
    title_en: 'Certificates now downloadable as PDF',
    body_it:
      'Puoi ora scaricare i tuoi certificati in formato PDF direttamente dalla sezione Certificazioni o dal tuo profilo.',
    body_en:
      'You can now download your certificates in PDF format directly from the Certifications section or your profile.',
    date: '2026-05-03',
    unread: false,
  },
];
