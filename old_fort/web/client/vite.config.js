import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/fortpolio/', // crucial for asset/script URLs
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: ['@mui/material', '@emotion/react', '@emotion/styled'],
          icons: ['@mui/icons-material'],
          ui: ['framer-motion', 'react-slick', 'slick-carousel'],
        },
      },
    },
  },
});
