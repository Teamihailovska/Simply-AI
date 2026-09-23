import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import './admin.css';

type Lang = 'de' | 'en';
type Tab = 'requests' | 'conversations' | 'faqs';

type Conversation = {
  id: string;
  room: string | null;
  guest_name: string | null;
  outcome: string | null;
  created_at: string;
};

type Message = {
  id: string;
  sender: string;
  content: string;
  created_at: string;
};

type Escalation = {
  id: string;
  conversation_id: string;
  room: string | null;
  guest_name: string | null;
  type: string;
  message: string;
  status: string;
  created_at: string;
};

type Faq = {
  id: string;
  question: string;
  answer: string;
};

const translations = {
  de: {
    checking: 'Anmeldung wird geprüft…',
    loginTitle: 'Anmeldung für Mitarbeitende',
    loginDescription: 'Melden Sie sich mit Ihrem freigeschalteten Konto an.',
    email: 'E-Mail',
    password: 'Passwort',
    login: 'Anmelden',
    accessDenied: 'Kein Zugriff',
    accessDescription: 'Dieses Konto ist nicht als Administrator freigeschaltet.',
    logout: 'Abmelden',
    heading: 'Rezeption',
    subtitle: 'Gästeanfragen und Hotelinformationen',
    refresh: 'Aktualisieren',
    openRequests: 'Offene Anfragen',
    conversations: 'Gespräche',
    hotelInformation: 'Hotelinformationen',
    requests: 'Anfragen',
    staffRequests: 'Anfragen an das Personal',
    noRequests: 'Noch keine Anfragen.',
    room: 'Zimmer',
    guest: 'Gast',
    inProgress: 'In Bearbeitung',
    resolved: 'Erledigt',
    openConversation: 'Gespräch öffnen',
    guestConversations: 'Gästegespräche',
    noConversations: 'Noch keine Gespräche.',
    noMessages: 'Keine Nachrichten in diesem Gespräch.',
    selectConversation: 'Wählen Sie ein Gespräch aus.',
    faqDescription: 'Der AI-Concierge verwendet diese Antworten bei jeder Nachricht.',
    question: 'Frage',
    answer: 'Antwort',
    saveChanges: 'Änderungen speichern',
    addInformation: 'Information hinzufügen',
    cancel: 'Abbrechen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    deleteQuestion: 'Diesen FAQ-Eintrag löschen?',
    open: 'Offen',
    escalated: 'Weitergeleitet',
    ai: 'AI',
    staff: 'Personal',
  },
  en: {
    checking: 'Checking sign-in…',
    loginTitle: 'Staff sign-in',
    loginDescription: 'Sign in with your approved account.',
    email: 'Email',
    password: 'Password',
    login: 'Sign in',
    accessDenied: 'Access denied',
    accessDescription: 'This account is not approved as an administrator.',
    logout: 'Sign out',
    heading: 'Reception',
    subtitle: 'Guest requests and hotel information',
    refresh: 'Refresh',
    openRequests: 'Open requests',
    conversations: 'Conversations',
    hotelInformation: 'Hotel information',
    requests: 'Requests',
    staffRequests: 'Staff requests',
    noRequests: 'No requests yet.',
    room: 'Room',
    guest: 'Guest',
    inProgress: 'In progress',
    resolved: 'Resolved',
    openConversation: 'Open conversation',
    guestConversations: 'Guest conversations',
    noConversations: 'No conversations yet.',
    noMessages: 'No messages in this conversation.',
    selectConversation: 'Select a conversation.',
    faqDescription: 'The AI concierge uses these answers for every message.',
    question: 'Question',
    answer: 'Answer',
    saveChanges: 'Save changes',
    addInformation: 'Add information',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    deleteQuestion: 'Delete this FAQ entry?',
    open: 'Open',
    escalated: 'Escalated',
    ai: 'AI',
    staff: 'Staff',
  },
} as const;

