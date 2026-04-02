// ── Vibrant premium palette ──────────────────────────────────────────────────
export const COLORS = {
  // Core brand
  coral:   '#FF6B6B',
  teal:    '#4ECDC4',
  yellow:  '#FFE66D',
  purple:  '#7C3AED',
  blue:    '#3B82F6',
  green:   '#10B981',
  orange:  '#F97316',
  pink:    '#EC4899',
  indigo:  '#6366F1',

  // Background system: deep purple-ish dark
  bgDeep:  '#0F0C29',    // Very deep purple-dark (main BG)
  bgMid:   '#302B63',    // Mid purple (blob)
  bgLight: '#24243E',    // Slightly lighter layer

  // Card / surface
  surface:  'rgba(255,255,255,0.10)',   // glassmorphism card
  surfaceLight: 'rgba(255,255,255,0.95)', // solid white for modals/overlays
  border:   'rgba(255,255,255,0.12)',

  // Text (on dark bg)
  text:          '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.55)',
  textMuted:     'rgba(255,255,255,0.30)',

  // Gradient button  
  btnFrom: '#F97316',   // orange
  btnTo:   '#EC4899',   // pink

  // Pointer
  pointer: '#FFFFFF',

  // Wheel center hub
  wheelCenter: '#FFFFFF',

  // Light text-only surface (options, history)
  panelBg:   '#F7F4FF',   // soft lavender bg for non-spin screens
  panelCard: '#FFFFFF',
  panelText: '#1A1232',
  panelSub:  '#8B8FA8',
  panelBorder: '#EBE8F8',
};

// ── Vibrant segment colours ───────────────────────────────────────────────────
export const SEGMENT_COLORS = [
  '#FF6B6B', // coral
  '#7C3AED', // purple
  '#F97316', // orange
  '#4ECDC4', // teal
  '#EC4899', // pink
  '#3B82F6', // blue
  '#FFE66D', // yellow
  '#10B981', // green
];

export const TYPOGRAPHY = {
  fontFamily: 'System',
  sizes: {
    largeTitle: 32,
    title:      26,
    subtitle:   18,
    body:       16,
    caption:    14,
    tiny:       12,
  },
  weights: {
    regular:  '400',
    medium:   '500',
    semibold: '600',
    bold:     '700',
    black:    '900',
  },
};

export const SPACING = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 40,
};

export const BORDER_RADIUS = {
  sm:    8,
  md:    16,
  lg:    24,
  xl:    32,
  round: 9999,
};

// Glow shadow presets (coloured)
export const SHADOWS = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  }),
};
