export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Exam {
  moduleId: string;
  title: string;
  timeMinutes: number;
  passingScore: number; // percentage
  questions: ExamQuestion[];
}

const spidExam: Exam = {
  moduleId: 'spid',
  title: 'Esame — SPID & Identità Digitale',
  timeMinutes: 20,
  passingScore: 70,
  questions: [
    {
      id: 'spid-e1',
      question: "Cosa significa l'acronimo SPID?",
      options: ["Sistema Pubblico di Identità Digitale", "Servizio Privato di Identificazione Digitale", "Sistema di Protezione Identità Digitale", "Servizio Pubblico Internet Digitale"],
      correctIndex: 0,
      explanation: "SPID sta per Sistema Pubblico di Identità Digitale — il sistema del Governo italiano per accedere ai servizi online della PA."
    },
    {
      id: 'spid-e2',
      question: "SPID è a pagamento?",
      options: ["Sì, costa circa €20 all'anno", "No, è completamente gratuito", "È gratuito solo per i pensionati", "Costa €5 per la prima attivazione"],
      correctIndex: 1,
      explanation: "SPID è completamente gratuito. L'identità SPID base non ha alcun costo — alcuni provider offrono servizi aggiuntivi a pagamento, ma non sono necessari."
    },
    {
      id: 'spid-e3',
      question: "Quale documento NON è necessario per richiedere SPID?",
      options: ["Carta d'identità o passaporto", "Tessera sanitaria", "Libretto di lavoro", "Numero di cellulare attivo"],
      correctIndex: 2,
      explanation: "Il libretto di lavoro non serve per SPID. Bastano: documento d'identità, tessera sanitaria, email e numero di cellulare."
    },
    {
      id: 'spid-e4',
      question: "Cos'è un 'Identity Provider' SPID?",
      options: ["Il sito del Governo dove usi lo SPID", "Il soggetto che verifica la tua identità e gestisce le credenziali SPID", "Un tipo speciale di carta d'identità digitale", "Il numero di telefono associato al tuo SPID"],
      correctIndex: 1,
      explanation: "L'Identity Provider (es. PosteID, Aruba, TIM) è il soggetto accreditato che verifica la tua identità e ti rilascia le credenziali SPID."
    },
    {
      id: 'spid-e5',
      question: "Qual è la differenza tra SPID e CIE?",
      options: ["Non c'è differenza, sono la stessa cosa", "SPID è un account digitale, CIE è la Carta d'Identità Elettronica fisica con chip NFC", "CIE è solo per gli anziani, SPID per i giovani", "SPID funziona solo su PC, CIE solo su smartphone"],
      correctIndex: 1,
      explanation: "SPID è un sistema di credenziali digitali (username+password+app), mentre la CIE è la Carta d'Identità Elettronica fisica con chip NFC. Entrambe permettono di accedere ai servizi PA."
    },
    {
      id: 'spid-e6',
      question: "Cosa devi fare DOPO aver inserito username e password SPID su un sito?",
      options: ["Nient'altro — l'accesso è completo", "Approvare la notifica di accesso nell'app del provider sul tuo telefono", "Stampare un modulo di conferma", "Aspettare una email di conferma entro 24 ore"],
      correctIndex: 1,
      explanation: "Dopo le credenziali, devi approvare la richiesta di accesso nell'app del provider (es. PosteID) sul tuo telefono. Questo è il secondo fattore di autenticazione (2FA)."
    },
    {
      id: 'spid-e7',
      question: "Quale sito web usi per scegliere il provider SPID e iniziare la procedura?",
      options: ["google.it", "spid.gov.it", "poste.it", "agid.gov.it"],
      correctIndex: 1,
      explanation: "Il portale ufficiale per scegliere il provider e attivare SPID è spid.gov.it — il sito istituzionale del Governo italiano."
    },
    {
      id: 'spid-e8',
      question: "Quanto tempo ci vuole per attivare SPID tramite PosteID allo sportello postale?",
      options: ["Circa 2-3 ore", "1-2 settimane di attesa", "Circa 10-15 minuti allo sportello", "Non è possibile attivarlo allo sportello"],
      correctIndex: 2,
      explanation: "Con PosteID, l'attivazione allo sportello dura circa 10-15 minuti. È il metodo più rapido e diretto per chi non è a proprio agio con le procedure online."
    },
    {
      id: 'spid-e9',
      question: "Quanti servizi pubblici italiani accettano SPID (dato 2024)?",
      options: ["Circa 50", "Circa 300", "Oltre 1.200", "Solo INPS e Agenzia delle Entrate"],
      correctIndex: 2,
      explanation: "Oltre 1.200 servizi della PA italiana accettano SPID, e la lista cresce ogni mese. Include INPS, Agenzia Entrate, Comuni, scuole, sanità e molto altro."
    },
    {
      id: 'spid-e10',
      question: "Cosa succede se dimentichi la password SPID?",
      options: ["Devi richiedere un nuovo SPID da zero", "Puoi reimpostare la password tramite la procedura di recupero del tuo provider", "Devi andare di persona allo sportello INPS", "Lo SPID viene automaticamente cancellato dopo 3 tentativi falliti"],
      correctIndex: 1,
      explanation: "Se dimentichi la password, puoi reimpostarla tramite la procedura di recupero credenziali del tuo provider (es. PosteID). Non devi rifare tutta la procedura di attivazione."
    }
  ]
};

