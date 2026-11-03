/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSequenceCanvas } from './components/HeroSequenceCanvas';
import { BentoCapabilities } from './components/BentoCapabilities';
import { FullscreenShowcase } from './components/FullscreenShowcase';
import { FounderSection } from './components/FounderSection';
import { ConciergeInquiry } from './components/ConciergeInquiry';
import { Footer } from './components/Footer';
import { ProjectBreakdownModal } from './components/ProjectBreakdownModal';
import { StudioManagerModal } from './components/StudioManagerModal';
import { Project, loadProjects } from './utils/projectData';
import { ambientSound } from './utils/audioAmbience';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isManagerOpen, setIsManagerOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Capability detail drawer state
  const [selectedCapability, setSelectedCapability] = useState<{
    id?: string;
    number?: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    metrics: string;
    tools: string[];
    highlight: string;
  } | null>(null);

  const handleToggleAudio = () => {
    const active = ambientSound.toggle();
    setIsAudioPlaying(active);
  };

  const handleExploreClick = () => {
    const elem = document.getElementById('capabilities');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenInquiry = () => {
    const elem = document.getElementById('concierge');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* Top Navigation Bar */}
      <Navbar
        onOpenManager={() => setIsManagerOpen(true)}
        onOpenInquiry={handleOpenInquiry}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* SECTION 1: Scroll-Driven 3D Dolly Hero */}
      <HeroSequenceCanvas onExploreClick={handleExploreClick} />

      {/* SECTION 2: The 4 Core Capabilities Uniform Grid */}
      <BentoCapabilities
        onSelectCapability={(cap) => setSelectedCapability(cap)}
      />

      {/* SECTION 3: Full-Screen Cinematic Project Showcase */}
      <FullscreenShowcase
        projects={projects}
        onOpenProject={(project) => setSelectedProject(project)}
      />

      {/* SECTION 4: The Creative Director — Shivansh Malaviya */}
      <FounderSection />

      {/* SECTION 5: Client Inquiry Concierge */}
      <ConciergeInquiry />

      {/* SECTION 6: Monumental Footer */}
      <Footer
        onOpenManager={() => setIsManagerOpen(true)}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* MODAL 1: Project Theatre Breakdown Lightbox */}
      <ProjectBreakdownModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* MODAL 2: Built-in Visual Studio Manager (PIN: 2026) */}
      <StudioManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        projects={projects}
        onProjectsChange={(updated) => setProjects(updated)}
      />

      {/* MODAL 3: Capability Workflow Detail Pop-up */}
      {selectedCapability && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020617]/85 backdrop-blur-xl animate-fade-in"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedCapability(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#090D1E] border border-[#D4AF37]/35 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-[#D4AF37]/20">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  {selectedCapability.number && (
                    <span className="text-xs font-mono font-bold text-[#D4AF37] px-2 py-0.5 rounded bg-[#020617] border border-[#D4AF37]/30">
                      {selectedCapability.number}
                    </span>
                  )}
                  <span className="text-[11px] uppercase tracking-widest font-mono text-[#F3E5AB]">
                    {selectedCapability.subtitle}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                  {selectedCapability.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCapability(null)}
                aria-label="Close capability details"
                className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Detailed Description */}
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              {selectedCapability.description}
            </p>

            {/* Highlight Quote */}
            <div className="p-4 rounded-xl bg-[#020617] border border-[#D4AF37]/20 text-xs sm:text-sm text-[#F3E5AB] italic">
              "{selectedCapability.highlight}"
            </div>

            {/* Workflow Tools */}
            {selectedCapability.tools && selectedCapability.tools.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-wider font-mono text-[#D4AF37] block mb-2.5">
                  CORE PRODUCTION PIPELINE & ENGINES
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCapability.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 text-xs rounded-lg bg-[#020617] border border-[#D4AF37]/25 text-[#F8FAFC] font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specs */}
            <div>
              <span className="text-xs uppercase tracking-wider font-mono text-[#D4AF37] block mb-2.5">
                TECHNICAL CAPABILITIES & WORKFLOW STANDARDS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedCapability.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-2 text-xs text-[#F8FAFC] bg-[#020617]/50 p-2 rounded-lg border border-[#D4AF37]/10">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-3 border-t border-[#D4AF37]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-[#94A3B8]">
                Standard: <strong className="text-[#F3E5AB]">{selectedCapability.metrics}</strong>
              </span>

              <button
                onClick={() => {
                  setSelectedCapability(null);
                  handleOpenInquiry();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#020617] bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
              >
                <span>Commission This Discipline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
