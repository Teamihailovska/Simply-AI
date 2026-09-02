import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import { CheckSquare } from 'lucide-react';

export default function Workshops() {
  const { t } = useLang();
  const { workshops } = t;

  return (
    <section id="workshops" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="section-label mb-4">{workshops.sectionLabel}</p>
          <div className="h-px bg-border mb-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: Text */}
          <div
            className="opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight text-balance">
              {workshops.heading}
            </h2>
            <p className="text-lg font-medium text-primary/80 mb-6">
              {workshops.sub}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
              {workshops.desc}
            </p>
            <Link
              to="/workshops"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent transition-all duration-150"
            >
              {workshops.cta}
            </Link>
          </div>

          {/* Right: Feature list */}
          <div
            className="opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 intersect:delay-100"
          >
            <div className="border border-border p-8 relative blueprint-corner">
              <p className="text-mono text-muted-foreground/40 absolute -top-2.5 left-4 bg-background px-2 text-xs">
                WORKSHOP FEATURES
              </p>
              <ul className="space-y-5 mt-2">
                {workshops.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckSquare size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
