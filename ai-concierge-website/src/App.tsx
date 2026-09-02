import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BedDouble,
  BellRing,
  BookOpenCheck,
  Bot,
  ChevronRight,
  Globe2,
  Hotel,
  Languages,
  MessageCircleMore,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  UtensilsCrossed,
  Wifi,
  Zap,
} from 'lucide-react';

type Lang = 'de' | 'en';

const copy = {
  de: {
    nav: ['Vorteile', 'Funktionen', 'Ablauf', 'Kontakt'],
    demo: 'Live-Demo öffnen',
    eyebrow: '24/7 DIGITALER GÄSTESERVICE',
    heroTitleA: 'Der KI-Concierge',
    heroTitleB: 'für moderne Hotels.',
    heroText: 'Sofortige Antworten für Gäste, weniger Routinearbeit für Ihr Team und mehr Chancen für Zusatzverkäufe.',
    heroPrimary: 'Demo ansehen',
    heroSecondary: 'Beratung anfragen',
    stat1: '24/7', stat1Text: 'für Ihre Gäste erreichbar',
    stat2: '90 %', stat2Text: 'der Gästeanfragen automatisierbar',
    stat3: '1 System', stat3Text: 'für Service, Weiterleitung & Upselling',
    problemEyebrow: 'DIE HERAUSFORDERUNG',
    problemTitle: 'Gäste erwarten sofortigen Service. Ihr Team hat Wichtigeres zu tun.',
    problemText: 'Sprachliche Barrieren, Fachkräftemangel und steigende Erwartungen machen wiederkehrende Gästeanfragen zu einer täglichen Belastung.',
    solutionEyebrow: 'DIE LÖSUNG',
    solutionTitle: 'Ein Concierge, der niemals schläft.',
    solutionText: 'Der KI-Concierge beantwortet Fragen, unterstützt Buchungen und Zimmerservice, sammelt Feedback und leitet besondere Anliegen direkt an die zuständige Fachkraft weiter.',
    featuresEyebrow: 'FUNKTIONEN',
    featuresTitle: 'Alles, was Gäste brauchen. Direkt im Gespräch.',
    processEyebrow: 'SO FUNKTIONIERT ES',
    processTitle: 'Vom Gast zur richtigen Antwort – oder zum richtigen Menschen.',
    process: [
      ['01', 'Gast fragt', 'Fragen zu WLAN, Frühstück, Check-out, Spa, Restaurant oder Services.'],
      ['02', 'KI antwortet', 'Der Concierge liefert sofort verständliche Antworten in der Sprache des Gastes.'],
      ['03', 'Anliegen wird erledigt', 'Buchungen, Feedback oder Anfragen werden verarbeitet oder an das Team weitergeleitet.'],
    ],
    outcomeEyebrow: 'ERGEBNIS',
    outcomeTitle: 'Zufriedene Gäste. Entlastete Fachkräfte. Mehr Zusatzverkäufe.',
    outcomeText: 'Der KI-Concierge macht wiederkehrenden Service skalierbar, ohne die persönliche Betreuung bei wichtigen Anliegen zu ersetzen.',
    ctaTitle: 'Bereit für 24/7 Gästeservice?',
    ctaText: 'Sehen Sie sich die Demo an oder sprechen Sie direkt mit SimplyAI über den Einsatz in Ihrem Hotel.',
    address: 'Sandgasse 36/IV, 8010 Graz',
    phone: '+43 681 20658347',
    footer: 'AI-Concierge by SimplyAI',
  },
  en: {
    nav: ['Benefits', 'Features', 'How it works', 'Contact'],
    demo: 'Open live demo',
    eyebrow: '24/7 DIGITAL GUEST SERVICE',
    heroTitleA: 'The AI Concierge',
    heroTitleB: 'for modern hotels.',
    heroText: 'Instant guest answers, less repetitive work for your team, and more opportunities for hotel upselling.',
    heroPrimary: 'View demo',
    heroSecondary: 'Request consultation',
    stat1: '24/7', stat1Text: 'available for your guests',
    stat2: '90%', stat2Text: 'of guest requests can be automated',
    stat3: '1 system', stat3Text: 'for service, routing & upselling',
    problemEyebrow: 'THE CHALLENGE',
    problemTitle: 'Guests expect instant service. Your team has more important work to do.',
    problemText: 'Language barriers, staff shortages, and rising expectations turn repetitive guest questions into a daily burden.',
    solutionEyebrow: 'THE SOLUTION',
    solutionTitle: 'A concierge that never sleeps.',
    solutionText: 'The AI Concierge answers questions, supports bookings and room service, collects feedback, and routes specific requests to the right staff member.',
    featuresEyebrow: 'FEATURES',
    featuresTitle: 'Everything guests need. Right inside the conversation.',
    processEyebrow: 'HOW IT WORKS',
    processTitle: 'From guest question to the right answer — or the right person.',
    process: [
      ['01', 'Guest asks', 'Questions about Wi-Fi, breakfast, checkout, spa, restaurant, or hotel services.'],
      ['02', 'AI responds', 'The concierge instantly provides clear answers in the guest’s language.'],
      ['03', 'Request gets handled', 'Bookings, feedback, or requests are processed or routed to the hotel team.'],
    ],
    outcomeEyebrow: 'OUTCOME',
    outcomeTitle: 'Happier guests. Relieved staff. More upselling.',
    outcomeText: 'The AI Concierge makes repetitive service scalable without replacing personal care where it matters.',
    ctaTitle: 'Ready for 24/7 guest service?',
    ctaText: 'Explore the demo or speak directly with SimplyAI about using AI Concierge in your hotel.',
    address: 'Sandgasse 36/IV, 8010 Graz',
    phone: '+43 681 20658347',
    footer: 'AI-Concierge by SimplyAI',
  },
};

