import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimonial } from '../types';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "The entire workflow was curated flawlessly. Every single frame captured felt like gallery-ready fine art. A true artist who understands modern design grammar and absolute silence.",
    author: "Elena Thorne",
    role: "Vogue Creative Director"
  },
  {
    id: '2',
    quote: "Aura is outstanding. Working with someone who doesn't just shoot but sculpts three-dimensional space with lighting is rare. Our autumn lookbook is a masterclass in clean luxury.",
    author: "Marcus Vance",
    role: "Sartor Label Founder"
  },
  {
    id: '3',
    quote: "Minimalism is easy to discuss but difficult to capture with camera lenses. Aura executes this with pristine focus, rendering skin grains, textile patterns, and deep silhouettes gorgeously.",
    author: "Sophia Sterling",
    role: "Architectural Digest Publisher"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-24 bg-bg-surface overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        {/* Floating Quote Icon */}
        <div className="flex justify-center mb-10 text-accent/15">
          <Quote className="w-14 h-14" />
        </div>

        {/* Carousel Slide container */}
        <div className="min-h-[220px] md:min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center"
              id={`testimonial-slide-${TESTIMONIALS[activeIndex].id}`}
            >
              <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl font-light italic text-white/90 leading-relaxed mb-8 max-w-3xl">
                "{TESTIMONIALS[activeIndex].quote}"
              </blockquote>
              <cite className="font-sans not-italic text-accent text-xs uppercase tracking-[0.2em] font-medium block mb-1">
                &mdash; {TESTIMONIALS[activeIndex].author}
              </cite>
              <span className="text-[10px] uppercase tracking-[0.15em] text-text-muted font-sans font-light">
                {TESTIMONIALS[activeIndex].role}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Navigation Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="p-3 border border-white/5 rounded-full hover:border-accent/40 text-text-muted hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2.5">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'bg-accent w-4' : 'bg-white/10 hover:bg-white/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 border border-white/5 rounded-full hover:border-accent/40 text-text-muted hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
