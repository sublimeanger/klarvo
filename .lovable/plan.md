
# Fix PDF Logo Rendering — Final Solution

## Root Cause Analysis

The logo isn't appearing on any PDFs because:

1. **External URL fails in react-pdf**: The current approach uses `https://klarvo.lovable.app/favicon.png`, but browser-based PDF rendering (client-side) cannot reliably fetch external URLs due to CORS restrictions
2. **Favicon is too small**: The favicon.png is likely 32x32 or 64x64 pixels — even if it loaded, it would be blurry at 80px width
3. **Local asset exists but isn't used**: There's a proper `src/assets/klarvo-logo.png` file that should be imported directly

## The Fix

Import the local PNG directly using Vite's asset handling. When you import a PNG in a Vite project, it gets bundled as a data URL or hashed path that react-pdf can render reliably.

---

## Technical Implementation

### Step 1: Update `src/lib/pdfAssets.ts`

Replace the URL approach with a direct import of the local PNG:

```typescript
// Import the PNG directly - Vite will handle bundling
import klarvoLogoPng from "@/assets/klarvo-logo.png";

// This becomes a data URL or bundled path that react-pdf can render
export const KLARVO_LOGO = klarvoLogoPng;
```

### Step 2: Update `src/components/exports/PDFComponents.tsx`

Change the `PDFLogo` component to use the imported asset:

```typescript
import { KLARVO_LOGO } from "@/lib/pdfAssets";

export function PDFLogo({ width = 80, style }: PDFLogoProps) {
  return (
    <Image 
      src={KLARVO_LOGO}  // Uses the bundled import
      style={{ width, marginBottom: 20, ...style }} 
    />
  );
}
```

### Step 3: Update All PDF Files Using Direct Imports

Each PDF file currently imports `KLARVO_LOGO_URL` directly. Update them to use the new import:

**Files to update:**
- `SampleClassificationMemoPDF.tsx`
- `SampleFRIAReportPDF.tsx`
- `AISystemPDF.tsx`
- `ProviderExecutiveSummaryPDF.tsx`
- `ImporterVerificationPDF.tsx`
- `DistributorVerificationPDF.tsx`
- `EUDeclarationPDF.tsx` (if applicable)

---

## Why This Works

| Approach | Problem | Solution |
|----------|---------|----------|
| External URL (`https://...`) | CORS blocks fetch, unreliable in browser PDF | Avoid |
| Base64 placeholder | Was never a real logo, just a placeholder | Replace |
| **Direct PNG import** | Vite bundles it, react-pdf can render reliably | **Use this** |

When you use `import logo from "./logo.png"` in Vite:
- For small files: Inlines as base64 data URL
- For larger files: Serves from bundled `/assets/` with hashed filename
- Either way: Works reliably with react-pdf's `<Image src={...}>`

---

## Files to Modify

| File | Change |
|------|--------|
| `src/lib/pdfAssets.ts` | Add direct import of `src/assets/klarvo-logo.png` |
| `src/components/exports/PDFComponents.tsx` | Use imported logo instead of URL |
| `src/components/exports/SampleClassificationMemoPDF.tsx` | Import from pdfAssets, use bundled logo |
| `src/components/exports/SampleFRIAReportPDF.tsx` | Import from pdfAssets, use bundled logo |
| `src/components/exports/AISystemPDF.tsx` | Use bundled logo |
| `src/components/exports/provider/ProviderExecutiveSummaryPDF.tsx` | Use bundled logo |
| `src/components/exports/provider/EUDeclarationPDF.tsx` | Use bundled logo |
| `src/components/exports/importer/ImporterVerificationPDF.tsx` | Use bundled logo |
| `src/components/exports/distributor/DistributorVerificationPDF.tsx` | Use bundled logo |

---

## Expected Result

After this fix:
- The Klarvo logo will appear on the cover page of all Sample PDFs (Classification Memo, FRIA Report)
- The logo will appear on all production PDFs (Evidence Packs, Operator Packs, EU Declaration)
- The logo will be crisp and properly sized (if the source PNG is high-resolution)

---

## Additional Check Needed

You mentioned "do you need me to give you the logo in a different format?" — **Yes, please confirm the `src/assets/klarvo-logo.png` is high-resolution** (ideally 512px+ wide). If the existing PNG is low resolution, you may want to upload a higher-quality version for best results in the PDF exports.
