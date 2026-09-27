// ==========================================================================
// CHRONO-LIGHTING ATMOSPHERE ENGINE
// Dynamically morphs lighting, colors, and 3D visual parameters
// according to time of day or user override.
// ==========================================================================

export const LIGHTING_MODES = {
  midnight: {
    id: 'midnight',
    name: 'Midnight Cyber',
    timeRange: '00:00 — 05:00',
    tag: 'CYBERPUNK NEON',
    primaryBg: '#030509',
    secondaryBg: '#070B14',
    surfaceBg: '#0D1322',
    accentColor: '#00F0FF',
    accentSecondary: '#7928CA',
    glowColor: 'rgba(0, 240, 255, 0.45)',
    ambientLight: 0x050b18,
    keyLight: 0x00f0ff,
    rimLight: 0x8a2be2,
    pointLight: 0x00ffff,
    particleHue: 0x00f0ff,
    badgeColor: 'border-cyan-400/40 text-cyan-300 bg-cyan-950/40'
  },
  dawn: {
    id: 'dawn',
    name: 'Golden Dawn',
    timeRange: '05:00 — 11:00',
    tag: 'AURORA AMBER',
    primaryBg: '#080608',
    secondaryBg: '#120D12',
    surfaceBg: '#1A121A',
    accentColor: '#FFB800',
    accentSecondary: '#FF4500',
    glowColor: 'rgba(255, 184, 0, 0.45)',
    ambientLight: 0x140d12,
    keyLight: 0xffb800,
    rimLight: 0xff4500,
    pointLight: 0xffd700,
    particleHue: 0xffb800,
    badgeColor: 'border-amber-400/40 text-amber-300 bg-amber-950/40'
  },
  noon: {
    id: 'noon',
    name: 'Solar Blueprint',
    timeRange: '11:00 — 17:00',
    tag: 'ELECTRIC AZURE',
    primaryBg: '#040814',
    secondaryBg: '#081226',
    surfaceBg: '#0E1D3A',
    accentColor: '#00A8FF',
    accentSecondary: '#0055FF',
    glowColor: 'rgba(0, 168, 255, 0.45)',
    ambientLight: 0x0a1630,
    keyLight: 0x00a8ff,
    rimLight: 0x0055ff,
    pointLight: 0x66ccff,
    particleHue: 0x00a8ff,
    badgeColor: 'border-blue-400/40 text-blue-300 bg-blue-950/40'
  },
  dusk: {
    id: 'dusk',
    name: 'Neon Twilight',
    timeRange: '17:00 — 24:00',
    tag: 'SYNTHWAVE VIOLET',
    primaryBg: '#06040C',
    secondaryBg: '#0F091E',
    surfaceBg: '#170E2D',
    accentColor: '#FF007A',
    accentSecondary: '#7928CA',
    glowColor: 'rgba(255, 0, 122, 0.45)',
    ambientLight: 0x110820,
    keyLight: 0xff007a,
    rimLight: 0x7928ca,
    pointLight: 0xff66cc,
    particleHue: 0xff007a,
    badgeColor: 'border-fuchsia-400/40 text-fuchsia-300 bg-fuchsia-950/40'
  }
};

export function getAutomaticLightingMode() {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5) return LIGHTING_MODES.midnight;
  if (hour >= 5 && hour < 11) return LIGHTING_MODES.dawn;
  if (hour >= 11 && hour < 17) return LIGHTING_MODES.noon;
  return LIGHTING_MODES.dusk;
}
