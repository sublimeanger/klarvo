
# Marketing UX Refresh: Navigation, CTAs & Design Differentiation

## Summary
This plan addresses three key issues:
1. **Navigation UX**: Product features all link to `/features#section` - users expect clickable individual pages
2. **CTA Updates**: Replace all "See How It Works" with "See Samples" → `/samples`
3. **Design Differentiation**: Reduce "samesy" feel with varied hero styles and shorter header copy

---

## Phase 1: Navigation Fix (Product Menu)

### Problem
In the header's Product dropdown, features like "AI System Inventory", "Risk Classification", etc. all link to anchor sections on `/features`. While technically clickable, they all land on the same page, which feels broken.

### Solution
Create a more intuitive experience by:
1. **Update feature links** to point to dedicated feature pages or sample pages
2. **Shorten verbose descriptions** (remove "EU AI Act" where redundant)

### File: `src/components/marketing/MarketingHeader.tsx`

**Current productFeatures:**
```typescript
{
  title: "AI System Inventory",
  description: "Track and manage all AI systems",
  href: "/features#inventory",
  icon: Boxes,
},
{
  title: "Risk Classification",
  description: "Automated EU AI Act risk levels",  // Verbose
  href: "/features#classification",
  icon: Shield,
},
// ...
```

**Updated productFeatures:**
```typescript
{
  title: "AI System Inventory",
  description: "Track and manage all AI systems",
  href: "/ai-inventory-software",  // Dedicated page exists
  icon: Boxes,
},
{
  title: "Risk Classification", 
  description: "Automated risk classification",  // Shortened
  href: "/compliance-software",  // Dedicated page
  icon: Shield,
},
{
  title: "Evidence Vault",
  description: "Store compliance documentation",
  href: "/evidence-vault",  // Dedicated page
  icon: FileCheck,
},
{
  title: "Export Packs",
  description: "Audit-ready PDF reports",
  href: "/samples",  // Link to samples!
  icon: Download,
},
{
  title: "Control Library",
  description: "Pre-built regulatory controls",
  href: "/features#controls",  // Keep anchor - no dedicated page
  icon: Settings,
},
```

**Also update Resources → Learn:**
```typescript
{ title: "Regulation Guide", href: "/eu-ai-act", icon: FileText },  // Was "EU AI Act Guide"
```

---

## Phase 2: CTA Text Updates

### All instances of "See How It Works" → "See Samples" (`/samples`)

| File | Location | Change |
|------|----------|--------|
| `src/components/marketing/HeroSection.tsx` | Line 36 (default prop) | `{ label: "See Samples", href: "/samples" }` |
| `src/components/marketing/hero/HomepageHero.tsx` | Lines 107-112 | Update to "See Samples" → `/samples` |
| `src/pages/use-cases/SME.tsx` | Line 134-135 | Update to "See Samples" → `/samples` |
| `src/pages/marketing/LandingPage.tsx` | If present | Update secondary CTA |

---

## Phase 3: Design Differentiation - Hero Variants

### Problem
All industry pages use the same `HeroSection` component with identical styling - emerald glow, same grid pattern, same animation.

### Solution
Add a `heroVariant` prop to `HeroSection` with 4 distinct visual styles:

| Variant | Pages | Visual Style |
|---------|-------|--------------|
| `default` | Homepage, Features | Current emerald glow + grid |
| `gradient-warm` | HR & Recruitment, Healthcare | Warm amber/rose gradient accent |
| `gradient-cool` | Fintech, SaaS | Cool blue/indigo gradient accent |
| `geometric` | Education, SME | Bold geometric shapes + brighter colors |

### File: `src/components/marketing/HeroSection.tsx`

**Add new variant prop and background styles:**
```typescript
interface HeroSectionProps {
  // ...existing props
  heroVariant?: "default" | "gradient-warm" | "gradient-cool" | "geometric";
}

// Different background based on variant:
// default: Current emerald radial glow
// gradient-warm: Amber/rose gradient with floating orbs
// gradient-cool: Blue/indigo gradient with subtle mesh
// geometric: Bold shapes with higher contrast
```

### Page Updates
- `HRRecruitmentPage.tsx` → Add `heroVariant="gradient-warm"`
- `FintechPage.tsx` → Refactor to use `HeroSection` with `heroVariant="gradient-cool"`
- `SaaSPage.tsx` → Refactor to use `HeroSection` with `heroVariant="gradient-cool"`
- `SME.tsx` → Add `heroVariant="geometric"` (already has custom hero - update styling)

---

## Phase 4: Fintech & SaaS Page Refactors

### Problem
`FintechPage.tsx` and `SaaSPage.tsx` don't use the shared `HeroSection` component - they have inline custom heroes. This creates inconsistency.

### Solution
Refactor both to use `HeroSection` with the new `heroVariant` prop while preserving their unique badges and CTAs.

**FintechPage.tsx hero section:**
```tsx
<HeroSection
  badge="High-Risk • Annex III"
  title={
    <>
      <span className="text-foreground">EU AI Act for Fintech &</span>
      <br />
      <span className="text-gradient-hero">Financial Services</span>
    </>
  }
  subtitle="Credit scoring and insurance AI are high-risk under Annex III. Financial services deploying AI for lending, underwriting, or customer decisions face significant compliance obligations."
  primaryCta={{ label: "Check Your AI Systems", href: "/tools/high-risk-checker-annex-iii" }}
  secondaryCta={{ label: "See Samples", href: "/samples" }}
  heroVariant="gradient-cool"
/>
```

---

## Implementation Summary

### Files to Modify

1. **`src/components/marketing/MarketingHeader.tsx`**
   - Update `productFeatures` hrefs to point to dedicated pages
   - Shorten "Automated EU AI Act risk levels" → "Automated risk classification"
   - Change "EU AI Act Guide" → "Regulation Guide" in resourcesLearn

2. **`src/components/marketing/HeroSection.tsx`**
   - Add `heroVariant` prop with 4 options
   - Add variant-specific background styles
   - Update default secondaryCta to "See Samples" → `/samples`

3. **`src/components/marketing/hero/HomepageHero.tsx`**
   - Update "See How It Works" → "See Samples"
   - Update href from `/features` → `/samples`

4. **`src/pages/use-cases/SME.tsx`**
   - Update "See How It Works" → "See Samples"
   - Add `heroVariant="geometric"` styling to existing hero

5. **`src/pages/marketing/industries/HRRecruitmentPage.tsx`**
   - Add `heroVariant="gradient-warm"` prop to HeroSection

6. **`src/pages/marketing/industries/FintechPage.tsx`**
   - Refactor hero section to use `HeroSection` component
   - Add `heroVariant="gradient-cool"`
   - Update secondary CTA to "See Samples"

7. **`src/pages/marketing/industries/SaaSPage.tsx`**
   - Refactor hero section to use `HeroSection` component
   - Add `heroVariant="gradient-cool"`
   - Update secondary CTA to "See Samples"

---

## Expected Outcome

After implementation:
- Product dropdown items link to meaningful, distinct pages
- All "See How It Works" CTAs become "See Samples" → `/samples`
- Each industry page has a visually distinct hero style
- Header copy is less verbose (no redundant "EU AI Act" repetition)
- Marketing site feels more premium and differentiated
