# ServiceSwift Landing Page

A static, offline-ready landing page packaged as plain HTML, CSS, and JavaScript.

## Sections

1. Header / navigation
2. Hero section
3. Interactive Monday brief preview
4. How it works
5. Weekly artifact / deliverables
6. Example prepared account dashboard
7. Early access request form
8. Footer

## Color palette

- Charcoal: `#1E1E1F`
- Dark surface: `#111313`
- Panel: `#242221`
- Card: `#272422`
- Soft card: `#2D2926`
- Rust accent: `#C87A53`
- Taupe: `#8A7E72`
- Linen: `#F4F1EA`
- Green accent: `#9BCB80`

## Font families

No custom font binaries are bundled. The page uses local system font stacks only:

- UI/body: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`
- Display/editorial headings: `Georgia, Times New Roman, serif`
- Metrics/numbers: `SFMono-Regular, Consolas, monospace`

## Animation libraries

No animation libraries are used. Animations are implemented with local CSS keyframes in `styles.css`:

- `fadeUp`
- `scaleIn`
- `slowDrift`
- `subtlePulse`
- `phoneRing`
- `gridPan`
- `gridBreathe`

## Assets

All images and icons are local files under `assets/`.

- Images: `assets/images/`
- Icons: `assets/icons/`
- Fonts: `assets/fonts/` (contains a note; no font binaries referenced)

## Run locally

Open `index.html` directly in a browser. No build step is required.

## Package stats

- File count: `28`
- Total uncompressed size: `62405` bytes
