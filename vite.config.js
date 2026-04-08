import { defineConfig } from 'vite';

export default defineConfig({
  // Serve static assets (sounds, textures, etc.) from the project root
  publicDir: 'public',
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
});
