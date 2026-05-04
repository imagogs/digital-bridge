export type ScreenType = 'intro' | 'learn' | 'quiz' | 'practice' | 'summary';

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface LessonScreen {
  type: ScreenType;
  title: string;
  content?: string;
  tip?: string;
  analogy?: string;
  // Quiz
  question?: string;
  options?: QuizOption[];
  explanation?: string;
  // Practice
  scenario?: string;
  task?: string;
  choices?: { text: string; correct: boolean; feedback: string }[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  number: number;
  title: string;
  duration: string;
  xp: number;
  screens: LessonScreen[];
}

// ─── M01 — SPID & CIE ────────────────────────────────────────────────────────

const spidLesson1: Lesson = {
  id: 'spid-1',
  moduleId: 'spid',
  number: 1,
  title: "Cos'è SPID e perché ti serve",
  duration: '15 min',
  xp: 50,
  screens: [
    {
      type: 'intro',
      title: "Cos'è SPID e perché ti serve",
      content: "In questa lezione scoprirai cos'è SPID, perché è diventato indispensabile in Italia e a quali servizi ti permette di accedere. Al termine saprai già spiegarlo a qualcuno!",
      tip: "Durata: 15 minuti · Puoi fare una pausa in qualsiasi momento"
    },
    {
      type: 'learn',
      title: "SPID: la tua carta d'identità digitale",
      content: "SPID (Sistema Pubblico di Identità Digitale) è un sistema di accesso creato dal Governo italiano. Con un unico nome utente e una password puoi accedere online a centinaia di servizi pubblici: INPS, Agenzia delle Entrate, Comune, scuola, sanità e molto altro.",
      analogy: "Pensa allo SPID come a una chiave universale: invece di avere una chiave diversa per ogni sportello pubblico (e dover andare di persona ogni volta), hai UNA sola chiave digitale che apre tutte le porte, dal divano di casa tua.",
      tip: "SPID è gratuito. Non esiste nessuna tassa o abbonamento per ottenerlo."
    },
    {
      type: 'learn',
      title: "Cosa puoi fare con SPID",
      content: "Con SPID puoi: controllare la tua pensione INPS senza andare allo sportello · Scaricare il Modello 730 precompilato dall'Agenzia delle Entrate · Prenotare visite mediche · Iscrivere i figli a scuola online · Richiedere il bonus INPS · Accedere ai servizi del tuo Comune · Firmare documenti digitali con valore legale.",
      tip: "Oltre 1.200 servizi pubblici italiani accettano SPID. La lista cresce ogni mese."
    },
    {
      type: 'quiz',
      title: 'Verifica quello che hai imparato',
      question: "A cosa serve principalmente SPID?",
      options: [
        { text: "È un social network del Governo italiano", correct: false },
        { text: "È un sistema per accedere ai servizi pubblici online con un unico account", correct: true },
        { text: "È un'app per pagare le tasse", correct: false },
        { text: "È un documento fisico come la carta d'identità", correct: false }
      ],
      explanation: "Esatto! SPID è un sistema di identità digitale che ti permette di accedere con un solo account a tutti i servizi della Pubblica Amministrazione italiana, senza doverti presentare allo sportello."
    },
    {
      type: 'quiz',
      title: "Un'altra domanda",
      question: "SPID è a pagamento?",
      options: [
        { text: "Sì, costa circa €20 all'anno", correct: false },
        { text: "Dipende dal provider scelto — alcuni gratis, alcuni a pagamento", correct: false },
        { text: "No, SPID è completamente gratuito", correct: true },
        { text: "Solo per i pensionati è gratuito", correct: false }
      ],
      explanation: "SPID è sempre gratuito. Alcuni provider offrono servizi aggiuntivi a pagamento, ma l'identità SPID base non costa nulla."
    },
    {
      type: 'summary',
      title: 'Ottimo lavoro! 🎉',
      content: "Hai completato la prima lezione su SPID. Ora sai che: · SPID è la tua identità digitale italiana · È gratuito e ti evita file agli sportelli · Apre l'accesso a oltre 1.200 servizi pubblici\n\nNella prossima lezione scoprirai come richiedere il tuo SPID passo dopo passo.",
    }
  ]
};

const spidLesson2: Lesson = {
  id: 'spid-2',
  moduleId: 'spid',
  number: 2,
  title: 'Come richiedere SPID',
  duration: '20 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'Come richiedere SPID — passo per passo',
      content: "In questa lezione imparerai esattamente come richiedere il tuo SPID: cosa ti serve, dove andare, e come scegliere il metodo più semplice per te.",
    },
    {
      type: 'learn',
      title: 'Cosa ti serve prima di iniziare',
      content: "Per richiedere SPID hai bisogno di: · Un documento d'identità valido (carta d'identità o passaporto) · La tessera sanitaria con codice fiscale · Un indirizzo email che usi regolarmente · Un numero di cellulare attivo · Connessione internet",
      tip: "Tieni questi documenti sottomano prima di iniziare la procedura: ci vorranno i numeri stampati su di essi."
    },
    {
      type: 'learn',
      title: 'Scegliere il provider SPID',
      content: "Devi scegliere un 'Identity Provider' (chi verifica la tua identità). I principali sono: · PosteID (Poste Italiane) — verifica allo sportello postale, la più semplice · Aruba — verifica via webcam o di persona · TIM — verifica via webcam · InfoCert · Intesa (prima banca) · Register.it",
      analogy: "Il provider è come scegliere in quale ufficio andare a fare il documento. Tutti ti danno lo stesso SPID — cambia solo il modo in cui verificano chi sei.",
      tip: "Se hai già un account PosteID online o sei cliente Poste, scegli PosteID: è il più veloce."
    },
    {
      type: 'practice',
      title: 'Scenario: quale provider scegli?',
      scenario: "Maria, 58 anni, non è molto pratica di tecnologia. Abita vicino a un ufficio postale e preferisce fare le cose di persona piuttosto che via webcam. Qual è il provider SPID più adatto per lei?",
      task: "Scegli il provider più indicato per Maria:",
      choices: [
        { text: "Aruba — verifica via webcam da casa", correct: false, feedback: "Maria preferisce fare le cose di persona, la webcam potrebbe metterla a disagio. Non è la scelta ideale per lei." },
        { text: "PosteID — verifica allo sportello postale vicino a casa", correct: true, feedback: "Perfetto! PosteID con verifica allo sportello è ideale per chi preferisce l'assistenza di persona. Maria porta i documenti all'ufficio postale e in 10 minuti ha lo SPID." },
        { text: "InfoCert — solo verifica digitale avanzata", correct: false, feedback: "InfoCert richiede procedure digitali più complesse, non adatte a chi è alle prime armi." }
      ]
    },
    {
      type: 'quiz',
      title: 'Verifica quello che hai imparato',
      question: "Quale documento NON è necessario per richiedere SPID?",
      options: [
        { text: "Carta d'identità o passaporto", correct: false },
        { text: "Tessera sanitaria", correct: false },
        { text: "Libretto di lavoro", correct: true },
        { text: "Numero di cellulare attivo", correct: false }
      ],
      explanation: "Il libretto di lavoro non serve! Per SPID bastano: documento d'identità, tessera sanitaria, email e numero di cellulare. Il libretto di lavoro non è richiesto da nessun provider."
    },
    {
      type: 'summary',
      title: 'Lezione completata! 🎉',
      content: "Sai ora esattamente cosa fare per richiedere il tuo SPID: · Prepara carta d'identità, tessera sanitaria, email e telefono · Vai su spid.gov.it e scegli il provider · Completa la verifica identità (di persona o via webcam)\n\nNella prossima lezione imparerai ad usare SPID per accedere ai servizi.",
    }
  ]
};

const spidLesson3: Lesson = {
  id: 'spid-3',
  moduleId: 'spid',
  number: 3,
  title: 'Usare SPID — accesso ai servizi PA',
  duration: '15 min',
  xp: 100,
  screens: [
    {
      type: 'intro',
      title: 'Usare SPID per accedere ai servizi',
      content: "Hai lo SPID — ora scopri come usarlo! In questa lezione imparerai ad accedere con SPID ai portali pubblici come INPS, e come gestire gli errori più comuni.",
    },
    {
      type: 'learn',
      title: "Come accedere con SPID — passo per passo",
      content: "1. Vai sul sito del servizio (es. inps.it)\n2. Clicca su 'Accedi' o 'Entra con SPID'\n3. Scegli il tuo provider (es. PosteID)\n4. Inserisci il tuo nome utente SPID e la password\n5. Apri l'app del provider sul telefono\n6. Approva la notifica di accesso\n7. Sei dentro!",
      tip: "Il passaggio con la notifica sul telefono si chiama 'autenticazione a due fattori' — è una misura di sicurezza normale. Il telefono deve essere vicino a te quando accedi."
    },
    {
      type: 'practice',
      title: 'Scenario: accesso INPS con SPID',
      scenario: "Vuoi controllare la tua posizione contributiva INPS online, senza andare allo sportello. Hai già lo SPID attivo. Qual è la sequenza corretta di azioni?",
      task: "Seleziona i passaggi nell'ordine corretto:",
      choices: [
        { text: "Vai su inps.it → clicca 'Entra con SPID' → scegli provider → inserisci credenziali → approva sul telefono", correct: true, feedback: "Corretto! Questa è esattamente la sequenza giusta. In meno di 2 minuti sei nell'area personale INPS senza aver aspettato in fila." },
        { text: "Installa un'app INPS → crea un nuovo account INPS → accedi", correct: false, feedback: "Non è necessario creare un account INPS separato. Con SPID entri direttamente — è per questo che esiste!" },
        { text: "Chiama il numero verde INPS e chiedi le credenziali di accesso", correct: false, feedback: "Non serve chiamare. Con SPID l'accesso è completamente autonomo, 24 ore su 24, anche la domenica." }
      ]
    },
    {
      type: 'quiz',
      title: 'Gestione degli errori',
      question: "Hai inserito la password SPID sbagliata 3 volte e l'account è bloccato. Cosa fai?",
      options: [
        { text: "Richiedi un nuovo SPID da zero", correct: false },
        { text: "Vai sul sito del tuo provider e usa la funzione 'Password dimenticata'", correct: true },
        { text: "Chiama il 118", correct: false },
        { text: "Non si può sbloccare, l'account è perso", correct: false }
      ],
      explanation: "Ogni provider SPID ha una funzione di recupero password. Vai sul sito del tuo provider (es. poste.it per PosteID), clicca 'Password dimenticata' e segui le istruzioni. Lo SPID non va mai perso — si può sempre recuperare."
    },
    {
      type: 'summary',
      title: 'Modulo SPID Completato! 🏅',
      content: "Hai completato tutte le lezioni su SPID! Ora sai: · Cos'è SPID e perché è indispensabile · Come richiederlo scegliendo il provider giusto · Come usarlo per accedere ai servizi PA · Come gestire gli errori più comuni\n\nHai guadagnato il badge SPID. Il tuo certificato sarà disponibile dopo il test finale.",
    }
  ]
};

