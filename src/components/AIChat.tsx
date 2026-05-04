import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Copy, Check, WifiOff } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

interface AIChatProps {
  currentModule?: string | null;
}

const SYSTEM_IT = `Sei Sofia, l'insegnante virtuale di DIGITAL BRIDGE — una piattaforma formativa italiana per adulti che imparano le competenze digitali di base.

Il tuo ruolo è accompagnare gli utenti nel percorso di apprendimento con pazienza, incoraggiamento e chiarezza. Il tuo target sono adulti tra i 35 e i 65 anni che spesso non hanno mai usato un computer professionalmente.

Linee guida fondamentali:
- Parla SEMPRE in italiano, con un tono caldo, paziente e incoraggiante
- Non usare MAI la parola "Sbagliato": sostituiscila con "Ottimo tentativo — proviamo insieme in modo diverso"
- Spiega ogni concetto tecnico con un'analogia del mondo fisico (es. la PEC è come una raccomandata con ricevuta di ritorno)
- Tieni le risposte brevi e chiare: massimo 3-4 frasi per risposta
- Celebra ogni piccolo progresso dell'utente
- Se l'utente sembra frustrato, normalizza l'errore: "È normale, ci vuole un po' — hai già fatto passi enormi"

I moduli della piattaforma sono: SPID & CIE (M01), PEC - Posta Certificata (M02), Email e Videochiamate (M03), Microsoft Word (M04), Excel (M05), Portali PA (M06), Sicurezza Online (M07), Firma Digitale (M08), Strumenti AI (M09), Lavoro Remoto (M10).`;

const SYSTEM_EN = `You are Sofia, the virtual teacher of DIGITAL BRIDGE — an Italian digital literacy platform for adults learning basic digital skills.

Your role is to guide users through their learning journey with patience, encouragement and clarity. Your target audience is adults aged 35–65 who often have little or no professional experience with computers.

Core guidelines:
- ALWAYS speak in English with a warm, patient and encouraging tone
- NEVER use the word "Wrong": replace it with "Good try — let's work through it together"
- Explain every technical concept with a real-world analogy (e.g. PEC is like a registered letter with a return receipt)
- Keep answers brief and clear: maximum 3–4 sentences per reply
- Celebrate every small progress the user makes
- If the user seems frustrated, normalise the mistake: "That's completely normal — you've already come a long way"

Platform modules: SPID & CIE (M01), PEC Certified Email (M02), Email & Video Calls (M03), Microsoft Word (M04), Excel (M05), PA Portals (M06), Online Security (M07), Digital Signature (M08), AI Tools (M09), Remote Work (M10).`;

// Quick reply chips per module context
const QUICK_REPLIES_IT: Record<string, string[]> = {
  default: ['Come funziona SPID?', 'Cos\'è la PEC?', 'Dove trovo i miei certificati?'],
  spid: ['Che documenti mi servono per SPID?', 'Qual è il provider più semplice?', 'Come accedo con SPID?'],
  pec: ['Come apro una casella PEC?', 'PEC e email normale: qual è la differenza?', 'Come faccio a sapere se la PEC è arrivata?'],
  email: ['Come scrivo un\'email professionale?', 'Come si fa una videochiamata?', 'Come allego un file?'],
  word: ['Come salvo un documento in PDF?', 'Come cambio il carattere?', 'Come aggiungo i numeri di pagina?'],
  excel: ['Come si fa la formula SOMMA?', 'Cos\'è una cella?', 'Come salvo in PDF?'],
  'portali-pa': ['Come accedo all\'INPS?', 'Come prenoto una visita col CUP?', 'Cos\'è PagoPA?'],
  sicurezza: ['Come creo una password sicura?', 'Come riconosco una truffa online?', 'Cosa devo fare se ricevo un\'email sospetta?'],
  'firma-digitale': ['Come funziona la firma digitale?', 'Che valore legale ha?', 'Dove posso firmare digitalmente?'],
  'ai-tools': ['Cosa può fare l\'intelligenza artificiale?', 'ChatGPT è sicuro da usare?', 'Come uso l\'AI al lavoro?'],
  'lavoro-remoto': ['Come funziona Teams?', 'Come condivido un file su Drive?', 'Come gestisco il calendario condiviso?'],
};

const QUICK_REPLIES_EN: Record<string, string[]> = {
  default: ['How does SPID work?', 'What is PEC?', 'Where can I find my certificates?'],
  spid: ['What documents do I need for SPID?', 'Which provider is easiest?', 'How do I log in with SPID?'],
  pec: ['How do I open a PEC mailbox?', 'What\'s the difference between PEC and regular email?', 'How do I know if my PEC arrived?'],
  email: ['How do I write a professional email?', 'How do I make a video call?', 'How do I attach a file?'],
  word: ['How do I save a document as PDF?', 'How do I change the font?', 'How do I add page numbers?'],
  excel: ['How do I use the SUM formula?', 'What is a cell?', 'How do I save as PDF?'],
  'portali-pa': ['How do I access INPS?', 'How do I book a medical visit with CUP?', 'What is PagoPA?'],
  sicurezza: ['How do I create a strong password?', 'How do I spot an online scam?', 'What should I do with a suspicious email?'],
  'firma-digitale': ['How does a digital signature work?', 'What legal value does it have?', 'Where can I sign digitally?'],
  'ai-tools': ['What can AI do for me?', 'Is ChatGPT safe to use?', 'How can I use AI at work?'],
  'lavoro-remoto': ['How does Teams work?', 'How do I share a file on Drive?', 'How do I manage a shared calendar?'],
};

