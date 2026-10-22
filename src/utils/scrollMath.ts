/**
 * Mathematical utilities for scroll-driven canvas dolly, transforms, and transitions
 */

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Calculates current frame index from 1 to totalFrames based on scroll progress (0.0 - 1.0)
 */
export function calculateFrameIndex(progress: number, totalFrames: number = 169): number {
  const clamped = clamp(progress, 0, 1);
  const index = Math.round(clamped * (totalFrames - 1)) + 1;
  return clamp(index, 1, totalFrames);
}

/**
 * Centerpiece Vayomira Logo Fly-Through:
 * At scroll = 0%: scale = 1, opacity = 1
 * From 0% to 45%: scale 1 to 3.5, opacity 1 to 0
 */
export interface LogoTransform {
  scale: number;
  opacity: number;
  blurPx: number;
  visible: boolean;
}

export function calculateLogoFlyThrough(progress: number): LogoTransform {
  const clamped = clamp(progress, 0, 1);
  const flyThroughEnd = 0.45;

  if (clamped >= flyThroughEnd) {
    return {
      scale: 3.5,
      opacity: 0,
      blurPx: 25,
      visible: false,
    };
  }

  const subProgress = clamped / flyThroughEnd; // 0 to 1
  // Smooth ease-in curve for cinematic acceleration
  const ease = Math.pow(subProgress, 1.8);

  const scale = lerp(1, 3.5, ease);
  const opacity = clamp(1 - subProgress * 1.05, 0, 1);
  const blurPx = lerp(0, 20, ease);

  return {
    scale,
    opacity,
    blurPx,
    visible: opacity > 0.01,
  };
}

/**
 * Horizon Philosophy Reveal:
 * Reveal between scroll = 55% to 90%
 */
export interface PhilosophyReveal {
  opacity: number;
  translateY: number;
  visible: boolean;
}

export function calculatePhilosophyReveal(progress: number): PhilosophyReveal {
  const start = 0.48;
  const end = 0.85;

  if (progress < start) {
    return { opacity: 0, translateY: 35, visible: false };
  }

  const t = clamp((progress - start) / (end - start), 0, 1);
  // Cubic ease-out
  const ease = 1 - Math.pow(1 - t, 3);

  const opacity = ease;
  const translateY = lerp(35, 0, ease);

  return {
    opacity,
    translateY,
    visible: opacity > 0.01,
  };
}

/**
 * Shivansh Malaviya Logo Entrance (Zoom-Out Logo Intro)
 * Section 4: Opens with personal logo large and glowing in absolute center,
 * then gracefully zooms out and scales down into the badge position (top-left).
 */
export interface FounderIntroTransform {
  scale: number;
  translateX: number;
  translateY: number;
  isBadgePosition: boolean;
}

export function calculateFounderIntroTransform(progress: number): FounderIntroTransform {
  const p = clamp(progress, 0, 1);
  // Smooth sigmoid/smoothstep
  const t = p * p * (3 - 2 * p);

  // Large center state: scale 1.8, centered (0,0)
  // Badge position state: scale 0.55, shifted to top-left
  const scale = lerp(1.8, 0.55, t);
  const translateX = lerp(0, -180, t);
  const translateY = lerp(0, -120, t);

  return {
    scale,
    translateX,
    translateY,
    isBadgePosition: p > 0.85,
  };
}
