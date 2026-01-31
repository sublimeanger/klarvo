

# Flawless SEO: Migrate to React Router v7 with Native Prerendering

## The Problem

The current setup tried to use `vite-react-ssg` which conflicts with your existing React Router architecture, causing the "Nested Router" error. Your 58 marketing pages need to be fully rendered as static HTML so Google can index them perfectly.

## The Solution

**Migrate to React Router v7** — the only solution that:
- Works natively with your existing `<Routes>` structure (no "Nested Router" errors)
- Generates 58 static `.html` files at build time
- Keeps your protected dashboard routes as SPA (client-rendered)
- Is actively maintained and officially supported

## What Google Will See

| Before (SPA) | After (Prerendered) |
|--------------|---------------------|
| Empty `<div id="root">` | Full HTML content |
| Requires JavaScript execution | Instant indexing |
| "Two-wave" crawling delays | First-crawl indexing |

## Implementation Steps

### Step 1: Update Dependencies

Remove the broken `vite-react-ssg` and install React Router v7:

```text
Remove: vite-react-ssg, react-router-dom
Add: react-router, @react-router/dev
```

### Step 2: Create Route Configuration

Create a new `react-router.config.ts` in the project root:

```typescript
import type { Config } from "@react-router/dev/config";
import { ssgRoutes } from "./src/ssgRoutes";

export default {
  ssr: false,  // Static site, no runtime server needed
  
  async prerender() {
    // Use your existing 58-route manifest
    return ssgRoutes;
  },
} satisfies Config;
```

### Step 3: Update Vite Configuration

Replace the existing Vite config to use React Router's build plugin:

```typescript
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    alias: { "@": "./src" },
  },
});
```

### Step 4: Simplify Entry Point

Update `src/main.tsx` to use the framework's hydration:

```typescript
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

hydrateRoot(
  document.getElementById("root")!,
  <HydratedRouter />
);
```

### Step 5: Convert App.tsx to routes.ts

Create a `src/routes.ts` file that defines routes in object format (React Router v7's preferred structure), keeping all your existing pages and the protected route logic.

---

## What Gets Pre-Rendered (58 Pages)

All routes in `ssgRoutes.ts`:
- `/` → `build/client/index.html`
- `/pricing` → `build/client/pricing/index.html`
- `/templates/fria-template` → `build/client/templates/fria-template/index.html`
- ... (all 58 routes)

## What Stays Client-Rendered (SPA Fallback)

Routes NOT in the manifest get served via `__spa-fallback.html`:
- `/dashboard/*`
- `/ai-systems/*`
- `/settings/*`
- `/onboarding`
- `/auth/callback`

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `package.json` | Update dependencies (system handles this) |
| `react-router.config.ts` | Create new — SSG configuration |
| `vite.config.ts` | Modify — use React Router plugin |
| `src/main.tsx` | Modify — hydration entry point |
| `src/routes.ts` | Create new — route definitions |
| `src/App.tsx` | Simplify — remove Routes, keep providers |
| `src/ssgRoutes.ts` | Keep as-is — already has all 58 paths |

---

## Expected Build Output

After running `npm run build`:

```text
build/client/
├── index.html                              (/)
├── features/index.html                     (/features)
├── pricing/index.html                      (/pricing)
├── templates/
│   ├── index.html                          (/templates)
│   ├── fria-template/index.html            (/templates/fria-template)
│   └── ...
├── guides/
│   ├── eu-ai-act-for-smes/index.html
│   └── ...
├── __spa-fallback.html                     (for /dashboard/*, etc.)
└── assets/
```

---

## SEO Verification

After deployment:
1. Visit any marketing page (e.g., `/pricing`)
2. Right-click → "View Page Source"
3. Confirm you see all text content in the HTML (not just `<div id="root">`)
4. Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Technical Notes

- **React Router v7** is the evolution of both React Router and Remix merged together
- The `prerender()` function runs at build time, not runtime
- Your existing `SEOHead` and `SchemaMarkup` components will work perfectly — they inject meta tags that get baked into the static HTML
- No changes needed to any of your 100+ page components

