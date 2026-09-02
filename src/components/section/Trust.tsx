import React from 'react';
import { useLang } from '@/i18n/LanguageContext';

function Badge({ name, variant = 'client' }: { name: string; variant?: 'client' | 'partner' }) {
  return (
    <div
      className={`relative px-5 py-3 border font-semibold text-sm tracking-wide transition-all duration-200 hover:border-primary/50 group ${
        variant === 'client'
          ? 'border-border text-foreground/80 hover:text-primary'
          : 'border-border/50 text-muted-foreground hover:text-foreground'
      }`}
    >
      <span className="text-mono text-xs absolute -top-1.5 -left-1 bg-background px-1 text-muted-foreground/40">
        {variant === 'client' ? '●' : '○'}
      </span>
      {name}
    </div>
  );
}

export default function Trust() {
  const { t } = useLang();
  const { trust } = t;

  return (
    <section
      id="trust"
      className="relative py-24 md:py-32 border-t border-border"
      style={{ backgroundColor: 'hsl(218 40% 8%)' }}
    >
      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(220 90% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 90% 60%) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-4">{trust.sectionLabel}</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground max-w-lg text-balance opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600"
          >
            {trust.heading}
          </h2>
          <div className="mt-6 h-px bg-border" />
        </div>

        {/* Clients */}
        <div className="mb-16 opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 intersect:delay-100">
          <p className="text-mono text-muted-foreground/50 mb-6">{trust.clients}</p>
          <div className="flex flex-wrap gap-3">
            {trust.clientList.map((name) => (
              <Badge key={name} name={name} variant="client" />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-16">
          <div className="h-px bg-border" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rotate-45" />
        </div>

        {/* Supported by */}
        <div className="opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 intersect:delay-200">
          <p className="text-mono text-muted-foreground/50 mb-6">{trust.supported}</p>
          <div className="flex flex-wrap gap-3">
            {trust.partnerList.map((name) => (
              <Badge key={name} name={name} variant="partner" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
