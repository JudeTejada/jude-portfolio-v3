import type { Config } from 'tailwindcss';

const colors = require('tailwindcss/colors');

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },

      colors: {
        ...colors,
        black: {
          heading: '#000',
          paragraph: '#333'
        },
        white: {
          heading: '#fff',
          header: 'hsla(0,0%,100%,0.9)'
        },
        blue: {
          primary: '#4669e8',
          secondary: '#4659e8',
          twitter: '#00acee',
          linkedin: '#0a66c2'
        },
        gray: {
          dark: '#333',
          light: '#a1a7b3'
        },
        pink: {
          dribble: '#ea4c89'
        }
      },
      boxShadow: {
        header: 'inset 0 -1px 0 0 rgba(0,0,0,0.1)',
        subtle: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        soft: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        hover: '0 10px 25px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.06)',
      },
      keyframes: {
        'command-panel-overlay-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'command-panel-overlay-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'command-panel-dialog-in': {
          from: { opacity: '0', transform: 'translateY(-8px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'command-panel-dialog-out': {
          from: { opacity: '1', transform: 'translateY(0) scale(1)' },
          to: { opacity: '0', transform: 'translateY(-6px) scale(0.98)' },
        },
      },
      animation: {
        'command-panel-overlay-in':
          'command-panel-overlay-in 160ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'command-panel-overlay-out':
          'command-panel-overlay-out 120ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'command-panel-dialog-in':
          'command-panel-dialog-in 180ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'command-panel-dialog-out':
          'command-panel-dialog-out 140ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      transitionProperty: {
        spacing: 'margin, padding'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
} satisfies Config;
