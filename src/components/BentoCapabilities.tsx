import React, { useState } from 'react';
import { Film, Box, Sparkles, Sliders, ArrowUpRight } from 'lucide-react';

interface Capability {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  metrics: string;
  tools: string[];
  highlight: string;
}

const CAPABILITIES: Capability[] = [
  {
    id: 'ai-cinema',
    number: '01',
    title: 'Generative AI Cinema & Narrative Films',
    subtitle: 'Autonomous Worldbuilding & Neural Cinematography',
    description: 'Directing full-length feature narratives and cinematic shorts using state-of-the-art diffusion models, character consistency frameworks, and neural virtual cinematography.',
    icon: Film,
    tags: ['Veo 2 & Kling Pipelines', 'Latent Character Consistency', 'Long-Form Generative Lore', 'Neural Depth Motion'],
    metrics: '380+ Neural Scenes Directed',
    tools: ['Veo 2', 'Kling 1.5', 'ComfyUI Advanced', 'Runway Gen-3'],
    highlight: 'Pioneered custom multi-LoRA facial consistency pipelines for theatrical 4K DCI master exports.',
  },
  {
    id: 'cgi-vfx',
    number: '02',
    title: 'CGI, 3D Environments & VFX Compositing',
    subtitle: 'Photoreal Worlds & Procedural Simulation',
    description: 'Architecting photorealistic 3D landscapes, fluid mechanics, astronomical simulations, and intricate mechanical animations that push beyond physical filming constraints.',
    icon: Box,
    tags: ['Unreal Engine 5.5 Virtual Sets', 'Houdini Fluid & Pyro FX', 'Micro-Mechanical Renders', 'Volumetric Lighting'],
    metrics: 'Sub-Millimeter CAD Fidelity',
    tools: ['Unreal Engine 5.5', 'Houdini FX', 'Cinema 4D', 'Redshift GPU'],
    highlight: 'Real-time raytraced virtual production environments for immediate on-camera synchronicity.',
  },
  {
    id: 'brand-identity',
    number: '03',
    title: 'Commercial Brand Identity & Motion Systems',
    subtitle: 'Haute Horlogerie, Fashion & Luxury Brand Worlds',
    description: 'Crafting mesmerizing campaign films and visual identities for iconic luxury maisons, haute couture brands, and groundbreaking technology visionaries.',
    icon: Sparkles,
    tags: ['Haute Horlogerie Worlds', 'Kinetic Typography Choreography', 'Spatial Audio Branding', '3D Anamorphic Billboards'],
    metrics: 'Global Luxury Clientele',
    tools: ['After Effects', 'Marvelous Designer', 'Octane X', 'Ableton Live'],
    highlight: 'Award-winning commercial direction blending emotional brand storytelling with surreal technical mastery.',
  },
  {
    id: 'post-production',
    number: '04',
    title: 'Executive Post-Production & Finishing',
    subtitle: 'Mastering, Color Grading & Dolby Atmos Finishing',
    description: 'Precision film finishing, ARRI & RED color science mastery, neural high-resolution upscaling, and spatial audio mastering ready for global theatrical distribution.',
    icon: Sliders,
    tags: ['Dolby Vision HDR Mastering', 'ARRI Look Science & Film Grain', 'Neural 8K Detail Upscaling', '7.1.4 Spatial Atmos Mix'],
    metrics: 'Theatrical DCI Compliance',
    tools: ['DaVinci Resolve Studio', 'Nuke Studio', 'Baselight', 'ProTools HDX'],
    highlight: 'End-to-end color-accurate grading suites calibrated to DCI-P3 theatrical and HDR10 standards.',
  },
];

interface BentoCapabilitiesProps {
  onSelectCapability: (cap: Capability) => void;
}

export const BentoCapabilities: React.FC<BentoCapabilitiesProps> = ({ onSelectCapability }) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <section id="capabilities" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] font-mono text-[#D4AF37] font-medium">
          DISCIPLINES OF MASTERY
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#F8FAFC] tracking-tight">
          THE 4 CORE CAPABILITIES
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
          Bridging classical cinema composition with frontier generative intelligence and hyper-detailed CGI worldcraft.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {CAPABILITIES.map((cap, idx) => {
          const Icon = cap.icon;
          // Card 1: col-span-7, Card 2: col-span-5, Card 3: col-span-5, Card 4: col-span-7
          const colSpan =
            idx === 0
              ? 'lg:col-span-7'
              : idx === 1
              ? 'lg:col-span-5'
              : idx === 2
              ? 'lg:col-span-5'
              : 'lg:col-span-7';

          return (
            <div
              key={cap.id}
              onMouseEnter={() => setActiveCardId(cap.id)}
              onMouseLeave={() => setActiveCardId(null)}
              onClick={() => onSelectCapability(cap)}
              className={`${colSpan} group relative overflow-hidden rounded-2xl bg-[#090D1E]/75 backdrop-blur-xl border border-[#D4AF37]/15 p-8 sm:p-10 transition-all duration-500 hover:border-[#D4AF37]/45 hover:shadow-[0_15px_40px_-10px_rgba(212,175,55,0.15)] flex flex-col justify-between cursor-pointer`}
            >
              {/* Radial Golden Light Sweep Following Hover */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                  activeCardId === cap.id ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background:
                    'radial-gradient(600px circle at 50% 30%, rgba(212, 175, 55, 0.08), transparent 60%)',
                }}
              />

              {/* Top Row: Number & Icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono tracking-widest text-[#D4AF37] font-semibold">
                      {cap.number}.
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
                      {cap.subtitle}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#020617] border border-[#D4AF37]/25 flex items-center justify-center text-[#F3E5AB] group-hover:scale-110 group-hover:border-[#D4AF37]/60 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] group-hover:text-[#F3E5AB] transition-colors mb-3 leading-snug">
                  {cap.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {cap.description}
                </p>

                {/* Highlight Quote Box */}
                <div className="p-3.5 rounded-lg bg-[#020617]/60 border border-[#D4AF37]/10 text-xs text-[#F8FAFC]/90 italic mb-6">
                  "{cap.highlight}"
                </div>
              </div>

              {/* Bottom Row: Unboxed Tags + Trigger Button */}
              <div className="pt-4 border-t border-[#D4AF37]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Zero-Pill Unboxed Metadata with · separator */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
                  {cap.tags.slice(0, 3).map((tag, tIdx) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {tIdx < 2 && <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0">
                  <span>Explore Workflow</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
