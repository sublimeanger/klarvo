
# PDF Branding & Watermark Fixes

## Problem Summary

You've identified three critical branding issues in the PDF exports:

1. **Purple Color on FRIA Sample**: The Sample FRIA Report uses `#7c3aed` (purple) instead of your emerald brand color `#0d9373`
2. **No Logo**: None of the PDFs include the Klarvo logo on cover pages or headers
3. **Watermark Clarity**: The watermark system exists but isn't visible in samples

---

## What the Watermark Currently Is

The watermark displays **"FREE TIER"** diagonally across each page in light gray (opacity 0.3) when a user is on the Free plan. It's defined in `AISystemPDF.tsx`:

```text
Position: Centered, rotated -45°
Font Size: 60pt
Color: Gray (#e5e7eb)
Text: "FREE TIER"
```

---

## Recommended Fixes

### Fix 1: Correct the Purple Color in Sample FRIA Report

**File**: `src/components/exports/SampleFRIAReportPDF.tsx`

Replace all purple (`#7c3aed`) references with the correct emerald palette:
- Cover badge background: `#7c3aed` → `#0d9373` (emerald)
- Cover subtitle color: `#7c3aed` → `#0d9373` 
- Border colors: `#7c3aed` → `#0d9373`
- Table headers: `#7c3aed` → `#0d9373`
- Article badge: `#f3e8ff` background → `#e6f7f3` (emeraldLight)
- Bullets: `#7c3aed` → `#0d9373`

### Fix 2: Add Klarvo Logo to All PDF Cover Pages

**Approach**: Create a shared `PDFLogo` component that embeds the logo as a PNG (SVG is unreliable in react-pdf). Add this to cover pages of all PDF exports.

**Files to Update**:
- `src/lib/pdfStyles.ts` - Add logo styles
- `src/components/exports/PDFComponents.tsx` - Add `PDFLogo` component
- All PDF files with cover pages:
  - `SampleClassificationMemoPDF.tsx`
  - `SampleFRIAReportPDF.tsx`
  - `SampleEvidencePackGenerator.tsx`
  - `ClassificationMemoPDF.tsx` (add cover page)
  - `FRIAReportPDF.tsx` (add cover page)
  - `ProviderExecutiveSummaryPDF.tsx`
  - `ImporterVerificationPDF.tsx`
  - `DistributorVerificationPDF.tsx`

**Logo Placement**: Top-left of cover page, above the document title badge

### Fix 3: Enhance Watermark Visibility

**Current**: "FREE TIER" in light gray
**Proposed Enhancement**: 
- Change to "SAMPLE REPORT" for `/samples` page exports
- Make slightly more visible (opacity 0.35)
- Add watermark to Sample PDFs so prospects see what free-tier looks like

### Fix 4: Add "Powered by Klarvo" Footer on Paid Tiers

For paid tiers, add a small "Powered by Klarvo" text with logo in the cover page footer (instead of watermark).

---

## Technical Implementation

### Step 1: Create PDF Logo Component

Add a base64-encoded version of the logo (PNG) to `src/lib/pdfAssets.ts`:
```typescript
// Base64 encoded Klarvo logo for PDF embedding
export const KLARVO_LOGO_BASE64 = "data:image/png;base64,...";
```

### Step 2: Update Shared PDF Components

Add to `src/components/exports/PDFComponents.tsx`:
```typescript
import { Image } from "@react-pdf/renderer";
import { KLARVO_LOGO_BASE64 } from "@/lib/pdfAssets";

export function PDFLogo({ width = 100 }) {
  return (
    <Image src={KLARVO_LOGO_BASE64} style={{ width, marginBottom: 20 }} />
  );
}

export function Watermark({ text = "SAMPLE" }) {
  return (
    <Text style={watermarkStyle}>{text}</Text>
  );
}
```

### Step 3: Refactor SampleFRIAReportPDF

Replace all hardcoded purple colors with emerald, import from `pdfStyles.ts`:
```typescript
import { colors, baseStyles } from "@/lib/pdfStyles";

// Replace all #7c3aed with colors.emerald
// Replace all #f3e8ff with colors.emeraldLight
```

### Step 4: Add Logo to All Cover Pages

Each PDF with a cover page will include:
```typescript
<Page size="A4" style={styles.coverPage}>
  <PDFLogo />
  <Text style={styles.coverBadge}>CLASSIFICATION MEMO</Text>
  ...
</Page>
```

---

## Affected Files Summary

| File | Changes |
|------|---------|
| `src/lib/pdfAssets.ts` | **NEW** - Logo base64 |
| `src/lib/pdfStyles.ts` | Add logo/watermark styles |
| `src/components/exports/PDFComponents.tsx` | Add `PDFLogo`, `Watermark` components |
| `src/components/exports/SampleFRIAReportPDF.tsx` | **FIX PURPLE** → emerald |
| `src/components/exports/SampleClassificationMemoPDF.tsx` | Add logo |
| `src/components/exports/SampleEvidencePackGenerator.tsx` | Add logo, watermark |
| `src/components/exports/ClassificationMemoPDF.tsx` | Add cover page with logo |
| `src/components/exports/FRIAReportPDF.tsx` | Add cover page with logo |
| `src/components/exports/AISystemPDF.tsx` | Use shared watermark component |
| `src/components/exports/provider/ProviderExecutiveSummaryPDF.tsx` | Add logo |
| `src/components/exports/importer/ImporterVerificationPDF.tsx` | Add logo |
| `src/components/exports/distributor/DistributorVerificationPDF.tsx` | Add logo |

---

## Visual Result

**Cover Page Structure** (after fix):
```text
┌─────────────────────────────────────┐
│  [KLARVO LOGO]                      │
│                                     │
│  ┌─────────────────────┐            │
│  │ CLASSIFICATION MEMO │ (emerald)  │
│  └─────────────────────┘            │
│                                     │
│  EU AI Act                          │
│  Risk Classification Assessment     │
│  ────────────────────────────────   │
│  TalentMatch AI                     │
│                                     │
│  System ID: AI-SYS-2024-001         │
│  ...                                │
│                                     │
│  ─────────────────────────────────  │
│  Generated by Klarvo • Jan 2025     │
│  [POWERED BY KLARVO] (paid only)    │
└─────────────────────────────────────┘
```

**Free Tier** shows diagonal "SAMPLE REPORT" watermark across each page.

---

## Watermark Behavior Summary

| Tier | Watermark | Footer |
|------|-----------|--------|
| Free | "SAMPLE REPORT" (diagonal, gray) | "Generated by Klarvo" |
| Starter+ | None | "Powered by Klarvo" + small logo |
| Enterprise | None | Clean (optional) |
