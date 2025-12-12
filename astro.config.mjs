// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

import expressiveCode from 'astro-expressive-code';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://judetejada.dev',
  integrations: [
    react(),
    expressiveCode(),
    mdx(),
    sitemap()
  ],

  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),

  image: {
    domains: ['judetejada.dev'],
    remotePatterns: [{ protocol: 'https' }],
    service: { entrypoint: 'astro/assets/services/sharp' }
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom'],
            'astro': ['astro']
          }
        }
      }
    }
  },

  build: {
    inlineStylesheets: 'auto',
    format: 'directory'
  }
});