// ─── M02 — PEC ───────────────────────────────────────────────────────────────

const pecLesson1: Lesson = {
  id: 'pec-1',
  moduleId: 'pec',
  number: 1,
  title: "Cos'è la PEC e quando usarla",
  duration: '15 min',
  xp: 50,
  screens: [
    {
      type: 'intro',
      title: "Cos'è la PEC — la raccomandata digitale",
      content: "Scoprirai cos'è la PEC, quando è obbligatoria e perché vale legalmente come una raccomandata con ricevuta di ritorno.",
    },
    {
      type: 'learn',
      title: "PEC: la raccomandata dell'era digitale",
      content: "PEC significa Posta Elettronica Certificata. A differenza di una normale email, la PEC ha valore legale: quando invii un messaggio PEC ricevi automaticamente due ricevute ufficiali che provano che il messaggio è partito e che il destinatario l'ha ricevuto.",
      analogy: "Immagina di spedire una lettera importante all'ufficio del tuo Comune. Con la posta normale non sai se è arrivata. Con la raccomandata con ricevuta di ritorno hai una prova firmata dell'avvenuta consegna. La PEC è esattamente questo, ma in digitale — e arriva in secondi invece che in giorni.",
      tip: "Una PEC inviata in tempo è equiparata a un documento legale in tribunale."
    },
    {
      type: 'learn',
      title: 'Quando è obbligatoria la PEC',
      content: "La PEC è obbligatoria per: · Tutte le comunicazioni formali con la Pubblica Amministrazione · Partite IVA, aziende e liberi professionisti per comunicazioni ufficiali · Invio di documentazione a ordini professionali (medici, avvocati, ecc.) · Partecipazione a bandi e gare d'appalto\n\nÈ molto utile anche per: invio di contratti, disdette, reclami formali, comunicazioni importanti.",
      tip: "Dal 2025 i cittadini possono usare la PEC per dialogare con la PA al posto della raccomandata cartacea in quasi tutti i casi."
    },
    {
      type: 'quiz',
      title: 'Verifica quello che hai imparato',
      question: "Qual è la differenza principale tra PEC e email normale?",
      options: [
        { text: "La PEC arriva più velocemente", correct: false },
        { text: "La PEC ha valore legale e produce ricevute certificate dell'invio e consegna", correct: true },
        { text: "La PEC si può leggere solo su smartphone", correct: false },
        { text: "La PEC è più sicura perché è criptata", correct: false }
      ],
      explanation: "La differenza fondamentale è il valore legale. La PEC produce prove legalmente valide di invio e ricezione — l'email normale no. La criptatura è secondaria: ciò che conta è la certificazione."
    },
    {
      type: 'practice',
      title: 'Scenario: PEC o email normale?',
      scenario: "Hai ricevuto una multa che ritieni ingiusta e vuoi fare ricorso formale al Comune entro 30 giorni. Devi inviare il documento di ricorso.",
      task: "Quale strumento usi per inviare il ricorso?",
      choices: [
        { text: "Email normale all'indirizzo del Comune trovato sul sito", correct: false, feedback: "Con l'email normale non hai prova legale dell'invio. Se il Comune dice di non aver ricevuto nulla, non puoi dimostrare di aver rispettato i 30 giorni. Rischi di perdere il ricorso per scadenza." },
        { text: "PEC all'indirizzo PEC del Comune (trovabile su pec.governo.it)", correct: true, feedback: "Perfetto! La PEC ti dà la ricevuta certificata con data e ora. Se spedisci entro i 30 giorni, hai la prova legale. Il Comune non può dire che non è arrivato nulla." },
        { text: "Fax al numero del Comune", correct: false, feedback: "Il fax ha valore legale ma è obsoleto e molti uffici non lo accettano più. La PEC è la soluzione moderna ed equivalente." }
      ]
    },
    {
      type: 'summary',
      title: 'Lezione completata! 🎉',
      content: "Sai ora cos'è la PEC e quando usarla: · Vale come raccomandata con ricevuta di ritorno · Produce ricevute certificate con valore legale · È obbligatoria per comunicazioni con la PA\n\nNella prossima lezione imparerai ad aprire una casella PEC e a inviare messaggi.",
    }
  ]
};

const pecLesson2: Lesson = {
  id: 'pec-2',
  moduleId: 'pec',
  number: 2,
  title: 'Aprire e usare la tua casella PEC',
  duration: '20 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'Aprire e usare la PEC — pratica',
      content: "In questa lezione imparerai ad aprire una casella PEC gratuita, a inviare il tuo primo messaggio certificato e a leggere correttamente le ricevute.",
    },
    {
      type: 'learn',
      title: 'Come aprire una casella PEC',
      content: "Puoi aprire una PEC gratuita su Libero Mail PEC (libero.it/pec) in pochi minuti:\n\n1. Vai su libero.it/pec\n2. Clicca 'Attiva PEC gratuita'\n3. Inserisci i tuoi dati (nome, cognome, codice fiscale)\n4. Carica foto del documento d'identità\n5. Scegli il tuo indirizzo PEC (es. mario.rossi@pec.libero.it)\n6. Attendi l'attivazione (di solito pochi minuti)",
      tip: "La PEC gratuita di Libero ha 1 GB di spazio ed è sufficiente per uso personale. Se sei professionista con molto traffico, valuta Aruba PEC a €5/anno."
    },
    {
      type: 'learn',
      title: 'Inviare una PEC',
      content: "Per inviare una PEC:\n\n1. Accedi alla webmail PEC (es. mail.pec.libero.it)\n2. Clicca 'Scrivi nuovo messaggio'\n3. Nel campo 'A:' inserisci l'indirizzo PEC del destinatario\n4. Scrivi oggetto e testo\n5. Allega i documenti (PDF è il formato preferito)\n6. Clicca 'Invia'\n\nDopo l'invio trovi nella casella 'Ricevute' le due ricevute automatiche.",
      tip: "L'indirizzo PEC degli enti pubblici si trova su indicepa.gov.it — è il registro ufficiale delle PEC della PA."
    },
    {
      type: 'quiz',
      title: 'Verifica quello che hai imparato',
      question: "Dopo aver inviato una PEC, ricevi la 'Ricevuta di Consegna'. Cosa significa?",
      options: [
        { text: "Il tuo messaggio è partito ma non sappiamo se è arrivato", correct: false },
        { text: "Il destinatario ha letto il tuo messaggio", correct: false },
        { text: "Il messaggio è arrivato nella casella PEC del destinatario — hai la prova legale", correct: true },
        { text: "Il destinatario ha risposto al tuo messaggio", correct: false }
      ],
      explanation: "La Ricevuta di Consegna certifica che il messaggio è arrivato nella casella PEC del destinatario. Questo è sufficiente come prova legale — non importa se il destinatario lo ha letto o no."
    },
    {
      type: 'summary',
      title: 'Modulo PEC Completato! 🏅',
      content: "Hai completato tutte le lezioni sulla PEC! Ora sai: · Cos'è la PEC e il suo valore legale · Quando usarla e quando è obbligatoria · Come aprire una casella PEC gratuita · Come inviare e leggere le ricevute\n\nHai guadagnato il badge PEC!",
    }
  ]
};

// ─── M03 — Email e Videochiamate ─────────────────────────────────────────────

