

# Production Readiness Plan — Klarvo EU AI Act Compliance Hub

This plan addresses all identified gaps, hardcoded data, placeholder content, and incomplete features to bring the system to production quality.

---

## Overview

Based on my comprehensive audit, the system is approximately **85% production-ready**. The core compliance engine, database schema, authentication, and billing integration are solid. The gaps fall into six categories:

| Category | Items | Priority |
|----------|-------|----------|
| Data & Metrics Fixes | 3 | Critical |
| PDF Export Enhancement | 2 | High |
| Export History Tracking | 2 | High |
| Empty States & UX | 4 | Medium |
| Marketing Placeholders | 4 | Low |
| Polish & Cleanup | 3 | Low |

---

## Phase 1: Critical Data Fixes

### 1.1 Fix Hardcoded Storage Usage

**Location**: `src/pages/Settings/Billing.tsx:87-90`

**Current Issue**:
```typescript
// Mock storage usage (in a real app, fetch from usage_snapshots)
const storageUsedGb = 2.4;
```

**Solution**:
Create a new hook `useStorageUsage` that calculates actual storage from the `evidence_files` table by summing the `file_size` column (which is in bytes).

**Implementation**:
- Create `src/hooks/useStorageUsage.ts`
- Query `evidence_files` table and sum `file_size`
- Convert bytes to GB
- Update `Billing.tsx` to use real data

### 1.2 Fix Hardcoded Export Count

**Location**: `src/pages/Settings/Billing.tsx:259`

**Current Issue**: Hardcoded "0" for exports this month

**Solution**:
Track exports in a new `export_logs` table (see Phase 3) and query monthly count.

### 1.3 Remove Hardcoded Template Size

**Location**: `src/pages/marketing/Templates.tsx:332`

**Current Issue**: Hardcoded "2.4 MB" ZIP file size

**Solution**:
Calculate actual size based on included templates, or remove the size indicator entirely since it's marketing copy.

---

## Phase 2: PDF Export Enhancement

### 2.1 Enhance Evidence Pack PDF (AISystemPDF.tsx)

**Current State**: Basic 1-page PDF with system overview and classification

**Target State**: Multi-page professional evidence pack matching the spec

**New Sections to Add**:

| Section | Content |
|---------|---------|
| Cover Page | Title, org, version, date, confidentiality |
| Table of Contents | Auto-generated |
| Data & Privacy | Personal data processing, DPIA status |
| Human Oversight | Oversight model, operator training |
| Logging & Records | Log storage, retention, access controls |
| Training & Literacy | Relevant staff training status |
| Vendor Information | Vendor details, attestations |
| Evidence Index | Numbered list of all attachments |

**Implementation**:
- Fetch additional related data: controls, training, vendor attestations
- Add dynamic page numbering
- Add proper section breaks
- Increase data interface to include oversight, logging, training fields

### 2.2 Add Organisation Governance Pack PDF

**New File**: `src/components/exports/OrganizationPDF.tsx`

**Content**:
- AI inventory summary
- Governance roles
- Classification distribution
- Training program overview
- Compliance readiness score
- Open gaps summary

---

## Phase 3: Export History & Audit Trail

### 3.1 Create Export Logs Table

**Database Migration**:
```sql
CREATE TABLE export_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  user_id UUID REFERENCES auth.users(id),
  export_type TEXT NOT NULL, -- 'ai_system_pdf', 'ai_system_zip', 'org_pack', 'classification_memo', 'fria_report'
  ai_system_id UUID REFERENCES ai_systems(id),
  file_name TEXT NOT NULL,
  file_size_bytes BIGINT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS policies for org isolation
ALTER TABLE export_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view exports in their org"
  ON export_logs FOR SELECT
  USING (organization_id = get_user_organization_id(auth.uid()));

CREATE POLICY "Authorized users can create export logs"
  ON export_logs FOR INSERT
  WITH CHECK (organization_id = get_user_organization_id(auth.uid()));
```

### 3.2 Log Exports

**Updates to `useExports.ts`**:
- After each successful export, insert a record into `export_logs`
- Capture: export type, system ID, file name, file size, user ID

### 3.3 Display Export History

**Update `src/pages/Exports.tsx`**:
- Replace placeholder with actual export history table
- Show: date, type, system name, exported by, file size
- Add re-download capability (if files are cached)

---

## Phase 4: Empty States & UX Improvements

### 4.1 New Account Experience

**Issue**: New users see empty dashboards with zeros

**Solution**: Add contextual empty states with CTAs

**Files to Update**:
- `src/pages/Dashboard.tsx` — Add "Welcome" card when `totalSystems === 0`
- `src/pages/AISystems.tsx` — Already has good empty state, verify it works
- `src/pages/Evidence.tsx` — Add empty state with upload CTA
- `src/pages/Tasks.tsx` — Add empty state explaining tasks are auto-generated

**Empty State Pattern**:
```tsx
{metrics.totalSystems === 0 && (
  <Card className="border-primary/30 bg-primary/5">
    <CardContent className="py-12 text-center">
      <Rocket className="h-12 w-12 mx-auto mb-4 text-primary" />
      <h3 className="text-xl font-semibold mb-2">Welcome to Klarvo!</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Start by adding your first AI system. Our wizard will guide you through 
        classification in under 10 minutes.
      </p>
      <Button asChild>
        <Link to="/ai-systems/new">
          <Plus className="mr-2 h-4 w-4" />
          Add Your First AI System
        </Link>
      </Button>
    </CardContent>
  </Card>
)}
```

### 4.2 Demo Data Option (Optional Enhancement)

