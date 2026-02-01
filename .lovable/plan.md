

# Flawless Marketing Site — Comprehensive Fix Plan

## Executive Summary

This plan addresses all remaining functionality gaps and polish items to bring the marketing site to a production-ready "flawless" state. The Security page will keep SOC 2 Type II as "In Progress" as you requested.

---

## Phase 1: Fix React Warnings & Bug Fixes

### 1.1 Fix React `forwardRef` Warnings

**Issue:** React warnings about function components not being wrapped in `forwardRef` when used with `asChild` pattern.

**Files to fix:**
- `src/components/marketing/NewsletterForm.tsx`
- `src/components/marketing/MarketingFooter.tsx`

**Solution:** Review any `Button asChild` patterns and either wrap components properly or use direct `<Link>` components styled with Tailwind.

---

## Phase 2: Contact Form Database Persistence

### 2.1 Create Database Table

Create a `contact_submissions` table to store form submissions:

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'new'
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public contact form submission" ON contact_submissions
  FOR INSERT WITH CHECK (true);
```

### 2.2 Update Contact Page

**File:** `src/pages/marketing/Contact.tsx`

Replace the mock `setTimeout` logic with actual Supabase insert:

```typescript
const { error } = await supabase
  .from("contact_submissions")
  .insert({
    name: formData.name,
    email: formData.email,
    company: formData.company || null,
    subject: formData.subject,
    message: formData.message
  });
```

---

## Phase 3: Template Downloads (Email-Gated)

### 3.1 Strategy Decision

Implement email-gated downloads for templates. User enters email → we store it → reveal download link. This captures leads while still providing value.

### 3.2 Create Download Infrastructure

**New file:** `src/components/marketing/TemplateDownloadGate.tsx`

A reusable component that:
1. Shows email input form
2. On submit, stores email in `newsletter_subscribers` with source like `template-fria`
3. Reveals the download link or triggers browser download
4. Stores download event for analytics

### 3.3 Create Template Files

Add placeholder PDF templates to `/public/templates/`:
- `ai-inventory-template.pdf`
- `fria-template.pdf`
- `article-26-checklist.pdf`
- `article-50-disclosure.pdf`
- `ai-acceptable-use-policy.pdf`
- `human-oversight-plan.pdf`
- `vendor-due-diligence.pdf`
- `ai-incident-register.pdf`

**Note:** These can be simple PDF placeholders initially that display "Full template available in Klarvo app" with signup CTA.

### 3.4 Update Template Pages

Replace all static download buttons with the new `TemplateDownloadGate` component:

| File | Change |
|------|--------|
| `Templates.tsx` | All download buttons → `TemplateDownloadGate` |
| `FRIATemplate.tsx` | Download button → `TemplateDownloadGate` |
| `AIInventoryTemplate.tsx` | Download button → `TemplateDownloadGate` |
| All 8 template detail pages | Download buttons → `TemplateDownloadGate` |

---

## Phase 4: Features Page — Complete Anchor Sections

### 4.1 Current State

The Features page has empty `<div id="controls" />` and `<div id="exports" />` placeholders that provide no content.

### 4.2 Add Controls Section Content

**File:** `src/pages/marketing/Features.tsx`

Replace empty `#controls` div with a full section showcasing the Control Library:

```typescript
const controlFeatures = [
  { icon: Shield, title: "Pre-Built Control Library", description: "30+ controls mapped to EU AI Act obligations" },
  { icon: CheckCircle, title: "Implementation Tracking", description: "Track status: Not Started, In Progress, Implemented" },
  { icon: Link, title: "Evidence Linking", description: "Attach evidence directly to controls for audit trails" },
  { icon: RefreshCw, title: "Automatic Assignment", description: "Controls auto-assigned based on risk classification" },
];
```

Render as a `FeatureGrid` within a `<section id="controls">`.

### 4.3 Add Exports Section Content

Replace empty `#exports` div with a showcase of export capabilities:

```typescript
const exportFeatures = [
  { icon: FileText, title: "Classification Memos", description: "One-page PDF with risk decision and rationale" },
  { icon: Download, title: "Evidence Packs", description: "Complete ZIP bundle with all compliance artifacts" },
  { icon: Shield, title: "FRIA Reports", description: "Article 27 compliant fundamental rights assessment" },
  { icon: Printer, title: "Audit Bundles", description: "Everything auditors need in one professional export" },
];
```

---

## Phase 5: Roll Out Internal Linking Components

### 5.1 Current State

The hub-and-spoke internal linking system (`RelatedContent`, `ContentBreadcrumb`, `HubNavigation`) exists but is only integrated into 2 pages:
- `EUAIActForSMEs.tsx`
- `AIInventoryTemplate.tsx`

### 5.2 Integrate Into All Content Pages

Add the linking components to all 40+ content pages:

**Guides (10 pages):**
- `AIDefinitionGuide.tsx`
- `AIInventoryGuide.tsx`
- `AILiteracyGuide.tsx`
- `Article26Guide.tsx`
- `Article50Guide.tsx`
- `EUAIActForSMEs.tsx` ✅ (done)
- `EvidencePackGuide.tsx`
- `FRIAGuide.tsx`
- `HighRiskGuide.tsx`
- `ProhibitedPracticesGuide.tsx`

