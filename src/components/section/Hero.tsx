import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  glow: number;
  glowDir: number;
}

function AINetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];

    const ORANGE = 'hsl(37, 90%, 55%)';
    const ORANGE_DIM = 'hsla(37, 90%, 55%, 0.18)';
    const NAVY_LINE = 'hsla(220, 80%, 65%, 0.12)';
    const NODE_COUNT = 28;
    const CONNECT_DIST = 140;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
    }

    function createNodes() {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        const angle = (i / NODE_COUNT) * Math.PI * 2;
        const radiusRand = 0.25 + Math.random() * 0.35;
        const cx = width / 2;
        const cy = height / 2;
        const rx = Math.min(width, height) * radiusRand;
        nodes.push({
          x: cx + Math.cos(angle) * rx + (Math.random() - 0.5) * 60,
          y: cy + Math.sin(angle) * rx + (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() < 0.15 ? 4 : Math.random() < 0.4 ? 2.5 : 1.5,
          glow: Math.random(),
          glowDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    }

    function drawFrame() {
      ctx!.clearRect(0, 0, width, height);

      // Central orbital ring
      const cx = width / 2;
      const cy = height / 2;
      const ringR = Math.min(width, height) * 0.28;

      ctx!.beginPath();
      ctx!.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx!.strokeStyle = 'hsla(37, 90%, 55%, 0.08)';
      ctx!.lineWidth = 1;
      ctx!.stroke();

      ctx!.beginPath();
      ctx!.arc(cx, cy, ringR * 0.6, 0, Math.PI * 2);
      ctx!.strokeStyle = 'hsla(220, 80%, 65%, 0.06)';
      ctx!.lineWidth = 0.5;
      ctx!.stroke();

      // Central core glow
      const grd = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 48);
      grd.addColorStop(0, 'hsla(37, 90%, 55%, 0.22)');
      grd.addColorStop(0.5, 'hsla(37, 90%, 55%, 0.07)');
      grd.addColorStop(1, 'transparent');
      ctx!.beginPath();
      ctx!.arc(cx, cy, 48, 0, Math.PI * 2);
      ctx!.fillStyle = grd;
      ctx!.fill();

      // Central dot
      ctx!.beginPath();
      ctx!.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx!.fillStyle = ORANGE;
      ctx!.fill();

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.35;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.strokeStyle = `hsla(37, 70%, 55%, ${alpha * 0.5})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }

        // Connect node to center if within range
        const dcx = nodes[i].x - cx;
        const dcy = nodes[i].y - cy;
        const distC = Math.sqrt(dcx * dcx + dcy * dcy);
        if (distC < CONNECT_DIST * 1.4) {
          const alpha = (1 - distC / (CONNECT_DIST * 1.4)) * 0.2;
          ctx!.beginPath();
          ctx!.moveTo(nodes[i].x, nodes[i].y);
          ctx!.lineTo(cx, cy);
          ctx!.strokeStyle = `hsla(37, 90%, 55%, ${alpha})`;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        n.glow += n.glowDir * 0.008;
        if (n.glow > 1) { n.glow = 1; n.glowDir = -1; }
        if (n.glow < 0.2) { n.glow = 0.2; n.glowDir = 1; }

        if (n.r > 3) {
          // Large glowing node
          const g2 = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
          g2.addColorStop(0, `hsla(37, 90%, 65%, ${n.glow * 0.7})`);
          g2.addColorStop(1, 'transparent');
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
          ctx!.fillStyle = g2;
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = n.r > 3
          ? `hsla(37, 90%, 65%, ${n.glow})`
          : n.r > 2
          ? `hsla(37, 70%, 60%, ${n.glow * 0.8})`
          : NAVY_LINE;
        ctx!.fill();

        // Move
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
    }

    function animate() {
      drawFrame();
      animId = requestAnimationFrame(animate);
    }

    const ro = new ResizeObserver(() => {
      resize();
      createNodes();
    });
    ro.observe(canvas);
    resize();
    createNodes();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(hsla(220, 90%, 60%, 0.06) 1px, transparent 1px), linear-gradient(90deg, hsla(220, 90%, 60%, 0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Animated Canvas — right half */}
      <div className="absolute inset-y-0 right-0 w-full md:w-3/5 pointer-events-none">
        <AINetworkCanvas />
      </div>

      {/* Radial gradient overlay for left text area */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-1/2 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, hsl(218 45% 7%) 60%, transparent)',
        }}
      />

      {/* Blueprint corner marker — bottom right */}
      <div className="absolute bottom-12 right-8 text-mono text-muted-foreground/30 hidden md:block">
        SCALE 1:1 — VIEW A
      </div>

      {/* Content */}
      <div className="relative flex-1 flex items-center max-w-7xl mx-auto px-6 md:px-8 w-full pt-24 pb-20">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-primary/30 bg-primary/8"
            style={{ animation: 'fadeInUp 0.6s ease-out both' }}
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span className="section-label">{t.hero.eyebrow}</span>
          </div>

          {/* Main headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight mb-6 text-balance"
            style={{ animation: 'fadeInUp 0.6s 0.15s ease-out both' }}
          >
            {t.hero.headline1}
            <span className="orange-text">{t.hero.headlineAI}</span>
            {t.hero.headline2}
          </h1>

          {/* Sub */}
          <p
            className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-md"
            style={{ animation: 'fadeInUp 0.6s 0.28s ease-out both' }}
          >
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3"
            style={{ animation: 'fadeInUp 0.6s 0.42s ease-out both' }}
          >
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm transition-all duration-150 hover:bg-accent"
            >
              {t.hero.ctaPrimary}
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/leistungen"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-foreground border border-border hover:border-primary/50 hover:text-primary transition-all duration-150"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>

          {/* Blueprint annotation */}
          <div className="mt-10 flex items-center gap-4 text-mono text-muted-foreground/40">
            <div className="w-8 h-px bg-border" />
            <span>SIM-AI-2026 — REV.01</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40"
        style={{ animation: 'float 2.5s ease-in-out infinite' }}
      >
        <ChevronDown size={18} />
      </div>
    </section>
  );
}
