import React, { useState } from 'react';
import { Project } from '../utils/projectData';
import { Play, Sparkles, SlidersHorizontal, Award } from 'lucide-react';

interface FullscreenShowcaseProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export const FullscreenShowcase: React.FC<FullscreenShowcaseProps> = ({
  projects,
  onOpenProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Generative AI Cinema', label: 'AI Cinema' },
    { id: 'CGI & Luxury Commercial', label: 'CGI Commercial' },
    { id: 'Sci-Fi Narrative Short', label: 'Narrative Short' },
    { id: 'Art Installation & Sound', label: 'Spatial Installation' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="showcase" className="relative z-10 w-full bg-[#020617]" aria-label="Fullscreen Cinematic Portfolio">
      {/* Showcase Sticky Kicker & Filter Bar */}
      <div className="sticky top-20 z-30 py-4 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 bg-[#020617]/90 backdrop-blur-md border-b border-[#D4AF37]/15">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] font-mono text-[#D4AF37] font-medium">
            EDITORIAL PORTFOLIO
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
            FULL-SCREEN CINEMATIC WORKS
          </h2>
        </div>

        {/* Functional Category Filter Segmented Control */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#090D1E] rounded-xl border border-[#D4AF37]/20">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] text-[#020617] font-semibold shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#020617]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Full-Screen Project Viewports */}
      <div className="divide-y divide-[#D4AF37]/15">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="group relative min-h-screen w-full flex items-end justify-start overflow-hidden px-6 sm:px-12 md:px-16 pb-16 sm:pb-24 pt-32"
          >
            {/* Dynamic Parallax Background Backdrop */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} transition-transform duration-1000 ease-out group-hover:scale-105`}
            >
              {/* Subtle Atmospheric Light Beams & Nebula Texture */}
              <div
                className="absolute inset-0 opacity-40 mix-blend-screen"
                style={{
                  backgroundImage: `radial-gradient(circle at 60% 40%, ${project.accentColor}33 0%, transparent 60%)`,
                }}
              />

              {/* Cinematic Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-[#020617]/40" />
            </div>

            {/* Background Graphic Watermark */}
            <div className="absolute top-1/2 right-12 -translate-y-1/2 pointer-events-none select-none opacity-5 group-hover:opacity-10 transition-opacity duration-700 hidden lg:block">
              <span className="font-bold text-9xl tracking-tighter text-[#F8FAFC]">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Editorial Card Overlay */}
            <div className="relative z-20 max-w-4xl space-y-6">
              {/* Clean Unboxed Metadata with · separator (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs tracking-[0.2em] uppercase font-mono text-[#D4AF37]">
                <span className="font-semibold">{project.category}</span>
                <span className="text-[#94A3B8]/60" aria-hidden="true">·</span>
                <span>{project.client}</span>
                <span className="text-[#94A3B8]/60" aria-hidden="true">·</span>
                <span>{project.year}</span>
                <span className="text-[#94A3B8]/60" aria-hidden="true">·</span>
                <span>{project.runtime}</span>
                <span className="text-[#94A3B8]/60" aria-hidden="true">·</span>
                <span>{project.aspectRatio}</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F8FAFC] leading-none mb-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-lg text-[#F3E5AB] tracking-wide font-normal">
                  {project.subtitle}
                </p>
              </div>

              {/* Atmospheric Synopsis */}
              <p className="max-w-2xl text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
                {project.synopsis}
              </p>

              {/* Key Tools Strip */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#94A3B8]/80">
                <span className="text-[#D4AF37] font-semibold uppercase tracking-wider">PIPELINE:</span>
                {project.tools.map((tool, tIdx) => (
                  <React.Fragment key={tool}>
                    <span>{tool}</span>
                    {tIdx < project.tools.length - 1 && (
                      <span className="text-[#D4AF37]/40" aria-hidden="true">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Award Laurel Callout (Claim-to-proof adjacency) */}
              {project.awards.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-[#F3E5AB] italic">
                  <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{project.awards[0]}</span>
                </div>
              )}

              {/* Primary Action Button: "Enter Cinematic Breakdown" */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenProject(project)}
                  className="group/btn inline-flex items-center gap-3 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#020617] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C59B27] rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.55)] hover:scale-[1.02] transition-all duration-300"
                >
                  <span className="w-6 h-6 rounded-full bg-[#020617] text-[#D4AF37] flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </span>
                  <span>Enter Cinematic Breakdown · Watch Reel</span>
                </button>
              </div>
            </div>

            {/* Corner Badge Aspect Ratio HUD */}
            <div className="absolute bottom-10 right-8 sm:right-12 hidden md:flex items-center gap-3 text-xs tracking-widest text-[#94A3B8]/60 font-mono">
              <span>{project.aspectRatio}</span>
              <span className="text-[#D4AF37]/50">·</span>
              <span className="text-[#F3E5AB]">4K DCI DCP READY</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
