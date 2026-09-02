import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

interface ProjectItemProps {
  number: string;
  title: string;
  category: string;
  desc: string;
  index: number;
}

function ProjectItem({ number, title, category, desc, index }: ProjectItemProps) {
  return (
    <div
      className="group relative flex flex-col md:flex-row gap-6 md:gap-10 border-b border-border py-10 md:py-12 cursor-default opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Number */}
      <div className="shrink-0 flex flex-row md:flex-col items-start gap-4 md:gap-2 md:w-20">
        <span className="text-3xl md:text-4xl font-bold text-foreground/10 group-hover:text-primary/20 transition-colors duration-300 font-mono">
          {number}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="section-label text-primary/70">{category}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-150 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          {desc}
        </p>
      </div>

      {/* Arrow */}
      <div className="shrink-0 flex items-center">
        <ArrowUpRight
          size={20}
          className="text-muted-foreground/20 group-hover:text-primary/60 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-transparent group-hover:bg-primary/40 transition-all duration-300" />
    </div>
  );
}

export default function Projects() {
  const { t } = useLang();
  const { projects } = t;

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="section-label mb-4">{projects.sectionLabel}</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground max-w-md text-balance opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600"
            >
              {projects.heading}
            </h2>
            <p className="text-sm text-muted-foreground opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 intersect:delay-100">
              {projects.sub}
            </p>
          </div>
        </div>

        {/* Project list */}
        <div>
          {projects.items.map((item, i) => (
            <ProjectItem
              key={item.number}
              number={item.number}
              title={item.title}
              category={item.category}
              desc={item.desc}
              index={i}
            />
          ))}
        </div>

        {/* Link */}
        <div className="mt-10">
          <Link
            to="/projekte"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary/70 hover:text-primary transition-colors"
          >
            {t.nav.projects} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