const emailLesson1: Lesson = {
  id: 'email-1',
  moduleId: 'email',
  number: 1,
  title: "Email professionale — struttura e gestione",
  duration: '20 min',
  xp: 50,
  screens: [
    {
      type: 'intro',
      title: "Scrivere email professionali",
      content: "Imparerai a scrivere email efficaci per il lavoro: struttura corretta, oggetto, destinatari, allegati e organizzazione della casella.",
    },
    {
      type: 'learn',
      title: "Struttura di un'email professionale",
      content: "Un'email professionale ha sempre 5 elementi:\n\n• OGGETTO: preciso e informativo (es. 'Candidatura Assistente Amministrativo — Mario Rossi')\n• SALUTO: 'Gentile Dott. Bianchi,' o 'Spett.le Ufficio HR,'\n• CORPO: breve e chiaro, paragrafi separati\n• CHIUSURA: 'Cordiali saluti,' o 'Distinti saluti,'\n• FIRMA: nome, telefono, eventuale ruolo",
      tip: "L'oggetto è la prima cosa che si legge. Oggetti vaghi come 'Info' o 'Domanda' finiscono spesso ignorati o nello spam."
    },
    {
      type: 'practice',
      title: 'Scenario: quale email è più professionale?',
      scenario: "Devi contattare un'azienda per sapere se c'è una posizione aperta per te come magazziniere.",
      task: "Quale delle seguenti email è scritta in modo professionale?",
      choices: [
        {
          text: "Oggetto: 'ciao'\nCiao, cerco lavoro come magazziniere avete posto? grazie",
          correct: false,
          feedback: "Questa email ha molti problemi: oggetto vago, nessun saluto formale, testo troppo informale e incompleto. Non verrà presa in considerazione."
        },
        {
          text: "Oggetto: 'Candidatura Magazziniere — Mario Rossi'\nGentile Responsabile HR, mi chiamo Mario Rossi e scrivo per candidarmi alla posizione di magazziniere. Allego il mio curriculum. Resto disponibile per un colloquio. Cordiali saluti, Mario Rossi — Tel: 347 1234567",
          correct: true,
          feedback: "Ottima email! Ha un oggetto chiaro, saluto formale, testo preciso, proposta di colloquio e firma completa. Questa email fa un'ottima impressione."
        },
        {
          text: "Oggetto: 'LAVORO MAGAZZINO'\nSpETt.le azienda CERCASI LAVORO MAGAZZINO URGENTE contattarmi al 347...",
          correct: false,
          feedback: "Maiuscole ovunque e tono urgente non sono professionali. Le parole in maiuscolo suonano come urla in comunicazione digitale."
        }
      ]
    },
    {
      type: 'learn',
      title: 'CC, CCN e risposta a tutti',
      content: "• CC (Copia Conoscenza): gli indirizzi nel CC ricevono il messaggio e tutti gli altri destinatari li vedono\n• CCN (Copia Conoscenza Nascosta): ricevono il messaggio ma gli altri NON li vedono. Utile quando scrivi a tante persone e vuoi proteggere la loro privacy\n• RISPONDI A TUTTI: risponde a tutti i destinatari originali — attenzione! Spesso si vuole rispondere solo al mittente\n• RISPONDI: risponde solo a chi ti ha scritto",
      tip: "La regola d'oro: prima di cliccare 'Rispondi a tutti' chiediti 'Tutti devono davvero leggere questa risposta?' Spesso la risposta è no."
    },
    {
      type: 'quiz',
      title: 'Verifica quello che hai imparato',
      question: "Vuoi inviare una newsletter a 200 clienti senza che ognuno veda gli indirizzi degli altri. Come imposti il campo dei destinatari?",
      options: [
        { text: "Metti tutti i 200 indirizzi nel campo 'A:'", correct: false },
        { text: "Metti tutti nel campo 'CC:'", correct: false },
        { text: "Metti tutti nel campo 'CCN:' e il tuo indirizzo nel campo 'A:'", correct: true },
        { text: "Mandi 200 email separate una per una", correct: false }
      ],
      explanation: "Usando CCN (Copia Conoscenza Nascosta) ogni destinatario riceve l'email ma non può vedere gli indirizzi degli altri. È la soluzione corretta per rispettare la privacy dei tuoi clienti."
    },
    {
      type: 'summary',
      title: 'Lezione completata! 🎉',
      content: "Sai ora scrivere email professionali: · Struttura corretta con oggetto, saluto, corpo e firma · Differenza tra CC e CCN · Attenzione all'uso di 'Rispondi a tutti'\n\nNella prossima lezione imparerai a usare Zoom, Teams e Google Meet.",
    }
  ]
};

const emailLesson2: Lesson = {
  id: 'email-2',
  moduleId: 'email',
  number: 2,
  title: 'Videochiamate — Zoom, Teams e Meet',
  duration: '20 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'Videochiamate di lavoro — senza paura',
      content: "Le videochiamate sono diventate normalissime sul lavoro. In questa lezione imparerai ad entrare, gestire audio e video, e comportarti in modo professionale.",
    },
    {
      type: 'learn',
      title: 'Come entrare in una videochiamata',
      content: "Per partecipare a una videochiamata di lavoro:\n\n1. Ricevi un link di invito via email (es. zoom.us/j/123456)\n2. Clicca il link nell'email\n3. Si apre il browser o l'app — clicca 'Apri Zoom' (o Teams, Meet)\n4. Nella schermata di anteprima: testa microfono e camera\n5. Scrivi il tuo nome per identificarti\n6. Clicca 'Partecipa' o 'Entra'\n\nEi sei dentro!",
      analogy: "Entrare in una videochiamata è come suonare il campanello di un ufficio: clicchi il link (campanello), aspetti che qualcuno ti apra (l'host approva), e poi entri nella stanza virtuale.",
      tip: "Fai sempre un test di microfono e camera prima di una videochiamata importante. Tutti i programmi hanno questa funzione nell'impostazione audio."
    },
    {
      type: 'learn',
      title: 'I controlli durante la videochiamata',
      content: "Nella barra in basso trovi sempre questi pulsanti:\n\n🎤 MICROFONO — Clicca per attivare/disattivare. Quando non parli, tienilo in silenzio\n📷 CAMERA — Clicca per accendere/spegnere la webcam\n💬 CHAT — Messaggi scritti visibili a tutti\n🖥️ CONDIVIDI SCHERMO — Mostra il tuo schermo agli altri\n✋ ALZA LA MANO — Segnala che vuoi parlare\n🔴 TERMINA / ESCI — Pulsante rosso per uscire",
      tip: "Regola d'oro delle videochiamate: microfono IN SILENZIO quando non parli. Il rumore di fondo distrae tutti."
    },
    {
      type: 'practice',
      title: 'Scenario: problema tecnico in videochiamata',
      scenario: "Sei in una riunione di lavoro su Zoom con 5 colleghi. Tutti ti dicono che non ti sentono ma tu li senti perfettamente. Cosa fai?",
      task: "Scegli la risposta corretta:",
      choices: [
        {
          text: "Esci dalla riunione e non rientri — è troppo stressante",
          correct: false,
          feedback: "Non c'è motivo di abbandonare la riunione! I problemi tecnici capitano a tutti e si risolvono in pochi secondi."
        },
        {
          text: "Scrivi in chat 'Mi sentite?' — controlla che il microfono non sia in silenzio — prova a uscire e rientrare",
          correct: true,
          feedback: "Perfetto! Scrivi in chat per comunicare (così ti leggono anche se non ti sentono), controlla il pulsante microfono (magari è in silenzio per sbaglio), e se non si risolve rientra nella riunione. Problema risolto in 30 secondi."
        },
        {
          text: "Urla più forte nel microfono",
          correct: false,
          feedback: "Il volume della voce non risolve un problema tecnico del microfono. Urla più forte non aiuterà nessuno."
        }
      ]
    },
    {
      type: 'quiz',
      title: 'Domanda finale',
      question: "Sei in una riunione Zoom con 10 persone. Il tuo capo sta parlando. Qual è il comportamento corretto per te?",
      options: [
        { text: "Tieni il microfono acceso così puoi intervenire subito se vuoi", correct: false },
        { text: "Tieni il microfono in silenzio e usa 'Alza la mano' se vuoi intervenire", correct: true },
        { text: "Esci e rientri ogni volta che vuoi parlare", correct: false },
        { text: "Scrivi in chat invece di usare il microfono", correct: false }
      ],
      explanation: "Microfono in silenzio quando non parli è la regola fondamentale della netiquette nelle videochiamate. Il rumore di fondo (tastiera, telefono, radio) distrae tutti. Usa 'Alza la mano' per segnalare che vuoi intervenire."
    },
    {
      type: 'summary',
      title: 'Modulo Email e Video Completato! 🏅',
      content: "Hai completato tutte le lezioni su Email e Videochiamate! Ora sai: · Scrivere email professionali con struttura corretta · Usare CC e CCN in modo appropriato · Entrare e gestire una videochiamata di lavoro · Risolvere i problemi tecnici più comuni\n\nHai guadagnato il badge Comunicazione Digitale!",
    }
  ]
};

// ─── M05 — Microsoft Excel ────────────────────────────────────────────────────

const excelLesson1: Lesson = {
  id: 'excel-1',
  moduleId: 'excel',
  number: 1,
  title: "Orientarsi in Excel — celle, righe, colonne",
  duration: '20 min',
  xp: 50,
  screens: [
    {
      type: 'intro',
      title: "Excel — il registro automatizzato",
      content: "In questa lezione scoprirai come funziona Excel: come navigare tra le celle, inserire dati e capire l'organizzazione del foglio.",
    },
    {
      type: 'learn',
      title: "Come è organizzato Excel",
      content: "Excel è una griglia di celle organizzata in:\n\n• COLONNE: identificate da lettere (A, B, C... Z, AA, AB...)\n• RIGHE: identificate da numeri (1, 2, 3...)\n• CELLE: l'incrocio di colonna e riga (es. B3 = colonna B, riga 3)\n\nIn alto trovi la BARRA DELLA FORMULA che mostra il contenuto della cella selezionata. In basso vedi le SCHEDE dei fogli (Foglio1, Foglio2...).",
      analogy: "Pensa a Excel come a un registro cartaceo enorme con righe e colonne — solo che invece di scrivere a mano e ricalcolare tutto, il computer fa i calcoli automaticamente ogni volta che cambi un numero.",
      tip: "Clicca su qualsiasi cella e digita: il testo appare dentro. Premi INVIO per confermare e spostarti in basso, TAB per spostarti a destra."
    },
    {
      type: 'quiz',
      title: 'Verifica quello che hai imparato',
      question: "Sei in Excel. Vuoi selezionare la cella alla terza colonna e quinta riga. Come si chiama questa cella?",
      options: [
        { text: "35", correct: false },
        { text: "C5", correct: true },
        { text: "5C", correct: false },
        { text: "Colonna3-Riga5", correct: false }
      ],
      explanation: "Le celle si identificano sempre con LETTERA della colonna + NUMERO della riga. La terza colonna è C, la quinta riga è 5. Quindi: C5. Semplice!"
    },
    {
      type: 'learn',
      title: "Inserire e modificare dati",
      content: "Per lavorare in Excel:\n\n• INSERIRE TESTO: clicca la cella e digita. Il testo va a sinistra automaticamente\n• INSERIRE NUMERI: clicca e digita il numero. I numeri vanno a destra\n• MODIFICARE: doppio clic sulla cella oppure clicca e premi F2\n• ELIMINARE: seleziona la cella e premi CANC o BACKSPACE\n• SELEZIONARE PIÙ CELLE: clicca e trascina, oppure tieni SHIFT e clicca\n• LARGHEZZA COLONNA: doppio clic sul bordo tra due colonne per adattarla automaticamente",
      tip: "Se scrivi 'gennaio' in una cella e poi trascini il quadratino verde in basso a destra della cella, Excel completa automaticamente i mesi successivi: febbraio, marzo, aprile... Prova!"
    },
    {
      type: 'quiz',
      title: 'Un altro quesito',
      question: "Hai digitato un numero in una cella e vuoi correggerlo. Cosa fai?",
      options: [
        { text: "Cancella l'intera riga e ricomincia", correct: false },
        { text: "Doppio clic sulla cella per entrare in modalità modifica, poi correggi", correct: true },
        { text: "Devi chiudere e riaprire Excel", correct: false },
        { text: "Non si può modificare una cella già compilata", correct: false }
      ],
      explanation: "Con doppio clic entri in modalità modifica: vedi il cursore lampeggiare dentro la cella. Puoi correggere solo la parte sbagliata senza riscrivere tutto. In alternativa, premi F2 per lo stesso effetto."
    },
    {
      type: 'summary',
      title: 'Lezione completata! 🎉',
      content: "Ora conosci le basi di Excel: · Come sono organizzate righe, colonne e celle · Come identificare una cella (es. C5) · Come inserire, modificare ed eliminare dati\n\nNella prossima lezione imparerai le formule per fare calcoli automatici.",
    }
  ]
};

