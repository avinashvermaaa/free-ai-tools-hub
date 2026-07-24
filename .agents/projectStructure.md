# Project Structure

This document outlines the organization and static structure of the Free AI Tools Hub workspace.

```
free-ai-tools-hub/
├── .agents/                 # Workspace agent rules & documentation
│   ├── AGENTS.md            # Behavioral rules (commit message prefixes)
│   ├── Design.md            # UX, design system, and hover tokens
│   └── projectStructure.md  # [This File] Codebase structures
├── public/                  # Static assets (favicons, icons)
├── src/
│   ├── assets/              # Logos and UI assets
│   ├── data/                # Category JSON database files
│   │   ├── audio-music.json
│   │   ├── dev-tools.json
│   │   ├── featured.json
│   │   ├── index.js         # Entrypoint mapping category slugs to JSONs
│   │   └── ...
│   ├── App.tsx              # Main dashboard view, state management, search
│   ├── index.css            # Stylesheets, custom scrollbars, backgrounds
│   ├── main.tsx             # Application bootstrap & DOM mounting
│   ├── ToolCard.tsx         # Reusable card component & types
│   └── vite-env.d.ts        # Vite client declarations
├── index.html               # Main template document
├── package.json             # Package scripts & dependencies
├── tsconfig.json            # TypeScript configuration
└── vite.config.js           # Vite build parameters
```

## Data Mapping Architecture

The `src/data/index.js` file serves as the coordinator:
1. Imports category JSON arrays (each holding objects matching the `Tool` interface).
2. Exports a `toolsData` array binding category names, symbols/icons, slugs, and tool listings.
3. Used inside `App.tsx` for building filter chips and category headings dynamically.