const pecExam: Exam = {
  moduleId: 'pec',
  title: 'Esame — PEC (Posta Certificata)',
  timeMinutes: 15,
  passingScore: 70,
  questions: [
    { id: 'pec-e1', question: "Cosa garantisce la PEC rispetto a una normale email?", options: ["È più veloce della normale email", "Ha valore legale e certifica invio e ricezione del messaggio", "Può contenere allegati più grandi", "È completamente gratuita per tutti"], correctIndex: 1, explanation: "La PEC certifica con valore legale la data e l'ora di invio e ricezione — equivale a una raccomandata con ricevuta di ritorno." },
    { id: 'pec-e2', question: "Cosa contiene la 'Ricevuta di Consegna' PEC?", options: ["Il contenuto del messaggio inviato", "La conferma che il messaggio è stato letto dal destinatario", "La certificazione che il messaggio è arrivato nella casella del destinatario", "Il costo della trasmissione PEC"], correctIndex: 2, explanation: "La Ricevuta di Consegna certifica che il messaggio è arrivato nella casella PEC del destinatario. Non certifica che sia stato letto — solo consegnato." },
    { id: 'pec-e3', question: "Qual è il provider PEC più diffuso in Italia?", options: ["Gmail PEC", "Aruba PEC", "Libero PEC", "Microsoft PEC"], correctIndex: 1, explanation: "Aruba PEC è il provider più diffuso in Italia, con piani a partire da circa €1/anno. È semplice da usare e ampiamente accettato dalla PA." },
    { id: 'pec-e4', question: "Per inviare una comunicazione formale a un Comune con valore legale, cosa devo usare?", options: ["Gmail o Outlook normali", "WhatsApp Business", "PEC da PEC (mittente PEC → destinatario PEC)", "Una telefonata registrata"], correctIndex: 2, explanation: "Per una comunicazione con pieno valore legale, devi inviare da una casella PEC a un'altra casella PEC. Tutti gli enti pubblici hanno un indirizzo PEC." },
    { id: 'pec-e5', question: "Le ricevute PEC devono essere conservate?", options: ["No, si possono cancellare dopo averle lette", "Sì, sono la prova legale della comunicazione — vanno conservate", "Solo per 30 giorni", "Solo se la PA lo richiede esplicitamente"], correctIndex: 1, explanation: "Le ricevute PEC (accettazione e consegna) sono la tua prova legale. Devono essere conservate per tutto il tempo in cui la comunicazione può avere rilevanza legale." },
    { id: 'pec-e6', question: "Cosa significa 'PEC di accettazione'?", options: ["Il destinatario ha accettato la tua proposta", "Il sistema certifica che il tuo messaggio è uscito dalla tua casella", "Il provider ha accettato di aprire la tua casella PEC", "Il messaggio è stato approvato dalla PA"], correctIndex: 1, explanation: "La Ricevuta di Accettazione certifica che il tuo messaggio è stato preso in carico dal sistema PEC ed è uscito dalla tua casella mittente." },
    { id: 'pec-e7', question: "Quant'è il costo minimo annuo di una casella PEC in Italia?", options: ["Gratuita per sempre", "Circa €1/anno", "Circa €50/anno", "Circa €200/anno"], correctIndex: 1, explanation: "I provider come Aruba offrono caselle PEC da circa €1/anno. È un costo molto contenuto per un servizio con valore legale." }
  ]
};

