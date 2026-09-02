import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useLang();

  const companyLinks = [
    { label: t.nav.services, href: '/leistungen' },
    { label: t.nav.projects, href: '/projekte' },
    { label: t.nav.workshops, href: '/workshops' },
    { label: t.nav.about, href: '/ueber-uns' },
  ];

  const legalLinks = [
    { label: t.footer.agb, href: '/agb' },
    { label: t.footer.impressum, href: '/impressum' },
    { label: t.footer.datenschutz, href: '/datenschutz' },
    { label: t.footer.doku, href: '/dokumentation' },
  ];

  return (
    <footer
      className="relative border-t border-border"
      style={{ backgroundColor: 'hsl(218 45% 5%)' }}
    >
      {/* Blueprint top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-primary opacity-30" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(hsl(220 90% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 90% 60%) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img
                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-e4bxlpfp93pc/app-e4c2ja825s75/20260901/Logo.png"
                alt="SimplyAI"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mt-3">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <MapPin size={12} className="text-primary" />
              <span className="text-mono">{t.footer.location}</span>
            </div>
          </div>

          {/* Company links */}
          <div>
            <p className="section-label mb-4">{t.footer.company}</p>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <p className="section-label mb-4">{t.footer.legal}</p>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-mono">
            {t.footer.copyright} — {t.footer.location}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
