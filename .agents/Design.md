# Design System & Interactive Tokens

## Color System & Themes

- **Background**: `#05050a` | **Surface**: `rgba(13,13,22,0.5)` | **Border**: `rgba(255,255,255,0.06)`
- **Accent**: Dynamic via `--accent` CSS variable per theme.
- All colors centralized in `:root` of `index.css`.

### Theme Presets (`data-theme` on `<html>`)
| Theme | Accent |
|-------|--------|
| 💛 Amber Gold (default) | `#facc15` |
| 💜 Cyber Violet | `#a78bfa` |
| 💚 Emerald Mint | `#34d399` |
| 💗 Rose Pink | `#f472b6` |

- **Radial Glows**: Fixed `body::before` pseudo-element with `--radial-glow-1/2` per theme. Prevents scroll repaint.

## Layout

- **Grid/List Toggle**: Grid (`grid-cols-1 md:2 lg:3`) vs. List (`grid-cols-1 gap-3.5`).
- **Category Chips**: `rounded-none`, left-aligned, 3-section (icon | label | count), `var(--accent)` active/hover.
- **Bookmarks Tab**: Dedicated "My Bookmarks" chip with live count.
- **Sort Selector**: Dropdown (Default / Name A-Z / Popularity ★) embedded in search bar.

## Card Interaction

- **No Scaling** on hover. Accent bottom border scales `0→100%`.
- **Entrance**: `.fade-up-in` keyframes staggered by index.
- **Link Arrow**: `↗` fades in on hover.
- **Tags**: CSS variable-driven bg/border/text with hover states.
- **Action Buttons**: Heart bookmark (`p-2`/`w-4`) and copy-link (`p-2`/`w-4`) with toast feedback.
- **Search Highlights**: `<HighlightText />` wraps matches in `var(--accent)/20` background.

## Micro-Animations & UX Polish

- **Toast Notifications**: `.animate-fade-in-up` slide-up overlays via `triggerToast()` from `eventBus.ts`.
- **Stats Counter**: `requestAnimationFrame` interpolation for smooth number transitions.
- **Keyboard**: `/` focuses search, `Esc` clears and blurs.

## PWA

- `manifest.json`: standalone display, `#05050a` background, `#facc15` theme.
- `sw.js`: cache-first for static assets, network-first for navigation, offline fallback to `index.html`.
- Registered in `main.tsx` on window load.
