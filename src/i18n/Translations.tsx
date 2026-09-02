export type Lang = 'de' | 'en';

export interface Translations {
  nav: {
    services: string;
    projects: string;
    workshops: string;
    about: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    headline1: string;
    headlineAI: string;
    headline2: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    sectionLabel: string;
    heading: string;
    sub: string;
    items: { number: string; title: string; desc: string }[];
  };
  trust: {
    sectionLabel: string;
    heading: string;
    clients: string;
    partners: string;
    supported: string;
    clientList: string[];
    partnerList: string[];
  };
  projects: {
    sectionLabel: string;
    heading: string;
    sub: string;
    items: { number: string; title: string; category: string; desc: string }[];
  };
  process: {
    sectionLabel: string;
    heading: string;
    sub: string;
    steps: { number: string; title: string; desc: string }[];
  };
  workshops: {
    sectionLabel: string;
    heading: string;
    sub: string;
    desc: string;
    features: string[];
    cta: string;
  };
  finalCta: {
    heading: string;
    sub: string;
    cta: string;
  };
  contact: {
    sectionLabel: string;
    heading: string;
    sub: string;
    name: string;
    email: string;
    concern: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    concernPlaceholder: string;
    submit: string;
    successTitle: string;
    successDesc: string;
    errorDesc: string;
  };
  footer: {
    tagline: string;
    company: string;
    companyLinks: string;
    legal: string;
    agb: string;
    impressum: string;
    datenschutz: string;
    doku: string;
    copyright: string;
    location: string;
  };
  // Sub-page content
  leistungenPage: {
    heading: string;
    sub: string;
    items: { title: string; desc: string; details: string[] }[];
  };
  projektePageContent: {
    heading: string;
    sub: string;
    items: { number: string; title: string; category: string; desc: string; outcome: string }[];
  };
  workshopsPageContent: {
    heading: string;
    sub: string;
    formats: { title: string; desc: string; duration: string; audience: string }[];
    contactCta: string;
  };
  uberUns: {
    heading: string;
    sub: string;
    missionLabel: string;
    mission: string;
    focusLabel: string;
    focus: string;
    locationLabel: string;
    location: string;
  };
  legal: {
    placeholderNote: string;
    agbHeading: string;
    impressumHeading: string;
    datenschutzHeading: string;
    dokuHeading: string;
  };
}