const excelLesson2: Lesson = {
  id: 'excel-2',
  moduleId: 'excel',
  number: 2,
  title: "Formule base — SOMMA, MEDIA, MAX",
  duration: '20 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'Formule Excel — il computer calcola per te',
      content: "Le formule sono il cuore di Excel. Imparerai a fare somme, medie e trovare il massimo e minimo automaticamente — senza mai usare la calcolatrice.",
    },
    {
      type: 'learn',
      title: 'Come funziona una formula',
      content: "Ogni formula in Excel inizia sempre con il simbolo = (uguale).\n\nEsempi:\n• =5+3 → risultato: 8\n• =A1+B1 → somma i valori delle celle A1 e B1\n• =SOMMA(A1:A10) → somma tutte le celle da A1 ad A10\n\nIl simbolo : tra due celle significa 'da...a': A1:A10 = da A1 fino ad A10.",
      tip: "Excel ricalcola automaticamente ogni formula quando cambi i dati. Se hai la formula =SOMMA(A1:A5) e cambi il numero in A3, il totale si aggiorna da solo in tempo reale."
    },
    {
      type: 'learn',
      title: 'Le formule più utili',
      content: "Le 5 formule che userai di più:\n\n• =SOMMA(A1:A10) → somma tutti i valori nell'intervallo\n• =MEDIA(A1:A10) → calcola la media\n• =MAX(A1:A10) → trova il valore più alto\n• =MIN(A1:A10) → trova il valore più basso\n• =CONTA(A1:A10) → conta quante celle hanno un numero\n\nScrivi sempre la formula nella cella dove vuoi vedere il risultato.",
      tip: "Excel ti suggerisce le formule mentre scrivi: se scrivi '=SOM' appare un menu con SOMMA. Usa le frecce e premi TAB per completare automaticamente."
    },
    {
      type: 'practice',
      title: 'Scenario: registro spese mensili',
      scenario: "Hai un foglio Excel con le spese di gennaio nelle celle B2:B8 (Affitto 600, Spesa 180, Trasporti 90, Bollette 120, Telefono 25, Abbigliamento 70, Svago 50). Vuoi calcolare il totale nella cella B9.",
      task: "Quale formula scrivi nella cella B9 per calcolare il totale?",
      choices: [
        { text: "=600+180+90+120+25+70+50", correct: false, feedback: "Funziona ma non è il modo giusto: se cambi un valore devi anche cambiare la formula. Con SOMMA(B2:B8) Excel ricalcola automaticamente ogni volta." },
        { text: "=SOMMA(B2:B8)", correct: true, feedback: "Perfetto! SOMMA(B2:B8) somma automaticamente tutte le celle da B2 a B8. Il risultato è 1.135€. Se cambi una spesa, il totale si aggiorna da solo." },
        { text: "SOMMA B2:B8", correct: false, feedback: "Manca il simbolo = all'inizio! Senza = Excel non capisce che stai scrivendo una formula e tratta il testo come semplice testo." }
      ]
    },
    {
      type: 'quiz',
      title: 'Domanda finale sulle formule',
      question: "Hai i voti di un esame nelle celle C2:C8. Vuoi trovare il voto più alto ottenuto. Quale formula usi?",
      options: [
        { text: "=SOMMA(C2:C8)", correct: false },
        { text: "=MEDIA(C2:C8)", correct: false },
        { text: "=MAX(C2:C8)", correct: true },
        { text: "=ALTO(C2:C8)", correct: false }
      ],
      explanation: "MAX trova il valore massimo nell'intervallo. Se i voti sono 7, 8, 6, 9, 7, 8, 10 — la formula =MAX(C2:C8) restituisce 10. MIN farebbe il contrario: restituirebbe 6."
    },
    {
      type: 'summary',
      title: 'Lezione completata! 🎉',
      content: "Ottimo lavoro! Ora sai usare le formule base di Excel: · Ogni formula inizia con = · SOMMA, MEDIA, MAX, MIN, CONTA · I due punti : indicano un intervallo di celle\n\nNella prossima lezione imparerai a formattare il foglio per renderlo professionale.",
    }
  ]
};

const excelLesson3: Lesson = {
  id: 'excel-3',
  moduleId: 'excel',
  number: 3,
  title: 'Formattazione — tabelle professionali',
  duration: '20 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'Formattare Excel — dati ordinati e professionali',
      content: "Un foglio Excel formattato bene è più facile da leggere e fa una buona impressione. Imparerai grassetto, colori, allineamento e larghezza colonne.",
    },
    {
      type: 'learn',
      title: 'Strumenti di formattazione base',
      content: "Nella barra in alto (Home) trovi:\n\n• B (Grassetto) — testo in grassetto, ottimo per titoli e totali\n• I (Corsivo) — testo inclinato\n• U (Sottolineato)\n• Colore testo — cambia il colore delle parole\n• Colore sfondo cella — riempi la cella di un colore\n• Allineamento: ← = → per allineare il testo\n• Formato numero: € per valuta, % per percentuale, .00 per decimali",
      tip: "Regola professionale: intestazioni in grassetto con sfondo colorato scuro e testo bianco. Righe alternate con sfondo grigio chiaro. Totali in grassetto con bordo superiore."
    },
    {
      type: 'learn',
      title: 'Adattare le colonne e bloccare righe',
      content: "Problemi comuni e soluzioni:\n\n• TESTO TAGLIATO nella cella → doppio clic sul bordo tra due lettere di colonna per adattare automaticamente la larghezza\n• INTESTAZIONI CHE SCOMPAIONO quando scorri → 'Visualizza → Blocca riquadri → Blocca riga superiore' per tenerle sempre visibili\n• NUMERI CON TROPPI DECIMALI → seleziona le celle e clicca il pulsante 'Diminuisci decimali' nella barra Home",
      tip: "Seleziona tutte le colonne (clicca la A e trascina fino all'ultima) poi doppio clic sul bordo di qualsiasi colonna: adatta automaticamente la larghezza di tutte in un colpo solo."
    },
    {
      type: 'practice',
      title: 'Scenario: formattare un registro presenze',
      scenario: "Hai un foglio Excel con un registro presenze per il lavoro. La prima riga ha le intestazioni (Nome, Lunedì, Martedì...). I totali sono nella colonna H. Vuoi renderlo professionale.",
      task: "Quale scelta di formattazione è più appropriata per un documento lavorativo?",
      choices: [
        { text: "Ogni riga con un colore diverso (rosso, verde, giallo, blu...) e font Comic Sans", correct: false, feedback: "Troppi colori rendono il documento confuso e poco professionale. Comic Sans non è appropriato in contesti lavorativi." },
        { text: "Intestazioni in grassetto con sfondo blu scuro, testo bianco. Righe alternate grigio chiaro/bianco. Totali in grassetto.", correct: true, feedback: "Perfetto! Questo è lo stile professionale standard. È chiaro, leggibile e fa una buona impressione in ufficio." },
        { text: "Tutto in nero su bianco senza alcuna formattazione", correct: false, feedback: "Funzionale ma difficile da leggere. La formattazione non è decorativa: aiuta a trovare le informazioni rapidamente." }
      ]
    },
    {
      type: 'quiz',
      title: 'Verifica',
      question: "Vuoi che le intestazioni (Riga 1) rimangano visibili anche quando scorri verso il basso in un lungo foglio. Cosa fai?",
      options: [
        { text: "Copi le intestazioni ogni 20 righe", correct: false },
        { text: "Vai su Visualizza → Blocca riquadri → Blocca riga superiore", correct: true },
        { text: "Non è possibile in Excel", correct: false },
        { text: "Metti le intestazioni in grassetto molto grande", correct: false }
      ],
      explanation: "'Blocca riga superiore' è una funzione di Excel che mantiene visibile la prima riga anche quando scorri giù per vedere righe lontane. È fondamentale per fogli lunghi."
    },
    {
      type: 'summary',
      title: 'Lezione completata! 🎉',
      content: "Sai ora formattare Excel in modo professionale: · Grassetto, colori e allineamento · Adattare la larghezza delle colonne · Bloccare la riga delle intestazioni\n\nNell'ultima lezione creerai un budget mensile completo mettendo insieme tutto quello che hai imparato.",
    }
  ]
};

