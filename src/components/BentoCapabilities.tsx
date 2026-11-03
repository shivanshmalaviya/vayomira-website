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

      {/* Uniform 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {CAPABILITIES.map((cap) => {
          const Icon = cap.icon;

          return (
            <button
              type="button"
              key={cap.id}
              onMouseEnter={() => setActiveCardId(cap.id)}
              onMouseLeave={() => setActiveCardId(null)}
              onClick={() => onSelectCapability(cap)}
              className="group relative overflow-hidden rounded-2xl bg-[#090D1E]/80 backdrop-blur-xl border border-[#D4AF37]/20 p-8 sm:p-9 transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-[0_15px_35px_-8px_rgba(212,175,55,0.22)] hover:-translate-y-1 flex flex-col justify-between text-left cursor-pointer h-full min-h-[300px]"
            >
              {/* Radial Golden Light Glow Following Hover */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                  activeCardId === cap.id ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background:
                    'radial-gradient(400px circle at 50% 30%, rgba(212, 175, 55, 0.12), transparent 70%)',
                }}
              />

              {/* Top Row: Capability Number & Icon */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm font-mono tracking-widest text-[#D4AF37] font-bold">
                    {cap.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#020617] border border-[#D4AF37]/30 flex items-center justify-center text-[#F3E5AB] group-hover:scale-110 group-hover:border-[#D4AF37]/70 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors" />
                  </div>
                </div>

                {/* Subtitle Eyebrow */}
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#94A3B8]/80 block mb-2 font-mono">
                  {cap.subtitle}
                </span>

                {/* Main Heading Only (No paragraph text in resting state) */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] group-hover:text-[#F3E5AB] transition-colors leading-snug">
                  {cap.title}
                </h3>
              </div>

              {/* Bottom Interactive Prompt */}
              <div className="pt-6 border-t border-[#D4AF37]/15 flex items-center justify-between mt-6">
                <span className="text-xs uppercase tracking-[0.16em] font-semibold text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors">
                  Explore Workflow
                </span>
                <div className="w-7 h-7 rounded-full bg-[#020617] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:text-[#F8FAFC] group-hover:border-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
