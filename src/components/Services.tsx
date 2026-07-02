import { motion } from 'motion/react';
import { ServicePackage } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

const SERVICES: ServicePackage[] = [
  {
    id: 'editorial',
    num: '01',
    title: 'Editorial Campaigns',
    description: 'Full-day high-fashion and commercial lookbooks designed with refined visual narratives and curated sets.',
    features: [
      'Concept moodboard draft & styling notes',
      'Studio or professional location scouting',
      'Advanced beauty & clothing retouching',
      'Commercial digital delivery (Full rights)'
    ],
    price: '$2,400'
  },
  {
    id: 'portraiture',
    num: '02',
    title: 'Artistic Portraiture',
    description: 'Intimate, meticulously directed portrait sessions tailored specifically for artists, founders, and creatives.',
    features: [
      '3-hour custom directed session',
      '2 dynamic in-studio or local set designs',
      '20 carefully curated & graded master prints',
      'Private online archival gallery'
    ],
    price: '$1,200'
  },
  {
    id: 'commercial',
    num: '03',
    title: 'Commercial Licensing',
    description: 'Bespoke campaign imagery crafted for high-end brands demanding precise visual architecture and global licenses.',
    features: [
      'Multi-platform global web & print license',
      'Custom color-grading & asset architecture',
      'Direct on-set creative management',
      'Priority rapid master delivery (<5 days)'
    ],
    price: 'Contact for Quote'
  }
];

export default function Services({ onSelectService }: ServicesProps) {
  return (
    <section id="services" className="py-24 md:py-36 bg-bg-surface border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="max-w-2xl mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4 block">
            Commissions
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
            Available Sessions
          </h2>
          <p className="text-sm md:text-base text-text-muted mt-6 font-sans font-light leading-relaxed tracking-wide">
            Each project is custom-designed, starting with a comprehensive moodboard review to establish exact visual goals. We maintain a limited intake monthly to guarantee uncompromised focus on each campaign.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-bg-base border border-white/5 p-8 md:p-10 flex flex-col justify-between hover:border-accent/40 hover:translate-y-[-4px] transition-all duration-500 relative group"
              id={`service-card-${service.id}`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-display text-4xl font-light italic text-accent/20 group-hover:text-accent/40 transition-colors duration-500">
                    {service.num}
                  </span>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="p-2 border border-white/5 rounded-full group-hover:border-accent/40 group-hover:bg-accent/5 text-text-muted group-hover:text-accent transition-all duration-500 cursor-pointer"
                    aria-label={`Inquire about ${service.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-light text-white mt-8 mb-6 group-hover:text-accent transition-colors duration-500">
                  {service.title}
                </h3>

                <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans font-light mb-8">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-10 text-xs text-text-muted font-sans font-light">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <span className="text-accent/60 mt-0.5 select-none">&mdash;</span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing & Booking Action */}
              <div className="border-t border-white/5 pt-8 mt-auto flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-text-muted block mb-1">
                    Commission Fee
                  </span>
                  <span className="font-sans text-white font-medium text-sm md:text-base">
                    {service.price}
                  </span>
                </div>
                <button
                  onClick={() => onSelectService(service.title)}
                  className="text-xs uppercase tracking-[0.15em] font-semibold text-accent hover:text-white transition-colors duration-300 font-sans cursor-pointer"
                >
                  Book Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
