import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Disable source maps in production to reduce bundle size and hide source
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          "vendor-react": ["react", "react-dom", "react-router", "react-router-dom"],
          // Radix UI primitives
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
          ],
          // Chart library (large)
          "vendor-charts": ["recharts"],
          // Internationalization
          "vendor-i18n": ["i18next", "react-i18next", "i18next-browser-languagedetector"],
          // State management
          "vendor-state": ["zustand"],
          // HTTP client
          "vendor-http": ["axios"],
          // Audio waveform
          "vendor-audio": ["wavesurfer.js"],
        },
      },
    },
  },
})
