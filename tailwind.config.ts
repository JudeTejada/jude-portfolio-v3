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
      transitionProperty: {
        spacing: 'margin, padding'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
} satisfies Config;
