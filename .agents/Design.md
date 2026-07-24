# Design System & Interactive Tokens

This document records the visual specifications and interactive tokens applied to the Free AI Tools Hub dashboard.

## Color System

- **Background (`--bg`)**: `#05050a` (Deep dark obsidian canvas).
- **Surface (`--surface`)**: `rgba(13, 13, 22, 0.5)` (Glassmorphic surfaces).
- **Accent Color (`--accent`)**: `#facc15` (Warm golden yellow for active states, link arrow hovers, and bottom highlights).
- **Centralized CSS Variables**: Theme configurations are centralized in `:root` of [index.css](file:///g:/desktop%20me/progress/new%20web/new%20cloned/free-ai-tools-hub/src/styles/index.css) to support easy theme swapping (like `--card-bg`, `--card-border`, `--card-tag-text`, etc.).
- **Glow Radial Gradient**: Subtle header area glow `radial-gradient(circle at 50% 0%, rgba(250, 204, 21, 0.04) 0%, transparent 50%)` to highlight the top section without distraction.

## Layout Configuration

- **Grid Alignment**: Standardized 3x3 layout column configuration on large screens (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`).
- **Responsive Width**: Full-width wrapper `max-w-[1600px] w-full px-4 md:px-12` ensuring optimization from mobile phones to ultra-wide displays.
- **Category Chips**: Rectangular chips (`rounded-none`) aligned to the left (`justify-start`), featuring a three-section layout (icon, label, count badge) divided by floating 1px dividers. Inactive state is slate-200 with slate-300 counts, transitioning to brand yellow with black text on hover/active states.

## Card Interaction Specs

- **No Scaling**: Cards remain completely stable in position on hover (no lifting or translation).
- **Link Arrow**: Name headers fade-in a yellow `↗` arrow indicator when the card container is hovered.
- **Accent Line**: Cards render an absolute-positioned bottom line (`h-[2.5px] bg-[var(--accent)]`) that scales from width `0` to `100%` on hover using transition ease-in-out.
- **Tag Hover**: Card tags use modular styles that reference CSS variables:
  - Background: `bg-[var(--card-tag-bg)]` -> hover: `bg-[var(--card-tag-bg-hover)]`
  - Border: `border-[var(--card-tag-border)]` -> hover: `border-[var(--card-tag-border-hover)]`
  - Color: `text-[var(--card-tag-text)]` -> hover: `text-[var(--card-tag-text-hover)]`
- **GitHub Link Hover**: The bottom-right GitHub license label displays a border and highlight referencing card-github CSS variables, with text color transitioning to `var(--accent)`.
