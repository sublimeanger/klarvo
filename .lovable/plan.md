
# Animated Product Tour / "How It Works" Walkthrough

This plan creates an engaging, interactive animated walkthrough component that visually demonstrates the Klarvo workflow. The component will be placed on the landing page, replacing or enhancing the current static "How It Works" FeatureGrid section.

---

## Design Approach

I'll create a **step-by-step animated product tour** that shows users the journey from adding their first AI system to generating audit-ready exports. The design will feature:

- **Interactive stepper** with animated transitions between steps
- **Mockup screens** that animate in/out as users progress
- **Progress indicator** showing current step
- **Auto-play option** with manual navigation controls

---

## Component Architecture

### New Component: `ProductWalkthrough.tsx`

```text
Visual Layout:
┌─────────────────────────────────────────────────────────────────────┐
│                     How It Works                                    │
│              Get from zero to compliant in minutes                  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                                                                │ │
│  │                    [Animated Mockup Screen]                    │ │
│  │                    Shows current step UI                       │ │
│  │                                                                │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐   Progress dots / step indicators        │
│  │ 1 │ │ 2 │ │ 3 │ │ 4 │                                           │
│  └───┘ └───┘ └───┘ └───┘                                           │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ [<] │         Step Title & Description              │ [>]     ││
│  │     │         What happens at this step             │         ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

### Step Content (4 Steps)

| Step | Title | Description | Visual |
|------|-------|-------------|--------|
| 1 | Add Your AI Systems | Use our guided wizard to document each AI system. Quick capture takes just 2-4 minutes. | Animated wizard form mockup |
| 2 | Automatic Classification | Our engine screens for prohibited practices, checks Annex III categories, and assigns risk levels. | Classification result card with badges animating in |
| 3 | Close the Gaps | Follow the auto-generated checklist. Upload evidence, assign owners, track progress. | Gap checklist with items checking off |
| 4 | Export & Share | Generate professional PDF reports and ZIP bundles. Ready for auditors in one click. | Export pack preview with download animation |

---

## Technical Implementation

### Animation Strategy

Using the existing CSS animation system (no new dependencies):

1. **Step transitions**: `animate-fade-up` and `animate-fade-out` for entering/exiting
2. **Mockup elements**: Staggered animations with `animation-delay` for progressive reveals
3. **Progress dots**: `animate-scale-in` on active step change
4. **Auto-advance**: `setInterval` with 5-second duration (pausable on hover)
5. **Reduced motion**: Respect `prefers-reduced-motion` via existing utility

### Component Features

- **useState** for current step (0-3)
- **useEffect** for auto-advance timer
- **CSS transitions** for smooth step changes
- **Intersection Observer** to start animation when in viewport
- **Keyboard navigation** (left/right arrows)
- **Touch swipe support** for mobile

### Mockup Screens (Simplified UI Representations)

Each step will have a stylized mockup showing:
- Step 1: Form fields appearing one by one
- Step 2: Risk classification badges with color coding
- Step 3: Checklist items with animated checkmarks
- Step 4: Document preview with export button

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/marketing/ProductWalkthrough.tsx` | **Create** | Main animated walkthrough component |
| `src/components/marketing/WalkthroughStep.tsx` | **Create** | Individual step content with mockup visuals |
| `src/components/marketing/index.ts` | Modify | Export new component |
| `src/pages/marketing/LandingPage.tsx` | Modify | Replace static "How It Works" grid with new walkthrough |

---

## New CSS Additions (Optional)

May add to `index.css` if needed:
- `.walkthrough-mockup` - Base styling for mockup containers
- `.animate-check` - Checkmark animation for step 3
- `.animate-typing` - Simulated typing effect for form fields

---

## Accessibility Considerations

- Keyboard navigation (Tab, Arrow keys)
- Screen reader announcements for step changes
- Pause auto-advance on hover/focus
- `aria-live` region for step content
- Respect `prefers-reduced-motion`

---

## Mobile Responsiveness

- Vertical layout on mobile (stacked mockup and controls)
- Swipe gestures for navigation
- Larger touch targets for step indicators
- Optimized mockup sizing for smaller screens

---

## Technical Summary

- **No new dependencies** - Uses existing Tailwind animations and React hooks
- **~300 lines** of new component code
- **Reusable** - Can be placed on landing page, features page, or docs
- **Performant** - CSS animations, no heavy JavaScript libraries
- **Accessible** - Full keyboard and screen reader support
