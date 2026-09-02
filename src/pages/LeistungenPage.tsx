import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLang } from '@/i18n/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

export default function LeistungenPage() {
  const { t } = useLang();
  const { leistungenPage } = t;

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
            <p className="section-label mb-4">FIG 1.1 — LEISTUNGEN</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance max-w-2xl">
              {leistungenPage.heading}
            </h1>
            <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
              {leistungenPage.sub}
            </p>
          </div>
        </section>

        {/* Services detail */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="space-y-0">
              {leistungenPage.items.map((item, i) => (
                <div
                  key={i}
                  className="group border-b border-border py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Number */}
                  <div className="md:col-span-1">
                    <span className="text-mono text-muted-foreground/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title + desc */}
                  <div className="md:col-span-5">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-150 leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Details list */}
                  <div className="md:col-span-5 md:col-start-8">
                    <ul className="space-y-2">
                      {item.details.map((d, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1 h-1 bg-primary rounded-full shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-lg font-semibold text-foreground">
              {t.finalCta.heading}
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent transition-all duration-150"
            >
              {t.nav.cta} <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
