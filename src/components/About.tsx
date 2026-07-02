import { motion } from 'motion/react';

export default function About() {
  const metrics = [
    { num: '12+', label: 'Years of Craft' },
    { num: '150+', label: 'Published Editorials' },
    { num: '30+', label: 'Global Brands' },
  ];

  return (
    <section id="about" className="py-24 md:py-36 bg-bg-base overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Side: Photo Frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative group"
            id="about-img-frame"
          >
            <div className="overflow-hidden border border-white/5 aspect-[3/4] relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000"
                alt="Portrait of the artist"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-accent/5 mix-blend-color group-hover:opacity-0 transition-opacity duration-1000" />
            </div>
            {/* Minimal architectural frame accents */}
            <div className="absolute -bottom-4 -right-4 w-24 h-[1px] bg-accent/30 group-hover:w-32 transition-all duration-700" />
            <div className="absolute -bottom-4 -right-4 w-[1px] h-24 bg-accent/30 group-hover:h-32 transition-all duration-700" />
          </motion.div>

          {/* Right Side: Philosophy Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
            id="about-details"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4 block">
              Philosophy & Method
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white tracking-tight mb-8">
              Visualizing depth through stripped-down <span className="italic font-normal text-accent">minimalism</span>.
            </h2>

            <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6 font-sans font-light tracking-wide">
              I believe that absolute silence in an image speaks volumes. My practice centers around natural lighting, high-contrast shadows, and deep human connection. Rather than cluttering frames with distraction, we strip away the noise to discover structural elegance and pure identity.
            </p>

            <p className="text-text-muted text-sm md:text-base leading-relaxed mb-12 font-sans font-light tracking-wide">
              Whether shooting campaigns for editorial directors or composing intimate personal portraitures, each frame is approached as an architectural canvas—sculpted by light and aligned to the exact rhythm of the subject.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 md:gap-10 border-t border-white/5 pt-8">
              {metrics.map((metric, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-display text-3xl md:text-5xl font-light text-accent mb-2">
                    {metric.num}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-text-muted font-sans font-light">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
