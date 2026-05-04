import { Lesson } from './lessons';

// ─── M01 — SPID & CIE (English) ──────────────────────────────────────────────

const spidLesson1: Lesson = {
  id: 'spid-1', moduleId: 'spid', number: 1,
  title: 'What is SPID and why you need it',
  duration: '15 min', xp: 50,
  screens: [
    {
      type: 'intro',
      title: 'What is SPID and why you need it',
      content: "In this lesson you will discover what SPID is, why it has become essential in Italy and which services it lets you access. By the end you will be able to explain it to someone else!",
      tip: 'Duration: 15 minutes · You can pause at any time'
    },
    {
      type: 'learn',
      title: 'SPID: your digital identity card',
      content: "SPID (Sistema Pubblico di Identità Digitale) is an access system created by the Italian Government. With a single username and password you can access hundreds of public services online: INPS (social security), the Revenue Agency, your local council, schools, healthcare and much more.",
      analogy: "Think of SPID as a master key: instead of having a different key for every public office (and having to go there in person every time), you have ONE digital key that opens all the doors — from your sofa at home.",
      tip: 'SPID is free. There is no fee or subscription to obtain it.'
    },
    {
      type: 'learn',
      title: 'What you can do with SPID',
      content: "With SPID you can: · Check your INPS pension without queuing · Download your pre-filled tax return · Book medical appointments · Enrol children in school online · Apply for INPS bonuses · Access your local council's services · Sign digital documents with legal validity.",
      tip: 'Over 1,200 Italian public services accept SPID. The list grows every month.'
    },
    {
      type: 'quiz',
      title: 'Check what you have learned',
      question: 'What is the main purpose of SPID?',
      options: [
        { text: 'It is the Italian Government social network', correct: false },
        { text: 'It is a system to access public services online with a single account', correct: true },
        { text: 'It is an app for paying taxes', correct: false },
        { text: 'It is a physical document like an ID card', correct: false }
      ],
      explanation: "Correct! SPID is a digital identity system that lets you access all Italian Public Administration services with one account, without having to visit an office."
    },
    {
      type: 'quiz',
      title: 'Another question',
      question: 'Is SPID free of charge?',
      options: [
        { text: 'Yes, it costs about €20 per year', correct: false },
        { text: 'It depends on the provider — some free, some paid', correct: false },
        { text: 'No, SPID is completely free', correct: true },
        { text: 'Only for pensioners is it free', correct: false }
      ],
      explanation: 'SPID is always free. Some providers offer extra paid services, but the basic SPID identity costs nothing.'
    },
    {
      type: 'summary',
      title: 'Great work! 🎉',
      content: "You have completed the first lesson on SPID. You now know that: · SPID is your Italian digital identity · It is free and saves you queuing at public offices · It opens access to over 1,200 public services\n\nIn the next lesson you will learn how to apply for your SPID step by step.",
    }
  ]
};

const spidLesson2: Lesson = {
  id: 'spid-2', moduleId: 'spid', number: 2,
  title: 'How to apply for SPID',
  duration: '20 min', xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'How to apply for SPID — step by step',
      content: "In this lesson you will learn exactly how to apply for your SPID: what you need, where to go, and how to choose the easiest method for you.",
    },
    {
      type: 'learn',
      title: 'What you need before you start',
      content: "To apply for SPID you need: · A valid identity document (ID card or passport) · Your tessera sanitaria (health card) with tax code · An email address you use regularly · An active mobile phone number · An internet connection",
      tip: 'Keep these documents handy before you start: you will need the numbers printed on them.'
    },
    {
      type: 'learn',
      title: 'Choosing your SPID provider',
      content: "You must choose an 'Identity Provider' (who verifies your identity). The main ones are: · PosteID (Poste Italiane) — verification at the post office, the simplest option · Aruba — webcam or in-person verification · TIM — webcam verification · InfoCert · Intesa (banking) · Register.it",
      analogy: "The provider is like choosing which office to go to for your document. They all give you the same SPID — the only difference is how they verify who you are.",
      tip: 'If you already have a PosteID account or are a Poste Italiane customer, choose PosteID — it is the fastest.'
    },
    {
      type: 'practice',
      title: 'Scenario: which provider do you choose?',
      scenario: "Maria, 58, is not very tech-savvy. She lives near a post office and prefers doing things in person rather than via webcam. Which SPID provider is most suitable for her?",
      task: 'Choose the best provider for Maria:',
      choices: [
        { text: 'Aruba — webcam verification from home', correct: false, feedback: 'Maria prefers doing things in person — webcam may make her uncomfortable. Not the ideal choice for her.' },
        { text: 'PosteID — in-person verification at the nearby post office', correct: true, feedback: "Perfect! PosteID with in-person verification is ideal for people who prefer face-to-face assistance. Maria brings her documents to the post office and has SPID in 10 minutes." },
        { text: 'InfoCert — advanced digital verification only', correct: false, feedback: 'InfoCert requires more complex digital procedures, not suitable for beginners.' }
      ]
    },
    {
      type: 'quiz',
      title: 'Check what you have learned',
      question: 'Which document is NOT required to apply for SPID?',
      options: [
        { text: 'ID card or passport', correct: false },
        { text: 'Health card (tessera sanitaria)', correct: false },
        { text: 'Employment record book', correct: true },
        { text: 'Active mobile phone number', correct: false }
      ],
      explanation: 'The employment record book is not needed! For SPID you only need: an identity document, health card, email and a mobile number.'
    },
    {
      type: 'summary',
      title: 'Lesson complete! 🎉',
      content: "You now know exactly what to do to get your SPID: · Prepare your ID card, health card, email and phone · Go to spid.gov.it and choose a provider · Complete the identity verification (in person or via webcam)\n\nIn the next lesson you will learn to use SPID to access services.",
    }
  ]
};

const spidLesson3: Lesson = {
  id: 'spid-3', moduleId: 'spid', number: 3,
  title: 'Using SPID — accessing public services',
  duration: '15 min', xp: 100,
  screens: [
    {
      type: 'intro',
      title: 'Using SPID to access services',
      content: "You have SPID — now learn how to use it! In this lesson you will learn to log in with SPID on public portals like INPS, and how to handle the most common errors.",
    },
    {
      type: 'learn',
      title: 'How to log in with SPID — step by step',
      content: "1. Go to the service website (e.g. inps.it)\n2. Click 'Accedi' or 'Entra con SPID'\n3. Choose your provider (e.g. PosteID)\n4. Enter your SPID username and password\n5. Open your provider's app on your phone\n6. Approve the login notification\n7. You are in!",
      tip: "The phone notification step is called 'two-factor authentication' — it is a normal security measure. Your phone must be nearby when you log in."
    },
    {
      type: 'practice',
      title: 'Scenario: logging into INPS with SPID',
      scenario: "You want to check your INPS contribution record online, without going to the office. You already have an active SPID. What is the correct sequence of actions?",
      task: 'Select the steps in the correct order:',
      choices: [
        { text: 'Go to inps.it → click "Entra con SPID" → choose provider → enter credentials → approve on phone', correct: true, feedback: 'Correct! This is exactly the right sequence. In under 2 minutes you are in your INPS personal area without having queued.' },
        { text: 'Install an INPS app → create a new INPS account → log in', correct: false, feedback: 'You do not need to create a separate INPS account. With SPID you go straight in — that is the whole point!' },
        { text: 'Call the INPS freephone number and ask for login credentials', correct: false, feedback: 'No need to call. With SPID the login is completely self-service, 24 hours a day, even on Sundays.' }
      ]
    },
    {
      type: 'quiz',
      title: 'Check what you have learned',
      question: "What must you do after entering your SPID credentials on a website?",
      options: [
        { text: 'Wait up to 24 hours for email confirmation', correct: false },
        { text: 'Approve the login notification in your provider app on your phone', correct: true },
        { text: 'Print a form and bring it to the office', correct: false },
        { text: 'Nothing — the system logs you in automatically', correct: false }
      ],
      explanation: "After entering your credentials you must approve the login request in your SPID provider app (e.g. PosteID) on your phone. This is two-factor authentication and it protects your security."
    },
    {
      type: 'summary',
      title: 'Module almost complete! 🏅',
      content: "Excellent! You can now use SPID like a pro: · Log in with SPID on any public portal · Approve access from your phone · Access INPS, Revenue Agency and thousands of services from home\n\nYou have earned all the XP for the SPID module. Go to Certifications to take the exam!",
    }
  ]
};

