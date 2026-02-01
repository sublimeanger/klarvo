
# World-Class Mobile UX Overhaul — Complete Implementation Plan

## Executive Summary

This plan transforms the entire Klarvo application from a desktop-first experience with basic mobile accommodations into a **world-class mobile-first experience** that rivals apps like Linear, Stripe Dashboard, and Notion mobile.

The overhaul covers:
- **Marketing Pages** (14+ pages)
- **Application Dashboard & Core Pages** (15+ pages)  
- **Wizard & Assessment Flows** (AI System Wizard, FRIA Wizard, Classification)
- **Settings & Team Management**
- **Global Components & Layout System**

---

## Current State Analysis

### Issues Identified

**Marketing Pages:**
- Hero sections have cramped text on mobile (headlines too large)
- Feature grids don't stack gracefully (2-col grids cramped)
- Trust indicators wrap awkwardly
- Sample Reports page cards have poor content hierarchy on mobile
- Mobile menu works but lacks polish (no micro-interactions)
- CTAs feel desktop-sized, not thumb-friendly

**Application Dashboard:**
- Metrics grid forces 2-col which is cramped on small screens
- Cards have inconsistent padding (p-3 vs p-4 vs p-6)
- Charts don't resize gracefully
- Mobile nav sheet is functional but basic

**Wizard Flows:**
- Progress indicators overflow/truncate on mobile
- Form fields have inconsistent sizing
- Navigation buttons are too small for comfortable tapping
- No swipe gestures for step navigation

**Data Tables:**
- Card view on mobile is basic, not scannable
- Action buttons lack touch-friendly sizing
- Filter bars overflow without proper scrolling

---

## Implementation Phases

### Phase 1: Foundation & Design System (Mobile Variables)

**1.1 Mobile Spacing Scale**
Add mobile-specific spacing utilities to `tailwind.config.ts`:
```
- Touch targets: minimum 44px height (Apple HIG standard)
- Thumb-reach zones: critical actions in bottom 60% of screen
- Safe area insets for notched devices
```

**1.2 Mobile Typography Scale**
Update `src/index.css` with mobile-optimized display classes:
- `.display-2xl` → 2.5rem on mobile (currently 3rem)
- `.display-xl` → 2rem on mobile (currently 2.5rem)
- Body text line-height: 1.6 on mobile for readability

**1.3 New Mobile Utility Classes**
Add to `src/index.css`:
```css
/* Touch-friendly tap areas */
.tap-target { min-height: 44px; min-width: 44px; }

/* Bottom sheet safe area */
.safe-bottom { padding-bottom: env(safe-area-inset-bottom, 1rem); }

/* Mobile card styles */
.mobile-card { @apply p-4 rounded-xl bg-card border; }

/* Swipe indicator */
.swipe-indicator { @apply w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto; }
```

---

### Phase 2: Marketing Pages Transformation

**2.1 HomepageHero.tsx — Complete Redesign**
- Stack content vertically on mobile (no grid)
- Reduce headline to `text-3xl` from `text-4xl sm:text-5xl lg:text-6xl`
- Make CTAs full-width stacked buttons
- Hide or simplify AIClassificationViz on mobile (too complex)
- Trust badges as horizontal scroll on mobile

**2.2 MarketingHeader.tsx — Premium Mobile Menu**
- Add smooth slide-in animation (not instant opacity)
- Larger touch targets (py-4 instead of py-2)
- Subtle separators between sections
- "Start Free" CTA fixed at bottom of menu
- Add close button with X icon in top-right

**2.3 FeatureGrid.tsx — Single Column Mobile**
- Force single column on mobile (`grid-cols-1`)
- Increase card padding to `p-6`
- Larger icon containers (56px)
- Add subtle horizontal rule between cards

**2.4 FeatureShowcase.tsx — Reversed Layout**
- Always stack vertically on mobile
- Visual/image first, then content
- Reduce bullet point text size to 14px
- Full-width CTA links

**2.5 Samples.tsx — Card Redesign**
- Collapse preview section into expandable accordion
- Make download buttons full-width
- Stack all content vertically
- Add "Swipe for more" hint if multiple samples

**2.6 CTASection.tsx — Mobile Optimization**
- Reduce padding to `py-12` from `py-16 md:py-24`
- Full-width stacked buttons
- Smaller headline text

**2.7 TimelineSection.tsx — Horizontal Scroll**
- Timeline as horizontal scrollable on mobile
- Show current date indicator
- Snap scrolling between dates

