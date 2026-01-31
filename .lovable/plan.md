
# Complete Marketing Plan Implementation

## Current Status Audit

Based on the marketing plan document, here's the complete gap analysis:

### What's Already Implemented (LIVE)

| Category | Pages | Status |
|----------|-------|--------|
| **BOFU Product Pages** | 3/6 | `/eu-ai-act-compliance-software`, `/ai-inventory-software`, `/fria-software` |
| **Hub Pages** | 5/5 | Templates, Tools, Guides, Compare, Industries |
| **Template Pages** | 8/8 | All 8 templates implemented |
| **Interactive Tools** | 4/4 | Definition, High-Risk, Transparency, Prohibited |
| **Guide Pages** | 5/10 | SMEs, Article 26, Article 50, Prohibited, High-Risk |
| **Industry Pages** | 4/4 | HR, Fintech, Education, SaaS |
| **Use Case Pages** | 5/5 | SME, Enterprise, HR, Fintech, Healthcare |
| **Legal Pages** | 7/7 | Terms, Privacy, Cookies, Security, DPA, GDPR, AUP |

### What's Missing (TO BUILD)

#### 1. Missing Guide Pages (5 articles)
| URL | Keyword Target | Schema |
|-----|----------------|--------|
| `/guides/ai-inventory-eu-ai-act` | AI inventory EU AI Act | Article + HowTo + FAQ |
| `/guides/is-this-an-ai-system` | AI system definition EU AI Act | Article + FAQ |
| `/guides/ai-literacy-article-4` | AI literacy EU AI Act | Article + FAQ |
| `/guides/fria-article-27` | FRIA EU AI Act | Article + FAQ |
| `/guides/evidence-pack-procurement` | AI governance due diligence | Article + FAQ |

#### 2. Comparison Pages (2 pages)
| URL | Keyword Target | Schema |
|-----|----------------|--------|
| `/compare/klarvo-vs-spreadsheets` | AI inventory spreadsheet vs software | Article + FAQ |
| `/compare/klarvo-vs-trust-platforms` | EU AI Act vs GRC platforms | Article + FAQ |

#### 3. BOFU Product Pages (3 pages)
| URL | Keyword Target | Schema |
|-----|----------------|--------|
| `/ai-governance-evidence-packs` | AI governance evidence pack | SoftwareApplication + FAQ |
| `/ai-literacy-training-tracker` | AI literacy training tracker | SoftwareApplication + FAQ |
| `/product/evidence-vault` | compliance evidence vault | SoftwareApplication |

---

## Implementation Plan

### Phase 1: Guide Articles (5 new pages)

Each guide will follow the established pattern from `EUAIActForSMEs.tsx`:
- Hero with Badge, title, read time, download CTA
- Content sections with icons and cards
- FAQ section with schema
- Internal links to related tools/templates
- CTASection footer

#### 1.1 AI Inventory Guide
**File:** `src/pages/marketing/guides/AIInventoryGuide.tsx`
- **URL:** `/guides/ai-inventory-eu-ai-act`
- **Content:** What an inventory is, why it's the foundation, what fields to capture, how to maintain it, common mistakes
- **Internal links:** Inventory Template, Inventory Software, AI Definition Checker
- **CTA:** Download inventory template

#### 1.2 AI System Definition Guide
**File:** `src/pages/marketing/guides/AIDefinitionGuide.tsx`
- **URL:** `/guides/is-this-an-ai-system`
- **Content:** Commission definition, edge cases, examples (chatbots, ML, rules-based), how to document the decision
- **Internal links:** Definition Checker Tool, Inventory Template, SME Guide
- **CTA:** Run the definition checker

#### 1.3 AI Literacy Guide (Article 4)
**File:** `src/pages/marketing/guides/AILiteracyGuide.tsx`
- **URL:** `/guides/ai-literacy-article-4`
- **Content:** What "sufficient literacy" means, role-based training, how to evidence it, practical programme structure
- **Internal links:** Acceptable Use Policy Template, Training module
- **CTA:** Download training tracker

#### 1.4 FRIA Guide (Article 27)
**File:** `src/pages/marketing/guides/FRIAGuide.tsx`
- **URL:** `/guides/fria-article-27`
- **Content:** Who needs FRIA, when, structure (a-f elements), update triggers, notification requirements
- **Internal links:** FRIA Template, FRIA Software, High-Risk Guide
- **CTA:** Download FRIA template

#### 1.5 Evidence Pack Procurement Guide
**File:** `src/pages/marketing/guides/EvidencePackGuide.tsx`
- **URL:** `/guides/evidence-pack-procurement`
- **Content:** What procurement asks for, how to respond fast, evidence index structure, sample pack contents
- **Internal links:** Vendor Due Diligence Template, Evidence Vault product
- **CTA:** Download sample pack

---

