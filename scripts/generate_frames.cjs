const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outputDir = path.join(__dirname, '..', 'public', 'sequence');
fs.mkdirSync(outputDir, { recursive: true });

const TOTAL_FRAMES = 169;
const WIDTH = 960;
const HEIGHT = 540;

function generateFrameSvg(frameIndex) {
  const t = frameIndex / (TOTAL_FRAMES - 1); // 0.0 to 1.0

  // Camera dolly translation and zoom parameters
  const zoom = 1 + t * 2.2;
  const horizonY = 320 - t * 40;
  const sunRadius = 60 + t * 140;
  const sunGlowRadius = 180 + t * 340;
  const fogOpacity = 0.35 + t * 0.45;
  const goldenLightIntensity = 0.4 + t * 0.55;

  // Starfield opacity decreases slightly as horizon bloom expands
  const starOpacity = Math.max(0.2, 0.9 - t * 0.6);

  // Parallax mountains:
  // Far mountains (layer 3)
  const farSpread = 1 + t * 0.3;
  // Mid mountains (layer 2)
  const midSpread = 1 + t * 0.8;
  const midDrop = t * 30;
  // Near foreground canyon walls (layer 1) - moves outward fast as we fly past them
  const nearSpread = 1 + t * 1.8;
  const nearAlpha = Math.max(0, 1 - t * 1.3); // foreground cliffs exit view around t=0.75

  // Golden light beams angle and width
  const beamAngle = 15 + t * 20;

  // Generate deterministic stars
  let starsSvg = '';
  for (let i = 0; i < 45; i++) {
    const sx = (Math.sin(i * 99 + 12) * 0.5 + 0.5) * WIDTH;
    const sy = (Math.cos(i * 33 + 7) * 0.5 + 0.5) * (horizonY - 20);
    const sr = 0.8 + ((i % 5) * 0.3);
    const sAlpha = (0.3 + (i % 7) * 0.1) * starOpacity;
    starsSvg += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${sr}" fill="#F8FAFC" opacity="${sAlpha.toFixed(2)}"/>`;
  }

  // Dust particles floating in 3D toward viewer
  let particlesSvg = '';
  for (let i = 0; i < 35; i++) {
    const pProgress = (t * 2.5 + (i / 35)) % 1;
    const px = WIDTH / 2 + (Math.sin(i * 17) * 400) * pProgress;
    const py = horizonY + (Math.cos(i * 29) * 160) * pProgress;
    const pr = 0.5 + pProgress * 3.5;
    const pAlpha = Math.sin(pProgress * Math.PI) * 0.8;
    particlesSvg += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${pr.toFixed(1)}" fill="#F3E5AB" opacity="${pAlpha.toFixed(2)}" filter="url(#particleBlur)"/>`;
  }

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <!-- Background Cosmic Sky Gradient -->
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#02040D"/>
      <stop offset="45%" stop-color="#050B20"/>
      <stop offset="75%" stop-color="#141530"/>
      <stop offset="100%" stop-color="#2D211A"/>
    </linearGradient>

    <!-- Celestial Horizon Dawn Flare -->
    <radialGradient id="horizonGlow" cx="50%" cy="${(horizonY / HEIGHT * 100).toFixed(1)}%" r="70%">
      <stop offset="0%" stop-color="#FFF5D6" stop-opacity="1"/>
      <stop offset="18%" stop-color="#F3E5AB" stop-opacity="0.95"/>
      <stop offset="40%" stop-color="#D4AF37" stop-opacity="${goldenLightIntensity.toFixed(2)}"/>
      <stop offset="70%" stop-color="#7A5212" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
    </radialGradient>

    <!-- Horizon Sun Core -->
    <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
      <stop offset="30%" stop-color="#FFF6E0" stop-opacity="0.95"/>
      <stop offset="65%" stop-color="#D4AF37" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
    </radialGradient>

    <!-- Valley Fog and River of Light -->
    <linearGradient id="valleyFog" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F3E5AB" stop-opacity="${fogOpacity.toFixed(2)}"/>
      <stop offset="35%" stop-color="#D4AF37" stop-opacity="${(fogOpacity * 0.7).toFixed(2)}"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0.95"/>
    </linearGradient>

    <!-- Volumetric Light Rays -->
    <linearGradient id="rayGrad" x1="50%" y1="100%" x2="50%" y2="0%">
      <stop offset="0%" stop-color="#F3E5AB" stop-opacity="0.4"/>
      <stop offset="40%" stop-color="#D4AF37" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
    </linearGradient>

    <filter id="particleBlur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1.5"/>
    </filter>
  </defs>

  <!-- Sky Base -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#skyGrad)"/>

  <!-- Starfield -->
  ${starsSvg}

  <!-- Sun Flare & Atmospheric Nebula -->
  <circle cx="${WIDTH / 2}" cy="${horizonY.toFixed(1)}" r="${sunGlowRadius.toFixed(1)}" fill="url(#horizonGlow)"/>

  <!-- Radiating Volumetric Dawn Beams -->
  <polygon points="${WIDTH/2},${horizonY} ${WIDTH/2 - 280 - t * 120},0 ${WIDTH/2 - 180 - t * 80},0" fill="url(#rayGrad)" opacity="0.35"/>
  <polygon points="${WIDTH/2},${horizonY} ${WIDTH/2 - 90},0 ${WIDTH/2 + 20},0" fill="url(#rayGrad)" opacity="0.45"/>
  <polygon points="${WIDTH/2},${horizonY} ${WIDTH/2 + 150 + t * 90},0 ${WIDTH/2 + 260 + t * 130},0" fill="url(#rayGrad)" opacity="0.38"/>

  <!-- Horizon Core Orb -->
  <circle cx="${WIDTH / 2}" cy="${horizonY.toFixed(1)}" r="${sunRadius.toFixed(1)}" fill="url(#sunCore)"/>

  <!-- LAYER 3: Distant Horizon Mountain Silhouettes -->
  <path d="M 0,${horizonY + 80}
           Q ${WIDTH * 0.15},${horizonY - 20} ${WIDTH * 0.3},${horizonY + 30}
           Q ${WIDTH * 0.42},${horizonY - 45} ${WIDTH * 0.5},${horizonY - 10}
           Q ${WIDTH * 0.58},${horizonY - 50} ${WIDTH * 0.7},${horizonY + 25}
           Q ${WIDTH * 0.85},${horizonY - 25} ${WIDTH},${horizonY + 80}
           L ${WIDTH},${HEIGHT} L 0,${HEIGHT} Z"
        fill="#0A0F26" opacity="0.88"/>

  <!-- LAYER 2: Midground Jagged Mountain Ridges with Golden Rim Lighting -->
  <path d="M -50,${horizonY + 120 + midDrop}
           L ${WIDTH * 0.18 * midSpread},${horizonY - 10 + midDrop}
           L ${WIDTH * 0.28 * midSpread},${horizonY + 70 + midDrop}
           L ${WIDTH * 0.38 * midSpread},${horizonY + 15 + midDrop}
           L ${WIDTH * 0.46 * midSpread},${horizonY + 110 + midDrop}
           L ${WIDTH * 0.54 * (2 - midSpread)},${horizonY + 110 + midDrop}
           L ${WIDTH * (1 - 0.38 * (midSpread - 1))},${horizonY + 18 + midDrop}
           L ${WIDTH * (1 - 0.26 * (midSpread - 1))},${horizonY + 65 + midDrop}
           L ${WIDTH * (1 - 0.15 * (midSpread - 1))},${horizonY - 15 + midDrop}
           L ${WIDTH + 50},${horizonY + 120 + midDrop}
           L ${WIDTH + 50},${HEIGHT} L -50,${HEIGHT} Z"
        fill="#060A1A"/>

  <!-- Golden Rim on Midground Peaks -->
  <path d="M -50,${horizonY + 120 + midDrop}
           L ${WIDTH * 0.18 * midSpread},${horizonY - 10 + midDrop}
           L ${WIDTH * 0.28 * midSpread},${horizonY + 70 + midDrop}
           L ${WIDTH * 0.38 * midSpread},${horizonY + 15 + midDrop}
           L ${WIDTH * 0.46 * midSpread},${horizonY + 110 + midDrop}"
        stroke="#D4AF37" stroke-width="${(1.5 + t * 1.5).toFixed(1)}" stroke-opacity="0.65" fill="none"/>
  <path d="M ${WIDTH * 0.54 * (2 - midSpread)},${horizonY + 110 + midDrop}
           L ${WIDTH * (1 - 0.38 * (midSpread - 1))},${horizonY + 18 + midDrop}
           L ${WIDTH * (1 - 0.26 * (midSpread - 1))},${horizonY + 65 + midDrop}
           L ${WIDTH * (1 - 0.15 * (midSpread - 1))},${horizonY - 15 + midDrop}
           L ${WIDTH + 50},${horizonY + 120 + midDrop}"
        stroke="#D4AF37" stroke-width="${(1.5 + t * 1.5).toFixed(1)}" stroke-opacity="0.65" fill="none"/>

  <!-- Valley Floor Golden Light River / Mist Stream -->
  <polygon points="${WIDTH/2 - 8 - t * 18},${horizonY + 90} ${WIDTH/2 + 8 + t * 18},${horizonY + 90} ${WIDTH/2 + 180 + t * 240},${HEIGHT} ${WIDTH/2 - 180 - t * 240},${HEIGHT}"
           fill="url(#valleyFog)"/>

  <!-- LAYER 1: Deep Canyon Foreground Cliffs (Dolly Rushing Past) -->
  ${nearAlpha > 0.02 ? `
  <g opacity="${nearAlpha.toFixed(2)}">
    <!-- Left Canyon Wall -->
    <path d="M ${-120 * nearSpread},0
             L ${WIDTH * 0.32 - (nearSpread - 1) * 260},0
             L ${WIDTH * 0.24 - (nearSpread - 1) * 230},${HEIGHT * 0.4}
             L ${WIDTH * 0.38 - (nearSpread - 1) * 320},${HEIGHT * 0.72}
             L ${WIDTH * 0.22 - (nearSpread - 1) * 200},${HEIGHT}
             L ${-120 * nearSpread},${HEIGHT} Z"
          fill="#02050E"/>
    <!-- Left Canyon Wall Gold Rim -->
    <path d="M ${WIDTH * 0.32 - (nearSpread - 1) * 260},0
             L ${WIDTH * 0.24 - (nearSpread - 1) * 230},${HEIGHT * 0.4}
             L ${WIDTH * 0.38 - (nearSpread - 1) * 320},${HEIGHT * 0.72}
             L ${WIDTH * 0.22 - (nearSpread - 1) * 200},${HEIGHT}"
          stroke="#D4AF37" stroke-width="2" stroke-opacity="0.75" fill="none"/>

    <!-- Right Canyon Wall -->
    <path d="M ${WIDTH + 120 * nearSpread},0
             L ${WIDTH * 0.68 + (nearSpread - 1) * 260},0
             L ${WIDTH * 0.76 + (nearSpread - 1) * 230},${HEIGHT * 0.42}
             L ${WIDTH * 0.62 + (nearSpread - 1) * 320},${HEIGHT * 0.7}
             L ${WIDTH * 0.78 + (nearSpread - 1) * 200},${HEIGHT}
             L ${WIDTH + 120 * nearSpread},${HEIGHT} Z"
          fill="#02050E"/>
    <!-- Right Canyon Wall Gold Rim -->
    <path d="M ${WIDTH * 0.68 + (nearSpread - 1) * 260},0
             L ${WIDTH * 0.76 + (nearSpread - 1) * 230},${HEIGHT * 0.42}
             L ${WIDTH * 0.62 + (nearSpread - 1) * 320},${HEIGHT * 0.7}
             L ${WIDTH * 0.78 + (nearSpread - 1) * 200},${HEIGHT}"
          stroke="#D4AF37" stroke-width="2" stroke-opacity="0.75" fill="none"/>
  </g>
  ` : ''}

  <!-- Floating Golden Cosmic Dust Particles -->
  ${particlesSvg}

  <!-- Final Horizon Glow Spill Overlay -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#horizonGlow)" opacity="${(t * 0.42).toFixed(2)}"/>
</svg>
  `.trim();
}

async function renderAll() {
  console.log(`Generating ${TOTAL_FRAMES} WebP frames to ${outputDir}...`);
  const startTime = Date.now();

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const frameNumber = String(i + 1).padStart(4, '0');
    const svgString = generateFrameSvg(i);
    const filename = `frame_${frameNumber}.webp`;
    const targetFile = path.join(outputDir, filename);

    await sharp(Buffer.from(svgString))
      .webp({ quality: 84 })
      .toFile(targetFile);

    if ((i + 1) % 30 === 0 || i === TOTAL_FRAMES - 1) {
      console.log(`Rendered ${i + 1}/${TOTAL_FRAMES} frames (${((i + 1) / TOTAL_FRAMES * 100).toFixed(0)}%)`);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Completed rendering all ${TOTAL_FRAMES} WebP frames in ${duration}s!`);
}

renderAll().catch(err => {
  console.error("Error generating frames:", err);
  process.exit(1);
});
