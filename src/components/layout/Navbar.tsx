import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t.nav.services, href: '/leistungen' },
    { label: t.nav.projects, href: '/projekte' },
    { label: t.nav.workshops, href: '/workshops' },
    { label: t.nav.about, href: '/ueber-uns' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
<header
className="navbar-glow fixed top-4 left-3 right-3 md:top-6 md:left-8 md:right-8 z-50 transition-all duration-300"  style={{
    backgroundColor: 'transparent',
    backdropFilter: 'blur(8px)',
    border: '1px solid hsl(218 30% 20% / 0.6)',
    borderRadius: '9999px',
  }}
>
  
<div className="max-w-7xl mx-auto px-4 md:px-8">
  <div className="flex items-center justify-between h-14 md:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-e4bxlpfp93pc/app-e4c2ja825s75/20260901/Logo.png"
                alt="SimplyAI"
                className="h-6 md:h-8 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-150 relative group ${
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-primary" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                to="/#contact"
                className="hidden md:inline-flex rounded-full items-center px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground transition-all duration-150 hover:bg-accent border border-primary/20"
                style={{ letterSpacing: '0.02em' }}
              >
                {t.nav.cta}
              </Link>
              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen((p) => !p)}
                className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-16"
          style={{ backgroundColor: 'hsl(218 45% 7% / 0.98)', backdropFilter: 'blur(16px)' }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(hsl(220 90% 60% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(220 90% 60% / 0.3) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <nav className="relative flex flex-col px-6 pt-8 gap-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between py-4 border-b text-lg font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'text-primary border-primary/30'
                    : 'text-foreground/80 border-border hover:text-foreground'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-mono text-muted-foreground">
                  0{i + 1}
                </span>
              </Link>
            ))}
            <Link
              to="/#contact"
              onClick={() => setMobileOpen(false)}
className="mt-6 w-full flex items-center justify-center py-4 bg-primary text-primary-foreground font-semibold text-base rounded-lg"            >
              {t.nav.cta}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
