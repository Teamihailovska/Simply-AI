import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ProjectItemProps {
  number: string;
  title: string;
  category: string;
  desc: string;
  outcome: string;
  index: number;
}

function ProjectItem({
  number,
  title,
  category,
  desc,
  outcome,
  index,
}: ProjectItemProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 md:p-8 lg:p-10 opacity-0 intersect:opacity-100 intersect:transition intersect:duration-700"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Top line */}
      <div className="relative flex items-start justify-between gap-6 mb-10">
        <span className="font-mono text-5xl md:text-6xl font-bold text-foreground/10 group-hover:text-primary/20 transition-colors duration-500">
          {number}
        </span>

        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background/40 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
          <ArrowUpRight
            size={18}
            className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          />
        </div>
      </div>

      {/* Category */}
      <div className="relative mb-4 flex items-center gap-2">
        <Sparkles size={13} className="text-primary" />
        <span className="section-label text-primary/80">
          {category}
        </span>
      </div>

      {/* Title */}
      <h3 className="relative text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight max-w-3xl mb-5 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="relative text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mb-8">
        {desc}
      </p>

      {/* Outcome */}
      <div className="relative border-t border-border pt-6 max-w-3xl">
        <span className="font-mono text-[10px] tracking-[0.2em] text-primary/70">
          OUTCOME
        </span>

        <p className="mt-2 text-sm md:text-base text-foreground/80 leading-relaxed">
          {outcome}
        </p>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </article>
  );
}

export default function Projects() {
  const { t } = useLang();
  const { projects } = t;

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="mb-14 md:mb-20">
          <p className="section-label mb-4">
            {projects.sectionLabel}
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-2xl text-balance opacity-0 intersect:opacity-100 intersect:transition intersect:duration-700"
            >
              {projects.heading}
            </h2>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md opacity-0 intersect:opacity-100 intersect:transition intersect:duration-700 intersect:delay-100">
              {projects.sub}
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-5 md:space-y-6">
          {projects.items.map((item, i) => (
            <ProjectItem
              key={item.number}
              number={item.number}
              title={item.title}
              category={item.category}
              desc={item.desc}
              outcome={item.outcome}
              index={i}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 flex justify-end">
          <Link
            to="/projekte"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary/80 hover:text-primary transition-colors"
          >
            {t.nav.projects}
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}