**2.8 TestimonialSection.tsx — Carousel**
- Single testimonial with swipe navigation
- Pagination dots at bottom
- Auto-play disabled on mobile (save battery)

**2.9 Other Marketing Pages (Features, Pricing, Guides, etc.)**
- Apply consistent mobile card patterns
- Reduce section padding
- Stack all grids to single column
- Ensure all buttons are tap-friendly

---

### Phase 3: Application Layout System

**3.1 AppLayout.tsx — Mobile Optimization**
- Reduce container padding on mobile (`px-3` from `px-4 sm:px-6`)
- Add bottom navigation bar option for critical actions
- Ensure footer doesn't overlap content

**3.2 MobileNav.tsx — Premium Redesign**
- **New bottom sheet style** instead of right-side slide
- Add user avatar and quick actions at top
- Group navigation into logical sections with headers
- Add badge indicators for notifications/alerts
- Smooth spring animations on open/close
- Swipe down to dismiss

**3.3 AppSidebar.tsx — Touch Improvements**
- Already hidden on mobile, but ensure collapse/expand is smooth
- Add haptic-style visual feedback on nav item tap

---

### Phase 4: Dashboard Transformation

**4.1 Dashboard.tsx — Complete Mobile Redesign**

**Metrics Grid:**
- Single column on mobile (currently forces 2-col)
- Horizontal swipe carousel for metrics instead of grid
- OR: 2x2 grid with much smaller cards

**Progress Cards:**
- Stack vertically with larger progress bars
- Add sparkline indicators

**Charts:**
- Full-width with horizontal scroll if needed
- Reduce chart height on mobile
- Simplified data points

**Timeline & Tasks:**
- Collapsible accordion sections
- Swipe-to-complete for tasks

**4.2 AISystems.tsx — Mobile Card Redesign**

**Current Issues:**
- Cards are functional but not scannable
- Actions require navigation to detail page

**New Design:**
- Larger system icon (48px)
- Status badge as colored left border
- Swipe left to reveal quick actions (Edit, Delete)
- Add chevron-right to indicate tappability
- Pull-to-refresh gesture

**4.3 Vendors.tsx, Evidence.tsx, Controls.tsx, etc.**
- Apply same mobile card pattern
- Consistent swipe actions
- Floating action button (FAB) for "Add New" on mobile

---

### Phase 5: Wizard & Assessment Flows

**5.1 AISystemWizard.tsx — Mobile-First Redesign**

**Progress Indicator:**
- Horizontal progress bar with step count (not individual step icons)
- "Step 3 of 19" text instead of overflowing icons
- Sticky at top of screen

**Form Fields:**
- Full-width inputs with larger touch targets (h-12)
- Improved select dropdowns with sheet/modal picker
- Multi-select as full-screen modal on mobile
- Checkbox groups with larger tap areas

**Navigation:**
- Bottom-fixed navigation bar with Back/Next
- Large buttons (h-12, full width on very small screens)
- Add swipe gesture for step navigation

**5.2 FRIAWizard.tsx — Same Pattern**
- Apply identical mobile patterns
- Risk matrix as scrollable table or card stack

**5.3 ClassificationWizard.tsx**
- Step-by-step with one question per screen on mobile
- Large radio buttons (full-width touch target)
- Progress circle in header

---

### Phase 6: Settings & Forms

**6.1 Settings/General.tsx — Tab Redesign**

**Current Issues:**
- Tabs overflow on mobile
- Forms have inconsistent padding
- Tables are cramped

**New Design:**
- Tabs as horizontal scroll with snap
- OR: Full-width segmented control
- All form sections as collapsible cards
- Team member table as card list

**6.2 All Form Pages (Contact, Auth, etc.)**
- Consistent input sizing (h-12 for touch)
- Labels above inputs (not inline)
- Full-width buttons
- Clear validation error states

---

### Phase 7: Detail Pages & Modals

**7.1 AISystemDetail.tsx — Mobile Layout**
- Tab navigation as sticky horizontal scroll
- Section cards with collapsible headers
- Action buttons in fixed bottom bar
- Evidence attachments as horizontal scroll

**7.2 Dialog/Modal Improvements**
- All dialogs: `max-w-[95vw]` or full-screen on mobile
- Bottom sheet style for confirmations
- Stacked buttons (Cancel below, Action above)
- Add drag-to-dismiss handle

**7.3 Dropdown Menus**
- Convert to bottom sheets on mobile
- Larger touch targets (py-3)
- Clear visual separation

