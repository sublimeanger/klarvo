

# Mobile UX Optimization Plan - Phase 2

## Executive Summary

This plan addresses two main areas:
1. **Mobile Menu Bug Fix** - Marketing header mobile menu links not closing the menu on navigation
2. **Remaining Mobile Optimizations** - Standardizing card styling, touch targets, and responsive layouts across remaining pages

---

## Part 1: Mobile Menu Bug Fix

### Problem Identified
The marketing site's mobile navigation menu (in `MarketingHeader.tsx`) has links inside accordion sections that navigate correctly but **do not close the mobile menu** after clicking. This creates a broken UX where users must manually close the menu after navigation.

### Root Cause
Links inside the mobile accordion sections (lines 445-476, 499-557) do not have an `onClick={() => setIsMobileMenuOpen(false)}` handler.

### Solution
Add click handlers to close the mobile menu when any link is clicked within the accordion sections.

**Files to modify:**
- `src/components/marketing/MarketingHeader.tsx`

**Changes required:**
- Add `onClick={() => setIsMobileMenuOpen(false)}` to all Link components inside the mobile menu overlay (approximately 15-20 links)
- Ensure the mobile menu closes on any navigation action

---

## Part 2: Remaining Mobile Optimizations

### Pages Already Optimized (no changes needed)
Based on the audit, these pages are already mobile-optimized:
- Dashboard, AISystems, AISystemDetail
- Vendors, VendorDetail
- Evidence, Policies, Training, Incidents
- Tasks, Controls, Assessments
- Settings (General + Billing)
- Exports, AuditLog
- Provider Track Dashboard
- FAQ, Docs (marketing)

### Pages Requiring Updates

#### 2.1 Classification Wizard (`src/pages/ClassificationWizard.tsx`)

**Current Issues:**
- Alert boxes using `rounded-lg` instead of `rounded-xl`
- RadioGroup items lack touch-friendly sizing

**Changes:**
- Update alert containers (lines 423, 449, 475) from `rounded-lg` to `rounded-xl`
- Add `min-h-[44px]` to radio item containers for better touch targets

---

#### 2.2 FRIA Wizard (`src/pages/FRIAWizard.tsx`)

**Current Issues:**
- Progress step icons could be larger on mobile
- Card containers lack consistent `rounded-xl` styling

**Changes:**
- Verify Card components use `rounded-xl` consistently
- Increase step icon container size on mobile

---

#### 2.3 Onboarding (`src/pages/Onboarding.tsx`)

**Current Issues:**
- Role selection buttons using `rounded-lg` (line 260)
- Card components not using `rounded-xl`
- Input/Select elements could have larger touch targets

**Changes:**
- Update role buttons from `rounded-lg` to `rounded-xl`
- Add `rounded-xl` to Card components
- Ensure touch target heights are at least 44px

---

#### 2.4 Docs Sidebar (`src/components/docs/DocsSidebar.tsx`)

**Current Issues:**
- Mobile sidebar is hidden (`hidden lg:flex`) with no alternative mobile navigation
- Users on mobile cannot access the docs sidebar navigation

**Changes:**
- Add mobile-friendly docs navigation (hamburger or drawer pattern)
- Ensure search and category navigation work on mobile

---

#### 2.5 Disclosures Page (`src/pages/Disclosures.tsx`)

**Current Issues:**
- Page uses `DisclosureSnippetLibrary` component - need to verify mobile optimization

**Changes:**
- Audit `DisclosureSnippetLibrary` for mobile responsiveness
- Apply `rounded-xl` and touch-friendly styling as needed

---

## Part 3: Technical Implementation Details

### MarketingHeader Mobile Menu Fix

```text
Location: src/components/marketing/MarketingHeader.tsx

Lines 445-476 (Product accordion links):
- Add onClick={() => setIsMobileMenuOpen(false)} to each Link

Lines 460-462 ("See All Features" link):
- Add onClick={() => setIsMobileMenuOpen(false)}

Lines 466-475 (Industry links):
- Add onClick={() => setIsMobileMenuOpen(false)} to each Link

Lines 499-557 (Resources + Company accordion):
- Add onClick={() => setIsMobileMenuOpen(false)} to all Link components
```

### ClassificationWizard Updates

```text
Location: src/pages/ClassificationWizard.tsx

Lines 423, 449, 475:
- Change: rounded-lg -> rounded-xl

Lines 398-411 (RadioGroup):
- Add tap-target styling to radio containers
```

### Onboarding Updates

```text
Location: src/pages/Onboarding.tsx

Lines 173-174, 243-244, 293-294 (Card components):
- Add className="rounded-xl" to Card components

Line 260 (role selection buttons):
- Change: rounded-lg -> rounded-xl
```

---

## Priority Order

1. **High Priority - Bug Fix**
   - MarketingHeader mobile menu link closing

2. **Medium Priority - Core Wizards**
   - ClassificationWizard styling
   - FRIAWizard styling
   - Onboarding styling

3. **Lower Priority - Additional Polish**
   - Docs mobile navigation
   - DisclosureSnippetLibrary audit

---

## Testing Checklist

After implementation, verify:
- [ ] Marketing mobile menu closes after clicking any link
- [ ] All accordion sections work correctly
- [ ] Classification wizard cards have rounded-xl styling
- [ ] Onboarding role buttons have rounded-xl styling
- [ ] Touch targets meet 44px minimum on all interactive elements
- [ ] No z-index conflicts between mobile overlays

