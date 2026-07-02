import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Philosophy', id: 'about' },
    { label: 'Selected Works', id: 'portfolio' },
    { label: 'Services', id: 'services' },
    { label: 'Reserve', id: 'booking' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-bg-base/90 backdrop-blur-md py-4 border-white/5'
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-2xl md:text-3xl font-semibold tracking-[0.18em] hover:text-accent transition-colors duration-300"
          id="logo-brand"
        >
          AURA
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="text-xs uppercase tracking-[0.2em] text-text-muted hover:text-accent transition-colors duration-300 cursor-pointer font-sans"
              id={`nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => handleItemClick('booking')}
            className="text-xs uppercase tracking-[0.15em] border border-accent/30 hover:border-accent text-white hover:text-accent px-5 py-2.5 transition-all duration-300 font-sans"
            id="nav-cta-book"
          >
            Commission
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-accent transition-colors duration-300 focus:outline-none"
          aria-label="Toggle Navigation Menu"
          id="mobile-menu-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[70px] bg-bg-base z-40 md:hidden flex flex-col px-8 py-12 justify-between animate-fade-in"
          style={{ height: 'calc(100vh - 70px)' }}
        >
          <nav className="flex flex-col gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="text-left text-lg font-display tracking-[0.1em] text-white/95 hover:text-accent transition-colors duration-300"
                id={`mobile-nav-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-6 border-t border-white/5 pt-8">
            <button
              onClick={() => handleItemClick('booking')}
              className="w-full text-center text-sm uppercase tracking-[0.15em] bg-white text-bg-base font-semibold py-4 hover:bg-accent hover:text-white transition-all duration-300 font-sans"
            >
              Reserve Session
            </button>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted text-center">
              Fine Art Editorial & Portraiture
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