**Templates (8 pages):**
- `AIAcceptableUsePolicy.tsx`
- `AIIncidentRegister.tsx`
- `AIInventoryTemplate.tsx` ✅ (done)
- `Article26Checklist.tsx`
- `Article50Disclosure.tsx`
- `FRIATemplate.tsx`
- `HumanOversightPlan.tsx`
- `VendorDueDiligence.tsx`

**Tools (4 pages):**
- `AIDefinitionChecker.tsx`
- `HighRiskChecker.tsx`
- `ProhibitedPracticesScreening.tsx`
- `TransparencyChecker.tsx`

**Industries (4 pages):**
- `EducationPage.tsx`
- `FintechPage.tsx`
- `HRRecruitmentPage.tsx`
- `SaaSPage.tsx`

**Compare (2 pages):**
- `KlarvoVsSpreadsheets.tsx`
- `KlarvoVsTrustPlatforms.tsx`

**Product (5 pages):**
- `ComplianceSoftwarePage.tsx`
- `AIInventorySoftwarePage.tsx`
- `FRIASoftwarePage.tsx`
- `EvidencePacksPage.tsx`
- `TrainingTrackerPage.tsx`

### 5.3 Standard Integration Pattern

For each page, add at the bottom before the CTA section:

```tsx
import { ContentBreadcrumb, RelatedContent, HubNavigation } from "@/components/marketing";

// At top of component, add breadcrumb
<ContentBreadcrumb currentHref="/guides/fria-article-27" />

// Before CTA section, add related content
<RelatedContent 
  currentHref="/guides/fria-article-27" 
  title="Related Resources"
/>

// At very bottom, add hub navigation
<HubNavigation currentHref="/guides/fria-article-27" />
```

---

## Phase 6: Blog Article Enhancements

### 6.1 Add Reading Progress Indicator

**File:** `src/pages/marketing/BlogArticle.tsx`

Add a fixed progress bar at the top that fills as user scrolls:

```tsx
const [readingProgress, setReadingProgress] = useState(0);

useEffect(() => {
  const updateProgress = () => {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    setReadingProgress((scrolled / height) * 100);
  };
  window.addEventListener('scroll', updateProgress);
  return () => window.removeEventListener('scroll', updateProgress);
}, []);
```

### 6.2 Add Author Bio Section

Add an author bio box after the article content:

```tsx
const authors = {
  "Klarvo Team": {
    role: "Compliance Experts",
    bio: "The Klarvo team brings decades of combined experience in AI governance, privacy, and regulatory compliance.",
    image: "/team/klarvo-team.png"
  }
};
```

### 6.3 Improve Social Sharing

Current implementation has Twitter/LinkedIn. Add:
- Copy link button
- Email share button

---

## Phase 7: UX Polish

### 7.1 Smooth Scroll for Anchor Links

**File:** `src/App.tsx` or create `src/hooks/useSmoothScroll.ts`

Add scroll behavior for hash navigation:

```tsx
useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    const element = document.querySelector(hash);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}, [location]);
```

### 7.2 Add Scroll Margin to All Anchor Sections

Ensure all anchor IDs have `scroll-mt-24` to account for fixed header:

```tsx
<section id="controls" className="scroll-mt-24">
```

---

## Implementation Order

| Day | Tasks | Files Affected |
|-----|-------|----------------|
| **1** | Phase 1 (React warnings) + Phase 2 (Contact form DB) | `NewsletterForm.tsx`, `MarketingFooter.tsx`, `Contact.tsx`, DB migration |
| **2** | Phase 3 (Template downloads) | Create `TemplateDownloadGate.tsx`, update 9 template pages |
| **3** | Phase 4 (Features anchors) | `Features.tsx` |
| **4** | Phase 5.1 (Guides linking) | 10 guide pages |
| **5** | Phase 5.2 (Templates linking) | 8 template pages |
| **6** | Phase 5.3 (Tools + Industries) | 8 pages |
| **7** | Phase 5.4 (Compare + Product) | 7 pages |
| **8** | Phase 6 (Blog enhancements) + Phase 7 (UX polish) | `BlogArticle.tsx`, scroll behavior |

---

## Database Changes Summary

```sql
-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'new'
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public contact form submission" ON contact_submissions
  FOR INSERT WITH CHECK (true);
```

---

## Success Criteria

1. Zero React console warnings
2. Contact form saves to database with success feedback
3. All template downloads work (email-gated with actual file delivery)
4. Features page `#controls` and `#exports` anchors show real content
5. All 40+ content pages have breadcrumbs, related content, and hub navigation
6. Blog articles have reading progress, author bios, and enhanced sharing
7. Smooth scroll behavior on all anchor links
8. Security page keeps "SOC 2 Type II (In Progress)" status

---

## Files Created/Modified Summary

| Action | Files |
|--------|-------|
| **Create** | `TemplateDownloadGate.tsx`, 8 PDF placeholder templates in `/public/templates/` |
| **Database** | `contact_submissions` table |
| **Modify** | `NewsletterForm.tsx`, `MarketingFooter.tsx`, `Contact.tsx`, `Features.tsx`, `BlogArticle.tsx`, `App.tsx`, 33 content pages for internal linking |

