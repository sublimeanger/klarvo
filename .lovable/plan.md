
# Feature Build Plan: Expanded AI System Intake Wizard (Full Assessment Mode)

## Current State

The AI System Wizard currently has only **4 steps** (Quick Capture mode):
1. Basics (name, description, department, status)
2. Vendor selection
3. Ownership
4. Done

However, the EU AI Act Compliance Hub specification requires a **comprehensive 16-step Full Assessment wizard** that captures all regulatory-required fields.

---

## Implementation Plan

### Overview

We will expand the existing `AISystemWizard.tsx` to support both modes:
- **Quick Capture** (current 4 steps) - for fast inventory capture
- **Full Assessment** (16 steps) - for complete EU AI Act regulatory classification

Users will select their mode at the start, and the wizard will adapt accordingly.

---

## Technical Implementation

### Step 0: Mode Selection & Basic Identity
**Fields to add:**
- Wizard mode toggle (Quick Capture / Full Assessment)
- System name, internal ID, status
- Primary owner, backup owner, department

### Step 1: Scope & Geography
**New fields:**
- Deployment regions (EU, UK, US, Other)
- EU countries where deployed (multi-select)
- Internal user groups (multi-select)
- Affected persons (Customers, Employees, Candidates, etc.)
- Is customer-facing? (Y/N)
- Workplace impact? (Y/N)
- Legal/significant effects? (Y/N)
- One-sentence summary

### Step 2: Value Chain Role
**New fields:**
- Built by organization? (Fully in-house / Partially / External)
- How obtained? (SaaS, API, Open-source, etc.)
- Your role (Deployer / Provider / Both / Importer / Distributor)
- If Provider: offered externally? (Y/N)
- Vendor selection (existing flow)
- Foundation model used (text)
- Contract/terms link

### Step 3: AI System Definition Test
**New fields:**
- Does it infer outputs from inputs? (Y/N/Unsure)
- Output types (Predictions, Recommendations, Decisions, etc.)
- Operates with autonomy? (Y/N/Unsure)
- Adapts/learns after deployment? (Y/N/Unknown)
- Technical approach (ML, Deep learning, LLM, etc.)
- **Conclusion**: Likely AI system / Likely not / Needs review
- Rationale (text)
- Reviewer selection
- Confidence level

### Step 4: Use Case & Functionality
**New fields:**
- Purpose category (HR, Finance, Customer Support, etc.)
- Workflow description
- Output type (Recommend / Decide / Automate / Generate)
- Where outputs are used (Dashboard, API, Email, etc.)
- Human involvement model (HITL / HOTL / HOOTL)
- Override capability description
- Usage frequency
- Scale of impact (people/month)

### Step 5: Prohibited Practices Screening (Article 5)
**New fields (8 screening questions):**
- Subliminal/manipulative techniques?
- Exploitation of vulnerabilities?
- Social scoring?
- Criminal risk profiling?
- Untargeted facial recognition scraping?
- Workplace/education emotion inference?
- Biometric categorisation of protected characteristics?
- Real-time remote biometric ID in public spaces?
- **Conclusion**: No indicators / Potential prohibited / Needs review

### Step 6: High-Risk Screening (Annex III)
**New fields (9 screening questions):**
- Biometric identification/categorisation?
- Critical infrastructure?
- Education/vocational training?
- Employment/worker management?
- Access to essential services?
- Law enforcement/public security?
- Migration/asylum/border control?
- Administration of justice/democratic processes?
- Safety component of regulated product?
- **Result**: Not high-risk / Potential high-risk (Annex III) / Potential (regulated product) / Needs review

### Step 7: Transparency Obligations (Article 50)
**New fields:**
- Direct interaction with people? (Y/N)
- If yes: obvious it's AI? (Y/N/Unsure)
- Generates synthetic content? (Y/N)
- If yes: outputs marked as AI-generated? (Y/N/Unknown)
- Emotion recognition/biometric categorisation? (Y/N)
- Deepfake generation? (Y/N)
- AI-generated public interest text? (Y/N)
- **Status**: Not applicable / Implemented / Gaps exist
- Evidence upload for disclosures

### Step 8: Data & Privacy
**New fields:**
- Processes personal data? (Y/N/Unknown)
- Special category data? (Y/N/Unknown)
- Involves minors? (Y/N/Unknown)
- Data sources (multi-select)
- Input data under deployer control? (Y/N/Partly)
- Retention periods for inputs and outputs
- DPIA status (Not needed / Planned / Completed / Unknown)
- DPIA link/upload
- Privacy owner selection

### Step 9: Human Oversight & Operating Model
**New fields:**
- Oversight model (HITL / HOTL / HOOTL)
- Oversight owner (person)
- Authority to pause/stop? (Y/N)
- Required training/competence (text)
- Operators trained today? (Y/Partially/N)
- Oversight SOP exists? (Exists / Draft / Not started)
- SOP upload
- Monitoring plan exists? (Exists / Draft / Not started)
- What is monitored? (Accuracy, Drift, Bias, etc.)

### Step 10: Logging & Record-Keeping
**New fields:**
- System generates automatic logs? (Y/N/Unknown)
- Log storage location
- Log access control (who has access)
- Log retention period
- Can export logs on demand? (Y/N/Unknown)
- Log evidence upload
- For high-risk: confirm minimum 6-month retention

### Step 11: Risk & Incident Handling
**New fields:**
- Incident response process exists? (Y/Partially/N)
- Severity levels defined? (Y/N)
- Internal notification list
- External notification requirements
- Can suspend system quickly? (Y immediately / Y but slow / N / Unknown)
- Incident evidence upload

