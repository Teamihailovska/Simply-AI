import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  number: string;
  title: string;
  desc: string;
  index: number;
}

function ServiceCard({ number, title, desc, index }: ServiceCardProps) {
  return (
    <div
      className="relative group border border-border p-6 md:p-8 cursor-default transition-all duration-200 hover:border-primary/50 blueprint-corner opacity-0 intersect:opacity-100 intersect:transition intersect:duration-500"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Number label */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-mono text-primary/60">{number}</span>
        <ArrowUpRight
          size={16}
          className="text-muted-foreground/30 group-hover:text-primary/60 transition-colors"
        />
      </div>

      {/* Title */}
      <h3 className="text-base md:text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-150 leading-snug">
        {title}
      </h3>

      {/* Desc */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {desc}
      </p>

      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300" />
    </div>
  );
}

export default function Services() {
  const { t } = useLang();
  const { services } = t;

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-4">{services.sectionLabel}</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground max-w-md leading-tight text-balance opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600"
            >
              {services.heading}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed md:text-right opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 intersect:delay-100">
              {services.sub}
            </p>
          </div>
          <div className="mt-6 h-px bg-border" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.items.map((item, i) => (
            <div key={item.number} className="bg-background">
              <ServiceCard
                number={item.number}
                title={item.title}
                desc={item.desc}
                index={i}
              />
            </div>
          ))}

          {/* Empty cell for grid balance on lg (6 items → fill 6th slot) */}
          <div className="hidden lg:block bg-background border border-border/0 relative p-6 md:p-8">
            <div className="h-full flex flex-col justify-end">
              <p className="section-label text-muted-foreground/30 mb-3">FIG 1.1 — END</p>
              <Link
                to="/leistungen"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary/70 hover:text-primary transition-colors"
              >
                {t.nav.services} →
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile link */}
        <div className="mt-8 flex md:hidden">
          <Link
            to="/leistungen"
            className="text-sm font-semibold text-primary flex items-center gap-1"
          >
            {t.nav.services} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
