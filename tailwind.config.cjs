/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './AppFrame.tsx',
    './components/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
      colors: {
        jute: {
          100: '#F5F0E6',
          200: '#E8DFCC',
          300: '#D6C8A8',
          500: '#B09A6F',
          800: '#6B5B3E',
          900: '#4A3F2B',
        },
        brand: {
          green: '#4A5D44',
          pink: '#D8A6A6',
        },
      },
      keyframes: {
        'bs-pop': {
          '0%': { transform: 'scale(0.98)', opacity: '0.6' },
          '60%': { transform: 'scale(1.02)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'bs-shimmer': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'bs-pop': 'bs-pop 360ms ease-out',
        'bs-shimmer-once': 'bs-shimmer 1200ms ease-out 1',
        'fade-in-up': 'fade-in-up 600ms ease-out forwards',
        'fade-in': 'fade-in 500ms ease-out forwards',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};


