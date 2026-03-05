/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    env: {
      PROJ_JSON_PATH: '../content/generated/projects.json',
    },
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    globals: true,
  },
  base: '/fortpolio/',
  resolve: {
    alias: {
      '@content': path.resolve(__dirname, 'src/content'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  // removes hash from build artifacts
  // build: {
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: `assets/[name].js`,
  //       chunkFileNames: `assets/[name].js`,
  //       assetFileNames: `assets/[name][extname]`,
  //     },
  //   },
  // },
})