// ─── M02 — PEC (English) ─────────────────────────────────────────────────────

const pecLesson1: Lesson = {
  id: 'pec-1', moduleId: 'pec', number: 1,
  title: 'What is PEC and how it differs from regular email',
  duration: '15 min', xp: 60,
  screens: [
    {
      type: 'intro',
      title: 'What is PEC — Certified Electronic Mail',
      content: "PEC (Posta Elettronica Certificata) is Italy's official certified email system. In this lesson you will discover why it is legally equivalent to a registered letter, and when you must use it.",
    },
    {
      type: 'learn',
      title: 'PEC vs regular email',
      content: "Regular email: informal, no legal proof of sending or receipt, may be ignored by public authorities.\n\nPEC: legally certified, provides proof of sending AND receipt, accepted by all Italian public administrations, has the same legal value as a registered letter with return receipt.",
      analogy: "Think of PEC as the digital equivalent of a registered letter (raccomandata con ricevuta di ritorno). You receive an official receipt proving when the email was sent and when it was received — this receipt has full legal value in court.",
      tip: 'Any communication sent via PEC to a public body is legally valid. They cannot claim they never received it.'
    },
    {
      type: 'quiz',
      title: 'Check what you have learned',
      question: 'What makes PEC different from a normal email?',
      options: [
        { text: 'PEC is faster than normal email', correct: false },
        { text: 'PEC has legal value and provides certified proof of sending and receipt', correct: true },
        { text: 'PEC can only be used to email the government', correct: false },
        { text: 'PEC emails cannot contain attachments', correct: false }
      ],
      explanation: 'The key difference is legal value. PEC provides a certified receipt confirming when the message was sent and received, equivalent to a registered letter.'
    },
    {
      type: 'learn',
      title: 'When do you need PEC?',
      content: "You need PEC when: · Communicating formally with public administrations · Sending legal or administrative documents · Applying for jobs in the public sector · Managing business or freelance activities · Responding to official notices · Any time you need legal proof of delivery",
      tip: 'In Italy, all businesses and professionals are legally required to have a PEC address. Private citizens are strongly encouraged to get one too.'
    },
    {
      type: 'summary',
      title: 'Lesson complete! 🎉',
      content: "You now know: · PEC is certified email with full legal value · It is Italy's equivalent of a registered letter · It is essential for communicating with public bodies\n\nIn the next lesson you will learn how to send and receive PEC messages.",
    }
  ]
};

const pecLesson2: Lesson = {
  id: 'pec-2', moduleId: 'pec', number: 2,
  title: 'Sending and receiving PEC messages',
  duration: '20 min', xp: 90,
  screens: [
    {
      type: 'intro',
      title: 'How to use your PEC inbox',
      content: "In this lesson you will learn how to obtain a PEC address, how to compose and send a certified message, and how to read the receipts you receive back.",
    },
    {
      type: 'learn',
      title: 'How to get a PEC address',
      content: "The most popular PEC providers in Italy: · Aruba PEC — most widely used, from €1/year · Legalmail (InfoCert) · PEC.it · Tim PEC · Register.it PEC\n\nThe address will look like: yourname@pec.it or yourname@arubapec.it",
      tip: 'Aruba PEC is the most popular choice — it has a simple interface and affordable plans.'
    },
    {
      type: 'learn',
      title: 'How to send a PEC message',
      content: "Sending a PEC is identical to sending a normal email, but: · You must send FROM a PEC address · You should ideally send TO a PEC address · You will receive two automatic receipts:\n  1. Ricevuta di Accettazione — confirms your message left your inbox\n  2. Ricevuta di Consegna — confirms the message was delivered to the recipient's inbox",
      analogy: "Imagine posting a letter at the post office and getting a receipt (accettazione), then a few moments later the postman rings your bell to confirm delivery (consegna). PEC does this automatically via email.",
      tip: 'Save both receipts! They are your legal proof. Never delete them.'
    },
    {
      type: 'practice',
      title: 'Scenario: sending a formal request',
      scenario: "You need to send a formal request to your local council (Comune) asking for a document. You have a PEC address. What is the best way to send this request?",
      task: 'Choose the correct approach:',
      choices: [
        { text: 'Send from your normal Gmail to the council\'s PEC address', correct: false, feedback: 'Sending from a normal email to a PEC does not generate legal receipts. The council may not recognise it as an official communication.' },
        { text: 'Send from your PEC address to the council\'s PEC address', correct: true, feedback: 'Correct! PEC-to-PEC is the gold standard — you will receive both receipts and have full legal proof of delivery.' },
        { text: 'Bring the request in person — PEC is only for businesses', correct: false, feedback: 'PEC is for everyone! Private citizens can and should use it for official requests. It saves time and creates legal proof.' }
      ]
    },
    {
      type: 'quiz',
      title: 'Check what you have learned',
      question: 'What does the "Ricevuta di Consegna" confirm?',
      options: [
        { text: 'That you wrote the message correctly', correct: false },
        { text: 'That your message was delivered to the recipient\'s PEC inbox', correct: true },
        { text: 'That the recipient has read the message', correct: false },
        { text: 'That your PEC subscription is active', correct: false }
      ],
      explanation: "The Ricevuta di Consegna confirms that your message arrived in the recipient's PEC inbox. Note: it does NOT confirm they have READ it — only that it was delivered."
    },
    {
      type: 'summary',
      title: 'PEC module complete! 🏅',
      content: "Excellent! You now master PEC: · You know how to get a PEC address · You can send certified messages · You understand what the receipts mean\n\nHead to Certifications to take the PEC exam and earn your badge!",
    }
  ]
};

// ─── M03 — Email & Video (English) ───────────────────────────────────────────

const emailLesson1: Lesson = {
  id: 'email-1', moduleId: 'email', number: 1,
  title: 'Email basics — reading and writing',
  duration: '20 min', xp: 60,
  screens: [
    {
      type: 'intro',
      title: 'Email: your digital letter box',
      content: "Email is the most used digital communication tool in the world. In this lesson you will learn how to read, write and manage emails professionally — skills that are essential for work.",
    },
    {
      type: 'learn',
      title: 'The anatomy of an email',
      content: "Every email has these parts:\n· To (A): the recipient's email address\n· CC (Copia Conoscenza): extra recipients who receive a copy\n· BCC (Copia Nascosta): hidden recipients\n· Subject (Oggetto): a brief summary of the content\n· Body: the actual message\n· Attachments: files you include",
      analogy: "Think of an email like a letter in an envelope: the TO field is the address on the envelope, the SUBJECT is written on the outside so the recipient knows what is inside, and the BODY is the letter itself.",
      tip: 'Always write a clear Subject. Emails without a subject are often ignored or end up in spam.'
    },
    {
      type: 'learn',
      title: 'Writing a professional email',
      content: "Structure of a good professional email:\n1. Greeting: 'Gentile Dott. Rossi,' / 'Dear Mr Rossi,'\n2. Introduction: who you are and why you are writing\n3. Body: clear and concise explanation\n4. Request: what you need\n5. Closing: 'Cordiali saluti,' / 'Kind regards,'\n6. Signature: your name, role and contact details",
      tip: "Keep it short. If you cannot summarise it in 5 sentences, write a document and attach it instead."
    },
    {
      type: 'practice',
      title: 'Scenario: urgent work email',
      scenario: "You are applying for a job. The HR manager asked you to send your CV by email to lavoro@azienda.it. You need to write a brief cover email to accompany the CV.",
      task: 'Which email structure is most appropriate?',
      choices: [
        { text: 'Subject: "cv" — Body: "Hi, I am sending you my CV. Ciao"', correct: false, feedback: 'Too informal! "cv" as a subject is vague, no greeting, and "Ciao" is not appropriate for a job application. First impressions matter enormously.' },
        { text: 'Subject: "Application for [role] — [Your Name]" — Body: formal greeting, brief intro, CV attached, Kind regards + full signature', correct: true, feedback: 'Perfect! A clear subject, professional tone and a complete signature show you are organised and serious. This is the standard format for job applications.' },
        { text: 'Write nothing — just attach the CV without any body text', correct: false, feedback: 'Sending a CV without an explanatory email is like handing over documents without introducing yourself. Always add a cover message.' }
      ]
    },
    {
      type: 'quiz',
      title: 'Check what you have learned',
      question: 'What is the BCC (Copia Nascosta / Hidden Copy) field used for?',
      options: [
        { text: 'To mark an email as urgent', correct: false },
        { text: 'To send a copy to someone without other recipients knowing', correct: true },
        { text: 'To attach files to the email', correct: false },
        { text: 'To encrypt the message', correct: false }
      ],
      explanation: 'BCC lets you send a copy to someone without other recipients seeing their address. Useful for privacy, for example when sending a newsletter to multiple contacts.'
    },
    {
      type: 'summary',
      title: 'Lesson complete! 🎉',
      content: "You now know how to: · Understand all parts of an email · Write a professional and well-structured email · Choose the right tone for the context\n\nIn the next lesson you will discover video calls — Zoom, Teams and WhatsApp Video.",
    }
  ]
};

