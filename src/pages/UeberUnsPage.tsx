import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLang } from '@/i18n/LanguageContext';
import { ArrowUpRight, MapPin } from 'lucide-react';

export default function UeberUnsPage() {
  const { t } = useLang();
  const { uberUns } = t;

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
            <p className="section-label mb-4">FIG 2.0 — ÜBER UNS</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance max-w-2xl">
              {uberUns.heading}
            </h1>
            <p className="text-lg text-primary/80 font-medium">
              {uberUns.sub}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
              {/* Left column */}
              <div className="md:col-span-7 space-y-12">
                {/* Mission */}
                <div
                  className="opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600"
                >
                  <p className="section-label mb-4">{uberUns.missionLabel}</p>
                  <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                    {uberUns.mission}
                  </p>
                </div>

                {/* Focus */}
                <div
                  className="opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 intersect:delay-100"
                >
                  <p className="section-label mb-4">{uberUns.focusLabel}</p>
                  <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                    {uberUns.focus}
                  </p>
                </div>
              </div>

              {/* Right: info card */}
              <div className="md:col-span-4 md:col-start-9">
                <div
                  className="border border-border p-8 relative blueprint-corner opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 intersect:delay-200"
                >
                  <p className="section-label mb-6">{uberUns.locationLabel}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin size={16} className="text-primary" />
                    <span className="text-foreground font-medium">{uberUns.location}</span>
                  </div>
                  <div className="mt-8 pt-6 border-t border-border">
                    <img
                      src="https://miaoda-conversation-file.s3cdn.medo.dev/user-e4bxlpfp93pc/app-e4c2ja825s75/20260901/Logo.png"
                      alt="SimplyAI"
                      className="h-7 w-auto opacity-80"
                    />
                  </div>
                </div>
              </div>
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
