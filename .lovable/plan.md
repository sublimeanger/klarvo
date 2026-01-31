
# Static Site Generation (SSG) Implementation Plan

## The Problem

Your Klarvo platform is a **client-side rendered React SPA**. When Google crawls your pages:

1. It receives an almost empty HTML file (just `<div id="root"></div>`)
2. It must execute JavaScript to see your content
3. Google uses "two-wave" indexing—first wave sees empty HTML, second wave (delayed) sees rendered content
4. Many pages may never get properly indexed, or indexing is delayed by weeks

**What Google currently sees when it visits your site:**
```html
<html>
  <head>...</head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**What Google needs to see:**
```html
<html>
  <head>...</head>
  <body>
    <div id="root">
      <h1>EU AI Act Compliance Platform for SMEs</h1>
      <p>Klarvo helps SMEs comply with the EU AI Act...</p>
      <!-- ALL your actual page content pre-rendered -->
    </div>
  </body>
</html>
```

---

## The Solution: Static Site Generation (SSG)

I'll implement **Static Site Generation** using `vite-ssg`, which:
- Pre-renders all 65+ marketing pages to static HTML at build time
- Outputs complete, crawlable HTML files that Google indexes immediately
- Keeps React hydration for interactivity after load
- Requires minimal changes to your existing codebase

---

## Implementation Overview

### Phase 1: Install & Configure vite-ssg

**What happens:**
- Install `vite-ssg` package
- Modify `vite.config.ts` to enable SSG build mode
- Update `src/main.tsx` to use SSG-compatible rendering

**Result:** Build process generates static `.html` files for each route

### Phase 2: Define Routes for Pre-rendering

**What happens:**
- Create a route manifest listing all 65+ marketing pages
- Configure which routes to pre-render (marketing pages only)
- Exclude protected/dynamic app routes from SSG (dashboard, settings, etc.)

**Routes to pre-render (approx. 55 pages):**

| Category | Routes | Count |
|----------|--------|-------|
| Core Marketing | `/`, `/features`, `/pricing`, `/about`, `/contact` | 5 |
| Product Pages | `/eu-ai-act-compliance-software`, `/ai-inventory-software`, `/fria-software` | 3 |
| SEO Hubs | `/tools`, `/guides`, `/compare`, `/industries`, `/templates` | 5 |
| Guide Pages | `/guides/eu-ai-act-for-smes`, `/guides/article-26-deployer-obligations`, etc. | 5 |
| Tool Pages | `/tools/ai-system-definition-checker`, `/tools/high-risk-checker-annex-iii`, etc. | 4 |
| Template Pages | `/templates/ai-inventory-template`, `/templates/fria-template`, etc. | 8 |
| Industry Pages | `/industries/hr-recruitment-ai-act`, `/industries/fintech-credit-ai-act`, etc. | 4 |
| Use Case Pages | `/use-cases/sme`, `/use-cases/enterprise`, `/use-cases/hr`, etc. | 5 |
| Legal Pages | `/terms`, `/privacy`, `/cookies`, `/security`, `/dpa`, `/gdpr`, `/aup` | 7 |
| Resource Pages | `/resources`, `/docs`, `/faq`, `/blog`, `/api`, `/changelog`, `/eu-ai-act` | 7 |
| Company Pages | `/careers`, `/partners`, `/press`, `/status`, `/integrations` | 5 |

**Routes to EXCLUDE (client-only, require auth):**
- `/dashboard`, `/ai-systems/*`, `/vendors/*`, `/evidence/*`
- `/auth/*`, `/onboarding`, `/settings/*`

### Phase 3: Update Build Pipeline

**What happens:**
- Modify `package.json` build script to use SSG mode
- Build outputs go to `dist/` with pre-rendered `.html` files
- Deploy works the same way—just static files

**New build output structure:**
```text
dist/
├── index.html          (pre-rendered homepage)
├── features/
│   └── index.html      (pre-rendered features page)
├── pricing/
│   └── index.html      (pre-rendered pricing page)
├── guides/
│   ├── eu-ai-act-for-smes/
│   │   └── index.html  (pre-rendered guide)
│   └── ...
├── templates/
│   ├── ai-inventory-template/
│   │   └── index.html
│   └── ...
└── assets/             (JS, CSS, images)
```

### Phase 4: Update Sitemap with Correct URLs

**What happens:**
- Audit sitemap URLs to ensure they match actual routes
- Fix any mismatches (e.g., sitemap shows `/solutions/sme` but route is `/use-cases/sme`)
- Ensure all 65+ pages are correctly listed

---

## Technical Changes Required

### Files to Create/Modify

| File | Change |
|------|--------|
| `vite.config.ts` | Add vite-ssg plugin configuration |
| `src/main.tsx` | Convert to SSG-compatible entry point |
| `src/routes.ts` (new) | Create route manifest for pre-rendering |
| `package.json` | Update build scripts |
| `public/sitemap.xml` | Fix URL mismatches to actual routes |

### Key Code Changes Preview

**1. New `src/routes.ts` (route manifest):**
```typescript
export const ssgRoutes = [
  '/',
  '/features',
  '/pricing',
  '/about',
  '/contact',
  '/eu-ai-act',
  '/tools',
  '/guides',
  // ... all 55+ marketing routes
];
```

**2. Updated `src/main.tsx`:**
```typescript
import { ViteSSG } from 'vite-ssg';
import App from './App';
import { ssgRoutes } from './routes';

export const createApp = ViteSSG(
  App,
  { routes: ssgRoutes },
  // optional: setup function
);
```

**3. Updated `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ssgRoutes } from './src/routes';

export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes: () => ssgRoutes,
  },
});
```

---

## What Google Will See After Implementation

**Before (CSR):**
```html
<body>
  <div id="root"></div>
</body>
```

**After (SSG):**
```html
<body>
  <div id="root">
    <header>...</header>
    <main>
      <section>
        <h1>EU AI Act for SMEs</h1>
        <p>The practical roadmap for small and medium businesses...</p>
        <h2>Key Deadlines</h2>
        <div>1 Aug 2024 - EU AI Act entered into force</div>
        <div>2 Feb 2025 - Prohibited practices + AI literacy...</div>
        <!-- ALL visible content pre-rendered -->
      </section>
    </main>
    <footer>...</footer>
  </div>
</body>
```

---

## Expected SEO Outcomes

| Metric | Before (CSR) | After (SSG) |
|--------|--------------|-------------|
| Time to First Index | Days to weeks | Hours to days |
| Content Visibility | Depends on JS execution | 100% visible immediately |
| Crawl Budget Efficiency | Low (Googlebot must wait for JS) | High (instant HTML) |
| AI Overview Eligibility | Limited | Full eligibility |
| Core Web Vitals | Variable | Improved (LCP better) |

---

## Deployment & Verification Steps

After implementation:

1. **Build locally** and inspect `dist/` folder—verify each `.html` file contains full content
2. **Deploy** normally (same process)
3. **Verify with Google Rich Results Test**—paste any URL and confirm content is visible
4. **Submit to Google Search Console**—request re-indexing of priority pages
5. **Monitor** Search Console coverage report for indexing improvements

---

## Timeline

| Phase | Effort |
|-------|--------|
| Phase 1: Install & configure vite-ssg | 1 session |
| Phase 2: Define route manifest | 1 session |
| Phase 3: Update build pipeline | Same session |
| Phase 4: Fix sitemap URLs | Same session |
| **Total** | **1-2 sessions** |

---

## Note on Protected Routes

The authenticated app routes (`/dashboard`, `/ai-systems`, etc.) will continue to work as client-side rendered. Only marketing pages get pre-rendered—this is the optimal approach since:
- Marketing pages need SEO
- App pages require authentication and dynamic data
- SSG only runs at build time, so protected routes stay client-rendered