const excelLesson4: Lesson = {
  id: 'excel-4',
  moduleId: 'excel',
  number: 4,
  title: 'Budget mensile — progetto completo',
  duration: '25 min',
  xp: 100,
  screens: [
    {
      type: 'intro',
      title: 'Budget mensile — metti insieme tutto',
      content: "In questa lezione finale crei un budget mensile reale: struttura, dati, formule e formattazione. È il progetto più utile che puoi portarti a casa.",
    },
    {
      type: 'learn',
      title: 'Struttura del budget mensile',
      content: "Un budget mensile efficace ha questa struttura:\n\nColonna A: Categoria (Affitto, Spesa, Trasporti...)\nColonna B: Importo Previsto (quanto pensi di spendere)\nColonna C: Importo Reale (quanto hai speso davvero)\nColonna D: Differenza (C - B, per vedere dove hai sforato)\n\nRighe finali:\n• TOTALE SPESE (formula SOMMA)\n• ENTRATE (stipendio, altri redditi)\n• SALDO (Entrate - Spese totali)",
      tip: "Crea questo file ogni mese: duplica il foglio e aggiorna solo i dati reali. In 6 mesi avrai un quadro preciso di dove va il tuo denaro."
    },
    {
      type: 'learn',
      title: 'Le formule del budget',
      content: "Formule essenziali per il budget:\n\n• Totale spese previste: =SOMMA(B2:B15)\n• Totale spese reali: =SOMMA(C2:C15)\n• Differenza per ogni riga: =C2-B2 (se positivo hai speso di più del previsto)\n• Saldo finale: =B18-B16 (Entrate - Spese totali)\n\nFormattazione automatica: seleziona la colonna Differenza → Formattazione Condizionale → regole per colorare in rosso i valori positivi (sforamento) e verde i negativi (risparmio).",
    },
    {
      type: 'practice',
      title: 'Scenario: calcolo saldo mensile',
      scenario: "Il tuo budget mensile ha: Spese previste in B16 (=SOMMA(B2:B15)) = 1.400€. Entrate mensili in B18 = 1.650€. Vuoi calcolare il saldo nella cella B19.",
      task: "Quale formula scrivi in B19 per calcolare il saldo (quello che ti rimane)?",
      choices: [
        { text: "=SOMMA(B18:B16)", correct: false, feedback: "SOMMA somma i valori — ma tu vuoi sottrarre le spese dalle entrate. SOMMA qui darebbe un risultato sbagliato." },
        { text: "=B18-B16", correct: true, feedback: "Perfetto! Entrate (B18) meno Spese totali (B16) = Saldo. Con 1.650 - 1.400 = 250€ di risparmio mensile. Ottimo!" },
        { text: "=B16-B18", correct: false, feedback: "Questo calcola Spese - Entrate: avresti un numero negativo (-250€) che in realtà significherebbe risparmio — ma è confuso. La convenzione è Entrate - Spese." }
      ]
    },
    {
      type: 'quiz',
      title: 'Domanda finale',
      question: "Il saldo del tuo budget mensile è -200€. Cosa significa?",
      options: [
        { text: "Hai risparmiato 200€ questo mese", correct: false },
        { text: "Hai speso 200€ in più di quello che guadagni — stai andando in rosso", correct: true },
        { text: "Hai un credito di 200€ con il datore di lavoro", correct: false },
        { text: "Excel ha fatto un errore di calcolo", correct: false }
      ],
      explanation: "Un saldo negativo significa che le spese superano le entrate. Hai speso 200€ più di quello che guadagni: stai usando risparmi o andando in debito. Il budget ti aiuta a vedere questo problema prima che diventi grave."
    },
    {
      type: 'summary',
      title: 'Modulo Excel Completato! 🏅',
      content: "Complimenti — hai completato tutte le lezioni di Excel! Ora sai: · Navigare nel foglio di calcolo · Usare le formule SOMMA, MEDIA, MAX, MIN · Formattare in modo professionale · Creare un budget mensile completo\n\nHai guadagnato il badge Microsoft Excel! Sei pronto per il certificato finale.",
    }
  ]
};

// ─── M04 — Microsoft Word ─────────────────────────────────────────────────────

const wordLesson1: Lesson = {
  id: 'word-1',
  moduleId: 'word',
  number: 1,
  title: 'Aprire Word e orientarsi',
  duration: '15 min',
  xp: 50,
  screens: [
    {
      type: 'intro',
      title: 'Aprire Word e orientarsi',
      content: "In questa lezione imparerai ad aprire Microsoft Word, capire l'interfaccia e creare il tuo primo documento. Al termine saprai navigare con sicurezza nel programma.",
      tip: 'Durata: 15 minuti · Nessuna esperienza richiesta',
    },
    {
      type: 'learn',
      title: "L'interfaccia di Word — il tuo studio digitale",
      content: "Quando apri Word, vedi:\n\n• Barra multifunzione (Ribbon): strisce di pulsanti in cima — Home, Inserisci, Layout, Riferimenti...\n• Area bianca centrale: è il foglio dove scrivi\n• Barra di stato in basso: mostra numero pagine, parole, lingua\n• Cursore lampeggiante: indica dove appare il testo che digiti",
      analogy: "Word è come un quaderno digitale super-attrezzato: hai la pagina bianca al centro, una cassetta degli attrezzi (il Ribbon) in alto e un contaparole automatico. Niente si sporca, niente si rompe.",
      tip: "Premi Ctrl+N per aprire un nuovo documento vuoto in qualsiasi momento.",
    },
    {
      type: 'learn',
      title: "Salvare subito — la regola d'oro",
      content: "Prima regola di Word: salva subito!\n\n1. Premi Ctrl+S (o Cmd+S su Mac)\n2. Scegli dove salvare (Desktop, Documenti...)\n3. Dai un nome al file (es. 'Lettera di presentazione')\n4. Il formato .docx è il default — va bene per tutto\n\nDopo il primo salvataggio, Ctrl+S aggiorna il file in un istante.\n\nSalvataggio automatico: se hai Microsoft 365 con OneDrive attivo, Word salva ogni pochi secondi automaticamente.",
      tip: "Salva ogni 10 minuti con Ctrl+S. È un'abitudine che ti salverà da molti problemi.",
    },
    {
      type: 'quiz',
      title: 'Verifica — la barra multifunzione',
      question: "Come si chiama la striscia di pulsanti e menu in cima a Word?",
      options: [
        { text: 'Barra multifunzione (Ribbon)', correct: true },
        { text: 'Barra di stato', correct: false },
        { text: 'Pannello di controllo', correct: false },
        { text: 'Area di testo', correct: false },
      ],
      explanation: "La Barra multifunzione (Ribbon) è l'area con tutti i pulsanti organizzata in schede (Home, Inserisci, Layout...). È la tua cassetta degli attrezzi principale in Word.",
    },
    {
      type: 'quiz',
      title: 'Verifica — salvare il documento',
      question: "Qual è la scorciatoia da tastiera per salvare rapidamente in Word?",
      options: [
        { text: 'Ctrl+P', correct: false },
        { text: 'Ctrl+S', correct: true },
        { text: 'Ctrl+Z', correct: false },
        { text: 'Ctrl+A', correct: false },
      ],
      explanation: "Ctrl+S (Save) salva il documento. Ctrl+P apre la stampa, Ctrl+Z annulla l'ultima azione, Ctrl+A seleziona tutto il testo.",
    },
    {
      type: 'practice',
      title: 'Scenario: primo giorno di lavoro',
      scenario: "Sei al tuo nuovo lavoro. Il responsabile ti chiede di aprire Word e creare un documento chiamato 'Note riunione 01-05-2026' e salvarlo nella cartella Documenti.",
      task: "Quali sono i passi corretti nell'ordine giusto?",
      choices: [
        { text: 'Apro Word → scrivo il testo → salvo alla fine con Ctrl+S', correct: false, feedback: "Quasi! Ma è meglio salvare SUBITO con un nome, prima di scrivere. Così se il PC si blocca non perdi nulla." },
        { text: 'Apro Word → Ctrl+S → scelgo la cartella Documenti → digito il nome → scrivo', correct: true, feedback: "Perfetto! Salvare subito con un nome significativo è la pratica professionale corretta. Poi puoi scrivere tranquillo." },
        { text: "Apro Word → Salva con nome dal menu File → scrivo → Ctrl+S alla fine", correct: false, feedback: "Non sbagliato, ma l'ordine non è ottimale. Meglio salvare con nome prima di iniziare a scrivere, non dopo." },
      ],
    },
    {
      type: 'summary',
      title: 'Lezione completata! 🎉',
      content: "Ottimo lavoro! Ora sai:\n· Come si presenta l'interfaccia di Word\n· A cosa serve la barra multifunzione\n· Come salvare subito con Ctrl+S\n\nNella prossima lezione imparerai a formattare il testo in modo professionale.",
    },
  ],
};

