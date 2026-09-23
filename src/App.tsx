import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import { Toaster } from '@/components/ui/sonner';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { routes } from './routes';
import AdminPage from './pages/admin/AdminPage';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <IntersectObserver />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster richColors position="top-right" />
      </Router>
    </LanguageProvider>
  );
};

export default App;