---

### Phase 8: Global Component Updates

**8.1 Button Sizing**
- Add `size="touch"` variant: `h-12 px-6 text-base`
- Use on all mobile-critical actions

**8.2 Input Sizing**
- Add `size="touch"` variant: `h-12 text-base`
- Larger placeholder text

**8.3 Card Component**
- Add `mobile` variant with `p-4` default
- Consistent border-radius (`rounded-xl`)

**8.4 Table Component**
- Auto-convert to cards on mobile via utility class
- `.mobile-cards` class that transforms table to cards

**8.5 Badge Component**
- Slightly larger on mobile for readability
- Minimum 24px height

---

## Technical Implementation

### Files to Create (New)
1. `src/hooks/useTouchDevice.ts` — Detect touch capability
2. `src/components/ui/bottom-sheet.tsx` — Reusable bottom sheet component
3. `src/components/ui/swipe-actions.tsx` — Swipe-to-reveal actions
4. `src/components/ui/mobile-tabs.tsx` — Touch-optimized tab component
5. `src/components/layout/BottomNav.tsx` — Optional bottom navigation
6. `src/components/layout/MobileHeader.tsx` — Simplified mobile header

### Files to Update (Extensive Changes)
1. `src/index.css` — Mobile utility classes, responsive typography
2. `tailwind.config.ts` — Touch-friendly spacing scale
3. `src/components/marketing/MarketingHeader.tsx` — Premium mobile menu
4. `src/components/marketing/hero/HomepageHero.tsx` — Mobile-first hero
5. `src/components/marketing/FeatureGrid.tsx` — Single column mobile
6. `src/components/marketing/FeatureShowcase.tsx` — Stack mobile layout
7. `src/components/layout/MobileNav.tsx` — Bottom sheet redesign
8. `src/components/layout/AppLayout.tsx` — Mobile container padding
9. `src/pages/Dashboard.tsx` — Complete mobile redesign
10. `src/pages/AISystems.tsx` — Mobile card improvements
11. `src/pages/AISystemWizard.tsx` — Mobile wizard flow
12. `src/pages/FRIAWizard.tsx` — Mobile FRIA flow
13. `src/pages/Settings/General.tsx` — Mobile settings tabs
14. `src/pages/marketing/Samples.tsx` — Mobile sample cards
15. `src/components/ui/button.tsx` — Touch size variant
16. `src/components/ui/input.tsx` — Touch size variant
17. All marketing pages (Features, Pricing, FAQ, etc.)
18. All application pages (Evidence, Controls, Policies, etc.)

### Files to Update (Minor Changes)
- All dialog/modal components — Max width and button stacking
- All table-using pages — Mobile card transformation
- All form pages — Input sizing consistency

---

## Quality Benchmarks

### Touch Target Compliance
- All interactive elements ≥ 44x44px
- Adequate spacing between touch targets (8px minimum)

### Performance
- No layout shifts on mobile
- Animations respect `prefers-reduced-motion`
- Lazy load images below fold

### Accessibility
- Focus states visible on all elements
- Screen reader announcements for swipe actions
- Adequate color contrast maintained

### Testing Checklist
- iPhone SE (smallest modern iPhone)
- iPhone 15 Pro Max (largest iPhone)
- Samsung Galaxy S24 (Android reference)
- iPad Mini (small tablet)
- Portrait and landscape orientations

---

## Implementation Order

1. **Foundation** (CSS variables, utility classes, config updates)
2. **Layout Components** (MobileNav, AppLayout, MarketingLayout)
3. **UI Components** (Button, Input, Card variants)
4. **Marketing Hero & Header** (Most visible, highest impact)
5. **Dashboard** (Core app experience)
6. **Wizard Flows** (Critical user journey)
7. **Remaining Marketing Pages** (Batch update)
8. **Remaining App Pages** (Batch update)
9. **Detail Pages & Modals** (Final polish)
10. **Testing & Refinement**

---

## Expected Outcome

After implementation:
- **Marketing pages** will feel like a premium fintech landing page on mobile
- **Dashboard** will be as usable as the desktop version, just differently laid out
- **Wizards** will feel native-app-like with smooth step transitions
- **All touch targets** will be comfortable for one-handed use
- **Load times** will remain fast with optimized assets
- **Accessibility** will meet WCAG 2.1 AA standards

This transforms Klarvo's mobile experience from "it works" to "this is delightful to use."
