# Roadmap

## Milestone 1 — Foundation

Scope: local application, documentation, gradient, viewport scene, vertical scroll, simple geometry, placeholder content, build verification.

- [x] Inspect directory (empty; no prior Git repository or source).
- [x] Initialize Next.js, TypeScript, Tailwind, R3F, and Three.js.
- [x] Establish modular source structure and all seven requested documents.
- [x] Build provisional sky and native vertical journey with three configurable objects.
- [x] Keep readable experience placeholders outside the canvas.
- [x] Provide static fallback and no automatic motion.
- [x] Verify production build and standalone type check.
- [x] Verify local server and representative browser behavior.
- [x] Record an initial Git checkpoint on `main`.

### Verification record

Verified 2026-11-17:

- `npm run build`: passed with Webpack; route `/` statically prerendered.
- `npm run typecheck`: passed.
- Local development server started and returned HTTP 200.
- Browser: three rendered 3D placeholders at desktop 1280 × 800 and mobile 390 × 844; HTML content remained readable at 320 × 740, with no horizontal overflow at either mobile width.
- Skip and return links activated using Enter; Tab moved from exploration to return navigation; visible solid focus outline confirmed.
- Browser console had no errors or warnings during the observed scene check.
- Source review: static demand-rendering and no automatic animation; CSS fallback and scene error boundary present.

Limits: forced WebGL failure, OS reduced-motion emulation, screen-reader announcements, physical touch devices, and sustained GPU performance were not runtime-tested. The prototype currently has no movement under any motion preference. Turbopack failed due to internal port binding; scripts use the successfully verified Webpack compiler. Temporary validation server is stopped after checks; use `npm run dev` to start it again.

## Proposed subsequent milestones — order may change with user direction

### 2. Visual direction and scene study

Review user references, compare a small number of 3D directions, and explore palette/type/composition. Use Figma or Spline if useful. Prototype one balloon and a limited depth study; agree on mobile simplification and reduced-motion direction before expanding.

Exit: documented visual decisions and a small approved scene prototype, not a large asset collection.

### 3. One experience interaction

Compare camera focus, modal, and side-panel approaches. Implement one selected approach with HTML/keyboard/touch alternatives, close behavior, focus restoration, and reduced motion. Use one placeholder experience first.

Exit: an approved interaction model and a reusable selection/detail contract.

### 4. Vertical journey and environment

Prototype scroll depth, parallax, object placement, and transitions using the approved direction. Evaluate GSAP/ScrollTrigger only if coordination needs justify them. Measure mobile performance and test fallbacks before adding more scenery.

Exit: a small coherent journey with motion controls and documented performance constraints.

### 5. Content and release preparation

Integrate user-provided experience/project content, complete responsive and accessibility checks, audit asset licenses, profile on real devices, choose hosting, and remove prototype copy/no-index metadata when ready.

Exit: reviewed portfolio ready for an explicitly authorized release.