const wordLesson2: Lesson = {
  id: 'word-2',
  moduleId: 'word',
  number: 2,
  title: 'Scrivere e formattare il testo',
  duration: '20 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'Scrivere e formattare il testo',
      content: "Scrivere è solo metà del lavoro. In questa lezione impari a formattare il testo per renderlo chiaro, leggibile e professionale — come fanno i veri lavoratori d'ufficio.",
      tip: 'Durata: 20 minuti',
    },
    {
      type: 'learn',
      title: 'Le scorciatoie di formattazione',
      content: "Le tre formattazioni base e le loro scorciatoie:\n\n• Grassetto: Ctrl+B (Bold) — per titoli, parole importanti\n• Corsivo: Ctrl+I (Italic) — per termini tecnici, citazioni\n• Sottolineato: Ctrl+U (Underline) — per link, enfasi\n\nCome si usa: seleziona il testo con il mouse → premi la scorciatoia.\nOppure: premi la scorciatoia → scrivi → premi di nuovo per uscire dalla modalità.\n\nAnnullare: Ctrl+Z annulla l'ultima azione — utilissimo se sbagli.",
      analogy: "Il grassetto è come scrivere con un pennarello invece di una matita: subito più visibile. Ctrl+Z è la gomma digitale — annulla qualsiasi errore all'istante.",
    },
    {
      type: 'learn',
      title: 'Dimensione e tipo di carattere',
      content: "Nella scheda Home trovi:\n\n• Tipo di carattere (font): Calibri è il default, Times New Roman è più formale, Arial è moderno e pulito\n• Dimensione: 11-12pt per il corpo testo, 14-16pt per i titoli\n• Colore: usa il nero per documenti formali, altri colori solo per evidenziare\n\nAllineamento del testo:\n• Sinistra (Ctrl+L): standard per lettere e testi\n• Centrato (Ctrl+E): per titoli e intestazioni\n• Giustificato (Ctrl+J): per testi lunghi — allinea sia a sinistra sia a destra",
      tip: "Per un documento professionale usa: Times New Roman 12pt o Calibri 11pt, allineamento giustificato, margini 2,5cm.",
    },
    {
      type: 'quiz',
      title: 'Verifica — scorciatoia grassetto',
      question: "Hai scritto una parola e vuoi metterla in grassetto. Quale sequenza usi?",
      options: [
        { text: 'Seleziono la parola → Ctrl+I', correct: false },
        { text: 'Seleziono la parola → Ctrl+B', correct: true },
        { text: 'Seleziono la parola → Ctrl+U', correct: false },
        { text: 'Faccio doppio clic sulla parola', correct: false },
      ],
      explanation: "Ctrl+B (B = Bold = Grassetto in inglese) mette il testo selezionato in grassetto. Ctrl+I = corsivo, Ctrl+U = sottolineato. Il doppio clic seleziona la parola ma non applica formattazione.",
    },
    {
      type: 'quiz',
      title: 'Verifica — annullare errori',
      question: "Hai accidentalmente cancellato un paragrafo. Come lo recuperi immediatamente?",
      options: [
        { text: 'Chiudi Word senza salvare e riapri il file', correct: false },
        { text: "Ctrl+Z per annullare l'ultima azione", correct: true },
        { text: 'Ctrl+S per salvare e recuperare', correct: false },
        { text: "Non puoi recuperarlo — è perso per sempre", correct: false },
      ],
      explanation: "Ctrl+Z (Undo = Annulla) è il tuo migliore amico! Puoi premere Ctrl+Z più volte di seguito per annullare le ultime N azioni. Ctrl+Y (Redo) rifà quello che hai annullato.",
    },
    {
      type: 'practice',
      title: 'Scenario: lettera formale per un colloquio',
      scenario: "Stai scrivendo una lettera formale per un colloquio di lavoro. Hai scritto il titolo 'Lettera di Presentazione' e il corpo del testo. Il titolo deve risaltare rispetto al corpo.",
      task: "Quale formattazione applichi al titolo per renderlo professionale?",
      choices: [
        { text: 'Testo normale, stesso carattere del corpo — un documento uniforme è più elegante', correct: false, feedback: "Il titolo DEVE distinguersi visivamente dal corpo. Senza formattazione diversa, il lettore fatica a capire la struttura del documento." },
        { text: 'Grassetto, dimensione 14pt, centrato (Ctrl+E)', correct: true, feedback: "Esatto! Grassetto + dimensione maggiore + centrato è la formattazione standard per i titoli nei documenti formali italiani." },
        { text: 'Tutto in MAIUSCOLO, colore rosso, sottolineato', correct: false, feedback: "Troppo aggressivo per un documento formale. Il maiuscolo dà l'impressione di stare urlando. Usa grassetto e dimensione maggiore invece." },
      ],
    },
    {
      type: 'summary',
      title: 'Lezione completata! 🎉',
      content: "Bravissimo! Ora padroneggi:\n· Grassetto (Ctrl+B), Corsivo (Ctrl+I), Sottolineato (Ctrl+U)\n· Come cambiare font, dimensione e allineamento\n· Ctrl+Z per annullare qualsiasi errore\n\nNella prossima lezione creerai un documento completo con intestazioni e layout professionale.",
    },
  ],
};

const wordLesson3: Lesson = {
  id: 'word-3',
  moduleId: 'word',
  number: 3,
  title: 'Documento professionale',
  duration: '25 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'Strutturare un documento professionale',
      content: "Un documento professionale ha una struttura precisa: intestazioni, paragrafi ben organizzati, elenchi chiari. In questa lezione impari a usare gli Stili di Word e a esportare in PDF.",
      tip: 'Durata: 25 minuti',
    },
    {
      type: 'learn',
      title: 'Gli Stili di Word — la chiave per documenti perfetti',
      content: "Gli Stili (Styles) sono combinazioni di formattazione predefinite. Li trovi nella scheda Home.\n\nPrincipali stili:\n• Normale: testo del corpo del documento\n• Titolo 1: titolo principale (grande, grassetto)\n• Titolo 2: sottotitolo (medio, grassetto)\n• Titolo 3: sotto-sezione\n\nPerché usare gli Stili:\n1. Uniformità: tutti i titoli hanno lo stesso aspetto\n2. Navigazione: Word crea automaticamente il sommario\n3. Professionalità: i documenti con stili sembrano fatti da esperti\n4. Velocità: applichi decine di formattazioni con un clic",
      analogy: "Gli Stili sono come i timbri di un ufficio: invece di scrivere 'URGENTE' a mano ogni volta, usi il timbro — veloce, uniforme, professionale.",
      tip: "Seleziona un titolo → clicca 'Titolo 1' nella barra degli stili. Fatto! Niente formattazione manuale.",
    },
    {
      type: 'learn',
      title: 'Elenchi e layout della pagina',
      content: "Elenchi puntati e numerati:\n• Elenco puntato (•): usa il pulsante nella scheda Home. Ottimo per elenchi senza ordine\n• Elenco numerato (1. 2. 3.): per procedure e passaggi in sequenza\n• Rientro: Tab aumenta il livello, Shift+Tab lo diminuisce\n\nLayout della pagina (scheda Layout):\n• Margini: 2,5cm standard per documenti formali\n• Orientamento: Verticale per testi, Orizzontale per tabelle larghe\n• Spaziatura: Home → Spaziatura paragrafo → 1,15 o 1,5 per leggibilità\n\nEsportare in PDF:\nFile → Esporta → Crea documento PDF/XPS → Pubblica",
      tip: "PDF è il formato ideale per inviare documenti: mantiene la formattazione su qualsiasi dispositivo.",
    },
    {
      type: 'quiz',
      title: 'Verifica — Stili di Word',
      question: "Stai scrivendo un documento con tre sezioni principali. Quale stile Word applichi ai titoli delle sezioni?",
      options: [
        { text: 'Normale con grassetto e font grande', correct: false },
        { text: 'Titolo 1', correct: true },
        { text: 'Titolo 3', correct: false },
        { text: 'Citazione intensa', correct: false },
      ],
      explanation: "Titolo 1 è lo stile per i titoli principali di primo livello. Usare gli Stili garantisce uniformità, facilita la navigazione e permette di creare sommari automatici.",
    },
    {
      type: 'quiz',
      title: 'Verifica — esportazione PDF',
      question: "Il tuo responsabile chiede il verbale in un formato 'che non si possa modificare e che si veda uguale su tutti i PC'. Quale formato scegli?",
      options: [
        { text: '.docx (Word)', correct: false },
        { text: '.txt (testo semplice)', correct: false },
        { text: '.pdf', correct: true },
        { text: '.jpg (immagine)', correct: false },
      ],
      explanation: "PDF è il formato ideale per documenti da condividere in sola lettura. Preserva la formattazione esatta e funziona su qualsiasi dispositivo.",
    },
    {
      type: 'practice',
      title: 'Scenario: verbale di riunione',
      scenario: "Devi preparare il verbale di una riunione con: un titolo principale, tre sezioni ('Presenti', 'Ordine del giorno', 'Decisioni prese'), e un elenco puntato di 4 decisioni.",
      task: "Come strutturi il documento nel modo più professionale?",
      choices: [
        { text: "Scrivo tutto in Normale, metto i titoli in grassetto manuale e uso i trattini (-) per l'elenco", correct: false, feedback: "Funziona, ma la formattazione manuale è inconsistente. Gli stili garantiscono uniformità automatica." },
        { text: "Titolo principale → stile Titolo 1; Sezioni → stile Titolo 2; Decisioni → elenco puntato Word; corpo → stile Normale", correct: true, feedback: "Perfetto! Questa è la struttura professionale standard. Gli Stili garantiscono uniformità e Word può generare un sommario automatico." },
        { text: "Uso Titolo 1 per tutto, poi cambio manualmente le dimensioni delle sezioni secondarie", correct: false, feedback: "Mescolare Stili e formattazione manuale crea inconsistenza. Usa Titolo 2 per le sezioni secondarie." },
      ],
    },
    {
      type: 'summary',
      title: 'Lezione completata! 🎉',
      content: "Eccellente! Ora sei in grado di:\n· Usare gli Stili di Word per documenti strutturati\n· Creare elenchi puntati e numerati\n· Impostare layout e margini professionali\n· Esportare qualsiasi documento in PDF\n\nNell'ultima lezione di questo modulo creerai un vero CV con Word.",
    },
  ],
};

