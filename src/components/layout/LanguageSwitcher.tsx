import React from 'react';
import { useLang } from '@/i18n/LanguageContext';
import type { Lang } from '@/i18n/translations';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  const toggle = (l: Lang) => {
    if (l !== lang) setLang(l);
  };

  return (
    <div
      className="flex items-center text-xs font-semibold border border-border overflow-hidden"
      style={{ letterSpacing: '0.12em' }}
    >
      <button
        type="button"
        onClick={() => toggle('de')}
        className={`px-3 py-1.5 transition-all duration-150 ${
          lang === 'de'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        DE
      </button>
      <div className="w-px h-4 bg-border" />
      <button
        type="button"
        onClick={() => toggle('en')}
        className={`px-3 py-1.5 transition-all duration-150 ${
          lang === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
    </div>
  );
}
