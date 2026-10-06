import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /**
         * Palette pulled from the logo: black script on cream, with a pale
         * eucalyptus circle (#d6e5e0) and lavender sprigs (#ece3f6).
         * Those two tints are far too light to carry text, so each is extended
         * into a full scale — 100 sits on the logo's own value, and 600/700 are
         * the darkened versions that pass contrast on white.
         */
        sage: {
          50: '#f2f7f5',
          100: '#e0ece9', // logo circle tint
          200: '#c2dad4',
          300: '#96bfb6',
          400: '#67a094',
          500: '#4a8478',
          600: '#3a6c62', // body links, 7.0:1 on white
          700: '#315850',
          800: '#2a4742',
          900: '#243b37',
        },
        lav: {
          50: '#f8f5fd',
          100: '#ece3f6', // logo sprig tint
          200: '#dccdf0',
          300: '#c3ace4',
          400: '#a888d4',
          500: '#8f6bc2',
          600: '#7a55ab',
          700: '#65458c',
        },
        ink: {
          50: '#f6f6f5',
          100: '#e7e7e5',
          200: '#cfcfca',
          300: '#aeaea6',
          400: '#86867d',
          500: '#6a6a62',
          600: '#54544e',
          700: '#454541',
          800: '#2b2b28',
          900: '#1b1b19',
        },
        sand: {
          50: '#fdfbf7',
          100: '#f9f4ea',
          200: '#f1e7d4',
          300: '#e5d4b4',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '72rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(27,27,25,0.04), 0 8px 24px -12px rgba(27,27,25,0.12)',
        lift: '0 2px 4px rgba(27,27,25,0.05), 0 18px 40px -18px rgba(27,27,25,0.22)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
