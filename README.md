# QAVILO — Digital Menu Studio

A conversion-first redesign for QAVILO. The homepage is built to sell the service clearly: what the client gets, why it helps their café, examples of the menu experience, and direct contact.

## Stack

- React 18 + React DOM
- Vite 6
- Three.js + React Three Fiber + Drei for the interactive 3D coffee scene
- Framer Motion for UI transitions
- Lucide React icons

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Design direction

- Commercial-first messaging and clear contact actions
- Espresso / copper / warm cream palette
- Procedural 3D ceramic coffee cup, saucer, coffee surface and floating coffee beans
- The 3D scene is an accent to support the product story, not a full-screen distraction
- Existing 6-page structure and 75 sample menu products retained

## Notes

The 3D scene is generated from Three.js geometry and rendered with React Three Fiber. It does not require external 3D model downloads. The scene has a non-WebGL fallback.

Before deploying, run `npm install` and `npm run build` locally, then publish the project using the included GitHub Actions workflow.
