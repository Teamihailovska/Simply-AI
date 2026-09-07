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
  className="flex items-center gap-1 text-xs font-semibold rounded-full border border-border/60 bg-background/20 backdrop-blur-sm p-1"
  style={{ letterSpacing: '0.12em' }}
>
<button
  type="button"
  onClick={() => toggle('de')}
  className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
    lang === 'de'
      ? 'bg-primary text-primary-foreground shadow-sm'
      : 'text-muted-foreground hover:text-foreground'
  }`}
>
  DE
</button>
      <div className="w-px h-4 bg-border" />
      <button
  type="button"
  onClick={() => toggle('en')}
  className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
    lang === 'en'
      ? 'bg-primary text-primary-foreground shadow-sm'
      : 'text-muted-foreground hover:text-foreground'
  }`}
>
  EN
</button>
    </div>
  );
}
