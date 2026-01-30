

# Mobile Responsiveness Polish: Remaining Components

This plan continues the mobile responsiveness work across all remaining pages and components that haven't been polished yet. The focus is on ensuring consistent touch targets, readable typography, and proper layouts on mobile devices.

---

## Overview of Changes

I've identified the following pages and components that need mobile responsiveness improvements:

### Core App Pages
1. **Vendors.tsx** - Add mobile card view for vendor table
2. **VendorDetail.tsx** - Already well-optimized, minor dialog tweaks
3. **Policies.tsx** - Dialog responsiveness improvements
4. **Tasks.tsx** - Already has good mobile support, minor refinements
5. **Settings/General.tsx** - Add mobile card view for team members table
6. **Onboarding.tsx** - Already well-optimized

### Documentation Pages  
7. **Docs.tsx** - Responsive sidebar and hero section
8. **DocsArticle.tsx** - Mobile-friendly article footer and prev/next navigation
9. **DocsSidebar.tsx** - Make sidebar collapsible/hidden on mobile

### Vendor Components
10. **VendorAttestations.tsx** - Mobile card layout for attestation items

### Wizards (Already Well-Optimized)
- **AISystemWizard.tsx** - Has responsive classes
- **FRIAWizard.tsx** - Has responsive classes  
- **ClassificationWizard.tsx** - Has responsive classes

---

## Detailed Changes

### 1. Vendors.tsx (Lines 333-457)
**Current Issue:** Table view doesn't work well on mobile.

**Changes:**
- Add mobile card layout with `md:hidden` and `hidden md:block` toggle
- Each vendor card shows: name, status badge, website/email icons, actions
- Make delete confirmation dialog responsive

```text
Mobile Card Structure:
┌─────────────────────────────────┐
│ [Icon] Vendor Name              │
│ Status: [Badge]                 │
│ Contract: Date or "—"           │
│ ┌─────────────────────────────┐ │
│ │ [Website] [Email] [Actions] │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### 2. Policies.tsx (Lines 361-431, 434-544)
**Current Issue:** Create/Edit dialogs need mobile width handling.

**Changes:**
- Update `DialogContent` to use `max-w-[95vw] sm:max-w-2xl`
- Stack `DialogFooter` buttons vertically on mobile
- Add responsive text sizing in policy cards

### 3. Settings/General.tsx (Lines 285-377)
**Current Issue:** Team members table doesn't work on mobile.

**Changes:**
- Add mobile card layout for team members (similar to other tables)
- Stack role permissions grid better on mobile (`sm:grid-cols-2 lg:grid-cols-3`)
- Make `AlertDialogContent` responsive

### 4. Docs.tsx (Main Documentation Page)
**Current Issue:** Sidebar is always visible and takes space on mobile.

**Changes:**
- Hide `DocsSidebar` on mobile with `hidden lg:block`
- Add mobile-specific search and category grid that spans full width
- Optimize hero section typography for mobile (`text-3xl sm:text-4xl lg:text-5xl`)
- Stack "Get Started" cards vertically on smallest screens

### 5. DocsArticle.tsx
**Current Issue:** Article footer elements need better mobile layout.

**Changes:**
- Make feedback buttons stack or shrink on mobile
- Stack prev/next navigation vertically on mobile
- Hide table of contents sidebar on mobile/tablet (`hidden xl:block` - already done)
- Make related articles grid single column on mobile

### 6. DocsSidebar.tsx
**Current Issue:** Fixed sidebar takes too much space on mobile.

**Changes:**
- Add `hidden lg:block` to hide on mobile
- Alternative: Create a mobile sheet/drawer trigger for docs navigation

### 7. VendorAttestations.tsx (Lines 295-405)
**Current Issue:** Attestation items use flex layout that can break on narrow screens.

**Changes:**
- Stack attestation items vertically on mobile (`flex-col sm:flex-row`)
- Reduce padding and icon sizes on mobile
- Make stats grid 2x2 on mobile (`grid-cols-2 sm:grid-cols-4`)
- Update dialog width to `max-w-[95vw] sm:max-w-[500px]`

### 8. Tasks.tsx (Minor Refinements)
**Current Issue:** Some task cards have long content that could overflow.

**Changes:**
- Ensure status select triggers have responsive widths
- Add `truncate` to task titles on mobile
- Stack bulk action toolbar items better on narrow screens

---

## Technical Implementation Details

### Pattern 1: Mobile Card View for Tables
```tsx
{/* Mobile Cards */}
<div className="space-y-3 md:hidden">
  {items.map((item) => (
    <div key={item.id} className="p-3 rounded-lg border bg-card">
      {/* Compact card content */}
    </div>
  ))}
</div>

{/* Desktop Table */}
<div className="hidden md:block rounded-lg border">
  <Table>...</Table>
</div>
```

### Pattern 2: Responsive Dialogs
```tsx
<DialogContent className="max-w-[95vw] sm:max-w-lg">
  <DialogFooter className="flex-col sm:flex-row gap-2">
    <Button className="w-full sm:w-auto">Cancel</Button>
    <Button className="w-full sm:w-auto">Submit</Button>
  </DialogFooter>
</DialogContent>
```

### Pattern 3: Responsive Typography
```tsx
<h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Title</h1>
<p className="text-xs sm:text-sm text-muted-foreground">Description</p>
```

---

## Files to Modify

| File | Priority | Changes |
|------|----------|---------|
| `src/pages/Vendors.tsx` | High | Add mobile card layout, responsive delete dialog |
| `src/pages/Policies.tsx` | High | Responsive dialogs |
| `src/pages/Settings/General.tsx` | High | Mobile team member cards |
| `src/pages/marketing/Docs.tsx` | Medium | Hide sidebar on mobile, responsive hero |
| `src/pages/marketing/DocsArticle.tsx` | Medium | Mobile article footer |
| `src/components/docs/DocsSidebar.tsx` | Medium | Hide on mobile |
| `src/components/vendors/VendorAttestations.tsx` | Medium | Mobile attestation cards |
| `src/pages/Tasks.tsx` | Low | Minor refinements |

---

## Testing Recommendations

After implementation, test these scenarios:
1. All pages on 320px width (smallest mobile)
2. All dialogs open and close correctly on mobile
3. Touch targets are at least 44x44px
4. Horizontal scrolling is eliminated
5. Text remains readable at all breakpoints

---

## Estimated Scope

- **8 files** to modify
- **~400 lines** of responsive class updates
- **No new dependencies** required
- **No breaking changes** to existing functionality

