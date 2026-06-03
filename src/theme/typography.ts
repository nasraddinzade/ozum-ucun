import {Platform} from 'react-native';

export const FontFamily = {
  // Serif — for philosophical content, Fromm quotes
  serif: Platform.select({
    android: 'serif',
    ios: 'Georgia',
    default: 'serif',
  }),
  serifItalic: Platform.select({
    android: 'serif-italic',
    ios: 'Georgia-Italic',
    default: 'serif',
  }),
  serifBold: Platform.select({
    android: 'serif-bold',
    ios: 'Georgia-Bold',
    default: 'serif',
  }),

  // Sans-serif — for UI elements
  sans: Platform.select({
    android: 'sans-serif',
    ios: 'System',
    default: 'sans-serif',
  }),
  sansLight: Platform.select({
    android: 'sans-serif-light',
    ios: 'System',
    default: 'sans-serif',
  }),
  sansMedium: Platform.select({
    android: 'sans-serif-medium',
    ios: 'System',
    default: 'sans-serif',
  }),
  sansBold: Platform.select({
    android: 'sans-serif-bold',
    ios: 'System',
    default: 'sans-serif',
  }),
  sansCondensed: Platform.select({
    android: 'sans-serif-condensed',
    ios: 'System',
    default: 'sans-serif',
  }),
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,
  '4xl': 40,
  '5xl': 48,
} as const;

export const LineHeight = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.65,
  loose: 1.8,
} as const;

export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
} as const;
