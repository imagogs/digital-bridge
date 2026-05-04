const it = {
  // App generale
  'app.tagline': 'Lavoro · Competenze · Autonomia',
  'app.subtitle': 'Tocca un modulo per iniziare la lezione.',

  // Navigazione sezioni — bottom bar
  'nav.home': 'Home',
  'nav.library': 'Biblioteca',
  'nav.progress': 'Progressi',
  'nav.certification': 'Certificazioni',
  // Navigazione frecce legacy (kept for safety)
  'nav.toPractice': 'Area Pratica',
  'nav.toLibrary': 'Libreria',
  'nav.toCertification': 'Certificazioni',

  // Sezione Pratica
  'practice.title': 'Area Pratica',
  'practice.subtitle': 'Metti alla prova le tue competenze con esercizi interattivi e simulazioni reali su tutti i moduli studiati.',
  'practice.start': 'Inizia Esercizio',
  'practice.cards': [
    { title: 'Simulazione SPID', desc: 'Accedi a un portale PA simulato con le tue credenziali SPID di prova.' },
    { title: 'Esercizi Excel', desc: 'Completa fogli di calcolo reali con formule e dati da inserire.' },
    { title: 'Email Professionale', desc: 'Scrivi e gestisci email formali in scenari lavorativi reali.' },
    { title: 'Scenario Completo', desc: 'Multi-step: ricevi un task, crea un documento, invialo via PEC.' },
  ],

  // Sezione Certificazioni
  'cert.title': 'Certificazioni',
  'cert.subtitle': 'Valida le tue competenze e ottieni il Certificato DIGITAL BRIDGE spendibile nel mercato del lavoro.',
  'cert.threshold': 'Soglia',
  'cert.exam': "Sostieni l'Esame",
  'cert.cards': [
    { title: 'Certificato SPID & Identità Digitale', module: 'spid' },
    { title: 'Certificato Comunicazione Digitale', module: 'email' },
    { title: 'Certificato PEC', module: 'pec' },
    { title: 'Certificato Excel Base', module: 'excel' },
  ],

  // Login
  'login.start': 'Inizia il tuo percorso',
  'login.desc': 'Accedi per salvare i tuoi progressi, guadagnare badge e ottenere il tuo certificato digitale.',
  'login.google': 'Accedi con Google',
  'login.loading': 'Accesso in corso...',
  'login.error': 'Accesso non riuscito. Riprova tra un momento.',
  'login.gdpr': 'Accedendo accetti la gestione dei tuoi dati nel rispetto del GDPR.\nI tuoi dati non vengono mai condivisi con terze parti.',
  'login.footer': 'DIGITAL BRIDGE — Progetto ImagoAI / MedsendX Italia S.r.l. · v1.0',
  'login.haveCode': 'Ho un codice di accesso',
  'login.codePlaceholder': 'Inserisci il codice...',
  'login.codeInvalid': 'Codice non valido. Contatta il coordinatore del progetto.',

  // Assessment
  'assessment.welcome': 'Benvenuto/a in DIGITAL BRIDGE! 👋',
  'assessment.intro': 'Prima di iniziare, tre domande veloci per personalizzare il tuo percorso.',
  'assessment.questionOf': 'Domanda {n} di {total}',
  'assessment.analyzing': 'Analizziamo il tuo profilo...',
  'assessment.analyzingDesc': 'Stiamo costruendo il tuo percorso personalizzato',
  'assessment.questions': [
    {
      question: 'Hai mai usato SPID per accedere a un servizio pubblico online?',
      options: [
        "Non so cos'è lo SPID",
        "So cos'è ma non l'ho mai usato",
        'Sì, lo uso occasionalmente',
      ],
    },
    {
      question: 'Come ti senti con la posta elettronica (email)?',
      options: [
        'Non ho un indirizzo email o non so come usarla',
        'So leggere le email ma faccio fatica a scriverne',
        'Uso l\'email regolarmente per lavoro o studio',
      ],
    },
    {
      question: 'Hai mai usato un foglio di calcolo come Excel o Google Fogli?',
      options: [
        'Mai — non so da dove iniziare',
        'L\'ho aperto qualche volta ma non so usarlo bene',
        'So inserire dati e fare qualche formula semplice',
      ],
    },
  ],

  // Profilo
  'profile.yourJourney': 'Inizia il tuo percorso',
  'profile.loginDesc': 'Accedi per salvare i progressi, guadagnare XP e badge, e ottenere il tuo Certificato DIGITAL BRIDGE.',
  'profile.signIn': 'Accedi con Google',
  'profile.studyHours': 'Ore di studio per modulo',
  'profile.certificates': 'Certificati ottenuti',
  'profile.noCerts': 'Nessun certificato ancora.',
  'profile.noCertsDesc': 'Completa i moduli e supera gli esami.',
  'profile.registeredOn': 'Iscritto il',
  'profile.version': 'DIGITAL BRIDGE v1.0',
  'profile.signOut': 'Esci',
  'level.none': 'Non valutato',
  'level.none.next': 'Inizia dal modulo SPID',
  'level.beginner': 'Principiante',
  'level.beginner.next': 'Continua con le lezioni base',
  'level.intermediate': 'Intermedio',
  'level.intermediate.next': 'Prova a completare un esame',
  'level.advanced': 'Avanzato',
  'level.advanced.next': 'Hai quasi finito — ottimo!',
  'profile.xpTotal': 'XP totali',

  // Home Dashboard
  'home.goodMorning': 'Buongiorno',
  'home.goodAfternoon': 'Buon pomeriggio',
  'home.goodEvening': 'Buona sera',
  'home.lessonsCompleted': 'Lezioni completate',
  'home.xpEarned': 'XP Guadagnati',
  'home.overallProgress': 'Progresso globale',
  'home.basePath': 'Percorso base — moduli M01–M06',
  'home.continueWhere': 'Continua dove hai lasciato',
  'home.nextModule': 'Prossimo modulo consigliato',
  'home.defaultUser': 'Utente',
  'home.streakDays': 'giorni consecutivi',

  // Modulo
  'module.label': 'Modulo',
  'module.lessonsCompleted': 'Lezioni completate',
  'module.totalXP': 'XP totali disponibili',
  'module.progress': 'Avanzamento',
  'module.completed': 'Completata',
  'module.completePrev': 'Completa la lezione precedente',
  'module.allDone': '🏅 Modulo completato!',
  'module.allDoneDesc': 'Vai nella sezione Certificazioni per ottenere il tuo badge ufficiale.',

  // Lezione
  'lesson.label': 'Lezione',
  'lesson.back': 'Indietro',
  'lesson.next': 'Avanti',
  'lesson.complete': 'Completa Lezione ✓',
  'lesson.xpEarned': 'XP guadagnati in questa lezione',
  'lesson.explanation': 'Spiegazione',
  'lesson.analogy': 'Analogia dal mondo reale',
  'lesson.question': 'Domanda',
  'lesson.practiceLabel': 'Esercizio pratico',
  'lesson.scenarioLabel': 'Scenario',
  'lesson.correct': '✓ Corretto!',
  'lesson.incorrect': '→ Ottimo tentativo — ecco la risposta giusta:',
  'lesson.correctChoice': '✓ Ottima scelta!',
  'lesson.incorrectChoice': '→ Ci siamo quasi — ecco perché:',

  // Esame di Certificazione
  'exam.intro': "Stai per sostenere l'esame di certificazione per il modulo",
  'exam.questions': 'Domande',
  'exam.time': 'Tempo',
  'exam.threshold': 'Soglia',
  'exam.howTitle': '📌 Come funziona',
  'exam.how1': 'Per ogni domanda, scegli la risposta che ritieni corretta',
  'exam.how2': 'Vedrai subito se hai risposto correttamente',
  'exam.how3': "Per superare l'esame serve almeno il {pct}% di risposte corrette",
  'exam.how4': "Puoi ripetere l'esame senza penalizzazioni",
  'exam.start': "Inizia l'Esame →",
  'exam.questionLabel': 'Domanda',
  'exam.correct': '✓ Corretto!',
  'exam.incorrect': '→ Ottimo tentativo — ecco la spiegazione:',
  'exam.next': 'Prossima domanda',
  'exam.submit': "Invia l'esame",
  'exam.passedTitle': 'Esame Superato!',
  'exam.score': 'Punteggio',
  'exam.certObtained': '🎉 Certificato ottenuto!',
  'exam.certDesc': 'Hai ottenuto il Certificato DIGITAL BRIDGE —',
  'exam.certProfile': 'Puoi scaricarlo dal tuo profilo nella sezione Certificati.',
  'exam.correct_count': 'Corrette',
  'exam.xpEarned': 'Guadagnati',
  'exam.downloadCert': 'Scarica Certificato PDF',
  'exam.backToPlatform': 'Torna alla piattaforma',
  'exam.failedTitle': 'Quasi — Riprova!',
  'exam.failedDesc': 'Non ti preoccupare — puoi ripetere l\'esame senza penalizzazioni. Rileggi le lezioni del modulo per rafforzare i concetti.',
  'exam.retry': "Ripeti l'Esame",
  'exam.reviewLessons': 'Rileggi le Lezioni',
  'exam.defaultUser': 'Utente',

  // AI Chat
  'chat.placeholder': 'Scrivi a Sofia...',
  'chat.title': 'Sofia — Insegnante AI',
  'chat.welcome': 'Ciao! Sono Sofia, la tua insegnante virtuale. Come posso aiutarti oggi? Puoi chiedermi di spiegarti un argomento, di guidarti in un modulo, o semplicemente di aiutarti a navigare la piattaforma. 😊',
} as const;

export type TranslationKeys = keyof typeof it;
export default it;