const emailLesson2: Lesson = {
  id: 'email-2', moduleId: 'email', number: 2,
  title: 'Video calls — Zoom, Teams, WhatsApp',
  duration: '20 min', xp: 90,
  screens: [
    {
      type: 'intro',
      title: 'Video calls: working and connecting remotely',
      content: "Video calls have become an essential skill for work, healthcare appointments (telemedicina), and staying in touch with family. In this lesson you will learn to use the three most popular tools: Zoom, Teams and WhatsApp.",
    },
    {
      type: 'learn',
      title: 'Zoom, Teams, WhatsApp — when to use which',
      content: "· Zoom — most used for professional meetings, webinars, online training. Free up to 40 minutes.\n· Microsoft Teams — used in companies and schools, integrates with documents and calendar.\n· WhatsApp Video — ideal for quick calls with family and friends, informal, no account needed beyond WhatsApp.",
      analogy: "Think of it like transport: WhatsApp Video is your bicycle — quick and easy for short trips. Zoom is your car — good for longer journeys. Teams is your company van — full of tools but needs setting up.",
      tip: "For a job interview or formal meeting, always use Zoom or Teams — not WhatsApp. Professionalism matters."
    },
    {
      type: 'learn',
      title: 'Before your first video call: checklist',
      content: "· 📷 Camera — check it works and is clean\n· 🎤 Microphone — test it beforehand\n· 💡 Lighting — sit facing a window or a lamp (not with your back to the light)\n· 🔇 Background — tidy or use a virtual background\n· 🔋 Battery charged or cable plugged in\n· 🌐 Internet connection — wired or close to router is better\n· 👔 Dress appropriately — at least on the upper half!",
      tip: "Enter the call 2-3 minutes early to fix any technical issues before it matters."
    },
    {
      type: 'practice',
      title: 'Scenario: first Zoom meeting',
      scenario: "Your employer has scheduled a video interview on Zoom tomorrow at 10:00. You have never used Zoom before. What should you do before the meeting?",
      task: 'Choose the best preparation:',
      choices: [
        { text: 'Download Zoom 5 minutes before the meeting starts', correct: false, feedback: "There might be updates, registration or technical problems. Never leave tech setup to the last minute, especially for something important like a job interview." },
        { text: 'Download Zoom today, create a free account, test your camera and microphone, and try a test call with a friend or family member', correct: true, feedback: "Perfect! Preparing the day before gives you time to sort out any problems. Testing with a friend ensures you know exactly what to do when it matters." },
        { text: "Ask your employer to switch to WhatsApp because it's easier", correct: false, feedback: "Asking to change the tool for your own convenience gives a bad impression. Adapting to the employer's preferred platform shows professionalism." }
      ]
    },
    {
      type: 'quiz',
      title: 'Check what you have learned',
      question: 'Which is the best position for lighting during a video call?',
      options: [
        { text: "With your back to a window so the background looks bright", correct: false },
        { text: "Facing a window or light source so your face is well lit", correct: true },
        { text: "In complete darkness with the screen as the only light", correct: false },
        { text: "Lighting makes no difference in a video call", correct: false }
      ],
      explanation: "Always face the light. If the light is behind you, your camera will compensate and make your face dark. Facing the window or a lamp means your face is clearly lit and you look professional."
    },
    {
      type: 'summary',
      title: 'Module complete! 🏅',
      content: "Excellent! You are now ready for professional digital communication: · You can write effective emails · You know how to prepare for and run a video call · You know which tool to use for which situation\n\nGo to Certifications to earn your Digital Communication Certificate!",
    }
  ]
};

// ─── M04 — Excel (English) ────────────────────────────────────────────────────

const excelLesson1: Lesson = {
  id: 'excel-1', moduleId: 'excel', number: 1,
  title: 'What is a spreadsheet',
  duration: '15 min', xp: 40,
  screens: [
    {
      type: 'intro',
      title: 'Excel: your digital graph paper',
      content: "A spreadsheet is one of the most powerful tools in the world of work. In this lesson you will discover what it is, what it is used for, and why knowing it opens up many job opportunities.",
    },
    {
      type: 'learn',
      title: 'What is a spreadsheet and what is it for',
      content: "A spreadsheet is a file made up of cells arranged in rows and columns. It is used for: · Managing budgets and expenses · Maintaining customer or product lists · Calculating salaries and invoices · Creating charts and reports · Tracking inventory · Any situation where you need to organise numbers or data.",
      analogy: "Think of a spreadsheet as very smart graph paper: like a physical table where you can write numbers, but it can add them up automatically, sort them, create charts and much more.",
      tip: 'The most used spreadsheet software: Microsoft Excel (paid), Google Sheets (free), LibreOffice Calc (free).'
    },
    {
      type: 'learn',
      title: 'Understanding the interface',
      content: "Key elements of a spreadsheet:\n· Cell: the basic unit, identified by a letter (column) + number (row). E.g. A1, B3, C10\n· Row: horizontal, numbered 1, 2, 3...\n· Column: vertical, lettered A, B, C...\n· Sheet: the individual tab (you can have multiple per file)\n· Formula bar: where you type formulas\n· Ribbon/menu: tools at the top",
      tip: "Cell A1 is always top-left. Think of it like a map: column (letter) first, then row (number)."
    },
    {
      type: 'quiz',
      title: 'Check what you have learned',
      question: 'How do you identify a cell in a spreadsheet?',
      options: [
        { text: 'By its colour', correct: false },
        { text: 'By a letter (column) + number (row), e.g. B4', correct: true },
        { text: 'By its position from the bottom-right', correct: false },
        { text: 'Cells have no names — you find them by clicking', correct: false }
      ],
      explanation: 'Each cell has a unique name formed by the column letter and the row number. B4 = column B, row 4. This is essential for formulas.'
    },
    {
      type: 'summary',
      title: 'Lesson complete! 🎉',
      content: "You now know: · What a spreadsheet is and what it is used for · How cells, rows and columns are organised · How to identify a cell (e.g. A1, B4)\n\nIn the next lesson you will start entering real data and writing your first formulas.",
    }
  ]
};

