import React, { useEffect, useRef, useState } from 'react';
import {
  calculateFrameIndex,
  calculateLogoFlyThrough,
  calculatePhilosophyReveal,
  lerp,
} from '../utils/scrollMath';
import { ChevronDown, Compass } from 'lucide-react';

interface HeroSequenceCanvasProps {
  onExploreClick: () => void;
}

export const HeroSequenceCanvas: React.FC<HeroSequenceCanvasProps> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Frame cache
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isPreloading, setIsPreloading] = useState<boolean>(true);

  // Smooth lerped scroll progress state
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);

  // React state for logo and typography overlays
  const [logoState, setLogoState] = useState({ scale: 1, opacity: 1, blurPx: 0, visible: true });
  const [philosophyState, setPhilosophyState] = useState({ opacity: 0, translateY: 40, visible: false });
  const [activeFrameDisplay, setActiveFrameDisplay] = useState<number>(1);

  const TOTAL_FRAMES = 169;

  // 1. Preload 169 WebP frames
  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(4, '0');
      img.src = `/sequence/frame_${frameNum}.webp`;

      img.onload = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count >= TOTAL_FRAMES * 0.25) {
          // Allow interactive render as soon as 25% loaded
          setIsPreloading(false);
        }
      };
      img.onerror = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
      };
      images[i] = img;
    }
    framesRef.current = images;

    return () => {
      mounted = false;
    };
  }, []);

  // 2. Scroll listener to calculate targetProgress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = -rect.top / totalScrollable;
      targetProgressRef.current = Math.max(0, Math.min(1, progress));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Render loop with requestAnimationFrame and lerp
  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      // Lerp smooth scroll progress
      const factor = 0.14;
      currentProgressRef.current = lerp(
        currentProgressRef.current,
        targetProgressRef.current,
        factor
      );

      const p = currentProgressRef.current;
      const frameIdx = calculateFrameIndex(p, TOTAL_FRAMES);
      setActiveFrameDisplay(frameIdx);

      // Calculate overlay states
      const nextLogo = calculateLogoFlyThrough(p);
      setLogoState(nextLogo);

      const nextPhilosophy = calculatePhilosophyReveal(p);
      setPhilosophyState(nextPhilosophy);

      // Draw frame to canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;

          if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
          }

          ctx.save();
          ctx.scale(dpr, dpr);

          const img = framesRef.current[frameIdx - 1];
          if (img && img.complete && img.naturalWidth > 0) {
            // Draw image with cover scaling to fill viewport
            const imgAspect = img.naturalWidth / img.naturalHeight;
            const canvasAspect = width / height;

            let drawW = width;
            let drawH = height;
            let drawX = 0;
            let drawY = 0;

            if (canvasAspect > imgAspect) {
              drawH = width / imgAspect;
              drawY = (height - drawH) / 2;
            } else {
              drawW = height * imgAspect;
              drawX = (width - drawW) / 2;
            }

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, drawX, drawY, drawW, drawH);

            // Subtle cinematic film grain & vignette
            const vignette = ctx.createRadialGradient(
              width / 2,
              height / 2,
              width * 0.25,
              width / 2,
              height / 2,
              width * 0.75
            );
            vignette.addColorStop(0, 'rgba(2, 6, 23, 0)');
            vignette.addColorStop(1, 'rgba(2, 6, 23, 0.55)');
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, width, height);
          } else {
            // Smooth procedural fallback if frame is still buffering
            const fallbackGrad = ctx.createLinearGradient(0, 0, 0, height);
            fallbackGrad.addColorStop(0, '#02040D');
            fallbackGrad.addColorStop(0.5, '#090D1E');
            fallbackGrad.addColorStop(1, '#020617');
            ctx.fillStyle = fallbackGrad;
            ctx.fillRect(0, 0, width, height);

            const sunGrad = ctx.createRadialGradient(
              width / 2,
              height * 0.6,
              20,
              width / 2,
              height * 0.6,
              width * 0.45
            );
            sunGrad.addColorStop(0, 'rgba(243, 229, 171, 0.8)');
            sunGrad.addColorStop(0.3, 'rgba(212, 175, 55, 0.4)');
            sunGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');
            ctx.fillStyle = sunGrad;
            ctx.fillRect(0, 0, width, height);
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [TOTAL_FRAMES]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#020617]"
      aria-label="Vayomira 3D Dolly Hero Experience"
    >
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Canvas Scrubber */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Ambient Top & Bottom Lighting Scrims */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#020617]/70 via-transparent to-[#020617]" />

        {/* Preload Progress Indicator (top subtle HUD) */}
        {isPreloading && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-[#090D1E]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[11px] uppercase tracking-[0.2em] text-[#F3E5AB] flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
            <span>Harmonizing Cinematic Horizon · {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%</span>
          </div>
        )}

        {/* Frame HUD Counter (Quiet, Editorial) */}
        <div className="absolute bottom-8 left-8 z-30 hidden sm:flex items-center gap-3 text-xs tracking-[0.2em] font-mono text-[#94A3B8]/60">
          <span>FRAME</span>
          <span className="text-[#F3E5AB] font-semibold">{String(activeFrameDisplay).padStart(4, '0')}</span>
          <span className="text-[#94A3B8]/40">/ {TOTAL_FRAMES}</span>
          <span className="text-[#94A3B8]/30">·</span>
          <span>15 FPS SCROLL SCRUBBER</span>
        </div>

        {/* Centerpiece 1: Vayomira Logo Fly-Through (Scroll 0% to 45%) */}
        {logoState.visible && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-6"
            style={{
              opacity: logoState.opacity,
              transform: `scale(${logoState.scale})`,
              filter: `blur(${logoState.blurPx}px) drop-shadow(0 0 ${25 + logoState.scale * 10}px rgba(212, 175, 55, 0.45))`,
              transition: 'filter 0.1s ease-out',
            }}
          >
            <div className="flex flex-col items-center text-center max-w-2xl">
              {/* Primary Vayomira Company Logo with Winged V, Circle, Pole Star */}
              <img
                src="/assets/aistudio/Vayomira_company_logo_7a777aa4.svg"
                alt="Vayomira Company Emblem"
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_35px_rgba(212,175,55,0.6)]"
              />

              {/* Tagline Badge */}
              <div className="mt-4 flex items-center gap-3 text-xs sm:text-sm tracking-[0.28em] uppercase font-medium text-[#F3E5AB]">
                <span>CREATE</span>
                <span className="text-[#D4AF37]">·</span>
                <span>EXPAND</span>
                <span className="text-[#D4AF37]">·</span>
                <span>TRANSCEND</span>
              </div>
            </div>
          </div>
        )}

        {/* Centerpiece 2: Horizon Philosophy Reveal (Scroll 55% to 90%) */}
        {philosophyState.visible && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-6"
            style={{
              opacity: philosophyState.opacity,
              transform: `translateY(${philosophyState.translateY}px)`,
            }}
          >
            <div className="max-w-4xl text-center space-y-5">
              {/* Eyebrow */}
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] font-mono font-medium text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]">
                BEYOND BOUNDARIES · BEYOND THE HORIZON
              </p>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
                WHERE IMAGINATION <br className="hidden sm:inline" />
                <span className="gold-gradient-text drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  CROSSES THE VISIBLE EDGE
                </span>
              </h1>

              {/* Subheadline */}
              <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#94A3B8] font-normal leading-relaxed tracking-wide">
                Next-Generation Generative AI Cinema, High-End CGI & Visual Storytelling.
              </p>

              {/* Enter Studio Button */}
              <div className="pt-4 pointer-events-auto">
                <button
                  onClick={onExploreClick}
                  className="px-6 py-3 text-xs uppercase tracking-[0.25em] font-semibold text-[#020617] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C59B27] rounded-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300"
                >
                  Explore Capabilities & Works
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scroll Prompt at bottom */}
        <div className="absolute bottom-8 right-8 z-30 flex flex-col items-center gap-2 text-[#94A3B8]/70 hover:text-[#F3E5AB] transition-colors pointer-events-auto cursor-pointer"
             onClick={onExploreClick}>
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono">SCROLL TO ENTER HORIZON</span>
          <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
