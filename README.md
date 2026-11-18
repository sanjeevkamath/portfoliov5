# Interactive Sky Portfolio

This repository is paused at the design stage. The next website will start from the Figma landing study after creative review.

- [Natural cloud bank landing mockup](https://www.figma.com/design/Xx7dFB1ezLzieUzWKEISxv?node-id=26-5)
- [Three sky photographs](https://www.figma.com/design/Xx7dFB1ezLzieUzWKEISxv?node-id=26-11)
- [Explore motion study](https://www.figma.com/design/Xx7dFB1ezLzieUzWKEISxv?node-id=23-27)

The earlier website and its documentation are available in Git at commit `9771116`. The replacement portfolio has yet to be implemented.

## Standalone cloud motion study

Open `studies/cloud-motion/index.html` in a browser, or serve the folder from the project root:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory studies/cloud-motion
```

The letters sway at rest and lean away from a nearby pointer. Drag any letter with a mouse or pen and let go to see it spring back. Scroll to descend through four cloud layers into **About**. Reverse the scroll or use **Back to the sky** to return. Touch keeps native scrolling, and reduced motion keeps the scene still with About in the normal page flow.

The opening uses a CSS sky and four layers of one shared [cloud image](studies/cloud-motion/ATMOSPHERE.md) from the Cloud Scroll mockup. The letter artwork retains its baked shading, with a lighter grade and varied softness in this scene. See [the letter asset notes](studies/cloud-motion/LETTERING.md) for the generation prompt. The About introduction is provisional.
