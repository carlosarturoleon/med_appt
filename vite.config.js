import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    minify: 'oxc',           // Fast JS minification (Vite 8 default)
    cssCodeSplit: true,      // Extract CSS into separate files (default)
    sourcemap: false,        // Don't generate source maps for production
    rollupOptions: {
      output: {
        manualChunks: undefined, // Let Vite optimize chunk splitting
      },
    },
  },
  css: {
    postcss: {},
  },
});
