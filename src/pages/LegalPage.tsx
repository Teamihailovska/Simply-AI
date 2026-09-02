import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLang } from '@/i18n/LanguageContext';

interface LegalPageProps {
  titleKey: 'agbHeading' | 'impressumHeading' | 'datenschutzHeading' | 'dokuHeading';
  figLabel: string;
}

export default function LegalPage({ titleKey, figLabel }: LegalPageProps) {
  const { t } = useLang();
  const { legal } = t;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <section
          className="relative py-20 md:py-28 border-b border-border overflow-hidden"
          style={{ background: 'var(--gradient-hero)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(hsl(220 90% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 90% 60%) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-6 md:px-8">
            <p className="section-label mb-4">{figLabel}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 max-w-2xl text-balance">
              {legal[titleKey]}
            </h1>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="border border-dashed border-border/60 p-8 md:p-12 relative">
              <p className="section-label text-muted-foreground/40 absolute -top-2.5 left-6 bg-background px-2">
                PLACEHOLDER
              </p>
              <p className="text-muted-foreground leading-relaxed italic">
                {legal.placeholderNote}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
