import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, Send } from 'lucide-react';

interface ContactProps {
  selectedService: string;
}

export default function Contact({ selectedService }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [service, setService] = useState('Campaign');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-update local state when global service state changes
  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
      // Automatically scroll to Contact form if a package was clicked
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedService]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !brief) return;

    setLoading(true);
    // Simulate luxury transmission delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Reset after brief interval
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setBrief('');
      }, 6000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Side: Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4 block">
                Contact
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-8">
                Let us create <br />
                something <span className="italic font-normal text-accent">tactile</span>.
              </h2>
              <p className="text-sm md:text-base text-text-muted font-sans font-light leading-relaxed tracking-wide mb-10 max-w-md">
                We accept limited corporate commissions and fine art publications worldwide. Write us with your project coordinates to arrange a direct telephone briefing.
              </p>
            </div>

            <div className="border-t border-white/5 pt-8 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-accent block mb-2">
                  General Inquiries & Bookings
                </span>
                <a
                  href="mailto:studio@auraphotography.com"
                  className="font-display text-xl md:text-2xl font-light text-white hover:text-accent transition-colors duration-300 flex items-center gap-2 w-fit"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  studio@auraphotography.com
                </a>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                Based in Paris & London &bull; Available Worldwide
              </p>
            </div>
          </div>

          {/* Right Side: Tactile Form */}
          <div className="lg:col-span-7">
            <div className="bg-bg-surface border border-white/10 p-8 md:p-10 rounded-sm relative">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    id="contact-form-element"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-[10px] uppercase tracking-[0.15em] text-accent">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Elena Thorne"
                          className="bg-bg-base border border-white/5 p-4 text-xs md:text-sm text-white focus:outline-none focus:border-accent font-sans transition-all duration-300"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-[10px] uppercase tracking-[0.15em] text-accent">
                          Email Coordinates
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. elena@vogue.com"
                          className="bg-bg-base border border-white/5 p-4 text-xs md:text-sm text-white focus:outline-none focus:border-accent font-sans transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="service-type" className="text-[10px] uppercase tracking-[0.15em] text-accent">
                        Commission Category
                      </label>
                      <select
                        id="service-type"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="bg-bg-base border border-white/5 p-4 text-xs md:text-sm text-white focus:outline-none focus:border-accent font-sans transition-all duration-300 cursor-pointer appearance-none"
                      >
                        <option value="Editorial Campaigns">Editorial Campaigns</option>
                        <option value="Artistic Portraiture">Artistic Portraiture</option>
                        <option value="Commercial Licensing">Commercial Licensing</option>
                        <option value="Other Project">Other / Custom Inquiry</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="brief" className="text-[10px] uppercase tracking-[0.15em] text-accent">
                        Tactile Project Coordinates
                      </label>
                      <textarea
                        id="brief"
                        required
                        rows={5}
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        placeholder="Detail your publication specifications, mood references, timing requirements, and target location parameters."
                        className="bg-bg-base border border-white/5 p-4 text-xs md:text-sm text-white focus:outline-none focus:border-accent font-sans resize-none transition-all duration-300 leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 text-xs uppercase tracking-[0.25em] font-semibold bg-white text-bg-base hover:bg-accent hover:text-white disabled:opacity-50 transition-all duration-500 cursor-pointer flex items-center justify-center gap-2 font-sans"
                    >
                      {loading ? (
                        <>
                          <div className="w-3.5 h-3.5 border border-bg-base border-t-transparent rounded-full animate-spin" />
                          <span>Transmitting Brief...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Transmit Brief</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  /* Elegant tactile confirmation success overlay */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center flex flex-col items-center justify-center"
                    id="contact-success-frame"
                  >
                    <div className="w-12 h-12 bg-accent/10 border border-accent/25 rounded-full flex items-center justify-center text-accent mb-6">
                      <Check className="w-5 h-5 animate-pulse" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-accent block mb-2 font-semibold">
                      ARCHIVAL COMMUNICATE SECURED
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
                      Inquiry Transmitted
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed font-sans font-light max-w-sm mx-auto mb-6">
                      We have compiled your coordinates. A representative will contact you at <strong>{email}</strong> within 12 working hours to schedule a verbal brief.
                    </p>
                    <div className="border border-white/5 bg-bg-base px-4 py-2 font-mono text-[10px] text-accent uppercase tracking-wider rounded">
                      STATUS: TRANSMITTED
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
