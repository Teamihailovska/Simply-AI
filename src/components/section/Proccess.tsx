import React from 'react';
import { useLang } from '@/i18n/LanguageContext';

interface StepProps {
  number: string;
  title: string;
  desc: string;
  index: number;
  total: number;
}

function Step({ number, title, desc, index, total }: StepProps) {
  return (
    <div
      className="relative flex-1 min-w-0 opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Connector line (not last) */}
      {index < total - 1 && (
        <div className="hidden md:block absolute top-5 left-1/2 right-0 h-px bg-border z-0" />
      )}

      <div className="relative z-10">
        {/* Number circle */}
        <div className="flex md:justify-start items-center gap-3 mb-4">
          <div
            className="w-10 h-10 border border-primary/40 flex items-center justify-center bg-background shrink-0"
            style={{ boxShadow: '0 0 16px hsla(37, 90%, 55%, 0.08)' }}
          >
            <span className="text-mono text-primary text-xs">{number}</span>
          </div>
          {/* Right side dashed connector on mobile */}
          <div className="flex-1 h-px border-b border-dashed border-border md:hidden" />
        </div>

        {/* Text */}
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function Process() {
  const { t } = useLang();
  const { process } = t;

  return (
    <section
      id="process"
      className="relative py-24 md:py-32 border-t border-border"
      style={{ backgroundColor: 'hsl(218 40% 8%)' }}
    >
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
          <p className="section-label mb-4">{process.sectionLabel}</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground max-w-sm text-balance opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600"
            >
              {process.heading}
            </h2>
            <p className="text-sm text-muted-foreground opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 intersect:delay-100">
              {process.sub}
            </p>
          </div>
          <div className="mt-6 h-px bg-border" />
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-6">
          {process.steps.map((step, i) => (
            <Step
              key={step.number}
              number={step.number}
              title={step.title}
              desc={step.desc}
              index={i}
              total={process.steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
