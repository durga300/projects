import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Development server optimizations
    cors: true,
    strictPort: false,
    port: 5174 // Use port 5174 instead of default 5173
  },
  build: {
    // Enable compression
    brotliSize: true,
    chunkSizeWarningLimit: 1000
  },
  // Asset optimization
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.webp'],
  // Enable sourcemaps for debugging
  esbuild: {
    sourcemap: true
  }
})