### Step 12: Workplace-Specific Obligations
**Fields (conditional on workplace use):**
- Used in workplace context? (Y/N)
- High-risk candidate? (auto from Step 6)
- Worker notification prepared? (Implemented / Planned / Not started)
- Worker notice upload

### Step 13: Public Authority Registration
**Fields:**
- Is public authority? (Y/N)
- Provides public service? (Y/N)
- Registration status (Registered / Not registered / Vendor responsible / Unknown)
- Registration evidence upload

### Step 14: Training & AI Literacy
**New fields:**
- Staff roles operating system (multi-select)
- AI literacy training exists? (Y/Partially/N)
- Training completion status (percentage bands)
- Training material/completion report upload

### Step 15: FRIA Trigger Check
**Fields:**
- High-risk candidate? (auto, read-only)
- Meets FRIA trigger conditions? (auto-suggest based on earlier answers)
- FRIA status (Not required / Required-planned / In progress / Completed)
- Create FRIA now (button)

### Step 16: Review & Sign-Off
**Fields:**
- Final classification (auto-calculated, editable)
- Reviewer sign-off (person)
- Sign-off date
- Notes
- **Auto-generated outputs:**
  - Classification Memo (PDF)
  - Gap Checklist
  - Task Plan
  - Evidence Requests

---

## Database Changes

Add new columns to `ai_systems` table:
```sql
-- Geography & Scope
deployment_regions TEXT[],
eu_countries TEXT[],
affected_groups TEXT[],
is_customer_facing BOOLEAN,
has_workplace_impact BOOLEAN,
has_legal_effects BOOLEAN,
summary TEXT,

-- Value Chain
built_internally TEXT, -- 'fully' | 'partially' | 'external'
acquisition_method TEXT[],
value_chain_role TEXT[],
is_externally_offered BOOLEAN,
foundation_model TEXT,
contract_url TEXT,

-- AI Definition Test
ai_definition_result TEXT, -- 'likely_ai' | 'likely_not' | 'needs_review'
ai_definition_rationale TEXT,
ai_definition_confidence TEXT,

-- Use Case
purpose_category TEXT,
workflow_description TEXT,
output_action_type TEXT,
output_destinations TEXT[],
human_involvement TEXT,
override_capability TEXT,
usage_frequency TEXT,
impact_scale INTEGER,

-- Human Oversight
oversight_model TEXT,
oversight_owner_id UUID,
has_stop_authority BOOLEAN,
competence_requirements TEXT,
operators_trained TEXT,
oversight_sop_status TEXT,
monitoring_plan_status TEXT,
monitoring_metrics TEXT[],

-- Logging
has_automatic_logs TEXT,
log_storage_location TEXT,
log_access_roles TEXT[],
log_retention_period TEXT,
can_export_logs TEXT,
log_retention_6_months_confirmed BOOLEAN,

-- Incident Handling
incident_process_status TEXT,
severity_levels_defined BOOLEAN,
internal_notification_list TEXT[],
external_notification_requirements TEXT,
can_suspend_quickly TEXT,

-- Workplace
worker_notification_status TEXT,

-- Public Authority
is_public_authority BOOLEAN,
provides_public_service BOOLEAN,
registration_status TEXT,

-- Training
staff_roles TEXT[],
training_exists TEXT,
training_completion_status TEXT,

-- FRIA
fria_trigger_status TEXT,
fria_status TEXT,

-- Sign-off
final_classification TEXT,
signoff_reviewer_id UUID,
signoff_date TIMESTAMPTZ,
signoff_notes TEXT
```

---

## File Changes

### 1. `src/pages/AISystemWizard.tsx`
- Expand from 4 steps to support 16-step Full Assessment mode
- Add mode selection at start
- Add all new form fields per step
- Add progress indicator with step names
- Add step validation logic
- Auto-calculate classification based on answers

### 2. `src/hooks/useAISystems.ts`
- Update `useCreateAISystem` to accept all new fields
- Add validation for Full Assessment submissions

### 3. Database Migration
- Add all new columns to `ai_systems` table
- Add new enums for dropdowns

### 4. `src/integrations/supabase/types.ts`
- Will auto-update after migration

---

## Implementation Phases

### Phase 1: Database Schema (First)
- Create migration with all new columns
- Use nullable fields to maintain backward compatibility

### Phase 2: Mode Selection & Steps 0-4
- Add mode toggle
- Implement Geography/Scope step
- Implement Value Chain step
- Implement AI Definition Test step
- Implement Use Case step

### Phase 3: Screening Steps 5-7
- Prohibited Practices screening
- High-Risk screening
- Transparency obligations

### Phase 4: Operational Steps 8-11
- Data & Privacy
- Human Oversight
- Logging
- Incident Handling

### Phase 5: Compliance Steps 12-16
- Workplace obligations
- Public authority registration
- Training & AI literacy
- FRIA trigger check
- Review & sign-off with auto-generated outputs

---

## UX Considerations

1. **Progressive disclosure** - Only show relevant steps based on previous answers
2. **Save progress** - Allow saving partial completion
3. **Skip logic** - If "Not an AI system", end wizard early
4. **Help text** - Explain "Why we ask this" for each field
5. **Mobile responsive** - Works on all screen sizes
6. **Time estimate** - Show "~15-20 minutes" for Full Assessment

---

## Auto-Generated Outputs

Upon completion of Full Assessment:

1. **Classification Memo PDF** - Summary of all answers and risk determination
2. **Gap Checklist** - Controls missing + evidence missing
3. **Task Plan** - Auto-created tasks with owners and due dates
4. **Evidence Requests** - Assigned to specific people
