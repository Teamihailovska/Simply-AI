import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import { ArrowRight, ChevronDown } from 'lucide-react';
import background from "@/images/background.png";

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

    // Mouse position
    let mouseX = -1000;
    let mouseY = -1000;
    let mouseActive = false;

    // Colors
    const ORANGE = 'hsl(37, 90%, 55%)';
    const BLUE = 'hsla(210, 100%, 82%, 0.8)';

    // Network settings
    const NODE_COUNT = 38;
    const CONNECT_DIST = 155;
    const MOUSE_RADIUS = 240;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createNodes() {
      nodes = [];

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < NODE_COUNT; i++) {
        const angle = (i / NODE_COUNT) * Math.PI * 2;

        const radius =
          Math.min(width, height) *
          (0.20 + Math.random() * 0.30);

        nodes.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,

          // Slow natural movement
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,

          r:
            Math.random() < 0.12
              ? 4
              : Math.random() < 0.35
              ? 2.5
              : 1.5,

          glow: Math.random(),
          glowDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    }

    // Mouse movement
    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();

      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      mouseActive = true;
    }

    function handleMouseLeave() {
      mouseActive = false;
      mouseX = -1000;
      mouseY = -1000;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    function drawFrame() {
      ctx!.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // =========================================
      // CENTRAL ORBITAL RING
      // =========================================

      const ringR = Math.min(width, height) * 0.29;

      ctx!.beginPath();
      ctx!.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx!.strokeStyle = 'hsla(37, 90%, 55%, 0.12)';
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // Second orbital ring
      ctx!.beginPath();
      ctx!.arc(cx, cy, ringR * 0.72, 0, Math.PI * 2);
      ctx!.strokeStyle = 'hsla(210, 100%, 80%, 0.08)';
      ctx!.lineWidth = 0.7;
      ctx!.stroke();

      // =========================================
      // CENTRAL GLOW
      // =========================================

      const coreGlow = ctx!.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        75
      );

      coreGlow.addColorStop(
        0,
        'hsla(37, 90%, 60%, 0.30)'
      );

      coreGlow.addColorStop(
        0.35,
        'hsla(37, 90%, 55%, 0.12)'
      );

      coreGlow.addColorStop(
        1,
        'transparent'
      );

      ctx!.beginPath();
      ctx!.arc(cx, cy, 75, 0, Math.PI * 2);
      ctx!.fillStyle = coreGlow;
      ctx!.fill();

      // =========================================
      // CENTRAL ORANGE CORE
      // =========================================

      ctx!.beginPath();
      ctx!.arc(cx, cy, 5, 0, Math.PI * 2);

      ctx!.fillStyle = ORANGE;
      ctx!.shadowBlur = 18;
      ctx!.shadowColor = ORANGE;

      ctx!.fill();

      ctx!.shadowBlur = 0;

      // =========================================
      // MOUSE GLOW
      // =========================================

      if (mouseActive) {
        const mouseGlow = ctx!.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          MOUSE_RADIUS
        );

        mouseGlow.addColorStop(
          0,
          'hsla(210, 100%, 80%, 0.12)'
        );

        mouseGlow.addColorStop(
          0.4,
          'hsla(210, 100%, 75%, 0.04)'
        );

        mouseGlow.addColorStop(
          1,
          'transparent'
        );

        ctx!.beginPath();
        ctx!.arc(
          mouseX,
          mouseY,
          MOUSE_RADIUS,
          0,
          Math.PI * 2
        );

        ctx!.fillStyle = mouseGlow;
        ctx!.fill();

        // Small focus ring
        ctx!.beginPath();
        ctx!.arc(
          mouseX,
          mouseY,
          22,
          0,
          Math.PI * 2
        );

        ctx!.strokeStyle =
          'hsla(210, 100%, 85%, 0.18)';

        ctx!.lineWidth = 0.7;
        ctx!.stroke();
      }

      // =========================================
      // NODE CONNECTIONS
      // =========================================

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;

          const dist = Math.sqrt(
            dx * dx + dy * dy
          );

          if (dist < CONNECT_DIST) {
            const alpha =
              (1 - dist / CONNECT_DIST) * 0.32;

            ctx!.beginPath();

            ctx!.moveTo(
              nodes[i].x,
              nodes[i].y
            );

            ctx!.lineTo(
              nodes[j].x,
              nodes[j].y
            );

            ctx!.strokeStyle =
              `hsla(210, 100%, 82%, ${alpha})`;

            ctx!.lineWidth = 0.65;
            ctx!.stroke();
          }
        }

        // =========================================
        // CONNECT NODE TO CENTER
        // =========================================

        const dx = nodes[i].x - cx;
        const dy = nodes[i].y - cy;

        const distCenter = Math.sqrt(
          dx * dx + dy * dy
        );

        if (
          distCenter <
          CONNECT_DIST * 1.45
        ) {
          const alpha =
            (1 -
              distCenter /
                (CONNECT_DIST * 1.45)) *
            0.22;

          ctx!.beginPath();

          ctx!.moveTo(
            nodes[i].x,
            nodes[i].y
          );

          ctx!.lineTo(cx, cy);

          ctx!.strokeStyle =
            `hsla(37, 90%, 55%, ${alpha})`;

          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }
      }

      // =========================================
      // MOUSE CONNECTIONS
      // =========================================

      if (mouseActive) {
        for (const n of nodes) {
          const dx = n.x - mouseX;
          const dy = n.y - mouseY;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          if (distance < MOUSE_RADIUS) {
            const alpha =
              (1 -
                distance / MOUSE_RADIUS) *
              0.35;

            ctx!.beginPath();

            ctx!.moveTo(
              n.x,
              n.y
            );

            ctx!.lineTo(
              mouseX,
              mouseY
            );

            ctx!.strokeStyle =
              `hsla(210, 100%, 82%, ${alpha})`;

            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }

      // =========================================
      // NODES
      // =========================================

      for (const n of nodes) {

        // Slow glow animation
        n.glow += n.glowDir * 0.004;

        if (n.glow > 1) {
          n.glow = 1;
          n.glowDir = -1;
        }

        if (n.glow < 0.25) {
          n.glow = 0.25;
          n.glowDir = 1;
        }

        // =======================================
        // MOUSE ATTRACTION
        // =======================================

        if (mouseActive) {
          const dx = mouseX - n.x;
          const dy = mouseY - n.y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          if (distance < MOUSE_RADIUS) {
            const strength =
              (1 -
                distance / MOUSE_RADIUS) *
              0.012;

            n.vx += dx * strength;
            n.vy += dy * strength;
          }
        }

        // =======================================
        // VERY SMOOTH MOVEMENT
        // =======================================

        n.vx *= 0.985;
        n.vy *= 0.985;

        // Very small natural movement
        n.vx +=
          (Math.random() - 0.5) *
          0.001;

        n.vy +=
          (Math.random() - 0.5) *
          0.001;

        // Limit speed
        const maxSpeed = mouseActive
          ? 0.55
          : 0.12;

        n.vx = Math.max(
          -maxSpeed,
          Math.min(maxSpeed, n.vx)
        );

        n.vy = Math.max(
          -maxSpeed,
          Math.min(maxSpeed, n.vy)
        );

        // =======================================
        // LARGE NODE GLOW
        // =======================================

        if (n.r > 3) {
          const glow =
            ctx!.createRadialGradient(
              n.x,
              n.y,
              0,
              n.x,
              n.y,
              n.r * 7
            );

          glow.addColorStop(
            0,
            `hsla(37, 90%, 65%, ${
              n.glow * 0.8
            })`
          );

          glow.addColorStop(
            1,
            'transparent'
          );

          ctx!.beginPath();

          ctx!.arc(
            n.x,
            n.y,
            n.r * 7,
            0,
            Math.PI * 2
          );

          ctx!.fillStyle = glow;
          ctx!.fill();
        }

        // =======================================
        // NODE
        // =======================================

        ctx!.beginPath();

        ctx!.arc(
          n.x,
          n.y,
          n.r,
          0,
          Math.PI * 2
        );

        if (n.r > 3) {
          ctx!.fillStyle =
            `hsla(37, 90%, 65%, ${n.glow})`;
        } else if (n.r > 2) {
          ctx!.fillStyle =
            `hsla(37, 70%, 60%, ${
              n.glow * 0.8
            })`;
        } else {
          ctx!.fillStyle = BLUE;
        }

        ctx!.fill();

        // =======================================
        // MOVE
        // =======================================

        n.x += n.vx;
        n.y += n.vy;

        // Bounce from edges
        if (n.x < 0 || n.x > width) {
          n.vx *= -1;
        }

        if (n.y < 0 || n.y > height) {
          n.vy *= -1;
        }
      }
    }

    // =========================================
    // ANIMATION
    // =========================================

    function animate() {
      drawFrame();
      animId = requestAnimationFrame(animate);
    }

    // =========================================
    // RESIZE
    // =========================================

    const ro = new ResizeObserver(() => {
      resize();
      createNodes();
    });

    ro.observe(canvas);

    resize();
    createNodes();
    animate();

    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      window.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        opacity: 0.95,
        pointerEvents: 'none',
      }}
    />
  );
}
export default function Hero() {
  const { t } = useLang();

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
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
      {/* Animated Canvas — full Hero */}
<div className="absolute inset-0 w-full h-full pointer-events-none">
  <AINetworkCanvas />
</div>

     {/* Radial gradient overlay for left text area */}
<div
  className="absolute inset-y-0 left-0 w-full md:w-1/2 pointer-events-none"
  style={{
    background:
      'linear-gradient(to right, hsl(218, 49%, 16%) 60%, transparent)',
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
            className="text-6xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight mb-6 text-balance"
            style={{ animation: 'fadeInUp 0.6s 0.15s ease-out both' }}
          >
            {t.hero.headline1}
<span className="gold-ai">{t.hero.headlineAI}</span>
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
              to="/erstgespraech"
              className="inline-flex rounded-full items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm transition-all duration-150 hover:bg-accent"
            >
              {t.hero.ctaPrimary}
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/leistungen"
              className="inline-flex rounded-full items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-foreground border border-border hover:border-primary/50 hover:text-primary transition-all duration-150"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>

          {/* Blueprint annotation */}
          <div className="mt-10 flex items-center gap-4 text-mono text-muted-foreground/40">
            <div className="w-8 h-px bg-border" />
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