const excelLesson2: Lesson = {
  id: 'excel-2', moduleId: 'excel', number: 2,
  title: 'Data entry and basic formulas',
  duration: '20 min', xp: 60,
  screens: [
    {
      type: 'intro',
      title: 'Your first data and formulas',
      content: "In this lesson you will learn to enter data into cells and write your first formula. The formula is the magic of the spreadsheet: it calculates automatically!",
    },
    {
      type: 'learn',
      title: 'Entering data',
      content: "Click on a cell and start typing. Three types of data:\n· Numbers: 42, 1500, 3.14 (use a dot or comma for decimals depending on your settings)\n· Text: product names, names, descriptions\n· Dates: 01/05/2024\n\nTo confirm what you typed: press Enter (go down) or Tab (go right)\nTo correct: click the cell and retype, or press F2 to edit.",
      tip: 'If a number appears as ##### it means the column is too narrow. Double-click the column border to auto-fit the width.'
    },
    {
      type: 'learn',
      title: 'Your first formula: addition',
      content: "All formulas start with = (equals sign). Example:\n· =A1+A2 adds the value in A1 to the value in A2\n· =B3-B4 subtracts\n· =C1*C2 multiplies\n· =D1/D2 divides\n\nPress Enter to confirm the formula. The cell will show the result, but the formula bar always shows the formula.",
      analogy: "The = sign tells Excel: 'Do not show this as text — calculate it for me!' Without =, Excel treats everything as plain text.",
      tip: 'If you change the values in A1 or A2, the result updates automatically. This is the real power of spreadsheets!'
    },
    {
      type: 'practice',
      title: 'Scenario: monthly expense table',
      scenario: "You have created a simple table with monthly expenses: Rent (A2=800), Bills (A3=120), Food (A4=350). You want the total in cell A5.",
      task: 'Which formula should you type in A5?',
      choices: [
        { text: '800+120+350', correct: false, feedback: "This would just show as text, not calculate anything! Always start a formula with = so Excel knows it needs to calculate." },
        { text: '=A2+A3+A4', correct: true, feedback: "Correct! =A2+A3+A4 adds the three cells. The big advantage: if you change one of the values (e.g. the rent goes up), the total updates automatically." },
        { text: '=1270', correct: false, feedback: "Writing the number directly works but loses all the advantages of a formula. If rent changes you would have to recalculate manually. Always reference cells, not numbers." }
      ]
    },
    {
      type: 'quiz',
      title: 'Check what you have learned',
      question: 'What must every Excel formula begin with?',
      options: [
        { text: 'The # symbol', correct: false },
        { text: 'The = symbol', correct: true },
        { text: 'The letter F (from Formula)', correct: false },
        { text: 'A space', correct: false }
      ],
      explanation: 'Every formula must start with = (equals). This tells Excel to calculate the expression rather than displaying it as text.'
    },
    {
      type: 'summary',
      title: 'Lesson complete! 🎉',
      content: "You can now: · Enter numbers, text and dates · Write basic formulas with +, -, *, / · Understand how auto-calculation works\n\nIn the next lesson you will learn the three most important functions: SUM, AVERAGE and COUNT.",
    }
  ]
};

const excelLesson3: Lesson = {
  id: 'excel-3', moduleId: 'excel', number: 3,
  title: 'SUM, AVERAGE and COUNT',
  duration: '20 min', xp: 70,
  screens: [
    {
      type: 'intro',
      title: 'The three most important Excel functions',
      content: "Functions are ready-made formulas built into Excel. In this lesson you will learn the three most used: SUM (add a range), AVERAGE (calculate the mean), COUNT (count how many cells have numbers).",
    },
    {
      type: 'learn',
      title: 'SUM — add a range of cells',
      content: "=SUM(A1:A10) adds all values from A1 to A10.\n\nSyntax: =SUM(start:end)\nExamples:\n· =SUM(B2:B12) — monthly totals\n· =SUM(C3:C7) — adds 5 cells\n\nThe colon (:) means 'from... to...' — it is the range operator.",
      analogy: "SUM is like a super-fast cashier: instead of you adding up 100 numbers, you just tell it the range and it gives you the total in a millisecond.",
      tip: 'You can also use AutoSum: select the cells, then click the Σ (sigma) button in the toolbar — Excel writes the SUM formula for you.'
    },
    {
      type: 'learn',
      title: 'AVERAGE and COUNT',
      content: "=AVERAGE(A1:A10) — calculates the arithmetic mean of all values in the range.\n\n=COUNT(A1:A10) — counts how many cells in the range contain numbers (ignores empty cells and text).\n\nExample:\nYou have exam scores in B2:B8:\n· =SUM(B2:B8) → total of all scores\n· =AVERAGE(B2:B8) → class average\n· =COUNT(B2:B8) → how many students sat the exam",
      tip: '=COUNTA counts all non-empty cells (including text). Useful for counting names in a list.'
    },
    {
      type: 'quiz',
      title: 'Check what you have learned',
      question: 'Which formula correctly calculates the average of cells from C1 to C20?',
      options: [
        { text: '=SUM(C1:C20)', correct: false },
        { text: '=AVERAGE(C1:C20)', correct: true },
        { text: '=MEAN(C1:C20)', correct: false },
        { text: '=C1+C2+...+C20/20', correct: false }
      ],
      explanation: '=AVERAGE(C1:C20) is the correct formula. MEAN does not exist in Excel. The manual formula would work but is impractical for long ranges.'
    },
    {
      type: 'practice',
      title: 'Scenario: sales report',
      scenario: "You have a table with 12 months of sales in cells B2:B13. Your manager asks: 1) What are the total annual sales? 2) What is the monthly average? 3) How many months are recorded?",
      task: 'Which three formulas answer the three questions?',
      choices: [
        { text: '1)=SUM(B2:B13)  2)=AVERAGE(B2:B13)  3)=COUNT(B2:B13)', correct: true, feedback: 'Perfect! These three functions are the foundation of any data analysis in Excel. You will use them in almost every spreadsheet.' },
        { text: '1)=TOTAL(B2:B13)  2)=MEDIA(B2:B13)  3)=NUMBER(B2:B13)', correct: false, feedback: 'TOTAL, MEDIA and NUMBER do not exist in English Excel. The correct functions are SUM, AVERAGE and COUNT.' },
        { text: '1)=B2+B3+...+B13  2)=SUM(B2:B13)/12  3)=12', correct: false, feedback: "It would work but is very inefficient. Functions like SUM, AVERAGE and COUNT are much faster and update automatically if you add more data." }
      ]
    },
    {
      type: 'summary',
      title: 'Lesson complete! 🎉',
      content: "You can now use: · =SUM to total a range · =AVERAGE to find the mean · =COUNT to count values\n\nIn the last lesson you will learn to format your spreadsheet professionally and prepare it for printing.",
    }
  ]
};

