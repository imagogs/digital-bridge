const en = {
  // App generale
  'app.tagline': 'Work · Skills · Autonomy',
  'app.subtitle': 'Tap a module to start the lesson.',

  // Navigazione sezioni — bottom bar
  'nav.home': 'Home',
  'nav.library': 'Library',
  'nav.progress': 'Progress',
  'nav.certification': 'Certifications',
  // Legacy arrow navigation
  'nav.toPractice': 'Practice Area',
  'nav.toLibrary': 'Library',
  'nav.toCertification': 'Certifications',

  // Sezione Pratica
  'practice.title': 'Practice Area',
  'practice.subtitle': 'Test your skills with interactive exercises and real-world simulations across all studied modules.',
  'practice.start': 'Start Exercise',
  'practice.cards': [
    { title: 'SPID Simulation', desc: 'Access a simulated public portal using your trial SPID credentials.' },
    { title: 'Excel Exercises', desc: 'Complete real spreadsheets with formulas and data to fill in.' },
    { title: 'Professional Email', desc: 'Write and manage formal emails in real work scenarios.' },
    { title: 'Full Scenario', desc: 'Multi-step: receive a task, create a document, send it via PEC.' },
  ],

  // Sezione Certificazioni
  'cert.title': 'Certifications',
  'cert.subtitle': 'Validate your skills and earn the DIGITAL BRIDGE Certificate — recognised on the Italian job market.',
  'cert.threshold': 'Threshold',
  'cert.exam': 'Take the Exam',
  'cert.cards': [
    { title: 'Certificate: SPID & Digital Identity', module: 'spid' },
    { title: 'Certificate: Digital Communication', module: 'email' },
    { title: 'Certificate: PEC Certified Email', module: 'pec' },
    { title: 'Certificate: Excel Basics', module: 'excel' },
  ],

  // Login
  'login.start': 'Start your journey',
  'login.desc': 'Sign in to save your progress, earn badges and get your digital certificate.',
  'login.google': 'Sign in with Google',
  'login.loading': 'Signing in...',
  'login.error': 'Sign in failed. Please try again.',
  'login.gdpr': 'By signing in you accept data management in compliance with GDPR.\nYour data is never shared with third parties.',
  'login.footer': 'DIGITAL BRIDGE — ImagoAI / MedsendX Italia S.r.l. · v1.0',
  'login.haveCode': 'I have an access code',
  'login.codePlaceholder': 'Enter code...',
  'login.codeInvalid': 'Invalid code. Please contact your project coordinator.',

  // Assessment
  'assessment.welcome': 'Welcome to DIGITAL BRIDGE! 👋',
  'assessment.intro': 'Before we start, three quick questions to personalise your learning journey.',
  'assessment.questionOf': 'Question {n} of {total}',
  'assessment.analyzing': 'Analysing your profile...',
  'assessment.analyzingDesc': "We're building your personalised learning path",
  'assessment.questions': [
    {
      question: 'Have you ever used SPID to access an Italian public service online?',
      options: [
        "I don't know what SPID is",
        "I know what it is but I've never used it",
        'Yes, I use it occasionally',
      ],
    },
    {
      question: 'How comfortable are you with email?',
      options: [
        "I don't have an email address or I don't know how to use one",
        'I can read emails but struggle to write them',
        'I use email regularly for work or study',
      ],
    },
    {
      question: 'Have you ever used a spreadsheet like Excel or Google Sheets?',
      options: [
        "Never — I wouldn't know where to start",
        "I've opened it a few times but don't know how to use it well",
        'I can enter data and write simple formulas',
      ],
    },
  ],

  // Profilo
  'profile.yourJourney': 'Start your journey',
  'profile.loginDesc': 'Sign in to save your progress, earn XP and badges, and get your DIGITAL BRIDGE Certificate.',
  'profile.signIn': 'Sign in with Google',
  'profile.studyHours': 'Study hours per module',
  'profile.certificates': 'Certificates earned',
  'profile.noCerts': 'No certificates yet.',
  'profile.noCertsDesc': 'Complete modules and pass the exams.',
  'profile.registeredOn': 'Registered on',
  'profile.version': 'DIGITAL BRIDGE v1.0',
  'profile.signOut': 'Sign out',
  'level.none': 'Not assessed',
  'level.none.next': 'Start with the SPID module',
  'level.beginner': 'Beginner',
  'level.beginner.next': 'Continue with the foundation lessons',
  'level.intermediate': 'Intermediate',
  'level.intermediate.next': 'Try completing a certification exam',
  'level.advanced': 'Advanced',
  'level.advanced.next': "You're almost done — excellent!",
  'profile.xpTotal': 'total XP',

  // Home Dashboard
  'home.goodMorning': 'Good morning',
  'home.goodAfternoon': 'Good afternoon',
  'home.goodEvening': 'Good evening',
  'home.lessonsCompleted': 'Lessons completed',
  'home.xpEarned': 'XP Earned',
  'home.overallProgress': 'Overall progress',
  'home.basePath': 'Foundation path — modules M01–M06',
  'home.continueWhere': 'Continue where you left off',
  'home.nextModule': 'Next recommended module',
  'home.defaultUser': 'User',
  'home.streakDays': 'day streak',

  // Modulo
  'module.label': 'Module',
  'module.lessonsCompleted': 'Lessons completed',
  'module.totalXP': 'Total XP available',
  'module.progress': 'Progress',
  'module.completed': 'Completed',
  'module.completePrev': 'Complete the previous lesson first',
  'module.allDone': '🏅 Module completed!',
  'module.allDoneDesc': 'Go to Certifications to earn your official badge.',

  // Lezione
  'lesson.label': 'Lesson',
  'lesson.back': 'Back',
  'lesson.next': 'Next',
  'lesson.complete': 'Complete Lesson ✓',
  'lesson.xpEarned': 'XP earned in this lesson',
  'lesson.explanation': 'Explanation',
  'lesson.analogy': 'Real-world analogy',
  'lesson.question': 'Question',
  'lesson.practiceLabel': 'Practical exercise',
  'lesson.scenarioLabel': 'Scenario',
  'lesson.correct': '✓ Correct!',
  'lesson.incorrect': '→ Good try — here is the right answer:',
  'lesson.correctChoice': '✓ Great choice!',
  'lesson.incorrectChoice': '→ Almost there — here is why:',

  // Certification Exam
  'exam.intro': 'You are about to take the certification exam for the module',
  'exam.questions': 'Questions',
  'exam.time': 'Time',
  'exam.threshold': 'Pass mark',
  'exam.howTitle': '📌 How it works',
  'exam.how1': 'For each question, choose the answer you think is correct',
  'exam.how2': 'You will see immediately whether you answered correctly',
  'exam.how3': 'You need at least {pct}% correct answers to pass',
  'exam.how4': 'You can retake the exam without penalty',
  'exam.start': 'Start the Exam →',
  'exam.questionLabel': 'Question',
  'exam.correct': '✓ Correct!',
  'exam.incorrect': '→ Good try — here is the explanation:',
  'exam.next': 'Next question',
  'exam.submit': 'Submit the exam',
  'exam.passedTitle': 'Exam Passed!',
  'exam.score': 'Score',
  'exam.certObtained': '🎉 Certificate earned!',
  'exam.certDesc': 'You have earned the DIGITAL BRIDGE Certificate —',
  'exam.certProfile': 'You can download it from your profile under Certificates.',
  'exam.correct_count': 'Correct',
  'exam.xpEarned': 'Earned',
  'exam.downloadCert': 'Download Certificate PDF',
  'exam.backToPlatform': 'Back to the platform',
  'exam.failedTitle': 'So close — try again!',
  'exam.failedDesc': "Don't worry — you can retake the exam without penalty. Re-read the module lessons to strengthen the concepts.",
  'exam.retry': 'Retake the Exam',
  'exam.reviewLessons': 'Re-read the Lessons',
  'exam.defaultUser': 'User',

  // AI Chat
  'chat.placeholder': 'Message Sofia...',
  'chat.title': 'Sofia — AI Teacher',
  'chat.welcome': 'Hi! I am Sofia, your virtual teacher. How can I help you today? You can ask me to explain a topic, guide you through a module, or help you navigate the platform. 😊',
} as const;

export default en;