const wordLesson4: Lesson = {
  id: 'word-4',
  moduleId: 'word',
  number: 4,
  title: 'Creare un CV con Word',
  duration: '20 min',
  xp: 100,
  screens: [
    {
      type: 'intro',
      title: 'Creare un CV professionale con Word',
      content: "Il CV è il documento più importante della tua vita lavorativa. In questa lezione impari a creare un CV chiaro, professionale e compatibile con i sistemi di selezione automatica usati dalle aziende.",
      tip: 'Durata: 20 minuti · Al termine avrai le basi per creare il tuo CV reale',
    },
    {
      type: 'learn',
      title: 'Struttura del CV — le sezioni fondamentali',
      content: "Un CV italiano standard ha queste sezioni nell'ordine:\n\n1. Intestazione: Nome Cognome (grande, grassetto), Contatti (email, telefono, città)\n2. Profilo professionale: 2-3 righe che descrivono chi sei e cosa cerchi\n3. Esperienza lavorativa: in ordine dal più recente al più vecchio\n4. Istruzione e formazione: diploma, corsi, certificazioni\n5. Competenze: informatiche, linguistiche, soft skills\n6. Informazioni aggiuntive: volontariato, hobby rilevanti",
      analogy: "Il CV è il tuo biglietto da visita scritto. Come una vetrina di negozio: devi mettere in bella mostra le cose migliori nella parte più visibile, in ordine preciso.",
    },
    {
      type: 'learn',
      title: 'Formattare il CV in Word',
      content: "Consigli pratici di formattazione:\n\n• Font: Calibri o Arial, 11pt per il corpo, 16pt per il nome\n• Margini: 1,5-2cm (per far stare più contenuto)\n• Spaziatura: 1,15 tra le righe\n• Intestazioni sezioni: grassetto, 12pt\n• Elenchi puntati: usa Word (non trattini manuali)\n• Lunghezza: 1 pagina se hai meno di 5 anni di esperienza, 2 se hai più esperienza\n• Salva come PDF prima di inviarlo\n\nUsa un template: File → Nuovo → cerca 'CV' — Word ha modelli gratuiti pronti.",
      tip: "MAI inviare il CV in .docx. Sempre in PDF: preserva la formattazione e sembra più professionale.",
    },
    {
      type: 'quiz',
      title: 'Verifica — struttura del CV',
      question: "In quale ordine va presentata l'esperienza lavorativa nel CV?",
      options: [
        { text: "Dal lavoro più vecchio al più recente (ordine cronologico)", correct: false },
        { text: "Dal lavoro più recente al più vecchio (ordine cronologico inverso)", correct: true },
        { text: "Per importanza, non per data", correct: false },
        { text: "In ordine alfabetico per nome azienda", correct: false },
      ],
      explanation: "Il CV va sempre in ordine cronologico inverso: prima il lavoro più recente, poi i precedenti. Il selezionatore vuole vedere subito la tua esperienza più recente.",
    },
    {
      type: 'quiz',
      title: 'Verifica — formato di invio',
      question: "Hai finito il tuo CV in Word. In quale formato lo invii per una candidatura?",
      options: [
        { text: ".docx — così il selezionatore può aprirlo con Word", correct: false },
        { text: ".pdf — per preservare la formattazione e fare un'impressione professionale", correct: true },
        { text: ".txt — il formato più universale", correct: false },
        { text: ".jpg — lo salvo come immagine", correct: false },
      ],
      explanation: "PDF è il formato corretto per inviare il CV. Garantisce che la formattazione sia identica su qualsiasi dispositivo e trasmette professionalità.",
    },
    {
      type: 'practice',
      title: "Scenario: candidatura per un'offerta di lavoro",
      scenario: "Hai trovato un'offerta di lavoro come impiegato amministrativo. L'azienda chiede di inviare CV e lettera di presentazione. Hai il CV in formato .docx pronto su Word.",
      task: "Qual è la procedura corretta prima di inviare?",
      choices: [
        { text: "Invio direttamente il .docx — è più facile da aprire per tutti", correct: false, feedback: "Il .docx può avere problemi di compatibilità e il layout può spostarsi. Sempre PDF per le candidature." },
        { text: "File → Esporta → Crea PDF/XPS → Pubblica; poi allego il PDF all'email", correct: true, feedback: "Procedura perfetta! Esportare in PDF da Word è semplicissimo e garantisce che il selezionatore veda il CV esattamente come lo hai creato tu." },
        { text: "Stampo il CV e scansiono il PDF con lo scanner", correct: false, feedback: "Il risultato è un'immagine scansionata. I sistemi ATS (software di selezione automatica) non leggono le immagini. Usa File → Esporta." },
      ],
    },
    {
      type: 'summary',
      title: 'Modulo Word Completato! 🏅',
      content: "Complimenti — hai completato il modulo Microsoft Word! Ora sei in grado di:\n· Creare e salvare documenti professionali\n· Formattare il testo con stile e precisione\n· Strutturare documenti con Stili, titoli ed elenchi\n· Creare un CV professionale e salvarlo in PDF\n\nHai guadagnato il badge Microsoft Word! Vai alle Certificazioni per ottenere il certificato ufficiale.",
    },
  ],
};

// ─── M06 — Portali PA ─────────────────────────────────────────────────────────

const portaliPaLesson1: Lesson = {
  id: 'portali-pa-1',
  moduleId: 'portali-pa',
  number: 1,
  title: 'I portali PA — panoramica',
  duration: '15 min',
  xp: 50,
  screens: [
    {
      type: 'intro',
      title: 'I portali della Pubblica Amministrazione',
      content: "Lo sportello fisico non è l'unico modo per interagire con la PA italiana. In questa lezione scopri i principali portali online e come accedervi con SPID — risparmiando ore di code.",
      tip: 'Durata: 15 minuti',
    },
    {
      type: 'learn',
      title: "I principali portali PA — la mappa dei servizi",
      content: "I principali siti della PA italiana che devi conoscere:\n\n• INPS.it — pensioni, NASpI, bonus, contributi\n• AgenziaEntrate.gov.it — 730 precompilato, F24, visure catastali\n• INAIL.it — assicurazione lavoro, infortuni\n• Fascicolo Sanitario Elettronico (FSE) — referti, prescrizioni, storico medico\n• CUP (Centro Unico Prenotazione) — prenotare visite specialistiche\n• PagoPA — pagare tasse, bollette e servizi PA online\n\nAccesso: quasi tutti usano SPID o CIE come metodo di autenticazione.",
      analogy: "I portali PA sono come uno sportello polifunzionale aperto 24 ore su 24. SPID è il tesserino che ti fa entrare in tutti i reparti senza dover fare una fila separata per ognuno.",
    },
    {
      type: 'learn',
      title: "Come accedere — SPID come chiave universale",
      content: "Procedura standard per accedere a un portale PA:\n\n1. Vai sul sito del servizio (es. INPS.it)\n2. Clicca su 'Accedi' o 'Area riservata'\n3. Scegli 'Entra con SPID'\n4. Seleziona il tuo Identity Provider (es. Poste Italiane, TIM ID...)\n5. Inserisci username e password SPID\n6. Autorizza l'accesso con il codice OTP dall'app\n7. Sei dentro la tua area personale\n\nTempo medio: meno di 1 minuto.",
      tip: "Tieni sempre lo smartphone vicino quando accedi ai portali PA: il codice OTP arriva sull'app del tuo provider SPID.",
    },
    {
      type: 'quiz',
      title: 'Verifica — portali PA principali',
      question: "Su quale portale PA puoi visualizzare la tua situazione contributiva e l'estratto conto previdenziale?",
      options: [
        { text: 'AgenziaEntrate.gov.it', correct: false },
        { text: 'INPS.it', correct: true },
        { text: 'INAIL.it', correct: false },
        { text: 'PagoPA.gov.it', correct: false },
      ],
      explanation: "INPS.it è il portale dell'Istituto Nazionale di Previdenza Sociale. Qui puoi vedere i contributi versati, simulare la pensione, richiedere la NASpI e molto altro.",
    },
    {
      type: 'quiz',
      title: 'Verifica — accesso con SPID',
      question: "Dopo aver inserito username e password SPID, quale passaggio aggiuntivo viene richiesto?",
      options: [
        { text: "Nessun passaggio — la password è sufficiente", correct: false },
        { text: "Un codice OTP (One Time Password) generato dall'app del provider SPID", correct: true },
        { text: "Una firma digitale con firma elettronica qualificata", correct: false },
        { text: "Il numero della carta d'identità", correct: false },
      ],
      explanation: "SPID usa l'autenticazione a due fattori: password + codice OTP dall'app. Questo doppio controllo protegge il tuo account anche se qualcuno conosce la tua password.",
    },
    {
      type: 'practice',
      title: 'Scenario: accedere a INPS per la prima volta',
      scenario: "Hai ricevuto una lettera da INPS che ti invita a verificare la tua situazione contributiva online. Hai uno SPID attivo con Poste Italiane. Non hai mai acceduto a INPS.it prima.",
      task: "Qual è la sequenza corretta per accedere?",
      choices: [
        { text: "Vado allo sportello INPS fisico — è più sicuro che farlo online", correct: false, feedback: "Lo sportello fisico richiede appuntamento e ore di attesa. Con SPID puoi fare la stessa cosa da casa in 2 minuti, con lo stesso livello di sicurezza." },
        { text: "Vado su INPS.it → 'Entra con SPID' → seleziono Poste Italiane → inserisco credenziali → confermo con OTP", correct: true, feedback: "Procedura corretta! Questo è esattamente il flusso di accesso standard. Dopo il primo accesso ti sentirai molto più sicuro." },
        { text: "Cerco 'INPS' su Google e clicco sul primo risultato, poi inserisco il codice fiscale", correct: false, feedback: "Attenzione! Digita sempre inps.it direttamente nella barra degli indirizzi. I siti di phishing si spacciano spesso per portali PA." },
      ],
    },
    {
      type: 'summary',
      title: 'Lezione completata! 🎉',
      content: "Perfetto! Ora conosci:\n· I principali portali della PA italiana\n· Come funziona l'accesso con SPID\n· La procedura con codice OTP per la sicurezza\n\nNella prossima lezione esplori INPS in dettaglio: pensioni, NASpI e bonus.",
    },
  ],
};