const excelLesson4: Lesson = {
  id: 'excel-4', moduleId: 'excel', number: 4,
  title: 'Formatting and printing',
  duration: '20 min', xp: 80,
  screens: [
    {
      type: 'intro',
      title: 'Making your spreadsheet professional',
      content: "A spreadsheet is not only about calculations — it must also be readable and professional. In this last lesson you will learn to format cells, apply colours, and prepare the file for printing or sending.",
    },
    {
      type: 'learn',
      title: 'Basic formatting',
      content: "Essential formatting options:\n· Bold (Ctrl+B): for headings and totals\n· Italic (Ctrl+I): for notes\n· Underline (Ctrl+U): for emphasis\n· Cell colour: highlight important rows\n· Text colour: distinguish categories\n· Number format: €1,234.56 instead of 1234.56\n· Alignment: centre headings, align numbers to the right",
      tip: 'Select multiple cells with Ctrl+Click, then apply formatting to all at once. Huge time saver!'
    },
    {
      type: 'learn',
      title: 'Saving and sharing',
      content: "Save formats:\n· .xlsx — standard Excel format, compatible with all versions\n· .pdf — for sharing or printing (File → Export → PDF)\n· .csv — for importing into other programmes\n\nSharing:\n· Send the .xlsx by email to let the recipient edit it\n· Send a PDF if you only want them to view (not edit)\n· Use OneDrive/Google Drive for collaborative editing",
      analogy: "Saving as PDF is like printing on paper — it cannot be changed. Saving as .xlsx is like giving someone your original notebook — they can edit it.",
      tip: 'Before sending to a client or employer, always save as PDF so your formatting is preserved exactly as you created it.'
    },
    {
      type: 'quiz',
      title: 'Check what you have learned',
      question: 'Which format should you use to send a spreadsheet that you do NOT want the recipient to modify?',
      options: [
        { text: '.xlsx', correct: false },
        { text: '.csv', correct: false },
        { text: '.pdf', correct: true },
        { text: '.txt', correct: false }
      ],
      explanation: 'PDF is the correct choice for sharing a read-only document. The recipient can view and print it but cannot modify the data. Use .xlsx when you want them to edit it.'
    },
    {
      type: 'practice',
      title: 'Scenario: preparing a report for the boss',
      scenario: "You have prepared a monthly expenses report in Excel. Your manager asks you to send it so they can 'just read it without accidentally changing anything'.",
      task: 'What do you do?',
      choices: [
        { text: 'Send the .xlsx file and tell them "be careful not to change anything"', correct: false, feedback: "Risky! Even with good intentions, Excel files are easy to accidentally modify. If a colleague changes a formula the whole spreadsheet could break." },
        { text: 'Export as PDF and send the PDF', correct: true, feedback: "Excellent choice! PDF guarantees the format is preserved exactly as you created it, nobody can accidentally modify anything, and it opens on any device." },
        { text: 'Print it on paper and scan it', correct: false, feedback: "It would work but is extremely inefficient. Exporting to PDF takes 10 seconds and gives a better result than a scan." }
      ]
    },
    {
      type: 'summary',
      title: 'Excel module complete! 🏆',
      content: "You have completed all Excel lessons! You now know: · How to understand the interface and enter data · How to write basic formulas and use SUM, AVERAGE, COUNT · How to format your spreadsheet professionally · How to save and share files correctly\n\nGo to Certifications to take the Excel exam and earn your badge!",
    }
  ]
};

// ─── M04 — Microsoft Word ─────────────────────────────────────────────────────

const wordLesson1: Lesson = {
  id: 'word-1',
  moduleId: 'word',
  number: 1,
  title: 'Opening Word and finding your way',
  duration: '15 min',
  xp: 50,
  screens: [
    {
      type: 'intro',
      title: 'Opening Word and finding your way',
      content: "In this lesson you will learn how to open Microsoft Word, understand the interface and create your first document. By the end you will navigate the programme with confidence.",
      tip: 'Duration: 15 minutes · No experience required',
    },
    {
      type: 'learn',
      title: "The Word interface — your digital studio",
      content: "When you open Word you see:\n\n• Ribbon: strips of buttons at the top — Home, Insert, Layout, References…\n• White area in the centre: the page where you type\n• Status bar at the bottom: shows page count, word count, language\n• Blinking cursor: shows where your typed text will appear",
      analogy: "Word is like a super-equipped digital notebook: blank page in the centre, toolbox (Ribbon) at the top, automatic word counter. Nothing gets dirty, nothing breaks.",
      tip: "Press Ctrl+N to open a new blank document at any time.",
    },
    {
      type: 'learn',
      title: "Save immediately — the golden rule",
      content: "Rule number one in Word: save immediately!\n\n1. Press Ctrl+S (or Cmd+S on Mac)\n2. Choose where to save (Desktop, Documents…)\n3. Give the file a name (e.g. 'Cover Letter')\n4. The .docx format is the default — fine for everything\n\nAfter the first save, Ctrl+S updates the file in an instant.\n\nAuto-save: if you have Microsoft 365 with OneDrive active, Word saves every few seconds automatically.",
      tip: "Save every 10 minutes with Ctrl+S. It is a habit that will save you from many problems.",
    },
    {
      type: 'quiz',
      title: 'Check — the Ribbon',
      question: "What is the strip of buttons and menus at the top of Word called?",
      options: [
        { text: 'Ribbon (Barra multifunzione)', correct: true },
        { text: 'Status bar', correct: false },
        { text: 'Control panel', correct: false },
        { text: 'Text area', correct: false },
      ],
      explanation: "The Ribbon is the area with all the buttons organised in tabs (Home, Insert, Layout…). It is your main toolbox in Word.",
    },
    {
      type: 'quiz',
      title: 'Check — saving the document',
      question: "What is the keyboard shortcut to save quickly in Word?",
      options: [
        { text: 'Ctrl+P', correct: false },
        { text: 'Ctrl+S', correct: true },
        { text: 'Ctrl+Z', correct: false },
        { text: 'Ctrl+A', correct: false },
      ],
      explanation: "Ctrl+S (Save) saves the document. Ctrl+P opens the print dialog, Ctrl+Z undoes the last action, Ctrl+A selects all text.",
    },
    {
      type: 'practice',
      title: 'Scenario: first day at work',
      scenario: "You are at your new job. Your manager asks you to open Word, create a document called 'Meeting Notes 01-05-2026' and save it in the Documents folder.",
      task: "What are the correct steps in the right order?",
      choices: [
        { text: 'Open Word → type the text → save at the end with Ctrl+S', correct: false, feedback: "Almost! But it is better to save with a name IMMEDIATELY, before typing. That way, if the PC crashes, you lose nothing." },
        { text: 'Open Word → Ctrl+S → choose Documents folder → type the name → type', correct: true, feedback: "Perfect! Saving immediately with a meaningful name is the correct professional practice." },
        { text: "Open Word → Save As from the File menu → type → Ctrl+S at the end", correct: false, feedback: "Not wrong, but the order is not optimal. It is better to save with a name before you start typing, not after." },
      ],
    },
    {
      type: 'summary',
      title: 'Lesson complete! 🎉',
      content: "Great work! Now you know:\n· How Word's interface is laid out\n· What the Ribbon is for\n· How to save immediately with Ctrl+S\n\nIn the next lesson you will learn to format text professionally.",
    },
  ],
};

const wordLesson2: Lesson = {
  id: 'word-2',
  moduleId: 'word',
  number: 2,
  title: 'Writing and formatting text',
  duration: '20 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'Writing and formatting text',
      content: "Writing is only half the job. In this lesson you learn to format text to make it clear, readable and professional — just like real office workers do.",
      tip: 'Duration: 20 minutes',
    },
    {
      type: 'learn',
      title: 'Formatting shortcuts',
      content: "The three basic formatting options and their shortcuts:\n\n• Bold: Ctrl+B — for headings and key words\n• Italic: Ctrl+I — for technical terms, quotations\n• Underline: Ctrl+U — for links, emphasis\n\nHow to use: select the text with the mouse → press the shortcut.\nOr: press the shortcut → type → press again to exit the mode.\n\nUndo: Ctrl+Z undoes the last action — invaluable if you make a mistake.",
      analogy: "Bold is like writing with a marker instead of a pencil — immediately more visible. Ctrl+Z is the digital eraser — it undoes any mistake instantly.",
    },
    {
      type: 'learn',
      title: 'Font size and type',
      content: "In the Home tab you find:\n\n• Font type: Calibri is the default, Times New Roman is more formal, Arial is modern\n• Size: 11-12pt for body text, 14-16pt for headings\n• Colour: use black for formal documents, other colours only to highlight\n\nText alignment:\n• Left (Ctrl+L): standard for letters and texts\n• Centre (Ctrl+E): for headings\n• Justified (Ctrl+J): for long texts — aligns both left and right",
      tip: "For a professional document use: Times New Roman 12pt or Calibri 11pt, justified alignment, 2.5 cm margins.",
    },
    {
      type: 'quiz',
      title: 'Check — bold shortcut',
      question: "You have typed a word and want to make it bold. Which sequence do you use?",
      options: [
        { text: 'Select the word → Ctrl+I', correct: false },
        { text: 'Select the word → Ctrl+B', correct: true },
        { text: 'Select the word → Ctrl+U', correct: false },
        { text: 'Double-click the word', correct: false },
      ],
      explanation: "Ctrl+B (Bold) makes the selected text bold. Ctrl+I = italic, Ctrl+U = underline. Double-click selects the word but does not apply formatting.",
    },
    {
      type: 'quiz',
      title: 'Check — undoing mistakes',
      question: "You have accidentally deleted a paragraph. How do you recover it immediately?",
      options: [
        { text: 'Close Word without saving and reopen the file', correct: false },
        { text: 'Ctrl+Z to undo the last action', correct: true },
        { text: 'Ctrl+S to save and recover', correct: false },
        { text: "You can't recover it — it's gone forever", correct: false },
      ],
      explanation: "Ctrl+Z (Undo) is your best friend! You can press Ctrl+Z multiple times to undo the last N actions. Ctrl+Y (Redo) redoes what you undid.",
    },
    {
      type: 'practice',
      title: 'Scenario: formal letter for a job interview',
      scenario: "You are writing a formal letter for a job interview. You have typed the heading 'Cover Letter' and the body text. The heading must stand out from the body.",
      task: "Which formatting do you apply to the heading to make it professional?",
      choices: [
        { text: 'Normal text, same font as the body — a uniform document is more elegant', correct: false, feedback: "The heading MUST be visually distinct from the body. Without different formatting, the reader struggles to understand the document structure." },
        { text: 'Bold, size 14pt, centred (Ctrl+E)', correct: true, feedback: "Correct! Bold + larger size + centred is the standard formatting for headings in formal documents." },
        { text: 'All in CAPITALS, red colour, underlined', correct: false, feedback: "Too aggressive for a formal document. All caps gives the impression of shouting. Use bold and larger size instead." },
      ],
    },
    {
      type: 'summary',
      title: 'Lesson complete! 🎉',
      content: "Well done! Now you master:\n· Bold (Ctrl+B), Italic (Ctrl+I), Underline (Ctrl+U)\n· How to change font, size and alignment\n· Ctrl+Z to undo any mistake\n\nIn the next lesson you will create a complete document with headings and a professional layout.",
    },
  ],
};

