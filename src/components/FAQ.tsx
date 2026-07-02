import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem } from '../types';
import { Plus, Minus } from 'lucide-react';

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'turnaround',
    question: 'What is your turnaround timeframe?',
    answer: 'Initial digital proofs are prepared and delivered via a secured gallery workspace within 5 working days post-shoot. Fully graded and hand-retouched editorial masterworks require 14 working days.'
  },
  {
    id: 'travel',
    question: 'Do you travel for international projects?',
    answer: 'Absolutely. We handle campaigns globally. All international transit, accommodations, and customs logistics are cataloged transparently and incorporated within the custom project invoice.'
  },
  {
    id: 'licensing',
    question: 'Can I update or purchase expanded image rights later?',
    answer: 'Yes. Commercial or print license upgrades can be systematically requested at any time post-project via our archival workspace. We maintain archival storage of raw negatives for 2 years.'
  },
  {
    id: 'raws',
    question: 'Do you provide raw, unedited camera captures?',
    answer: 'We deliver exclusively finished, high-resolution graded and retouched masters. The selection and grading process is integral to the AURA aesthetic, ensuring every frame matches fine art guidelines.'
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-bg-base border-t border-b border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4 block">
            FAQ
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white tracking-tight">
            Common Inquiries
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border-b border-white/10 pb-4 transition-all duration-300"
                id={`faq-item-${item.id}`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left py-4 flex justify-between items-center group cursor-pointer focus:outline-none"
                >
                  <h3 className="font-display text-lg md:text-xl font-light text-white/90 group-hover:text-accent transition-colors duration-300">
                    {item.question}
                  </h3>
                  <div className="p-1 rounded-full text-accent transition-transform duration-300">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans font-light tracking-wide pb-4 pt-1 max-w-3xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
