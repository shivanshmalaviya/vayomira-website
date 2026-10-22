export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  client: string;
  year: string;
  runtime: string;
  aspectRatio: string;
  synopsis: string;
  directorNotes: string;
  tools: string[];
  deliverables: string[];
  awards: string[];
  accentColor: string;
  bgGradient: string;
  featured: boolean;
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'aethel',
    title: 'CHRONICLES OF AETHEL',
    subtitle: 'Where Myth Meets Neural Worldbuilding',
    category: 'Generative AI Cinema',
    client: 'Epic Mythos Studios',
    year: '2026',
    runtime: '24 min',
    aspectRatio: '2.39:1 Anamorphic',
    synopsis: 'An epic high-fantasy world conceived through custom neural diffusion pipelines and Unreal Engine 5.5 virtual production. Explores a celestial dynasty guarding the boundary between mortality and cosmic horizons.',
    directorNotes: 'We pioneered character facial consistency across 380 generative shots using fine-tuned LoRAs and latent depth keyframing. The result is pure cinematic poetry unconstrained by physical set limitations.',
    tools: ['Veo 2', 'ComfyUI Neural Nodes', 'Kling 1.5', 'Unreal Engine 5.5', 'DaVinci Resolve Studio', 'ARRI Alexa Color Science'],
    deliverables: ['Theatrical 4K DCI DCP', 'Dolby Vision HDR Master', 'Spatial Audio Mix', 'Virtual Production Pipeline Blueprint'],
    awards: ['Awwwards Cinema Showcase 2026', 'AI Film Festival Grand Jury Prize', 'Clio Entertainment Nominee'],
    accentColor: '#D4AF37',
    bgGradient: 'from-[#0B132B] via-[#1C2541] to-[#020617]',
    featured: true,
  },
  {
    id: 'solaris',
    title: 'SOLARIS TRANSCENDENCE',
    subtitle: 'The Architecture of Time & Light',
    category: 'CGI & Luxury Commercial',
    client: 'Vacheron & Céleste Haute Horlogerie',
    year: '2026',
    runtime: '3 min 12s',
    aspectRatio: '16:9 Cinema HDR',
    synopsis: 'A metaphysical journey through molten gold ribbons, obsidian crystal refractions, and astronomical tourbillon movements suspended in zero-gravity space.',
    directorNotes: 'Every micro-gear was modeled down to 10-micron tolerances, then dynamically collided with viscous gold fluid simulations in Houdini to reflect timeless craftsmanship.',
    tools: ['Cinema 4D', 'Redshift GPU', 'Houdini Fluid FX', 'Marvelous Designer', 'Octane X', 'Ableton Spatial Sonic Suite'],
    deliverables: ['Global TVC Broadcast 4K', 'Social Vertical Cinema 9:16', 'Times Square 3D Anamorphic Billboard'],
    awards: ['Lux Red Dot Design Winner', 'FWA of the Month', 'Cannes Corporate Media Silver'],
    accentColor: '#F3E5AB',
    bgGradient: 'from-[#2A1E0B] via-[#17130A] to-[#020617]',
    featured: true,
  },
  {
    id: 'nebula-drift',
    title: 'NEBULA DRIFT',
    subtitle: 'A Cybernetic Odyssey on the Edge of Solitude',
    category: 'Sci-Fi Narrative Short',
    client: 'Aethelgard Pictures / Neon',
    year: '2025',
    runtime: '18 min',
    aspectRatio: '2.76:1 Ultra Panavision',
    synopsis: 'Deep space solitary reconnaissance vessel discovering an ancient Dyson swarm structure radiating enigmatic golden frequencies beyond known planetary systems.',
    directorNotes: 'Shot with simulated vintage anamorphic glass flares and blended with deep spatial ambient sound design. The visual tone pays homage to Tarkovsky with 21st-century neural realism.',
    tools: ['Kling AI', 'Midjourney v6 Photoreal', 'Blender 4.3 Cycles', 'Nuke VFX Compositor', 'DaVinci Resolve Studio'],
    deliverables: ['Festival 4K Master', 'Stereoscopic 3D Immersion', 'Behind-the-Scenes Generative Breakdown'],
    awards: ['Sundance New Frontier Official Selection', 'TriBeCa Immersive Spotlight'],
    accentColor: '#60A5FA',
    bgGradient: 'from-[#091E3A] via-[#0C1226] to-[#020617]',
    featured: true,
  },
  {
    id: 'obsidian-horizon',
    title: 'OBSIDIAN HORIZON',
    subtitle: 'Spatial Acoustic & Monolithic Visual Installation',
    category: 'Art Installation & Sound',
    client: 'Venice International Biennale of Architecture',
    year: '2025',
    runtime: 'Continuous 8K Loop',
    aspectRatio: '32:9 Ultra-Wide Span',
    synopsis: 'A monumental 16-meter LED glass monolith reacting in real-time to visitor biosignals and cosmic radio telescope streams from the Atacama Desert.',
    directorNotes: 'We aimed to make the horizon tangible. As visitors move through the space, light refraction bending across obsidian stone slabs reconfigures the room acoustics.',
    tools: ['TouchDesigner 2024', 'Unreal Engine 5.4', 'Custom Python Latent Bridges', 'Genelec 7.1.4 Dolby Atmos'],
    deliverables: ['Interactive Multi-Projection Rig', 'Site-Specific Sound Architecture', 'Archival Art Book (300 pages)'],
    awards: ['Venice Biennale Golden Lion Special Mention', 'Lumen Prize Digital Art Shortlist'],
    accentColor: '#C084FC',
    bgGradient: 'from-[#1E0B2E] via-[#10081C] to-[#020617]',
    featured: true,
  },
  {
    id: 'kairos',
    title: 'KAIROS: BEYOND BOUNDARIES',
    subtitle: 'Haute Couture in the Digital Dimension',
    category: 'High-Fashion Motion',
    client: 'Maison Aurelius & Vogue Met Gala',
    year: '2026',
    runtime: '4 min 45s',
    aspectRatio: '2.39:1 CinemaScope',
    synopsis: 'Sculptural aerodynamic garments morphing through volcanic glass, starlight filaments, and kinetic metallic liquid fabrics worn by digital avatars.',
    directorNotes: 'Fashion is emotion in motion. We combined motion-captured dance choreography with generative cloth physics to create silhouettes impossible in the physical world.',
    tools: ['Marvelous Designer 12', 'Unreal Engine 5.5', 'ComfyUI ControlNet', 'Substance Painter', 'ProTools HDX'],
    deliverables: ['High-Fashion Show Opening Reel', 'Editorial Still Suite (8K Print)', 'Interactive WebAR Experience'],
    awards: ['Berlin Fashion Film Festival Best CGI', 'British Fashion Awards Digital Innovation'],
    accentColor: '#D4AF37',
    bgGradient: 'from-[#1F1707] via-[#0E0C06] to-[#020617]',
    featured: true,
  }
];

const STORAGE_KEY = 'vayomira_studio_projects_v1';

export function loadProjects(): Project[] {
  if (typeof window === 'undefined') return INITIAL_PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROJECTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // fallback
  }
  return INITIAL_PROJECTS;
}

export function saveProjects(projects: Project[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects to localStorage', e);
  }
}

export function resetProjects(): Project[] {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
  return INITIAL_PROJECTS;
}

export function validateAdminPin(inputPin: string): boolean {
  return inputPin.trim() === '2026';
}
