import React from 'react';
import { Compass, Sparkles, Mail, ArrowUpRight } from 'lucide-react';

export const FounderSection: React.FC = () => {
  return (
    <section
      id="director"
      className="relative min-h-screen w-full py-28 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden z-10"
      aria-label="Shivansh Malaviya — Creative Director"
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Details & Editorial Bio */}
        <div className="lg:col-span-7 space-y-8">
          {/* Eyebrow & Main Title */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-[#D4AF37] font-mono">
              THE ARCHITECT BEHIND THE HORIZON
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC]">
              SHIVANSH MALAVIYA
            </h2>
            <p className="text-sm sm:text-base uppercase tracking-[0.22em] text-[#F3E5AB] font-medium">
              Founder & Creative Director · Vayomira
            </p>
          </div>

          {/* Director's Core Quote */}
          <div className="p-6 rounded-2xl bg-[#090D1E]/60 border border-[#D4AF37]/15">
            <p className="text-base sm:text-lg text-[#F8FAFC] leading-relaxed italic font-light">
              "We do not treat artificial intelligence as a shortcut. We treat it as an alien camera lens—capable of filming dimensions that previously existed only in the human subconscious."
            </p>
          </div>

          {/* Editorial Narrative */}
          <div className="space-y-4 text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            <p>
              Shivansh Malaviya founded <strong className="text-[#F8FAFC] font-semibold">Vayomira</strong> with a singular thesis: cinema is entering its most transformative epoch since the arrival of sound. By marrying classical dramatic intuition, golden-hour cinematography, and proprietary generative diffusion architectures, his studio produces narrative works and commercial spectacles that transcend conventional physical limitations.
            </p>
            <p>
              Under his creative direction, Vayomira has engineered custom neural workflows linking fine-tuned diffusion models with Unreal Engine virtual stages, allowing uninterrupted character facial consistency, cinematic camera choreographies, and volumetric lighting at feature-film fidelity.
            </p>
          </div>

          {/* Studio Directives */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold font-mono">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>THE VAYOMIRA DIRECTIVES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#94A3B8]">
              <div className="p-3.5 rounded-xl bg-[#090D1E]/50 border border-[#D4AF37]/10 space-y-1">
                <span className="text-[#F8FAFC] font-semibold block">I. Frame Primacy</span>
                <p className="text-[11px] leading-relaxed">Museum-grade composition across every individual neural frame.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090D1E]/50 border border-[#D4AF37]/10 space-y-1">
                <span className="text-[#F8FAFC] font-semibold block">II. Virtual Emotion</span>
                <p className="text-[11px] leading-relaxed">Atmospheric presence, breath, and silence in synthetic space.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090D1E]/50 border border-[#D4AF37]/10 space-y-1">
                <span className="text-[#F8FAFC] font-semibold block">III. The Horizon</span>
                <p className="text-[11px] leading-relaxed">Never imitate past cinema; forge the mythologies of tomorrow.</p>
              </div>
            </div>
          </div>

          {/* Milestones & Direct Connect Action */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-6 border-t border-[#D4AF37]/15">
            <div className="flex items-center gap-6 text-xs text-[#F3E5AB] font-mono">
              <div>
                <span className="block text-2xl font-bold text-[#F8FAFC]">10+</span>
                <span className="text-[#94A3B8] tracking-wider uppercase">Years Directing</span>
              </div>
              <div className="w-px h-8 bg-[#D4AF37]/20" />
              <div>
                <span className="block text-2xl font-bold text-[#F8FAFC]">15+</span>
                <span className="text-[#94A3B8] tracking-wider uppercase">Film Accolades</span>
              </div>
              <div className="w-px h-8 bg-[#D4AF37]/20" />
              <div>
                <span className="block text-2xl font-bold text-[#F8FAFC]">4K DCI</span>
                <span className="text-[#94A3B8] tracking-wider uppercase">Master Standard</span>
              </div>
            </div>

            <a
              href="mailto:shivanshmalaviya@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#020617] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C59B27] rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-[1.02] transition-all whitespace-nowrap"
            >
              <span>Director's Office</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Side: Shivansh Malaviya Personal Logo Sitting Open Against the Dark Abyssal Background */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative p-4 sm:p-8">
          {/* Subtle Ambient Golden Radial Glow behind the emblem */}
          <div className="absolute inset-0 max-w-md mx-auto aspect-square bg-[#D4AF37]/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Logo container: completely open, no box, no frame, no border */}
          <div className="relative w-full max-w-sm sm:max-w-md aspect-square flex items-center justify-center">
            {/* CSS Mask implementation for pure Imperial Metallic Gold gradient shine */}
            <div
              className="w-full h-full"
              style={{
                maskImage: 'url(/assets/aistudio/Shivansh_Malaviya_personal_logo_5258f46c.svg)',
                WebkitMaskImage: 'url(/assets/aistudio/Shivansh_Malaviya_personal_logo_5258f46c.svg)',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                background: 'linear-gradient(135deg, #FFF6E0 0%, #F3E5AB 25%, #D4AF37 70%, #AA820A 100%)',
                filter: 'drop-shadow(0 0 35px rgba(212, 175, 55, 0.55))',
              }}
              role="img"
              aria-label="Shivansh Malaviya Personal Logo in Imperial Metallic Gold"
            />
          </div>

          {/* Subtle Sub-Cap Caption */}
          <p className="mt-4 text-[11px] uppercase tracking-[0.3em] font-mono text-[#F3E5AB]/60 text-center">
            SHIVANSH MALAVIYA · PERSONAL MONOGRAM
          </p>
        </div>
      </div>
    </section>
  );
};
