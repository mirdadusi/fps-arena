import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  // Serve static assets (sounds, textures, etc.) from the project root
  publicDir: 'public',
  base: './',
  build: {
    outDir: 'dist',
    target: 'es2020',
    // Inline small assets; larger ones (textures, audio) remain as files
    assetsInlineLimit: 4096,
  },
  server: {
    port: 5173,
  },
  // three is already an ES module — no special transform needed
  optimizeDeps: {
    include: ['three'],
  },
  test: {
    include: ['tests/**/*.test.js'],
    testTimeout: 8000,
    hookTimeout: 10000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.js', 'server/**/*.js'],
      exclude: ['src/main.js'],
      thresholds: {
        statements: 35,
        branches: 20,
        functions: 35,
        lines: 38,
      },
    },
  },
});