const emailExam: Exam = {
  moduleId: 'email',
  title: 'Esame — Comunicazione Digitale',
  timeMinutes: 15,
  passingScore: 70,
  questions: [
    { id: 'em-e1', question: "In un'email professionale, cos'è il campo 'Oggetto'?", options: ["Il nome del mittente", "Un breve titolo che descrive il contenuto dell'email", "Il corpo del messaggio", "La firma automatica"], correctIndex: 1, explanation: "L'Oggetto è il titolo dell'email — deve essere chiaro e descrittivo per aiutare il destinatario a capire subito di cosa si tratta." },
    { id: 'em-e2', question: "Cosa significa 'BCC' (Copia nascosta)?", options: ["Bella Copia Confermata", "Invia una copia a qualcuno senza che gli altri destinatari lo sappiano", "Allegato Grande Compresso", "Blocca la risposta automatica"], correctIndex: 1, explanation: "BCC (Blind Carbon Copy / Copia Nascosta) invia una copia del messaggio a un destinatario che gli altri non possono vedere — utile per la privacy." },
    { id: 'em-e3', question: "Qual è la dimensione massima consigliata per un allegato email?", options: ["100 MB", "50 MB", "10 MB", "Non ci sono limiti"], correctIndex: 2, explanation: "La maggior parte dei server email ha un limite di 10-25 MB per gli allegati. Per file più grandi, è meglio usare un link di condivisione cloud (Google Drive, WeTransfer)." },
    { id: 'em-e4', question: "Prima di una videochiamata di lavoro importante, cosa devi fare?", options: ["Non c'è bisogno di prepararsi", "Testare audio e video almeno qualche minuto prima, e sedersi con luce frontale", "Entrare esattamente all'orario previsto", "Disattivare la telecamera"], correctIndex: 1, explanation: "Preparati sempre: testa audio e video, posizionati con la luce frontale (non alle spalle), e entra 2-3 minuti prima per risolvere eventuali problemi tecnici." },
    { id: 'em-e5', question: "Quale strumento è più appropriato per un colloquio di lavoro online?", options: ["WhatsApp Video", "Zoom o Microsoft Teams", "Snapchat", "Telegram Video Call"], correctIndex: 1, explanation: "Zoom e Microsoft Teams sono gli strumenti professionali standard per colloqui e riunioni di lavoro. WhatsApp è più informale e non adatto a contesti professionali." },
    { id: 'em-e6', question: "Come dovresti terminare un'email formale in italiano?", options: ["Ciao!", "Fine.", "Cordiali saluti, [Nome Cognome]", "Buona serata a tutti"], correctIndex: 2, explanation: "'Cordiali saluti,' seguito da nome e cognome è la formula di chiusura standard per le email formali in Italia. Aggiungi sempre la tua firma completa con contatti." },
    { id: 'em-e7', question: "Cosa fare con il microfono durante una videochiamata quando non parli?", options: ["Tenerlo sempre acceso per sembrare presenti", "Spegnerlo (mute) per evitare rumori di fondo", "Abbassare solo il volume", "Non importa"], correctIndex: 1, explanation: "Tenere il microfono in mute quando non parli è fondamentale per la qualità della riunione — i rumori di fondo (traffico, famiglia, tastiera) disturbano tutti i partecipanti." }
  ]
};

