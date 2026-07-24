# Project Structure

This document outlines the organization and static structure of the Free AI Tools Hub workspace.

```
free-ai-tools-hub/
├── .agents/                 # Workspace agent rules & documentation
│   ├── AGENTS.md            # Behavioral rules (commit message prefixes, build guidelines)
│   ├── Design.md            # UX, design system, and hover tokens
│   ├── projectStructure.md  # [This File] Codebase structures
│   └── sessionSummary.md    # Log of upgrades completed in each session
├── public/                  # Static assets (favicons, icons)
├── src/
│   ├── assets/              # Logos and UI assets
│   ├── components/          # Reusable React components
│   │   ├── Footer.tsx       # Separate, modular site footer
│   │   └── ToolCard.tsx     # Card component showing single tool details
│   ├── constants/           # Database constants
│   │   ├── index.ts         # Entrypoint mapping category slugs to JSONs
│   │   └── *.json           # Category JSON database files
│   ├── hooks/               # Custom React hooks
│   │   └── useTools.ts      # Filtering, search, and state logic for tools
│   ├── styles/              # Layout and theme styles
│   │   ├── App.css          # Main layout stylesheet
│   │   └── index.css        # Centralized CSS variables theme and custom scrollbar
│   ├── types/               # TypeScript interfaces
│   │   └── index.ts         # Codebase-wide TypeScript definitions
│   ├── utils/               # Shared helper functions
│   │   └── helpers.ts       # Utility and hashing helpers
│   ├── App.tsx              # Main dashboard view & routing logic
│   ├── main.tsx             # Application bootstrap & DOM mounting
│   └── vite-env.d.ts        # Vite client declarations
├── index.html               # Main template document
├── package.json             # Package scripts & dependencies
├── tsconfig.json            # TypeScript configuration
└── vite.config.js           # Vite build parameters
```

## Data Mapping Architecture

The `src/constants/index.ts` file serves as the coordinator:
1. Imports category JSON arrays (each holding objects matching the `Tool` interface).
2. Exports a `toolsData` array binding category names, symbols/icons, slugs, and tool listings.
3. Used inside `App.tsx` for building filter chips and category headings dynamically.
