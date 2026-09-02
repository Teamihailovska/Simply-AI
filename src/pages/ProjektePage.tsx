import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLang } from '@/i18n/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

export default function ProjektePage() {
  const { t } = useLang();
  const { projektePageContent } = t;

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
            <p className="section-label mb-4">FIG 1.3 — PROJEKTE</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance max-w-2xl">
              {projektePageContent.heading}
            </h1>
            <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
              {projektePageContent.sub}
            </p>
          </div>
        </section>

        {/* Projects */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="space-y-0">
              {projektePageContent.items.map((item, i) => (
                <div
                  key={item.number}
                  className="group border-b border-border py-14 md:py-20 opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                    {/* Number */}
                    <div className="md:col-span-1">
                      <span className="text-4xl font-bold text-foreground/8 group-hover:text-primary/15 transition-colors duration-300 font-mono">
                        {item.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-5">
                      <span className="section-label text-primary/70 mb-3 block">{item.category}</span>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-150 text-balance">
                        {item.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Outcome */}
                    <div className="md:col-span-5 md:col-start-8">
                      <div className="border border-border p-6 relative blueprint-corner">
                        <p className="section-label text-muted-foreground/40 mb-3">OUTCOME</p>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {item.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-lg font-semibold text-foreground">{t.finalCta.heading}</p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent transition-all"
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
