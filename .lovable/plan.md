
# Backend UX Audit: Clickable Elements & Navigation Fixes

## Issues Identified

### Issue 1: Broken Navigation Link
The header links to `/compliance-software` but the actual route is `/eu-ai-act-compliance-software`.

**File**: `src/components/marketing/MarketingHeader.tsx`
- Line 18: `href: "/compliance-software"` → should be `href: "/eu-ai-act-compliance-software"`

### Issue 2: Dashboard Metric Cards Not Clickable
Looking at the screenshot, users expect to click on:
- **Total AI Systems** → Navigate to `/ai-systems`
- **High-Risk** → Navigate to `/ai-systems?risk=high`
- **Pending** → Navigate to `/assessments` or `/ai-systems?status=pending`
- **Open Tasks** → Navigate to `/tasks`
- **Alerts** → Navigate to compliance alerts section or open alerts panel

Currently, `MetricCard` is just a `<div>` with no navigation capability.

---

## Solution Design

### Part A: Fix Broken Nav Link
Simple one-line fix in `MarketingHeader.tsx`.

### Part B: Make MetricCard Clickable
Enhance the `MetricCard` component to accept an optional `href` prop:

```typescript
interface MetricCardProps {
  // ...existing props
  href?: string;  // Optional navigation link
}

export function MetricCard({ href, ...props }: MetricCardProps) {
  const content = (
    <div className="...existing classes...">
      {/* existing content */}
    </div>
  );

  // If href provided, wrap in Link
  if (href) {
    return (
      <Link to={href} className="block cursor-pointer">
        {content}
      </Link>
    );
  }
  
  return content;
}
```

### Part C: Update Dashboard to Pass Hrefs
Add navigation targets to each metric card in `Dashboard.tsx`:

| Metric Card | Navigation Target |
|-------------|-------------------|
| Total AI Systems | `/ai-systems` |
| High-Risk | `/ai-systems?classification=high_risk` |
| Pending | `/ai-systems?classification=pending` |
| Open Tasks | `/tasks` |
| Alerts | `/tasks?filter=overdue` (or scroll to alerts) |

---

## Files to Modify

### 1. `src/components/marketing/MarketingHeader.tsx`
- Line 18: Change `"/compliance-software"` → `"/eu-ai-act-compliance-software"`

### 2. `src/components/ui/metric-card.tsx`
- Add optional `href` prop
- Import `Link` from react-router-dom
- Conditionally wrap content in `<Link>` when href is provided
- Add appropriate cursor and hover states for clickable cards

### 3. `src/pages/Dashboard.tsx`
- Add `href` prop to each MetricCard:
  - Total AI Systems: `href="/ai-systems"`
  - High-Risk: `href="/ai-systems?classification=high_risk"`
  - Pending: `href="/ai-systems?classification=pending"`
  - Open Tasks: `href="/tasks"`
  - Alerts: `href="/tasks?filter=overdue"` or implement scroll-to behavior

---

## Additional UX Improvements (For Discussion)

Beyond the immediate fixes, there are broader dashboard clickability opportunities:

### Quick Win Improvements
1. **Classification Breakdown bars** → Click to filter AI Systems by that risk level
2. **Progress cards** (Classification, Controls, Attestations, Evidence) → Click to navigate to respective pages
3. **Discovery Stats** (if visible on dashboard) → Already links to Discovery page? Add if not

### Future Consideration
- Add visual affordance (subtle arrow icon or "View all" text) to indicate clickability
- Consider hover state that clearly shows "click to explore" intent
- Audit all stat/metric displays across the app for consistency

---

## Implementation Order

1. **Fix the nav link** (immediate, prevents 404)
2. **Enhance MetricCard** with href support
3. **Update Dashboard** metric cards with navigation
4. **Test end-to-end** navigation from dashboard to filtered views

---

## Technical Notes

- Using `react-router-dom`'s `<Link>` component for client-side navigation
- Query params (e.g., `?classification=high_risk`) require corresponding filter logic on the AISystems page
- May need to verify that AISystems page respects URL query params for filtering
