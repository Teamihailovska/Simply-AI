import './demo.css';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUp, Bot } from 'lucide-react';

type Lang = 'de' | 'en';
type ChatMessage = { role: 'guest' | 'ai'; text: string };

const quickQuestions: Record<Lang, string[]> = {
  de: [
    'Wann gibt es Frühstück?',
    'Wie lautet das WLAN-Passwort?',
    'Die Klimaanlage in meinem Zimmer funktioniert nicht.',
  ],
  en: [
    'When is breakfast served?',
    'What is the Wi-Fi password?',
    'The air conditioner in my room is broken.',
  ],
};

const text = {
  de: {
    back: 'Zurück',
    hello: 'Hallo!',
    greeting: 'Ich bin der AI-Concierge des Demo-Hotels. Wie kann ich Ihnen helfen?',
    room: 'Zimmernummer',
    roomPlaceholder: 'z. B. 101',
    name: 'Name (optional)',
    namePlaceholder: 'Ihr Name',
    messagePlaceholder: 'Nachricht schreiben',
    roomRequired: 'Bitte geben Sie zuerst Ihre Zimmernummer ein.',
    serverError: 'Der Concierge ist momentan nicht erreichbar. Bitte versuchen Sie es später erneut.',
    send: 'Nachricht senden',
    sending: 'Antwort wird geladen',
  },
  en: {
    back: 'Back',
    hello: 'Hello!',
    greeting: "I'm the AI concierge of the demo hotel. How can I help you?",
    room: 'Room number',
    roomPlaceholder: 'e.g. 101',
    name: 'Name (optional)',
    namePlaceholder: 'Your name',
    messagePlaceholder: 'Write a message',
    roomRequired: 'Please enter your room number first.',
    serverError: 'The concierge is unavailable right now. Please try again later.',
    send: 'Send message',
    sending: 'Loading reply',
  },
} as const;

function getSessionId(): string {
  const existing = sessionStorage.getItem('concierge-session-id');
  if (existing) return existing;

  const created = crypto.randomUUID();
  sessionStorage.setItem('concierge-session-id', created);
  return created;
}

export default function DemoPage() {
  const [lang, setLang] = useState<Lang>('de');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [room, setRoom] = useState('');
  const [guestName, setGuestName] = useState('');
  const [sending, setSending] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const t = text[lang];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  async function sendMessage(message: string) {
    const cleanMessage = message.trim();
    if (!cleanMessage || sending) return;

    if (!room.trim()) {
      setError(t.roomRequired);
      return;
    }

    setError('');
    setInput('');
    setMessages((previous) => [
      ...previous,
      { role: 'guest', text: cleanMessage },
    ]);
    setSending(true);
    setStarted(true);

    try {
      const apiUrl = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:3001';

      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: getSessionId(),
          room: room.trim(),
          guestName: guestName.trim() || 'Guest',
          message: cleanMessage,
          language: lang.toUpperCase(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.status}`);
      }

      const data: { reply?: string; escalated?: boolean } = await response.json();

      if (typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error('Chat response has no reply');
      }

      setMessages((previous) => [
        ...previous,
        { role: 'ai', text: data.reply! },
      ]);
    } catch (requestError) {
      console.error('Concierge chat error:', requestError);
      setError(t.serverError);
    } finally {
      setSending(false);
    }
  }

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="demo-page">
      <Link to="/" className="demo-back">
        <ArrowLeft size={16} /> {t.back}
      </Link>

      <div className="demo-lang-switch">
        <button
          type="button"
          className={lang === 'de' ? 'active' : ''}
          onClick={() => setLang('de')}
        >
          DE
        </button>
        <button
          type="button"
          className={lang === 'en' ? 'active' : ''}
          onClick={() => setLang('en')}
        >
          EN
        </button>
      </div>

      <div className="demo-header">
        <div className="demo-crown"><Bot size={30} /></div>
        <h2>DEMOHOTEL</h2>
      </div>

      <div className="demo-body">
        {messages.length === 0 && (
          <div className="demo-greeting">
            <h1>{t.hello}</h1>
            <p>{t.greeting}</p>
          </div>
        )}

        <div className="demo-messages">
          {messages.map((item, index) => (
            <div className={`demo-message ${item.role}`} key={index}>
              {item.text}
            </div>
          ))}

          {sending && (
            <div className="demo-message ai typing-msg" aria-label={t.sending}>
              <span className="typing"><i /><i /><i /></span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {!started && (
          <>
            <div style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
              margin: '16px 0',
            }}>
              <label>
                {t.room}
                <input
                  value={room}
                  onChange={(event) => setRoom(event.target.value)}
                  placeholder={t.roomPlaceholder}
                  disabled={sending}
                  maxLength={20}
                  style={{ display: 'block', padding: 10, marginTop: 6 }}
                />
              </label>

              <label>
                {t.name}
                <input
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                  placeholder={t.namePlaceholder}
                  disabled={sending}
                  maxLength={80}
                  style={{ display: 'block', padding: 10, marginTop: 6 }}
                />
              </label>
            </div>

            <div className="demo-quick-grid">
              {quickQuestions[lang].map((question) => (
                <button
                  type="button"
                  key={question}
                  className="demo-quick-btn"
                  onClick={() => void sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </>
        )}

        {error && (
          <p role="alert" style={{ color: '#b42318', textAlign: 'center' }}>
            {error}
          </p>
        )}
      </div>

      <form className="demo-input-row" onSubmit={submitMessage}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t.messagePlaceholder}
          disabled={sending}
          maxLength={2000}
        />
        <button type="submit" disabled={sending} aria-label={t.send}>
          <ArrowUp size={18} />
        </button>
      </form>

      <div className="demo-footer">⚡ by SimplyAI</div>
    </div>
  );
}