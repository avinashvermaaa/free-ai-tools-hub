# Design System & Interactive Tokens

This document records the visual specifications and interactive tokens applied to the Free AI Tools Hub dashboard.

## Color System

- **Background (`--bg`)**: `#090a0f` (Deep dark canvas).
- **Surface (`--surface`)**: `#12131a` (Slightly lighter surface).
- **Border (`--border`)**: `#262930` (Dark boundary lines).
- **Accent Color**: `#ff0055` (Vibrant pink/rose for active states, link arrows, and bottom highlights).
- **Glow Radial Gradient**: Top radial glow `radial-gradient(circle at 50% -20%, rgba(255, 0, 85, 0.12) 0%, transparent 55%)` to fade-highlight the header area.

## Layout Configuration

- **Grid Alignment**: Standardized 3x3 layout column configuration on large screens (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`).
- **Responsive Width**: Full-width wrapper `max-w-[1600px] w-full px-4 md:px-12` ensuring optimization from mobile phones to ultra-wide displays.

## Card Interaction Specs

- **No Scaling**: Cards remain stable on hover.
- **Link Arrow**: Name headers fade-in a pink `↗` arrow indicator when the card container is hovered.
- **Accent Line**: Cards render an absolute-positioned bottom line (`h-[3px] bg-[#ff0055]`) that scales from width `0` to `100%` on hover using transition ease-in-out.
- **Tag Hover**: Card tags use a dynamic light-green outline state on hover:
  - Background: `bg-emerald-500/10`
  - Border: `border-emerald-500/30`
  - Color: `text-emerald-400`
- **GitHub Link Hover**: The bottom-right GitHub license label displays a thin red/pink border and container highlight:
  - Background: `bg-[#ff0055]/5`
  - Border: `border-[#ff0055]/40`
  - Color: `text-[#ff0055]`
