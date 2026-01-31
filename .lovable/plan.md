
# Functionality Improvement Plan: Marketing Site Fixes

## Executive Summary

The marketing site has significant functionality gaps where interactive elements (buttons, forms, links, navigation) either do nothing or lead nowhere. This creates a poor user experience and damages trust, especially critical for a compliance product.

## Issues Identified

### Priority 1: CRITICAL — Navigation That Leads Nowhere

| Issue | Location | Impact |
|-------|----------|--------|
| **Product dropdown dead anchors** | `MarketingHeader.tsx` lines 7-33 | Links like `/features#inventory`, `/features#classification` point to non-existent section IDs on the Features page |
| **Blog posts have no detail pages** | `Blog.tsx` lines 38-111 | 9 blog posts are listed but clicking them does nothing — no article detail pages exist |
| **Blog cards don't link anywhere** | `Blog.tsx` lines 352-388 | Cards are `<Card>` components with no `<Link>` wrapper or `onClick` |

### Priority 2: HIGH — Forms That Don't Submit

| Issue | Location | Impact |
|-------|----------|--------|
| **Footer newsletter** | `MarketingFooter.tsx` line 89 | `onSubmit={(e) => e.preventDefault()}` — does nothing |
| **Blog sidebar newsletter** | `Blog.tsx` lines 316-324 | No form wrapper, no handlers |
| **Resources newsletter** | `Resources.tsx` lines 318-328 | No form wrapper, no handlers |
| **Status page subscription** | `Status.tsx` lines 236-246 | No form wrapper, no handlers |
| **Changelog subscription** | `Changelog.tsx` lines 200-210 | No form wrapper, no handlers |

### Priority 3: HIGH — Buttons That Do Nothing

| Issue | Location | Impact |
|-------|----------|--------|
| **Press page logo downloads** | `Press.tsx` lines 117-125, 144-152 | PNG/SVG buttons have no `onClick` or `href` |
| **Careers Apply buttons** | `Careers.tsx` line 104 | "Apply" buttons do nothing |
| **Resources webinar registration** | `Resources.tsx` line 260 | "Register" button is static |
| **Resources featured content** | `Resources.tsx` lines 215-218 | "Read"/"Download" buttons do nothing |
| **Templates download buttons** | `Templates.tsx` multiple locations | Download buttons throughout have no logic |
| **Blog "Read Article" button** | `Blog.tsx` line 234 | Featured post button does nothing |
| **Blog "Load More" button** | `Blog.tsx` lines 398-401 | Static button, no pagination |

### Priority 4: MEDIUM — Content That Implies More Than Exists

| Issue | Location | Impact |
|-------|----------|--------|
| **Docs video tutorials** | `Docs.tsx` lines 159-169 | "Watch videos" button goes nowhere, video cards have no links |
| **Resources category cards** | `Resources.tsx` lines 159-175 | Category cards (12 guides, 8 templates, etc.) have no destinations |
| **Resources recent articles** | `Resources.tsx` lines 278-291 | Article cards are clickable-styled but have no links |

---

## Implementation Plan

### Phase 1: Fix Navigation Dead Ends (Critical)

#### 1.1 Add anchor IDs to Features page

**File:** `src/pages/marketing/Features.tsx`

Add `id` attributes to match the Product dropdown links:
- `id="inventory"` on the AI System Inventory section
- `id="classification"` on the Classification Engine section
- `id="evidence"` on the Evidence Vault section
- `id="controls"` on the Control Library section
- `id="exports"` on the Export Packs section

Wrap the `FeatureGrid` and `FeatureShowcase` components in `<section>` tags with appropriate IDs, or add IDs directly to existing section elements.

#### 1.2 Option A: Create blog article pages (Full Implementation)

Create a dynamic blog article page similar to how `DocsArticle.tsx` works:

**New File:** `src/pages/marketing/BlogArticle.tsx`
- Accept `:slug` param from route
- Look up article content from a `blogContent.ts` file (similar to `docsContent.ts`)
- Render markdown content with SEO metadata

**New File:** `src/lib/blogContent.ts`
- Store blog article content with full markdown

**Update:** `src/App.tsx`
- Add route: `<Route path="/blog/:slug" element={<BlogArticle />} />`

**Update:** `src/pages/marketing/Blog.tsx`
- Wrap blog cards in `<Link to={`/blog/${post.slug}`}>` components
- Add `href` to featured post "Read Article" button

#### 1.2 Option B: Remove non-functional elements (Quick Fix)

If full blog implementation is not desired now:
- Convert blog cards to static "Coming Soon" badges
- Remove the clickable styling that implies interactivity
- Update featured post button to link to `/resources` instead

**Recommendation:** Implement Option A to avoid content that misleads visitors.

---

### Phase 2: Make Forms Functional

#### 2.1 Create newsletter subscription handler

Create a reusable newsletter component:

