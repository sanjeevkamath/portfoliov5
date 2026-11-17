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

## 2026-11-17 — Sky study 002, after user feedback

This update supersedes the Milestone 1 visual/layout defaults while preserving the underlying framework, data separation, and accessibility requirements.

| Decision | Status | Rationale / revisit trigger |
| --- | --- | --- |
| Reject conventional landing-page composition; pursue an immersive artistic world | Confirmed user direction | User explicitly described M1 as too website-like |
| Use award-winning websites as inspiration, with original composition/assets | Confirmed user direction | Reference principles, not copied pages/assets; no award guarantees |
| Explore transitions into other themes | Confirmed openness, destination undecided | Do not choose a forest/ocean/space/ground world without a focused creative decision |
| Use supplied cloud photo and hand-drawn narrative as references | Confirmed input | Sketch is exploratory; not authorization to build every proposed chapter now |
| Full-screen raster cloud world + one real-time 3D canvas | Implemented prototype choice | High visual impact with small assets; limited camera freedom vs volumetric clouds |
| Name → About blimp → experience balloons → unresolved horizon | Implemented bounded exploration | Enough narrative to test immersion without inventing projects/contact details |
| Editorial serif lettering and warm photographic clouds | Implemented visual experiment, not approved | Cloud-sculpted name and stylized alternatives remain possible |
| Native object buttons and shared selection-driven dialog | Implemented interaction experiment, not approved final pattern | Tests discovery, close, focus restoration; can be replaced by camera focus/side panel |
| Drift/parallax, pause toggle, reduced-motion alternative | Implemented prototype choice | Adds atmosphere while preserving native scrolling and a static mode |
| Procedural striped balloons and airship | Implemented geometry studies | Not final production models |
| Original generated cloud assets, no new dependencies | Implemented technical choice | Provenance/prompts in ASSETS.md; defer volumetrics and timeline libraries |
| Shorter, user-directed work chunks | Confirmed explicit user correction | Present options, change one bounded part, return for feedback before advancing creative scope |
