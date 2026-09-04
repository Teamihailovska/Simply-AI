import './demo.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUp, Bot } from 'lucide-react';

type Lang = 'de' | 'en';
type ChatMessage = { role: 'guest' | 'ai'; text: string };

const botKnowledge: Record<Lang, { keywords: string[]; answer: string }[]> = {
  de: [
    { keywords: ['wlan', 'wifi', 'passwort', 'internet'], answer: 'Das WLAN heißt "Hotel-Guest". Das Passwort finden Sie auf Ihrer Schlüsselkarte.' },
    { keywords: ['frühstück', 'fruhstuck', 'breakfast'], answer: 'Das Frühstück wird von 07:00–10:30 Uhr serviert. Soll ich Ihnen einen Tisch reservieren?' },
    { keywords: ['abendessen', 'dinner', 'restaurant'], answer: 'Heute Abend servieren wir ab 18:00 Uhr ein 3-Gänge-Menü mit Seeblick. Möchten Sie einen Tisch reservieren?' },
    { keywords: ['spa', 'wellness', 'sauna', 'pool'], answer: 'Unser Spa-Bereich ist täglich von 09:00–20:00 Uhr geöffnet. Soll ich einen Termin für Sie buchen?' },
    { keywords: ['kissen', 'pillow'], answer: 'Natürlich! Ich informiere sofort die Housekeeping – ein zusätzliches Kissen wird in Kürze zu Ihnen gebracht.' },
    { keywords: ['zimmerservice', 'room service'], answer: 'Gerne! Was möchten Sie sich aufs Zimmer bringen lassen?' },
    { keywords: ['cocktail', 'bar', 'drink'], answer: 'Unsere Bar bietet eine Auswahl an Signature-Cocktails, von 17:00–00:00 Uhr geöffnet. Möchten Sie eine Empfehlung?' },
    { keywords: ['apartment', 'tür', 'schlüssel', 'unlock'], answer: 'Sie können Ihr Apartment mit dem Code aufschließen, den Sie per E-Mail erhalten haben. Bei Problemen verbinde ich Sie gerne mit der Rezeption.' },
    { keywords: ['feedback'], answer: 'Vielen Dank, dass Sie uns Feedback geben möchten! Wie war Ihr bisheriger Aufenthalt bei uns?' },
    { keywords: ['check-out', 'checkout', 'auschecken'], answer: 'Der Check-out ist bis 11:00 Uhr. Ein späterer Check-out ist auf Anfrage möglich.' },
    { keywords: ['check-in', 'checkin', 'einchecken'], answer: 'Der Check-in ist ab 15:00 Uhr möglich. Wir freuen uns auf Sie!' },
  ],
  en: [
    { keywords: ['wifi', 'wlan', 'password', 'internet'], answer: 'The network is "Hotel-Guest". The password is on your key card.' },
    { keywords: ['breakfast'], answer: 'Breakfast is served from 07:00–10:30. Would you like me to reserve a table?' },
    { keywords: ['dinner', 'restaurant'], answer: 'Tonight we\'re serving a 3-course menu with lake views, starting at 18:00. Would you like a table reservation?' },
    { keywords: ['spa', 'wellness', 'sauna', 'pool'], answer: 'Our spa area is open daily from 09:00–20:00. Should I book you a slot?' },
    { keywords: ['pillow'], answer: 'Of course! I\'ll notify housekeeping right away — an extra pillow will be brought to your room shortly.' },
    { keywords: ['room service'], answer: 'Of course! What would you like delivered to your room?' },
    { keywords: ['cocktail', 'bar', 'drink'], answer: 'Our bar offers a selection of signature cocktails, open 17:00–00:00. Would you like a recommendation?' },
    { keywords: ['apartment', 'unlock', 'door', 'key'], answer: 'You can unlock your apartment with the code sent to your email. If you run into issues, I can connect you with the front desk.' },
    { keywords: ['feedback'], answer: 'Thank you for wanting to share feedback! How has your stay been so far?' },
    { keywords: ['check-out', 'checkout', 'leaving'], answer: 'Check-out is until 11:00. A later check-out is available on request.' },
    { keywords: ['check-in', 'checkin', 'arrival'], answer: 'Check-in is from 15:00. Looking forward to welcoming you!' },
  ],
};

function getBotAnswer(question: string, lang: Lang): string {
  const q = question.toLowerCase();
  const match = botKnowledge[lang].find((entry) => entry.keywords.some((kw) => q.includes(kw)));
  if (match) return match.answer;
  return lang === 'de'
    ? 'Danke für Ihre Nachricht! Ich leite dies gerne an unser Team weiter, das sich in Kürze bei Ihnen meldet.'
    : 'Thanks for your message! I\'ll pass this along to our team, who will get back to you shortly.';
}

const quickQuestions: Record<Lang, string[]> = {
  de: [
    'Wann gibt es Frühstück?',
    'Was gibt es heute zum Abendessen?',
    'Könnten Sie mir bitte ein weiteres Kissen bringen?',
    'Wie entriegle ich das Apartment?',
    'Erzählen Sie mir von der Cocktailkarte',
    'Feedback geben',
  ],
  en: [
    'When is breakfast served?',
    "What's for dinner tonight?",
    'Could you bring me another pillow, please?',
    'How do I unlock the apartment?',
    'Tell me about the cocktail menu',
    'Give feedback',
  ],
};

export default function DemoPage() {
  const [lang, setLang] = useState<Lang>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: 'guest', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: 'ai', text: getBotAnswer(text, lang) }]);
    }, 900);
  }

  const greeting =
    lang === 'de'
      ? "Ich bin der AI-Concierge des Demo Hotel am Wörthersee. Wie kann ich Ihnen helfen?"
      : "I'm the AI-Concierge of the Demo Hotel am Wörthersee. How can I help you?";

  return (
    <div className="demo-page">
      <Link to="/" className="demo-back"><ArrowLeft size={16} /> {lang === 'de' ? 'Zurück' : 'Back'}</Link>

      <div className="demo-lang-switch">
        <button className={lang === 'de' ? 'active' : ''} onClick={() => setLang('de')}>DE</button>
        <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      </div>

      <div className="demo-header">
        <div className="demo-crown"><Bot size={30} /></div>
        <h2>DEMOHOTEL</h2>
      </div>

      <div className="demo-body">
        {messages.length === 0 && (
          <div className="demo-greeting">
            <h1>{lang === 'de' ? 'Hallo!' : 'Hello!'}</h1>
            <p>{greeting}</p>
          </div>
        )}

        <div className="demo-messages">
          {messages.map((m, i) => (
            <div className={`demo-message ${m.role}`} key={i}>{m.text}</div>
          ))}
          {typing && (
            <div className="demo-message ai typing-msg">
              <span className="typing"><i /><i /><i /></span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length === 0 && (
          <div className="demo-quick-grid">
            {quickQuestions[lang].map((q) => (
              <button key={q} className="demo-quick-btn" onClick={() => sendMessage(q)}>{q}</button>
            ))}
          </div>
        )}
      </div>

      <form
        className="demo-input-row"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === 'de' ? 'Nachricht schreiben' : 'Write a message'}
        />
        <button type="submit" aria-label="Send"><ArrowUp size={18} /></button>
      </form>

      <div className="demo-footer">⚡ by SimplyAI</div>
    </div>
  );
}