const STORAGE_KEY = 'sofia_chat';
const API_KEY = process.env.GEMINI_API_KEY;

export function AIChat({ currentModule }: AIChatProps) {
  const { t, lang } = useLanguage();

  const getWelcome = useCallback((): Message => ({
    id: 'welcome',
    role: 'model',
    content: t('chat.welcome'),
  }), [t, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMessages = (): Message[] => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {/* ignore */}
    return [getWelcome()];
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persist messages to sessionStorage
  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch {/* ignore */}
  }, [messages]);

  // Reset on language change
  useEffect(() => {
    const welcome = getWelcome();
    setMessages([welcome]);
    sessionStorage.removeItem(STORAGE_KEY);
    setShowQuickReplies(true);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const getSystemPrompt = () => {
    const base = lang === 'en' ? SYSTEM_EN : SYSTEM_IT;
    if (currentModule) {
      const contextLine = lang === 'en'
        ? `\n\nThe user is currently studying module: ${currentModule}. Give contextual answers about this module when relevant.`
        : `\n\nL'utente sta attualmente studiando il modulo: ${currentModule}. Quando pertinente, dai risposte contestuali a questo modulo.`;
      return base + contextLine;
    }
    return base;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowQuickReplies(false);

    if (!API_KEY) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: lang === 'en'
          ? 'The AI assistant is currently unavailable. Please contact your coordinator.'
          : 'L\'assistente AI non è al momento disponibile. Contatta il tuo coordinatore.',
      }]);
      setIsLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      const contents = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));
      contents.push({ role: 'user', parts: [{ text: userMessage.content }] });

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: contents as any,
        config: { systemInstruction: getSystemPrompt() },
      });

      const reply = response.text || (lang === 'en'
        ? "Sorry, I couldn't respond. Please try again in a moment."
        : 'Mi dispiace, non sono riuscita a rispondere. Riprova tra un momento.');

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: reply,
      }]);
      setShowQuickReplies(true);
    } catch (error) {
      console.error('AI error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: lang === 'en'
          ? "Sorry, I had a technical problem. Please try again in a few seconds — I'm always here to help!"
          : 'Mi dispiace, ho avuto un problema tecnico. Riprova tra qualche secondo — sono sempre qui per aiutarti!',
      }]);
      setShowQuickReplies(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleCopy = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {/* ignore */}
  };

  const quickReplies = (lang === 'en' ? QUICK_REPLIES_EN : QUICK_REPLIES_IT)[currentModule ?? 'default']
    ?? (lang === 'en' ? QUICK_REPLIES_EN.default : QUICK_REPLIES_IT.default);

  const apiAvailable = Boolean(API_KEY);

  return (
    <>
      {/* Floating chat button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 p-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full shadow-lg border border-white/10 transition-all z-50 ${isOpen ? 'pointer-events-none' : ''}`}
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        aria-label="Apri chat con Sofia"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[520px] max-h-[80vh] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-zinc-800/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-serif font-medium text-sm">
                  S
                </div>
                <div>
                  <span className="font-medium text-white text-sm">Sofia</span>
                  <p className="text-zinc-400 text-xs flex items-center gap-1">
                    {t('chat.title')}
                    {!apiAvailable && <WifiOff className="w-3 h-3 text-orange-400" />}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                aria-label="Chiudi chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2.5 max-w-[88%] ${message.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-medium mt-0.5 ${
                    message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-blue-400'
                  }`}>
                    {message.role === 'user' ? <User className="w-3.5 h-3.5" /> : 'S'}
                  </div>
                  <div className="group relative">
                    <div className={`px-3.5 py-2.5 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-zinc-800 text-zinc-200 rounded-tl-none'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {/* Copy button for model messages */}
                    {message.role === 'model' && (
                      <button
                        onClick={() => handleCopy(message.id, message.content)}
                        className="absolute -bottom-1 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-zinc-700 hover:bg-zinc-600 rounded-full"
                        aria-label="Copia risposta"
                      >
                        {copiedId === message.id
                          ? <Check className="w-3 h-3 text-green-400" />
                          : <Copy className="w-3 h-3 text-zinc-400" />
                        }
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading dots */}
              {isLoading && (
                <div className="flex gap-2.5 max-w-[88%]">
                  <div className="w-7 h-7 flex-shrink-0 rounded-full bg-zinc-800 flex items-center justify-center text-blue-400 text-sm font-medium">S</div>
                  <div className="px-4 py-3 rounded-2xl bg-zinc-800 text-zinc-200 rounded-tl-none flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <AnimatePresence>
              {showQuickReplies && !isLoading && messages.length <= 3 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0"
                >
                  {quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(reply)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white/70 hover:text-white text-xs rounded-full border border-white/10 transition-all"
                    >
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-zinc-800/50 border-t border-white/10 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('chat.placeholder')}
                  disabled={!apiAvailable}
                  className="w-full bg-zinc-900 border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading || !apiAvailable}
                  className="absolute right-1.5 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Invia messaggio"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
