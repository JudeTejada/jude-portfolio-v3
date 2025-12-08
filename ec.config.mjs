import { defineEcConfig } from 'astro-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

export default defineEcConfig({
  // Use a single light theme (matching Cursor docs style)
  themes: ['github-light'],

  // Disable dark mode media query since we want light theme only
  useDarkModeMediaQuery: false,

  // Enable line numbers pluginLineNumbers
  plugins: [pluginLineNumbers()],

  // Default props for all code blocks
  defaultProps: {
    showLineNumbers: true,
  },

  // Style overrides to match Cursor docs design
  styleOverrides: {
    // Code block container
    borderRadius: '0.5rem',
    borderWidth: '1px',
    borderColor: '#e5e5e5',

    // Code content styling
    codeBackground: '#f8f6f4', // Warm cream/beige background
    codeForeground: '#1f2328',
    codeFontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', ui-monospace, monospace",
    codeFontSize: '0.875rem',
    codeLineHeight: '1.7',
    codePaddingBlock: '1rem',
    codePaddingInline: '1.25rem',

    // Line numbers styling
    lineNumbers: {
      foreground: '#9ca3af', // Subtle gray for line numbers
      highlightForeground: '#6b7280',
    },

    // Frames (optional header/filename bar)
    frames: {
      shadowColor: 'transparent', // No shadow for flat design
    },
  },

  // Customize the theme to adjust syntax colors
  customizeTheme: (theme) => {
    // Adjust tokenColors to match Cursor docs style
    if (theme.name === 'github-light') {
      // Ensure warm background
      theme.colors['editor.background'] = '#f8f6f4';
    }
    return theme;
  },
})
