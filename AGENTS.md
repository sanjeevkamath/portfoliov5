# Working on Interactive Sky Portfolio

The user is the creative director and architect. Collaborate; do not silently choose a final aesthetic or expand the milestone.

## Collaboration cadence — explicit user correction

The user asked for more creative control and shorter work chunks after study 002. Work on one bounded visual or interaction change at a time. Present meaningful options before implementing it, and return the concrete result for feedback before moving to another creative decision. Do not bundle typography, environments, models, and interaction design into one autonomous sprint. Complete routine verification of the current chunk, then hand direction back to the user. Existing study 002 choices remain unapproved.

## Read before changing code

- Read `README.md`, `docs/VISION.md`, and `docs/DECISIONS.md` for scope and decision status.
- Read `docs/ARCHITECTURE.md` for structural changes, `docs/DESIGN_SYSTEM.md` for UI/motion changes, and `docs/ROADMAP.md` for milestone work.
- Preserve confirmed requirements and approved decisions. **Implemented defaults are not design approval.** Present meaningful alternatives and trade-offs before major visual or architectural changes.
- Make routine implementation decisions independently. Finish the authorized milestone before suggesting additional implementation.

## Engineering rules

- Keep readable portfolio content in semantic HTML, independent of WebGL.
- Keep scene rendering, motion, interaction state, and portfolio data separate. Use small reusable components; avoid speculative frameworks and abstractions.
- Configure experience objects by stable experience ID. Do not fabricate employers, dates, achievements, or metrics.
- Maintain keyboard/touch alternatives, visible focus, reduced-motion behavior, responsive layouts, and a WebGL fallback. Decorative meshes must not become the only route to content.
- Before adding motion, define its reduced-motion alternative and whether a pause control is needed. Avoid unnecessary continuous rendering.
- Use licensed assets only. Record source, author, license, and attribution before adding third-party assets; do not download large collections without a specific need.
- Document significant changes and update decision statuses accurately. Proposals remain proposals until approved.
- Use incremental Git commits. Never overwrite existing user changes or publish/deploy without task authorization.

## Validation

Use `npm ci` for a clean install, then `npm run build` and `npm run typecheck`. Keep the lockfile. Check changed user flows in a browser at desktop and narrow mobile sizes when available. Include keyboard, reduced-motion, and fallback checks when those behaviors change. Report verification limits honestly. Avoid tests that merely duplicate trivial presentation code.

## Current scope

Milestone 1 is complete. The user rejected its conventional website composition. Sky study 002 explores an immersive full-screen world, guided by their cloud reference, narrative sketch, and award-site inspiration. Read `docs/REFERENCES.md` and `docs/ASSETS.md` when changing visuals. No approved final palette, typeface, 3D style, camera path, detail interaction, or next-world theme exists yet. The current dialog and serif title are experiments. No Figma/Spline document or external hosting is configured.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
