

# Navigation Cleanup & Dead Link Fix Plan

## Problem Summary

The navigation contains multiple broken links and routing inconsistencies that damage user trust and SEO. Additionally, the "Product Features" mega-menu strategy of linking everything to `/features#anchor` is suboptimal.

---

## Phase 1: Fix All Dead Links

### 1.1 Industry Link Mismatches (Header + Footer + IndustriesHub)

| Link Text | Current Broken URL | Correct URL |
|-----------|-------------------|-------------|
| Financial Services | `/industries/fintech-ai-act` | `/industries/fintech-credit-ai-act` |
| Education | `/industries/education-ai-act` | `/industries/education-edtech-ai-act` |
| Healthcare | `/industries/healthcare-ai-act` | `/use-cases/healthcare` (existing page) |
| SaaS (in IndustriesHub) | `/industries/saas-selling-into-eu` | `/industries/saas-ai-act` |

**Files to update:**
- `src/components/marketing/MarketingHeader.tsx` (lines 42-48)
- `src/components/marketing/MarketingFooter.tsx` (lines 27-33)
- `src/pages/marketing/IndustriesHub.tsx` (line 36)

### 1.2 Remove `/samples` Dead Link

Since no Samples page exists, replace with existing content:
- Change "Sample Exports" in Resources dropdown → link to `/exports` (app page) or remove entirely
- Change "See Sample Exports" link in Product mega-menu → "See All Industries" linking to `/industries`

**Files to update:**
- `src/components/marketing/MarketingHeader.tsx` (lines 62, 257-264)

---

## Phase 2: Improve Product Features Navigation Strategy

### Current Problem
All 5 product feature links go to `/features#anchor`, but:
- `#controls` and `#exports` anchors are empty placeholder `<div>` tags
- Users clicking "Export Packs" land on a section about "Built-In Compliance Intelligence" (confusing)

### Recommended Solution: Link to BOFU Product Pages

You have dedicated product pages that already exist:
- `/ai-inventory-software` — AI System Inventory
- `/eu-ai-act-compliance-software` — Risk Classification (this is essentially the classification page)
- `/product/evidence-vault` — Evidence Vault
- `/fria-software` — FRIA/Exports

**Updated Product Features Links:**

| Feature | New Destination |
|---------|-----------------|
| AI System Inventory | `/ai-inventory-software` |
| Risk Classification | `/eu-ai-act-compliance-software` |
| Evidence Vault | `/product/evidence-vault` |
| Export Packs | `/features#exports` (keep, but add content to that section) |
| Control Library | `/features#controls` (keep, but add content to that section) |

Alternatively, we can add proper content sections to the Features page for Controls and Exports.

---

## Phase 3: Files to Modify

| File | Changes |
|------|---------|
| `src/components/marketing/MarketingHeader.tsx` | Fix industry URLs, remove `/samples`, optionally update product feature destinations |
| `src/components/marketing/MarketingFooter.tsx` | Fix industry URLs |
| `src/pages/marketing/IndustriesHub.tsx` | Fix SaaS and Healthcare URLs |

---

## Technical Implementation

### MarketingHeader.tsx Changes

```typescript
// Line 42-48: Fix industry URLs
const productIndustries = [
  { title: "HR & Recruitment", href: "/industries/hr-recruitment-ai-act", icon: Briefcase },
  { title: "Financial Services", href: "/industries/fintech-credit-ai-act", icon: Building2 },
  { title: "Healthcare", href: "/use-cases/healthcare", icon: Heart },
  { title: "SaaS Companies", href: "/industries/saas-ai-act", icon: Laptop },
  { title: "Education", href: "/industries/education-edtech-ai-act", icon: GraduationCap },
];

// Line 62: Remove or redirect Sample Exports
const resourcesGetStarted = [
  { title: "Templates", href: "/templates", icon: FileText },
  { title: "Free Tools", href: "/tools", icon: Wrench },
  // Remove "Sample Exports" entirely
];

// Lines 257-264: Change "See Sample Exports" to "See All Industries"
<Link to="/industries" onClick={closeDropdown} ...>
  See All Industries
</Link>
```

### MarketingFooter.tsx Changes

```typescript
// Line 27-33: Fix industry URLs
const industryLinks = [
  { title: "HR & Recruitment", href: "/industries/hr-recruitment-ai-act" },
  { title: "Financial Services", href: "/industries/fintech-credit-ai-act" },
  { title: "Healthcare", href: "/use-cases/healthcare" },
  { title: "SaaS Companies", href: "/industries/saas-ai-act" },
  { title: "Education", href: "/industries/education-edtech-ai-act" },
];
```

### IndustriesHub.tsx Changes

```typescript
// Line 36: Fix SaaS URL
{ ..., href: "/industries/saas-ai-act", ... }

// Line 42: Fix Healthcare URL
{ ..., href: "/use-cases/healthcare", ... }
```

---

## Summary

- **5 dead links fixed** (3 industry mismatches + 1 IndustriesHub + 1 `/samples`)
- **Navigation now 100% functional**
- **Optional enhancement**: Redirect product features to dedicated BOFU pages for better conversion