**Add to Onboarding**:
- Checkbox: "Add sample AI system to explore features"
- Creates a pre-configured sample system with classification

---

## Phase 5: Marketing Content Cleanup

### 5.1 Update Logo Cloud

**File**: `src/components/marketing/LogoCloud.tsx`

**Options**:
1. **Preferred**: Remove component entirely until real logos available
2. **Alternative**: Change to industry icons (Healthcare, Finance, Tech, etc.) with "Trusted across industries" messaging
3. **Keep but improve**: Use generic "Fortune 500", "SME", "Startup" text badges

**Recommended Implementation**:
Replace fake company names with industry categories:
```typescript
const industryLogos = [
  { name: "Financial Services", icon: "🏦" },
  { name: "Healthcare", icon: "🏥" },
  { name: "Technology", icon: "💻" },
  { name: "Manufacturing", icon: "🏭" },
  { name: "Retail", icon: "🛒" },
  { name: "Government", icon: "🏛️" },
];
```

### 5.2 Update Testimonials

**File**: `src/components/marketing/TestimonialSection.tsx`

**Options**:
1. Remove component until real testimonials exist
2. Convert to "What Users Say" with generic industry personas (no fake names)
3. Replace with stats/benefits section

**Recommended**: Convert to anonymous industry quotes without fake names

### 5.3 Feature Showcase Visuals

**File**: `src/components/marketing/FeatureShowcase.tsx`

**Current**: Animated rings placeholder

**Solution**: Create actual product screenshot mockups or stylized UI illustrations

### 5.4 Coming Soon Items

**Files with "coming soon"**:
- `src/pages/legal/Security.tsx:69` — Bug bounty program
- `src/pages/use-cases/Fintech.tsx:264` — SOC 2 Type II

**Solution**: Either remove these claims or mark as "roadmap" items in a dedicated section

---

## Phase 6: Polish & Cleanup

### 6.1 Remove Placeholder Page Routes

**Current**: Generic `Placeholder.tsx` used for "Under Construction" pages

**Action**: Identify which routes still use this and either:
- Build the actual feature
- Remove the route from navigation
- Replace with a proper "Coming Soon" page with expected timeline

### 6.2 Update ZIP Folder Structure

**Current ZIP Structure**:
```
System_Name/
  AI_System_Evidence_Pack.pdf
  Evidence/
    file1.pdf
    file2.png
```

**Target Structure** (match spec):
```
EU-AI-Act_EvidencePack_[Org]_[System]_[Date]/
  00_Executive/
    Executive_Summary.pdf
  01_Inventory/
    Inventory_Record.pdf
  02_Classification/
    Classification_Memo.pdf
    Prohibited_Screening.pdf
  03_Transparency_Article50/
    (relevant disclosures)
  04_HighRisk_Deployer_Article26/
    (if applicable)
  05_Evidence/
    (evidence files by category)
  Evidence_Index.csv
```

### 6.3 Add Version Number

**Location**: Footer of app layout

**Add**: Version number and build date for audit purposes

---

## Implementation Priority & Effort Estimates

| Task | Priority | Effort | Dependencies |
|------|----------|--------|--------------|
| 1.1 Storage Usage Hook | Critical | 1 hour | None |
| 3.1 Export Logs Table | Critical | 30 min | DB migration |
| 3.2 Log Exports | High | 1 hour | 3.1 |
| 3.3 Export History UI | High | 2 hours | 3.2 |
| 1.2 Export Count | High | 30 min | 3.1 |
| 2.1 Enhanced PDF | High | 4 hours | None |
| 4.1 Empty States | Medium | 2 hours | None |
| 5.1 Logo Cloud | Low | 30 min | None |
| 5.2 Testimonials | Low | 30 min | None |
| 5.4 Coming Soon | Low | 15 min | None |
| 6.2 ZIP Structure | Low | 2 hours | None |
| 6.3 Version Number | Low | 15 min | None |

**Total Estimated Effort**: ~14 hours

---

## Testing Checklist

After implementation, verify:

- [ ] New user signup flow completes without errors
- [ ] Dashboard shows real metrics (not hardcoded)
- [ ] Storage usage reflects actual evidence file sizes
- [ ] Export history logs appear after PDF/ZIP download
- [ ] Export count updates correctly in billing
- [ ] PDF exports contain all expected sections
- [ ] ZIP structure matches specification
- [ ] Empty states show appropriate CTAs
- [ ] Marketing pages have no fake company names
- [ ] All subscription tiers correctly gate features

---

## Database Changes Summary

**New Table**:
- `export_logs` — Track all PDF/ZIP exports for audit trail

**No Changes Needed**:
- `evidence_files` already has `file_size` column
- `usage_snapshots` exists but is underutilized

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/hooks/useStorageUsage.ts` | Calculate real storage from evidence_files |
| `src/hooks/useExportHistory.ts` | Query export_logs table |
| `src/components/exports/OrganizationPDF.tsx` | Org governance pack PDF |
| `src/components/dashboard/WelcomeCard.tsx` | Empty state for new users |

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Settings/Billing.tsx` | Use real storage & export counts |
| `src/pages/Exports.tsx` | Add export history table |
| `src/hooks/useExports.ts` | Log exports to database |
| `src/components/exports/AISystemPDF.tsx` | Expand to multi-page |
| `src/pages/Dashboard.tsx` | Add welcome card for new users |
| `src/components/marketing/LogoCloud.tsx` | Replace fake company names |
| `src/components/marketing/TestimonialSection.tsx` | Anonymize or remove |

