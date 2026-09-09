/**
 * Application constants — colors, areas, quality presets
 */

// ─── Color Palette ────────────────────────────────────
export const COLORS = {
  // Core
  charcoal:     '#1a1a2e',
  darkCharcoal: '#0f0f1a',
  stone:        '#3d3d56',
  stoneLight:   '#5a5a7a',
  warmBrown:    '#8b6914',
  deepGreen:    '#2d5a27',
  forestGreen:  '#3a7d32',
  mutedCyan:    '#4ecdc4',
  magicPurple:  '#9b59b6',
  magicBlue:    '#6c5ce7',
  lanternGold:  '#f39c12',
  lanternWarm:  '#e67e22',
  
  // Environment
  skyTop:       '#1a1a3e',
  skyBottom:    '#2d1b69',
  grassGreen:   '#4a8c3f',
  grassDark:    '#3a7030',
  dirtBrown:    '#6b4423',
  woodBrown:    '#8B5E3C',
  woodDark:     '#5C3A1E',
  stoneBrick:   '#7a7a8a',
  stoneGray:    '#9a9aaa',
  leafGreen:    '#2d8a2d',
  leafDark:     '#1e6b1e',
  waterBlue:    '#3498db',
  sandYellow:   '#d4a843',
  
  // UI
  panelBg:      'rgba(15, 15, 26, 0.85)',
  panelBorder:  'rgba(100, 100, 140, 0.3)',
  panelHover:   'rgba(78, 205, 196, 0.1)',
  textPrimary:  '#e8e8f0',
  textSecondary:'#9a9ab0',
  textMuted:    '#6a6a80',
  
  // Enchantment
  enchantPurple:'#7b2fff',
  enchantBlue:  '#00d4ff',
  enchantGlow:  'rgba(123, 47, 255, 0.4)',
  
  // End
  endVoid:      '#0a0014',
  endPurple:    '#2d0a4e',
  endParticle:  '#c39bd3',
};

// ─── Area Definitions ─────────────────────────────────
export const AREAS = {
  SPAWN:        { id: 'spawn',       name: 'Spawn Village',     biome: 'Plains',        position: [0, 0, 0],     color: COLORS.forestGreen },
  WORKSHOP:     { id: 'workshop',    name: 'Player Profile',    biome: 'Cherry Grove',  position: [40, 0, 0],    color: COLORS.warmBrown },
  ENCHANTMENT:  { id: 'enchantment', name: 'Enchantment Room',  biome: 'Stronghold',    position: [80, 0, 0],    color: COLORS.magicPurple },
  TRADING:      { id: 'trading',     name: 'Trading Hall',      biome: 'Mineshaft',     position: [120, 0, 0],   color: COLORS.lanternGold },
  ADVANCEMENTS: { id: 'advancements',name: 'Advancements',      biome: 'Deep Dark',     position: [160, 0, 0],   color: COLORS.mutedCyan },
  THE_END:      { id: 'theEnd',      name: 'The End',           biome: 'The Void',      position: [200, 0, 0],   color: COLORS.magicBlue },
};

// ─── Quality Presets ──────────────────────────────────
export const QUALITY = {
  LOW: {
    shadows: false,
    particles: 20,
    antialias: false,
    pixelRatio: 1,
    fogDensity: 0.02,
    postProcessing: false,
  },
  MEDIUM: {
    shadows: true,
    particles: 50,
    antialias: true,
    pixelRatio: Math.min(window.devicePixelRatio, 1.5),
    fogDensity: 0.015,
    postProcessing: false,
  },
  HIGH: {
    shadows: true,
    particles: 100,
    antialias: true,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    fogDensity: 0.01,
    postProcessing: true,
  },
};

// ─── Hotbar Items (9 Inventory Slots) ─────────────────
export const HOTBAR_ITEMS = [
  { id: 'home',       label: 'Home',         icon: '🌿', key: '1', area: 'spawn' },
  { id: 'about',      label: 'About Me',     icon: '👤', key: '2', area: 'workshop' },
  { id: 'skills',     label: 'Enchantments', icon: '📖', key: '3', area: 'enchantment' },
  { id: 'projects',   label: 'Builds/Chest', icon: '📦', key: '4', area: 'trading' },
  { id: 'experience', label: 'Advancements', icon: '🧭', key: '5', area: 'advancements' },
  { id: 'resume',     label: 'Highlights',   icon: '⭐', key: '6', area: null },
  { id: 'trades',     label: 'Trades',       icon: '💎', key: '7', area: 'trading' },
  { id: 'notes',      label: 'Book & Quill', icon: '📜', key: '8', area: 'workshop' },
  { id: 'contact',    label: 'The End',      icon: '🔮', key: '9', area: 'theEnd' },
];

// ─── Skill Categories ─────────────────────────────────
export const SKILL_CATEGORIES = {
  frontend:  { label: 'Frontend',    color: COLORS.mutedCyan },
  backend:   { label: 'Backend',     color: COLORS.forestGreen },
  '3d':      { label: '3D / WebGL',  color: COLORS.magicPurple },
  tools:     { label: 'Tools',       color: COLORS.lanternGold },
  creative:  { label: 'Creative',    color: COLORS.magicBlue },
  emerging:  { label: 'Emerging',    color: '#e74c3c' },
};

// ─── Roman Numerals ───────────────────────────────────
export const toRoman = (num) => {
  const map = ['', 'I', 'II', 'III', 'IV', 'V'];
  return map[num] || num.toString();
};
