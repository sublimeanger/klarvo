

# Phase Z: Dashboard Expiry Alerts & Compliance Reminders

## Overview
Add a proactive "Attention Required" alerts section to the Dashboard that surfaces items needing action before they become compliance gaps. This transforms the dashboard from a passive status view to an actionable compliance cockpit.

## Alert Categories to Display

### 1. Attestations Expiring Soon
- **Query**: `vendor_attestations` where `valid_until` is within next 30 days and status is not "expired"
- **Display**: Vendor name, attestation type, days until expiry
- **Action**: Link to vendor detail page

### 2. Evidence Expiring/Needing Renewal
- **Query**: `evidence_files` where `expires_at` is within next 30 days and status is "approved"
- **Display**: Evidence name, linked AI system/vendor, days until expiry
- **Action**: Link to evidence page

### 3. Controls Due for Review
- **Query**: `control_implementations` where `next_review_date` is within next 14 days or overdue
- **Display**: Control name, AI system, days until/overdue
- **Action**: Link to AI system controls section

### 4. Overdue Tasks (Enhancement)
- **Query**: Already available in metrics (`tasksOverdue`)
- **Display**: Task title, days overdue, priority
- **Action**: Link to task detail

## Technical Implementation

### 1. Create `useComplianceAlerts` Hook
New dedicated hook in `src/hooks/useComplianceAlerts.ts`:
- Fetches expiring attestations, evidence, and controls in parallel
- Returns structured alerts array with severity levels
- Includes counts for summary display

### 2. Create `ComplianceAlerts` Component
New component `src/components/dashboard/ComplianceAlerts.tsx`:
- Card-based alert list with icons by type
- Severity indicators (critical = overdue, warning = <7 days, info = <30 days)
- Collapsible sections by category
- Empty state when no alerts

### 3. Update Dashboard Layout
Modify `src/pages/Dashboard.tsx`:
- Add `ComplianceAlerts` component after the progress section
- Show total alert count in a new metric card
- Link to filtered views for each alert type

## Alert Data Structure

```text
interface ComplianceAlert {
  id: string;
  type: "attestation" | "evidence" | "control" | "task";
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  dueDate: Date;
  daysRemaining: number;  // negative = overdue
  linkTo: string;
  relatedEntity?: {
    type: "vendor" | "ai_system";
    id: string;
    name: string;
  };
}
```

## Severity Thresholds

| Condition | Severity | Color |
|-----------|----------|-------|
| Overdue (past due date) | Critical | Red/Destructive |
| Due within 7 days | Warning | Amber |
| Due within 30 days | Info | Blue |

## UI Design

```text
+---------------------------------------------------+
| Attention Required                    [3 alerts]  |
+---------------------------------------------------+
| [!] CRITICAL                                      |
|   - SOC 2 attestation expired 3 days ago          |
|     Vendor: OpenAI  →                             |
+---------------------------------------------------+
| [△] WARNING (2)                                   |
|   - Evidence "Privacy Policy v2" expires in 5d   |
|     AI System: HR Screening Tool  →              |
|   - Control GOV-02 review due in 6 days          |
|     AI System: Customer Chatbot  →               |
+---------------------------------------------------+
| [i] INFO (4)                                      |
|   ... collapsed by default ...                    |
+---------------------------------------------------+
```

## Files to Create/Modify

| File | Change |
|------|--------|
| `src/hooks/useComplianceAlerts.ts` | **New** - Fetch expiring items hook |
| `src/components/dashboard/ComplianceAlerts.tsx` | **New** - Alert list component |
| `src/pages/Dashboard.tsx` | Add alerts section + "Alerts" metric card |
| `src/hooks/useDashboardMetrics.ts` | Add `alertsCount` to metrics |

## Technical Details

### useComplianceAlerts Hook
```text
Queries to run in parallel:
1. vendor_attestations: 
   - valid_until <= now + 30 days
   - status != 'expired'
   - Join vendor name

2. evidence_files:
   - expires_at <= now + 30 days
   - status = 'approved'
   - Join ai_system/vendor name

3. control_implementations:
   - next_review_date <= now + 14 days
   - status = 'implemented'
   - Join control name + ai_system name
```

### Query Example (Attestations)
```text
SELECT va.*, v.name as vendor_name
FROM vendor_attestations va
JOIN vendors v ON va.vendor_id = v.id
WHERE va.organization_id = $org_id
  AND va.valid_until <= NOW() + INTERVAL '30 days'
  AND va.status != 'expired'
ORDER BY va.valid_until ASC
```

## User Experience Flow

1. User opens Dashboard
2. If alerts exist, "Attention Required" card appears prominently after progress cards
3. Critical alerts are expanded by default
4. Clicking an alert navigates to the relevant page
5. Metric card shows total alert count for quick reference

## Edge Cases

- **No alerts**: Show success message "All compliance items on track"
- **Many alerts**: Limit to 5 per category with "View all" link
- **Null dates**: Skip items without valid_until/expires_at/next_review_date

