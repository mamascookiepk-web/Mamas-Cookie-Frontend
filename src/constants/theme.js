/**
 * JS mirror of src/styles/theme.css — keep values in sync.
 * Use this only where Tailwind classes aren't applicable (canvas, meta tags,
 * inline SVG fills, third-party chart libs). Everywhere else, use Tailwind
 * utility classes (bg-primary-500, text-ink-900, etc).
 */
export const theme = {
  primary: {
    50: '#fef2f2',
    100: '#fde2e2',
    200: '#fac5c4',
    300: '#f4989a',
    400: '#ea6465',
    500: '#e2231a',
    600: '#c81e17',
    700: '#a11813',
    800: '#7a120f',
    900: '#530c0a',
  },
  ink: {
    50: '#f7f7f8',
    100: '#ededef',
    200: '#d6d6da',
    300: '#b0b0b8',
    400: '#7c7c88',
    500: '#54545f',
    600: '#3a3a42',
    700: '#26262c',
    800: '#18181c',
    900: '#0b0b0d',
  },
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
  surface: {
    DEFAULT: '#ffffff',
    muted: '#fafafa',
    footer: '#0b0b0d',
  },
  status: {
    success: '#16a34a',
    warning: '#d97706',
    danger: '#e2231a',
    info: '#2563eb',
  },
};