const excelExam: Exam = {
  moduleId: 'excel',
  title: 'Esame — Microsoft Excel Base',
  timeMinutes: 20,
  passingScore: 70,
  questions: [
    { id: 'xl-e1', question: "Come si identifica una cella in Excel?", options: ["Con un nome personalizzato", "Con la lettera della colonna + il numero della riga (es. B4)", "Con un numero progressivo da sinistra", "Con il colore della cella"], correctIndex: 1, explanation: "Ogni cella ha un indirizzo unico: lettera della colonna (A, B, C...) + numero della riga (1, 2, 3...). Esempio: B4 = colonna B, riga 4." },
    { id: 'xl-e2', question: "Con quale simbolo inizia sempre una formula in Excel?", options: ["#", "@", "=", "+"], correctIndex: 2, explanation: "Tutte le formule Excel iniziano con = (uguale). Senza il segno uguale, Excel tratta il contenuto come testo normale e non calcola nulla." },
    { id: 'xl-e3', question: "Quale formula calcola la somma delle celle da A1 ad A10?", options: ["=CALCOLA(A1:A10)", "=TOTALE(A1,A10)", "=SOMMA(A1:A10)", "=A1+A2+A3+A4+A5+A6+A7+A8+A9+A10"], correctIndex: 2, explanation: "=SOMMA(A1:A10) somma tutte le celle dal range A1 ad A10. Il simbolo : significa 'da... a...' e definisce un intervallo di celle." },
    { id: 'xl-e4', question: "Cosa calcola la funzione =MEDIA(B2:B12)?", options: ["Il totale dei valori nel range B2:B12", "La media aritmetica dei valori nel range B2:B12", "Il numero di celle nel range B2:B12", "Il valore massimo nel range B2:B12"], correctIndex: 1, explanation: "=MEDIA() calcola la media aritmetica di tutti i valori nel range specificato — equivale a sommare tutti i valori e dividere per il numero di celle." },
    { id: 'xl-e5', question: "Se la cella mostra ##### invece del numero, cosa significa?", options: ["C'è un errore nella formula", "La colonna è troppo stretta per mostrare il valore", "La cella è protetta da modifica", "Il numero è negativo"], correctIndex: 1, explanation: "##### significa che la colonna è troppo stretta per mostrare il valore. Soluzione: fai doppio clic sul bordo della colonna per adattarla automaticamente." },
    { id: 'xl-e6', question: "Qual è il formato migliore per inviare un foglio Excel che NON deve essere modificato?", options: [".xlsx", ".csv", ".pdf", ".txt"], correctIndex: 2, explanation: "Il PDF è il formato ideale per condividere documenti che non devono essere modificati — mantiene la formattazione intatta e si apre su qualsiasi dispositivo." },
    { id: 'xl-e7', question: "Come si moltiplicano due celle in Excel? (es. B2 per C2)", options: ["=B2×C2", "=B2*C2", "=B2xC2", "=MOLTIPLICA(B2,C2)"], correctIndex: 1, explanation: "In Excel, la moltiplicazione usa il simbolo asterisco (*). La formula corretta è =B2*C2. La 'x' non funziona come operatore matematico." },
    { id: 'xl-e8', question: "Cosa fa la funzione =CONTA.NUMERI(A1:A20)?", options: ["Somma tutti i numeri nel range", "Conta quante celle contengono numeri nel range A1:A20", "Mostra il numero di righe", "Calcola la media"], correctIndex: 1, explanation: "=CONTA.NUMERI() conta il numero di celle che contengono valori numerici nel range specificato. Ignora le celle vuote e quelle con testo." },
    { id: 'xl-e9', question: "Come si copia una formula da una cella ad altre celle adiacenti?", options: ["Si riscrive manualmente in ogni cella", "Si copia la cella (Ctrl+C) e si incollano le celle target (Ctrl+V)", "Non è possibile copiare formule", "Si deve usare una macro"], correctIndex: 1, explanation: "Copiare e incollare (Ctrl+C / Ctrl+V) funziona anche per le formule. Excel aggiorna automaticamente i riferimenti di cella quando incolla la formula." },
    { id: 'xl-e10', question: "A cosa serve il 'blocco automatico di riepilogo' (AutoSomma) con il pulsante Σ?", options: ["Blocca le celle dalla modifica", "Inserisce automaticamente una formula SOMMA per le celle selezionate", "Ordina i dati dalla A alla Z", "Crea un grafico automatico"], correctIndex: 1, explanation: "Il pulsante Σ (AutoSomma) inserisce automaticamente la formula =SOMMA per le celle selezionate — uno dei comandi più veloci di Excel." }
  ]
};

