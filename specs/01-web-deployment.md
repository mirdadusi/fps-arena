# Spec 01 — Web Deployment: Vite Build System

## Problem Statement

The game currently loads Three.js from a CDN via an inline importmap in `index.html`.
This means:
- Players need internet to load the CDN on every visit (latency, reliability risk)
- No minification or tree-shaking (slow initial load)
- No `dist/` artifact for static hosting (Netlify, GitHub Pages, Vercel)
- No dev server with hot-reload for development

The game must be deployable as a static site with a single `npm run build` command
that produces a self-contained `dist/` folder requiring no server-side code for
single-player mode.

## Goals

- Add Vite as the bundler/dev-server with zero breaking changes to game logic
- Produce an optimised `dist/` folder ready for static hosting
- Eliminate the CDN importmap dependency (bundle Three.js locally)
- Provide `npm run dev` for fast local development
- Ensure the multiplayer WebSocket server (`server/index.js`) continues to work unchanged

## Non-Goals

- Server-side rendering (SSR) — the game is a pure client SPA
- Any changes to gameplay, physics, or AI logic in this spec
- Automated CI/CD pipeline setup
- Docker or containerisation

## Technical Approach

1. Add `vite` as a dev dependency in `package.json`
2. Create `vite.config.js` at project root:
   - `root: '.'` so `index.html` is the entry
   - `base: './'` so asset paths are relative (works on any hosting subdirectory)
   - `build.outDir: 'dist'`
   - `build.target: 'es2020'`
   - `server.port: 5173` for dev
3. Replace the inline importmap in `index.html` with a normal bare import:
   - Remove `<script type="importmap">` block
   - Vite resolves `import * as THREE from 'three'` automatically from `node_modules`
4. Add `three` as a production dependency: `npm install three`
5. Update `package.json` scripts:
   - `"dev": "vite"`
   - `"build": "vite build"`
   - `"preview": "vite preview"`
   - Keep `"start": "node server/index.js"` for multiplayer backend
6. Add `dist/` to `.gitignore` (create `.gitignore` if absent)
7. Update `README.md` (or create it) with `npm run build` and hosting instructions

### File Changes

| File | Change |
|------|--------|
| `package.json` | Add `vite` devDep, `three` dep, update scripts |
| `vite.config.js` | New file |
| `index.html` | Remove importmap block |
| `.gitignore` | Add `dist/`, `node_modules/` |
| `README.md` | Document build + deploy |

## Acceptance Criteria

- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts a Vite dev server on port 5173 and the game loads in the browser without console errors
- [ ] `npm run build` exits 0 and produces a `dist/` folder containing `index.html` and bundled JS/CSS assets
- [ ] Opening `dist/index.html` via `vite preview` (or a simple static server) shows the game lobby without any CDN requests (verify via browser DevTools → Network → no `cdn.jsdelivr.net` or `unpkg.com` requests)
- [ ] The importmap `<script>` block is removed from `index.html`
- [ ] `three` is listed as a dependency in `package.json`
- [ ] `vite` is listed as a devDependency in `package.json`
- [ ] `node server/index.js` still starts the WebSocket server on port 3000 unaffected
- [ ] `dist/` is present in `.gitignore`
- [ ] Built bundle size for the JS entry chunk is reported by Vite (any size is acceptable — just must report)