export default function AdminPage() {
  const [lang, setLang] = useState<Lang>('de');
  const t = translations[lang];

  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const [tab, setTab] = useState<Tab>('requests');
  const [requests, setRequests] = useState<Escalation[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingFaq, setEditingFaq] = useState<string | null>(null);

  const formatDate = (value: string) =>
    new Date(value).toLocaleString(lang === 'de' ? 'de-DE' : 'en-GB');

  const statusLabel = (status: string) => {
    if (status === 'Open') return t.open;
    if (status === 'In progress') return t.inProgress;
    if (status === 'Resolved') return t.resolved;
    if (status === 'Escalated') return t.escalated;
    return status;
  };

  const senderLabel = (sender: string) => {
    if (sender === 'guest') return t.guest;
    if (sender === 'staff') return t.staff;
    if (sender === 'ai') return t.ai;
    return sender;
  };

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data, error: authError }) => {
      if (!active) return;
      setSession(data.session);
      setChecking(false);
      if (authError) setError(authError.message);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setChecking(false);
      setAuthorized(false);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) return;
    let active = true;

    supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data, error: lookupError }) => {
        if (!active) return;
        setAuthorized(!!data && !lookupError);
        if (lookupError) setError(lookupError.message);
      });

    return () => {
      active = false;
    };
  }, [session]);

  const refresh = useCallback(async () => {
    const [requestResult, conversationResult, faqResult] = await Promise.all([
      supabase
        .from('escalations')
        .select('id,conversation_id,room,guest_name,type,message,status,created_at')
        .order('created_at', { ascending: false })
        .limit(100),
      supabase
        .from('conversations')
        .select('id,room,guest_name,outcome,created_at')
        .order('created_at', { ascending: false })
        .limit(100),
      supabase
        .from('faqs')
        .select('id,question,answer')
        .order('created_at', { ascending: false })
        .limit(100),
    ]);

    const failure = requestResult.error || conversationResult.error || faqResult.error;
    if (failure) {
      setError(failure.message);
      return;
    }

    setRequests(requestResult.data || []);
    setConversations(conversationResult.data || []);
    setFaqs(faqResult.data || []);
    setError('');
  }, []);

  useEffect(() => {
    if (!authorized) return;

    void refresh();
    const timer = window.setInterval(() => void refresh(), 15000);
    return () => window.clearInterval(timer);
  }, [authorized, refresh]);

  useEffect(() => {
    if (!authorized || !selected) {
      setMessages([]);
      return;
    }

    let active = true;

    supabase
      .from('messages')
      .select('id,sender,content,created_at')
      .eq('conversation_id', selected)
      .order('created_at', { ascending: true })
      .limit(200)
      .then(({ data, error: lookupError }) => {
        if (!active) return;
        if (lookupError) setError(lookupError.message);
        else setMessages(data || []);
      });

    return () => {
      active = false;
    };
  }, [authorized, selected, conversations]);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setError('');
    setBusy(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) setError(authError.message);
    setBusy(false);
  }

  async function setStatus(item: Escalation, status: string) {
    setBusy(true);

    const { error: updateError } = await supabase
      .from('escalations')
      .update({ status })
      .eq('id', item.id);

    if (updateError) setError(updateError.message);
    else await refresh();

    setBusy(false);
  }

  async function saveFaq(event: FormEvent) {
    event.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    setBusy(true);
    const payload = {
      question: question.trim(),
      answer: answer.trim(),
    };

    const { error: saveError } = editingFaq
      ? await supabase.from('faqs').update(payload).eq('id', editingFaq)
      : await supabase.from('faqs').insert(payload);

    if (saveError) {
      setError(saveError.message);
    } else {
      setQuestion('');
      setAnswer('');
      setEditingFaq(null);
      await refresh();
    }

    setBusy(false);
  }

  async function deleteFaq(id: string) {
    if (!window.confirm(t.deleteQuestion)) return;

    const { error: deleteError } = await supabase.from('faqs').delete().eq('id', id);

    if (deleteError) setError(deleteError.message);
    else await refresh();
  }

  const languageButtons = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 16 }}>
      <button
        type="button"
        className={lang === 'de' ? '' : 'admin-secondary'}
        onClick={() => setLang('de')}
      >
        DE
      </button>
      <button
        type="button"
        className={lang === 'en' ? '' : 'admin-secondary'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </div>
  );

  if (checking) {
    return <main className="admin-shell"><p>{t.checking}</p></main>;
  }

  if (!session) {
    return (
      <main className="admin-shell">
        {languageButtons}
        <div className="admin-login">
          <section className="admin-card">
            <span className="admin-eyebrow">SIMPLYAI / CONCIERGE</span>
            <h1>{t.loginTitle}</h1>
            <p>{t.loginDescription}</p>

            <form onSubmit={signIn}>
              <label>
                {t.email}
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label>
                {t.password}
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <button disabled={busy}>{t.login}</button>
            </form>

            {error && <p role="alert" className="admin-error">{error}</p>}
          </section>
        </div>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="admin-shell">
        {languageButtons}
        <div className="admin-login">
          <section className="admin-card">
            <h1>{t.accessDenied}</h1>
            <p>{t.accessDescription}</p>
            {error && <p role="alert" className="admin-error">{error}</p>}
            <button onClick={() => void supabase.auth.signOut()}>{t.logout}</button>
          </section>
        </div>
      </main>
    );
  }

  const activeRequests = requests.filter((item) => item.status !== 'Resolved').length;

  return (
    <main className="admin-shell">
      <div className="admin-container">
        {languageButtons}

        <header className="admin-header">
          <div>
            <span className="admin-eyebrow">SIMPLYAI / HOTEL CONCIERGE</span>
            <h1>{t.heading}</h1>
            <p>{t.subtitle}</p>
          </div>
          <div className="admin-header-actions">
            <span>{session.user.email}</span>
            <button className="admin-secondary" onClick={() => void refresh()}>
              {t.refresh}
            </button>
            <button className="admin-secondary" onClick={() => void supabase.auth.signOut()}>
              {t.logout}
            </button>
          </div>
        </header>

        <div className="admin-stats">
          <div><span>{t.openRequests}</span><strong>{activeRequests}</strong></div>
          <div><span>{t.conversations}</span><strong>{conversations.length}</strong></div>
          <div><span>{t.hotelInformation}</span><strong>{faqs.length}</strong></div>
        </div>

        <nav className="admin-tabs" aria-label="Admin sections">
          <button
            className={tab === 'requests' ? 'active' : ''}
            onClick={() => setTab('requests')}
          >
            {t.requests} <span>{activeRequests}</span>
          </button>
          <button
            className={tab === 'conversations' ? 'active' : ''}
            onClick={() => setTab('conversations')}
          >
            {t.conversations}
          </button>
          <button
            className={tab === 'faqs' ? 'active' : ''}
            onClick={() => setTab('faqs')}
          >
            FAQ
          </button>
        </nav>

        {error && <p role="alert" className="admin-error">{error}</p>}

        {tab === 'requests' && (
          <section className="admin-panel">
            <h2>{t.staffRequests}</h2>
            {requests.length === 0 ? (
              <p className="admin-empty">{t.noRequests}</p>
            ) : (
              <div className="admin-list">
                {requests.map((item) => (
                  <article className="admin-item" key={item.id}>
                    <div className="admin-item-head">
                      <strong>{item.type}</strong>
                      <span className="admin-pill">{statusLabel(item.status)}</span>
                    </div>
                    <p>{item.message}</p>
                    <small>
                      {t.room} {item.room || '—'} · {item.guest_name || t.guest} ·{' '}
                      {formatDate(item.created_at)}
                    </small>
                    <div className="admin-actions">
                      <button
                        className="admin-secondary"
                        disabled={busy || item.status === 'In progress'}
                        onClick={() => void setStatus(item, 'In progress')}
                      >
                        {t.inProgress}
                      </button>
                      <button
                        disabled={busy || item.status === 'Resolved'}
                        onClick={() => void setStatus(item, 'Resolved')}
                      >
                        {t.resolved}
                      </button>
                      <button
                        className="admin-secondary"
                        onClick={() => {
                          setSelected(item.conversation_id);
                          setTab('conversations');
                        }}
                      >
                        {t.openConversation}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {tab === 'conversations' && (
          <section className="admin-panel">
            <h2>{t.guestConversations}</h2>
            <div className="admin-conversations">
              <div className="admin-list">
                {conversations.length === 0 ? (
                  <p className="admin-empty">{t.noConversations}</p>
                ) : (
                  conversations.map((item) => (
                    <button
                      className={`admin-conversation ${selected === item.id ? 'selected' : ''}`}
                      key={item.id}
                      onClick={() => setSelected(item.id)}
                    >
                      <strong>
                        {item.guest_name || t.guest} · {t.room} {item.room || '—'}
                      </strong>
                      <small>
                        {statusLabel(item.outcome || 'Open')} · {formatDate(item.created_at)}
                      </small>
                    </button>
                  ))
                )}
              </div>

              <div className="admin-transcript">
                {!selected ? (
                  <p className="admin-empty">{t.selectConversation}</p>
                ) : messages.length === 0 ? (
                  <p className="admin-empty">{t.noMessages}</p>
                ) : (
                  messages.map((item) => (
                    <div className={`admin-message ${item.sender}`} key={item.id}>
                      <small>
                        {senderLabel(item.sender)} · {formatDate(item.created_at)}
                      </small>
                      <p>{item.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {tab === 'faqs' && (
          <section className="admin-panel">
            <h2>{t.hotelInformation}</h2>
            <p>{t.faqDescription}</p>

            <form className="admin-faq-form" onSubmit={saveFaq}>
              <label>
                {t.question}
                <input
                  required
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="What time is breakfast?"
                />
              </label>
              <label>
                {t.answer}
                <textarea
                  required
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  placeholder="Breakfast is served…"
                />
              </label>
              <div className="admin-actions">
                <button disabled={busy}>
                  {editingFaq ? t.saveChanges : t.addInformation}
                </button>
                {editingFaq && (
                  <button
                    type="button"
                    className="admin-secondary"
                    onClick={() => {
                      setEditingFaq(null);
                      setQuestion('');
                      setAnswer('');
                    }}
                  >
                    {t.cancel}
                  </button>
                )}
              </div>
            </form>

            <div className="admin-list">
              {faqs.map((item) => (
                <article className="admin-item" key={item.id}>
                  <strong>{item.question}</strong>
                  <p>{item.answer}</p>
                  <div className="admin-actions">
                    <button
                      className="admin-secondary"
                      onClick={() => {
                        setEditingFaq(item.id);
                        setQuestion(item.question);
                        setAnswer(item.answer);
                      }}
                    >
                      {t.edit}
                    </button>
                    <button
                      className="admin-secondary"
                      onClick={() => void deleteFaq(item.id)}
                    >
                      {t.delete}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}