import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/section/Hero';
import Services from '@/components/section/Services';
import Trust from '@/components/section/Trust';
import Projects from '@/components/section/Projects';
import Process from '@/components/section/Proccess';
import Workshops from '@/components/section/Workshops';
import FinalCta from '@/components/section/FinalCta';
import ContactForm from '@/components/section/ContactForm';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Trust />
        <Projects />
        <Process />
        <Workshops />
        <FinalCta />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
