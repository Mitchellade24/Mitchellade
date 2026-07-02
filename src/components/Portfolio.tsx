import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, CloudinaryConfig } from '../types';
import { Settings, SlidersHorizontal, Image as ImageIcon, Camera, Eye, X, Check, HelpCircle } from 'lucide-react';

const FALLBACK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Quietude',
    category: 'editorial',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200',
    year: '2025',
    client: 'Vogue Italia',
    description: 'An architectural study of stillness, focusing on negative space, absolute shadow gradients, and high-fashion composure.',
    specs: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 80mm f/1.9',
      aperture: 'f/2.2',
      shutter: '1/160s',
      iso: '64'
    }
  },
  {
    id: '2',
    title: 'Sartorial Light',
    category: 'fashion',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200',
    year: '2026',
    client: 'L\'Officiel',
    description: 'High-contrast studio fashion layout capturing structural clothing textures against harsh directional light pools.',
    specs: {
      camera: 'Leica M11',
      lens: 'Noctilux-M 50mm f/0.95 ASPH',
      aperture: 'f/1.2',
      shutter: '1/500s',
      iso: '100'
    }
  },
  {
    id: '3',
    title: 'Monolith Portrait',
    category: 'portrait',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200',
    year: '2025',
    client: 'Creative Review',
    description: 'An intimate close-up profile highlighting natural facial micro-structures and high-contrast dynamic lighting overlays.',
    specs: {
      camera: 'Sony A7R V',
      lens: 'FE 85mm f/1.2 GM',
      aperture: 'f/1.4',
      shutter: '1/250s',
      iso: '100'
    }
  },
  {
    id: '4',
    title: 'Ethereal Form',
    category: 'fashion',
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200',
    year: '2026',
    client: 'Dazed & Confused',
    description: 'Capturing kinetic movement of silk textiles inside an industrial space, conveying a sculptural and ephemeral design theme.',
    specs: {
      camera: 'Fujifilm GFX 100S',
      lens: 'GF 110mm f/2 R LM WR',
      aperture: 'f/2.0',
      shutter: '1/200s',
      iso: '160'
    }
  },
  {
    id: '5',
    title: 'Minimal Shadow',
    category: 'editorial',
    imageUrl: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1200',
    year: '2024',
    client: 'Hypebeast',
    description: 'Outdoor shadow geometry using architectural structures, highlighting minimalist silhouettes with high dynamic range.',
    specs: {
      camera: 'Phase One XT',
      lens: 'Rodenstock HR Digaron-S 32mm f/4',
      aperture: 'f/8.0',
      shutter: '1/15s',
      iso: '50'
    }
  },
  {
    id: '6',
    title: 'Silent Frame',
    category: 'portrait',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200',
    year: '2025',
    client: 'Self Published',
    description: 'A study of absolute direct eye contact under ambient window lighting, prioritizing skin grain and direct emotional focus.',
    specs: {
      camera: 'Canon EOS R3',
      lens: 'RF 135mm f/1.8L IS USM',
      aperture: 'f/1.8',
      shutter: '1/400s',
      iso: '100'
    }
  }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'editorial' | 'fashion' | 'portrait'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Cloudinary settings state
  const [cloudConfig, setCloudConfig] = useState<CloudinaryConfig>({
    cloudName: '',
    tag: 'portfolio',
    enabled: false
  });
  const [showConfig, setShowConfig] = useState(false);
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch from Cloudinary if configured and enabled
  useEffect(() => {
    if (!cloudConfig.enabled || !cloudConfig.cloudName) {
      setProjects(FALLBACK_PROJECTS);
      setErrorMsg(null);
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    const jsonUrl = `https://res.cloudinary.com/${cloudConfig.cloudName}/image/list/${cloudConfig.tag}.json`;

    fetch(jsonUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not retrieve assets. Ensure "Resource List" is enabled in Cloudinary Security settings.');
        }
        return res.json();
      })
      .then((data: { resources: any[] }) => {
        if (!data.resources || data.resources.length === 0) {
          throw new Error('No images found with the designated tag.');
        }

        const cloudinaryProjects: Project[] = data.resources.map((res, index) => {
          const publicId = res.public_id;
          const format = res.format;
          const imageUrl = `https://res.cloudinary.com/${cloudConfig.cloudName}/image/upload/c_fill,g_auto,w_1200,h_1500,q_auto,f_auto/${publicId}.${format}`;
          
          // Pull tags or metadata if present, or assign fallback
          const categoryRaw = res.context?.custom?.category || 'editorial';
          const category = ['editorial', 'fashion', 'portrait'].includes(categoryRaw) 
            ? (categoryRaw as 'editorial' | 'fashion' | 'portrait') 
            : 'editorial';

          return {
            id: `cloudinary-${index}`,
            title: res.context?.custom?.title || `Untitled Form #${index + 1}`,
            category: category,
            imageUrl: imageUrl,
            year: res.context?.custom?.year || '2026',
            client: res.context?.custom?.client || 'Commission',
            description: res.context?.custom?.description || 'Refined high-resolution delivery fetched directly from custom Cloudinary workspace.',
            specs: {
              camera: res.context?.custom?.camera || 'Medium Format',
              lens: res.context?.custom?.lens || 'Prime Studio Lens',
              aperture: res.context?.custom?.aperture || 'f/2.8',
              shutter: res.context?.custom?.shutter || '1/200s',
              iso: res.context?.custom?.iso || '100'
            }
          };
        });

        setProjects(cloudinaryProjects);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err);
        setErrorMsg(err.message || 'Failed connecting to Cloudinary lists.');
        setLoading(false);
        // Fall back to gorgeous curated local ones
        setProjects(FALLBACK_PROJECTS);
      });
  }, [cloudConfig]);

  const filteredProjects = projects.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <section id="portfolio" className="py-24 bg-bg-base border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4 block">
              Selected Works
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              The Gallery
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            {/* Category Selectors */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              {(['all', 'editorial', 'fashion', 'portrait'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-xs uppercase tracking-[0.15em] font-sans px-3 py-1.5 transition-all duration-300 relative cursor-pointer ${
                    activeFilter === filter ? 'text-accent font-medium' : 'text-text-muted hover:text-white'
                  }`}
                >
                  {filter}
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="activeFilterUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Cloudinary Config Button */}
            <button
              onClick={() => setShowConfig(!showConfig)}
              className={`flex items-center gap-2 text-xs uppercase tracking-[0.15em] border px-4 py-2 transition-all duration-300 cursor-pointer font-sans ${
                cloudConfig.enabled 
                  ? 'border-accent text-accent bg-accent/5' 
                  : 'border-white/10 text-text-muted hover:border-white/30 hover:text-white'
              }`}
              id="cloudinary-config-btn"
            >
              <Settings className="w-3.5 h-3.5" />
              Cloudinary
            </button>
          </div>
        </div>

        {/* Cloudinary Config Panel (Drop-down drawer style) */}
        <AnimatePresence>
          {showConfig && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-bg-surface border border-white/10 p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-display text-xl text-white mb-2">Cloudinary Integration Workspace</h4>
                    <p className="text-xs text-text-muted max-w-2xl leading-relaxed">
                      Enable real-time synchronization with your Cloudinary media library. All images carrying the portfolio tag are automatically compiled, optimized via the CDN, and served in the portfolio list.
                    </p>
                  </div>
                  <button onClick={() => setShowConfig(false)} className="text-text-muted hover:text-white cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-accent">Cloud Name</label>
                    <input
                      type="text"
                      placeholder="e.g. dxy5n1pwt"
                      value={cloudConfig.cloudName}
                      onChange={(e) => setCloudConfig({ ...cloudConfig, cloudName: e.target.value })}
                      className="bg-bg-base border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-accent">Tag Identifier</label>
                    <input
                      type="text"
                      placeholder="e.g. portfolio"
                      value={cloudConfig.tag}
                      onChange={(e) => setCloudConfig({ ...cloudConfig, tag: e.target.value })}
                      className="bg-bg-base border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setCloudConfig({ ...cloudConfig, enabled: !cloudConfig.enabled })}
                      disabled={!cloudConfig.cloudName}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-300 cursor-pointer ${
                        cloudConfig.enabled && cloudConfig.cloudName
                          ? 'bg-accent text-bg-base hover:bg-accent/80'
                          : 'bg-white text-bg-base hover:bg-white/90 disabled:opacity-50'
                      }`}
                    >
                      {cloudConfig.enabled ? 'Live Mode' : 'Connect Cloud'}
                    </button>
                  </div>
                </div>

                {/* Cloudinary list setup helper */}
                <div className="mt-6 flex items-start gap-2 bg-white/[0.02] border border-white/5 p-4 rounded text-[11px] text-text-muted leading-relaxed">
                  <HelpCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-1">Mandatory Security Step</span>
                    To allow dynamic lists in client-side widgets, make sure to navigate to your <strong className="text-white">Cloudinary Dashboard &rarr; Settings &rarr; Security &rarr; Restricted Media Types</strong>, and <span className="text-accent underline">uncheck</span> "Resource List". This authorizes browser-level queries to the tag list endpoint.
                  </div>
                </div>

                {errorMsg && (
                  <div className="mt-4 text-xs text-red-400 bg-red-950/20 border border-red-900/30 p-3">
                    {errorMsg}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Fetching live assets...</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            id="portfolio-grid-items"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer flex flex-col"
                  data-cursor="view"
                  id={`project-card-${project.id}`}
                >
                  <div className="overflow-hidden border border-white/5 aspect-[4/5] relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-1000 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100 flex items-center gap-2 bg-bg-base/85 px-4 py-2 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-accent">
                        <Eye className="w-3.5 h-3.5" />
                        Examine Specs
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent block mb-2 font-medium">
                        {project.category}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-light text-white group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <span className="text-xs uppercase font-sans text-text-muted mt-1.5 font-light">
                      {project.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Dynamic Immersive Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg-base/98 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
            id="lightbox-container"
          >
            {/* Close Button on Outer */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-50 text-text-muted hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer p-2 bg-bg-surface rounded-full border border-white/5"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-6xl bg-bg-surface border border-white/15 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 my-auto"
            >
              {/* Image Column */}
              <div className="lg:col-span-7 aspect-[4/5] lg:aspect-auto relative bg-black flex items-center justify-center">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover lg:object-contain object-center max-h-[85vh]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Specs & Description Column */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-bg-surface">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium block mb-1">
                        {selectedProject.category}
                      </span>
                      <h3 className="font-display text-3xl font-light text-white">{selectedProject.title}</h3>
                    </div>
                    <span className="text-xs uppercase tracking-[0.1em] text-text-muted">{selectedProject.year}</span>
                  </div>

                  {/* Project Info Block */}
                  {selectedProject.client && (
                    <div className="mb-8">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium block mb-2">
                        Commission / Publisher
                      </span>
                      <p className="text-sm text-white font-sans font-light tracking-wide">{selectedProject.client}</p>
                    </div>
                  )}

                  <div className="mb-10">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium block mb-2">
                      Project Narrative
                    </span>
                    <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans font-light tracking-wide">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Camera Metadata (EXIF Specs) */}
                  {selectedProject.specs && (
                    <div className="border-t border-white/5 pt-8">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium block mb-5 flex items-center gap-2">
                        <Camera className="w-3.5 h-3.5" />
                        Technical Metadata
                      </span>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[11px] font-sans">
                        {selectedProject.specs.camera && (
                          <div className="flex flex-col gap-1">
                            <span className="text-text-muted uppercase tracking-[0.15em]">Camera</span>
                            <span className="text-white font-light">{selectedProject.specs.camera}</span>
                          </div>
                        )}
                        {selectedProject.specs.lens && (
                          <div className="flex flex-col gap-1">
                            <span className="text-text-muted uppercase tracking-[0.15em]">Lens Architecture</span>
                            <span className="text-white font-light">{selectedProject.specs.lens}</span>
                          </div>
                        )}
                        {selectedProject.specs.aperture && (
                          <div className="flex flex-col gap-1">
                            <span className="text-text-muted uppercase tracking-[0.15em]">Aperture</span>
                            <span className="text-white font-light">{selectedProject.specs.aperture}</span>
                          </div>
                        )}
                        {selectedProject.specs.shutter && (
                          <div className="flex flex-col gap-1">
                            <span className="text-text-muted uppercase tracking-[0.15em]">Shutter Speed</span>
                            <span className="text-white font-light">{selectedProject.specs.shutter}</span>
                          </div>
                        )}
                        {selectedProject.specs.iso && (
                          <div className="flex flex-col gap-1 col-span-2">
                            <span className="text-text-muted uppercase tracking-[0.15em]">ISO Rating</span>
                            <span className="text-white font-light">{selectedProject.specs.iso}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-12 border-t border-white/5 pt-6 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-sans">
                    Aura Archival Index
                  </span>
                  <button
                    onClick={() => {
                      const element = document.getElementById('booking');
                      if (element) {
                        setSelectedProject(null);
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-xs uppercase tracking-[0.15em] text-accent hover:text-white transition-colors duration-300 font-sans"
                  >
                    Inquire Similar &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
