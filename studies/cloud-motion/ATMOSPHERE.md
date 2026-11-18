# Atmosphere layers

## Current cloud descent

`atmosphere/scroll-cloud.webp` is a transparent WebP encoded from `dist/assets/cloud.png` in Sanjeev’s Cloud Scroll mockup. The source mockup credits its built-in image generation tool and records the prompt in `ASSET-PROMPTS.md`. The same file is shared by the back, left, mirrored right, and foreground layers. The prototype keeps the mockup’s desktop and narrow placements and maps its relative speeds onto the shorter passage to About. Native scroll drives an eased progress value, with faster foreground movement.

## Earlier atmosphere study

Five transparent assets in `atmosphere/` add approximately 215 KB to the study. They were generated as a single sprite sheet with the built-in OpenAI ImageGen tool, cropped along transparent gutters, downscaled, and encoded to WebP with alpha. The approved sky shader and letter artwork supply the rest of the scene.

Two distant cloud shapes and a cirrus streak sit behind the letters. Two soft corner banks sit closer to the viewer. The existing pointer handler sends a common input to the layers, which travel different distances and settle at different rates. Slow idle drift animates image transforms in CSS and does not cause new frames in the WebGL sky. Reduced motion disables the drift and the parallax. Desktop and narrow displays use different layer placements to keep the name readable.

## Generation prompt

Make a single transparent VFX sprite sheet for an airy editorial sky scene, realistic photographic clouds, with exactly five isolated sky elements arranged in two rows. Upper left and upper right: two wide fluffy foreground cumulus clusters seen close up from just above their level, very soft feathered edges, each a low asymmetric bank with distinct fine billows, shallow width-to-height approximately 2:1, one rising slightly at its left end and one rising slightly at its right end. Lower left and lower middle: two small distant fair-weather cumulus silhouettes, very different from each other, one a thin horizontal trail capped by three rolls and one a small peaked single puff, lightly softened by atmospheric perspective, broader than tall. Lower right: one thin long cirrus wisp, delicate feathery almost transparent filament. All shapes have consistent gentle upper-left morning light: cream-white highlights and only pale cool blue-gray shadows. Quiet photographic realism, always bright, no dark gray bases. Plenty of completely transparent padding inside each cell and a generous fully transparent alley between cells and between rows; all five islands must be separate and fully within frame, no overlap, no cutoffs. Transparent alpha throughout empty background. Wide rectangular landscape sheet, no background sky, no horizon line, no caption, no grid, no letters, no border. Do not add other clouds. Maintain realistic structure without stylized outlines, hard edges or oversized cotton balls.
