

# Revised SSG Implementation Plan (ESM-Compatible)

## What Happened

The previous attempt used `vite-plugin-prerender`, which internally relies on CommonJS (`require`). Since your project uses `"type": "module"` (ESM), this caused the build to fail.

## The Fix: Use `vite-react-ssg`

`vite-react-ssg` is purpose-built for React + Vite + ESM projects. It:
- Renders each route to static HTML at build time
- Hydrates the React app on the client for interactivity
- Works natively with ES modules
- Requires minimal changes to your existing codebase

---

## Implementation Steps

### Phase 1: Install the Package

Install `vite-react-ssg` as a dev dependency:
```bash
npm install -D vite-react-ssg
```

### Phase 2: Update Entry Point (`src/main.tsx`)

Replace the current React DOM render with the SSG wrapper:

**Before:**
```typescript
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
```

**After:**
```typescript
import { ViteReactSSG } from 'vite-react-ssg';
import App from "./App.tsx";
import "./index.css";
import { ssgRoutes } from './ssgRoutes';

// Convert routes to the format expected by vite-react-ssg
const routes = ssgRoutes.map(path => ({
  path,
  element: <App />,
}));

export const createRoot = ViteReactSSG(
  { routes },
  () => {
    // Optional: setup function for providers, etc.
  }
);
```

### Phase 3: Configure Vite (`vite.config.ts`)

Add SSG options to the Vite configuration:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
}));
```

### Phase 4: Update Build Script (`package.json`)

Update the build script to use the SSG build command:

```json
{
  "scripts": {
    "build": "vite-react-ssg build",
    "build:dev": "vite-react-ssg build --mode development"
  }
}
```

---

## What This Achieves

| Aspect | Result |
|--------|--------|
| **Build Output** | 55+ static `.html` files in `dist/` |
| **Google Visibility** | 100% content visible without JS |
| **Interactivity** | Full React hydration after load |
| **ESM Compatibility** | Native support, no CommonJS issues |

---

## Files to Modify

| File | Change |
|------|--------|
| `package.json` | Add `vite-react-ssg`, update build scripts |
| `src/main.tsx` | Switch to `ViteReactSSG` entry point |
| `vite.config.ts` | Add `ssgOptions` configuration |

---

## Build Output Structure (After Implementation)

```text
dist/
├── index.html                    (pre-rendered homepage)
├── features/index.html           (pre-rendered)
├── pricing/index.html            (pre-rendered)
├── guides/
│   ├── eu-ai-act-for-smes/index.html
│   ├── article-26-deployer-obligations/index.html
│   └── ...
├── templates/
│   ├── ai-inventory-template/index.html
│   └── ...
├── industries/
│   ├── hr-recruitment-ai-act/index.html
│   └── ...
└── assets/                       (JS, CSS, images)
```

---

## Important Note: Route Handling

The current app uses `react-router-dom` with a single `<App />` component that handles all routing internally. `vite-react-ssg` expects explicit route definitions. We have two approaches:

**Option A (Simpler):** Keep the current App structure but tell SSG to render the same App component for all routes — it will capture whatever content renders for each path.

**Option B (More Control):** Refactor routes to be explicit exports that `vite-react-ssg` can consume directly.

I recommend **Option A** for minimal disruption while still achieving full prerendering.

---

## Timeline

| Phase | Effort |
|-------|--------|
| Install package | Immediate |
| Update main.tsx | 1 session |
| Update vite.config.ts | Same session |
| Update package.json scripts | Same session |
| **Total** | **1 session** |

