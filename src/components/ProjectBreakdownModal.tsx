import React, { useState, useEffect } from 'react';
import { Project } from '../utils/projectData';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Award, Cpu, Film, CheckCircle2 } from 'lucide-react';

interface ProjectBreakdownModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectBreakdownModal: React.FC<ProjectBreakdownModalProps> = ({
  project,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'pipeline' | 'deliverables'>('overview');
  const [scrubberPos, setScrubberPos] = useState<number>(34); // percentage

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#020617]/90 backdrop-blur-2xl overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="relative w-full max-w-5xl bg-[#090D1E] border border-[#D4AF37]/30 rounded-2xl shadow-2xl shadow-black overflow-hidden my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/15 bg-[#020617]/70">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#F3E5AB]">
              CINEMATIC BREAKDOWN ROOM · {project.year}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#020617] rounded-lg border border-transparent hover:border-[#D4AF37]/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4K Cinema Simulation Player */}
        <div className="relative aspect-video w-full bg-[#020617] overflow-hidden flex items-center justify-center border-b border-[#D4AF37]/15">
          {/* Ambient Film Canvas Simulation */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} flex items-center justify-center`}
          >
            {/* Visual Light Burst Effect */}
            <div
              className={`w-96 h-96 rounded-full blur-3xl opacity-30 transition-all duration-1000 ${
                isPlaying ? 'scale-125 opacity-50' : 'scale-90 opacity-20'
              }`}
              style={{ backgroundColor: project.accentColor }}
            />

            {/* Stylized Project Center Frame Graphic */}
            <div className="relative z-10 text-center px-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono font-medium">
                DIRECTED BY SHIVANSH MALAVIYA
              </p>
              <h2
                id="modal-project-title"
                className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8FAFC] drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]"
              >
                {project.title}
              </h2>
              <div className="flex items-center justify-center gap-2 text-xs tracking-widest text-[#F3E5AB] font-mono">
                <span>{project.aspectRatio}</span>
                <span>·</span>
                <span>4K DCI COLOR MASTER</span>
                <span>·</span>
                <span>DOLBY ATMOS 7.1.4</span>
              </div>
            </div>
          </div>

          {/* Player HUD Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent flex flex-col gap-2 z-20">
            {/* Scrubber Bar */}
            <div
              className="w-full h-1.5 bg-[#090D1E] rounded-full cursor-pointer relative overflow-hidden group/bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                setScrubberPos(pos);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] rounded-full transition-all"
                style={{ width: `${scrubberPos}%` }}
              />
            </div>

            {/* Player Controls Row */}
            <div className="flex items-center justify-between pt-1 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause film' : 'Play film'}
                  className="p-1.5 rounded-md hover:bg-[#090D1E] text-[#F3E5AB] transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="p-1.5 rounded-md hover:bg-[#090D1E] text-[#94A3B8] hover:text-[#F3E5AB] transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-[#F8FAFC]">
                  {Math.floor((scrubberPos / 100) * 14)}:
                  {String(Math.floor(((scrubberPos / 100) * 14 * 60) % 60)).padStart(2, '0')}{' '}
                  / {project.runtime}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
                  {project.category}
                </span>
                <button
                  onClick={() => {
                    const elem = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
                  }}
                  aria-label="Toggle Fullscreen"
                  className="p-1.5 rounded-md hover:bg-[#090D1E] text-[#94A3B8] hover:text-[#F3E5AB] transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Segmented Detail Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#020617] rounded-xl border border-[#D4AF37]/20 w-fit">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-[#090D1E] text-[#F3E5AB] border border-[#D4AF37]/30 shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Director's Vision
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'pipeline'
                  ? 'bg-[#090D1E] text-[#F3E5AB] border border-[#D4AF37]/30 shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Technology & Pipeline
            </button>
            <button
              onClick={() => setActiveTab('deliverables')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'deliverables'
                  ? 'bg-[#090D1E] text-[#F3E5AB] border border-[#D4AF37]/30 shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Deliverables & Awards
            </button>
          </div>

          {/* Tab 1: Director's Vision */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-[#020617]/70 border border-[#D4AF37]/15 space-y-3">
                <p className="text-xs uppercase tracking-[0.25em] font-mono text-[#D4AF37] font-medium">
                  DIRECTOR'S STATEMENT · SHIVANSH MALAVIYA
                </p>
                <p className="text-sm text-[#F8FAFC] leading-relaxed italic">
                  "{project.directorNotes}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#020617]/50 border border-[#D4AF37]/10">
                  <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block mb-1">CLIENT / PATRON</span>
                  <span className="text-sm font-semibold text-[#F8FAFC]">{project.client}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#020617]/50 border border-[#D4AF37]/10">
                  <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block mb-1">RUNTIME & SCOPE</span>
                  <span className="text-sm font-semibold text-[#F8FAFC]">{project.runtime}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#020617]/50 border border-[#D4AF37]/10">
                  <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block mb-1">ASPECT RATIO</span>
                  <span className="text-sm font-semibold text-[#F8FAFC]">{project.aspectRatio}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Technology & Pipeline */}
          {activeTab === 'pipeline' && (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                INTEGRATED PRODUCTION TOOLS & PROTOCOLS
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.tools.map((tool) => (
                  <div
                    key={tool}
                    className="p-3.5 rounded-xl bg-[#020617] border border-[#D4AF37]/15 flex items-center gap-2.5"
                  >
                    <Cpu className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="text-xs font-medium text-[#F8FAFC]">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Deliverables & Awards */}
          {activeTab === 'deliverables' && (
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">
                  MASTER DELIVERABLES
                </p>
                <div className="space-y-2">
                  {project.deliverables.map((del) => (
                    <div key={del} className="flex items-center gap-3 text-xs text-[#94A3B8]">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {project.awards.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">
                    AWARDS & HONORS
                  </p>
                  <div className="space-y-2">
                    {project.awards.map((award) => (
                      <div key={award} className="flex items-center gap-3 text-xs text-[#F3E5AB]">
                        <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