const wordLesson3: Lesson = {
  id: 'word-3',
  moduleId: 'word',
  number: 3,
  title: 'Professional document',
  duration: '25 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'Structuring a professional document',
      content: "A professional document has a precise structure: headings, well-organised paragraphs, clear lists. In this lesson you learn to use Word Styles and export to PDF.",
      tip: 'Duration: 25 minutes',
    },
    {
      type: 'learn',
      title: 'Word Styles — the key to perfect documents',
      content: "Styles are predefined formatting combinations. Find them in the Home tab.\n\nMain styles:\n• Normal: body text of the document\n• Heading 1: main title (large, bold)\n• Heading 2: subtitle (medium, bold)\n• Heading 3: sub-section\n\nWhy use Styles:\n1. Consistency: all headings look the same\n2. Navigation: Word automatically creates a table of contents\n3. Professionalism: documents with styles look expert-made\n4. Speed: apply dozens of formatting settings with one click",
      analogy: "Styles are like office rubber stamps: instead of writing 'URGENT' by hand every time, you use the stamp — fast, uniform, professional.",
      tip: "Select a heading → click 'Heading 1' in the styles bar. Done! No manual formatting needed.",
    },
    {
      type: 'learn',
      title: 'Lists and page layout',
      content: "Bullet and numbered lists:\n• Bullet list (•): use the button in the Home tab. Great for unordered lists\n• Numbered list (1. 2. 3.): for procedures and sequential steps\n• Indentation: Tab increases the level, Shift+Tab decreases it\n\nPage layout (Layout tab):\n• Margins: 2.5 cm standard for formal documents\n• Orientation: Portrait for text, Landscape for wide tables\n• Line spacing: Home → Paragraph Spacing → 1.15 or 1.5 for readability\n\nExport to PDF:\nFile → Export → Create PDF/XPS Document → Publish",
      tip: "PDF is the ideal format for sending documents: it preserves formatting on any device.",
    },
    {
      type: 'quiz',
      title: 'Check — Word Styles',
      question: "You are writing a document with three main sections. Which Word style do you apply to the section headings?",
      options: [
        { text: 'Normal with bold and large font', correct: false },
        { text: 'Heading 1', correct: true },
        { text: 'Heading 3', correct: false },
        { text: 'Intense Quote', correct: false },
      ],
      explanation: "Heading 1 is the style for first-level main headings. Using Styles (instead of manual formatting) guarantees consistency and allows automatic table of contents generation.",
    },
    {
      type: 'quiz',
      title: 'Check — PDF export',
      question: "Your manager asks for the meeting minutes in a format 'that cannot be modified and looks the same on all PCs'. Which format do you choose?",
      options: [
        { text: '.docx (Word)', correct: false },
        { text: '.txt (plain text)', correct: false },
        { text: '.pdf', correct: true },
        { text: '.jpg (image)', correct: false },
      ],
      explanation: "PDF is the ideal format for read-only sharing. It preserves exact formatting and works on any device without modification.",
    },
    {
      type: 'practice',
      title: 'Scenario: meeting minutes',
      scenario: "You need to prepare meeting minutes with: a main title, three sections ('Attendees', 'Agenda', 'Decisions made'), and a bullet list of 4 decisions.",
      task: "How do you structure the document most professionally?",
      choices: [
        { text: "Write everything in Normal, put headings in manual bold and use dashes (-) for the list", correct: false, feedback: "It works, but manual formatting is inconsistent. Styles guarantee automatic consistency." },
        { text: "Main title → Heading 1 style; Sections → Heading 2 style; Decisions → Word bullet list; body → Normal style", correct: true, feedback: "Perfect! This is the standard professional structure. Styles guarantee consistency and Word can generate an automatic table of contents." },
        { text: "Use Heading 1 for everything, then manually change the size of secondary sections", correct: false, feedback: "Mixing Styles and manual formatting creates inconsistency. Use Heading 2 for secondary sections — that is exactly what it exists for." },
      ],
    },
    {
      type: 'summary',
      title: 'Lesson complete! 🎉',
      content: "Excellent! Now you can:\n· Use Word Styles for structured documents\n· Create bullet and numbered lists\n· Set professional layout and margins\n· Export any document to PDF\n\nIn the final lesson of this module you will create a real CV with Word.",
    },
  ],
};

