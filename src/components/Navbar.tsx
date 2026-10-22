import React, { useState, useEffect } from 'react';
import { Lock, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  onOpenManager: () => void;
  onOpenInquiry: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenManager,
  onOpenInquiry,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020617]/85 backdrop-blur-md border-b border-[#D4AF37]/20 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark + discrete brand mark */}
        <a
          href="#hero"
          className="group flex items-center gap-3 text-lg sm:text-xl font-brand font-semibold tracking-[0.28em] text-[#F8FAFC] hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0"
        >
          <img
            src="/assets/aistudio/Vayomira_company_logo_7a777aa4.svg"
            alt="Vayomira Logo"
            className="w-7 h-7 object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
          />
          <span>VAYOMIRA</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-medium text-[#94A3B8]">
          <a
            href="#capabilities"
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Capabilities
          </a>
          <a
            href="#showcase"
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Cinematic Works
          </a>
          <a
            href="#director"
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Creative Director
          </a>
          <a
            href="#concierge"
            className="hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Commission
          </a>
        </nav>

        {/* Zone 3: 1 primary action + audio ambience & studio manager */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={onToggleAudio}
            aria-label={isAudioPlaying ? 'Mute ambient soundscape' : 'Play ambient soundscape'}
            title={isAudioPlaying ? 'Mute ambient soundscape' : 'Play ambient soundscape'}
            className="p-1.5 sm:p-2 text-[#94A3B8] hover:text-[#F3E5AB] transition-colors rounded-lg hover:bg-[#090D1E] border border-transparent hover:border-[#D4AF37]/20"
          >
            {isAudioPlaying ? (
              <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Discreet Studio Manager Lock Button (visible on sm+) */}
          <button
            onClick={onOpenManager}
            aria-label="Open Studio Manager (PIN 2026)"
            title="Studio Manager (PIN: 2026)"
            className="hidden sm:inline-flex p-2 text-[#94A3B8]/70 hover:text-[#D4AF37] transition-colors rounded-lg hover:bg-[#090D1E] border border-transparent hover:border-[#D4AF37]/20"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenInquiry}
            className="relative group px-3.5 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#020617] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C59B27] rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:scale-[1.02] whitespace-nowrap shrink-0"
          >
            <span className="flex items-center gap-1.5">
              <span className="sm:hidden">Inquire</span>
              <span className="hidden sm:inline">Initiate Inquiry</span>
              <Sparkles className="w-3.5 h-3.5 text-[#020617] opacity-80" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