const features = [
  { icon: MessageCircleMore, de: 'Sofortige Antworten', en: 'Instant answers', deText: 'Gäste erhalten rund um die Uhr Antworten auf wiederkehrende Fragen.', enText: 'Guests receive round-the-clock answers to repetitive questions.' },
  { icon: BookOpenCheck, de: 'Buchungen & Reservierungen', en: 'Bookings & reservations', deText: 'Unterstützt Buchungen, Reservierungen und weitere Serviceanfragen.', enText: 'Supports bookings, reservations, and service requests.' },
  { icon: UtensilsCrossed, de: 'Zimmerservice', en: 'Room service', deText: 'Gäste können Zimmerservice und hotelbezogene Leistungen digital anfragen.', enText: 'Guests can request room service and hotel services digitally.' },
  { icon: Languages, de: 'Mehrsprachig', en: 'Multilingual', deText: 'Jeder Gast fühlt sich in der eigenen Sprache verstanden.', enText: 'Every guest can feel understood in their own language.' },
  { icon: BellRing, de: 'Intelligente Weiterleitung', en: 'Smart routing', deText: 'Spezifische Anliegen werden an die zuständige Fachkraft weitergeleitet.', enText: 'Specific requests are routed to the responsible staff member.' },
  { icon: ShoppingBag, de: 'Upselling', en: 'Upselling', deText: 'Der Concierge bewirbt hoteleigene Produkte und Dienstleistungen.', enText: 'The concierge promotes hotel products and services.' },
  { icon: Star, de: 'Gäste-Feedback', en: 'Guest feedback', deText: 'Feedback kann automatisch und frühzeitig gesammelt werden.', enText: 'Guest feedback can be collected automatically and early.' },
  { icon: ShieldCheck, de: 'Datenschutzkonform', en: 'Privacy compliant', deText: 'Einfach einsetzbar und auf datenschutzkonformen Betrieb ausgelegt.', enText: 'Easy to deploy and designed for privacy-compliant operation.' },
];

