# Interactive Sky Portfolio

An exploratory, scroll-led portfolio world for Sanjeev Kamath. The user owns creative direction. **The current sky study is an art-direction prototype, not an approved final visual system.**

## Run

Node 22+ and npm:

```sh
npm ci
npm run dev
```

Open the printed local URL, normally <http://127.0.0.1:3000>. No credentials or external services are required.

```sh
npm run build
npm run typecheck
npm start
```

Scripts use Webpack because Turbopack's PostCSS worker failed to bind an internal port in this environment. The framework remains Next.js.

## Current study / 002

- Full-screen cloud environment with original generated artwork, a separate transparent foreground layer, and native vertical scrolling.
- Large name composition, an About airship, three striped 3D experience balloons, and an open-ended horizon.
- Small chapter navigation, scroll progress, and a motion toggle.
- Native HTML buttons over decorative 3D objects. Keyboard/touch activation opens a shared native dialog with placeholder content; Escape/close returns focus.
- Reduced motion removes drift, pointer parallax, cloud travel, and CSS transitions. Pausing motion has the same scene-motion effect. Objects still follow document scrolling to stay aligned with HTML controls.
- One dynamically loaded R3F canvas. Continuous rendering only for visible object chapters when motion is enabled; demand rendering otherwise. DPR capped at 1.5.
- The sky artwork and HTML controls remain if the canvas fails.

This is a hybrid 2.5D composition: raster clouds plus real 3D objects, not volumetric clouds. The name is live serif typography; sculpted cloud lettering remains an option. The airship and balloons are procedural geometry studies, not finished models. A dialog is being tested provisionally; camera focus and side panels remain open. GSAP and Drei are not installed.

The later airplane/projects, islands, ground/contact, and possible transitions into other worlds are not implemented. No real employers, achievements, biography, contact information, or project details have been invented.

## Source map

```text
src/app/                       route, metadata, provisional global style
src/components/portfolio/      journey controller and native story dialog
src/components/scene/          lazy canvas, airship, balloon, shared placement config
src/data/                      experience content only
src/hooks/                     reduced-motion and page-visibility policy
src/types/                     content contract
public/images/                 optimized generated cloud assets
```

Read [VISION](docs/VISION.md), [DESIGN_SYSTEM](docs/DESIGN_SYSTEM.md), [ARCHITECTURE](docs/ARCHITECTURE.md), and [DECISIONS](docs/DECISIONS.md). [ASSETS](docs/ASSETS.md) records provenance and full generation prompts; [REFERENCES](docs/REFERENCES.md) records the inspiration study. Future agents must follow [AGENTS.md](AGENTS.md).

## Test the prototype

1. Scroll through the opening, airship, balloons, and horizon. Use chapter dots or Explore for direct navigation.
2. Activate the airship and each balloon. Check the correct placeholder title, focus confinement, Escape, close, and focus restoration.
3. Tab to controls and activate with Enter/Space. Try the skip link.
4. Toggle motion off, then continue scrolling: objects must remain aligned with their controls.
5. Check desktop and 320–390 px widths. Use a physical touch device before approving the interaction.
6. Enable OS reduced motion: no idle drift, pointer parallax, cloud travel, or animated hover transitions.
7. Test unavailable WebGL: the sky and all HTML story controls should remain usable.

See [ROADMAP](docs/ROADMAP.md) for actual verification and remaining limits. This remains local, with no deployment and no-index metadata.
