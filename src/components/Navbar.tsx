import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenManager?: () => void;
  onOpenInquiry: () => void;
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
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
          ? 'bg-[#020617]/90 backdrop-blur-md border-b border-[#D4AF37]/20 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
        {/* Top-Left Brand Logo & Wordmark: Enlarged, High Contrast, Aligned */}
        <a
          href="#hero"
          className="group flex items-center gap-3.5 text-lg sm:text-xl font-brand font-semibold tracking-[0.28em] text-[#F8FAFC] hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0"
        >
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#090D1E]/60 border border-[#D4AF37]/30 p-1 group-hover:border-[#D4AF37]/60 group-hover:shadow-[0_0_16px_rgba(212,175,55,0.4)] transition-all duration-300">
            <img
              src="/assets/aistudio/Vayomira_company_logo_7a777aa4.svg"
              alt="Vayomira Logo"
              className="w-full h-full object-contain filter brightness-125 contrast-125 drop-shadow-[0_0_8px_rgba(212,175,55,0.7)] group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">VAYOMIRA</span>
        </a>

        {/* Navigation Links */}
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

        {/* Primary Action Button (Clean, without speaker or lock icons) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenInquiry}
            className="relative group px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#020617] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C59B27] rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-[1.02] whitespace-nowrap shrink-0 cursor-pointer"
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