### Phase 2: Comparison Pages (2 new pages)

Each comparison will include:
- Hero with clear positioning
- Feature comparison table (3 columns)
- Detailed section-by-section breakdown
- FAQ with schema
- Strong CTAs

#### 2.1 Klarvo vs Spreadsheets
**File:** `src/pages/marketing/compare/KlarvoVsSpreadsheets.tsx`
- **URL:** `/compare/klarvo-vs-spreadsheets`
- **Comparison points:** Audit trails, evidence expiry, classification automation, export quality, collaboration, change triggers
- **CTA:** Import your spreadsheet → start free

#### 2.2 Klarvo vs Trust Platforms
**File:** `src/pages/marketing/compare/KlarvoVsTrustPlatforms.tsx`
- **URL:** `/compare/klarvo-vs-trust-platforms`
- **Comparison points:** AI-specific vs generic controls, FRIA workflow, Article 26 checklist, setup time, SME pricing, EU AI Act focus
- **CTA:** Start trial

---

### Phase 3: BOFU Product Pages (3 new pages)

#### 3.1 Evidence Packs Product Page
**File:** `src/pages/marketing/EvidencePacksPage.tsx`
- **URL:** `/ai-governance-evidence-packs`
- **Content:** What's in a pack, how it's generated, sample pack preview, use for procurement
- **Schema:** SoftwareApplication + FAQ
- **CTA:** Download sample pack

#### 3.2 Training Tracker Product Page
**File:** `src/pages/marketing/TrainingTrackerPage.tsx`
- **URL:** `/ai-literacy-training-tracker`
- **Content:** Article 4 requirements, role-based tracking, completion reporting, refresh automation
- **Schema:** SoftwareApplication + FAQ
- **CTA:** Download training tracker

#### 3.3 Evidence Vault Product Page
**File:** `src/pages/marketing/EvidenceVaultPage.tsx`
- **URL:** `/product/evidence-vault`
- **Content:** Upload, organize, approve evidence, link to controls, expiry tracking, auditor-ready exports
- **Schema:** SoftwareApplication
- **CTA:** Start trial

---

### Phase 4: Infrastructure Updates

#### 4.1 Router Updates
**File:** `src/App.tsx`
- Add imports for all 10 new pages
- Add Route entries for each URL

#### 4.2 SSG Routes Updates
**File:** `src/ssgRoutes.ts`
- Add all 10 new routes

#### 4.3 Hub Page Updates
**File:** `src/pages/marketing/GuidesHub.tsx`
- Verify all 10 guides are listed (already has entries, just need pages to exist)

**File:** `src/pages/marketing/CompareHub.tsx`
- Already has entries pointing to the comparison pages

---

## Technical Implementation Details

### SEO Standard Per Page

Every new page will include:

```text
1. SEOHead component with:
   - Unique title (<60 chars)
   - Unique description (<160 chars)
   - Targeted keywords array
   - Canonical URL
   - ogType (article/website)

2. SchemaMarkup with appropriate types:
   - Guides: createArticleSchema + createFAQSchema + createBreadcrumbSchema
   - Comparisons: createArticleSchema + createFAQSchema + createBreadcrumbSchema
   - Products: createSoftwareApplicationSchema + createFAQSchema + createBreadcrumbSchema

3. Internal linking:
   - Each page links to 2-4 related tools/templates
   - Each page links to relevant product pages
   - Breadcrumb navigation
```

### File Structure

```text
src/pages/marketing/
├── guides/
│   ├── AIInventoryGuide.tsx       (NEW)
│   ├── AIDefinitionGuide.tsx      (NEW)
│   ├── AILiteracyGuide.tsx        (NEW)
│   ├── FRIAGuide.tsx              (NEW)
│   ├── EvidencePackGuide.tsx      (NEW)
│   └── [existing 5 guides]
├── compare/
│   ├── KlarvoVsSpreadsheets.tsx   (NEW)
│   └── KlarvoVsTrustPlatforms.tsx (NEW)
├── EvidencePacksPage.tsx          (NEW)
├── TrainingTrackerPage.tsx        (NEW)
└── EvidenceVaultPage.tsx          (NEW)
```

---

## Delivery Summary

| Phase | Files | Pages |
|-------|-------|-------|
| Phase 1: Guides | 5 new files | 5 article pages |
| Phase 2: Comparisons | 2 new files | 2 comparison pages |
| Phase 3: BOFU Products | 3 new files | 3 product pages |
| Phase 4: Infrastructure | 2 modified files | Router + SSG |
| **Total** | **12 files** | **10 new pages** |

All pages will match the existing SEO standard with:
- Unique metadata and keywords
- Comprehensive JSON-LD structured data
- Full internal linking as per marketing plan
- Conversion CTAs with download/trial paths
- FAQ sections for rich snippet eligibility
