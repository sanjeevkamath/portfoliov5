# Architecture

## Current implementation

Next.js App Router serves the page and portfolio content as server components. A small client wrapper dynamically loads the R3F canvas with SSR disabled. Three.js supplies built-in geometry/materials; no external models, textures, or font requests are required.

```text
app/page.tsx (server)
├── sky viewport: semantic introduction + navigation
│   └── SkyScene (client loading/error boundary)
│       └── SkyCanvas (dynamic R3F canvas)
│           └── PlaceholderBalloon × 3 ← scene-config.ts
└── ExperienceList (server HTML) ← data/experiences.ts
```

`types/experience.ts` defines the content contract. Stable experience IDs connect the content and scene configuration without putting presentation coordinates inside portfolio data. Scene config restricts IDs to actual placeholder IDs at compile time.

The browser document is the vertical scroll container. A CSS gradient spans the journey; the first section is viewport-sized and the next contains experience placeholders. The canvas itself sits inside the scene figure. Native flow preserves zoom, small-screen overflow, anchors, keyboard navigation, and touch behavior. No nested scrolling or pinned canvas exists yet.

## Dependency choices

| Technology | Current use / trade-off |
| --- | --- |
| Next.js + React | Routing, server-rendered content, client boundary; more framework than a static page needs, but matches project preference |
| TypeScript | Strict content/component contracts |
| Tailwind CSS | Installed through PostCSS; utilities for simple layout, ordinary CSS for scene composition and temporary tokens |
| R3F + Three.js | Validates the real 3D rendering boundary; increases client bundle weight |
| Drei | Deferred; current primitives need no helper library |
| GSAP / ScrollTrigger | Deferred; no coordinated timelines or scroll-driven motion in M1 |

The exact dependency graph is in `package-lock.json`. React 19 pairs with R3F 9. Current source guidance: [Next installation](https://nextjs.org/docs/app/getting-started/installation), [R3F compatibility](https://r3f.docs.pmnd.rs/getting-started/installation), [Tailwind + Next](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

The `dev` and `build` scripts explicitly use Webpack. The initial Turbopack build failed on a PostCSS worker's internal port binding in this environment, including after an elevated retry. Webpack passed production compilation and static generation. Reevaluate Turbopack after an environment/framework change; no app-level workaround is required.

## Rendering and resilience

- One canvas; `frameloop="demand"` avoids idle rendering, DPR capped at 1.5.
- No shadows, postprocessing, textures, continuous frame callbacks, or external assets.
- Three objects use low-segment primitives; viewport width scales their group on narrow screens.
- CSS fallback is shown during dynamic loading, on missing WebGL, or on a caught scene render error. Scene content is decorative; HTML never depends on renderer success.
- Dynamic loading splits the canvas code, but does not make its total download small. Profile on a real mobile device before increasing scene complexity.
- No runtime context-loss recovery or adaptive performance system exists yet. Test those when introducing long-lived animation/scroll scenes.

## Future interaction boundary — recommendation, not implemented

Keep one `selectedExperienceId` in a shared client controller when interaction work begins. Both native HTML buttons and 3D activation should dispatch selection by ID. Content lookup remains separate. A detail renderer can then be a modal, side panel, or inline presentation; an optional camera controller can respond to the same selection.

Do not build a generic interaction plugin system now. Extract only the shared selection/close contract needed by the first comparison prototype. Details need a semantic heading and appropriate focus management; closing restores focus to a meaningful HTML control even when selection began on a mesh.

Keep future motion logic in scene controllers/hooks, separate from portfolio records. Introduce a shared motion-preference policy before adding movement. Reduced motion should remove nonessential drift/parallax/camera travel; continuous motion may also need a pause control.

## Delivery

Local npm workflow; no external services, environment variables, backend, hosting manifest, or deployment. Git tracks source and lockfile; generated output and dependencies are ignored. Choose deployment only when requested.
