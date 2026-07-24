# Design System & Interactive Tokens

This document records the visual specifications and interactive tokens applied to the Free AI Tools Hub dashboard.

## Color System & Themes

- **Background (`--bg`)**: `#05050a` (Deep dark obsidian canvas).
- **Surface (`--surface`)**: `rgba(13, 13, 22, 0.5)` (Glassmorphic surfaces).
- **Border (`--border`)**: `rgba(255, 255, 255, 0.06)` (Dark boundary lines).
- **Active Color Accent (`--accent`)**: Dynamic theme-dependent highlight color.
- **Centralized CSS Variables**: All colors (card backgrounds, text, tags, GitHub stats, Category section headers) are centralized in `:root` of [index.css](file:///g:/desktop%20me/progress/new%20web/new%20cloned/free-ai-tools-hub/src/styles/index.css) to support easy theme swapping.

### Dynamic Theme Variations
Themes are applied to the `html` element using the `data-theme` attribute (controlled by the `<ThemeSelector />` component):
1.  💛 **Amber Gold** (`data-theme="yellow"`, default): `--accent: #facc15`
2.  💜 **Cyber Violet** (`data-theme="purple"`): `--accent: #a78bfa`
3.  💚 **Emerald Mint** (`data-theme="green"`): `--accent: #34d399`
4.  💗 **Rose Pink** (`data-theme="pink"`): `--accent: #f472b6`

- **Performance Radial Glows**: Offloaded the radial background glows to a fixed `body::before` pseudo-element using dynamic variables (`--radial-glow-1`, `--radial-glow-2`) that update per-theme. This prevents browser repaints on scroll events, guaranteeing butter-smooth scrolling.

## Layout Configuration

- **Grid vs List Toggle**: Controlled via a toggle button directly inside the search bar:
  - **Grid View**: Classic 3-column layouts on large viewports (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`).
  - **List View**: Dense, single-column rows (`grid-cols-1 gap-3.5`) for fast directory scanning.
- **Category Chips**: Rectangular chips (`rounded-none`) aligned to the left (`justify-start`), featuring a three-section layout (icon, label, count badge) divided by floating `w-[1px] h-3 bg-white/15` dividers. Active and hover states adapt to `var(--accent)` with black text (`text-black`).

## Card Interaction Specs

- **No Scaling**: Cards remain completely stable in position on hover (no lifting or translation).
- **Entrance Animation**: Cards transition on load using custom keyframes (`.fade-up-in`) staggered by calculated inline delay styles (`animationDelay`).
- **Link Arrow**: Name headers fade-in a theme-accented `↗` arrow indicator when the card container is hovered.
- **Accent Line**: Cards render an absolute bottom border (`h-[2px] bg-[var(--accent)]`) that scales from width `0` to `100%` on hover.
- **Tag Hover**: Card tags use modular styles referencing CSS variables:
  - Background: `bg-[var(--card-tag-bg)]` -> hover: `bg-[var(--card-tag-bg-hover)]`
  - Border: `border-[var(--card-tag-border)]` -> hover: `border-[var(--card-tag-border-hover)]`
  - Color: `text-[var(--card-tag-text)]` -> hover: `text-[var(--accent)]`
- **GitHub Link Hover**: The bottom-right GitHub license label displays a border and highlight referencing card-github CSS variables, with text color transitioning to `var(--accent)`.
