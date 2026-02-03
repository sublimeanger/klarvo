

# SEO Crawl Issues Fix Plan

## Issues Summary from Crawl

Based on the crawl data, there are several categories of issues to fix:

### 1. SOFT_404 Issues (Routes that don't exist)
These pages are returning content but the crawled URL doesn't match actual routes:

| Crawled URL | Correct Route | Fix |
|------------|---------------|-----|
| `/templates/vendor-due-diligence` | `/templates/vendor-due-diligence-questionnaire` | Add redirect |
| `/templates/human-oversight-plan` | `/templates/human-oversight-plan-template` | Add redirect |
| `/tools/high-risk-checker` | `/tools/high-risk-checker-annex-iii` | Add redirect |
| `/templates/ai-literacy-training-tracker` | `/ai-literacy-training-tracker` | Add redirect (wrong path) |
| `/industries/saas-selling-into-eu` | `/industries/saas-ai-act` | Add redirect |

### 2. MISSING_H1 Issues
Pages where the HeroSection uses `<h1>` but it's styled as fragments, or pages that don't use HeroSection at all. Affected pages:
- `/guides` (uses HeroSection - H1 exists)
- `/templates/fria-template` (has H1)
- `/ai-governance-evidence-packs` (has H1)
- `/ai-inventory-software` (uses HeroSection - has H1)
- `/features` (uses HeroSection - has H1)
- `/tools` (uses HeroSection - has H1)
- `/about` (uses HeroSection - has H1)
- `/docs` (has H1)
- `/terms`, `/dpa` (uses LegalLayout - has H1)
- And others

**Analysis**: The HeroSection component already renders an `<h1>` tag (line 166-175 of HeroSection.tsx). The crawler may not be detecting it because the content is split across multiple `<span>` elements with JSX fragments. Need to verify H1 exists in rendered HTML.

### 3. DUPLICATE_TITLE / DUPLICATE_BODY Issues
- `/blog/high-risk-classification-mistakes` - duplicate with another page
- `/blog` - blog hub may have duplicate meta

### 4. THIN_CONTENT Issues
Many pages flagged for thin content. Will add more internal links and expand content sections where applicable.

### 5. INTERNAL_LINK_COUNT_LOW
Add more internal navigation links via `RelatedContent` and `HubNavigation` components.

### 6. IMG_ALT_MISSING_OR_WEAK
Add proper alt text to all images (mostly decorative icons, will need accessible descriptions).

### 7. META_DESC_LENGTH
Ensure meta descriptions are 120-160 characters for optimal display.

---

## Implementation Plan

### Phase 1: Add Redirect Routes for SOFT_404 Issues
Create redirect routes in `App.tsx` to handle old/broken URLs:

```typescript
// Redirect legacy/incorrect URLs to correct routes
<Route path="/templates/vendor-due-diligence" element={<Navigate to="/templates/vendor-due-diligence-questionnaire" replace />} />
<Route path="/templates/human-oversight-plan" element={<Navigate to="/templates/human-oversight-plan-template" replace />} />
<Route path="/tools/high-risk-checker" element={<Navigate to="/tools/high-risk-checker-annex-iii" replace />} />
<Route path="/templates/ai-literacy-training-tracker" element={<Navigate to="/ai-literacy-training-tracker" replace />} />
<Route path="/industries/saas-selling-into-eu" element={<Navigate to="/industries/saas-ai-act" replace />} />
```

### Phase 2: Fix H1 Visibility for SEO
The HeroSection H1 structure is correct but crawlers may struggle with complex JSX. Ensure H1 renders as cohesive text.

For pages using HeroSection with fragments like:
```jsx
<>
  <span>Text</span>
  <br />
  <span>More Text</span>
</>
```

This renders valid H1 HTML. No changes needed - the crawler issue may be a false positive.

For pages with separate hero sections (like `/ai-governance-evidence-packs`), verify H1 exists and is the first heading.

### Phase 3: Fix Duplicate Content Issues
1. **Blog hub (`/blog`)** - Ensure unique title and description
2. **Blog article duplicates** - Review `/blog/high-risk-classification-mistakes` for unique meta

### Phase 4: Add Internal Links
Add `RelatedContent` and `HubNavigation` components to pages with low internal link counts:

**Pages to enhance:**
- `/guides` - Add internal links to all guide pages
- `/tools` - Add links to templates and guides
- `/templates/*` - Add cross-links to related tools and guides
- `/ai-inventory-software` - Add links to template and guide
- `/features` - Add links to product pages
- `/about` - Add links to careers, contact
- `/docs` - Already has good internal linking
- `/terms`, `/dpa` - Add links to other legal pages

### Phase 5: Improve Meta Descriptions
Review and optimize meta descriptions to be 120-160 characters with compelling CTAs.

**Current issues:**
- Some descriptions may be too short (<120 chars)
- Some may exceed 160 chars

### Phase 6: Add Alt Text to Images
Review icons and decorative images to add meaningful alt text:
- Icons: Use descriptive alt like "Check circle icon" or aria-hidden for decorative
- Hero illustrations: Add context-specific alt text

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Add redirect routes for SOFT_404 URLs |
| `src/pages/marketing/GuidesHub.tsx` | Add more internal links, verify H1 |
| `src/pages/marketing/ToolsHub.tsx` | Add more internal links |
| `src/pages/marketing/AIInventorySoftwarePage.tsx` | Add internal links |
| `src/pages/marketing/EvidencePacksPage.tsx` | Verify H1, add internal links |
| `src/pages/marketing/Features.tsx` | Add internal links |
| `src/pages/marketing/About.tsx` | Add internal links |
| `src/pages/marketing/Docs.tsx` | Already good |
| `src/pages/marketing/templates/FRIATemplate.tsx` | Add internal links |
| `src/pages/marketing/templates/VendorDueDiligence.tsx` | Add internal links |
| `src/pages/marketing/templates/AIInventoryTemplate.tsx` | Already has good structure |
| `src/pages/marketing/guides/AILiteracyGuide.tsx` | Add internal links |
| `src/pages/marketing/guides/Article26Guide.tsx` | Add internal links |
| `src/pages/legal/Terms.tsx` | Add internal links to other legal pages |
| `src/pages/legal/DPA.tsx` | Add internal links |
| `src/ssgRoutes.ts` | Ensure all valid routes are listed |
| `src/pages/marketing/Blog.tsx` | Fix potential duplicate issues |

---

## Technical Notes

### Redirect Implementation
Using React Router's `<Navigate>` component with `replace` prop for client-side redirects. For proper SEO, these should also be server-side 301 redirects in the hosting configuration.

### H1 Structure
The current HeroSection implementation is semantically correct. The H1 tag wraps all content and is valid HTML. Crawlers should parse it correctly.

### Internal Link Strategy
- Template pages → Link to related guides, tools, and software pages
- Guide pages → Link to related templates, tools, and software pages
- Tool pages → Link to related templates and guides
- Software pages → Link to templates, guides, and feature pages
- Legal pages → Cross-link between all legal pages

---

## Estimated Impact

| Issue Category | Pages Affected | Expected Fix |
|---------------|----------------|--------------|
| SOFT_404 | 5 | Add redirects |
| MISSING_H1 | ~20 | Already have H1s (verify) |
| INTERNAL_LINK_COUNT_LOW | ~15 | Add RelatedContent sections |
| DUPLICATE_TITLE | 2-3 | Update meta tags |
| THIN_CONTENT | ~10 | Add more content sections |
| META_DESC_LENGTH | ~5 | Optimize descriptions |

