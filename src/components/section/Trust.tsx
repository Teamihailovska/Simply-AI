import React from 'react';
import { useLang } from '@/i18n/LanguageContext';

import bwiLogo from '@/images/bwi.png';
import cosunoLogo from '@/images/cosuno.svg';
import durameaLogo from '@/images/duramea.png';
import ffgLogo from '@/images/ffg.png';
import kostmannLogo from '@/images/kostmann.svg';
import sfgLogo from '@/images/sfg.png';
import sophoraLogo from '@/images/sophora.png';
import spgLogo from '@/images/spg.jpg';

const clientLogos = [
  {
    name: 'Kostmann',
    src: kostmannLogo,
  },
  {
    name: 'Cosuno',
    src: cosunoLogo,
  },
  {
    name: 'Duramea',
    src: durameaLogo,
  },
  {
    name: 'Sophora',
    src: sophoraLogo,
  },
  {
    name: 'BWI',
    src: bwiLogo,
  },
];

const partnerLogos = [
  {
    name: 'FFG',
    src: ffgLogo,
  },
  {
    name: 'SFG',
    src: sfgLogo,
  },
  {
    name: 'Science Park Graz',
    src: spgLogo,
  },
];

function LogoCard({
  name,
  src,
  variant = 'client',
}: {
  name: string;
  src: string;
  variant?: 'client' | 'partner';
}) {
  return (
    <div
className={`
  group relative
  h-24 md:h-28
  rounded-xl
  border
  bg-[#1d4b78]/90
  backdrop-blur-sm
  flex items-center justify-center
  px-6 md:px-8
  overflow-hidden
  transition-all duration-300
  hover:-translate-y-1
  hover:bg-[#245986]
  hover:shadow-[0_15px_50px_rgba(60,130,220,0.18)]
  ${
    variant === 'client'
      ? 'border-primary/30 hover:border-primary/50'
      : 'border-[#ED941C]/30 hover:border-[#ED941C]/50'
  }
`}
    >
      {/* Glow */}

      <div
        className={`
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
          pointer-events-none
          ${
            variant === 'client'
              ? 'bg-[radial-gradient(circle_at_center,rgba(70,140,230,0.12),transparent_65%)]'
              : 'bg-[radial-gradient(circle_at_center,rgba(237,148,28,0.10),transparent_65%)]'
          }
        `}
      />

      {/* Small corner marker */}

      <span
        className={`
          absolute
          top-3
          left-3
          w-1.5
          h-1.5
          rounded-full
          ${
            variant === 'client'
              ? 'bg-primary/60'
              : 'bg-[#ED941C]/70'
          }
        `}
      />

      {/* Logo */}

      <img
        src={src}
        alt={name}
        className="
          relative z-10
          max-w-full
          max-h-12 md:max-h-14
          w-auto
          object-contain
          opacity-75
          group-hover:opacity-100
          transition-all duration-300
        "
      />
    </div>
  );
}

export default function Trust() {
  const { t } = useLang();
  const { trust } = t;

  return (
    <section
      id="trust"
      className="relative py-24 md:py-32 border-t border-border overflow-hidden"
      style={{
        background: 'var(--gradient-hero)',
      }}
    >
      {/* AI / Blueprint background */}

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(100,160,230,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(100,160,230,0.7) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Background glow */}

      <div
        className="
          absolute
          -top-40
          right-[-100px]
          w-[420px]
          h-[420px]
          rounded-full
          bg-primary/10
          blur-[120px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-[-180px]
          left-[-100px]
          w-[420px]
          h-[420px]
          rounded-full
          bg-[#ED941C]/5
          blur-[120px]
          pointer-events-none
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

        {/* Header */}

        <div className="mb-14 md:mb-16">

          <p className="section-label mb-4">
            {trust.sectionLabel}
          </p>

          <h2
            className="
              text-3xl
              md:text-4xl
              lg:text-5xl
              font-bold
              text-foreground
              max-w-2xl
              text-balance
              opacity-0
              intersect:opacity-100
              intersect:transition
              intersect:duration-600
            "
          >
            {trust.heading}
          </h2>

          <div className="mt-8 h-px bg-white/[0.10]" />

        </div>

        {/* =========================================
            CLIENTS
        ========================================= */}

        <div
          className="
            mb-16
            opacity-0
            intersect:opacity-100
            intersect:transition
            intersect:duration-600
            intersect:delay-100
          "
        >

          <p className="text-mono text-muted-foreground/50 mb-6 uppercase tracking-[0.18em]">
            {trust.clients}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">

            {clientLogos.map((logo) => (
              <LogoCard
                key={logo.name}
                name={logo.name}
                src={logo.src}
                variant="client"
              />
            ))}

          </div>

        </div>

        {/* Divider */}

        <div className="relative mb-16">

          <div className="h-px bg-white/[0.10]" />

          <div
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              w-2.5
              h-2.5
              bg-[#ED941C]
              rotate-45
              shadow-[0_0_14px_rgba(237,148,28,0.45)]
            "
          />

        </div>

        {/* =========================================
            SUPPORTED BY
        ========================================= */}

        <div
          className="
            opacity-0
            intersect:opacity-100
            intersect:transition
            intersect:duration-600
            intersect:delay-200
          "
        >

          <p className="text-mono text-muted-foreground/50 mb-6 uppercase tracking-[0.18em]">
            {trust.supported}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-4xl">

            {partnerLogos.map((logo) => (
              <LogoCard
                key={logo.name}
                name={logo.name}
                src={logo.src}
                variant="partner"
              />
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}