**New File:** `src/components/marketing/NewsletterForm.tsx`
```text
- Accept variant prop (inline/stacked/compact)
- Local state for email input
- onSubmit handler that:
  1. Validates email format
  2. Stores in Lovable Cloud database (new `newsletter_subscribers` table)
  3. Shows success toast
  4. Optionally integrates with email service later
```

**Database migration:** Create `newsletter_subscribers` table
- `id`, `email`, `source` (which page), `subscribed_at`, `status`

**Update the following files to use the new component:**
- `MarketingFooter.tsx` — replace inline form
- `Blog.tsx` — replace sidebar form
- `Resources.tsx` — replace newsletter section
- `Status.tsx` — replace subscription section
- `Changelog.tsx` — replace subscription section

#### 2.2 Create webinar registration modal

**New File:** `src/components/marketing/WebinarRegistrationModal.tsx`
- Modal with name, email, company fields
- Store in `webinar_registrations` table
- Success confirmation

**Update:** `src/pages/marketing/Resources.tsx`
- Replace static "Register" button with modal trigger

---

### Phase 3: Make Buttons Functional

#### 3.1 Press page downloads

**Update:** `src/pages/marketing/Press.tsx`
- Add actual logo files to `/public/press/` directory:
  - `klarvo-logo.png`
  - `klarvo-logo.svg`
  - `klarvo-logo-white.png`
  - `klarvo-logo-white.svg`
- Update buttons to be `<a href="/press/klarvo-logo.png" download>` elements

#### 3.2 Careers apply buttons

**Update:** `src/pages/marketing/Careers.tsx`
- Change Apply button to link to `mailto:careers@klarvo.io?subject=Application: ${position.title}`
- Or create a simple application modal that collects name, email, LinkedIn, and resume upload

#### 3.3 Template downloads

For template pages that promise downloads, implement one of:
- **Option A:** Create actual downloadable files (PDF/Excel templates) in `/public/templates/`
- **Option B:** Gate behind email capture (collect email, then reveal download link)
- **Option C:** Redirect to signup with messaging "Access templates in your free account"

**Update affected files:**
- `Templates.tsx`
- `AIInventoryTemplate.tsx`
- `FRIATemplate.tsx`
- Other template detail pages

---

### Phase 4: Remove or Clarify Incomplete Content

#### 4.1 Video tutorials section

**Update:** `src/pages/marketing/Docs.tsx`
- Either: Add real video embed URLs (YouTube/Loom) to `videoTutorials` array
- Or: Remove video section entirely until videos are produced
- Or: Replace with "Coming Soon" messaging

#### 4.2 Resources page category cards

**Update:** `src/pages/marketing/Resources.tsx`
- Make category cards link to filtered views or hub pages:
  - "EU AI Act Guides" → `/guides`
  - "Templates & Checklists" → `/templates`
  - "Webinars & Videos" → section anchor on same page
  - "News & Updates" → `/blog`

#### 4.3 Resources recent articles

- Either link to blog posts (once blog articles exist)
- Or link to existing guide pages that cover the same topics
- Or remove the section

---

## Technical Implementation Order

```text
Day 1: Phase 1.1 (anchor IDs) + Phase 3.1 (press downloads)
       - Quick wins, minimal code changes

Day 2: Phase 2.1 (newsletter form + database)
       - Create reusable component
       - Database migration
       - Replace 5 form instances

Day 3: Phase 1.2 Option A (blog system)
       - Create BlogArticle.tsx
       - Create blogContent.ts with 2-3 sample articles
       - Update routing and links

Day 4: Phase 3.2 + 3.3 (careers + templates)
       - Implement apply mailto or modal
       - Decide template download strategy
       - Create download files or email gates

Day 5: Phase 4 (cleanup)
       - Fix or remove video tutorials
       - Link resource category cards
       - Final QA pass
```

---

## Database Changes Required

```sql
-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL, -- e.g., 'footer', 'blog', 'resources'
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'active' -- 'active', 'unsubscribed'
);

-- RLS: Public insert, admin read
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public newsletter signup" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);
```

---

## Files Affected Summary

| Action | Files |
|--------|-------|
| **Create** | `NewsletterForm.tsx`, `WebinarRegistrationModal.tsx`, `BlogArticle.tsx`, `blogContent.ts`, press assets |
| **Modify** | `Features.tsx`, `Blog.tsx`, `MarketingFooter.tsx`, `Resources.tsx`, `Status.tsx`, `Changelog.tsx`, `Press.tsx`, `Careers.tsx`, `Templates.tsx`, `AIInventoryTemplate.tsx`, `Docs.tsx`, `App.tsx` |
| **Database** | Add `newsletter_subscribers` table |

---

## Success Criteria

1. Every link in navigation dropdowns leads to a working destination
2. Every button that implies an action performs that action (or clearly indicates "coming soon")
3. All newsletter forms store subscriptions in the database
4. Blog posts are either fully implemented or clearly marked as upcoming
5. No user clicks result in zero response