const wordLesson4: Lesson = {
  id: 'word-4',
  moduleId: 'word',
  number: 4,
  title: 'Creating a CV with Word',
  duration: '20 min',
  xp: 100,
  screens: [
    {
      type: 'intro',
      title: 'Creating a professional CV with Word',
      content: "The CV is the most important document in your working life. In this lesson you learn to create a clear, professional CV that is compatible with the automated screening systems used by companies.",
      tip: 'Duration: 20 minutes · By the end you will have the foundation to build your real CV',
    },
    {
      type: 'learn',
      title: 'CV structure — the essential sections',
      content: "A standard CV has these sections in order:\n\n1. Header: Full name (large, bold), Contacts (email, phone, city)\n2. Professional profile: 2-3 lines describing who you are and what you are looking for\n3. Work experience: in reverse chronological order (most recent first)\n4. Education and training: diplomas, courses, certifications\n5. Skills: IT, languages, soft skills\n6. Additional information: volunteering, relevant hobbies",
      analogy: "The CV is your written business card. Like a shop window: put your best items in the most visible spot, in a precise order.",
    },
    {
      type: 'learn',
      title: 'Formatting your CV in Word',
      content: "Practical formatting tips:\n\n• Font: Calibri or Arial, 11pt for body, 16pt for your name\n• Margins: 1.5-2 cm (to fit more content)\n• Line spacing: 1.15\n• Section headings: bold, 12pt\n• Bullet lists: use Word lists (not manual dashes)\n• Length: 1 page if you have less than 5 years of experience, 2 pages otherwise\n• Always save as PDF before sending\n\nUse a template: File → New → search 'CV' — Word has free ready-made templates.",
      tip: "NEVER send your CV as .docx. Always PDF: it preserves formatting and looks more professional.",
    },
    {
      type: 'quiz',
      title: 'Check — CV structure',
      question: "In what order should work experience be listed in a CV?",
      options: [
        { text: "From oldest to most recent (chronological order)", correct: false },
        { text: "From most recent to oldest (reverse chronological order)", correct: true },
        { text: "By importance, not by date", correct: false },
        { text: "In alphabetical order by company name", correct: false },
      ],
      explanation: "CVs are always in reverse chronological order: most recent job first, then previous ones. The recruiter wants to see your most recent and relevant experience immediately.",
    },
    {
      type: 'quiz',
      title: 'Check — sending format',
      question: "You have finished your CV in Word. In which format do you send it for a job application?",
      options: [
        { text: ".docx — so the recruiter can open it with Word", correct: false },
        { text: ".pdf — to preserve formatting and make a professional impression", correct: true },
        { text: ".txt — the most universal format", correct: false },
        { text: ".jpg — save it as an image", correct: false },
      ],
      explanation: "PDF is the correct format for sending a CV. It guarantees the formatting is identical on any device and conveys professionalism.",
    },
    {
      type: 'practice',
      title: "Scenario: applying for a job",
      scenario: "You have found a job offer as an administrative assistant. The company asks you to send a CV and cover letter. You have the CV ready in .docx format in Word.",
      task: "What is the correct procedure before sending?",
      choices: [
        { text: "Send the .docx directly — easier for everyone to open", correct: false, feedback: "The .docx can have compatibility issues between different Word versions and the layout may shift. Always PDF for job applications." },
        { text: "File → Export → Create PDF/XPS → Publish; then attach the PDF to the email", correct: true, feedback: "Perfect procedure! Exporting to PDF from Word is straightforward and guarantees the recruiter sees the CV exactly as you created it." },
        { text: "Print the CV and scan it as a PDF", correct: false, feedback: "The result is a scanned image. ATS (automated screening software) cannot read images. Use File → Export instead." },
      ],
    },
    {
      type: 'summary',
      title: 'Word Module Complete! 🏅',
      content: "Congratulations — you have completed the Microsoft Word module! Now you can:\n· Create and save professional documents\n· Format text with style and precision\n· Structure documents with Styles, headings and lists\n· Create a professional CV and save it as PDF\n\nYou have earned the Microsoft Word badge! Go to Certifications for the official certificate.",
    },
  ],
};

// ─── M06 — PA Portals ─────────────────────────────────────────────────────────

const portaliPaLesson1: Lesson = {
  id: 'portali-pa-1',
  moduleId: 'portali-pa',
  number: 1,
  title: 'PA Portals — overview',
  duration: '15 min',
  xp: 50,
  screens: [
    {
      type: 'intro',
      title: 'Italian Public Administration portals',
      content: "The physical counter is not the only way to interact with the Italian PA. In this lesson you discover the main online portals and how to access them with SPID — saving hours of queuing.",
      tip: 'Duration: 15 minutes',
    },
    {
      type: 'learn',
      title: "The main PA portals — the services map",
      content: "The main Italian PA websites you need to know:\n\n• INPS.it — pensions, unemployment benefit, bonuses, contributions\n• AgenziaEntrate.gov.it — pre-filled tax return, F24, land registry\n• INAIL.it — workplace insurance, accidents\n• Electronic Health Record (FSE) — test results, prescriptions, medical history\n• CUP (Unified Booking Centre) — booking specialist medical visits\n• PagoPA — paying taxes, bills and PA services online\n\nAccess: almost all use SPID or CIE for authentication.",
      analogy: "PA portals are like a multi-function counter open 24 hours a day. SPID is the badge that lets you into all departments without queuing separately for each one.",
    },
    {
      type: 'learn',
      title: "How to access — SPID as a universal key",
      content: "Standard procedure to access a PA portal:\n\n1. Go to the service website (e.g. INPS.it)\n2. Click 'Log in' or 'Reserved area'\n3. Choose 'Sign in with SPID'\n4. Select your Identity Provider (e.g. Poste Italiane, TIM ID…)\n5. Enter your SPID username and password\n6. Authorise access with the OTP code from the app\n7. You are inside your personal area\n\nAverage time: less than 1 minute.",
      tip: "Always keep your smartphone nearby when accessing PA portals: the OTP code arrives on your SPID provider app.",
    },
    {
      type: 'quiz',
      title: 'Check — main PA portals',
      question: "On which PA portal can you view your contributory record and pension statement?",
      options: [
        { text: 'AgenziaEntrate.gov.it', correct: false },
        { text: 'INPS.it', correct: true },
        { text: 'INAIL.it', correct: false },
        { text: 'PagoPA.gov.it', correct: false },
      ],
      explanation: "INPS.it is the portal of the National Social Security Institute. Here you can see contributions paid, simulate your pension, claim unemployment benefit and much more.",
    },
    {
      type: 'quiz',
      title: 'Check — SPID access',
      question: "After entering your SPID username and password, what additional step is required?",
      options: [
        { text: "No further step — the password is sufficient", correct: false },
        { text: "A one-time password (OTP) generated by the SPID provider app", correct: true },
        { text: "A qualified electronic signature", correct: false },
        { text: "Your identity card number", correct: false },
      ],
      explanation: "SPID uses two-factor authentication: password + OTP from the app. This double check protects your account even if someone knows your password.",
    },
    {
      type: 'practice',
      title: 'Scenario: accessing INPS for the first time',
      scenario: "You have received a letter from INPS inviting you to check your contributory position online. You have an active SPID with Poste Italiane. You have never accessed INPS.it before.",
      task: "What is the correct sequence to log in?",
      choices: [
        { text: "Go to the physical INPS counter — safer than doing it online", correct: false, feedback: "The physical counter requires an appointment and hours of waiting. With SPID you can do the same thing from home in 2 minutes, with the same level of security." },
        { text: "Go to INPS.it → 'Sign in with SPID' → select Poste Italiane → enter credentials → confirm with OTP", correct: true, feedback: "Correct procedure! This is exactly the standard login flow. After the first time you will feel much more confident." },
        { text: "Search 'INPS' on Google and click the first result, then enter your tax code", correct: false, feedback: "Be careful! Always access by typing inps.it directly in the address bar. Phishing sites often impersonate PA portals." },
      ],
    },
    {
      type: 'summary',
      title: 'Lesson complete! 🎉',
      content: "Perfect! Now you know:\n· The main Italian PA portals\n· How SPID access works\n· The OTP procedure for security\n\nIn the next lesson you explore INPS in detail: pensions, unemployment benefit and bonuses.",
    },
  ],
};

