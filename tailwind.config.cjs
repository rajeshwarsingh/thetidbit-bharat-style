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
      },
      animation: {
        'bs-pop': 'bs-pop 360ms ease-out',
        'bs-shimmer-once': 'bs-shimmer 1200ms ease-out 1',
      },
    },
  },
  plugins: [],
};


