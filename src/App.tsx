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

      {/* SECTION 2: The 4 Core Capabilities Bento Grid */}
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

      {/* MODAL 3: Capability Workflow Detail Drawer */}
      {selectedCapability && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020617]/85 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-[#090D1E] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/15">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#D4AF37] block">
                  CAPABILITY DEEP DIVE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                  {selectedCapability.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCapability(null)}
                aria-label="Close capability details"
                className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {selectedCapability.description}
            </p>

            <div className="p-4 rounded-xl bg-[#020617] border border-[#D4AF37]/15 text-xs text-[#F3E5AB] italic">
              "{selectedCapability.highlight}"
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-mono text-[#D4AF37] block mb-2.5">
                TECHNICAL SPECS & BENCHMARKS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCapability.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-2 text-xs text-[#F8FAFC]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-mono text-[#94A3B8]">
                Standard: <strong className="text-[#F3E5AB]">{selectedCapability.metrics}</strong>
              </span>

              <button
                onClick={() => {
                  setSelectedCapability(null);
                  handleOpenInquiry();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#020617] bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
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