const portaliPaLesson2: Lesson = {
  id: 'portali-pa-2',
  moduleId: 'portali-pa',
  number: 2,
  title: 'INPS online — pensions and benefits',
  duration: '15 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'INPS online — managing your social security from home',
      content: "INPS is perhaps the most used PA portal in Italy. In this lesson you learn to navigate it confidently: contributory record, pension simulator, unemployment benefit and bonuses.",
      tip: 'Duration: 15 minutes',
    },
    {
      type: 'learn',
      title: "Your INPS personal area — what you find",
      content: "Once inside INPS.it with SPID, your reserved area contains:\n\n• Contributory record: every contribution paid by your employers, year by year\n• My Future Pension (La Mia Pensione Future): simulator that calculates how much you will receive and when you can retire\n• NASpI application: if you lose your job, claim unemployment benefit online\n• Bonuses and subsidies: check eligibility and apply online\n• Pension slip: if you are already retired, download your monthly slip",
      analogy: "The INPS reserved area is like your social security file in your hands: you can check everything that concerns you without depending on a counter operator.",
    },
    {
      type: 'learn',
      title: 'Checking contributions and the pension simulator',
      content: "How to use the contributory record:\n\n1. Log in to INPS.it with SPID\n2. Go to 'Fascicolo Previdenziale del Cittadino'\n3. Click 'Contributory Record'\n4. View all work periods with contributions paid\n\nWhat to check:\n• Are all work periods present?\n• Is the employer data correct?\n• Are there unexplained gaps?\n\nIf you find errors: click 'Report an anomaly' — INPS will correct your record.",
      tip: "Check your INPS contributory record at least once a year. The sooner you find errors, the easier they are to fix.",
    },
    {
      type: 'quiz',
      title: 'Check — INPS record errors',
      question: "You worked for 3 years at a company but that period does not appear in your INPS record. What do you do?",
      options: [
        { text: "Do nothing — the contributions will probably arrive late", correct: false },
        { text: "Go to the physical INPS counter with your employment contract", correct: false },
        { text: "Click 'Report an anomaly' in the INPS record and attach documentation", correct: true },
        { text: "Call your previous employer", correct: false },
      ],
      explanation: "INPS has a 'Report an anomaly' function directly in the contributory record. It is the fastest way to flag errors. You can attach documents and track the case status online.",
    },
    {
      type: 'quiz',
      title: 'Check — NASpI',
      question: "You lost your job yesterday. When can you apply for NASpI (unemployment benefit) on INPS.it?",
      options: [
        { text: "Only after 30 days from the end of employment", correct: false },
        { text: "You can apply immediately, but have 68 days from the end date", correct: true },
        { text: "Only by going to the physical INPS counter", correct: false },
        { text: "Only after finding another job", correct: false },
      ],
      explanation: "The NASpI application must be submitted within 68 days from the end of employment. You can do it immediately via INPS.it with SPID. The sooner you apply, the sooner payments begin.",
    },
    {
      type: 'practice',
      title: 'Scenario: checking contributions paid',
      scenario: "Maria, 52, wants to know how many years of contributions she has paid to understand when she can retire. She has an active SPID and has never used INPS.it.",
      task: "What path should she follow on INPS.it?",
      choices: [
        { text: "Call the INPS freephone number and have an operator read the data", correct: false, feedback: "INPS call centres have very long waiting times. With SPID Maria can see the same data in 2 minutes, available 24 hours a day." },
        { text: "INPS.it → SPID → Fascicolo Previdenziale → Contributory Record → 'My Future Pension' simulator", correct: true, feedback: "Correct path! The record shows all years of contributions, and the simulator calculates the estimated retirement date and approximate amount." },
        { text: "Go to a tax assistance centre (CAF) for help", correct: false, feedback: "The CAF can help, but with SPID Maria can do everything herself in a few minutes. Digital autonomy means not depending on intermediaries for these basic operations." },
      ],
    },
    {
      type: 'summary',
      title: 'Lesson complete! 🎉',
      content: "Great! Now you know how to use INPS.it to:\n· Check your contributory record\n· Simulate your retirement date and amount\n· Apply for NASpI if unemployed\n· Report anomalies in your contributions\n\nIn the final lesson you learn to book medical appointments and pay taxes online.",
    },
  ],
};

const portaliPaLesson3: Lesson = {
  id: 'portali-pa-3',
  moduleId: 'portali-pa',
  number: 3,
  title: 'Booking services and paying online',
  duration: '15 min',
  xp: 75,
  screens: [
    {
      type: 'intro',
      title: 'Booking and paying PA services online',
      content: "Queuing at counters belongs to the past. In this lesson you learn to book medical appointments via CUP, pay taxes with PagoPA and use the IO app — all from your smartphone or PC.",
      tip: 'Duration: 15 minutes',
    },
    {
      type: 'learn',
      title: "CUP — booking specialist medical visits",
      content: "The CUP (Unified Booking Centre) allows you to book NHS specialist medical visits.\n\nHow to book online:\n1. Search 'CUP [your region name]'\n2. Log in with SPID or Health Card\n3. Enter the doctor's referral\n4. Choose hospital/clinic, date and time\n5. Confirm and receive your reminder by email or SMS\n\nAlternatives:\n• Regional NHS app\n• CUP freephone number (24/7)\n• CUP kiosk in pharmacies",
      analogy: "The online CUP is like a travel agency for healthcare: you book your medical appointment choosing the facility, date and time comfortably, without queuing.",
      tip: "Urgent referral? The CUP shows availability within guaranteed maximum waiting times (72 hours for urgent, 30 days for priority).",
    },
    {
      type: 'learn',
      title: "PagoPA and the IO app — paying PA taxes and services",
      content: "PagoPA is the official platform for payments to the Italian PA.\n\nWhat you pay with PagoPA:\n• Municipal taxes (TARI, IMU)\n• Traffic fines\n• School and university fees\n• Car tax\n• Medical copayment (ticket)\n\nHow to pay:\n1. You have a PagoPA notice with an IUV code\n2. Go to pagopa.gov.it or use the IO app\n3. Enter the IUV code or scan the QR code\n4. Choose your payment method\n5. Receive the digital receipt — legally valid\n\nThe IO app collects all PagoPA notices in one application.",
      tip: "Download the IO app: it centralises messages, payments and documents from all Italian PA in one app.",
    },
    {
      type: 'quiz',
      title: 'Check — CUP online',
      question: "You have a doctor's referral for a cardiology appointment. Where do you book online?",
      options: [
        { text: 'INPS.it', correct: false },
        { text: 'AgenziaEntrate.gov.it', correct: false },
        { text: "The CUP (Unified Booking Centre) for your region", correct: true },
        { text: 'PagoPA.gov.it', correct: false },
      ],
      explanation: "The CUP manages NHS specialist visit bookings. Each region has its own online CUP accessible with SPID or health card.",
    },
    {
      type: 'quiz',
      title: 'Check — PagoPA',
      question: "You have received a payment notice for your municipal waste tax (TARI). How do you pay online?",
      options: [
        { text: "Only at a bank or post office — you cannot pay online", correct: false },
        { text: "On PagoPA.gov.it or via the IO app entering the IUV code from the notice", correct: true },
        { text: "On INPS.it", correct: false },
        { text: "With a standard bank transfer", correct: false },
      ],
      explanation: "PagoPA is the official platform for all PA payments. With the IUV code and a credit/debit card the payment completes in 2 minutes. You receive an immediately valid digital receipt.",
    },
    {
      type: 'practice',
      title: 'Scenario: managing everything from your phone',
      scenario: "Giorgio, 62, needs to: pay an overdue car tax (he has the PagoPA notice) and book an eye examination with the doctor's referral. He has SPID and a smartphone.",
      task: "What is the most efficient way to do both?",
      choices: [
        { text: "Go to the post office for the car tax and call the CUP for the appointment", correct: false, feedback: "It works, but requires travel and waiting. With SPID and the IO app, Giorgio can do both from home in 10 minutes total." },
        { text: "Download the IO app (car tax via PagoPA with IUV code) and access the regional CUP with SPID for the appointment", correct: true, feedback: "Optimal solution! The IO app centralises PagoPA payments. The regional CUP handles healthcare bookings. Both with SPID, all from smartphone." },
        { text: "Wait for the car tax to renew automatically and go to the NHS counter for the appointment", correct: false, feedback: "Car tax does not renew automatically — he risks a fine. And the NHS counter requires an appointment. Online services are much faster." },
      ],
    },
    {
      type: 'summary',
      title: 'PA Portals Module Complete! 🏅',
      content: "Excellent! You have completed the PA Portals module. Now you know how to:\n· Navigate the main Italian PA portals\n· Log in with SPID to all services\n· Use INPS for pensions and benefits\n· Book medical visits with the CUP\n· Pay taxes with PagoPA and the IO app\n\nYou have earned the PA Portals badge! Go to Certifications for the official certificate.",
    },
  ],
};

// ─── Module map ───────────────────────────────────────────────────────────────

const lessonsByModule: Record<string, Lesson[]> = {
  spid: [spidLesson1, spidLesson2, spidLesson3],
  pec: [pecLesson1, pecLesson2],
  email: [emailLesson1, emailLesson2],
  word: [wordLesson1, wordLesson2, wordLesson3, wordLesson4],
  excel: [excelLesson1, excelLesson2, excelLesson3, excelLesson4],
  'portali-pa': [portaliPaLesson1, portaliPaLesson2, portaliPaLesson3],
};

export function getLessonsForModule(moduleId: string): Lesson[] {
  return lessonsByModule[moduleId] || [];
}
