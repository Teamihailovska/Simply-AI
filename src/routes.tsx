import React from 'react';
import type { ReactNode } from 'react';
import HomePage from './pages/Homepage';
import LeistungenPage from './pages/LeistungenPage';
import ProjektePage from './pages/ProjektePage';
import WorkshopsPage from './pages/WorkshopsPage';
import UeberUnsPage from './pages/UeberUnsPage';
import LegalPage from './pages/LegalPage';
import ErstgespraechPage from './pages/ErstgespraechPage';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  public?: boolean;
}

export const routes: RouteConfig[] = [
  { name: 'Home', path: '/', element: <HomePage />, public: true },
  { name: 'Leistungen', path: '/leistungen', element: <LeistungenPage />, public: true },
  { name: 'Projekte', path: '/projekte', element: <ProjektePage />, public: true },
  { name: 'Workshops', path: '/workshops', element: <WorkshopsPage />, public: true },
  { name: 'Über uns', path: '/ueber-uns', element: <UeberUnsPage />, public: true },
  { name: 'Erstgespräch', path: '/erstgespraech', element: <ErstgespraechPage />, public: true,
},
  {
    name: 'AGB',
    path: '/agb',
    element: <LegalPage titleKey="agbHeading" figLabel="FIG 3.1 — AGB" />,
    public: true,
  },
  {
    name: 'Impressum',
    path: '/impressum',
    element: <LegalPage titleKey="impressumHeading" figLabel="FIG 3.2 — IMPRESSUM" />,
    public: true,
  },
  {
    name: 'Datenschutz',
    path: '/datenschutz',
    element: <LegalPage titleKey="datenschutzHeading" figLabel="FIG 3.3 — DATENSCHUTZ" />,
    public: true,
  },
  {
    name: 'Dokumentation',
    path: '/dokumentation',
    element: <LegalPage titleKey="dokuHeading" figLabel="FIG 3.4 — DOKUMENTATION" />,
    public: true,
  },
];
