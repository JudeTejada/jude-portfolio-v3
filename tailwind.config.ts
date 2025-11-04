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
        header: 'inset 0 -1px 0 0 rgba(0,0,0,0.1)'
      },
      transitionProperty: {
        spacing: 'margin, padding'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
} satisfies Config;