function App() {
  const [lang, setLang] = useState<Lang>('de');
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <a href="#top" className="brand" aria-label="AI Concierge home">
          <img src="/ai-concierge-logo.svg" alt="SimplyAI AI-Concierge" />
        </a>
        <nav className="desktop-nav">
          <a href="#benefits">{t.nav[0]}</a>
          <a href="#features">{t.nav[1]}</a>
          <a href="#process">{t.nav[2]}</a>
          <a href="#contact">{t.nav[3]}</a>
        </nav>
        <div className="nav-actions">
          <div className="lang-switch" aria-label="Language switcher">
            <button className={lang === 'de' ? 'active' : ''} onClick={() => setLang('de')}>DE</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <a className="btn btn-small btn-light" href="https://demo.simplyai.at" target="_blank" rel="noreferrer">{t.demo}</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wave-field" aria-hidden="true">
            <span className="wave wave-1" />
            <span className="wave wave-2" />
            <span className="wave wave-3" />
            <span className="wave wave-4" />
          </div>

          <div className="hero-copy">
            <div className="eyebrow light"><Sparkles size={16} /> {t.eyebrow}</div>
            <h1>{t.heroTitleA}<br /><span>{t.heroTitleB}</span></h1>
            <p>{t.heroText}</p>
            <div className="hero-buttons">
              <a className="btn btn-primary" href="https://demo.simplyai.at" target="_blank" rel="noreferrer">{t.heroPrimary}<ArrowRight size={18} /></a>
              <a className="btn btn-ghost" href="#contact">{t.heroSecondary}</a>
            </div>
          </div>

          <div className="hero-visual" aria-label="AI Concierge conversation preview">
            <div className="phone-card">
              <div className="phone-top"><Bot size={18} /><span>AI Concierge</span><span className="online-dot" /></div>
              <div className="chat-space">
                <div className="message guest">What time is breakfast?</div>
                <div className="message ai">Breakfast is served from 07:00–10:30. Would you like me to reserve a table?</div>
                <div className="quick-row"><span>Restaurant</span><span>Spa</span><span>Room service</span></div>
                <div className="typing"><i /><i /><i /></div>
              </div>
            </div>
            <div className="float-chip chip-1"><Wifi size={16} /> Wi-Fi</div>
            <div className="float-chip chip-2"><UtensilsCrossed size={16} /> Room Service</div>
            <div className="float-chip chip-3"><BedDouble size={16} /> Stay</div>
            <div className="float-chip chip-4"><Globe2 size={16} /> 24/7</div>
          </div>
        </section>

        <section className="stats" id="benefits">
          <article><strong>{t.stat1}</strong><span>{t.stat1Text}</span></article>
          <article><strong>{t.stat2}</strong><span>{t.stat2Text}</span></article>
          <article><strong>{t.stat3}</strong><span>{t.stat3Text}</span></article>
        </section>

        <section className="split-section">
          <div>
            <div className="eyebrow">{t.problemEyebrow}</div>
            <h2>{t.problemTitle}</h2>
          </div>
          <div className="problem-card">
            <p>{t.problemText}</p>
            <div className="mini-grid">
              <span><Hotel /> Fachkräftemangel</span>
              <span><Languages /> Sprachbarrieren</span>
              <span><Zap /> Gestiegene Erwartungen</span>
              <span><Wifi /> Wiederkehrende Fragen</span>
            </div>
          </div>
        </section>

        <section className="solution-band">
          <div className="solution-orb"><Bot size={64} /></div>
          <div>
            <div className="eyebrow light">{t.solutionEyebrow}</div>
            <h2>{t.solutionTitle}</h2>
            <p>{t.solutionText}</p>
          </div>
        </section>

        <section className="feature-section" id="features">
          <div className="section-heading">
            <div className="eyebrow">{t.featuresEyebrow}</div>
            <h2>{t.featuresTitle}</h2>
          </div>
          <div className="feature-grid">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="feature-card" key={item.de}>
                  <div className="feature-index">0{index + 1}</div>
                  <div className="feature-icon"><Icon /></div>
                  <h3>{lang === 'de' ? item.de : item.en}</h3>
                  <p>{lang === 'de' ? item.deText : item.enText}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="section-heading center">
            <div className="eyebrow light">{t.processEyebrow}</div>
            <h2>{t.processTitle}</h2>
          </div>
          <div className="process-grid">
            {t.process.map(([num, title, text]) => (
              <article key={num}>
                <div className="process-num">{num}</div>
                <h3>{title}</h3>
                <p>{text}</p>
                <ChevronRight className="process-arrow" />
              </article>
            ))}
          </div>
        </section>

        <section className="outcome-section">
          <div className="outcome-content">
            <div className="eyebrow">{t.outcomeEyebrow}</div>
            <h2>{t.outcomeTitle}</h2>
            <p>{t.outcomeText}</p>
          </div>
          <div className="outcome-visual">
            <div className="orbit orbit-a" /><div className="orbit orbit-b" />
            <div className="outcome-core"><Sparkles size={34} /><span>AI</span></div>
            <span className="orbit-label label-a">Guests</span>
            <span className="orbit-label label-b">Team</span>
            <span className="orbit-label label-c">Revenue</span>
          </div>
        </section>

        <section className="cta-section" id="contact">
          <div>
            <div className="eyebrow light">CONTACT</div>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </div>
          <div className="cta-actions">
            <a className="btn btn-primary" href="https://demo.simplyai.at" target="_blank" rel="noreferrer">{t.heroPrimary}<ArrowRight size={18} /></a>
            <a className="contact-row" href="tel:+4368120658347"><Phone size={18} />{t.phone}</a>
            <span className="contact-row"><Hotel size={18} />{t.address}</span>
          </div>
        </section>
      </main>

      <footer>
        <img src="/ai-concierge-logo.svg" alt="SimplyAI" />
        <span>{t.footer}</span>
        <span>© 2026 SimplyAI</span>
      </footer>
    </div>
  );
}

export default App;
