// --- Dark palette (default) ---
export const darkColors = {
  primary: '#13ec13',
  primaryDark: '#0eb80e',
  primaryLight: '#13ec1333',
  secondary: '#ec7f13',
  secondaryLight: '#ec7f1333',

  background: '#111111',
  surface: '#1a1a1a',

  // Semantic text colors
  text: '#ffffff',
  textSecondary: '#9ca3af',
  textMuted: '#6b7280',
  textInverse: '#000000',

  white: '#ffffff',
  black: '#000000',

  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Semantic overlay / divider values (dark)
  divider: 'rgba(255,255,255,0.05)',
  overlay: 'rgba(255,255,255,0.1)',
  overlayLight: 'rgba(255,255,255,0.05)',
  overlayMedium: 'rgba(255,255,255,0.1)',
  cardOverlay: 'rgba(255,255,255,0.05)',
  scrim: 'rgba(0,0,0,0.5)',

  // Backward-compat aliases
  backgroundDark: '#111111',
  surfaceDark: '#1a1a1a',
};

// --- Light palette ---
export const lightColors = {
  primary: '#0cb80c',
  primaryDark: '#099609',
  primaryLight: '#0cb80c33',
  secondary: '#d96e0a',
  secondaryLight: '#d96e0a33',

  background: '#f5f5f7',
  surface: '#ffffff',

  // Semantic text colors
  text: '#111111',
  textSecondary: '#4b5563',
  textMuted: '#6b7280',
  textInverse: '#ffffff',

  white: '#ffffff',
  black: '#000000',

  gray: {
    50: '#111827',
    100: '#1f2937',
    200: '#374151',
    300: '#4b5563',
    400: '#6b7280',
    500: '#9ca3af',
    600: '#d1d5db',
    700: '#e5e7eb',
    800: '#f3f4f6',
    900: '#f9fafb',
  },

  success: '#16a34a',
  warning: '#d97706',
  error: '#dc2626',
  info: '#2563eb',

  // Semantic overlay / divider values (light)
  divider: 'rgba(0,0,0,0.06)',
  overlay: 'rgba(0,0,0,0.06)',
  overlayLight: 'rgba(0,0,0,0.04)',
  overlayMedium: 'rgba(0,0,0,0.08)',
  cardOverlay: 'rgba(0,0,0,0.03)',
  scrim: 'rgba(0,0,0,0.3)',

  // Backward-compat aliases
  backgroundDark: '#f5f5f7',
  surfaceDark: '#ffffff',
};

// Default export for backward compatibility (dark mode)
export const colors = darkColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  xxxl: 24,
  full: 9999,
};

export const fontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};