const de: Translations = {
  nav: {
    services: 'Leistungen',
    projects: 'Projekte',
    workshops: 'Workshops',
    about: 'Über uns',
    cta: 'Erstgespräch',
  },
  hero: {
    eyebrow: 'Spezialisiert auf Bau & Immobilien',
    headline1: 'Your ',
    headlineAI: 'AI',
    headline2: ' – but simple',
    sub: 'Individuelle KI-Lösungen für Ihre Anforderungen.',
    ctaPrimary: 'Kostenloses Erstgespräch',
    ctaSecondary: 'Leistungen ansehen',
  },
  services: {
    sectionLabel: 'FIG 1.1 — LEISTUNGEN',
    heading: 'Was wir für Sie bauen',
    sub: 'Maßgeschneiderte KI-Lösungen, die echten Mehrwert liefern — spezialisiert auf Bau & Immobilien.',
    items: [
      {
        number: '01',
        title: 'Prozessoptimierung durch KI-Agenten',
        desc: 'Intelligente Automatisierung wiederkehrender Prozesse durch autonome KI-Agenten — präzise, zuverlässig und skalierbar.',
      },
      {
        number: '02',
        title: 'Maßgeschneiderte KI-Modelle',
        desc: 'Individuelle Machine-Learning-Modelle, die auf Ihre Daten und Ziele trainiert werden — kein Off-the-Shelf.',
      },
      {
        number: '03',
        title: 'Prognosemodelle',
        desc: 'Datenbasierte Vorhersagemodelle für Kostenentwicklung, Nachfrage und Marktbewegungen in der Baubranche.',
      },
      {
        number: '04',
        title: 'RAG-Wissensdatenbank',
        desc: 'Retrieval-Augmented Generation: Ihre internen Dokumente werden zur intelligenten, durchsuchbaren Wissensbasis.',
      },
      {
        number: '05',
        title: 'Datenanalyse',
        desc: 'Strukturierte Analyse Ihrer Unternehmensdaten — von der Rohdatenaufbereitung bis zum strategischen Insight.',
      },
    ],
  },
  trust: {
    sectionLabel: 'FIG 1.2 — REFERENZEN',
    heading: 'Vertrauen in KI — gemeinsam aufgebaut',
    clients: 'Kunden',
    partners: 'Partner',
    supported: 'Gefördert durch',
    clientList: ['Kostmann', 'Cosuno', 'Duramea', 'Sophora', 'BWI'],
    partnerList: ['FFG', 'SFG', 'Science Park Graz'],
  },
  projects: {
    sectionLabel: 'FIG 1.3 — PROJEKTE',
    heading: 'KI-Projekte aus der Praxis',
    sub: 'Reale Anwendungen, die echten Mehrwert geschaffen haben.',
    items: [
      {
        number: '01',
        title: 'Baupreisvorhersage',
        category: 'Prognosemodelle',
        desc: 'Ein Machine-Learning-Modell prognostiziert Baupreise auf Basis historischer Daten, Marktindikatoren und regionaler Faktoren.',
      },
      {
        number: '02',
        title: 'KI-gestützt im Sekretariat',
        category: 'Prozessautomatisierung',
        desc: 'Automatisierte Dokumentenverarbeitung, Terminplanung und E-Mail-Routing durch einen KI-Agenten im Sekretariat.',
      },
      {
        number: '03',
        title: 'KI-Agent mit Wissensdatenbank',
        category: 'RAG / Kundenservice & Support',
        desc: 'Ein RAG-basierter KI-Agent ermöglicht es Support-Teams, sofort präzise Antworten aus internen Dokumenten zu generieren.',
      },
    ],
  },
  process: {
    sectionLabel: 'FIG 1.4 — VORGEHEN',
    heading: 'So arbeiten wir',
    sub: 'Strukturiert, transparent und auf Ihre Ziele ausgerichtet.',
    steps: [
      { number: '01', title: 'Analyse', desc: 'Verstehen Ihrer Prozesse, Daten und Ziele.' },
      { number: '02', title: 'Konzept', desc: 'Den Anwendungsfall mit dem größten Hebel definieren.' },
      { number: '03', title: 'Entwicklung', desc: 'Aufbau und Training Ihrer individuellen KI-Lösung.' },
      { number: '04', title: 'Integration', desc: 'Nahtlose Einbindung in Ihre Systeme, inklusive Betreuung.' },
    ],
  },
  workshops: {
    sectionLabel: 'FIG 1.5 — WORKSHOPS',
    heading: 'KI verstehen. KI anwenden.',
    sub: 'Praxisnahe Workshops für Unternehmen',
    desc: 'Unsere Workshops vermitteln KI-Wissen, das in der Praxis wirkt — verständlich, relevant und direkt anwendbar auf Ihre Branche.',
    features: [
      'Praxisnah & verständlich',
      'Auf Ihr Unternehmen zugeschnitten',
      'Branchenspezifische Anwendungsfälle',
      'Sofort umsetzbare Erkenntnisse',
    ],
    cta: 'Workshop anfragen',
  },
  finalCta: {
    heading: 'Bereit, die Zukunft mit KI zu gestalten?',
    sub: 'Ob Frage, Idee oder Projekt – wir sind hier, um zu helfen.',
    cta: 'Kostenloses Erstgespräch',
  },
  contact: {
    sectionLabel: 'FIG 1.6 — KONTAKT',
    heading: 'Sprechen wir.',
    sub: 'Kostenloses Erstgespräch vereinbaren — unverbindlich und direkt.',
    name: 'Name',
    email: 'E-Mail',
    concern: 'Anliegen',
    namePlaceholder: 'Ihr vollständiger Name',
    emailPlaceholder: 'ihre@email.at',
    concernPlaceholder: 'Beschreiben Sie Ihr Anliegen oder Ihr Projekt ...',
    submit: 'Kostenloses Erstgespräch vereinbaren',
    successTitle: 'Nachricht gesendet',
    successDesc: 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.',
    errorDesc: 'Leider ist etwas schiefgelaufen. Bitte versuchen Sie es später erneut.',
  },
  footer: {
    tagline: 'Individuelle KI-Lösungen für Bau & Immobilien.',
    company: 'Unternehmen',
    companyLinks: 'Seiten',
    legal: 'Rechtliches',
    agb: 'AGB',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    doku: 'Dokumentation',
    copyright: '© 2026 SimplyAI GmbH',
    location: 'Graz, Österreich',
  },
  leistungenPage: {
    heading: 'Unsere Leistungen',
    sub: 'KI-Lösungen, die auf Ihre Branche, Ihre Daten und Ihre Ziele zugeschnitten sind.',
    items: [
      {
        title: 'Prozessoptimierung durch KI-Agenten',
        desc: 'Intelligente Automatisierung wiederkehrender Prozesse durch autonome KI-Agenten.',
        details: ['Dokumentenverarbeitung', 'Workflow-Automatisierung', 'E-Mail-Routing & Priorisierung', 'Autonome Reporting-Agenten'],
      },
      {
        title: 'Maßgeschneiderte KI-Modelle',
        desc: 'Individuelle Machine-Learning-Modelle, trainiert auf Ihre spezifischen Daten und Anforderungen.',
        details: ['Klassifikationsmodelle', 'Regressionsanalysen', 'Anomalieerkennung', 'Empfehlungssysteme'],
      },
      {
        title: 'Prognosemodelle',
        desc: 'Datenbasierte Vorhersagemodelle für präzise Planungsgrundlagen.',
        details: ['Baupreisvorhersage', 'Nachfrageprognosen', 'Ressourcenplanung', 'Marktentwicklungsmodelle'],
      },
      {
        title: 'RAG-Wissensdatenbank',
        desc: 'Retrieval-Augmented Generation — Ihre Dokumente werden zur intelligenten Wissensbasis.',
        details: ['Interne Dokumentensuche', 'Kundenservice-KI', 'Technische Dokumentation', 'Compliance & Richtlinien'],
      },
      {
        title: 'Datenanalyse',
        desc: 'Vom Rohdaten-Chaos zum strategischen Insight.',
        details: ['Datenaufbereitung & Bereinigung', 'Exploratory Data Analysis', 'Dashboards & Visualisierungen', 'Strategische Empfehlungen'],
      },
    ],
  },
  projektePageContent: {
    heading: 'Unsere Projekte',
    sub: 'Reale KI-Anwendungen, die messbaren Mehrwert geschaffen haben.',
    items: [
      {
        number: '01',
        title: 'Baupreisvorhersage',
        category: 'Prognosemodelle',
        desc: 'Ein Machine-Learning-Modell prognostiziert Baupreise auf Basis historischer Daten, Marktindikatoren und regionaler Faktoren.',
        outcome: 'Signifikant verbesserte Kostenschätzungen und Planungssicherheit für Bauprojekte.',
      },
      {
        number: '02',
        title: 'KI-gestützt im Sekretariat',
        category: 'Prozessautomatisierung',
        desc: 'Automatisierte Dokumentenverarbeitung, Terminplanung und E-Mail-Routing durch einen KI-Agenten.',
        outcome: 'Deutliche Reduktion manueller Routineaufgaben und gesteigerte Effizienz im Büroalltag.',
      },
      {
        number: '03',
        title: 'KI-Agent mit Wissensdatenbank',
        category: 'RAG / Kundenservice & Support',
        desc: 'Ein RAG-basierter KI-Agent ermöglicht es Support-Teams, sofort präzise Antworten aus internen Dokumenten zu generieren.',
        outcome: 'Kürzere Antwortzeiten und konsistentere Qualität im Kundensupport.',
      },
    ],
  },
  workshopsPageContent: {
    heading: 'Workshops',
    sub: 'KI-Bildung, die in der Praxis wirkt.',
    formats: [
      {
        title: 'KI-Grundlagen für Unternehmen',
        desc: 'Ein kompakter Einstieg in KI-Konzepte, Potenziale und erste Anwendungsfälle — speziell für Führungskräfte und Teams aus Bau & Immobilien.',
        duration: 'Halbtag',
        audience: 'Führungskräfte, Entscheider',
      },
      {
        title: 'KI-Agenten & Automatisierung',
        desc: 'Praxisworkshop zur Identifikation und Umsetzung von Automatisierungspotenzialen in Ihrem Unternehmen.',
        duration: 'Ganztag',
        audience: 'Operations, IT-Teams',
      },
      {
        title: 'RAG & Wissenssysteme',
        desc: 'Wie Sie Ihre internen Dokumente zu einer intelligenten, durchsuchbaren Wissensbasis machen.',
        duration: 'Ganztag',
        audience: 'IT, Wissensmanagement',
      },
    ],
    contactCta: 'Workshop anfragen',
  },
  uberUns: {
    heading: 'Über SimplyAI',
    sub: 'Wir machen KI einfach — und wirkungsvoll.',
    missionLabel: 'MISSION',
    mission: 'SimplyAI macht künstliche Intelligenz für Unternehmen greifbar, nutzbar und wirkungsvoll — ohne unnötige Komplexität. Wir glauben, dass KI dann ihren größten Mehrwert entfaltet, wenn sie einfach zu verstehen und einfach einzusetzen ist.',
    focusLabel: 'FOKUS',
    focus: 'Spezialisiert auf die Bau- und Immobilienbranche bringen wir tiefes Branchenverständnis mit modernster KI-Technologie zusammen.',
    locationLabel: 'STANDORT',
    location: 'Graz, Österreich',
  },
  legal: {
    placeholderNote: 'Dieser Inhalt wird vom Kunden bereitgestellt. Platzhalter bis zur finalen Freigabe.',
    agbHeading: 'Allgemeine Geschäftsbedingungen',
    impressumHeading: 'Impressum',
    datenschutzHeading: 'Datenschutzerklärung',
    dokuHeading: 'Dokumentation',
  },
};