const portaliPaLesson2: Lesson = {
  id: 'portali-pa-2',
  moduleId: 'portali-pa',
  number: 2,
  title: 'INPS online — pensioni e bonus',
  duration: '15 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'INPS online — gestire la previdenza da casa',
      content: "INPS è forse il portale PA più usato dagli italiani. In questa lezione impari a navigarlo con sicurezza: estratto conto previdenziale, simulatore pensione, richiesta NASpI e bonus.",
      tip: 'Durata: 15 minuti',
    },
    {
      type: 'learn',
      title: "L'area personale INPS — cosa trovi",
      content: "Una volta dentro INPS.it con SPID, trovi la tua area riservata con:\n\n• Estratto conto previdenziale: ogni contributo versato dai tuoi datori di lavoro, anno per anno\n• La Mia Pensione Future: simulatore che calcola quanto riceverai e quando potrai andare in pensione\n• Domanda NASpI: se perdi il lavoro, richiedere l'indennità di disoccupazione online\n• Bonus e sussidi: verifica se hai diritto a bonus e fai domanda online\n• Cedolino pensione: se sei già pensionato, scarica il cedolino ogni mese",
      analogy: "L'area riservata INPS è come il tuo fascicolo previdenziale in mano tua: puoi controllare tutto quello che ti riguarda senza dipendere da un operatore di sportello.",
    },
    {
      type: 'learn',
      title: 'Verificare i contributi e il simulatore pensione',
      content: "Come usare l'estratto conto previdenziale:\n\n1. Accedi a INPS.it con SPID\n2. Vai in 'Fascicolo Previdenziale del Cittadino'\n3. Clicca 'Estratto Conto Previdenziale'\n4. Vedi tutti i periodi lavorativi con i contributi versati\n\nCosa verificare:\n• Tutti i periodi di lavoro sono presenti?\n• I dati dell'azienda sono corretti?\n• Non ci sono 'buchi' contributivi non spiegati?\n\nSe trovi errori: clicca 'Segnala un'anomalia' — INPS correggerà il tuo estratto conto.",
      tip: "Controlla il tuo estratto conto INPS almeno una volta all'anno. Prima trovi eventuali errori, più è facile correggerli.",
    },
    {
      type: 'quiz',
      title: 'Verifica — errori nel cedolino INPS',
      question: "Hai lavorato per 3 anni in un'azienda ma nell'estratto conto INPS quel periodo non compare. Cosa fai?",
      options: [
        { text: "Non faccio nulla — probabilmente i contributi arriveranno in ritardo", correct: false },
        { text: "Vado allo sportello INPS con il contratto di lavoro", correct: false },
        { text: "Clicco 'Segnala un'anomalia' nell'estratto conto INPS e allego la documentazione", correct: true },
        { text: "Chiamo il datore di lavoro precedente", correct: false },
      ],
      explanation: "INPS ha una funzione 'Segnala un'anomalia' direttamente nell'estratto conto. È il modo più rapido per segnalare errori. Puoi allegare documenti e seguire lo stato della pratica online.",
    },
    {
      type: 'quiz',
      title: 'Verifica — NASpI',
      question: "Hai perso il lavoro ieri. Quando puoi fare domanda NASpI su INPS.it?",
      options: [
        { text: "Solo dopo 30 giorni dalla perdita del lavoro", correct: false },
        { text: "Puoi fare domanda da subito, ma hai tempo 68 giorni dalla cessazione", correct: true },
        { text: "Solo se vai allo sportello INPS di persona", correct: false },
        { text: "Solo dopo aver trovato un altro lavoro", correct: false },
      ],
      explanation: "La domanda NASpI va presentata entro 68 giorni dalla fine del lavoro. Puoi farla subito via INPS.it con SPID, senza andare allo sportello. Prima fai domanda, prima iniziano i pagamenti.",
    },
    {
      type: 'practice',
      title: 'Scenario: verificare i contributi versati',
      scenario: "Maria, 52 anni, vuole sapere quanti anni di contributi ha versato per capire quando potrà andare in pensione. Ha SPID attivo e non ha mai usato INPS.it.",
      task: "Quale percorso deve seguire su INPS.it?",
      choices: [
        { text: "Chiama il numero verde INPS e si fa leggere i dati dall'operatore", correct: false, feedback: "I call center INPS hanno tempi di attesa molto lunghi. Con SPID Maria può vedere gli stessi dati in 2 minuti, disponibili 24 ore su 24." },
        { text: "INPS.it → SPID → Fascicolo Previdenziale → Estratto Conto → Simulatore 'La Mia Pensione Future'", correct: true, feedback: "Percorso corretto! L'estratto conto mostra tutti gli anni di contributi, e il simulatore calcola la data stimata della pensione." },
        { text: "Va al CAF a chiedere aiuto", correct: false, feedback: "Il CAF può aiutare, ma con SPID Maria può fare tutto da sola in pochi minuti. L'autonomia digitale significa non dover dipendere da intermediari per queste operazioni base." },
      ],
    },
    {
      type: 'summary',
      title: 'Lezione completata! 🎉',
      content: "Ottimo! Ora sai usare INPS.it per:\n· Controllare il tuo estratto conto previdenziale\n· Simulare la data e l'importo della pensione\n· Fare domanda NASpI in caso di disoccupazione\n· Segnalare anomalie nei contributi\n\nNell'ultima lezione impari a prenotare visite mediche e pagare tributi online.",
    },
  ],
};

const portaliPaLesson3: Lesson = {
  id: 'portali-pa-3',
  moduleId: 'portali-pa',
  number: 3,
  title: 'Prenotare servizi e pagare online',
  duration: '15 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'Prenotare e pagare servizi PA online',
      content: "Le code agli sportelli appartengono al passato. In questa lezione impari a prenotare visite mediche via CUP, pagare tributi con PagoPA e usare l'app IO — tutto da smartphone o PC.",
      tip: 'Durata: 15 minuti',
    },
    {
      type: 'learn',
      title: "CUP — prenotare visite specialistiche",
      content: "Il CUP (Centro Unico Prenotazione) permette di prenotare visite mediche del Servizio Sanitario Nazionale.\n\nCome prenotare online:\n1. Cerca 'CUP [nome della tua regione]'\n2. Accedi con SPID o Tessera Sanitaria\n3. Inserisci l'impegnativa del medico\n4. Scegli ospedale/ambulatorio, data e ora\n5. Conferma e ricevi il promemoria via email o SMS\n\nAlternative:\n• App del SSN regionale\n• Numero verde CUP della tua regione (H24)\n• Totem CUP in farmacia",
      analogy: "Il CUP online è come un'agenzia di viaggi per la sanità: prenoti il tuo appuntamento medico scegliendo struttura, data e orario comodamente, senza code.",
      tip: "Urgente? Il CUP mostra disponibilità entro i tempi massimi garantiti (72 ore per urgente, 30 giorni per priorità).",
    },
    {
      type: 'learn',
      title: "PagoPA e l'app IO — pagare tributi e servizi PA",
      content: "PagoPA è la piattaforma ufficiale per i pagamenti verso la PA italiana.\n\nCosa si paga con PagoPA:\n• Tasse comunali (TARI, IMU)\n• Multe stradali\n• Rette scolastiche e universitarie\n• Bollo auto\n• Ticket medico\n\nCome pagare:\n1. Hai un avviso PagoPA con un codice IUV\n2. Vai su pagopa.gov.it o usa l'app IO\n3. Inserisci il codice IUV o scansiona il QR code\n4. Scegli il metodo di pagamento\n5. Ricevi la ricevuta digitale valida legalmente\n\nL'app IO raccoglie tutti gli avvisi PagoPA in un'unica applicazione.",
      tip: "Scarica l'app IO: centralizza messaggi, pagamenti e documenti di tutta la PA italiana in un'unica app.",
    },
    {
      type: 'quiz',
      title: 'Verifica — CUP online',
      question: "Hai una ricetta del medico per una visita cardiologica. Dove prenoti online?",
      options: [
        { text: 'INPS.it', correct: false },
        { text: 'AgenziaEntrate.gov.it', correct: false },
        { text: "Il CUP (Centro Unico Prenotazione) della tua regione", correct: true },
        { text: 'PagoPA.gov.it', correct: false },
      ],
      explanation: "Il CUP gestisce le prenotazioni delle visite specialistiche SSN. Ogni regione ha il proprio CUP online accessibile con SPID o tessera sanitaria.",
    },
    {
      type: 'quiz',
      title: 'Verifica — PagoPA',
      question: "Hai ricevuto un avviso di pagamento per la TARI del Comune. Come paghi online?",
      options: [
        { text: "Solo in banca o alle Poste — non si paga online", correct: false },
        { text: "Su PagoPA.gov.it o tramite l'app IO inserendo il codice IUV dell'avviso", correct: true },
        { text: "Su INPS.it", correct: false },
        { text: "Con un bonifico bancario standard", correct: false },
      ],
      explanation: "PagoPA è la piattaforma ufficiale per tutti i pagamenti PA. Con il codice IUV e una carta di credito/debito il pagamento si completa in 2 minuti. Ricevi subito ricevuta digitale valida legalmente.",
    },
    {
      type: 'practice',
      title: 'Scenario: gestire tutto dal telefonino',
      scenario: "Giorgio, 62 anni, deve: pagare il bollo auto scaduto (ha l'avviso PagoPA) e prenotare una visita oculistica con l'impegnativa del medico. Ha SPID e uno smartphone.",
      task: "Qual è il modo più efficiente per fare entrambe le cose?",
      choices: [
        { text: "Va alle Poste per il bollo e telefona al CUP per la visita", correct: false, feedback: "Funziona, ma richiede spostamenti e attese. Con SPID e l'app IO, Giorgio può fare entrambe le cose da casa in 10 minuti." },
        { text: "Scarica l'app IO (bollo via PagoPA) e accede al CUP regionale con SPID per la visita", correct: true, feedback: "Soluzione ottimale! L'app IO centralizza i pagamenti PagoPA. Il CUP regionale gestisce le prenotazioni sanitarie. Tutto con SPID, tutto da smartphone." },
        { text: "Aspetta il rinnovo automatico del bollo e va allo sportello ASL per la visita", correct: false, feedback: "Il bollo auto non si rinnova automaticamente — rischia una multa. E lo sportello ASL richiede appuntamento. I servizi online sono molto più rapidi." },
      ],
    },
    {
      type: 'summary',
      title: 'Modulo Portali PA Completato! 🏅',
      content: "Eccellente! Hai completato il modulo Portali PA. Ora sai:\n· Navigare i principali portali della PA italiana\n· Accedere con SPID a tutti i servizi\n· Usare INPS per pensioni e sussidi\n· Prenotare visite con il CUP\n· Pagare tributi con PagoPA e l'app IO\n\nHai guadagnato il badge Portali PA! Vai alle Certificazioni per il certificato ufficiale.",
    },
  ],
};

// ─── Export completo ──────────────────────────────────────────────────────────

export const allLessons: Lesson[] = [
  spidLesson1, spidLesson2, spidLesson3,
  pecLesson1, pecLesson2,
  emailLesson1, emailLesson2,
  wordLesson1, wordLesson2, wordLesson3, wordLesson4,
  excelLesson1, excelLesson2, excelLesson3, excelLesson4,
  portaliPaLesson1, portaliPaLesson2, portaliPaLesson3,
];

export function getLessonsForModule(moduleId: string): Lesson[] {
  return allLessons.filter(l => l.moduleId === moduleId);
}
