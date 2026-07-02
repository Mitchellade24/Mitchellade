interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const socialLinks = [
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'Behance', url: 'https://behance.net' },
    { label: 'Vimeo', url: 'https://vimeo.com' },
  ];

  const quickLinks = [
    { label: 'Philosophy', id: 'about' },
    { label: 'The Gallery', id: 'portfolio' },
    { label: 'Sessions & Pricing', id: 'services' },
    { label: 'Secure Booking', id: 'booking' },
    { label: 'Get in Touch', id: 'contact' },
  ];

  return (
    <footer className="bg-bg-surface border-t border-white/5 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pb-16 border-b border-white/5">
          
          {/* Brand and Description */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-display text-3xl font-semibold tracking-[0.18em] text-white hover:text-accent transition-colors duration-300"
            >
              AURA
            </a>
            <p className="text-text-muted text-xs md:text-sm font-sans font-light leading-relaxed max-w-sm">
              Fine art editorial photography, commercial campaigns, and stylized studio portraiture for luxury visual purists. Based in London & Paris, shooting globally.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mb-6">
              Navigation Index
            </h5>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans font-light text-text-muted">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-white transition-colors duration-300 cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Connect */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mb-6">
              Connect Digital
            </h5>
            <ul className="space-y-3 text-xs font-sans font-light text-text-muted">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-300 flex items-center gap-1.5 w-fit"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom copyright and status */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-text-muted font-sans font-light gap-4">
          <p>
            &copy; {new Date().getFullYear()} AURA Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 bg-white/[0.01] border border-white/5 px-3 py-1.5 text-[9px] uppercase tracking-wider text-accent rounded-sm">
            <span>Designed with luxury minimalism</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
