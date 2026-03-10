# Anish Anto — Portfolio

A Next.js 15 portfolio with a **WebGPU shader hero** (depth-parallax + dot-matrix scan effect) and a full interactive 3D scene.

## Requirements
- Node.js 18+
- A browser with **WebGPU support** (Chrome 113+, Edge 113+)
  - Go to `chrome://flags` → enable "Unsafe WebGPU" if needed

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

## Tech Stack
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Three.js r172** (WebGPU renderer + TSL shader nodes)
- **@react-three/fiber** v9
- **@react-three/drei** v10
- **Framer Motion**

## Shader Hero
The hero uses:
- `three/webgpu` — WebGPU renderer
- `three/tsl` — Three.js Shading Language (shader graph nodes)
- Depth-parallax effect: mouse movement shifts image based on depth map
- Teal dot-matrix scanline animation (brand-matched)
- Bloom post-processing
- Smooth fade-in on load

## Project Structure
```
app/
  layout.tsx       — Root layout + fonts
  page.tsx         — Main page assembly
  globals.css      — Global styles + animations
components/ui/
  hero-shader.tsx  — WebGPU shader hero (main feature)
  nav.tsx          — Sticky navigation
  sections.tsx     — About, Skills, Projects, Experience, Certs, Contact, Footer
  cursor.tsx       — Custom animated cursor
```

## Notes
- The shader requires WebGPU — it will NOT work in Firefox or Safari yet
- The `next.config.js` includes `transpilePackages: ['three']` to handle ESM imports
- Images are loaded from postimg CDN (the component's original textures)
  To use your own portrait: replace `TEXTUREMAP.src` and `DEPTHMAP.src` in `hero-shader.tsx`
  with your own image URL + a matching grayscale depth map