const en: Translations = {
  nav: {
    services: 'Services',
    projects: 'Projects',
    workshops: 'Workshops',
    about: 'About',
    cta: 'Free Consultation',
  },
  hero: {
    eyebrow: 'Specialized in Construction & Real Estate',
    headline1: 'Your ',
    headlineAI: 'AI',
    headline2: ' – but simple',
    sub: 'Custom AI solutions tailored to your requirements.',
    ctaPrimary: 'Free Initial Consultation',
    ctaSecondary: 'View Services',
  },
  services: {
    sectionLabel: 'FIG 1.1 — SERVICES',
    heading: 'What we build for you',
    sub: 'Tailored AI solutions that deliver real value — specialized in construction & real estate.',
    items: [
      {
        number: '01',
        title: 'Process Optimization via AI Agents',
        desc: 'Intelligent automation of recurring processes through autonomous AI agents — precise, reliable and scalable.',
      },
      {
        number: '02',
        title: 'Custom AI Models',
        desc: 'Individual machine learning models trained on your data and objectives — no off-the-shelf solutions.',
      },
      {
        number: '03',
        title: 'Forecasting Models',
        desc: 'Data-driven predictive models for cost development, demand, and market movements in construction.',
      },
      {
        number: '04',
        title: 'RAG Knowledge Base',
        desc: 'Retrieval-Augmented Generation: your internal documents become an intelligent, searchable knowledge base.',
      },
      {
        number: '05',
        title: 'Data Analysis',
        desc: 'Structured analysis of your business data — from raw data preparation to strategic insights.',
      },
    ],
  },
  trust: {
    sectionLabel: 'FIG 1.2 — REFERENCES',
    heading: 'Trust in AI — built together',
    clients: 'Clients',
    partners: 'Partners',
    supported: 'Supported by',
    clientList: ['Kostmann', 'Cosuno', 'Duramea', 'Sophora', 'BWI'],
    partnerList: ['FFG', 'SFG', 'Science Park Graz'],
  },
  projects: {
    sectionLabel: 'FIG 1.3 — PROJECTS',
    heading: 'AI Projects in Practice',
    sub: 'Real-world applications that have created measurable value.',
    items: [
      {
        number: '01',
        title: 'Construction Price Prediction',
        category: 'Forecasting Models',
        desc: 'A machine learning model forecasts construction prices based on historical data, market indicators, and regional factors.',
      },
      {
        number: '02',
        title: 'AI-Assisted Secretariat',
        category: 'Process Automation',
        desc: 'Automated document processing, scheduling and email routing through an AI agent in the back office.',
      },
      {
        number: '03',
        title: 'AI Agent with Knowledge Base',
        category: 'RAG / Customer Service & Support',
        desc: 'A RAG-based AI agent enables support teams to instantly generate precise answers from internal documents.',
      },
    ],
  },
  process: {
    sectionLabel: 'FIG 1.4 — PROCESS',
    heading: 'How we work',
    sub: 'Structured, transparent and aligned to your goals.',
    steps: [
      { number: '01', title: 'Analysis', desc: 'Understanding your processes, data and objectives.' },
      { number: '02', title: 'Concept', desc: 'Defining the use case with the greatest leverage.' },
      { number: '03', title: 'Development', desc: 'Building and training your individual AI solution.' },
      { number: '04', title: 'Integration', desc: 'Seamless integration into your systems, including ongoing support.' },
    ],
  },
  workshops: {
    sectionLabel: 'FIG 1.5 — WORKSHOPS',
    heading: 'Understand AI. Apply AI.',
    sub: 'Practical Workshops for Companies',
    desc: 'Our workshops convey AI knowledge that works in practice — understandable, relevant and directly applicable to your industry.',
    features: [
      'Practical & understandable',
      'Tailored to your company',
      'Industry-specific use cases',
      'Immediately actionable insights',
    ],
    cta: 'Request Workshop',
  },
  finalCta: {
    heading: 'Ready to shape the future with AI?',
    sub: 'Whether a question, idea or project — we are here to help.',
    cta: 'Free Initial Consultation',
  },
  contact: {
    sectionLabel: 'FIG 1.6 — CONTACT',
    heading: "Let's talk.",
    sub: 'Schedule a free initial consultation — no obligation, direct.',
    name: 'Name',
    email: 'Email',
    concern: 'Your Request',
    namePlaceholder: 'Your full name',
    emailPlaceholder: 'your@email.com',
    concernPlaceholder: 'Describe your request or project ...',
    submit: 'Schedule Free Consultation',
    successTitle: 'Message sent',
    successDesc: 'Thank you! We will get back to you shortly.',
    errorDesc: 'Something went wrong. Please try again later.',
  },
  footer: {
    tagline: 'Custom AI solutions for Construction & Real Estate.',
    company: 'Company',
    companyLinks: 'Pages',
    legal: 'Legal',
    agb: 'Terms & Conditions',
    impressum: 'Imprint',
    datenschutz: 'Privacy Policy',
    doku: 'Documentation',
    copyright: '© 2026 SimplyAI GmbH',
    location: 'Graz, Austria',
  },
  leistungenPage: {
    heading: 'Our Services',
    sub: 'AI solutions tailored to your industry, your data and your goals.',
    items: [
      {
        title: 'Process Optimization via AI Agents',
        desc: 'Intelligent automation of recurring processes through autonomous AI agents.',
        details: ['Document processing', 'Workflow automation', 'Email routing & prioritization', 'Autonomous reporting agents'],
      },
      {
        title: 'Custom AI Models',
        desc: 'Individual machine learning models trained on your specific data and requirements.',
        details: ['Classification models', 'Regression analysis', 'Anomaly detection', 'Recommendation systems'],
      },
      {
        title: 'Forecasting Models',
        desc: 'Data-driven predictive models for precise planning.',
        details: ['Construction price prediction', 'Demand forecasting', 'Resource planning', 'Market development models'],
      },
      {
        title: 'RAG Knowledge Base',
        desc: 'Retrieval-Augmented Generation — your documents become an intelligent knowledge base.',
        details: ['Internal document search', 'Customer service AI', 'Technical documentation', 'Compliance & guidelines'],
      },
      {
        title: 'Data Analysis',
        desc: 'From raw data chaos to strategic insight.',
        details: ['Data preparation & cleaning', 'Exploratory data analysis', 'Dashboards & visualizations', 'Strategic recommendations'],
      },
    ],
  },
  projektePageContent: {
    heading: 'Our Projects',
    sub: 'Real-world AI applications that have created measurable value.',
    items: [
      {
        number: '01',
        title: 'Construction Price Prediction',
        category: 'Forecasting Models',
        desc: 'A machine learning model forecasts construction prices based on historical data, market indicators, and regional factors.',
        outcome: 'Significantly improved cost estimates and planning certainty for construction projects.',
      },
      {
        number: '02',
        title: 'AI-Assisted Secretariat',
        category: 'Process Automation',
        desc: 'Automated document processing, scheduling and email routing through an AI agent.',
        outcome: 'Significant reduction in manual routine tasks and increased office efficiency.',
      },
      {
        number: '03',
        title: 'AI Agent with Knowledge Base',
        category: 'RAG / Customer Service & Support',
        desc: 'A RAG-based AI agent enables support teams to instantly generate precise answers from internal documents.',
        outcome: 'Shorter response times and more consistent quality in customer support.',
      },
    ],
  },
  workshopsPageContent: {
    heading: 'Workshops',
    sub: 'AI education that works in practice.',
    formats: [
      {
        title: 'AI Fundamentals for Business',
        desc: 'A compact introduction to AI concepts, potential and initial use cases — specially designed for executives and teams in construction & real estate.',
        duration: 'Half-day',
        audience: 'Executives, Decision-makers',
      },
      {
        title: 'AI Agents & Automation',
        desc: 'Practical workshop to identify and implement automation potential in your company.',
        duration: 'Full-day',
        audience: 'Operations, IT Teams',
      },
      {
        title: 'RAG & Knowledge Systems',
        desc: 'How to turn your internal documents into an intelligent, searchable knowledge base.',
        duration: 'Full-day',
        audience: 'IT, Knowledge Management',
      },
    ],
    contactCta: 'Request Workshop',
  },
  uberUns: {
    heading: 'About SimplyAI',
    sub: 'We make AI simple — and impactful.',
    missionLabel: 'MISSION',
    mission: 'SimplyAI makes artificial intelligence tangible, usable and impactful for companies — without unnecessary complexity. We believe AI creates its greatest value when it is simple to understand and simple to deploy.',
    focusLabel: 'FOCUS',
    focus: 'Specialized in the construction and real estate sector, we combine deep industry knowledge with state-of-the-art AI technology.',
    locationLabel: 'LOCATION',
    location: 'Graz, Austria',
  },
  legal: {
    placeholderNote: 'This content will be provided by the client. Placeholder until final approval.',
    agbHeading: 'Terms & Conditions',
    impressumHeading: 'Imprint',
    datenschutzHeading: 'Privacy Policy',
    dokuHeading: 'Documentation',
  },
};

export const translations: Record<Lang, Translations> = { de, en };