const wordExam: Exam = {
  moduleId: 'word',
  title: 'Esame — Microsoft Word',
  timeMinutes: 15,
  passingScore: 70,
  questions: [
    { id: 'wd-e1', question: "Come si chiama la striscia di schede e pulsanti in cima alla finestra di Word?", options: ["Barra di stato", "Barra multifunzione (Ribbon)", "Pannello di navigazione", "Area di testo"], correctIndex: 1, explanation: "La Barra multifunzione (Ribbon) è l'area con tutte le schede (Home, Inserisci, Layout...) e i relativi pulsanti. È la cassetta degli attrezzi principale di Word." },
    { id: 'wd-e2', question: "Qual è la scorciatoia per salvare un documento in Word?", options: ["Ctrl+P", "Ctrl+A", "Ctrl+S", "Ctrl+Z"], correctIndex: 2, explanation: "Ctrl+S (Save) salva il documento. È la scorciatoia più importante da memorizzare — usala ogni 10 minuti." },
    { id: 'wd-e3', question: "Quale scorciatoia applica il grassetto al testo selezionato?", options: ["Ctrl+I", "Ctrl+U", "Ctrl+G", "Ctrl+B"], correctIndex: 3, explanation: "Ctrl+B (Bold = Grassetto in inglese) applica il grassetto al testo selezionato. B sta per Bold, I per Italic (corsivo), U per Underline (sottolineato)." },
    { id: 'wd-e4', question: "Qual è lo stile Word corretto per il titolo principale di un documento?", options: ["Normale", "Titolo 1", "Titolo 3", "Citazione intensa"], correctIndex: 1, explanation: "Titolo 1 è lo stile per i titoli principali di primo livello. Usare gli Stili (invece della formattazione manuale) garantisce uniformità e permette di creare sommari automatici." },
    { id: 'wd-e5', question: "Come si esporta un documento Word in formato PDF?", options: ["Ctrl+P → stampa su carta e scansiona", "File → Esporta → Crea documento PDF/XPS → Pubblica", "Rinomina il file cambiando l'estensione da .docx a .pdf", "Non è possibile creare PDF da Word"], correctIndex: 1, explanation: "File → Esporta → Crea PDF/XPS è il metodo corretto. Produce un PDF vero (non un'immagine scansionata) con tutti i font e la formattazione preservati." },
    { id: 'wd-e6', question: "In quale ordine va presentata l'esperienza lavorativa in un CV professionale?", options: ["Dal lavoro più vecchio al più recente", "In ordine alfabetico per nome azienda", "Dal lavoro più recente al più vecchio", "Per importanza decrescente"], correctIndex: 2, explanation: "L'ordine cronologico inverso (dal più recente al più vecchio) è lo standard internazionale per i CV. Il selezionatore vuole vedere subito l'esperienza più recente." },
    { id: 'wd-e7', question: "Qual è il formato corretto per inviare un CV a un potenziale datore di lavoro?", options: [".docx", ".txt", ".pdf", ".rtf"], correctIndex: 2, explanation: "Il CV va inviato sempre in PDF: preserva la formattazione su qualsiasi dispositivo e trasmette professionalità. Un .docx può mostrare il layout in modo diverso su versioni diverse di Word." },
    { id: 'wd-e8', question: "Ctrl+Z in Word serve a:", options: ["Salvare il documento", "Chiudere il programma", "Annullare l'ultima azione", "Aprire un nuovo documento"], correctIndex: 2, explanation: "Ctrl+Z (Undo = Annulla) annulla l'ultima azione eseguita. Puoi premere più volte per annullare le ultime N azioni. Ctrl+Y (Redo) ripristina l'azione annullata." }
  ]
};

