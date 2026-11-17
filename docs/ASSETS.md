# Asset provenance — sky study 002

Both cloud assets were created with the built-in imagegen tool on 2026-11-17 for this project. They are original generated outputs, not downloads from reference websites. No third-party models, photographs, font files, or texture collections are included. No third-party attribution requirement has been identified for these generated outputs; this is a provenance record, not a claim of exclusive copyright ownership.

| File | Role | Size | Details |
| --- | --- | --- | --- |
| `public/images/cloud-world.webp` | Cloud world background | 136,868 bytes | 1672 × 941, RGB |
| `public/images/cloud-veil.webp` | Foreground cloud bank | 150,896 bytes | 1672 × 941, RGBA, alpha preserved |

Tool: built-in `image_gen.imagegen`; no CLI/API fallback. Generated PNGs were converted to WebP with Sharp at quality 88, alpha quality 95 for the veil. PNG originals remain in the session's generated-images directory; runtime uses only project-local WebPs. User references were inspected locally and not copied into the published asset directory. Geometry and shaders were authored in the repository.

## Final background prompt

Use case: stylized-concept. Asset type: ultra-wide full-screen cloud environment background for an artful interactive portfolio, not a website mockup. Create an original cinematic aerial cloudscape viewed from within the atmosphere: deep luminous cerulean and desaturated steel blue sky in the upper half, monumental beautifully detailed ivory cumulus clouds rising from lower left and lower right, a central corridor of open blue sky, distant layers of mist and cloud ocean far below. Clouds have physically convincing fine billowing texture, soft warm late-afternoon highlights and deep powder-blue shadows, dreamy analog photographic character, extraordinary scale, subtle film grain. Composition 16:9 wide landscape, asymmetrical massing, cloud mountain largest at lower right with bright sunlit rim, smaller left cloud pillar, substantial open sky at central upper third for later HTML typography. No sun disc, no ground, no mountains, no buildings, no balloons, no people, no letters, no text, no interface, no logos. This is a rich fine-art sky world, never cartoon or anime. Edge-to-edge image.

## Final foreground prompt

Use case: stylized-concept. Asset type: transparent foreground cloud layer for an interactive cinematic sky environment. A single monumental horizontal bank of realistic soft cumulus clouds across the lower half of a wide 16:9 frame, rising asymmetrically on the left to 60 percent of frame height, the right reaching 40 percent, center low 25 percent. Fluffy detailed sculpted ivory cloud billows, subtle warm afternoon highlights from upper left, powder blue shadowed lower volume. Cloud bank fills and extends past entire bottom and both side edges. Upper half empty completely transparent alpha. Feathered fine vapor edges against genuine transparency. No sky background, no ground, no text, no objects, no checkerboard painted in. Photographic cinematic realism with dreamy soft atmosphere, not cartoon. This is only a foreground cloud bank cutout with alpha.
