# Decision log

Statuses: **Confirmed requirement** comes from the user; **Implemented default** is a reversible engineering choice within the authorized milestone; **Proposed** needs evaluation; **Undecided** has no selection. Implementation does not establish creative approval.

## 2026-11-17 — Milestone 1

| Decision | Status | Rationale / revisit trigger |
| --- | --- | --- |
| Iterative sky portfolio; user controls creative direction | Confirmed requirement | Work in bounded prototypes; consult before major aesthetic decisions |
| Semantic HTML content separated from 3D | Confirmed requirement | Readability, accessibility, and resilience |
| Placeholder professional content only | Confirmed requirement | Await real user-provided details |
| Next.js App Router, TypeScript, Tailwind, R3F, Three.js | Implemented default from preferred stack | Establish actual render boundary now; package cost accepted provisionally, measure before expansion |
| Defer Drei, GSAP, and ScrollTrigger | Implemented default | Add only for concrete helpers/timelines that simplify an approved prototype |
| Native document scrolling and viewport-sized opening section | Implemented default | Minimal touch/keyboard-friendly structure; revisit canvas pinning and camera travel during scroll prototype |
| Static scene with demand rendering and CSS fallback | Implemented default | Establish structure without choosing motion language; no automatic movement in M1 |
| Typed experience IDs; separate content and placement config | Implemented default | Supports later renderer and interaction changes without data rewrites |
| System font, trial gradient, simple faceted balloon shapes | Implemented default, NOT visual approval | Replace through focused art direction work |
| Local development and Git; no deployment | Implemented default within M1 | Hosting is outside the requested milestone |
| Webpack for `dev` and `build` | Implemented default after validation | Turbopack PostCSS worker port binding failed in this environment; Webpack build passes. Revisit after tooling/environment changes |
| Three experience balloons | Initial user idea, open to iteration | Current placeholders test the concept, not final asset choice |
| Shared selection ID with replaceable detail presentation | Proposed | Implement when comparing interaction patterns; avoid premature abstraction |
| Camera zoom vs modal vs side panel | Undecided | Compare motion, accessibility, context, and mobile usability |
| Visual system, environmental asset list, scroll choreography | Undecided | Await references and creative collaboration |

Future changes should append or supersede entries with their reason and approval status. Never relabel a recommendation as approved just because it was documented.
