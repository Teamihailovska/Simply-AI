import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function FinalCta() {
  const { t } = useLang();
  const { finalCta } = t;

  return (
    <section
      className="relative py-24 md:py-32 border-t border-border overflow-hidden"
      style={{ backgroundColor: 'hsl(218 45% 7%)' }}
    >
      {/* Orange glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(37, 90%, 55%, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(220 90% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 90% 60%) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 md:px-8 text-center">
        {/* Blueprint annotation */}
        <p className="section-label mb-8 opacity-60">{t.contact.sectionLabel.split('—')[0].trim()}</p>

        <h2
          className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight text-balance opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600"
        >
          {finalCta.heading}
        </h2>
        <p
          className="text-base text-muted-foreground mb-10 opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 intersect:delay-100"
        >
          {finalCta.sub}
        </p>

        <div
          className="opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 intersect:delay-200"
        >
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-base hover:bg-accent transition-all duration-150"
            style={{ boxShadow: 'var(--shadow-glow)' }}
          >
            {finalCta.cta}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
