# Interactive Sky Portfolio

A local foundation for a portfolio built as a vertical journey through the sky. The user directs the visual and interaction design. **Everything currently on screen is provisional, including the copy, palette, typeface, and geometry.**

## Run locally

Use Node.js 22 or newer (Node 22 is recorded in `.nvmrc`) and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js, normally <http://127.0.0.1:3000>. Stop with Ctrl+C. No secrets or external services are required.

```sh
npm run build       # production compilation, TypeScript validation, static generation
npm run typecheck   # standalone TypeScript check
npm start           # serve the production build
```

Development and production builds currently use Next.js's Webpack compiler. Turbopack's PostCSS worker failed to bind an internal port in this environment; Webpack builds successfully. This is a tooling workaround, not a change to the application architecture.

## Milestone 1

- Next.js App Router, TypeScript, Tailwind CSS, React Three Fiber, and Three.js.
- A viewport-sized sky section and a second section reached through native document scrolling.
- Three low-complexity decorative balloon placeholders, driven by configuration.
- Semantic HTML experience placeholders; no fictional professional claims.
- A separately loaded client canvas, on-demand rendering, capped pixel ratio, and static HTML/CSS fallback.
- Responsive layout, keyboard links, visible focus, and no automatic motion.

The objects intentionally have no hover/click/focus behavior yet. There is no camera journey, parallax, modal, or side panel. Drei, GSAP, and ScrollTrigger are deferred until a prototype needs them. No third-party visual assets or downloaded fonts are used.

## Structure

```text
src/
  app/                    # route, metadata, prototype CSS tokens/layout
  components/
    portfolio/            # semantic HTML content
    scene/                # client canvas, geometry, fallback, scene placement
  data/                   # portfolio content only
  types/                  # content contracts
docs/                     # vision, design, architecture, decisions, roadmap
```

Start with [the vision](docs/VISION.md), [architecture](docs/ARCHITECTURE.md), and [decision log](docs/DECISIONS.md). Future agents must follow [AGENTS.md](AGENTS.md).

## Manual acceptance checks

1. Load the page and confirm the gradient and three placeholder objects appear.
2. Scroll to all three experience entries and use both in-page navigation links.
3. Tab from the top: the skip link appears, followed by the exploration link and return link. Enter activates each link. Decorative objects are not tab stops.
4. Check a narrow mobile viewport (320–390 px) and desktop; content remains readable without horizontal scrolling. Touch scrolling uses the browser normally.
5. Enable reduced motion. The scene remains static, with instant anchor navigation.
6. Disable WebGL before loading: CSS shapes replace the scene, while the same HTML content and navigation remain available.

Validation results and remaining work are recorded in [the roadmap](docs/ROADMAP.md). This is a local prototype, with no hosting/deployment configured; prototype metadata requests no indexing.
