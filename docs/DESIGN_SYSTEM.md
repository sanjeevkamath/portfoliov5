# Design system — sky study 002

## Confirmed direction

The initial two-column scene/landing-page composition was rejected by the user as too conventional. Aim for an immersive artistic experience, informed by award-winning interactive websites and the user's cloud photograph and hand-drawn journey. The user is open to transitions beyond the sky; no destination theme is selected. Not anime.

The sketch suggests name in clouds → About blimp → experience balloons → airplane/project banner → possible islands → ground/contact. Treat this as a concept, not an approved asset checklist. Three experiences remain the current data configuration.

## Implemented exploration, awaiting review

- Full-screen cinematic blue/ivory sky, warm cloud edges, and atmospheric depth.
- Live oversized Georgia serif name, with an italic second line. This is a typography study, not the cloud-shaped lettering suggested in the sketch.
- HTML layers are minimal: identity mark, motion toggle, chapter dots, quiet progress indicator, and object labels.
- One viewport per major encounter; a shorter horizon closes the current prototype. Native scrolling, no scroll lock or hijacking.
- Cloud artwork moves at a different rate during scroll. Procedural airship and striped balloons drift gently; the browser pointer adds only a small offset.
- Fixed visual world behind normal document sections. No card grid, hero column split, milestone badge, or standalone experience list.
- Mobile keeps the same narrative but scales geometry and stacks object labels. Small text and contrast over varied cloud imagery need a formal accessibility pass before release.

## Working tokens

| Item | Current default |
| --- | --- |
| Foreground ivory | `#fff8e9` |
| Detail-panel ink | `#183743` |
| Sky fallback | `#416e89` |
| Warm paper panel | `#f3eddf` |
| Type | Georgia/Times for display; Arial/Helvetica for labels |
| Side gutter | 1.4–4.5 rem fluid |
| Responsive breakpoint | 700 px |
| Balloon palette | Terracotta, warm gold, desaturated green, ivory panels |

These are **not approved brand decisions**. CSS tokens/layout live in `src/app/globals.css`; object palette and normalized positions live in `scene-config.ts`.

## Interaction experiment

Native transparent HTML buttons align with visible objects. They expose accessible names and receive hover/focus states. Plus indicators change background and rotate over 200 ms; balloon/airship emphasis is an immediate small scale change. All targets are keyboard and touch operable.

Click/tap/Enter/Space opens a native modal dialog with readable placeholder content. The browser manages modal focus confinement and restoration; Escape, close, and a return action dismiss it. Opening a panel pauses background animation. This tests discoverability and return flow only, and does not settle the eventual detail presentation.

## Motion policy

- Gentle sinusoidal bob: amplitude 0.065 world units, frequency 0.45 radians/second.
- Pointer offset: at most 0.04 world units horizontally and 0.025 vertically.
- Native scroll drives placement directly, with no interpolated/smoothed camera travel.
- Pause disables idle drift, pointer offsets, cloud travel, and hover transitions. Reduced-motion preference does the same automatically; still-mode control explains the state.
- Hidden tabs stop continuous rendering. Intro/horizon use demand rendering even when motion is enabled.
- Reduced motion preserves document-relative object positioning, so controls stay aligned while users scroll normally.

## Open decisions

Cloud-sculpted typography vs editorial serif; photographic clouds vs fully stylized 3D; final material language; amount of motion; sound (none added); modal vs side panel vs camera focus; other worlds and their transitions; final copy. Obtain creative review before expanding assets or treating this study as a visual system.
