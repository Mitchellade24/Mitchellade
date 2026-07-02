import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-start overflow-hidden px-6 md:px-12 xl:px-24">
      {/* Background with zoom animation */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000"
            alt="Editorial Photography Scene"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        {/* Luxury Vignette and Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-base via-bg-base/70 to-transparent md:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/60 to-bg-base/30 md:hidden" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-bg-base/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl pt-16">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs md:text-sm uppercase tracking-[0.35em] text-accent font-medium mb-5"
        >
          Editorial & Fine Art Photographer
        </motion.p>

        <motion.h1
          initial={{ y: 35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.7 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[1.05] mb-8"
        >
          Capturing <br />
          <span className="italic font-normal text-accent select-none">The Silent Stories</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-text-muted text-sm md:text-base max-w-lg mb-12 font-sans font-light leading-relaxed tracking-wide"
        >
          Sculpting space, dynamic illumination, and structural narrative to capture eternal moments. Commissioning global campaigns and personal portraits.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <button
            onClick={() => onNavigate('portfolio')}
            className="text-xs uppercase tracking-[0.2em] font-medium bg-white text-bg-base hover:bg-accent hover:text-white px-8 py-4 transition-all duration-300 font-sans cursor-pointer"
            id="hero-cta-portfolio"
          >
            Explore Gallery
          </button>
          <button
            onClick={() => onNavigate('booking')}
            className="text-xs uppercase tracking-[0.2em] font-medium border border-white/20 hover:border-accent text-white hover:text-accent px-8 py-4 transition-all duration-300 font-sans cursor-pointer"
            id="hero-cta-booking"
          >
            Book Session
          </button>
        </motion.div>
      </div>

      {/* Luxury Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 right-6 md:right-12 xl:right-24 flex flex-col items-center gap-6 cursor-pointer"
        onClick={() => onNavigate('about')}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted writing-mode-vertical rotate-180 select-none">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <motion.div
            animate={{
              y: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
