# Design system — exploratory

## Confirmed constraints

Modern, playful, animated in the eventual experience; not anime. Readable HTML, touch/keyboard access, visible focus, reduced-motion support, and responsive composition are required. The user approves major aesthetics.

## Implemented temporary defaults — not approved design

Tokens are centralized in `src/app/globals.css`:

| Token | Current value | Purpose |
| --- | --- | --- |
| `--sky-top` | `#b9d9ed` | Top of the trial sky gradient |
| `--sky-middle` | `#dcebf1` | Gradient transition |
| `--sky-bottom` | `#f6f3e9` | Lower content background |
| `--ink` | `#233d4b` | Headings, links, focus |
| `--muted` | `#456171` | Supporting text |
| `--page-gutter` | 1.5–5.5 rem, fluid | Responsive side spacing |

- System Arial/Helvetica sans-serif avoids a font download while we explore typography.
- A desktop two-column composition stacks below 700 px; this breakpoint is a prototype default.
- Scene section is at least `100svh`, expanding for content on small screens/large text. The canvas occupies the visual portion of this viewport-sized section. The second section is at least `100svh`.
- Three faceted ellipsoids and small basket blocks establish object placement only. Peach, blue, and cream colors live in scene configuration.
- Text rows are placeholder content, not a proposed final experience component.

## Current interaction and motion

- Native scroll and anchor links; no scroll capture, snapping, smoothing, or animated camera.
- Links have underlines, visible keyboard focus, and at least 44 px height.
- Decorative scene is hidden from assistive technology and receives no pointer interaction. All content is accessible outside it.
- Static demand-rendered canvas. There is no idle movement for any user, including those who prefer reduced motion.

## Decisions requiring a focused design pass

Compare a soft sculpted 3D direction with a simpler graphic 3D direction before investing in models/materials. Define palette/type, depth cues, density, object scale, and mobile composition together.

For experience details, compare camera focus (spatial continuity, more motion/accessibility work), modal (clear containment, needs focus management), and side panel (scene context remains visible, needs a mobile adaptation). None is selected.

When adding motion, define duration/easing and disabled/reduced alternatives. Specify hover, focus-visible, pressed, selected, open, closing, and fallback states before treating an interaction as complete.
