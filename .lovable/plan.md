
# Google Ads Creative Assets Plan

## Overview

Create a set of professional display ad creatives for Google Ads campaigns, following Klarvo's brand guidelines. All assets will be downloadable directly from a new page in the app.

---

## Google Ads Display Sizes to Create

### Square Formats
| Size | Name |
|------|------|
| 250×250 | Square |
| 300×300 | Large Square |

### Horizontal/Rectangle Formats
| Size | Name |
|------|------|
| 300×250 | Medium Rectangle (most common) |
| 336×280 | Large Rectangle |
| 728×90 | Leaderboard |
| 320×50 | Mobile Leaderboard |

**Total: 6 ad creatives**

---

## Creative Design Specifications

### Visual Elements
- **Logo**: Klarvo horizontal logo (white version for dark backgrounds, primary for light)
- **Primary Color**: Emerald green (`#059669`)
- **Background Options**: White with emerald accent OR emerald gradient
- **Font**: Inter (Bold for headlines, Regular for body)

### Ad Copy Variants (Short & Punchy)
- **Headline**: "EU AI Act Compliance Made Simple"
- **Subhead**: "Audit-Ready in Hours, Not Weeks"
- **CTA**: "Start Free" or "Get Compliant Now"
- **Trust Signal**: "GDPR Compliant • ISO 27001"

### Alternative Messaging Options
- "Know Every AI System You Use"
- "Export Audit-Ready Evidence Packs"
- "AI Inventory + Risk Classification"

---

## Technical Implementation

### New Page: `/ads/creatives`
Create a hidden internal page (not linked in navigation) that:
1. Renders all 6 ad sizes as downloadable components
2. Uses HTML Canvas API to generate PNG downloads
3. Provides a "Download All" button for a ZIP file

### Component Structure
```
src/pages/ads/
  └── Creatives.tsx         # Main page with all ad previews
src/components/ads/
  └── AdCreative.tsx        # Reusable ad component
  └── AdDownloader.tsx      # Canvas-to-PNG download logic
```

### Download Functionality
- Each ad has individual "Download PNG" button
- "Download All as ZIP" using existing `jszip` package
- Files named: `klarvo-ad-{width}x{height}.png`

---

## Ad Creative Layouts

### 300×250 / 336×280 (Rectangle)
```text
┌────────────────────────────┐
│  [Klarvo Logo]             │
│                            │
│  EU AI Act                 │
│  Compliance                │
│  Made Simple               │
│                            │
│  Audit-ready in hours.     │
│                            │
│  ┌──────────────────┐      │
│  │   Start Free     │      │
│  └──────────────────┘      │
│                            │
│  GDPR • ISO 27001          │
└────────────────────────────┘
```

### 728×90 (Leaderboard)
```text
┌───────────────────────────────────────────────────────────────────┐
│ [Logo] │ EU AI Act Compliance Made Simple │ Audit-Ready │ [CTA]  │
└───────────────────────────────────────────────────────────────────┘
```

### 250×250 / 300×300 (Square)
```text
┌────────────────────┐
│   [Klarvo Logo]    │
│                    │
│   EU AI Act        │
│   Compliance       │
│                    │
│  ┌──────────────┐  │
│  │  Start Free  │  │
│  └──────────────┘  │
└────────────────────┘
```

---

## File Changes Required

| File | Action |
|------|--------|
| `src/pages/ads/Creatives.tsx` | **Create** - Main page rendering all ad sizes |
| `src/components/ads/AdCreative.tsx` | **Create** - Reusable ad component with size variants |
| `src/components/ads/AdDownloader.tsx` | **Create** - Canvas download + ZIP functionality |
| `src/App.tsx` | **Modify** - Add route `/ads/creatives` |
| `public/klarvo-logo-horizontal-white.png` | **Create** - White logo variant for dark backgrounds |

---

## Access & Security

- Page accessible at `/ads/creatives` (unlisted, internal use only)
- No authentication required (simple marketing tool)
- Not added to sitemap or navigation

---

## Usage Instructions

After implementation:
1. Navigate to `https://klarvo.io/ads/creatives`
2. Preview all ad sizes on the page
3. Click "Download PNG" for individual ads
4. Click "Download All" for a ZIP bundle
5. Upload to Google Ads as responsive display assets
