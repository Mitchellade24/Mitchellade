/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [selectedService, setSelectedService] = useState('');

  // Universal smooth scroll navigation
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Direct callback when selecting a package/service
  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    // Smooth scroll down to contact form segment
    handleNavigate('contact');
  };

  return (
    <div className="bg-bg-base min-h-screen text-white flex flex-col antialiased">
      {/* Immersive Luxury Custom Cursor */}
      <Cursor />

      {/* Persistent Navigation Bar */}
      <Header onNavigate={handleNavigate} />

      {/* Core Architectural Sections */}
      <main className="flex-grow">
        <Hero onNavigate={handleNavigate} />
        
        <About />
        
        <Portfolio />
        
        <Services onSelectService={handleSelectService} />
        
        <Testimonials />
        
        <Booking />
        
        <FAQ />
        
        <Contact selectedService={selectedService} />
      </main>

      {/* Consolidated Footer Brand Guidelines */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
