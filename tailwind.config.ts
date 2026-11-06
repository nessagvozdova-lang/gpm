import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { burgundy: '#800020', wine: '#570016', blush: '#FAF8F8' }, fontFamily: { sans: ['Arial', 'sans-serif'] } } },
  plugins: [],
} satisfies Config;
