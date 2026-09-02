import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLang } from '@/i18n/LanguageContext';
import { Clock, Users, ArrowUpRight } from 'lucide-react';

export default function WorkshopsPage() {
  const { t } = useLang();
  const { workshopsPageContent } = t;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Hero */}
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
            <p className="section-label mb-4">FIG 1.5 — WORKSHOPS</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance max-w-2xl">
              {workshopsPageContent.heading}
            </h1>
            <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
              {workshopsPageContent.sub}
            </p>
          </div>
        </section>

        {/* Workshop formats */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {workshopsPageContent.formats.map((format, i) => (
                <div
                  key={i}
                  className="bg-background p-8 md:p-10 group border-0 hover:bg-card transition-colors duration-200 opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 relative blueprint-corner"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className="text-mono text-muted-foreground/30 block mb-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-150 leading-snug text-balance">
                    {format.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {format.desc}
                  </p>
                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                      <Clock size={12} className="text-primary/50" />
                      <span className="text-mono">{format.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                      <Users size={12} className="text-primary/50" />
                      <span className="text-mono">{format.audience}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-20 border-t border-border"
          style={{ backgroundColor: 'hsl(218 40% 8%)' }}
        >
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-balance">
              {t.finalCta.heading}
            </h2>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent transition-all duration-150"
            >
              {workshopsPageContent.contactCta} <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
