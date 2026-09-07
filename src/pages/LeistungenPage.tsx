import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLang } from '@/i18n/LanguageContext';
import {
  ArrowUpRight,
  Bot,
  Sparkles,
  TrendingUp,
  Database,
  BarChart3,
} from 'lucide-react';

/* ---------------------------------------------
   AI NETWORK BACKGROUND
--------------------------------------------- */

function AINetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    let animationFrame: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    window.addEventListener('resize', resize);

    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      radius: Math.random() * 1.6 + 0.7,
      orange: Math.random() > 0.84,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > window.innerWidth) {
          node.vx *= -1;
        }

        if (node.y < 0 || node.y > window.innerHeight) {
          node.vy *= -1;
        }
      });

      /* Lines */

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 155) {
            const opacity = (1 - distance / 155) * 0.28;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle = `rgba(105, 160, 235, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      /* Nodes */

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.orange) {
          ctx.fillStyle = 'rgba(237, 148, 28, 0.9)';
        } else {
          ctx.fillStyle = 'rgba(115, 170, 240, 0.75)';
        }

        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
    />
  );
}

/* ---------------------------------------------
   SERVICE ICONS
--------------------------------------------- */

const serviceIcons = [
  Bot,
  Sparkles,
  TrendingUp,
  Database,
  BarChart3,
];

/* ---------------------------------------------
   PAGE
--------------------------------------------- */

export default function LeistungenPage() {
  const { t, lang} = useLang();
  const { leistungenPage } = t;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-24">

        {/* =========================================
            HERO + SERVICES
        ========================================= */}

        <section
          className="relative min-h-screen overflow-hidden"
          style={{ background: 'var(--gradient-hero)' }}
        >

          {/* AI network */}

          <AINetworkBackground />

          {/* Dark overlay */}

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, transparent 0%, rgba(3, 15, 32, 0.18) 45%, rgba(3, 15, 32, 0.42) 100%)',
            }}
          />

          {/* Grid */}

          <div
            className="absolute inset-0 pointer-events-none opacity-[0.045]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(120,170,230,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(120,170,230,0.7) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          {/* Content */}

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">

            {/* Heading */}

            <div className="max-w-3xl mb-10 md:mb-12">

              <p className="section-label mb-4">
                {lang === 'en'
                  ? 'OUR SERVICES'
                  : 'UNSERE LEISTUNGEN'}
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] text-balance">
                {leistungenPage.heading}
              </h1>

              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {leistungenPage.sub}
              </p>

            </div>

            {/* =========================================
                SERVICE CARDS
            ========================================= */}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

              {leistungenPage.items.map((item, i) => {

                const Icon = serviceIcons[i];

                const isLarge = i === 0;

                return (
                  <div
                    key={i}
                    className={`
                      group relative overflow-hidden
                      rounded-[22px]
                      border border-white/[0.12]
                      bg-[#0a2341]/65
                      backdrop-blur-md
                      transition-all duration-500
                      hover:-translate-y-1
                      hover:border-primary/40
                      hover:bg-[#0d294b]/80
                      hover:shadow-[0_20px_70px_rgba(0,80,160,0.18)]
                      ${
                        isLarge
                          ? 'md:col-span-8 min-h-[235px]'
                          : 'md:col-span-4 min-h-[235px]'
                      }
                    `}
                  >

                    {/* Card glow */}

                    <div
                      className="
                        absolute
                        -right-16
                        -bottom-20
                        w-44
                        h-44
                        rounded-full
                        bg-primary/10
                        blur-3xl
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-500
                      "
                    />

                    {/* Orange glow for second card */}

                    {i === 1 && (
                      <div
                        className="
                          absolute
                          -right-10
                          bottom-[-40px]
                          w-36
                          h-36
                          rounded-full
                          bg-[#ED941C]/15
                          blur-3xl
                          opacity-70
                          group-hover:opacity-100
                          transition-opacity
                        "
                      />
                    )}

                    <div className="relative z-10 h-full p-7 md:p-8 flex flex-col">

                      {/* Icon */}

                      <div
                        className={`
                          w-12 h-12
                          rounded-xl
                          flex items-center justify-center
                          border
                          mb-auto
                          transition-all duration-300
                          ${
                            i === 1
                              ? 'border-[#ED941C]/40 bg-[#ED941C]/10 text-[#ED941C]'
                              : 'border-primary/40 bg-primary/10 text-primary'
                          }
                          group-hover:scale-105
                        `}
                      >
                        <Icon size={22} strokeWidth={1.8} />
                      </div>

                      {/* Number */}

                      <div className="absolute top-7 right-7">

                        <span className="text-mono text-xs text-white/20 tracking-widest">
                          {String(i + 1).padStart(2, '0')}
                        </span>

                      </div>

                      {/* Text */}

                      <div className="mt-10">

                        <h2
                          className="
                            text-lg
                            md:text-xl
                            font-bold
                            text-foreground
                            mb-3
                            leading-tight
                            group-hover:text-primary
                            transition-colors
                            duration-300
                          "
                        >
                          {item.title}
                        </h2>

                        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-xl">
                          {item.desc}
                        </p>

                      </div>

                      {/* Details */}

                      <div className="mt-5 flex flex-wrap gap-2">

                        {item.details.map((detail, j) => (
                          <span
                            key={j}
                            className="
                              px-2.5
                              py-1
                              rounded-full
                              border
                              border-white/[0.10]
                              bg-white/[0.03]
                              text-[11px]
                              text-muted-foreground
                              transition-colors
                              group-hover:border-primary/20
                            "
                          >
                            {detail}
                          </span>
                        ))}

                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

          </div>
        </section>

        {/* =========================================
            CTA
        ========================================= */}

        <section
          className="relative py-20 md:py-24 overflow-hidden border-t border-border"
          style={{ background: 'var(--gradient-hero)' }}
        >

          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[500px]
              h-[300px]
              rounded-full
              bg-primary/10
              blur-[120px]
              pointer-events-none
            "
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

            <div
              className="
                rounded-[28px]
                border border-white/[0.12]
                bg-[#0a2341]/60
                backdrop-blur-md
                px-7
                py-10
                md:px-12
                md:py-12
                flex
                flex-col
                md:flex-row
                items-start
                md:items-center
                justify-between
                gap-8
              "
            >

              <div>

                <p className="section-label mb-3">
                  {lang === 'en'
                    ? 'LET’S BUILD'
                    : 'LASSEN SIE UNS STARTEN'}
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {t.finalCta.heading}
                </h2>

                <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl">
                  {t.finalCta.sub}
                </p>

              </div>

              <Link
                to="/erstgespraech"
                className="
                  shrink-0
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-6
                  py-3.5
                  rounded-full
                  bg-primary
                  text-primary-foreground
                  font-semibold
                  text-sm
                  transition-all
                  duration-300
                  hover:bg-accent
                  hover:-translate-y-0.5
                  hover:shadow-[0_10px_35px_rgba(60,130,220,0.25)]
                "
              >
                {t.nav.cta}
                <ArrowUpRight size={15} />
              </Link>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}