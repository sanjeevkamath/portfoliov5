# Architecture

## Current prototype

Next.js App Router + TypeScript + Tailwind + React Three Fiber + Three.js. No new packages were added for sky study 002. Webpack remains the build/dev compiler due to the original Turbopack worker-port issue.

```text
app/page.tsx
└── SkyJourney (client controller, pre-rendered HTML)
    ├── fixed decorative world
    │   ├── CSS cloud backdrop and alpha foreground
    │   └── SkyScene error/loading boundary → dynamic SkyCanvas
    │       ├── Airship
    │       └── PlaceholderBalloon × 3
    ├── semantic document sections + native object buttons
    ├── chapter anchors / motion control / progress
    └── StoryDialog ← selected story ID
```

The cloud artwork is local WebP (about 288 KB combined). It remains visible without WebGL. No external image or font requests. Assets/provenance are in `docs/ASSETS.md`.

## Separation of responsibilities

- `data/experiences.ts` owns content and stable IDs. No coordinates or animation data.
- `scene-config.ts` defines normalized object positions, scale, palette, and a small mutable frame contract. IDs are constrained to valid experience IDs.
- `SkyJourney` owns selected story, hover/focus, paused state, chapter, and native navigation. One animation-frame-throttled scroll listener updates a mutable frame ref and CSS properties; React state changes only when chapter/interaction changes.
- `SkyCanvas` reads the frame without React rerenders per animation frame. It positions objects to match their corresponding document sections and shared normalized HTML target coordinates.
- `Airship` and `PlaceholderBalloon` own procedural geometry/materials only. Balloon envelope uses a smooth lathed profile with an original striped shader; no asset collection.
- `StoryDialog` owns content presentation and native dialog lifecycle. Its selection contract is `"about" | ExperienceId | null`. Camera focus or a side panel can consume this state later without rewriting portfolio data or geometry.
- `useMotionPreference` subscribes to reduced-motion and page-visibility changes with `useSyncExternalStore`; server snapshot is motion-disabled.

## Scrolling and rendering

The document remains the only scroll container. A full-screen fixed world sits behind three `100svh` sections and a `75svh` horizon. Scroll position is normalized against the actual first section height. Objects translate with document content, while background cloud layers move more slowly; no wheel/touch interception or scroll library.

One canvas, DPR capped at 1.5. Continuous frames only while motion is permitted, no dialog is open, and an object chapter is active. Else demand rendering, with scroll invalidation so static objects remain aligned. No postprocessing, shadows, large 3D downloads, or volumetric raymarching. Measure on real phones before adding complexity.

The scene is decorative to assistive technology. Semantic HTML buttons provide all activation. Native `<dialog>` provides focus confinement, Escape handling, and focus restoration; body scrolling is locked only while the modal is open and restored afterward.

## Fallbacks and limitations

If dynamic import or scene rendering fails, the error boundary omits the canvas; the independent cloud world, labels, native controls, and dialogs remain. This is a usable visual/content fallback, not a separate illustrated object renderer. No runtime context-loss recovery yet.

Reduced motion/pause removes nonessential environmental motion. Document-relative object translation remains to maintain alignment with controls during normal scrolling. Background drift stops when hidden. There is no scroll easing, loading gate, sound, or custom cursor.

This is intentionally 2.5D. Raster clouds cannot support arbitrary camera angles or true volumetric traversal. If this direction is approved, evaluate cloud impostors/volumes and optimized models as separate prototypes. Keep a static alternative.

## Delivery

Local npm workflow, Git source/lockfile checkpoints, no secrets or services, no deployment. Next metadata requests no indexing during prototype work. Drei and GSAP remain deferred until they solve a demonstrated problem.
