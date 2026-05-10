export const cn = (...classes: (string | boolean | undefined)[]) => 
  classes.filter(Boolean).join(' ');

export const colors = {
  dark: '#0D121D',
  darkSecondary: '#1B2334',
  accent: '#2563EB',
  accentLight: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  text: '#FFFFFF',
  textSecondary: '#9CA3AF',
  border: '#374151',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};
