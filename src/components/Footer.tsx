import React from 'react';
import { ArrowUp, Lock, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenManager: () => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenManager, onOpenInquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#02040D] border-t border-[#D4AF37]/20 pt-20 pb-12 overflow-hidden z-10">
      {/* Monumental Golden Watermark */}
      <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 pointer-events-none select-none w-full text-center overflow-hidden opacity-[0.04]">
        <span className="font-brand text-[14vw] font-bold tracking-[0.28em] text-[#D4AF37] whitespace-nowrap block">
          VAYOMIRA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#D4AF37]/10">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Vayomira_company_logo_7a777aa4.svg"
                alt="Vayomira Logo"
                className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              />
              <span className="text-xl font-brand font-semibold tracking-[0.28em] text-[#F8FAFC]">
                VAYOMIRA
              </span>
            </div>

            <p className="text-xs uppercase tracking-[0.28em] font-medium text-[#D4AF37]">
              CREATE · EXPAND · TRANSCEND
            </p>

            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              Ultra-luxury creative studio and cinematic film production house. Directed by Shivansh Malaviya. Conceived on the frontier where generative intelligence meets cinematic art.
            </p>

            <div className="pt-2 text-xs font-mono text-[#F3E5AB]/80">
              MUMBAI · TOKYO · LOS ANGELES
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] font-mono text-[#D4AF37] font-semibold mb-4">
              STUDIO PORTALS
            </p>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li>
                <a href="#capabilities" className="hover:text-[#F3E5AB] transition-colors">
                  01. Core Capabilities & Bento Suite
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-[#F3E5AB] transition-colors">
                  02. Full-Screen Cinematic Showcase
                </a>
              </li>
              <li>
                <a href="#director" className="hover:text-[#F3E5AB] transition-colors">
                  03. The Creative Director: Shivansh Malaviya
                </a>
              </li>
              <li>
                <a href="#concierge" className="hover:text-[#F3E5AB] transition-colors">
                  04. Commission a Project Concierge
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenManager}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-[#D4AF37]" />
                  <span>05. Studio Project Manager (PIN 2026)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Action & Back to Horizon */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end space-y-6">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-[#090D1E] border border-[#D4AF37]/25 text-xs uppercase tracking-[0.2em] font-mono text-[#F8FAFC] hover:text-[#020617] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              <span>Back to the Horizon</span>
              <ArrowUp className="w-4 h-4 text-[#D4AF37] group-hover:text-[#020617] group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <div className="text-left md:text-right space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] block">DIRECT PATRON LINE</span>
              <a
                href="mailto:shivanshmalaviya@gmail.com"
                className="text-xs font-mono text-[#F3E5AB] hover:underline"
              >
                shivanshmalaviya@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]/60 font-mono">
          <div>
            © {new Date().getFullYear()} Vayomira Creative Studio. All Rights Reserved. Beyond Boundaries / Beyond the Horizon.
          </div>

          <div className="flex items-center gap-6">
            <span>DCI 4K CINEMA MASTERED</span>
            <span>·</span>
            <button onClick={onOpenInquiry} className="hover:text-[#F3E5AB] transition-colors">
              CONFIDENTIAL INQUIRY
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