const portaliPaExam: Exam = {
  moduleId: 'portali-pa',
  title: 'Esame — Portali della Pubblica Amministrazione',
  timeMinutes: 15,
  passingScore: 70,
  questions: [
    { id: 'pa-e1', question: "Su quale portale PA puoi visualizzare i contributi previdenziali versati e simulare la pensione?", options: ["AgenziaEntrate.gov.it", "INAIL.it", "INPS.it", "PagoPA.gov.it"], correctIndex: 2, explanation: "INPS.it è il portale dell'Istituto Nazionale di Previdenza Sociale. Nell'area riservata trovi l'estratto conto previdenziale e il simulatore 'La Mia Pensione Future'." },
    { id: 'pa-e2', question: "Quale metodo di autenticazione è richiesto per accedere ai principali portali PA italiani?", options: ["Username e password qualsiasi", "Solo la carta d'identità fisica", "SPID o CIE con verifica in due passaggi", "Il codice fiscale"], correctIndex: 2, explanation: "SPID e CIE usano l'autenticazione a due fattori (password + OTP). Questo garantisce che solo tu possa accedere ai tuoi dati." },
    { id: 'pa-e3', question: "Qual è il tempo massimo per presentare domanda NASpI (disoccupazione) dopo aver perso il lavoro?", options: ["7 giorni", "30 giorni", "68 giorni", "6 mesi"], correctIndex: 2, explanation: "La domanda NASpI va presentata entro 68 giorni dalla cessazione del rapporto di lavoro. Puoi farla direttamente su INPS.it con SPID." },
    { id: 'pa-e4', question: "Cosa gestisce il CUP (Centro Unico Prenotazione)?", options: ["I pagamenti delle tasse comunali", "Le prenotazioni delle visite mediche specialistiche SSN", "L'accesso al 730 precompilato", "La richiesta del passaporto"], correctIndex: 1, explanation: "Il CUP gestisce le prenotazioni delle visite specialistiche del Servizio Sanitario Nazionale. È accessibile online con SPID o tessera sanitaria." },
    { id: 'pa-e5', question: "Cos'è il codice IUV in un avviso di pagamento PagoPA?", options: ["Il codice fiscale del destinatario", "Il codice identificativo univoco del versamento — necessario per pagare online", "Il numero di protocollo della pratica amministrativa", "Il codice IBAN dell'ente creditore"], correctIndex: 1, explanation: "Il codice IUV (Identificativo Univoco di Versamento) identifica in modo univoco ogni pagamento. Lo trovi sull'avviso e lo usi per pagare su PagoPA o tramite l'app IO." },
    { id: 'pa-e6', question: "Hai trovato un errore nel tuo estratto conto INPS: mancano 2 anni di contributi. Cosa fai?", options: ["Aspetto: INPS aggiornerà automaticamente entro 2 anni", "Clicco 'Segnala un'anomalia' nell'estratto conto INPS e allego la documentazione", "Vado obbligatoriamente allo sportello INPS fisico", "Chiamo il vecchio datore di lavoro e gli chiedo di sistemare"], correctIndex: 1, explanation: "La funzione 'Segnala un'anomalia' è direttamente nell'estratto conto INPS online. Puoi allegare documenti (contratto, buste paga) e seguire lo stato della pratica senza andare allo sportello." },
    { id: 'pa-e7', question: "L'app IO serve principalmente a:", options: ["Fare videochiamate con gli uffici PA", "Centralizzare messaggi, pagamenti PagoPA e documenti da tutta la PA italiana", "Prenotare appuntamenti allo sportello", "Scaricare il modello 730"], correctIndex: 1, explanation: "L'app IO è il punto di accesso unificato ai servizi della PA italiana: raccoglie avvisi PagoPA, messaggi dagli enti, bonus e documenti in un'unica applicazione." }
  ]
};

const examsMap: Record<string, Exam> = {
  spid: spidExam,
  pec: pecExam,
  email: emailExam,
  word: wordExam,
  excel: excelExam,
  'portali-pa': portaliPaExam,
};

export function getExamForModule(moduleId: string): Exam | null {
  return examsMap[moduleId] || null;
}
