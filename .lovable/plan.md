

# Complete SSG Implementation for Marketing Pages

## Current State

The SSG infrastructure is set up but not fully activated:
- `vite-react-ssg` is installed (v0.8.9)
- `src/main.tsx` uses `ViteReactSSG` entry point
- `src/ssgRoutes.ts` defines 55 marketing routes
- `vite.config.ts` has `ssgOptions` configured
- `BrowserRouter` was removed from `App.tsx` (vite-react-ssg provides its own router)

## What's Missing

The build scripts still use standard Vite build commands instead of the SSG-specific commands.

## Implementation Plan

### Step 1: Update Build Scripts in `package.json`

Change the build commands to use the SSG build process:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite-react-ssg build",
    "build:dev": "vite-react-ssg build --mode development",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

### Step 2: Add Auth Pages to SSG Routes (Optional but Recommended)

While auth pages have `noindex={true}`, pre-rendering them still improves user experience (faster initial load). Add to `ssgRoutes.ts`:

```typescript
// Auth pages (pre-rendered for faster load, but noindex for SEO)
'/auth/login',
'/auth/signup',
'/auth/forgot-password',
```

### Step 3: Verify Route Coverage

Cross-check all marketing routes in `App.tsx` are in `ssgRoutes.ts`:

**Currently in App.tsx but NOT in ssgRoutes.ts:**
- `/docs/:slug` - Dynamic route, cannot be pre-rendered without knowing all slugs

**Decision:** For dynamic routes like `/docs/:slug`, we'll need to either:
- List all known slugs explicitly in the manifest
- Or leave them as client-rendered (acceptable since the hub `/docs` is pre-rendered)

---

## Technical Details

### How vite-react-ssg Works

1. At **build time**, it renders each route in the manifest to static HTML
2. The resulting `dist/` folder contains `.html` files for each route
3. At **runtime**, React hydrates the static HTML for interactivity
4. Protected routes (not in manifest) remain client-side rendered

### What Gets Pre-Rendered (55 Routes)

| Category | Count | Example Routes |
|----------|-------|----------------|
| Core Marketing | 5 | `/`, `/features`, `/pricing` |
| Product Pages | 3 | `/eu-ai-act-compliance-software` |
| SEO Hubs | 5 | `/templates`, `/tools`, `/guides` |
| Guide Pages | 5 | `/guides/eu-ai-act-for-smes` |
| Tool Pages | 4 | `/tools/ai-system-definition-checker` |
| Template Pages | 8 | `/templates/fria-template` |
| Industry Pages | 4 | `/industries/hr-recruitment-ai-act` |
| Use Case Pages | 5 | `/use-cases/sme` |
| Legal Pages | 7 | `/terms`, `/privacy`, `/cookies` |
| Resource Pages | 7 | `/docs`, `/faq`, `/blog` |
| Company Pages | 5 | `/careers`, `/partners`, `/press` |
| **Total** | **58** | (after adding auth pages) |

### What Stays Client-Rendered

| Category | Reason |
|----------|--------|
| `/dashboard/*` | Requires authentication |
| `/ai-systems/*` | Dynamic content, auth required |
| `/vendors/*` | Dynamic content, auth required |
| `/settings/*` | Auth required |
| `/onboarding` | Auth required |
| `/auth/callback` | OAuth callback, must be dynamic |

---

## Files to Modify

| File | Change |
|------|--------|
| `package.json` | Update build scripts to use `vite-react-ssg build` |
| `src/ssgRoutes.ts` | Add auth pages (login, signup, forgot-password) |

---

## Expected Outcome

After implementation:

1. **Build output** will contain 58 static HTML files
2. **Google** will see fully-rendered content on first crawl
3. **Protected routes** continue to work normally (client-rendered)
4. **User experience** improves with faster initial page loads

### Verification Steps

1. Run `npm run build`
2. Check `dist/` folder for `.html` files in each route directory
3. Open any `.html` file to verify full content is present
4. Use Google Rich Results Test to confirm crawlability

