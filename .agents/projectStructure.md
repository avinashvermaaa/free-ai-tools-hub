# Project Structure

```
free-ai-tools-hub/
├── .agents/                 # Workspace agent rules & documentation
│   ├── AGENTS.md            # Behavioral rules (commit prefixes, build guidelines)
│   ├── Design.md            # UX, design system, and hover tokens
│   ├── newFeatures.md       # Wishlist of planned UI/UX features
│   ├── projectStructure.md  # [This File]
│   └── sessionSummary.md    # Log of upgrades completed in each session
├── public/                  # Static assets
│   ├── manifest.json        # PWA web app manifest
│   ├── sw.js                # Service worker (cache-first assets, network-first nav)
│   └── vite.svg             # App icon
├── src/
│   ├── components/
│   │   ├── BackToTop.tsx    # Floating scroll-to-top button
│   │   ├── Footer.tsx       # Site footer
│   │   ├── HighlightText.tsx# Highlight matched search terms inline
│   │   ├── SubmitDrawer.tsx # Slide-out GitHub issue form drawer
│   │   ├── SurpriseModal.tsx# Random tool picker overlay
│   │   ├── ThemeSelector.tsx# Color theme switcher dots
│   │   ├── Toast.tsx        # Toast notification manager
│   │   └── ToolCard.tsx     # Card/Row component for tool details
│   ├── constants/           # Database constants
│   │   ├── index.ts         # Category slug-to-JSON mapper
│   │   └── *.json           # Category JSON database files
│   ├── hooks/
│   │   └── useTools.ts      # Filtering, search, bookmarks, and sorting logic
│   ├── styles/
│   │   ├── App.css          # Main layout stylesheet
│   │   └── index.css        # CSS variables, themes, scrollbar, animations
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces (Tool, Category)
│   ├── utils/
│   │   ├── eventBus.ts      # Global event dispatcher (triggerToast)
│   │   └── helpers.ts       # Utility and hashing helpers
│   ├── App.tsx              # Main dashboard layout & coordination
│   ├── main.tsx             # App bootstrap, DOM mount, SW registration
│   └── vite-env.d.ts        # Vite client declarations
├── index.html               # HTML template (manifest, SEO meta, theme-color)
├── package.json
├── tsconfig.json
└── vite.config.js
```
