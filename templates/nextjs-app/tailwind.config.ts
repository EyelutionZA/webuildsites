import type { Config } from 'tailwindcss';

/*
  Tailwind is wired to the design tokens in app/globals.css.
  Re-derive the tokens per brand there — this file rarely needs editing.
*/
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        brand: 'var(--brand)',
        'brand-ink': 'var(--brand-ink)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)'
      },
      borderColor: {
        DEFAULT: 'var(--border)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'step--1': 'var(--step--1)',
        'step-0': 'var(--step-0)',
        'step-1': 'var(--step-1)',
        'step-2': 'var(--step-2)',
        'step-3': 'var(--step-3)',
        'step-4': 'var(--step-4)',
        'step-5': 'var(--step-5)'
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        lg: 'var(--radius-lg)'
      },
      boxShadow: {
        DEFAULT: 'var(--shadow)'
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        io: 'var(--ease-io)'
      },
      maxWidth: {
        prose: '65ch'
      }
    }
  },
  plugins: []
};

export default config;
