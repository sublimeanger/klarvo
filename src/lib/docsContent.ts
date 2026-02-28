import { 
  Zap, Cpu, Shield, Lock, FileCheck, Download, Users, 
  Settings, AlertTriangle, GraduationCap, Building2
} from "lucide-react";

export interface DocArticle {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  categorySlug: string;
  content: string;
  relatedArticles?: string[];
  lastUpdated?: string;
}

export interface DocCategory {
  slug: string;
  title: string;
  description: string;
  icon: typeof Zap;
  articles: Array<{
    slug: string;
    title: string;
    time: string;
  }>;
}

export const docCategories: DocCategory[] = [
  {
    slug: "getting-started",
    icon: Zap,
    title: "Getting Started",
    description: "New to Klarvo? Start here to set up your account and add your first AI system.",
    articles: [
      { title: "Quick Start Guide", time: "5 min", slug: "quick-start" },
      { title: "Understanding the Dashboard", time: "3 min", slug: "dashboard-overview" },
      { title: "Adding Your First AI System", time: "8 min", slug: "first-ai-system" },
      { title: "Inviting Team Members", time: "3 min", slug: "invite-team" },
    ]
  },
  {
    slug: "ai-system-inventory",
    icon: Cpu,
    title: "AI System Inventory",
    description: "Learn how to document, categorize, and manage your AI systems effectively.",
    articles: [
      { title: "Using the AI System Wizard", time: "10 min", slug: "ai-system-wizard" },
      { title: "Quick Capture vs Full Assessment", time: "4 min", slug: "capture-modes" },
      { title: "Assigning Ownership & Oversight", time: "5 min", slug: "ownership-oversight" },
      { title: "Vendor & Model Provider Tracking", time: "6 min", slug: "vendor-tracking" },
      { title: "Bulk Import via CSV", time: "5 min", slug: "bulk-import" },
    ]
  },
  {
    slug: "classification",
    icon: Shield,
    title: "Classification & Risk Assessment",
    description: "Understand how to classify AI systems and assess risk levels under the EU AI Act.",
    articles: [
      { title: "The Classification Engine Explained", time: "8 min", slug: "classification-engine" },
      { title: "AI System Definition Test", time: "6 min", slug: "definition-test" },
      { title: "Prohibited Practices Screening", time: "7 min", slug: "prohibited-screening" },
      { title: "High-Risk Categories (Annex III)", time: "10 min", slug: "high-risk-categories" },
      { title: "Transparency Obligations", time: "6 min", slug: "transparency-obligations" },
      { title: "Classification Memos & Sign-off", time: "4 min", slug: "classification-memos" },
    ]
  },
  {
    slug: "fria",
    icon: Lock,
    title: "FRIA (Fundamental Rights Impact Assessment)",
    description: "Complete guide to conducting and documenting FRIAs for high-risk AI systems.",
    articles: [
      { title: "When is FRIA Required?", time: "5 min", slug: "fria-requirements" },
      { title: "FRIA Wizard Walkthrough", time: "12 min", slug: "fria-wizard" },
      { title: "Identifying Fundamental Rights Risks", time: "8 min", slug: "fria-risks" },
      { title: "Mitigation Measures & Oversight", time: "7 min", slug: "fria-mitigation" },
      { title: "Generating FRIA Reports", time: "4 min", slug: "fria-reports" },
    ]
  },
  {
    slug: "evidence",
    icon: FileCheck,
    title: "Evidence & Documentation",
    description: "Organize, approve, and manage compliance evidence and documentation.",
    articles: [
      { title: "Evidence Vault Overview", time: "5 min", slug: "evidence-vault" },
      { title: "Uploading & Organizing Evidence", time: "6 min", slug: "uploading-evidence" },
      { title: "Approval Workflows", time: "5 min", slug: "approval-workflows" },
      { title: "Evidence Expiration & Renewal", time: "4 min", slug: "evidence-expiration" },
      { title: "Linking Evidence to Controls", time: "5 min", slug: "linking-evidence" },
    ]
  },
  {
    slug: "exports",
    icon: Download,
    title: "Exports & Reports",
    description: "Generate audit-ready PDF reports and evidence pack ZIP bundles.",
    articles: [
      { title: "Export Pack Overview", time: "4 min", slug: "export-overview" },
      { title: "Classification Memo Exports", time: "3 min", slug: "classification-exports" },
      { title: "FRIA Report Exports", time: "3 min", slug: "fria-exports" },
      { title: "Full Evidence Pack (ZIP)", time: "5 min", slug: "evidence-pack" },
      { title: "Organization-Wide Reports", time: "4 min", slug: "org-reports" },
    ]
  },
  {
    slug: "team",
    icon: Users,
    title: "Team & Collaboration",
    description: "Manage team members, roles, and permissions across your organization.",
    articles: [
      { title: "User Roles & Permissions", time: "5 min", slug: "roles-permissions" },
      { title: "Assigning Task Owners", time: "4 min", slug: "task-owners" },
      { title: "Activity Feed & Audit Trail", time: "4 min", slug: "activity-feed" },
      { title: "Evidence Request Workflows", time: "5 min", slug: "evidence-requests" },
    ]
  },
  {
    slug: "incidents",
    icon: AlertTriangle,
    title: "Incidents & Monitoring",
    description: "Log incidents, track monitoring events, and manage change processes.",
    articles: [
      { title: "Incident Management Overview", time: "5 min", slug: "incident-management" },
      { title: "Creating Incident Records", time: "4 min", slug: "creating-incidents" },
      { title: "Monitoring Events", time: "4 min", slug: "monitoring-events" },
      { title: "Reassessment Triggers", time: "5 min", slug: "reassessment-triggers" },
    ]
  },
  {
    slug: "training",
    icon: GraduationCap,
    title: "Training & AI Literacy",
    description: "Track AI literacy training requirements and team certifications.",
    articles: [
      { title: "AI Literacy Requirements (Article 4)", time: "6 min", slug: "ai-literacy" },
      { title: "Creating Training Programs", time: "5 min", slug: "training-programs" },
      { title: "Tracking Completion", time: "4 min", slug: "training-completion" },
      { title: "Training Reports", time: "3 min", slug: "training-reports" },
    ]
  },
  {
    slug: "vendors",
    icon: Building2,
    title: "Vendor Management",
    description: "Track AI vendors, contracts, and due diligence requirements.",
    articles: [
      { title: "Vendor Profiles", time: "4 min", slug: "vendor-profiles" },
      { title: "Due Diligence Checklists", time: "5 min", slug: "due-diligence" },
      { title: "Vendor Attestations", time: "5 min", slug: "vendor-attestations" },
      { title: "Contract Management", time: "4 min", slug: "contract-management" },
    ]
  },
  {
    slug: "settings",
    icon: Settings,
    title: "Account & Settings",
    description: "Manage your account, organization settings, and billing.",
    articles: [
      { title: "Organization Settings", time: "4 min", slug: "org-settings" },
      { title: "Notification Preferences", time: "3 min", slug: "notifications" },
      { title: "Billing & Subscriptions", time: "4 min", slug: "billing" },
      { title: "Data Export & Privacy", time: "5 min", slug: "data-privacy" },
    ]
  },
];

// Full article content database
export const docArticles: Record<string, DocArticle> = {
  // =============================================
  // GETTING STARTED
  // =============================================
  "quick-start": {
    slug: "quick-start",
    title: "Quick Start Guide",
    description: "Get up and running with Klarvo in under 10 minutes. This guide walks you through creating your account, setting up your organization, adding your first AI system, and understanding the core compliance workflow.",
    readTime: "5 min",
    category: "Getting Started",
    categorySlug: "getting-started",
    lastUpdated: "2026-02-15",
    relatedArticles: ["dashboard-overview", "first-ai-system", "invite-team"],
    content: `
## Welcome to Klarvo

Klarvo is the EU AI Act compliance platform built for SMEs. It turns the complexity of the regulation into guided workflows, auto-generated checklists, and audit-ready evidence packs — so you can demonstrate compliance without hiring a dedicated legal team.

This guide takes you from sign-up to your first classified AI system in under 10 minutes.

### Step 1: Create Your Organization

After signing up, you'll be prompted to create your organization profile. This is the workspace where all your AI systems, evidence, policies, and compliance data live.

1. **Organization Name**: Enter your legal entity name
2. **Industry Sector**: Select your primary industry — this tailors risk recommendations and template language
3. **Company Size**: Choose your employee count range (1–10, 11–50, 51–250, 250+)
4. **EU Presence**: Indicate the EU member states where you operate — this determines which national market surveillance authorities are relevant

> 💡 **Tip**: You can update organization settings at any time in **Settings → General**. Getting these right from the start means better-tailored templates, smarter classification suggestions, and more relevant compliance alerts.

### Step 2: Understand the Dashboard

Your **Dashboard** is the compliance command center. At a glance you'll see:

- **AI Systems Overview**: Total count with breakdown by classification level (Minimal, Limited, High-Risk Candidate, Blocked)
- **Compliance Alerts**: Upcoming deadlines, evidence renewals, overdue tasks, and systems flagged for reassessment
- **Risk Distribution Chart**: Pie chart of your AI portfolio by risk level — helps you prioritize
- **Department Risk Heatmap**: Which teams carry the most high-risk systems
- **Audit Readiness Score**: A composite percentage based on evidence completeness, control implementation, task completion, and training coverage

Aim for **80%+** on the Audit Readiness Score to be considered audit-ready. Most organizations start below 30% and improve rapidly once they begin systematically uploading evidence and completing classification.

### Step 3: Add Your First AI System

The **AI System Inventory** is the heart of Klarvo. Every compliance artifact — classifications, evidence, controls, tasks — connects back to an AI system record.

1. Navigate to **AI Systems** in the sidebar
2. Click **Add AI System**
3. Choose your intake mode:
   - **Quick Capture** (2–4 minutes) — Captures name, owner, vendor, and basic scope. Creates follow-up tasks for the rest. Best for initial inventory building.
   - **Full Assessment** (10–20 minutes) — Walks through all 20 steps including prohibited practices screening, high-risk classification, transparency checks, and oversight mapping. Best for production systems you need classified immediately.

### Step 4: Complete the Classification

The AI System Wizard guides you through a structured questionnaire aligned to the EU AI Act:

1. **Basic Information**: Name, internal ID, department, lifecycle status
2. **Vendor & Supply Chain**: Third-party provider details, contract links, foundation model identification
3. **Scope & Impact**: Deployment regions, affected groups, customer-facing vs. internal
4. **Value Chain Role**: Are you a deployer (using AI built by others), provider (building/selling AI), or both?
5. **AI Definition Test**: Does this qualify as an "AI system" under the Act's definition? (Commission guidelines referenced)
6. **Prohibited Practices Screening**: Eight critical Article 5 checks — any flag blocks further classification until legal review
7. **High-Risk Screening**: Nine Annex III category checks (employment, education, credit, etc.)
8. **Transparency Obligations**: Article 50 disclosure requirements
9. **Data & Privacy**: Personal data processing, DPIA linkage
10. **Human Oversight**: HITL/HOTL/HOOTL model, oversight authority
11. **Review & Sign-off**: Reviewer assignment and classification confirmation

### Step 5: Review Your Classification

After completing the wizard, Klarvo auto-generates:

- **Risk Level Classification**: Minimal, Limited Risk (transparency obligations), High-Risk Candidate (full Article 26 deployer duties), or Blocked (potential prohibited practice)
- **Classification Memo PDF**: A one-page auditable document with inputs, result, confidence level, reviewer, and rationale
- **Gap Checklist**: Every missing control and evidence item, mapped to applicable obligations
- **Task Plan**: Auto-created tasks with owners and suggested due dates
- **Evidence Requests**: Specific documents you need to upload (vendor docs, oversight SOPs, training records)

### Next Steps

Now that you've added your first AI system:

- [Understanding the Dashboard](/docs/dashboard-overview) — Deep dive into every metric and chart
- [Inviting Team Members](/docs/invite-team) — Assign system owners, oversight roles, and reviewers
- [Evidence Vault Overview](/docs/evidence-vault) — Start uploading and organizing compliance documentation
- [The Classification Engine Explained](/docs/classification-engine) — Understand how risk levels are determined

---

## Need Help?

- Check our [FAQ](/faq) for common questions
- [Contact Support](/contact) for personalized assistance
- [Explore Features](/features) to see a full capability overview
    `
  },
  "dashboard-overview": {
    slug: "dashboard-overview",
    title: "Understanding the Dashboard",
    description: "A comprehensive guide to the Klarvo dashboard — every metric, chart, alert, and widget explained with practical guidance on how to interpret and act on your compliance data.",
    readTime: "5 min",
    category: "Getting Started",
    categorySlug: "getting-started",
    lastUpdated: "2026-02-15",
    relatedArticles: ["quick-start", "first-ai-system", "export-overview"],
    content: `
## Dashboard Overview

The Klarvo Dashboard is your compliance command center, providing real-time visibility into your EU AI Act readiness across every AI system in your organization.

### Key Metrics

#### AI Systems Count

The headline metric shows total AI systems in your inventory, broken down by classification:

| Classification | What It Means | What You Should Do |
|---------------|---------------|-------------------|
| **Minimal Risk** | No specific EU AI Act obligations beyond good practice | Document for completeness; apply internal governance |
| **Limited Risk** | Transparency obligations apply (Article 50) | Implement required disclosures; upload notice evidence |
| **High-Risk Candidate** | Full deployer duties under Article 26 | Complete all deployer controls, oversight plans, FRIA if applicable |
| **Blocked** | Potential prohibited practice flagged under Article 5 | Stop use immediately; escalate to legal review |
| **Needs Review** | Quick Capture systems awaiting full classification | Prioritize completing their Full Assessment |

Systems showing "Needs Review" are the most common gap — they represent Quick Capture entries that haven't been fully classified yet. The dashboard prominently counts these so you can schedule completion.

#### Audit Readiness Score

This composite percentage reflects your overall compliance health, calculated from four dimensions:

- **Evidence Completeness** (25%): Percentage of required evidence artifacts uploaded and approved across all systems
- **Control Implementation** (25%): Percentage of applicable controls marked "Implemented" with linked evidence
- **Task Completion** (25%): Percentage of auto-generated and manual compliance tasks completed on time
- **Training Coverage** (25%): Percentage of staff assigned to AI-operating roles who have completed required AI literacy training

> 🎯 **Benchmark**: Aim for 80%+ to be considered audit-ready. Most organizations start at 15–30% and reach 70%+ within 6–8 weeks of active use.

#### Compliance Trend Chart

A 12-month trend line tracking your Audit Readiness Score over time. Use it to:

- Identify regression (score drops after staff changes or new systems added)
- Demonstrate improvement to leadership or auditors
- Set quarterly improvement targets

### Charts & Visualizations

#### Risk Distribution Chart
Pie chart showing AI system breakdown by risk level. If your portfolio is heavily weighted toward high-risk, consider whether all classifications are accurate — over-classification is common when users select "Unsure" on screening questions.

#### Department Risk Heatmap
Matrix view showing departments (rows) against risk levels (columns). Helps you identify which business units carry the most compliance burden and may need dedicated system owners or additional training.

### Alerts & Action Items

The **Compliance Alerts** panel surfaces the most urgent items:

- ⏰ **Upcoming Deadlines**: Evidence renewals within 30 days, scheduled review dates
- ⚠️ **Missing Evidence**: Controls marked "Implemented" but lacking linked evidence
- 🔄 **Reassessment Needed**: Systems flagged for re-review due to material changes, incidents, or vendor updates
- 📋 **Overdue Tasks**: Past-due action items with escalation indicators
- 🎓 **Training Gaps**: Staff operating AI systems without completed AI literacy training

Each alert links directly to the relevant system, control, or task so you can take action immediately.

### Quick Actions

From the dashboard, one-click access to:

- **Add AI System**: Launch the intake wizard
- **Upload Evidence**: Add documentation to the vault
- **View All Tasks**: See your complete to-do list
- **Export Governance Pack**: Generate an organization-wide compliance summary PDF

### Best Practices

> 📊 **Weekly check-in**: Review the dashboard weekly to catch overdue items early
> 🏷️ **Triage "Needs Review"**: Schedule time to complete Quick Capture systems
> 📈 **Track trends**: Use the trend chart in leadership reports to show compliance progress
> 🎯 **Set targets**: Aim for 5% audit readiness improvement per month during initial rollout
    `
  },
  "first-ai-system": {
    slug: "first-ai-system",
    title: "Adding Your First AI System",
    description: "Step-by-step walkthrough of adding an AI system to your inventory using the guided wizard, including what information to gather beforehand and what outputs to expect.",
    readTime: "8 min",
    category: "Getting Started",
    categorySlug: "getting-started",
    lastUpdated: "2026-02-15",
    relatedArticles: ["ai-system-wizard", "capture-modes", "ownership-oversight"],
    content: `
## Adding Your First AI System

This guide walks you through the complete process of adding an AI system to your Klarvo inventory — from preparation to the auto-generated compliance outputs.

### Before You Begin

Gather the following information. You don't need everything upfront (the wizard creates tasks for missing items), but having these ready makes the process faster:

| Information | Where to Find It | Required? |
|------------|-------------------|-----------|
| System name & internal ID | Your IT asset register or project name | Yes |
| Vendor/provider name | Contract or subscription records | If third-party |
| Primary owner | The person accountable for this system | Yes |
| Deployment regions | Where users or affected people are located | Yes |
| Affected groups | Customers, employees, candidates, students, etc. | Yes |
| Purpose description | What decisions or actions it influences | Yes |
| Vendor documentation | DPA, security docs, model cards | Recommended |
| Contract/terms link | URL or PDF of the agreement | If vendor-based |

### Starting the Wizard

1. Navigate to **AI Systems** in the left sidebar
2. Click the **Add AI System** button (top right)
3. Select your assessment mode on the first screen

#### Quick Capture Mode (2–4 minutes)
Best for initial inventory building, shadow AI triage, or low-priority systems. Captures essential identification, scope, and vendor info. Creates follow-up tasks for everything else. Classification is set to "Needs Review."

#### Full Assessment Mode (10–20 minutes)
Best for production systems, customer-facing AI, high-risk candidates, and audit preparation. Walks through all 20 steps including prohibited practices screening, high-risk classification, transparency checks, data governance, human oversight, and FRIA trigger evaluation. Produces a definitive classification with a downloadable memo.

### Wizard Steps Overview

The wizard progresses through six logical phases:

**Phase 1 — Foundation (Steps 0–3)**: Mode selection, basic info, vendor details, ownership assignment

**Phase 2 — Scope & Context (Steps 4–5)**: Deployment regions, EU countries, affected groups, value chain role (deployer/provider/both)

**Phase 3 — Classification (Steps 6–9)**: AI system definition test, use case description, prohibited practices screening (Article 5), high-risk screening (Annex III)

**Phase 4 — Obligations (Steps 10–14)**: Transparency (Article 50), data & privacy, human oversight model, logging & records, incident response

**Phase 5 — Special Contexts (Steps 15–17)**: Workplace-specific obligations, public authority context, training & AI literacy

**Phase 6 — Finalization (Steps 18–20)**: FRIA trigger check, reviewer sign-off, completion summary

Each step includes contextual help text explaining why the question matters and what regulatory obligation it maps to.

### After Completion

Once you finish the wizard, Klarvo auto-generates five key outputs:

1. **AI System Record**: A comprehensive database entry with all captured metadata, linked to your organization
2. **Classification Memo (PDF)**: One-page auditable document showing inputs, classification result, confidence level, reviewer name, date, and rationale
3. **Gap Checklist**: A prioritized list of missing controls and evidence, grouped by obligation area (governance, transparency, oversight, logging, etc.)
4. **Task Plan**: Auto-created tasks with suggested owners and due dates — for example, "Upload vendor DPA," "Complete oversight SOP," "Assign AI literacy training"
5. **Evidence Requests**: Specific artifacts needed, tagged to the relevant control — for example, "Transparency notice screenshot required for TRN-01"

### Tips for Success

> ✅ **Be thorough**: More detail in the wizard means fewer follow-up tasks and a higher-confidence classification
> ✅ **Involve stakeholders**: Loop in the actual system users — they know operational details you may not
> ✅ **Attach evidence during the wizard**: The wizard accepts file uploads at key steps — add vendor docs, screenshots, and policies as you go
> ✅ **Use Quick Capture wisely**: Great for building inventory fast, but schedule time to upgrade high-priority systems to Full Assessment within 2 weeks
> ✅ **Set realistic review dates**: The default next review is 90 days after creation — adjust based on system criticality and change velocity
    `
  },
  "invite-team": {
    slug: "invite-team",
    title: "Inviting Team Members",
    description: "Learn how to add colleagues to your Klarvo workspace, assign appropriate roles, and establish the right permission levels for effective compliance collaboration.",
    readTime: "4 min",
    category: "Getting Started",
    categorySlug: "getting-started",
    lastUpdated: "2026-02-15",
    relatedArticles: ["roles-permissions", "task-owners", "evidence-requests"],
    content: `
## Inviting Team Members

EU AI Act compliance is a team effort. System owners, oversight officers, compliance leads, DPOs, and IT admins all play distinct roles. Klarvo's team management lets you assign the right access to the right people.

### How to Invite Members

1. Go to **Settings** → **Team** (or click the **Invite** button in the top navigation)
2. Click **Invite Member**
3. Enter their work email address
4. Select a role from the dropdown (see role descriptions below)
5. Optionally add a personal message
6. Click **Send Invitation**

The invitee receives an email with a secure link to join your organization. The invitation expires after 7 days — you can resend if needed.

### Available Roles

| Role | Best For | What They Can Do |
|------|----------|-----------------|
| **Admin** | Founders, CTO, Head of Compliance | Everything including billing, integrations, team management |
| **Compliance Owner** | DPO, compliance lead, legal counsel | All compliance features; cannot manage billing or integrations |
| **System Owner** | Product managers, team leads | Manage their assigned AI systems, upload evidence, complete tasks |
| **Reviewer/Approver** | Senior compliance staff, legal reviewers | Review and approve classifications, evidence, policies |
| **Viewer** | Leadership, board members, auditors | Read-only access to dashboards and reports |

See [User Roles & Permissions](/docs/roles-permissions) for the complete permission matrix.

### Assigning Ownership After Invitation

Once team members accept their invitation, you can assign them as:

- **Primary Owner**: Main accountable person for an AI system — receives all related notifications and tasks
- **Backup Owner**: Secondary contact when primary is unavailable — important for business continuity
- **Oversight Owner**: The person with human oversight authority — must have competence, training, and authority to pause/stop the system (Article 26 requirement for high-risk deployers)
- **Privacy Owner (DPO)**: Linked for data governance controls and DPIA references
- **Task Assignee**: Can be assigned specific compliance tasks regardless of role

### Managing Pending Invitations

Track outstanding invitations in **Settings → Team → Pending Invitations**:

- **Resend**: Re-send the invitation email (resets the 7-day expiry)
- **Revoke**: Cancel an invitation before it's accepted
- **Modify Role**: Change the assigned role before the invitee accepts

### Team Size Limits by Plan

| Plan | Users Included |
|------|---------------|
| Free | 1 user |
| Starter | Up to 5 users |
| Growth | Unlimited users |
| Pro | Unlimited users |
| Enterprise | Unlimited + SSO |

### Best Practices

> 👥 **Least privilege principle**: Assign the minimum role needed — you can always upgrade later
> 📧 **Use work emails**: Avoid personal addresses for auditability and offboarding
> 🔄 **Quarterly access review**: Audit team membership each quarter — remove departed staff promptly
> 🚪 **Same-day offboarding**: When someone leaves, remove their access immediately
> 🏷️ **Assign owners early**: Every AI system should have a primary and backup owner before completing classification
    `
  },

  // =============================================
  // AI SYSTEM INVENTORY
  // =============================================
  "ai-system-wizard": {
    slug: "ai-system-wizard",
    title: "Using the AI System Wizard",
    description: "Master the 20-step AI System Intake Wizard — every step explained with regulatory context, practical tips, and guidance on how each answer drives your classification and obligation mapping.",
    readTime: "10 min",
    category: "AI System Inventory",
    categorySlug: "ai-system-inventory",
    lastUpdated: "2026-02-15",
    relatedArticles: ["capture-modes", "first-ai-system", "classification-engine"],
    content: `
## The AI System Wizard

The AI System Wizard is Klarvo's guided intake process — a structured 20-step questionnaire designed to capture everything needed for EU AI Act compliance in a single flow.

### Design Principles

1. **Under 10 minutes** for a complete Full Assessment
2. **Every answer creates action**: Each response drives at least one of — classification decision, obligation flag, evidence request, or auto-generated task
3. **Progressive disclosure**: Complex questions only appear when earlier answers make them relevant (e.g., workplace notification questions only appear if you indicate workplace use)
4. **Save and resume**: Progress is saved automatically. Close the browser and come back — you'll pick up exactly where you left off
5. **Explainability**: Every question includes a "Why are we asking this?" tooltip explaining the regulatory basis

### The 20 Steps in Detail

#### Part 1: Foundation (Steps 0–3)

**Step 0 — Mode Selection**: Choose Quick Capture (creates tasks for missing info) or Full Assessment (complete classification in one session). Also enter the system name and assign a primary owner.

**Step 1 — Basic Information**: System name, internal reference ID, lifecycle status (Idea / Pilot / Live / Retired), and a one-sentence summary. The lifecycle status affects which obligations are currently active vs. planning-stage.

**Step 2 — Vendor Information**: Is it built in-house, acquired via SaaS/API, or open-source? Link or create a vendor record. Attach contract documentation. Note any foundation model providers (e.g., "Uses OpenAI GPT-4 via API").

**Step 3 — Ownership & Accountability**: Assign backup owner, oversight owner, and department/team. These assignments drive task routing and notification rules.

#### Part 2: Scope & Context (Steps 4–5)

**Step 4 — Deployment Scope**: Select deployment regions (EU, UK, US, Other). If EU is selected, specify which member states. Identify internal user groups and affected external parties (customers, employees, job candidates, students, patients, general public). Flag whether it's customer-facing, impacts workplace decisions, or has legal/significant effects.

**Step 5 — Value Chain Role**: Determine whether you're a Deployer (using AI built by others), Provider (building/selling AI), or Both. This is critical because deployer and provider obligations differ substantially. Most SMEs are deployers. If you're a provider, additional modules become available.

#### Part 3: Classification (Steps 6–9)

**Step 6 — AI System Definition Test**: Based on Commission guidelines, answer whether the system infers outputs from inputs, what output types it produces, whether it operates with autonomy, whether it adapts after deployment, and what technical approach is used. The wizard stores your conclusion (Likely AI system / Likely not / Needs review) with rationale and confidence level.

**Step 7 — Use Case & Functionality**: Describe the primary purpose category, workflow, decision type (recommend/decide/automate/generate), output destinations, human involvement level (HITL/HOTL/HOOTL), override capability, usage frequency, and impact scale.

**Step 8 — Prohibited Practices Screening**: Eight critical Article 5 questions. Any "Yes" or "Unsure" answer immediately blocks further classification and creates a legal review task. This is the hardest stop in the entire wizard — no workarounds, by design.

**Step 9 — High-Risk Screening**: Nine Annex III category checks covering biometrics, critical infrastructure, education, employment, essential services, law enforcement, migration, justice, and safety components. If any category is flagged, the system becomes a "High-Risk Candidate" with full Article 26 deployer obligations.

#### Part 4: Obligations (Steps 10–14)

**Step 10 — Transparency Obligations**: Article 50 screening — direct interaction disclosure, synthetic content marking, emotion recognition notice, deepfake disclosure, and public-interest text disclosure. Creates specific disclosure tasks and evidence requests.

**Step 11 — Data & Privacy**: Personal data processing, special categories, minors, data sources, deployer control over inputs, retention periods, DPIA status and linkage.

**Step 12 — Human Oversight**: Oversight model selection, named oversight owner, stop authority confirmation, competence requirements, training status, SOP documentation, and monitoring plan.

**Step 13 — Logging & Records**: Automatic logging capability, storage location, access controls, retention period, export capability, and the critical 6-month minimum retention confirmation for high-risk deployers.

**Step 14 — Incidents & Monitoring**: Incident response process existence, severity levels, internal/external notification lists, and suspension capability.

#### Part 5: Special Contexts (Steps 15–17)

**Step 15 — Workplace Context**: If the system is used in a workplace context and is a high-risk candidate, worker notification obligations apply under Article 26.

**Step 16 — Public Authority Context**: Public bodies deploying high-risk AI have additional registration and FRIA obligations.

**Step 17 — Training & AI Literacy**: Staff roles operating the system, whether AI literacy training exists for those roles, and completion status.

#### Part 6: Finalization (Steps 18–20)

**Step 18 — FRIA Trigger Check**: Evaluates whether a Fundamental Rights Impact Assessment is required based on classification and organizational context. Links to the FRIA Wizard if triggered.

**Step 19 — Review & Sign-off**: Pre-filled classification (editable with justification if overridden), reviewer assignment, sign-off date, and notes.

**Step 20 — Completion**: Summary of all auto-generated outputs — classification memo, gap checklist, task plan, evidence requests, and next steps.

### Auto-Generated Outputs

Upon completion, the wizard creates:

1. **AI System Record**: Full database entry with all metadata
2. **Classification Memo (PDF)**: Auditable one-page document
3. **Gap Checklist**: Prioritized list of missing controls and evidence
4. **Task Plan**: Auto-assigned action items with due dates
5. **Evidence Requests**: Specific document requirements mapped to controls
    `
  },
  "capture-modes": {
    slug: "capture-modes",
    title: "Quick Capture vs Full Assessment",
    description: "Understand when to use Quick Capture mode versus Full Assessment mode for AI system intake, including detailed comparison and upgrade path.",
    readTime: "4 min",
    category: "AI System Inventory",
    categorySlug: "ai-system-inventory",
    lastUpdated: "2026-02-15",
    relatedArticles: ["ai-system-wizard", "first-ai-system", "bulk-import"],
    content: `
## Choosing Your Assessment Mode

When adding an AI system, you choose between two intake modes. Each serves a different purpose in your compliance workflow. This guide helps you pick the right one — and explains how to upgrade later.

### Quick Capture Mode

**Duration**: 2–4 minutes

**Best for**:
- Initial inventory building — getting everything catalogued fast
- Shadow AI discovery triage — logging newly discovered tools
- Time-constrained situations — quick add before a meeting
- Low-priority systems — internal tools with minimal impact
- Pilots and experiments — not yet in production

**What it captures**:
- System name, internal reference ID, lifecycle status
- Primary owner assignment
- High-level scope (deployment regions, department)
- Basic vendor information (name, contract link)
- One-sentence summary

**What it skips** (creates tasks instead):
- Full classification questionnaire (definition test, prohibited screening, high-risk screening)
- Transparency obligation screening
- Data governance details
- Human oversight specifics
- Logging and incident response
- FRIA trigger evaluation

**Output**:
- Classification: **"Needs Review"** — visible on dashboard as a gap
- Auto-generated tasks: "Complete classification," "Upload vendor documentation," "Assign oversight owner"
- Basic system record in inventory
- Default review date: 90 days

### Full Assessment Mode

**Duration**: 10–20 minutes

**Best for**:
- Production systems actively serving users
- Customer-facing AI tools
- Known or suspected high-risk candidates
- Audit preparation — need classification memo now
- Regulatory inquiry response — need to show compliance immediately

**What it captures**:
- Complete 20-step questionnaire (all phases)
- Prohibited practices screening (Article 5)
- High-risk screening (Annex III)
- Transparency obligations (Article 50)
- Data governance and privacy mapping
- Human oversight model and authority
- Logging and record-keeping status
- Incident response readiness
- Workplace and public authority contexts
- FRIA trigger evaluation
- Reviewer sign-off

**Output**:
- Definitive classification: Minimal / Limited / High-Risk Candidate / Blocked
- Classification Memo PDF with full rationale
- Complete gap checklist mapped to applicable controls
- Comprehensive task plan with owners and deadlines
- Specific evidence requests per control

### Comparison Table

| Feature | Quick Capture | Full Assessment |
|---------|--------------|-----------------|
| Time required | 2–4 min | 10–20 min |
| Questions asked | ~15 essential | ~80 comprehensive |
| Classification result | "Needs Review" | Definitive level |
| Classification Memo | Not generated | PDF available |
| Evidence requests | Generic | Specific per control |
| Task generation | 3–5 basic tasks | 15–30+ targeted tasks |
| Prohibited screening | Skipped | Complete |
| High-risk screening | Skipped | Complete |
| Transparency check | Skipped | Complete |
| Best for | Inventory building | Compliance readiness |

### Upgrading from Quick Capture to Full Assessment

You can always upgrade a Quick Capture entry:

1. Open the AI system detail page
2. Click **Complete Assessment** in the status banner
3. The wizard opens at the first incomplete step — pre-filled with existing data
4. Complete the remaining steps
5. New classification replaces "Needs Review"

No data is lost during upgrade — everything from Quick Capture carries forward.

### Our Recommendation

> 🚀 **Start with Quick Capture** for your initial inventory sweep — get every AI system logged within a week. Then sort by potential risk and upgrade the highest-priority systems to Full Assessment first. This gives you a complete inventory fast while ensuring critical systems get full classification quickly.
    `
  },
  "ownership-oversight": {
    slug: "ownership-oversight",
    title: "Assigning Ownership & Oversight",
    description: "Learn how to assign primary owners, backup owners, and oversight officers to AI systems — a core requirement for Article 26 deployer obligations and organizational accountability.",
    readTime: "5 min",
    category: "AI System Inventory",
    categorySlug: "ai-system-inventory",
    lastUpdated: "2026-02-15",
    relatedArticles: ["ai-system-wizard", "roles-permissions", "invite-team"],
    content: `
## Assigning Ownership & Oversight

Under the EU AI Act, deployers of high-risk AI systems must assign competent human oversight to persons with the necessary competence, training, and authority (Article 26). Even for non-high-risk systems, clear ownership is essential for governance and accountability.

### Why Ownership Matters

Every AI system in your inventory needs clear answers to three questions:

1. **Who is accountable?** (Primary Owner) — receives all compliance notifications, owns the classification, and is responsible for evidence completeness
2. **Who is the backup?** (Backup Owner) — steps in when the primary is unavailable; ensures continuity
3. **Who has oversight authority?** (Oversight Owner) — the person with the competence and authority to monitor, intervene, and if necessary pause or stop the system

For high-risk AI systems, these assignments are not optional — they're a regulatory requirement.

### Role Definitions

| Role | Responsibility | Article 26 Relevance |
|------|---------------|---------------------|
| **Primary Owner** | Overall accountability for the system's compliance posture | Must ensure system is used according to instructions |
| **Backup Owner** | Business continuity; acts when primary is absent | Ensures no gap in oversight coverage |
| **Oversight Owner** | Human oversight authority — monitors operation, can intervene | Must have competence, training, and authority to pause/stop |
| **Privacy Owner (DPO)** | Data protection aspects; DPIA linkage | Ensures GDPR alignment alongside AI Act |

### How to Assign Owners

#### During the Wizard
Steps 0 and 3 of the AI System Wizard prompt you to assign:
- Primary owner (Step 0 — required)
- Backup owner (Step 3 — recommended)
- Oversight owner (Step 12 — required for high-risk candidates)

#### After Creation
1. Open the AI System detail page
2. Click the **Ownership** section
3. Use the people picker to assign or change each role
4. Changes are logged in the audit trail

### Oversight Owner Requirements

For high-risk AI systems, the oversight owner must meet specific criteria:

- **Competence**: Understands how the AI system works, its limitations, and potential failure modes
- **Training**: Has completed AI literacy training relevant to the system's domain
- **Authority**: Has the organizational authority to pause or stop the system if it poses risk — this must be explicitly documented in an oversight SOP
- **Independence**: Ideally not the same person who built or procured the system (separation of duties)

### Auto-Generated Tasks

When owners are assigned, Klarvo automatically creates tasks:

| Assignment | Auto-Generated Task |
|-----------|-------------------|
| Primary Owner assigned | "Complete classification" (if pending) |
| Oversight Owner assigned | "Create oversight SOP" |
| Oversight Owner assigned | "Complete AI literacy training" |
| No Backup Owner | "Assign backup owner" |

### Best Practices

> 🏷️ **Assign early**: Set ownership during the wizard, not after — it establishes accountability from day one
> 👥 **Separate roles**: Avoid making one person both the primary owner and oversight owner for high-risk systems
> 📋 **Document authority**: The oversight owner's stop/pause authority should be written into an SOP
> 🔄 **Review quarterly**: Ownership changes when people change roles — review assignments each quarter
> 🎓 **Train oversight owners**: They must have demonstrable competence; link their training records to the system
    `
  },
  "vendor-tracking": {
    slug: "vendor-tracking",
    title: "Vendor & Model Provider Tracking",
    description: "Track third-party AI vendors, SaaS providers, and foundation model providers — essential for deployer due diligence and supply chain transparency under the EU AI Act.",
    readTime: "6 min",
    category: "AI System Inventory",
    categorySlug: "ai-system-inventory",
    lastUpdated: "2026-02-15",
    relatedArticles: ["vendor-profiles", "due-diligence", "vendor-attestations"],
    content: `
## Vendor & Model Provider Tracking

Most SMEs are deployers — they use AI systems built by third-party vendors. Under the EU AI Act, deployers remain responsible for how they use AI, even when the system is provided by someone else. This means tracking your vendors and their AI capabilities is essential.

### Why Vendor Tracking Matters

As a deployer, you must:

- **Use AI according to provider instructions** (Article 26) — you need access to those instructions
- **Ensure adequate logging** — does your vendor provide logs? What format? What retention?
- **Monitor for issues** — can you get performance data from the vendor?
- **Report incidents** — does the vendor have an incident notification path?
- **Demonstrate due diligence** — auditors will ask what you know about your AI vendors

### Linking Vendors to AI Systems

During the AI System Wizard (Step 2), you can:

1. **Select an existing vendor** from your vendor registry
2. **Create a new vendor** on the fly — enter name, website, contact info
3. **Attach contract documentation** — upload the agreement PDF or paste a URL
4. **Note the foundation model** — if the vendor uses a specific model (e.g., "GPT-4 via Azure OpenAI"), capture this in the Foundation Model field

Each AI system can be linked to one vendor. A single vendor can be linked to multiple AI systems.

### Vendor Registry

Navigate to **Vendors** in the sidebar to see all tracked vendors. Each vendor profile includes:

- **Basic Information**: Name, website, primary contact, country
- **Linked AI Systems**: All systems using this vendor
- **Contract Details**: Agreement type, start/end dates, renewal dates
- **Attestations**: EU AI Act-related statements and certifications
- **Due Diligence Status**: Checklist completion level
- **Evidence**: All documentation linked to this vendor

### Foundation Model Tracking

If your vendor uses a foundation model (e.g., an LLM), capture:

- **Model name and version**: "GPT-4 Turbo", "Claude 3.5 Sonnet", "Gemini Pro"
- **GPAI classification**: Is it a general-purpose AI model? If so, GPAI obligations may apply to the provider
- **Transparency information**: Has the model provider published a model card or summary?
- **Systemic risk**: Is the model classified as having systemic risk? (relevant for very large models)

This information helps you assess supply chain risk and supports Article 26 compliance.

### Vendor Change Management

When a vendor changes (new vendor, model upgrade, contract renewal):

1. Update the vendor record in Klarvo
2. The platform prompts a **reassessment** of linked AI systems
3. Review whether the classification changes
4. Update evidence (new contract, updated security docs)
5. Create tasks for any new due diligence items

### Best Practices

> 📋 **Centralize vendor data**: Use Klarvo as the single source of truth for AI vendor information
> 🔄 **Track renewals**: Set contract renewal dates and get advance reminders
> 📄 **Collect proactively**: Request AI-specific documentation from vendors at procurement time
> 🏷️ **Note model providers**: Even if your direct vendor is a SaaS company, note the underlying model provider
> ⚠️ **Vendor changes = reassessment**: Any material vendor change should trigger a review of linked AI system classifications
    `
  },
  "bulk-import": {
    slug: "bulk-import",
    title: "Bulk Import via CSV",
    description: "Import multiple AI systems at once using CSV upload — ideal for organizations with existing inventories in spreadsheets, asset registers, or other compliance tools.",
    readTime: "5 min",
    category: "AI System Inventory",
    categorySlug: "ai-system-inventory",
    lastUpdated: "2026-02-15",
    relatedArticles: ["ai-system-wizard", "capture-modes", "first-ai-system"],
    content: `
## Bulk Import via CSV

If you already have an AI system inventory in a spreadsheet, asset register, or another tool, Klarvo's bulk import lets you load multiple systems at once rather than entering them one by one through the wizard.

### When to Use Bulk Import

- You have an existing AI inventory in Excel/Google Sheets
- You're migrating from another compliance tool
- You need to add 10+ systems quickly
- Your IT team has an asset register with AI systems catalogued

### Preparing Your CSV

Your CSV file should include these columns (headers must match exactly):

| Column | Required | Description | Example |
|--------|----------|-------------|---------|
| name | Yes | AI system name | "Customer Support Chatbot" |
| internal_reference_id | No | Your internal ID | "AI-CS-001" |
| description | No | Brief summary | "Handles tier-1 support queries" |
| department | No | Owning department | "Customer Success" |
| lifecycle_status | No | Current status | "live" / "pilot" / "idea" / "retired" |
| vendor_name | No | Third-party provider | "Zendesk" |
| deployment_regions | No | Comma-separated | "EU, US" |
| purpose_category | No | Primary use | "Customer support" |
| human_involvement | No | Oversight level | "human-in-the-loop" / "human-on-the-loop" / "human-out-of-the-loop" |

### Import Process

1. Navigate to **AI Systems** in the sidebar
2. Click the **Import** button (next to Add AI System)
3. Upload your CSV file
4. **Column Mapping**: Klarvo shows a preview and lets you map your CSV columns to system fields — this handles cases where your headers differ from the expected names
5. **Validation**: The importer checks for required fields, duplicate names, and data format issues. Any errors are highlighted with row numbers.
6. **Preview**: Review the parsed data before confirming
7. **Import**: Click **Confirm Import** to create all systems

### What Happens After Import

Each imported system is created as a **Quick Capture** entry:

- Classification is set to **"Needs Review"**
- The following tasks are auto-created for each system:
  - "Complete classification"
  - "Assign primary owner" (if not provided in CSV)
  - "Upload vendor documentation" (if vendor was specified)
- Systems appear immediately in your AI Systems list and Dashboard metrics

### Handling Duplicates

If a system with the same name already exists:

- The importer flags it as a potential duplicate
- You can choose to **skip**, **rename**, or **overwrite** each duplicate
- We recommend reviewing duplicates manually rather than auto-overwriting

### Post-Import Workflow

After import, prioritize your systems:

1. **Sort by risk potential**: Systems in HR, finance, customer-facing, or healthcare contexts should be upgraded to Full Assessment first
2. **Assign owners**: Use the bulk assignment feature to set primary owners
3. **Schedule assessments**: Plan to complete 3–5 Full Assessments per week until all imported systems are classified

### Tips

> 📊 **Start with what you have**: Even a rough spreadsheet is better than nothing — import it, then refine
> 🧹 **Clean your data first**: Remove retired systems, fix naming inconsistencies, and de-duplicate before importing
> 🏷️ **Use consistent departments**: Standardize department names across your CSV for clean dashboard filtering
> 📋 **Keep your source file**: Save the original CSV as evidence of your initial inventory effort
    `
  },

  // =============================================
  // CLASSIFICATION & RISK ASSESSMENT
  // =============================================
  "classification-engine": {
    slug: "classification-engine",
    title: "The Classification Engine Explained",
    description: "Deep dive into how Klarvo's classification engine determines risk levels and maps applicable EU AI Act obligations through a four-stage sequential assessment.",
    readTime: "8 min",
    category: "Classification & Risk Assessment",
    categorySlug: "classification",
    lastUpdated: "2026-02-15",
    relatedArticles: ["definition-test", "prohibited-screening", "high-risk-categories", "transparency-obligations"],
    content: `
## The Classification Engine

Klarvo's Classification Engine is the core logic that determines your AI system's risk level and maps applicable EU AI Act obligations. Every wizard answer feeds into this engine, which processes decisions through four sequential stages.

### How Classification Works

The engine follows a strict sequential flow — each stage can block progression to the next:

\`\`\`
Stage 1: AI System Definition → Is this an AI system under the Act?
     ↓
Stage 2: Prohibited Screening → Any Article 5 red flags?
     ↓
Stage 3: High-Risk Screening → Annex III category match?
     ↓
Stage 4: Transparency Check → Article 50 obligations?
     ↓
Final Classification + Obligation Mapping
\`\`\`

### Stage 1: AI System Definition

The EU AI Act applies only to "AI systems" as defined in Article 3(1). The Commission has published guidelines to help interpret this definition.

**Key criteria evaluated**:
1. Does it infer outputs from inputs to achieve objectives?
2. Does it produce predictions, recommendations, decisions, classifications, or generated content?
3. Does it operate with some degree of autonomy (not purely manual rules)?
4. Does it use ML, deep learning, statistical, or logic-based approaches?

**Possible outcomes**:
- ✅ **Likely AI System** → Continues to Stage 2
- ❌ **Likely Not AI System** → Recorded as "Out of scope" but remains in inventory for governance purposes
- ⚠️ **Needs Review** → Flagged for expert/legal review; task auto-created

> 💡 Systems that are "Likely Not AI" still benefit from good governance. Keeping them in your inventory shows due diligence in your assessment process.

### Stage 2: Prohibited Practices (Article 5)

This is the hardest stop in the classification flow. Eight questions screen against prohibited AI practices that have applied since **2 February 2025**:

1. Harmful manipulation or deception causing significant harm
2. Exploitation of vulnerabilities (age, disability, socio-economic)
3. Social scoring for unrelated decisions
4. Criminal risk prediction based solely on profiling/personality traits
5. Untargeted facial recognition database scraping
6. Workplace/education emotion inference
7. Biometric categorisation revealing protected characteristics
8. Real-time remote biometric ID in public spaces for law enforcement

**Possible outcomes**:
- ✅ **No indicators** → Continues to Stage 3
- ⚠️ **Potential prohibited practice** → Classification set to **"Blocked"**, legal review task created, no further classification until cleared
- ❓ **Unsure on any question** → Also triggers legal review

### Stage 3: High-Risk Screening (Annex III)

Nine use-case categories where AI systems are considered "high-risk":

| # | Category | Common SME Examples |
|---|----------|-------------------|
| 1 | Biometrics | Facial recognition access control, age verification |
| 2 | Critical Infrastructure | Smart building management, energy optimization |
| 3 | Education | LMS with AI grading, proctoring tools |
| 4 | Employment | ATS screening, performance analytics, scheduling AI |
| 5 | Essential Services | Credit scoring, insurance underwriting |
| 6 | Law Enforcement | Forensic tools (rare for SMEs) |
| 7 | Migration | Document verification (rare for SMEs) |
| 8 | Justice | Legal research AI, contract analysis |
| 9 | Safety Components | Medical device AI, ADAS components |

**Possible outcomes**:
- ✅ **No matches** → Continues to Stage 4
- ⚠️ **High-Risk Candidate** → Full deployer obligations (Article 26) apply
- 🏭 **Safety Component** → Provider obligations may additionally apply

### Stage 4: Transparency Check (Article 50)

Even non-high-risk systems may have transparency obligations:

1. **Direct AI interaction** → Must inform people unless obvious
2. **Synthetic content generation** → Must mark outputs as AI-generated in machine-readable way
3. **Emotion recognition** → Must inform exposed persons
4. **Deepfake generation** → Must disclose artificial nature
5. **Public-interest text** → Must disclose unless editorial control exception applies

### Final Classification Output

| Level | Meaning | Key Obligations |
|-------|---------|-----------------|
| **Minimal Risk** | No specific EU AI Act requirements | Best practices, internal governance |
| **Limited Risk** | Transparency obligations apply | Article 50 disclosures |
| **High-Risk Candidate** | Full deployer duties | Article 26 controls, logging ≥6 months, oversight, FRIA if applicable |
| **Blocked** | Potential prohibited practice | Legal review required; use suspended |

### Classification Confidence

Each classification includes a confidence level:

- **High**: Clear, unambiguous answers across all stages
- **Medium**: Some "Unsure" answers or edge cases — recommend reviewer sign-off
- **Low**: Multiple uncertain areas — requires expert input before relying on classification

### Audit Trail

Every classification is fully auditable:
- All questions and answers stored with timestamps
- Decision path documented at each stage
- Reviewer name and approval date captured
- Version history maintained for re-classifications
- Override reasons recorded when human judgment differs from engine suggestion
    `
  },
  "definition-test": {
    slug: "definition-test",
    title: "AI System Definition Test",
    description: "How Klarvo determines whether your system qualifies as an 'AI system' under the EU AI Act definition, aligned with Commission interpretation guidelines.",
    readTime: "6 min",
    category: "Classification & Risk Assessment",
    categorySlug: "classification",
    lastUpdated: "2026-02-15",
    relatedArticles: ["classification-engine", "prohibited-screening", "high-risk-categories"],
    content: `
## AI System Definition Test

The EU AI Act applies only to systems that meet its specific definition of an "AI system" (Article 3(1)). The European Commission has published guidelines to help organisations determine whether a particular system falls within scope. Klarvo's Definition Test operationalises these guidelines into a structured questionnaire.

### The Legal Definition

Article 3(1) defines an AI system as:

> A machine-based system designed to operate with varying levels of autonomy, that may exhibit adaptiveness after deployment, and that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, recommendations, decisions, or content that can influence physical or virtual environments.

### What the Definition Test Evaluates

The wizard asks five key questions that map directly to elements of this definition:

#### Question 1: Does the system infer outputs from inputs?

**What "infer" means**: The system generates outputs that go beyond simple rule execution — it derives patterns, makes predictions, or produces content that wasn't explicitly programmed for every possible input.

**Examples that qualify**: A chatbot generating responses, a recommendation engine suggesting products, a classifier categorising images.

**Examples that don't qualify**: A simple IF/THEN rule engine with fully deterministic logic, a lookup table, a basic calculator.

#### Question 2: What types of outputs does it produce?

Select all that apply:
- Predictions (forecasting future outcomes)
- Recommendations (suggesting actions)
- Decisions (making choices autonomously or semi-autonomously)
- Classifications (categorising inputs into groups)
- Generated content (text, images, audio, video)
- Scores (numerical ratings or rankings)

Systems producing at least one of these output types are more likely to qualify.

#### Question 3: Does it operate with some degree of autonomy?

**Autonomy** means the system can function without full human direction at every step. It doesn't mean fully autonomous — even systems with human-in-the-loop can have operational autonomy in generating outputs.

**Key distinction**: A system where a human reviews and approves every output still operates autonomously in *generating* those outputs.

#### Question 4: Does it adapt or learn after deployment?

- **Yes**: The system updates its model, weights, or behaviour based on new data after deployment (e.g., online learning, fine-tuning in production)
- **No**: The model is static after deployment — same inputs always produce the same outputs
- **Unknown**: You're not sure whether the vendor updates the model continuously

Adaptiveness is part of the definition but is not strictly required — a static ML model still qualifies if it meets the other criteria.

#### Question 5: What technical approach is used?

Select all that apply:
- Machine learning (supervised, unsupervised, reinforcement)
- Deep learning (neural networks)
- Large language models (GPT, Claude, Gemini, etc.)
- Statistical models (regression, Bayesian)
- Rules/logic-based with inference capability
- Optimization algorithms
- Unknown

### Interpreting the Result

| Result | Meaning | Next Steps |
|--------|---------|------------|
| **Likely AI System** | Meets the definition criteria | Proceed to prohibited practices screening |
| **Likely Not AI System** | Doesn't meet key criteria | Stays in inventory as "Out of scope"; memo generated |
| **Needs Review** | Ambiguous answers; edge case | Task created for compliance/legal review |

### Common Edge Cases

**Simple chatbots with scripted responses**: If the chatbot follows a fixed decision tree with no ML, it's likely not an AI system. If it uses NLP/LLM for response generation, it likely is.

**Business intelligence dashboards**: Standard BI tools (SQL queries, pivot tables) are typically not AI systems. If they include predictive analytics, anomaly detection, or ML-driven recommendations, they may qualify.

**RPA (Robotic Process Automation)**: Pure RPA executing scripted steps is typically not AI. RPA with ML-driven decision points or document understanding likely qualifies.

**Spreadsheet formulas and macros**: Not AI systems, even if complex. However, spreadsheet add-ins using ML models in the background would qualify.

### Storing Your Result

The Definition Test result is permanently stored in your AI system record with:
- Your conclusion and confidence level (High/Medium/Low)
- Written rationale explaining your reasoning
- Reviewer name and date
- All individual question answers

This creates an auditable record demonstrating you assessed whether the Act applies — an important element of due diligence even when the answer is "Likely Not."

### Best Practices

> 🔍 **When in doubt, include it**: It's better to classify a borderline system than to exclude it and face questions later
> 📝 **Write clear rationale**: Explain your reasoning in plain language — an auditor should understand why you reached your conclusion
> 👥 **Get a second opinion**: For edge cases, assign a reviewer to confirm the conclusion
> 🔄 **Reassess on changes**: If the system's capabilities change (e.g., vendor adds ML features), re-run the definition test
    `
  },
  "prohibited-screening": {
    slug: "prohibited-screening",
    title: "Prohibited Practices Screening",
    description: "Understanding the eight prohibited AI practices under Article 5 of the EU AI Act and how Klarvo screens for them — including what to do when flags are raised.",
    readTime: "7 min",
    category: "Classification & Risk Assessment",
    categorySlug: "classification",
    lastUpdated: "2026-02-15",
    relatedArticles: ["classification-engine", "high-risk-categories", "definition-test"],
    content: `
## Prohibited Practices Screening

Article 5 of the EU AI Act prohibits certain AI practices that pose unacceptable risks to fundamental rights. These prohibitions have applied since **2 February 2025**. Klarvo screens every AI system against all eight prohibited categories.

### The Eight Prohibited Practices

#### 1. Harmful Manipulation or Deception

**What's prohibited**: AI systems deploying subliminal, manipulative, or deceptive techniques to materially distort a person's behaviour in a way that causes or is reasonably likely to cause significant harm.

**SME examples to watch for**:
- Dark patterns designed to exploit cognitive biases (urgency, scarcity manipulation)
- Chatbots designed to mislead users about their nature for harmful purposes
- Persuasion algorithms that distort purchasing behaviour in harmful ways

**Key nuance**: Standard marketing personalisation is generally not prohibited. The threshold is "significant harm" and "materially distorting behaviour."

#### 2. Exploitation of Vulnerabilities

**What's prohibited**: AI exploiting vulnerabilities of specific groups due to age, disability, or socio-economic situation in ways likely to cause significant harm.

**SME examples**: Predatory lending targeting cognitive impairments, gambling systems exploiting addiction, scams targeting elderly users.

#### 3. Social Scoring

**What's prohibited**: Evaluating or classifying people based on social behaviour or personality characteristics, where the resulting social score leads to detrimental treatment in unrelated contexts or disproportionate treatment.

**Key nuance**: Performance ratings at work tied to work outcomes are generally not social scoring. It becomes prohibited when a score from one context (e.g., social media behaviour) affects unrelated decisions (e.g., credit access).

#### 4. Criminal Risk Prediction via Profiling

**What's prohibited**: Assessing or predicting the risk of a natural person committing a criminal offence based **solely** on profiling or personality traits — without additional objective, verifiable facts.

**Key nuance**: The word "solely" is important. AI that assists investigation using behavioural evidence alongside other facts may not be prohibited.

#### 5. Untargeted Facial Recognition Scraping

**What's prohibited**: Creating or expanding facial recognition databases through untargeted scraping of facial images from the internet or CCTV footage.

#### 6. Workplace/Education Emotion Inference

**What's prohibited**: Inferring emotions of people in workplace or educational settings, except where medically or safety-necessary (e.g., fatigue detection for safety-critical operators).

**SME examples**: Employee sentiment analysis tools, student engagement monitoring, interview emotion detection.

#### 7. Biometric Categorisation Revealing Protected Characteristics

**What's prohibited**: Biometric categorisation systems that individually categorise people to deduce or infer their race, political opinions, trade union membership, religious beliefs, sex life, or sexual orientation.

#### 8. Real-time Remote Biometric Identification in Public Spaces

**What's prohibited**: Real-time remote biometric identification in publicly accessible spaces for law enforcement purposes (with narrow exceptions for specific serious crimes, missing persons, and imminent threats).

### What Happens When a Flag is Raised

If any screening question is answered "Yes" or "Unsure":

1. **Immediate block**: The system classification is set to **"Blocked"**
2. **Legal review task created**: "Legal review — prohibited practices" assigned to the compliance owner
3. **No further classification**: The wizard does not proceed to high-risk or transparency screening
4. **Documentation required**: You must provide context and describe any safeguards
5. **Dashboard alert**: A critical alert appears on the compliance dashboard

The system stays "Blocked" until a reviewer with Compliance Owner or Admin role explicitly clears it after legal review.

### Handling False Positives

Not every flag indicates an actual prohibition. Context is critical:

- **Emotion AI for medical/safety purposes**: Fatigue detection for truck drivers may be exempt from the workplace emotion prohibition
- **Law enforcement exceptions**: Narrow exceptions exist for real-time biometric ID in extreme circumstances
- **Contextual assessment**: A "social scoring" flag may be a false positive if the system is simply a performance review tool

In all cases: document the context, get legal sign-off, record the rationale, and clear the flag with an explicit reviewer confirmation.

### Best Practices

> ⚠️ **Take flags seriously**: Even if you believe it's a false positive, always complete the legal review process
> 📝 **Document context thoroughly**: Explain why the system's use case doesn't meet the prohibition threshold
> 👨‍⚖️ **Get legal sign-off**: A qualified person must clear prohibited practice flags — this is auditable
> 🔄 **Re-screen on changes**: If system capabilities change, re-run the prohibited practices screening
    `
  },
  "high-risk-categories": {
    slug: "high-risk-categories",
    title: "High-Risk Categories (Annex III)",
    description: "Complete reference guide to the nine high-risk AI use case categories defined in Annex III of the EU AI Act, with SME-relevant examples and deployer obligation mapping.",
    readTime: "10 min",
    category: "Classification & Risk Assessment",
    categorySlug: "classification",
    lastUpdated: "2026-02-15",
    relatedArticles: ["classification-engine", "prohibited-screening", "fria-requirements", "transparency-obligations"],
    content: `
## High-Risk Categories (Annex III)

Annex III of the EU AI Act lists specific use cases where AI systems are considered "high-risk" and subject to extensive compliance requirements. Most obligations for these systems apply from **2 August 2026**, with an extended transition until **2 August 2027** for high-risk AI embedded in regulated products listed in Annex I.

### Category 1: Biometrics

**Scope**: AI systems for biometric identification, categorisation, or verification beyond what is prohibited under Article 5.

**Common examples**:
- Airport facial recognition gates
- Age verification systems
- Fingerprint-based access control
- Customer identity verification in banking (KYC)

**SME relevance**: If you use biometric access control or identity verification powered by AI, this category likely applies.

---

### Category 2: Critical Infrastructure

**Scope**: AI used as safety components in management and operation of critical infrastructure — digital infrastructure, road traffic, water, gas, heating, electricity supply.

**Common examples**:
- Smart grid load balancing
- SCADA system AI components
- Network traffic optimization
- Traffic management AI

**SME relevance**: Most relevant for utility companies, telecom providers, and infrastructure management firms.

---

### Category 3: Education & Vocational Training

**Scope**: AI affecting educational access, assessment, or learning outcomes.

**Covered uses**: Admissions decisions, student assessment/grading, learning outcome evaluation, proctoring and cheating detection, educational resource access decisions.

**Common examples**: University admission scoring, automated essay grading, exam proctoring, adaptive learning platforms that gate content based on AI assessment.

**SME relevance**: EdTech companies and training providers — if your AI influences who gets admitted, how they're graded, or what learning resources they access.

---

### Category 4: Employment & Worker Management

**Scope**: AI affecting employment decisions, worker management, and access to self-employment.

**Covered uses**: Recruitment and screening, job advertising targeting, CV/application filtering, interview assessment, performance evaluation, task allocation, promotion/termination decisions, workplace monitoring.

**Common examples**: ATS candidate ranking, video interview analysis, performance management AI, shift scheduling optimisation, productivity monitoring tools.

**SME relevance**: This is the most common high-risk category for SMEs. If you use any AI tool in your hiring pipeline, performance reviews, or workforce management, check this category carefully.

---

### Category 5: Essential Private & Public Services

**Scope**: AI affecting access to essential services and benefits.

**Covered uses**: Creditworthiness assessment, credit scoring, risk assessment for life/health insurance, emergency service dispatch, public benefit eligibility, healthcare access prioritisation.

**Common examples**: Bank loan decisioning, insurance premium calculation, emergency triage AI, benefit fraud detection, hospital bed allocation.

---

### Category 6: Law Enforcement

**Scope**: AI supporting law enforcement activities — evidence reliability assessment, crime risk assessment, profiling during investigation, lie detection, crime pattern prediction, deepfake detection in evidence.

**SME relevance**: Rare for most SMEs unless providing tools to law enforcement agencies.

---

### Category 7: Migration, Asylum & Border Control

**Scope**: AI in immigration and border management — polygraph tools, security risk assessment, visa/asylum processing, document verification, irregular migration risk assessment.

**SME relevance**: Relevant for companies providing border management or document verification technology.

---

### Category 8: Administration of Justice & Democratic Processes

**Scope**: AI assisting judicial and democratic institutions — researching legal facts, applying law to facts, alternative dispute resolution, election influence.

**Common examples**: Legal research AI, sentencing recommendation systems, contract analysis tools with decision-support, voter registration assistance.

**SME relevance**: LegalTech companies providing AI-powered research or analysis tools.

---

### Category 9: Safety Components of Regulated Products

**Scope**: AI that is a safety component of products covered by EU product legislation listed in Annex I — medical devices, motor vehicles, aviation, marine equipment, toys, machinery, lifts, PPE.

**Common examples**: ADAS/autonomous driving components, medical diagnostic AI, industrial robot safety systems, drone flight control.

**SME relevance**: If you build AI that's a safety component in a regulated product, you may have both provider obligations under the AI Act and product-specific obligations.

---

### Implications of High-Risk Classification

If your AI system matches any Annex III category, deployer obligations under Article 26 include:

| Obligation | What You Must Do |
|-----------|-----------------|
| Use per instructions | Follow provider's instructions for use |
| Human oversight | Assign competent persons with authority to intervene/stop |
| Input data quality | Ensure input data is relevant and representative (if under your control) |
| Monitor operation | Active monitoring per provider instructions |
| Keep logs ≥ 6 months | Retain automatically generated logs under your control |
| Report incidents | Notify provider and authorities of serious incidents |
| Worker notification | Inform workers/representatives before workplace deployment |
| FRIA (if applicable) | Conduct Fundamental Rights Impact Assessment |
| Registration (if applicable) | Register in EU database (public authorities) |

### Best Practices

> 🔍 **Check every system**: Even if you think it's minimal risk — the Annex III categories are broad
> 📋 **Document your reasoning**: Record why you determined a system does or doesn't match a category
> 🤝 **Involve the business**: System users often know details about impact that the compliance team doesn't
> 🔄 **Reassess on change**: New features, new user groups, or new deployment regions may change the category match
    `
  },
  "transparency-obligations": {
    slug: "transparency-obligations",
    title: "Transparency Obligations",
    description: "Complete guide to Article 50 transparency requirements — when disclosure is required, what form it should take, and how to document compliance in Klarvo.",
    readTime: "6 min",
    category: "Classification & Risk Assessment",
    categorySlug: "classification",
    lastUpdated: "2026-02-15",
    relatedArticles: ["classification-engine", "high-risk-categories", "classification-memos"],
    content: `
## Transparency Obligations (Article 50)

Article 50 of the EU AI Act establishes transparency obligations for certain AI systems, regardless of their risk classification. Even a "minimal risk" system may have transparency duties if it interacts with people or generates synthetic content.

### The Five Transparency Scenarios

#### Scenario 1: Direct Interaction with People

**When it applies**: Your AI system interacts directly with natural persons (e.g., chatbots, virtual assistants, AI-powered support agents).

**What you must do**: Inform the person that they are interacting with an AI system — unless this is obvious from the circumstances and context to a reasonably well-informed, observant, and circumspect person.

**Implementation**:
- Display a clear notice at the start of interaction: "You are chatting with an AI assistant"
- For voice systems: Audio disclosure at conversation start
- The notice must be timely, clear, and intelligible

**Evidence to upload**: Screenshot or copy of the disclosure notice as displayed to users.

#### Scenario 2: Synthetic Content Generation

**When it applies**: Your AI system generates synthetic audio, image, video, or text content.

**What you must do**: Ensure outputs are marked as artificially generated or manipulated in a machine-readable format. This is primarily a **provider** obligation, but deployers should verify their provider complies and understand what markings exist.

**Implementation**:
- Verify your AI provider marks outputs (e.g., C2PA metadata, watermarking)
- For text: Consider visible disclaimers like "AI-generated content"
- Document what marking method is used

**Evidence to upload**: Provider documentation confirming output marking capability, plus examples of marked outputs.

#### Scenario 3: Emotion Recognition or Biometric Categorisation

**When it applies**: Your system performs emotion recognition or biometric categorisation on people (in contexts not prohibited by Article 5).

**What you must do**: Inform the persons exposed to the system about its operation and process personal data in accordance with applicable data protection law.

**Implementation**:
- Prominent notice where the system operates (e.g., signage, on-screen notice)
- Privacy notice update to cover biometric/emotion data processing
- Data protection impact assessment (likely required under GDPR)

**Evidence to upload**: Notice copy/screenshot, updated privacy policy excerpt, DPIA reference.

#### Scenario 4: Deepfake Disclosure

**When it applies**: Your system generates or manipulates image, audio, or video content that constitutes a "deep fake" — content that appreciably resembles existing persons, objects, places, or events and would falsely appear authentic.

**What you must do**: Disclose that the content has been artificially generated or manipulated.

**Implementation**:
- Visible label on generated content: "This content was generated using AI"
- For video/audio: Disclosure at start and end
- Metadata marking in addition to visible labels

**Evidence to upload**: Examples of disclosure labels, content policy documentation.

#### Scenario 5: AI-Generated Text on Public Interest Matters

**When it applies**: Your AI system generates or manipulates text that is published for the purpose of informing the public on matters of public interest.

**What you must do**: Disclose that the content was AI-generated or manipulated — unless the content is subject to human editorial review and a natural or legal person holds editorial responsibility for the publication.

**Key exception**: If a human editor reviews and takes editorial responsibility, the disclosure obligation may not apply. This exception is important for media companies and content platforms.

**Evidence to upload**: Editorial workflow documentation if claiming the exception; disclosure labels if not.

### Documenting Transparency Compliance in Klarvo

For each applicable scenario:

1. The wizard flags the relevant transparency obligation during Step 10
2. Tasks are auto-created: "Implement [scenario] disclosure" and "Upload disclosure evidence"
3. Controls TRN-01 through TRN-07 are attached to the system
4. Upload evidence (screenshots, policy docs, provider confirmations) to the Evidence Vault
5. Link evidence to the relevant TRN control

### Accessibility

All transparency notices must be accessible — consider users with disabilities. This includes:
- Sufficient contrast for visual notices
- Alternative text for images
- Screen reader compatibility
- Clear, simple language (avoid legal jargon in user-facing notices)

### Best Practices

> 🔍 **Screen every system**: Transparency obligations apply regardless of risk level
> 📸 **Screenshot everything**: Capture how disclosures appear to users — this is your primary evidence
> 🔄 **Update on UI changes**: Any major UI change should trigger a re-capture of transparency evidence
> 📋 **Check provider compliance**: For synthetic content marking, verify your provider's capabilities
    `
  },
  "classification-memos": {
    slug: "classification-memos",
    title: "Classification Memos & Sign-off",
    description: "How to generate, review, and sign off on classification memos — the audit-ready document that records your AI system's risk classification rationale and reviewer approval.",
    readTime: "4 min",
    category: "Classification & Risk Assessment",
    categorySlug: "classification",
    lastUpdated: "2026-02-15",
    relatedArticles: ["classification-engine", "classification-exports", "export-overview"],
    content: `
## Classification Memos & Sign-off

A Classification Memo is the auditable document that records how and why an AI system was classified at a particular risk level. It's auto-generated after completing the AI System Wizard and serves as the foundation of your compliance evidence for that system.

### What a Classification Memo Contains

Every memo includes:

| Section | Content |
|---------|---------|
| **System Identity** | Name, internal ID, department, vendor (if applicable) |
| **Classification Result** | Risk level: Minimal / Limited / High-Risk Candidate / Blocked |
| **Confidence Level** | High / Medium / Low — based on answer certainty |
| **AI Definition Test Result** | Likely AI System / Likely Not / Needs Review + rationale |
| **Prohibited Screening Result** | No indicators / Potential prohibited (with details) / Needs legal review |
| **High-Risk Screening Result** | Matched categories (if any) + rationale |
| **Transparency Screening Result** | Applicable scenarios (if any) |
| **Applicable Obligations** | List of obligations triggered by the classification |
| **Reviewer** | Name of the person who reviewed and confirmed |
| **Sign-off Date** | Date of formal approval |
| **Classification Rationale** | Free-text explanation of the reasoning |

### The Sign-off Process

Classification requires formal reviewer sign-off:

1. **Complete the wizard**: All classification steps must be answered
2. **Review pre-filled classification**: The engine suggests a classification based on your answers
3. **Override if needed**: If you disagree with the engine's suggestion, you can override — but must provide a written justification (recorded in audit trail)
4. **Assign reviewer**: Select a team member with Reviewer/Approver or higher role
5. **Confirm sign-off**: Enter the sign-off date and any notes
6. **Generate memo**: The PDF is auto-generated and stored

### Human Override

The classification engine provides a suggestion, but humans always have the final say:

- If you override the engine's suggestion, you must provide a reason
- The override is permanently recorded: original engine result, override decision, and rationale
- Overrides are flagged in the audit trail for transparency
- This is a feature, not a bug — the engine can't capture every contextual nuance

### Version History

Classifications can change over time. Every change creates a new version:

- **Original classification**: V1 with initial wizard answers
- **Re-classification**: V2+ with change reason documented
- **Reassessment-triggered**: When material changes, incidents, or vendor updates occur

Each version is preserved — you can always see the full classification history, which demonstrates ongoing compliance.

### Downloading and Sharing

To download a Classification Memo:

1. Open the AI System detail page
2. Click **Exports** → **Classification Memo**
3. Choose PDF format
4. The memo downloads with your organization branding, document control, and confidentiality marking

You can also include the memo in a full Evidence Pack ZIP export.

### Best Practices

> ✅ **Always sign off**: An unsigned classification has limited audit value
> 📝 **Write clear rationale**: A reviewer should understand your reasoning without asking questions
> 🔄 **Re-classify when things change**: New features, new user groups, vendor changes — all merit re-classification
> 📋 **Store in evidence vault**: The memo PDF is automatically linked; ensure related evidence is also attached
    `
  },

  // =============================================
  // FRIA
  // =============================================
  "fria-requirements": {
    slug: "fria-requirements",
    title: "When is FRIA Required?",
    description: "Understand the triggers and requirements for conducting a Fundamental Rights Impact Assessment under Article 27 — who must conduct one, when, and what it must include.",
    readTime: "6 min",
    category: "FRIA",
    categorySlug: "fria",
    lastUpdated: "2026-02-15",
    relatedArticles: ["fria-wizard", "fria-risks", "high-risk-categories"],
    content: `
## Fundamental Rights Impact Assessment (FRIA)

Article 27 of the EU AI Act requires certain deployers of high-risk AI systems to conduct a Fundamental Rights Impact Assessment before first use — and to update it when circumstances change.

### Who Must Conduct a FRIA?

FRIA is required when **all** of the following are true:

1. **You are a deployer** (you use AI, not just build it)
2. **The AI system is high-risk** (matches an Annex III category)
3. **You fall into one of these categories**:
   - Public body or body governed by public law
   - Private entity providing a public service (hospitals, utilities, transport, etc.)
   - Deployer of certain specific Annex III systems regardless of public/private status — notably credit scoring, insurance risk assessment, and emergency service dispatch

### FRIA Triggers — Decision Tree

\`\`\`
Is the system high-risk (Annex III)?
  → No → FRIA not required
  → Yes ↓

Are you a public authority?
  → Yes → FRIA required
  → No ↓

Do you provide a public service (even as a private entity)?
  → Yes → FRIA required
  → No ↓

Is the system used for credit scoring, insurance risk, or emergency dispatch?
  → Yes → FRIA required
  → No → FRIA not required (but recommended as good practice)
\`\`\`

### When to Conduct FRIA

| Scenario | Timing |
|----------|--------|
| First deployment of high-risk system | **Before** putting into use |
| Material change to the system | **Before** implementing the change |
| New use case or expanded scope | **Before** the expansion |
| Periodic review | As defined in governance policy (recommended annually) |
| After a serious incident | Before resuming use |

### What FRIA Must Include (Article 27 Elements)

**(a) Process Description**: How you use the AI system — intended purpose, decision points affected, workflow integration, human oversight measures.

**(b) Time Period & Frequency**: Expected duration of deployment, frequency of use, scale of people affected per time period.

**(c) Affected Categories of Persons**: Natural persons and groups likely affected — with specific attention to vulnerable groups, geographic scope, and how they'll be informed.

**(d) Specific Risks to Fundamental Rights**: Right-by-right analysis covering non-discrimination, privacy, freedom of expression, worker rights, due process, access to services, safety. Each risk rated by likelihood and severity.

**(e) Human Oversight Measures**: How oversight is designed, competence of oversight personnel, their authority to intervene or stop.

**(f) Mitigation, Governance & Complaints**: Risk mitigation measures mapped to identified risks, governance arrangements, complaint mechanisms, monitoring plans, and reassessment triggers.

### Notification Requirements

After completing FRIA:

1. **Notify the market surveillance authority** using the prescribed template (unless exempt)
2. **Update when circumstances change** — particularly new risks, expanded use, or incidents
3. **Retain records** for the lifetime of the AI system deployment

### Exemptions from Notification

You may be exempt from notification (but not from conducting the FRIA itself) in:
- National security contexts
- Military/defence applications
- Research-only use not affecting real people

### Integration with DPIA

If you've completed a DPIA under GDPR, you can build on it:

| Aspect | DPIA | FRIA |
|--------|------|------|
| Focus | Personal data protection | All fundamental rights |
| Trigger | High-risk data processing | High-risk AI deployment |
| Rights covered | Privacy & data protection | Dignity, non-discrimination, safety, worker rights, etc. |
| Can reference each other | Yes | Yes |

FRIA has a broader scope than DPIA — it covers rights beyond data protection, including non-discrimination, freedom of expression, and worker rights.

### Best Practices

> 📋 **Don't skip the FRIA trigger check**: Even if you're unsure, complete the evaluation — it's documented due diligence
> 🔄 **Plan for updates**: FRIA is not a one-time exercise — material changes require updates
> 👥 **Involve affected groups**: Where practical, consult representatives of affected persons
> 📄 **Use Klarvo's FRIA Wizard**: The structured workflow ensures all Article 27 elements are covered
    `
  },
  "fria-wizard": {
    slug: "fria-wizard",
    title: "FRIA Wizard Walkthrough",
    description: "Step-by-step guide to completing a Fundamental Rights Impact Assessment using Klarvo's FRIA Wizard — every section explained with practical examples and regulatory context.",
    readTime: "12 min",
    category: "FRIA",
    categorySlug: "fria",
    lastUpdated: "2026-02-15",
    relatedArticles: ["fria-requirements", "fria-risks", "fria-mitigation", "fria-reports"],
    content: `
## FRIA Wizard Walkthrough

Klarvo's FRIA Wizard guides you through a structured Fundamental Rights Impact Assessment aligned to the six mandatory elements specified in Article 27. This walkthrough explains each section with practical guidance.

### Before You Start

Ensure you have:
- A classified high-risk AI system in your inventory
- The system's classification memo reviewed
- Access to the system's operational documentation (vendor instructions, SOPs)
- Input from the oversight owner and relevant stakeholders

### Section A: Overview & Scope

**What you capture**:
- FRIA title (e.g., "FRIA — Customer Credit Scoring System Q1 2026")
- Linked AI system (auto-populated)
- Assessment owner (the person leading this FRIA)
- Date started and expected deployment date
- Whether this is a first-use FRIA or an update
- Whether a completed DPIA exists that can be leveraged

**Practical tip**: If a DPIA exists, reference it explicitly. FRIA builds on DPIA but covers additional rights beyond data protection.

### Section B: Process Description (Article 27(a))

**What you capture**:
- Detailed description of how your organisation uses the AI system in its operations
- The intended purpose within your specific process
- Which decision points are affected by AI outputs
- How human oversight is integrated into the process
- Attached process diagrams or SOPs (recommended)

**Example**: "The AI system is used in our loan application review process. It scores applicant creditworthiness based on financial history, income data, and employment records. The score is presented to a human loan officer who makes the final approval/rejection decision. The AI score is one of five factors the officer considers."

### Section C: Time Period & Frequency (Article 27(b))

**What you capture**:
- Expected duration of deployment (6 months, 1 year, ongoing)
- Frequency of use (continuous, daily, weekly, monthly, ad hoc)
- Estimated scale: how many people are affected per month

**Example**: "Ongoing deployment. Used daily. Approximately 500 loan applications assessed per month, affecting 500 individuals."

### Section D: Affected Categories of Persons (Article 27(c))

**What you capture**:
- Categories of people likely affected (applicants, customers, employees, students, patients, general public)
- Whether vulnerable groups are present (minors, elderly, people with disabilities, economically disadvantaged)
- How affected persons will be informed about the system's use
- Accessibility considerations

**Example**: "Primarily affects loan applicants aged 18-70. Some applicants may be economically disadvantaged (the purpose is credit assessment). Applicants are informed via the loan application disclosure notice."

### Section E: Risks to Fundamental Rights (Article 27(d))

This is the core of the FRIA. For each relevant fundamental right, identify potential harms:

| Right Category | Example Risks |
|---------------|---------------|
| Non-discrimination / fairness | Bias in scoring against protected groups; disparate impact on minorities |
| Privacy & data protection | Excessive data collection; profiling without adequate legal basis |
| Freedom of expression | Content filtering affecting legitimate expression (if applicable) |
| Worker rights | Unfair performance evaluation; excessive monitoring |
| Due process / contestability | No mechanism to challenge AI-influenced decisions |
| Access to essential services | Unfair denial of credit, insurance, or healthcare |
| Safety / wellbeing | Physical or psychological harm from incorrect outputs |

For each identified risk:
- Rate **likelihood** (Low / Medium / High)
- Rate **severity** (Low / Medium / High)
- Provide supporting evidence or reasoning
- Cross-reference with any existing DPIA analysis

### Section F: Human Oversight Measures (Article 27(e))

**What you capture**:
- How oversight is designed (HITL, HOTL, HOOTL)
- Competence and training requirements for oversight personnel
- Whether the oversight person has authority to intervene, override, or stop the system
- Evidence of oversight capability (training records, SOP, authority documentation)

### Section G: Mitigation, Governance & Complaints (Article 27(f))

**What you capture**:
- Specific mitigations mapped to each identified risk (e.g., "Regular bias testing quarterly to address discrimination risk")
- Governance arrangements (who reviews FRIA results, escalation paths)
- Complaint mechanism (how affected persons can raise concerns)
- Monitoring plan (what metrics are tracked, how often reviewed)
- Reassessment triggers (what changes would require a FRIA update)

### Section H: Approval & Notification

**What you capture**:
- Final conclusion: Approve / Approve with Mitigations / Do Not Deploy
- Approver name(s) and date
- Whether market surveillance authority notification is required
- Upload notification submission evidence (if applicable)

### Auto-Generated Outputs

After completing the FRIA Wizard:

1. **FRIA Report PDF**: Professional, audit-ready document covering all sections
2. **FRIA Result Summary**: One-page executive summary
3. **Mitigation Tasks**: Auto-created tasks for each identified mitigation measure
4. **Monitoring Schedule**: Calendar items for periodic review

### Best Practices

> 📋 **Be specific**: Generic risk statements like "there may be bias" are insufficient — describe the specific mechanism of harm
> 👥 **Consult stakeholders**: Include perspectives from system users, affected communities (where practical), and subject matter experts
> 🔄 **Plan for updates**: Set a reassessment date and define what changes trigger a FRIA update
> 📄 **Reference the DPIA**: If one exists, cross-reference rather than duplicate analysis
    `
  },
  "fria-risks": {
    slug: "fria-risks",
    title: "Identifying Fundamental Rights Risks",
    description: "Practical guide to identifying and assessing risks to fundamental rights when conducting a FRIA — with right-by-right analysis frameworks and SME-relevant examples.",
    readTime: "8 min",
    category: "FRIA",
    categorySlug: "fria",
    lastUpdated: "2026-02-15",
    relatedArticles: ["fria-requirements", "fria-wizard", "fria-mitigation"],
    content: `
## Identifying Fundamental Rights Risks

Section (d) of the FRIA requires you to identify specific risks of harm to fundamental rights. This guide provides a practical framework for conducting this analysis — right by right, with SME-relevant examples.

### The Rights Framework

The EU Charter of Fundamental Rights provides the reference. For AI systems, the most commonly relevant rights are:

### 1. Non-Discrimination & Equality (Articles 21–22 Charter)

**Risk**: AI outputs may systematically disadvantage people based on protected characteristics (race, gender, age, disability, religion, sexual orientation).

**How it manifests**:
- Training data reflects historical biases → AI reproduces them
- Proxy variables correlate with protected characteristics → indirect discrimination
- Unequal performance across demographic groups → disparate impact

**Assessment questions**:
- Has the model been tested for bias across protected groups?
- Are there known demographic performance gaps?
- Could proxy variables (postcode, name patterns, education institution) correlate with protected characteristics?

**SME example**: An ATS (applicant tracking system) that filters CVs may score candidates from certain universities higher — if those universities have demographic skew, this creates indirect discrimination.

### 2. Privacy & Data Protection (Articles 7–8 Charter)

**Risk**: AI processing may involve disproportionate data collection, opaque profiling, or insufficient legal basis.

**Assessment questions**:
- Is data collection proportionate to the purpose?
- Is there a valid legal basis for processing?
- Are data subjects informed about AI involvement in processing?
- Can individuals exercise their GDPR rights (access, erasure, objection)?

**Cross-reference**: Your DPIA analysis directly feeds this section.

### 3. Freedom of Expression & Information (Article 11 Charter)

**Risk**: AI systems that filter, moderate, rank, or generate content may affect freedom of expression.

**Assessment questions**:
- Does the system filter or suppress content? On what basis?
- Could automated moderation create chilling effects?
- Is AI-generated content replacing human editorial judgment?

### 4. Worker Rights (Articles 27–31 Charter)

**Risk**: AI in workplace contexts may affect working conditions, fair treatment, privacy, or collective rights.

**Assessment questions**:
- Does the system monitor employee behaviour or productivity?
- Are hiring/promotion/termination decisions influenced by AI?
- Have workers/representatives been consulted?
- Is there a mechanism for workers to challenge AI-influenced decisions?

### 5. Due Process & Right to Contest (Article 47 Charter)

**Risk**: People affected by AI-assisted decisions may have no effective way to understand, challenge, or contest the decision.

**Assessment questions**:
- Can affected persons understand why a decision was made?
- Is there a mechanism to request human review of AI-assisted decisions?
- Are appeal or complaint procedures documented and accessible?

### 6. Access to Essential Services

**Risk**: AI systems in credit, insurance, healthcare, housing, or public services may unfairly restrict access.

**Assessment questions**:
- Could certain groups be systematically denied access?
- Are alternative pathways available if the AI decision is unfavourable?
- Is there human review before final denial of service?

### 7. Safety & Wellbeing (Article 3 Charter)

**Risk**: Incorrect, unreliable, or manipulative AI outputs could cause physical or psychological harm.

**Assessment questions**:
- What happens if the AI output is wrong? What's the worst-case impact?
- Are there safety-critical pathways where AI errors could cause physical harm?
- Could AI interactions cause psychological distress?

### Risk Rating Framework

For each identified risk, rate:

| Dimension | Low | Medium | High |
|-----------|-----|--------|------|
| **Likelihood** | Unlikely; strong controls exist | Possible; controls partially mitigate | Probable; weak or no controls |
| **Severity** | Minor inconvenience; easily reversible | Significant impact; difficult to reverse | Serious harm; irreversible or large-scale |

Combine into an overall risk level:

| | Low Severity | Medium Severity | High Severity |
|---|---|---|---|
| **Low Likelihood** | Minimal | Low | Medium |
| **Medium Likelihood** | Low | Medium | High |
| **High Likelihood** | Medium | High | Critical |

### Documenting Risks

For each risk, record:

1. **Right affected**: Which fundamental right
2. **Risk description**: Specific mechanism of harm
3. **Affected group**: Who is at risk
4. **Likelihood**: Low / Medium / High with reasoning
5. **Severity**: Low / Medium / High with reasoning
6. **Existing mitigations**: What's already in place
7. **Residual risk**: After mitigations, what remains
8. **Additional mitigations needed**: What else should be done

### Best Practices

> 🎯 **Be specific**: "Bias risk" is too vague — describe the specific bias mechanism and affected group
> 📊 **Use data where available**: If the vendor provides bias test results, reference them
> 👥 **Consult domain experts**: HR for employment AI, credit professionals for lending AI
> 🔄 **Revisit regularly**: Risk profiles change as systems evolve and more data becomes available
    `
  },
  "fria-mitigation": {
    slug: "fria-mitigation",
    title: "Mitigation Measures & Oversight",
    description: "How to design and document effective mitigation measures for fundamental rights risks identified in your FRIA, including oversight arrangements, complaint mechanisms, and monitoring plans.",
    readTime: "7 min",
    category: "FRIA",
    categorySlug: "fria",
    lastUpdated: "2026-02-15",
    relatedArticles: ["fria-risks", "fria-wizard", "fria-reports"],
    content: `
## Mitigation Measures & Oversight

After identifying fundamental rights risks in your FRIA, Article 27 requires you to document mitigation measures, governance arrangements, complaint mechanisms, and monitoring plans. This guide provides practical frameworks for each.

### Designing Effective Mitigations

Every identified risk should have at least one mitigation measure. Effective mitigations are:

- **Specific**: Clearly describes what action is taken
- **Measurable**: You can verify it's working
- **Assigned**: Someone is responsible for implementation
- **Time-bound**: Has a deadline or ongoing schedule
- **Proportionate**: Effort matches the risk level

### Mitigation Categories

#### Technical Mitigations

| Mitigation | Addresses | Example |
|-----------|-----------|---------|
| Bias testing | Discrimination risk | Quarterly bias audit across gender, age, ethnicity |
| Performance monitoring | Accuracy/reliability risk | Weekly accuracy threshold checks with alerts |
| Input validation | Data quality risk | Automated checks for data completeness and format |
| Output constraints | Safety risk | Hard limits on AI output values; rejection of out-of-range results |
| Explainability features | Due process risk | SHAP/LIME explanations generated for each decision |
| Logging & audit trail | Accountability risk | All inputs, outputs, and decisions logged with timestamps |

#### Organisational Mitigations

| Mitigation | Addresses | Example |
|-----------|-----------|---------|
| Human review step | Multiple rights | Loan officer reviews every AI-flagged rejection before final decision |
| Training program | Competence risk | Operators complete AI literacy + domain-specific training before system access |
| Escalation procedure | Incident risk | Clear escalation path when AI output seems incorrect or harmful |
| Regular review cadence | Drift risk | Quarterly review of system performance, bias metrics, and incident patterns |
| Stakeholder consultation | Representation risk | Annual feedback session with employee representatives about AI workplace tools |

#### Governance Mitigations

| Mitigation | Addresses | Example |
|-----------|-----------|---------|
| Oversight SOP | Authority risk | Documented procedure granting oversight owner authority to pause the system |
| Change management | Evolution risk | Any model update triggers re-evaluation of FRIA risk ratings |
| Vendor oversight | Supply chain risk | Annual vendor review including updated bias test results and security docs |
| Incident response plan | Harm response | Defined process for containment, notification, and resolution of AI incidents |

### Human Oversight Design (Article 27(e))

The FRIA must document how human oversight is designed. Key elements:

**Oversight Model**:
- **HITL (Human-in-the-Loop)**: Human must approve every AI output before it takes effect — strongest oversight
- **HOTL (Human-on-the-Loop)**: Human monitors AI outputs in real-time and can intervene — balanced approach
- **HOOTL (Human-out-of-the-Loop)**: AI operates autonomously; human reviews retrospectively — weakest oversight

**Competence Requirements**: What training and knowledge the oversight person needs — document the minimum competency profile.

**Authority**: The oversight person must have the organisational authority to:
- Override AI outputs
- Pause or stop the system
- Escalate concerns without negative consequences

### Complaint Mechanisms (Article 27(f))

You must provide affected persons with a way to raise concerns:

- **Accessible**: Easy to find and use (not buried in T&Cs)
- **Responsive**: Defined response timeframes (e.g., acknowledge within 5 business days)
- **Effective**: Complaints lead to investigation and, where warranted, remediation
- **Documented**: All complaints logged with outcomes

**Example implementation**: "Affected individuals can submit a complaint via our support form at [URL], referencing the AI-assisted decision. Complaints are reviewed by a human within 5 business days. If the complaint is upheld, the decision is reconsidered with human-only assessment."

### Monitoring Plans

Define what you monitor and how often:

| What to Monitor | Method | Frequency |
|----------------|--------|-----------|
| Model accuracy | Automated metrics | Weekly |
| Bias metrics (by protected group) | Statistical testing | Quarterly |
| User complaints about AI | Support ticket analysis | Monthly |
| Incident count & severity | Incident log review | Monthly |
| Oversight effectiveness | Intervention rate analysis | Quarterly |
| Evidence validity | Expiration check | Monthly |

### Reassessment Triggers

Define what changes require a FRIA update:

- Material change to the AI system (new model version, new features)
- Expansion to new user groups or geographies
- Serious incident involving the system
- Change in vendor or underlying model
- Regulatory guidance or enforcement action relevant to your use case
- Significant increase in scale of affected persons

### Best Practices

> 🎯 **Map mitigations to risks**: Every identified risk should have at least one corresponding mitigation
> 📋 **Create tasks**: Use Klarvo to auto-generate tasks for each mitigation action
> 📊 **Measure effectiveness**: Don't just implement mitigations — verify they work
> 🔄 **Living document**: The FRIA should evolve with your system — not gather dust
    `
  },
  "fria-reports": {
    slug: "fria-reports",
    title: "Generating FRIA Reports",
    description: "How to generate, review, and share audit-ready FRIA reports from Klarvo — including PDF output structure, approval workflows, and notification to market surveillance authorities.",
    readTime: "4 min",
    category: "FRIA",
    categorySlug: "fria",
    lastUpdated: "2026-02-15",
    relatedArticles: ["fria-wizard", "fria-mitigation", "export-overview"],
    content: `
## Generating FRIA Reports

After completing the FRIA Wizard, Klarvo generates a professional, audit-ready report that can be shared with leadership, auditors, and market surveillance authorities.

### Report Structure

The FRIA Report PDF follows a structured format aligned to Article 27:

| Section | Content |
|---------|---------|
| **Cover Page** | Title, organisation, AI system name, date, confidentiality marking |
| **Document Control** | Version number, revision history, approvals |
| **Executive Summary** | One-page overview: system, risks identified, overall conclusion |
| **1. Process Description** | How the AI is used, decision points, workflow integration |
| **2. Time Period & Frequency** | Duration, frequency, scale of affected persons |
| **3. Affected Categories** | Who is affected, vulnerable groups, notification approach |
| **4. Fundamental Rights Risks** | Right-by-right analysis with likelihood/severity ratings |
| **5. Human Oversight** | Oversight model, competence, authority to intervene |
| **6. Mitigations & Governance** | Risk mitigations, governance arrangements, complaint mechanism, monitoring plan |
| **7. Conclusion & Approval** | Approve / Approve with Mitigations / Do Not Deploy |
| **8. Notification Status** | Whether authority notification is required and its status |
| **Appendix** | Full questionnaire answers, evidence references |

### Generating the Report

1. Complete all sections of the FRIA Wizard
2. Navigate to the FRIA detail page for your assessment
3. Click **Export** → **FRIA Report (PDF)**
4. The report generates with your organization branding and document control
5. Download or share via secure link

### Approval Workflow

Before sharing externally, FRIA reports should go through approval:

1. **Author completes** the FRIA Wizard → Draft status
2. **Reviewer reviews** risk analysis and mitigations → May request changes
3. **Approver signs off** → Approved status with name and date recorded
4. **Report generated** → Final version with approval metadata embedded

Multiple approvers can be assigned for critical systems.

### Authority Notification

If notification to the market surveillance authority is required:

1. The FRIA report includes a **notification-ready data section** with all required fields
2. Export the report as PDF
3. Submit to your national market surveillance authority using their prescribed channel
4. Upload the submission confirmation back to Klarvo as evidence
5. Record the notification date and reference number

### Version Control

FRIAs are living documents. When you update a FRIA:

- The previous version is preserved in full
- A new version is created with change reasons documented
- The version history is included in the report's Document Control section
- All versions remain accessible for audit purposes

### FRIA Result Summary

In addition to the full report, Klarvo generates a **one-page FRIA summary** — ideal for:

- Board/leadership briefings
- Quick reference during audits
- Internal communication about AI risk posture

### Best Practices

> ✅ **Complete before deployment**: FRIA must be done before first use — don't deploy and backfill
> 📋 **Get formal approval**: An unapproved FRIA has limited compliance value
> 📤 **Notify when required**: Don't skip authority notification if it applies
> 🔄 **Update on changes**: Material changes require a FRIA update, not a new FRIA from scratch
> 📁 **Store in Evidence Vault**: Link the FRIA report to the AI system and relevant controls
    `
  },

  // =============================================
  // EVIDENCE & DOCUMENTATION
  // =============================================
  "evidence-vault": {
    slug: "evidence-vault",
    title: "Evidence Vault Overview",
    description: "Learn how to organize, manage, and maintain audit-ready compliance evidence in Klarvo's Evidence Vault — the secure repository for all your compliance documentation.",
    readTime: "5 min",
    category: "Evidence & Documentation",
    categorySlug: "evidence",
    lastUpdated: "2026-02-15",
    relatedArticles: ["uploading-evidence", "approval-workflows", "linking-evidence", "evidence-expiration"],
    content: `
## Evidence Vault Overview

The Evidence Vault is Klarvo's secure repository for all compliance documentation. It stores, organizes, and manages every artifact needed for EU AI Act compliance — from vendor DPAs to transparency notice screenshots.

### What Goes in the Evidence Vault?

| Evidence Type | Examples | Typical Source |
|--------------|---------|----------------|
| **Vendor documentation** | DPAs, security whitepapers, model cards, SOC 2 reports | Vendor / procurement |
| **Internal policies** | AI acceptable use policy, oversight procedures, incident response plan | Compliance / legal |
| **Training materials** | Course content, completion certificates, quiz results | HR / training |
| **Risk assessments** | FRIA reports, DPIAs, internal risk reviews | Compliance |
| **Monitoring reports** | Performance metrics, bias test results, drift analysis | Engineering / data science |
| **Incident documentation** | Incident logs, postmortem reports, corrective actions | Operations / security |
| **Transparency notices** | Disclosure screenshots, notification copy, accessibility statements | Product / UX |
| **Oversight documentation** | SOPs, authority delegation, training records | Compliance / HR |

### Evidence Organization

Evidence can be attached to multiple entities:

- **AI System**: System-specific documentation (the most common linkage)
- **Control**: Proof that a specific control is implemented (e.g., evidence for DEP-02 "Human Oversight Assigned")
- **Vendor**: Vendor due diligence records
- **Policy**: Supporting materials for a policy document
- **Task**: Completion evidence for a compliance task
- **Incident**: Investigation and resolution records

### Evidence Metadata

Every file in the vault carries metadata:

- **Name & Description**: What this document proves
- **Evidence Type**: Policy, screenshot, report, attestation, certificate, training record
- **Uploaded By / Date**: Who added it and when
- **Status**: Draft → Pending Approval → Approved (or Rejected → back to Draft)
- **Expiration Date**: When this evidence needs to be refreshed
- **Confidentiality**: Internal Only / Shareable with Auditor
- **Tags**: Custom labels for filtering and organization
- **Linked Entities**: Which systems, controls, or vendors this evidence supports

### Evidence Completeness Score

Each AI system shows an **Evidence Completeness** percentage:
- Calculated based on required evidence for applicable controls
- Missing evidence is listed in the Gap Checklist
- Improving this score directly improves your Audit Readiness Score

### Security & Access

- **Role-based access**: Who can view, upload, and approve evidence is controlled by role
- **Audit trail**: Every action (upload, approve, delete, download) is logged
- **Version history**: When you upload a new version of a document, previous versions are preserved
- **Encryption**: Files are encrypted at rest and in transit

### Best Practices

> 📁 **Link evidence to controls**: Don't just upload files — connect them to the specific control they support
> 📅 **Set expiration dates**: Vendor certifications, training records, and risk assessments all have limited validity
> ✅ **Use approval workflows**: For audit-critical documents, require formal approval before they count toward compliance
> 🏷️ **Tag consistently**: Develop a taxonomy (e.g., "vendor-security", "training-completion", "transparency-notice") and use it
> 🔄 **Quarterly review**: Schedule a quarterly evidence hygiene review to catch expired or outdated documents
    `
  },
  "uploading-evidence": {
    slug: "uploading-evidence",
    title: "Uploading & Organizing Evidence",
    description: "Step-by-step guide to uploading evidence files, setting metadata, linking to AI systems and controls, and maintaining an organized evidence vault.",
    readTime: "6 min",
    category: "Evidence & Documentation",
    categorySlug: "evidence",
    lastUpdated: "2026-02-15",
    relatedArticles: ["evidence-vault", "linking-evidence", "approval-workflows"],
    content: `
## Uploading & Organizing Evidence

Getting evidence into Klarvo is straightforward. This guide covers the upload process, metadata best practices, and organizational strategies to keep your vault audit-ready.

### How to Upload Evidence

#### Method 1: From the Evidence Vault
1. Navigate to **Evidence** in the sidebar
2. Click **Upload Evidence**
3. Drag and drop files or click to browse
4. Fill in metadata (see below)
5. Click **Save**

#### Method 2: From an AI System
1. Open the AI System detail page
2. Navigate to the **Evidence** tab
3. Click **Add Evidence**
4. Upload and the evidence is automatically linked to that system

#### Method 3: From a Control
1. Open **Controls** and find the relevant control
2. Click **Add Evidence** in the evidence section
3. Upload and the evidence is automatically linked to that control

#### Method 4: During the Wizard
Several wizard steps accept file uploads inline — vendor contracts, oversight SOPs, training materials. Files uploaded during the wizard are automatically linked to the system being created.

### Supported File Types

| Category | Formats |
|----------|---------|
| Documents | PDF, DOCX, DOC, TXT, MD |
| Spreadsheets | XLSX, XLS, CSV |
| Images | PNG, JPG, JPEG, GIF, SVG |
| Presentations | PPTX, PPT |
| Archives | ZIP (for bundled evidence) |

Maximum file size: 50 MB per file.

### Setting Metadata

When uploading, fill in these fields:

| Field | Guidance |
|-------|----------|
| **Name** | Descriptive name: "Vendor X SOC 2 Report 2025" not "doc1.pdf" |
| **Description** | What this document proves: "Demonstrates vendor security controls meet SOC 2 Type II requirements" |
| **Evidence Type** | Select: Policy, Screenshot, Report, Attestation, Certificate, Training Record, Contract, Other |
| **Expiration Date** | When this evidence needs refresh — e.g., annual certifications expire in 12 months |
| **Confidentiality** | Internal Only (default) or Shareable with Auditor |
| **Tags** | Add relevant tags for filtering: "vendor-security", "soc2", "annual-renewal" |

### Linking Evidence to Entities

Evidence gains compliance value when linked:

- **Link to AI System**: Shows up in that system's evidence tab and contributes to its completeness score
- **Link to Control**: Proves the control is implemented — this is the most valuable linkage
- **Link to Vendor**: Supports vendor due diligence
- **Link to Task**: Proves a compliance task was completed

You can link a single piece of evidence to multiple entities. For example, a vendor's SOC 2 report might be linked to the vendor record, the AI system that uses it, and the VEN-03 control.

### Organizational Strategies

**By system**: Create a mental model of "everything related to System X is linked to System X"

**By control family**: Tag evidence by control family (GOV, DEP, TRN, VEN, etc.) for easy filtering

**By renewal cycle**: Use expiration dates and tags like "annual-renewal" to batch renewal efforts

### Naming Conventions

Adopt a consistent naming convention:

\`\`\`
[Type]_[Entity]_[Description]_[Date]
\`\`\`

Examples:
- "Certificate_VendorX_SOC2_2025-12"
- "Screenshot_Chatbot_DisclosureNotice_2026-01"
- "Policy_Internal_AIAcceptableUse_v2"
- "Training_AllStaff_AILiteracy_CompletionReport_Q1-2026"

### Best Practices

> 📋 **Upload immediately**: Don't let evidence accumulate — upload when you receive or create it
> 🏷️ **Metadata matters**: Well-tagged, well-described evidence is 10x more useful during an audit
> 🔗 **Link aggressively**: Every piece of evidence should be linked to at least one system or control
> 📅 **Set expirations**: This prevents stale evidence from counting toward compliance
> 📸 **Screenshots are evidence**: A screenshot of your transparency notice in production is valid evidence
    `
  },
  "approval-workflows": {
    slug: "approval-workflows",
    title: "Approval Workflows",
    description: "How evidence approval workflows work in Klarvo — from submission to approval, rejection handling, and maintaining separation of duties for audit-critical documents.",
    readTime: "5 min",
    category: "Evidence & Documentation",
    categorySlug: "evidence",
    lastUpdated: "2026-02-15",
    relatedArticles: ["evidence-vault", "uploading-evidence", "roles-permissions"],
    content: `
## Approval Workflows

For audit-critical evidence, Klarvo supports approval workflows that ensure documents are reviewed before they count toward compliance. This maintains separation of duties — the person who uploads evidence shouldn't be the same person who approves it.

### Evidence Status Flow

\`\`\`
Draft → Pending Approval → Approved
                          ↘ Rejected → Draft (with feedback)
\`\`\`

- **Draft**: Newly uploaded evidence. Does not count toward compliance metrics. Can be edited freely.
- **Pending Approval**: Submitted for review. The uploader has indicated it's ready. Cannot be edited until reviewed.
- **Approved**: Reviewed and confirmed. Counts toward Evidence Completeness and Audit Readiness scores. Locked from editing (upload a new version instead).
- **Rejected**: Reviewer sent it back with feedback. Returns to Draft status for revision.

### Submitting Evidence for Approval

1. Upload evidence (status = Draft)
2. Review the metadata, description, and linked entities
3. Click **Submit for Approval**
4. Select an approver (must have Reviewer/Approver or higher role)
5. Add optional notes: "Please verify this SOC 2 covers the correct audit period"
6. The approver receives a notification

### Approving or Rejecting Evidence

Approvers see pending items in two places:

- **Approval Queue**: Navigate to **Evidence** → **Pending Approval** tab
- **Notifications**: In-app notification with direct link to the evidence

To review:

1. Open the evidence item
2. Review the file, metadata, description, and linked entities
3. Click **Approve** or **Reject**
4. If rejecting, provide feedback: "SOC 2 report is from 2023 — need the 2025 version"
5. The uploader is notified of the decision

### Who Can Approve?

| Role | Can Upload | Can Approve |
|------|-----------|-------------|
| Admin | ✅ | ✅ |
| Compliance Owner | ✅ | ✅ |
| System Owner | ✅ (own systems) | ❌ |
| Reviewer/Approver | ❌ | ✅ |
| Viewer | ❌ | ❌ |

**Separation of duties**: The person who uploads should ideally not be the same person who approves. This is a best practice for audit integrity, though the system doesn't enforce it for flexibility.

### When to Require Approval

Not all evidence needs formal approval. Use approval workflows for:

- **Audit-critical documents**: Vendor security certifications, policy approvals, risk assessment sign-offs
- **High-risk system evidence**: Any evidence linked to high-risk AI systems
- **External-facing documents**: Anything that might be shared with auditors or regulators
- **Policy documents**: Approved versions of internal policies

For internal screenshots, training completion records, and routine monitoring reports, Draft status may be sufficient.

### Approval History

Every approval decision is recorded:

- Approver name
- Decision (Approved / Rejected)
- Date and time
- Comments / feedback
- This history is included in evidence pack exports for full auditability

### Best Practices

> 👥 **Separate uploader and approver**: Different people for upload vs. approval
> 📋 **Batch approvals**: Review the approval queue weekly rather than one-by-one
> 💬 **Provide feedback on rejection**: Clear feedback helps uploaders fix issues quickly
> 🔒 **Approve before sharing**: Never include Draft evidence in auditor-facing exports
    `
  },
  "evidence-expiration": {
    slug: "evidence-expiration",
    title: "Evidence Expiration & Renewal",
    description: "How to manage evidence validity periods, set expiration dates, and handle renewal workflows to ensure your compliance documentation stays current.",
    readTime: "4 min",
    category: "Evidence & Documentation",
    categorySlug: "evidence",
    lastUpdated: "2026-02-15",
    relatedArticles: ["evidence-vault", "uploading-evidence", "linking-evidence"],
    content: `
## Evidence Expiration & Renewal

Compliance evidence has a shelf life. Vendor certifications expire, training records need annual refresh, risk assessments require periodic updates, and policies evolve. Klarvo's expiration tracking ensures nothing goes stale.

### Why Expiration Matters

Expired evidence is worse than no evidence — it creates a false sense of compliance. During an audit, presenting a 2024 SOC 2 report as current evidence in 2026 undermines credibility. Klarvo tracks validity automatically.

### Setting Expiration Dates

When uploading evidence, set the **Expiration Date** field:

| Evidence Type | Typical Validity | Recommended Expiration |
|--------------|-----------------|----------------------|
| Vendor SOC 2 / ISO 27001 | 12 months from issue | Issue date + 12 months |
| Training completion records | 12 months (annual refresh) | Completion date + 12 months |
| Risk assessments (FRIA, DPIA) | Until material change | Set to next scheduled review date |
| Policy documents | Until next version | Next review date |
| Transparency notice screenshots | Until UI change | 6 months (re-capture periodically) |
| Vendor contracts | Until renewal date | Contract end date |
| Monitoring reports | Until next report | Next report due date |

### What Happens When Evidence Expires

When evidence reaches its expiration date:

1. **Status changes**: Evidence is marked as **Expired** (visually distinct in the vault)
2. **Compliance impact**: Expired evidence no longer counts toward Evidence Completeness or Audit Readiness scores
3. **Task created**: An auto-generated renewal task is assigned to the original uploader
4. **Dashboard alert**: "Expired evidence" alert appears in Compliance Alerts
5. **Control impact**: Controls that relied on this evidence show a gap

### Renewal Workflow

1. Klarvo sends a reminder **30 days before expiration** to the evidence owner
2. A second reminder goes out **7 days before**
3. On expiration day, the evidence is marked expired
4. Upload the renewed document as a **new version** (the expired version is preserved in history)
5. Re-submit for approval if required
6. Link to the same controls and systems

### Bulk Renewal

For organizations with many pieces of evidence expiring at similar times (e.g., annual vendor certification renewals):

1. Navigate to **Evidence** → filter by **Expiring Soon** (next 30 days)
2. Review the list and prioritize
3. Request updated documents from vendors in batch
4. Upload renewed evidence as new versions

### Best Practices

> 📅 **Set expiration dates on upload**: Don't skip this field — it's the trigger for the entire renewal workflow
> ⏰ **Act on 30-day reminders**: Don't wait until expiration day — vendor certifications take time to obtain
> 🔄 **Upload as new version**: Don't delete expired evidence — upload the renewal as a new version to preserve history
> 📊 **Monitor the "Expiring Soon" filter**: Check it monthly as part of your compliance hygiene routine
    `
  },
  "linking-evidence": {
    slug: "linking-evidence",
    title: "Linking Evidence to Controls",
    description: "How to connect evidence artifacts to specific compliance controls — the critical step that proves controls are implemented and drives your audit readiness score.",
    readTime: "5 min",
    category: "Evidence & Documentation",
    categorySlug: "evidence",
    lastUpdated: "2026-02-15",
    relatedArticles: ["evidence-vault", "uploading-evidence", "export-overview"],
    content: `
## Linking Evidence to Controls

Uploading evidence is necessary but not sufficient. The critical step for audit readiness is **linking** evidence to the specific controls it supports. This is what proves a control is actually implemented — not just claimed.

### Why Linking Matters

An auditor doesn't just want to see that you have documents. They want to see:

1. **Which control** does this evidence support?
2. **Is the evidence current** (not expired)?
3. **Is it approved** (not just a draft)?
4. **Does it actually demonstrate** what you claim?

When evidence is linked to a control:
- The control status can be set to "Implemented"
- The evidence appears in the control's evidence section
- It's included in Evidence Pack exports under the correct section
- It contributes to the Evidence Completeness and Audit Readiness scores

### How to Link Evidence

#### From the Control
1. Open **Controls** and find the relevant control (e.g., DEP-02 "Competent Human Oversight Assigned")
2. Click **Add Evidence** in the control's evidence section
3. Either upload new evidence or select existing evidence from the vault
4. The link is created automatically

#### From the Evidence Item
1. Open the evidence item in the vault
2. Click **Link to Control**
3. Search for the control by ID or name
4. Select one or more controls
5. Save

#### From the AI System Detail Page
1. Open the AI system
2. Navigate to the **Controls** tab
3. Find the relevant control
4. Click the evidence icon to attach evidence

### Control-Evidence Mapping Examples

| Control | What Evidence to Link |
|---------|---------------------|
| GOV-01 AI Governance Ownership | System record showing named owners (screenshot) |
| DEP-01 Instructions for Use Stored | Vendor's instructions for use document (PDF) |
| DEP-02 Human Oversight Assigned | Oversight owner assignment + training completion record |
| DEP-08 Logs Retained ≥ 6 Months | Log retention configuration screenshot + retention policy |
| TRN-01 AI Interaction Disclosure | Screenshot of disclosure notice as shown to users |
| VEN-01 Vendor Identified & Contract | Contract PDF or link |
| VEN-03 Vendor Security Evidence | SOC 2 report, ISO 27001 certificate |
| LIT-02 Training Completion Tracked | Training completion report |

### Evidence Quality Indicators

Not all evidence is equal. Strong evidence:

- **Is specific**: Clearly shows what control it supports
- **Is current**: Not expired
- **Is approved**: Went through the approval workflow
- **Is verifiable**: Can be independently confirmed (e.g., a vendor-issued certificate vs. a self-attestation)
- **Is complete**: Covers the full scope of the control (e.g., training completion for all operators, not just one)

### Gap Analysis

Controls without linked evidence show as **gaps** in:

- The AI System's Gap Checklist
- The Controls dashboard
- Evidence Pack exports (marked as "Missing")
- The Audit Readiness Score calculation

### Best Practices

> 🔗 **Link immediately**: When uploading evidence, link it to the relevant control(s) right away
> 📋 **One control, multiple evidence**: A control may need several pieces of evidence (e.g., oversight assignment + training record + SOP)
> 🔍 **Check the gap checklist**: It tells you exactly which controls need evidence
> ✅ **Approved and current**: Only approved, non-expired evidence truly satisfies a control
> 📄 **Export to verify**: Generate an Evidence Pack to see how your evidence looks in audit format
    `
  },

  // =============================================
  // EXPORTS & REPORTS
  // =============================================
  "export-overview": {
    slug: "export-overview",
    title: "Export Pack Overview",
    description: "Learn about Klarvo's audit-ready export packs — PDFs for individual artifacts and ZIP bundles for comprehensive evidence packs, designed to look like professional consultancy deliverables.",
    readTime: "5 min",
    category: "Exports & Reports",
    categorySlug: "exports",
    lastUpdated: "2026-02-15",
    relatedArticles: ["classification-exports", "fria-exports", "evidence-pack", "org-reports"],
    content: `
## Export Pack Overview

Klarvo generates professional, audit-ready export packs that compile your compliance documentation into structured deliverables. These are designed to look like premium consultancy outputs — branded, version-controlled, and cross-referenced.

### Export Types

| Export | Format | Content | Best For |
|--------|--------|---------|----------|
| Classification Memo | PDF | Single system's classification rationale + sign-off | Quick reference, auditor questions |
| FRIA Report | PDF | Complete fundamental rights impact assessment | Regulatory notification, auditor review |
| AI System Evidence Pack | ZIP | All evidence for one system in organized folders | Full audit response for a specific system |
| Organization Governance Pack | PDF | Org-wide compliance summary | Board reporting, procurement responses |
| Board Summary | PDF | 1-3 page executive overview | Leadership briefings |

### Export Quality Standards

All exports include:

- **Organization branding**: Your company name in headers/footers
- **Version control**: Document version, generation date/time, generated by (user name)
- **Document control**: Revision history table (for versioned documents)
- **Confidentiality marking**: "Internal" or "Shareable with Auditor" classification
- **Cross-references**: Evidence IDs (EV-001, EV-002...) and control references
- **"Data Included" summary**: What's inside the export so recipients know at a glance

### Generating an Export

1. Navigate to the relevant entity (AI System, FRIA, or Exports page)
2. Click the **Export** button
3. Select the export type from the dropdown
4. Choose format (PDF or ZIP where applicable)
5. Click **Generate**
6. Download immediately or copy the secure link

### Export History

Every export is logged:

- What was exported, when, and by whom
- Export type and format
- Whether it was downloaded or shared via link
- This history is available in **Exports** → **History**

### Sharing Options

| Method | Use Case |
|--------|----------|
| **Direct download** | Immediate file download to your device |
| **Secure link** | Time-limited URL (configurable: 7/30/90 days) — ideal for emailing to auditors |
| **Auditor portal** | Read-only viewer access with watermarking (Growth plan and above) |

### Best Practices

> 📋 **Pre-flight check**: Review exports before sharing externally — ensure no draft evidence is included
> 🔒 **Mark confidentiality**: Set appropriate confidentiality levels before generating
> 📅 **Regenerate before audits**: Always generate fresh exports to capture the latest data
> 📚 **Archive copies**: Keep copies of shared exports for your records (regulatory retention)
> 🎯 **Match format to audience**: Board → Governance Pack PDF. Auditor → Evidence Pack ZIP. Regulator → FRIA Report PDF.
    `
  },
  "classification-exports": {
    slug: "classification-exports",
    title: "Classification Memo Exports",
    description: "How to generate and use Classification Memo PDFs — the one-page audit-ready document that records your AI system's risk classification, rationale, and reviewer sign-off.",
    readTime: "3 min",
    category: "Exports & Reports",
    categorySlug: "exports",
    lastUpdated: "2026-02-15",
    relatedArticles: ["classification-memos", "export-overview", "evidence-pack"],
    content: `
## Classification Memo Exports

The Classification Memo is a one-page PDF that captures the essential classification decision for an AI system. It's the most frequently generated export — auditors, leadership, and procurement teams all want to see it.

### What's in the Memo

| Section | Content |
|---------|---------|
| **Header** | System name, internal ID, organisation, generation date |
| **Classification Badge** | Risk level with colour coding (green/amber/red) |
| **Confidence Level** | High / Medium / Low |
| **AI Definition Test** | Result + one-line rationale |
| **Prohibited Screening** | Result + any flags noted |
| **High-Risk Screening** | Matched categories (if any) |
| **Transparency Check** | Applicable scenarios (if any) |
| **Applicable Obligations** | Bullet list of triggered obligations |
| **Reviewer** | Name, role, sign-off date |
| **Rationale** | Free-text explanation of the classification reasoning |

### How to Generate

1. Open the AI System detail page
2. Click **Export** → **Classification Memo**
3. The PDF generates instantly
4. Download or copy the secure link

Alternatively, from the **Exports** page, select one or more systems and batch-generate memos.

### When to Use

- **Auditor request**: "Show me how you classified this system"
- **Board reporting**: Include in governance pack appendices
- **Procurement response**: "How do you handle AI risk?" → share the memo
- **Internal review**: Quarterly classification review reference
- **Vendor due diligence**: Share your own system classifications with enterprise customers

### Batch Export

To generate memos for multiple systems:

1. Navigate to **Exports**
2. Select **Classification Memos**
3. Choose systems (or "All classified systems")
4. Generate as individual PDFs in a ZIP bundle

### Best Practices

> ✅ **Only export signed-off memos**: Unsigned classifications should not be shared externally
> 📝 **Ensure rationale is written**: A memo without rationale has limited audit value
> 🔄 **Regenerate after reclassification**: Always export the latest version
    `
  },
  "fria-exports": {
    slug: "fria-exports",
    title: "FRIA Report Exports",
    description: "How to generate and use FRIA Report PDFs — the comprehensive audit-ready document covering your fundamental rights impact assessment, required for authority notification.",
    readTime: "3 min",
    category: "Exports & Reports",
    categorySlug: "exports",
    lastUpdated: "2026-02-15",
    relatedArticles: ["fria-reports", "export-overview", "fria-wizard"],
    content: `
## FRIA Report Exports

The FRIA Report is a comprehensive PDF document covering your entire Fundamental Rights Impact Assessment. It's required for market surveillance authority notification and is a key audit artifact for high-risk AI systems.

### Report Structure

The FRIA Report PDF follows the Article 27 structure:

1. **Cover Page**: Title, organisation, system, date, confidentiality
2. **Document Control**: Version, revision history, approval signatures
3. **Executive Summary**: One-page overview of findings and conclusion
4. **Process Description**: How the AI system is used in your operations
5. **Scope & Scale**: Time period, frequency, number of affected persons
6. **Affected Categories**: Who is impacted, vulnerable groups, notification approach
7. **Fundamental Rights Risk Analysis**: Right-by-right analysis with likelihood/severity ratings
8. **Human Oversight Measures**: Model, competence, authority to intervene
9. **Mitigations & Governance**: Risk mitigations, governance, complaint mechanism, monitoring
10. **Conclusion**: Approve / Approve with Mitigations / Do Not Deploy
11. **Notification Status**: Authority notification requirement and status
12. **Appendix**: Full questionnaire answers, evidence references

### How to Generate

1. Open the FRIA from the AI System detail page or the Assessments section
2. Click **Export** → **FRIA Report (PDF)**
3. Download or copy the secure link

### Using for Authority Notification

If you're required to notify the market surveillance authority:

1. Generate the FRIA Report PDF
2. Review for completeness and accuracy
3. Submit to your national authority using their prescribed channel
4. Upload the submission confirmation to Klarvo as evidence
5. Record the notification date and reference number in the FRIA record

### FRIA Result Summary

In addition to the full report, a **one-page summary** is available — covering the system name, risk classification, key risks identified, overall conclusion, and approval status. Ideal for board briefings and internal communication.

### Best Practices

> ✅ **Complete before deployment**: FRIA must be done before first use
> 📋 **Get formal approval**: Only export approved FRIAs for external use
> 📤 **Notify when required**: Don't delay authority notification
> 🔄 **Update and re-export**: When the FRIA is updated, generate a new version
    `
  },
  "evidence-pack": {
    slug: "evidence-pack",
    title: "Full Evidence Pack (ZIP)",
    description: "How to generate the comprehensive ZIP evidence bundle for a single AI system — organized folders, evidence index, and all linked documentation in one downloadable package.",
    readTime: "5 min",
    category: "Exports & Reports",
    categorySlug: "exports",
    lastUpdated: "2026-02-15",
    relatedArticles: ["export-overview", "classification-exports", "fria-exports", "org-reports"],
    content: `
## Full Evidence Pack (ZIP)

The Evidence Pack is Klarvo's signature export — a comprehensive ZIP bundle containing everything an auditor or regulator needs to assess compliance for a single AI system. It's designed to look like a premium consultancy deliverable.

### ZIP Bundle Structure

\`\`\`
📁 EU-AI-Act_EvidencePack_[Org]_[System]_[Date]/
├── 📁 00_Executive/
│   └── Executive_Summary.pdf
├── 📁 01_Inventory/
│   └── AI_System_Record.pdf
├── 📁 02_Classification/
│   ├── AI_Definition_Test.pdf
│   ├── Prohibited_Screening.pdf
│   ├── Risk_Classification_Memo.pdf
│   └── Transparency_Screening.pdf
├── 📁 03_Obligations/
│   └── Obligations_Checklist.pdf
├── 📁 04_Controls/
│   └── Control_Implementation_Status.pdf
├── 📁 05_Evidence/
│   └── [All linked evidence files organized by type]
├── 📁 06_FRIA/ (if applicable)
│   ├── FRIA_Report.pdf
│   └── FRIA_Summary.pdf
├── 📁 07_Vendor/
│   ├── Vendor_Profile.pdf
│   └── [Vendor documentation files]
├── 📁 08_Training/
│   └── Training_Completion_Report.pdf
├── 📁 09_Incidents/
│   └── Incident_Summary.pdf
└── Evidence_Index.csv
\`\`\`

### Evidence Index

The Evidence_Index.csv is a master reference listing every artifact in the pack:

| Column | Description |
|--------|-------------|
| Evidence ID | Unique identifier (EV-001, EV-002...) |
| Title | Document name |
| Type | Policy, screenshot, report, certificate, etc. |
| Linked Controls | Control IDs this evidence supports |
| Date Collected | Upload date |
| Owner | Who uploaded it |
| Status | Draft / Approved / Expired |
| Shareability | Internal / External |

### Generating an Evidence Pack

1. Open the AI System detail page
2. Click **Export** → **Evidence Pack (ZIP)**
3. Choose options:
   - Include draft evidence? (default: no)
   - Include expired evidence? (default: no, but noted as missing)
   - Confidentiality level: Internal / Shareable with Auditor
4. Click **Generate**
5. Download the ZIP bundle

Generation may take 15-30 seconds for systems with extensive evidence.

### What's Included vs. Excluded

| Included | Excluded |
|----------|----------|
| Approved, current evidence | Draft evidence (optional) |
| Classification memo (signed) | Unsigned classifications |
| FRIA report (if applicable and approved) | FRIA drafts |
| Control status summary | Detailed control configuration |
| Vendor documentation | Internal vendor notes |
| Training completion records | Training content files |
| Incident summary | Full incident details (privacy) |

### Pack Quality Checklist

Before sharing an Evidence Pack externally:

- [ ] All critical controls have linked evidence
- [ ] No draft evidence included (unless intentional)
- [ ] No expired evidence (or explicitly noted)
- [ ] Classification memo is signed off
- [ ] FRIA is approved (if applicable)
- [ ] Confidentiality marking is appropriate

### Best Practices

> 📋 **Review before sharing**: Open the ZIP and check key documents before sending to an auditor
> 📅 **Generate fresh**: Always regenerate before an audit — don't use a pack from months ago
> 🔒 **Use secure sharing**: Share via Klarvo's secure link rather than email attachment
> 📊 **Check completeness first**: Review the Evidence Completeness score — anything below 80% will have visible gaps
    `
  },
  "org-reports": {
    slug: "org-reports",
    title: "Organization-Wide Reports",
    description: "Generate organization-level compliance reports — AI inventory summaries, governance packs for leadership, and audit readiness overviews across all your AI systems.",
    readTime: "4 min",
    category: "Exports & Reports",
    categorySlug: "exports",
    lastUpdated: "2026-02-15",
    relatedArticles: ["export-overview", "evidence-pack", "dashboard-overview"],
    content: `
## Organization-Wide Reports

While Evidence Packs cover individual AI systems, Organization-Wide Reports provide a bird's-eye view of your entire AI compliance posture. These are essential for leadership reporting, board presentations, and enterprise customer assurance.

### Available Organization Reports

#### AI Governance Pack (PDF)

A comprehensive document for leadership and procurement teams:

| Section | Content |
|---------|---------|
| **AI Inventory Summary** | Total systems, classification distribution, deployment regions |
| **Governance & Accountability** | Governance roles, review cadence, audit log overview |
| **High-Risk Systems** | List of high-risk candidates with readiness status per system |
| **Compliance Readiness** | Evidence completeness, control implementation, training coverage |
| **Training Program** | AI literacy coverage stats, completion rates, next refresh dates |
| **Open Gaps** | Prioritized gap list with remediation plan |
| **Timeline** | EU AI Act compliance deadlines relevant to your systems |

#### Board Summary (PDF)

A 1-3 page executive briefing:

- Total AI systems and risk distribution
- Audit Readiness Score trend
- Top 3 risks and mitigations
- Key actions needed
- Budget/resource implications (if applicable)

#### AI System Register Export (CSV/PDF)

A flat export of your complete AI inventory — useful for procurement responses, customer trust questionnaires, and internal reporting.

### How to Generate

1. Navigate to **Exports** in the sidebar
2. Select the report type from the **Organization Reports** section
3. Choose options:
   - Date range (for trend data)
   - Include/exclude retired systems
   - Confidentiality level
4. Click **Generate**
5. Download PDF or CSV

### Use Cases

| Report | Audience | When to Use |
|--------|----------|-------------|
| Governance Pack | Board, C-suite, investors | Quarterly governance reviews |
| Board Summary | Leadership, non-technical stakeholders | Monthly/quarterly board meetings |
| Register Export | Procurement teams, enterprise customers | Customer due diligence, RFP responses |
| Governance Pack | External auditors | Annual audit, regulatory inspection |

### Best Practices

> 📅 **Generate quarterly**: Produce a Governance Pack every quarter for leadership review
> 📊 **Track trends**: Use the Board Summary to show compliance improvement over time
> 🤝 **Share proactively**: Don't wait for customers or auditors to ask — share your Governance Pack as a trust signal
> 🔄 **Regenerate before meetings**: Always generate fresh reports for the most current data
    `
  },

  // =============================================
  // TEAM & COLLABORATION
  // =============================================
  "roles-permissions": {
    slug: "roles-permissions",
    title: "User Roles & Permissions",
    description: "Comprehensive guide to Klarvo's role-based access control system — five built-in roles, permission matrix, special auditor access, and best practices for secure team management.",
    readTime: "5 min",
    category: "Team & Collaboration",
    categorySlug: "team",
    lastUpdated: "2026-02-15",
    relatedArticles: ["invite-team", "task-owners", "activity-feed"],
    content: `
## User Roles & Permissions

Klarvo uses role-based access control (RBAC) to ensure users have appropriate access to compliance data. This is critical for a compliance tool — separation of duties, least-privilege access, and audit trail are non-negotiable.

### The Five Built-in Roles

#### Admin
**Full platform access** — intended for founders, CTO, or Head of Compliance.

Everything including: create/edit/delete any AI system, approve evidence, manage team members, configure integrations, manage billing, generate all reports.

#### Compliance Owner
**Manages the compliance program** — intended for DPO, compliance leads, legal counsel.

Everything except billing and integration configuration. Can invite users (except Admin role). Full access to all AI systems, evidence, controls, and reports.

#### System Owner
**Owns specific AI systems** — intended for product managers, team leads, department heads.

Can view and edit only their assigned AI systems. Upload evidence for their systems. Complete assigned tasks. View (not edit) other systems. Personal settings only.

#### Reviewer/Approver
**Reviews and approves** — intended for senior compliance staff, legal reviewers.

Read access to all AI systems. Can approve/reject evidence, classifications, and policies. Can comment on tasks. Cannot create or edit systems.

#### Viewer
**Read-only access** — intended for leadership, board members, external observers.

Can view dashboards, AI systems (read-only), and shared reports. Cannot edit, upload, or approve anything.

### Complete Permission Matrix

| Capability | Admin | Compliance Owner | System Owner | Reviewer | Viewer |
|-----------|-------|-----------------|-------------|----------|--------|
| Create AI systems | ✅ | ✅ | ❌ | ❌ | ❌ |
| Edit any AI system | ✅ | ✅ | ❌ | ❌ | ❌ |
| Edit own AI systems | ✅ | ✅ | ✅ | ❌ | ❌ |
| Upload evidence | ✅ | ✅ | ✅* | ❌ | ❌ |
| Approve evidence | ✅ | ✅ | ❌ | ✅ | ❌ |
| Create tasks | ✅ | ✅ | ❌ | ❌ | ❌ |
| Complete tasks | ✅ | ✅ | ✅ | ❌ | ❌ |
| Invite members | ✅ | ✅** | ❌ | ❌ | ❌ |
| Manage billing | ✅ | ❌ | ❌ | ❌ | ❌ |
| Export reports | ✅ | ✅ | ✅*** | ✅ | ❌ |
| View audit log | ✅ | ✅ | ❌ | ✅ | ❌ |

\\* Own systems only | \\** Cannot invite Admins | \\*** Own systems only

### Auditor Role (Special)

For external auditors, Klarvo offers restricted time-limited access:

- Read-only access to shared areas
- No editing capabilities
- Export-ready document views
- Time-limited access tokens (configurable expiry)
- Watermarked document views
- Activity logged for compliance

Set up via **Exports** → **Auditor Links**.

### Best Practices

> 🔒 **Least privilege**: Start with Viewer and upgrade as needed
> 👥 **Separate duties**: Different people for uploading evidence vs. approving it
> 📋 **Quarterly access review**: Audit team membership every quarter
> 🚪 **Same-day offboarding**: Remove access immediately when people leave
> 🏷️ **Match roles to responsibilities**: System Owners should be the actual people managing those systems day-to-day
    `
  },
  "task-owners": {
    slug: "task-owners",
    title: "Assigning Task Owners",
    description: "How to assign, reassign, and manage task ownership in Klarvo — ensuring compliance action items have clear accountability and deadlines.",
    readTime: "4 min",
    category: "Team & Collaboration",
    categorySlug: "team",
    lastUpdated: "2026-02-15",
    relatedArticles: ["roles-permissions", "activity-feed", "evidence-requests"],
    content: `
## Assigning Task Owners

Tasks are the actionable backbone of compliance. Every gap, every evidence request, every follow-up from classification — these become tasks with owners and deadlines. Without clear ownership, tasks stall.

### How Tasks Are Created

Tasks come from multiple sources:

| Source | Example Tasks |
|--------|--------------|
| **Wizard completion** | "Complete classification," "Upload vendor DPA," "Assign oversight owner" |
| **Classification result** | "Complete deployer obligations checklist" (for high-risk), "Implement transparency disclosure" |
| **Evidence expiration** | "Renew vendor SOC 2 certification" |
| **FRIA mitigations** | "Implement quarterly bias testing" |
| **Incidents** | "Investigate AI output anomaly," "Complete postmortem report" |
| **Manual creation** | Any compliance action item you create yourself |

### Assigning Owners

When a task is created (auto or manual), assign an owner:

1. Open the task
2. Click the **Assignee** field
3. Select a team member from the dropdown
4. Set a **due date** (auto-generated tasks suggest dates; you can adjust)
5. Optionally set **priority** (Low / Medium / High / Critical)

### Auto-Assignment Rules

Klarvo auto-assigns certain tasks based on role:

| Task Type | Auto-Assigned To |
|-----------|-----------------|
| Complete classification | Primary Owner of the AI system |
| Upload vendor documentation | Primary Owner |
| Create oversight SOP | Oversight Owner |
| Complete AI literacy training | Oversight Owner |
| Renew evidence | Original uploader |
| Legal review (prohibited flag) | Compliance Owner |

You can always reassign after creation.

### Task Lifecycle

\`\`\`
Created → In Progress → Completed
              ↘ Blocked (with reason)
\`\`\`

### Reassigning Tasks

To reassign:
1. Open the task
2. Change the **Assignee** field
3. The new assignee receives a notification
4. The reassignment is logged in the activity feed

### Overdue Task Handling

Tasks past their due date:
- Appear in the **Compliance Alerts** panel on the dashboard
- Show a visual "overdue" indicator
- Can be escalated by Admins/Compliance Owners

### Best Practices

> 🎯 **One owner per task**: Shared ownership = no ownership
> 📅 **Set realistic deadlines**: Consider the person's workload and dependencies
> 🔔 **Check weekly**: Review your task list at least weekly
> 📋 **Close promptly**: Mark tasks complete as soon as they're done — don't let them linger
> 💬 **Add comments**: If a task is blocked, add a comment explaining why
    `
  },
  "activity-feed": {
    slug: "activity-feed",
    title: "Activity Feed & Audit Trail",
    description: "How Klarvo's activity feed and audit trail work — every action logged, every change tracked, providing full accountability and transparency for compliance governance.",
    readTime: "4 min",
    category: "Team & Collaboration",
    categorySlug: "team",
    lastUpdated: "2026-02-15",
    relatedArticles: ["roles-permissions", "task-owners", "evidence-requests"],
    content: `
## Activity Feed & Audit Trail

Every significant action in Klarvo is logged. The Activity Feed provides real-time visibility into what's happening across your compliance program. The Audit Trail provides the permanent, immutable record needed for regulatory compliance.

### What's Logged

| Action Type | Examples |
|------------|---------|
| **AI Systems** | Created, updated, classified, reclassified, deleted |
| **Evidence** | Uploaded, approved, rejected, expired, linked to control |
| **Tasks** | Created, assigned, completed, overdue |
| **Team** | Member invited, role changed, member removed |
| **Classifications** | Initial classification, override, reclassification |
| **FRIA** | Started, completed, approved, updated |
| **Exports** | Report generated, evidence pack downloaded, link shared |
| **Settings** | Organization settings changed, billing updated |
| **Incidents** | Created, updated, resolved, escalated |

### Activity Feed

The Activity Feed shows recent actions in chronological order. Access it from:

- **Dashboard**: Recent activity widget
- **AI System detail**: System-specific activity
- **Audit Log page**: Full organizational audit log

Each entry shows:
- **What happened**: "Evidence approved"
- **Who did it**: User name and role
- **When**: Timestamp
- **What entity**: AI system name, evidence title, etc.
- **Details**: Additional context (e.g., "Classification changed from Minimal to High-Risk Candidate, reason: vendor added biometric features")

### Audit Log

Navigate to **Audit Log** in the sidebar for the full, searchable log. Filter by:

- **Date range**: Specific time periods
- **Action type**: Create, update, delete, approve, etc.
- **Entity type**: AI systems, evidence, tasks, etc.
- **User**: Specific team member
- **AI System**: Actions related to a specific system

### Export Audit Log

For regulatory requests or internal audits:

1. Navigate to **Audit Log**
2. Apply desired filters
3. Click **Export** → CSV or PDF
4. The export includes all filtered entries with full detail

### Why It Matters

The audit trail serves multiple purposes:

- **Regulatory compliance**: Demonstrates who made what decisions, when, and why
- **Internal accountability**: Ensures team members follow procedures
- **Incident investigation**: Reconstruct what happened before an incident
- **Change tracking**: See how classifications, evidence, and controls evolved over time

### Best Practices

> 📊 **Review regularly**: Check the activity feed weekly for unexpected changes
> 🔍 **Investigate anomalies**: Unusual activity patterns may indicate process issues
> 📋 **Export before audits**: Include audit log excerpts in your governance pack
> 🔒 **Immutable**: The audit trail cannot be edited or deleted — this is by design for compliance integrity
    `
  },
  "evidence-requests": {
    slug: "evidence-requests",
    title: "Evidence Request Workflows",
    description: "How to use evidence request workflows to assign specific documentation needs to team members — ensuring the right people upload the right evidence at the right time.",
    readTime: "5 min",
    category: "Team & Collaboration",
    categorySlug: "team",
    lastUpdated: "2026-02-15",
    relatedArticles: ["uploading-evidence", "task-owners", "linking-evidence"],
    content: `
## Evidence Request Workflows

Evidence requests are a structured way to ask a specific team member to upload a specific piece of documentation. They're more targeted than general tasks — they specify exactly what evidence is needed, which control it supports, and who should provide it.

### How Evidence Requests Work

\`\`\`
Request Created → Notification Sent → Evidence Uploaded → Request Fulfilled
                                     ↘ Overdue → Reminder Sent
\`\`\`

### Creating an Evidence Request

#### Auto-Generated Requests
The AI System Wizard automatically generates evidence requests based on your classification:

| Classification Result | Auto-Generated Requests |
|---------------------|----------------------|
| Any system | "Upload vendor documentation" (if vendor-based) |
| Transparency obligations | "Upload transparency notice screenshot" |
| High-risk candidate | "Upload oversight SOP," "Upload instructions for use," "Upload log retention evidence" |
| FRIA required | "Upload DPIA reference" (if applicable) |

#### Manual Requests
1. Navigate to the AI System or Control
2. Click **Request Evidence**
3. Fill in:
   - **What's needed**: Description of the specific document (e.g., "Vendor's SOC 2 Type II report for the current audit period")
   - **Who should provide it**: Select a team member
   - **Due date**: When you need it
   - **Linked control**: Which control this evidence supports
4. Click **Send Request**

### Fulfilling a Request

The assignee receives a notification (in-app + email if enabled) with:
- What evidence is requested
- Which AI system and control it's for
- Due date
- Direct link to upload

To fulfill:
1. Click the link in the notification (or navigate to **Tasks** → **Evidence Requests**)
2. Upload the requested file
3. The evidence is automatically linked to the specified control
4. The request status updates to "Fulfilled"

### Tracking Requests

Track all evidence requests in:

- **Tasks** page: Filtered view of evidence request tasks
- **AI System detail**: Evidence tab shows pending requests
- **Control detail**: Shows which controls are awaiting evidence

### Overdue Handling

When an evidence request passes its due date:

- The assignee receives a reminder notification
- The request appears in the dashboard's Compliance Alerts
- The Compliance Owner or Admin can reassign or escalate

### Best Practices

> 🎯 **Be specific**: "Upload the vendor's SOC 2 report" is better than "Upload security docs"
> 📅 **Set reasonable deadlines**: Some evidence (like vendor certifications) takes time to obtain
> 🔗 **Link to controls**: Always specify which control the evidence supports
> 📬 **Follow up**: If a request is overdue, reach out directly to the assignee
> 📋 **Use for onboarding**: When a new system owner joins, send evidence requests for everything they need to provide
    `
  },

  // =============================================
  // INCIDENTS & MONITORING
  // =============================================
  "incident-management": {
    slug: "incident-management",
    title: "Incident Management Overview",
    description: "How to log, track, and respond to AI-related incidents using Klarvo — covering severity levels, response workflows, Article 26 serious incident reporting obligations, and integration with reassessment.",
    readTime: "5 min",
    category: "Incidents & Monitoring",
    categorySlug: "incidents",
    lastUpdated: "2026-02-15",
    relatedArticles: ["creating-incidents", "monitoring-events", "reassessment-triggers"],
    content: `
## Incident Management

Under Article 26, deployers of high-risk AI systems must monitor operation, report serious incidents, and be prepared to suspend use when risk is identified. Klarvo's incident management system provides the structure for tracking, responding to, and documenting AI-related incidents.

### What Counts as an Incident?

AI incidents requiring documentation include:

- **Safety events**: Physical or psychological harm caused by AI outputs
- **Rights violations**: Discriminatory outcomes, privacy breaches, unfair denials of service
- **Performance failures**: Unexpected outputs, hallucinations, systematic errors
- **Security events**: Data leaks, unauthorized access, adversarial attacks
- **Compliance gaps**: Discovered non-conformities with the AI Act
- **User complaints**: Documented concerns about AI behaviour

### Severity Levels

| Level | Description | Response Time | Escalation |
|-------|-------------|---------------|------------|
| **Critical** | Immediate harm, safety risk, potential prohibited practice | < 24 hours | Leadership + legal + authority (if serious) |
| **High** | Significant rights impact, large-scale effect | < 48 hours | Compliance Owner + provider |
| **Medium** | Moderate impact, contained to limited scope | < 1 week | System Owner + Compliance Owner |
| **Low** | Minor issue, no harm, easily correctable | < 2 weeks | System Owner |

### Incident Workflow

\`\`\`
Detection → Logging → Triage → Containment → Investigation → Resolution → Postmortem → Closure
     ↓                                                                         ↓
  Notification                                                           Reassessment
  (internal + external)                                                  (if needed)
\`\`\`

### Serious Incident Reporting (Article 26(5))

Deployers must report **serious incidents** to:

1. **The AI system provider** — notify immediately
2. **Market surveillance authority** — within required timeframe

A "serious incident" is one that results in:
- Death or serious damage to health
- Serious/irreversible disruption of critical infrastructure management
- Breach of obligations intended to protect fundamental rights
- Serious damage to property or the environment

### Integration with System Reassessment

Incidents can trigger system reassessment:
- **Critical incidents** → Automatic reassessment flag on the AI system
- **Pattern of medium incidents** → Recommended review of classification
- **Resolved incidents** → Documented in system history for audit trail

### Best Practices

> 🚨 **Log immediately**: Don't wait for investigation to start — capture the facts as they're known
> 📞 **Notify early**: Err on the side of over-communication
> 🔍 **Root cause analysis**: Every resolved incident should identify the underlying cause
> 📝 **Postmortem**: Document lessons learned and preventive measures
> 🔄 **Update procedures**: Improve incident response based on learnings
    `
  },
  "creating-incidents": {
    slug: "creating-incidents",
    title: "Creating Incident Records",
    description: "Step-by-step guide to creating incident records in Klarvo — capturing what happened, who was affected, severity assessment, containment actions, and resolution documentation.",
    readTime: "4 min",
    category: "Incidents & Monitoring",
    categorySlug: "incidents",
    lastUpdated: "2026-02-15",
    relatedArticles: ["incident-management", "monitoring-events", "reassessment-triggers"],
    content: `
## Creating Incident Records

When an AI-related incident occurs, documenting it promptly and thoroughly is essential — both for regulatory compliance and for your own learning and improvement.

### How to Create an Incident

1. Navigate to **Incidents** in the sidebar
2. Click **Report Incident**
3. Fill in the incident form (details below)
4. Click **Save**

### Incident Form Fields

#### Basic Information

| Field | Guidance |
|-------|----------|
| **Title** | Clear, descriptive: "Chatbot provided incorrect product safety information" |
| **Linked AI System** | Select the AI system involved |
| **Severity** | Critical / High / Medium / Low (see severity guide) |
| **Status** | Open / Investigating / Contained / Resolved / Closed |
| **Date Occurred** | When the incident happened |
| **Date Detected** | When it was discovered |
| **Reported By** | Who reported it |

#### Impact Assessment

| Field | Guidance |
|-------|----------|
| **Affected Parties** | Customers, employees, candidates, public, etc. |
| **Number Affected** | Estimated number of impacted individuals |
| **Harm Description** | What harm occurred or could have occurred |
| **Harm Type** | Safety / Discrimination / Privacy / Financial / Reputational / Other |

#### Response Actions

| Field | Guidance |
|-------|----------|
| **Containment Actions** | What was done immediately: "Disabled chatbot feature," "Reverted to manual process" |
| **Internal Notifications** | Who was notified internally: Security, Legal, Compliance, Leadership |
| **External Notifications** | Provider, market surveillance authority (if serious incident) |
| **Suspension Status** | Was the system suspended? Fully / Partially / No |

#### Resolution (completed after investigation)

| Field | Guidance |
|-------|----------|
| **Root Cause** | What caused the incident |
| **Resolution Actions** | What was done to fix it |
| **Preventive Measures** | What will prevent recurrence |
| **Date Resolved** | When the incident was resolved |
| **Lessons Learned** | Key takeaways |

### Attaching Evidence

For each incident, attach supporting evidence:
- Screenshots of the problematic AI output
- Logs showing the inputs and outputs involved
- Communication records (notifications sent)
- Postmortem reports
- Corrective action documentation

### After Creating

Once an incident is logged:
- It appears in the AI system's incident history
- Critical/High severity incidents trigger a reassessment flag
- Tasks are auto-created for investigation and resolution follow-up
- The incident count is reflected on the dashboard

### Best Practices

> ⏱️ **Log immediately**: Capture facts while they're fresh — you can update details later
> 📸 **Attach evidence**: Screenshots and logs are crucial for investigation
> 🔍 **Be specific on harm**: "Incorrect information provided" is less useful than "Customer received incorrect safety dosage guidance for medication"
> 📋 **Follow through**: Don't close incidents without documenting resolution and preventive measures
    `
  },
  "monitoring-events": {
    slug: "monitoring-events",
    title: "Monitoring Events",
    description: "How to log and track monitoring events — performance observations, user complaints, bias signals, and operational anomalies that don't yet qualify as incidents but require documentation.",
    readTime: "4 min",
    category: "Incidents & Monitoring",
    categorySlug: "incidents",
    lastUpdated: "2026-02-15",
    relatedArticles: ["incident-management", "creating-incidents", "reassessment-triggers"],
    content: `
## Monitoring Events

Not everything is an incident. Monitoring events capture observations, signals, and trends that don't meet the incident threshold but are important to document — performance drift, user complaints, bias signals, and operational anomalies.

### What Qualifies as a Monitoring Event

| Category | Examples |
|----------|---------|
| **Performance drift** | Accuracy dropped from 95% to 88% this quarter |
| **User complaints** | Three customers reported irrelevant chatbot responses this week |
| **Bias signals** | Approval rates differ by 15% across demographic groups |
| **Operational anomalies** | System response time increased significantly |
| **Near-miss** | AI output was incorrect but caught by human reviewer before action |
| **Vendor change** | Provider updated the underlying model version |
| **Configuration change** | Threshold or parameter adjustment |

### Why Log Monitoring Events

1. **Pattern detection**: Individual events may be minor, but patterns indicate systemic issues
2. **Audit evidence**: Demonstrates active monitoring (DEP-05 control)
3. **Reassessment triggers**: Accumulated events may warrant reclassification
4. **Continuous improvement**: Data-driven improvement of AI system governance

### Creating a Monitoring Event

1. Navigate to **Incidents** → **Monitoring** tab
2. Click **Log Event**
3. Fill in:
   - **Title**: Brief description
   - **Category**: Performance / Complaint / Bias / Anomaly / Near-miss / Change / Other
   - **Linked AI System**: Which system this relates to
   - **Description**: What was observed
   - **Severity**: Informational / Minor / Notable
   - **Action Taken**: What (if anything) was done in response
   - **Follow-up Required**: Yes / No
4. Attach supporting data (metrics screenshots, complaint records, etc.)
5. Click **Save**

### Monitoring Cadence

For high-risk AI systems, establish a regular monitoring cadence:

| What to Monitor | Method | Frequency |
|----------------|--------|-----------|
| Model accuracy/performance | Automated metrics dashboard | Weekly |
| Bias metrics | Statistical analysis across protected groups | Quarterly |
| User complaints | Support ticket analysis | Monthly |
| Drift detection | Comparison against baseline | Monthly |
| Incident patterns | Incident log review | Monthly |

### Event-to-Incident Escalation

When monitoring events indicate a significant issue:

1. Review the pattern of events
2. Assess whether the threshold for an incident has been met
3. If yes, create an incident record linked to the relevant monitoring events
4. If no, continue monitoring and document your assessment

### Best Practices

> 📊 **Log consistently**: Even "nothing unusual" is worth documenting periodically — it shows active monitoring
> 📈 **Look for patterns**: One complaint is an event; five similar complaints are a trend worth investigating
> 🔗 **Link to systems**: Always connect monitoring events to the relevant AI system
> 📋 **Define thresholds**: Decide in advance what level of drift or complaint volume triggers escalation
    `
  },
  "reassessment-triggers": {
    slug: "reassessment-triggers",
    title: "Reassessment Triggers",
    description: "When and how AI systems should be reassessed — material changes, incident patterns, vendor updates, and scheduled reviews that trigger reclassification.",
    readTime: "5 min",
    category: "Incidents & Monitoring",
    categorySlug: "incidents",
    lastUpdated: "2026-02-15",
    relatedArticles: ["incident-management", "monitoring-events", "classification-engine"],
    content: `
## Reassessment Triggers

AI system classifications are not permanent. Material changes, incidents, vendor updates, and new regulatory guidance can all change a system's risk profile. Klarvo tracks reassessment triggers and prompts re-evaluation when needed.

### What Triggers Reassessment

| Trigger | Why It Matters | Auto-Flagged? |
|---------|---------------|---------------|
| **Material system change** | New features, new model version, expanded capabilities | Yes (via change management) |
| **Vendor/model change** | New vendor, model upgrade, provider pivot | Yes (vendor record update) |
| **New use case** | System applied to new purpose or context | Manual |
| **New affected groups** | Expanded to new user populations | Manual |
| **New deployment region** | Expanded to new EU member states | Manual |
| **Critical incident** | Safety event, rights violation, serious harm | Yes (automatic) |
| **Pattern of incidents** | Multiple medium-severity incidents | Recommended |
| **Regulatory change** | New guidance, enforcement action, or standard update | Manual |
| **Scheduled review** | Periodic review date reached | Yes (calendar-based) |
| **FRIA update needed** | Material change affecting fundamental rights assessment | Yes (linked to above) |

### How Reassessment Works

1. **Trigger detected**: Either automatically (incident, vendor change, review date) or manually flagged
2. **System flagged**: A "Reassessment Needed" badge appears on the AI system
3. **Dashboard alert**: The system appears in Compliance Alerts
4. **Task created**: "Complete reassessment" task assigned to Primary Owner
5. **Re-evaluation**: The owner revisits relevant wizard steps and updates answers
6. **New classification**: If answers change, the classification engine recalculates
7. **Version created**: A new classification version is stored (V2, V3, etc.)
8. **FRIA update**: If the system has a FRIA, it may also need updating

### Reassessment vs. Full Re-classification

**Reassessment**: Reviewing specific aspects that changed — faster, targeted.

**Full re-classification**: Starting the wizard from scratch — thorough but time-consuming.

Most reassessments are targeted: "The vendor upgraded the model — does this change our high-risk screening result?" You don't need to re-answer every question, just the affected ones.

### Scheduled Reviews

Every AI system has a **Next Review Date** (default: 90 days after creation, adjustable):

- Klarvo sends a reminder 14 days before the review date
- A task is created when the date arrives
- After review, set the next review date

For high-risk systems, quarterly reviews are recommended. For minimal-risk systems, annual reviews may suffice.

### Change Management Integration

Klarvo's change management features support reassessment:

- **Material change detected** → Reassessment prompt
- **Vendor record updated** → Linked systems flagged
- **Classification version history** → Full audit trail of changes
- **FRIA update prompt** → Triggered when relevant factors change

### Best Practices

> 📅 **Set review dates**: Every system should have a next review date
> 🔄 **Don't skip reassessment**: Even if you "know" nothing changed — document the review
> 📝 **Record the outcome**: Even if reassessment confirms the same classification, record that you reviewed it
> 🔍 **Watch for patterns**: Multiple reassessments with the same trigger may indicate a process improvement opportunity
> 📋 **Update FRIA alongside**: If a reassessment changes the risk profile, the FRIA likely needs updating too
    `
  },

  // =============================================
  // TRAINING & AI LITERACY
  // =============================================
  "ai-literacy": {
    slug: "ai-literacy",
    title: "AI Literacy Requirements (Article 4)",
    description: "Understanding the Article 4 AI literacy obligation — who needs training, what it must cover, and how to demonstrate compliance through Klarvo's training tracking.",
    readTime: "6 min",
    category: "Training & AI Literacy",
    categorySlug: "training",
    lastUpdated: "2026-02-15",
    relatedArticles: ["training-programs", "training-completion", "training-reports"],
    content: `
## AI Literacy Requirements (Article 4)

Article 4 of the EU AI Act requires providers and deployers to take measures ensuring sufficient **AI literacy** of their staff and other persons dealing with the operation and use of AI systems on their behalf. This obligation has applied since **2 February 2025**.

### What the Law Requires

Article 4 states that measures must:

- Ensure **sufficient AI literacy** of staff
- Take into account the **technical knowledge, experience, education, and training** of the persons involved
- Consider the **context** in which the AI systems are to be used
- Account for the **persons or groups of persons** on whom the AI systems are to be used

This means training should be **role-appropriate** — not one-size-fits-all.

### Who Needs Training

| Role Category | Training Need | Priority |
|--------------|--------------|----------|
| **All staff using AI tools** | Basic AI literacy: what AI is, how it works, limitations, responsible use | High (applies since Feb 2025) |
| **AI system operators** | System-specific training: how to use the system correctly, interpret outputs, escalate issues | High |
| **Human oversight personnel** | Advanced: system capabilities, failure modes, intervention procedures, authority to stop | Critical (for high-risk) |
| **Reviewers/approvers** | Assessment competence: how to evaluate classifications, evidence, and compliance artifacts | Medium |
| **Leadership/board** | Governance awareness: AI risks, regulatory landscape, organisational responsibilities | Medium |

### What Training Must Cover

#### Basic AI Literacy (All Staff)
- What AI is and how it differs from traditional software
- Common AI capabilities and limitations
- Responsible AI use principles
- Your organisation's AI acceptable use policy
- How to report concerns about AI behaviour

#### System-Specific Training (Operators)
- How the specific AI system works
- What outputs it produces and how to interpret them
- Known limitations and failure modes
- When and how to escalate issues
- Data handling and privacy requirements

#### Oversight Training (High-Risk System Oversight)
- Deep understanding of the system's functioning
- How to monitor for bias, drift, and errors
- Authority and procedures for intervention/suspension
- Incident response procedures
- Regulatory obligations specific to high-risk deployers

### Demonstrating Compliance

To prove Article 4 compliance, you need evidence of:

1. **Training program exists**: Documented training plans by role
2. **Content is appropriate**: Training materials cover relevant topics
3. **Training is delivered**: Records of sessions conducted
4. **Completion is tracked**: Who completed what, when
5. **Refresh is scheduled**: Annual or more frequent re-certification
6. **Effectiveness is assessed**: Quiz results or competency checks (optional but recommended)

### Using Klarvo for Training Tracking

Klarvo's Training module lets you:

- **Define training programs** by role category
- **Assign training** to team members based on their AI system responsibilities
- **Track completion** with dates and evidence
- **Set refresh cadence** (typically annual)
- **Generate training reports** for auditors
- **Link training to AI systems** — showing which system operators have been trained

### Training Content Sources

Klarvo doesn't provide training content, but you can use:

- Internal training materials (upload PDFs, link to videos)
- External courses (MOOC platforms, vendor training)
- Vendor-provided system training
- Industry body resources
- Klarvo's own documentation (this docs section covers many concepts)

### Compliance Timeline

AI literacy obligations apply since **2 February 2025**. This means:

- You should already have a training program in place
- Completion records should be current
- New staff should receive training before operating AI systems

### Best Practices

> 🎓 **Role-based training**: Don't give everyone the same training — tailor to responsibilities
> 📋 **Document everything**: Training plans, materials, completion records, and quiz results are all evidence
> 🔄 **Annual refresh**: AI evolves fast — retrain annually at minimum
> 🏷️ **Link to systems**: Connect training records to the AI systems people operate
> ⏰ **Train before access**: Ideally, no one should operate an AI system without completing relevant training
    `
  },
  "training-programs": {
    slug: "training-programs",
    title: "Creating Training Programs",
    description: "How to set up role-based AI literacy training programs in Klarvo — defining courses, assigning participants, and managing ongoing training campaigns.",
    readTime: "5 min",
    category: "Training & AI Literacy",
    categorySlug: "training",
    lastUpdated: "2026-02-15",
    relatedArticles: ["ai-literacy", "training-completion", "training-reports"],
    content: `
## Creating Training Programs

A training program in Klarvo defines what training is needed, who needs it, and when it must be completed. Programs are the organisational backbone of your Article 4 AI literacy compliance.

### Program Structure

Each training program includes:

| Component | Description |
|-----------|-------------|
| **Program Name** | e.g., "AI Basics for All Staff" or "High-Risk System Operator Training" |
| **Target Audience** | Which roles or individuals should complete this program |
| **Courses** | One or more training modules/courses within the program |
| **Completion Criteria** | What counts as "complete" (all courses finished, quiz passed, etc.) |
| **Refresh Cadence** | How often re-certification is required (e.g., annually) |
| **Due Date** | Initial completion deadline for current participants |

### Creating a Program

1. Navigate to **Training** in the sidebar
2. Click **Create Program**
3. Fill in program details:
   - Name and description
   - Target audience (role-based selection)
   - Completion deadline
   - Refresh cadence
4. Add courses to the program

### Adding Courses

Each course within a program includes:

| Field | Description |
|-------|-------------|
| **Course Name** | e.g., "Understanding AI Systems" |
| **Description** | What this course covers |
| **Training Material** | Upload PDF, link to video, or external URL |
| **Duration** | Estimated time to complete |
| **Quiz** | Optional assessment (upload quiz or link to external quiz) |
| **Pass Criteria** | If quiz is used, what score constitutes passing |

### Recommended Programs

#### Program 1: AI Basics for All Staff
**Target**: Everyone in the organisation
**Courses**:
- What is AI? (Understanding AI fundamentals)
- Our AI Acceptable Use Policy (company policy review)
- Reporting AI Concerns (how to escalate issues)

**Refresh**: Annual

#### Program 2: AI System Operators
**Target**: Staff who directly use/operate AI systems
**Courses**:
- System-specific training (one per system)
- Data handling and privacy
- Interpreting AI outputs responsibly

**Refresh**: Annual or when system changes

#### Program 3: High-Risk Oversight Personnel
**Target**: Oversight owners of high-risk AI systems
**Courses**:
- Advanced AI system understanding
- Monitoring for bias and drift
- Intervention and suspension procedures
- Incident response for AI systems
- EU AI Act deployer obligations

**Refresh**: Annual

### Assigning Participants

Participants can be assigned:

- **By role**: All users with "System Owner" role automatically assigned
- **By AI system**: All operators of a specific AI system
- **Individually**: Manual assignment of specific people
- **On invitation**: New team members automatically assigned based on role

### Best Practices

> 📋 **Start with three programs**: Basic (all staff), Operator (system users), Oversight (high-risk oversight)
> 🎯 **Make it practical**: Focus on actionable knowledge, not theoretical lectures
> 📅 **Set deadlines**: Open-ended training rarely gets completed
> 🔄 **Plan refreshers**: Schedule annual re-certification from the start
> 📊 **Track completion**: Use Klarvo's tracking to identify gaps — this is your audit evidence
    `
  },
  "training-completion": {
    slug: "training-completion",
    title: "Tracking Completion",
    description: "How to track, verify, and manage AI literacy training completion across your organization — including completion workflows, reminders, and evidence generation.",
    readTime: "4 min",
    category: "Training & AI Literacy",
    categorySlug: "training",
    lastUpdated: "2026-02-15",
    relatedArticles: ["training-programs", "ai-literacy", "training-reports"],
    content: `
## Tracking Training Completion

Tracking who has completed what training — and when — is the core evidence for Article 4 AI literacy compliance. Klarvo provides tools to track, remind, and report on training completion across your organization.

### Completion Tracking

For each training assignment, Klarvo tracks:

| Field | Description |
|-------|-------------|
| **Participant** | Who is assigned |
| **Program** | Which training program |
| **Course(s)** | Individual courses within the program |
| **Status** | Not Started / In Progress / Completed / Overdue |
| **Completion Date** | When they finished |
| **Quiz Score** | If applicable |
| **Certificate** | Uploaded completion evidence |
| **Expiry Date** | When re-certification is needed |

### Marking Completion

Training can be marked complete in several ways:

#### Method 1: Self-Reporting
1. The participant navigates to **Training** → **My Training**
2. Opens the assigned course
3. After completing the training material, clicks **Mark Complete**
4. Optionally uploads a completion certificate or quiz result
5. Status changes to "Completed"

#### Method 2: Admin/Manager Marking
1. Navigate to **Training** → **Program Management**
2. Find the participant
3. Click **Mark Complete** on their behalf
4. Upload evidence of completion
5. Add notes if needed

#### Method 3: Bulk Marking
After a group training session:
1. Navigate to the program
2. Click **Bulk Update**
3. Select all participants who attended
4. Mark as complete with the session date
5. Upload attendance records as evidence

### Reminder System

Klarvo sends automatic reminders:

| Reminder | Timing |
|----------|--------|
| Initial assignment | When training is first assigned |
| Progress reminder | 7 days before due date (if not started) |
| Due date reminder | On the due date (if incomplete) |
| Overdue alert | 7 days past due date |
| Re-certification reminder | 30 days before expiry |

### Completion Evidence

For audit purposes, retain evidence of completion:

- **Completion certificates**: From external training platforms
- **Attendance records**: For in-person or live training sessions
- **Quiz results**: Scores and pass/fail status
- **Self-attestation**: Acknowledgement that training was completed
- **Policy acknowledgement**: Signed acceptance of AI acceptable use policy

Upload these as evidence in the Evidence Vault and link to the LIT (AI Literacy) control family.

### Dashboard Metrics

Training completion feeds into:

- **Dashboard Training Coverage**: Percentage of required training completed
- **Audit Readiness Score**: Training is 25% of the composite score
- **Per-System Training Status**: Shows whether operators of each AI system are trained

### Best Practices

> ✅ **Track everything**: Even informal training sessions should be documented
> 📅 **Act on reminders**: Don't let training go overdue — it's a visible compliance gap
> 📋 **Upload evidence**: Completion without evidence is hard to prove in an audit
> 🔄 **Plan re-certification**: Set expiry dates when marking completion
> 📊 **Monitor the dashboard**: Training gaps are immediately visible in the Training Coverage metric
    `
  },
  "training-reports": {
    slug: "training-reports",
    title: "Training Reports",
    description: "How to generate training completion reports for auditors, leadership, and regulatory purposes — demonstrating your organization's Article 4 AI literacy compliance.",
    readTime: "3 min",
    category: "Training & AI Literacy",
    categorySlug: "training",
    lastUpdated: "2026-02-15",
    relatedArticles: ["training-completion", "training-programs", "org-reports"],
    content: `
## Training Reports

Training reports provide the documented proof that your organization is meeting its Article 4 AI literacy obligations. They're essential for audits, board presentations, and regulatory inquiries.

### Available Reports

#### Training Completion Report (PDF/CSV)

Comprehensive report showing:

| Section | Content |
|---------|---------|
| **Summary** | Total staff, trained percentage, programs active |
| **Program Breakdown** | Completion rates per program |
| **Individual Status** | Per-person completion with dates |
| **Overdue Items** | Who hasn't completed required training |
| **Re-certification Due** | Upcoming re-certification deadlines |

#### Per-System Training Report

For a specific AI system, shows:
- All operators assigned to the system
- Their training completion status
- Gaps (operators without required training)
- Linked to DEP-02 (oversight competence) and LIT controls

#### Re-certification Summary

Shows upcoming re-certification deadlines:
- Staff whose training expires within 30/60/90 days
- Programs requiring refresh
- Action items for training managers

### Generating Reports

1. Navigate to **Training** → **Reports**
2. Select the report type
3. Choose filters:
   - Date range
   - Department
   - Program
   - AI system (for per-system reports)
4. Click **Generate**
5. Download as PDF or CSV

### Using Reports

| Audience | Report | Purpose |
|----------|--------|---------|
| Auditors | Completion Report (PDF) | Prove Article 4 compliance |
| Board | Summary section of Governance Pack | Show training investment and coverage |
| Regulators | Completion Report + certificates | Demonstrate staff competence |
| HR | Individual Status (CSV) | Identify training gaps for performance reviews |
| System Owners | Per-System Report | Verify all their operators are trained |

### Including in Evidence Packs

Training reports are automatically included in:

- **AI System Evidence Pack**: Per-system training section (Section 07)
- **Organization Governance Pack**: Training program summary section

You can also upload the training report as standalone evidence linked to LIT-02 (Training Completion Tracked).

### Best Practices

> 📅 **Generate monthly**: Keep training reports current for on-demand audit response
> 📊 **Track trends**: Compare completion rates quarter-over-quarter
> 🎯 **Prioritize gaps**: Focus on training operators of high-risk systems first
> 📋 **Include in governance packs**: Training data is a key component of your compliance narrative
    `
  },

  // =============================================
  // VENDOR MANAGEMENT
  // =============================================
  "vendor-profiles": {
    slug: "vendor-profiles",
    title: "Vendor Profiles",
    description: "How to create and manage vendor profiles in Klarvo — tracking AI vendors, their products, contact information, and compliance documentation in a centralized registry.",
    readTime: "4 min",
    category: "Vendor Management",
    categorySlug: "vendors",
    lastUpdated: "2026-02-15",
    relatedArticles: ["due-diligence", "vendor-attestations", "contract-management"],
    content: `
## Vendor Profiles

Most SMEs use AI built by third-party vendors. Klarvo's vendor registry provides a centralized place to track every AI vendor, their products, documentation, and compliance status.

### What a Vendor Profile Contains

| Field | Description |
|-------|-------------|
| **Vendor Name** | Legal entity name |
| **Website** | Vendor's website URL |
| **Primary Contact** | Name and email of your main contact |
| **Country** | Vendor's headquarters location |
| **Description** | What they provide (brief) |
| **Linked AI Systems** | All your AI systems using this vendor |
| **Contracts** | Agreement documents and renewal dates |
| **Attestations** | EU AI Act-related statements |
| **Security Evidence** | SOC 2, ISO 27001, etc. |
| **Due Diligence Status** | Checklist completion percentage |

### Creating a Vendor Profile

#### Method 1: During AI System Wizard
When adding a new AI system (Step 2), you can create a vendor on the fly:
1. Click **Add New Vendor**
2. Enter basic information
3. The vendor is created and linked to the system

#### Method 2: From the Vendor Registry
1. Navigate to **Vendors** in the sidebar
2. Click **Add Vendor**
3. Fill in the complete profile
4. Save

### Viewing Vendor Details

Click any vendor in the registry to see:

- **Overview**: Basic information and description
- **Linked Systems**: All AI systems using this vendor with their classifications
- **Contracts**: Agreement documents with start/end dates
- **Due Diligence**: Checklist status and completion percentage
- **Attestations**: EU AI Act-related vendor statements
- **Evidence**: All documentation linked to this vendor
- **Activity**: Recent changes and updates

### Vendor Risk Indicators

Klarvo surfaces vendor-level risk signals:

- **Multiple high-risk systems**: If several high-risk systems use the same vendor, that vendor is a concentration risk
- **Missing documentation**: Vendors without contracts, security evidence, or attestations
- **Expiring contracts**: Renewal dates approaching without updated documentation
- **Stale due diligence**: Checklists not reviewed within 12 months

### Best Practices

> 📋 **Create vendors early**: Don't wait until audit time — register vendors when you add AI systems
> 🔗 **Link all systems**: Ensure every vendor-based AI system is connected to its vendor profile
> 📅 **Track renewal dates**: Set contract end dates to receive renewal reminders
> 📄 **Request documentation proactively**: Ask vendors for AI Act-relevant documentation at procurement
> 🔄 **Review annually**: Vendor profiles should be reviewed at least annually
    `
  },
  "due-diligence": {
    slug: "due-diligence",
    title: "Due Diligence Checklists",
    description: "How to use vendor due diligence checklists in Klarvo — systematic evaluation of AI vendors covering security, transparency, logging, incident response, and EU AI Act readiness.",
    readTime: "5 min",
    category: "Vendor Management",
    categorySlug: "vendors",
    lastUpdated: "2026-02-15",
    relatedArticles: ["vendor-profiles", "vendor-attestations", "contract-management"],
    content: `
## Due Diligence Checklists

Vendor due diligence is essential for deployers — you remain responsible for how you use AI, even when it's built by someone else. Klarvo provides structured checklists to systematically evaluate your AI vendors.

### The Due Diligence Checklist

Each vendor has a checklist covering key areas:

#### Section 1: Vendor Identification (VEN-01)
- [ ] Vendor legal name and registration
- [ ] Country of incorporation and EU presence
- [ ] Primary contact information
- [ ] Contract or terms of service on file

#### Section 2: AI System Description (VEN-02)
- [ ] Clear description of what the AI system does
- [ ] What type of AI/ML approach is used
- [ ] What data the system processes
- [ ] What outputs it produces
- [ ] Known limitations documented

#### Section 3: Security & Data Protection (VEN-03)
- [ ] Security certification (SOC 2, ISO 27001, or equivalent)
- [ ] Data processing agreement (DPA) in place
- [ ] Data residency information (where data is stored/processed)
- [ ] Encryption standards (at rest and in transit)
- [ ] Access controls and authentication

#### Section 4: Transparency Support (VEN-04)
- [ ] Vendor provides information about AI system operation
- [ ] Output marking for synthetic content (if applicable)
- [ ] Support for deployer's transparency obligations
- [ ] Model card or similar documentation available

#### Section 5: Logging & Export (VEN-05)
- [ ] System generates automatic logs
- [ ] Logs can be exported by deployer
- [ ] Log retention meets minimum requirements (≥ 6 months for high-risk)
- [ ] Log format is usable and documented

#### Section 6: Incident Communication (VEN-06)
- [ ] Vendor has incident notification process
- [ ] Contact path for reporting issues is defined
- [ ] SLA for incident response is documented
- [ ] Vendor notifies deployers of material changes

#### Section 7: EU AI Act Readiness
- [ ] Vendor is aware of EU AI Act obligations
- [ ] Vendor has published EU AI Act compliance statement (if applicable)
- [ ] Instructions for use are provided (critical for Article 26)
- [ ] Vendor supports deployer obligations

### Completing the Checklist

1. Navigate to the vendor profile
2. Open the **Due Diligence** tab
3. Work through each section, checking items as you verify them
4. Attach evidence for each checked item (vendor documents, email confirmations, etc.)
5. Note any gaps or concerns
6. Record the review date

### Completion Scoring

Klarvo shows a completion percentage:

| Score | Meaning |
|-------|---------|
| 90-100% | Excellent due diligence — vendor well-documented |
| 70-89% | Good — some gaps to address |
| 50-69% | Moderate — significant gaps require attention |
| Below 50% | Inadequate — prioritize completing this checklist |

### Renewal Reviews

Due diligence should be reviewed:
- **At contract renewal**: Before signing a new term
- **After vendor changes**: Model upgrades, ownership changes, service changes
- **Annually**: Even without changes, verify documentation is current
- **After incidents**: If an incident involves this vendor's system

### Best Practices

> 📋 **Request documentation at procurement**: The easiest time to get vendor docs is before you sign
> 🔄 **Set renewal reminders**: Don't let due diligence go stale
> 📄 **Attach evidence to each item**: A checked box without evidence has limited audit value
> ⚠️ **Flag gaps clearly**: If a vendor can't provide something, document the gap and your risk acceptance
> 🔗 **Link to controls**: Due diligence evidence supports VEN-01 through VEN-08 controls
    `
  },
  "vendor-attestations": {
    slug: "vendor-attestations",
    title: "Vendor Attestations",
    description: "Managing vendor attestations for EU AI Act compliance — requesting, tracking, and storing vendor statements about their AI systems' compliance posture.",
    readTime: "5 min",
    category: "Vendor Management",
    categorySlug: "vendors",
    lastUpdated: "2026-02-15",
    relatedArticles: ["vendor-profiles", "due-diligence", "contract-management"],
    content: `
## Vendor Attestations

A vendor attestation is a formal statement from your AI vendor about their system's compliance posture. These are becoming increasingly important as the EU AI Act takes effect — they demonstrate that you've verified your vendor's claims.

### What Attestations Cover

| Attestation Type | What the Vendor Confirms |
|-----------------|------------------------|
| **AI System Description** | What the system does, how it works, known limitations |
| **Risk Classification** | The vendor's own assessment of their system's risk level |
| **Transparency Support** | How they support deployer transparency obligations |
| **Logging Capability** | What logs are generated, retained, and exportable |
| **Incident Notification** | Their process for notifying deployers of issues |
| **Data Processing** | Where and how data is processed; security measures |
| **GPAI Compliance** | For general-purpose AI: model card, training data transparency |
| **No Prohibited Practices** | Confirmation the system doesn't engage in Article 5 prohibited practices |

### Requesting Attestations

To request an attestation from a vendor:

1. Navigate to the vendor profile
2. Go to the **Attestations** tab
3. Click **Request Attestation**
4. Select the attestation type(s) needed
5. Klarvo generates a standardized request that you can send to the vendor
6. The request includes specific questions aligned to EU AI Act requirements

### Recording Received Attestations

When you receive a vendor attestation:

1. Navigate to the vendor profile → **Attestations** tab
2. Click **Add Attestation**
3. Select the type
4. Upload the vendor's response document
5. Record:
   - Date received
   - Who provided it (vendor contact)
   - Validity period (typically 12 months)
   - Any caveats or limitations noted
6. Link to relevant AI systems and controls

### Attestation vs. Certification

| | Attestation | Certification |
|---|---|---|
| **Who provides** | The vendor themselves | Independent third party (auditor) |
| **Reliability** | Self-reported; lower assurance | Independently verified; higher assurance |
| **Cost** | Free / low cost | Significant cost |
| **Availability** | Most vendors can provide | Not all vendors have certifications |
| **Audit value** | Good; shows due diligence | Excellent; independent verification |

Both have value. Attestations are practical for SMEs who can't require every vendor to have third-party certification.

### Renewal Tracking

Attestations have limited validity:

- Set the expiration date when recording the attestation
- Klarvo sends renewal reminders 30 days before expiry
- A task is auto-created to request updated attestation
- Expired attestations are flagged and no longer count toward due diligence completion

### Best Practices

> 📋 **Request at procurement**: Include attestation requirements in your vendor onboarding process
> 📅 **Set validity periods**: Typically 12 months — align with contract renewal cycles
> 📄 **Use standardized formats**: Consistent attestation requests make vendor responses more comparable
> 🔗 **Link to evidence**: Attestations are evidence for VEN controls — link them accordingly
> ⚠️ **Note limitations**: If a vendor's attestation has caveats, record them clearly
    `
  },
  "contract-management": {
    slug: "contract-management",
    title: "Contract Management",
    description: "How to track AI vendor contracts in Klarvo — key dates, renewal workflows, and ensuring contracts contain the necessary EU AI Act provisions.",
    readTime: "4 min",
    category: "Vendor Management",
    categorySlug: "vendors",
    lastUpdated: "2026-02-15",
    relatedArticles: ["vendor-profiles", "due-diligence", "vendor-attestations"],
    content: `
## Contract Management

Contracts with AI vendors are a critical piece of compliance infrastructure. They define your rights and obligations, including access to documentation, logging data, incident notification, and instructions for use — all of which are needed for Article 26 deployer compliance.

### What Klarvo Tracks

For each vendor contract:

| Field | Description |
|-------|-------------|
| **Contract Type** | SaaS subscription, API agreement, license, custom development |
| **Start Date** | When the contract began |
| **End Date** | When it expires or renews |
| **Auto-Renewal** | Whether it auto-renews (and the notice period) |
| **Value** | Annual contract value (optional, for internal reference) |
| **Key Terms** | Summary of relevant provisions |
| **Document** | Uploaded contract PDF or URL |
| **DPA Status** | Whether a Data Processing Agreement is in place |
| **AI-Specific Clauses** | Whether the contract addresses AI Act requirements |

### Adding a Contract

1. Navigate to the vendor profile
2. Go to the **Contracts** tab
3. Click **Add Contract**
4. Fill in the details above
5. Upload the contract document
6. Save

### AI-Specific Contract Provisions

When reviewing or negotiating vendor contracts, check for these AI Act-relevant provisions:

| Provision | Why It Matters |
|-----------|---------------|
| **Instructions for use** | Article 26 requires deployers to use AI according to instructions — the contract should reference or include them |
| **Logging access** | You need access to system logs; the contract should specify what logs are available and how to access them |
| **Incident notification** | The contract should require the vendor to notify you of material issues |
| **Transparency support** | If your transparency obligations depend on vendor capabilities, the contract should address this |
| **Data processing terms** | Where and how data is processed, stored, and deleted |
| **Change notification** | Vendor should notify you of material changes to the AI system |
| **Audit rights** | Ability to audit or request evidence of vendor compliance (where practical) |
| **Termination for non-compliance** | Right to terminate if the vendor fails to meet AI Act-related obligations |

### Renewal Workflow

1. **Reminder**: Klarvo sends a reminder 60 days before contract end date
2. **Review trigger**: A task is created: "Review vendor contract and due diligence before renewal"
3. **Due diligence refresh**: Update the vendor's due diligence checklist
4. **Request updated attestations**: Ask for current compliance statements
5. **Renew or replace**: Update the contract record with the new agreement
6. **Update linked systems**: If anything changed, trigger reassessment of linked AI systems

### Best Practices

> 📋 **Upload all contracts**: Even click-through SaaS terms should be documented
> 📅 **Track all dates**: Start, end, renewal notice deadlines
> 🔍 **Review AI provisions**: Check whether contracts address AI Act requirements
> 🔄 **Refresh at renewal**: Use contract renewal as a trigger for complete vendor review
> 🔗 **Link to systems**: Ensure every vendor-based AI system references its contract
    `
  },

  // =============================================
  // ACCOUNT & SETTINGS
  // =============================================
  "org-settings": {
    slug: "org-settings",
    title: "Organization Settings",
    description: "How to configure your organization profile in Klarvo — company information, industry sector, compliance preferences, and workspace customization.",
    readTime: "4 min",
    category: "Account & Settings",
    categorySlug: "settings",
    lastUpdated: "2026-02-15",
    relatedArticles: ["notifications", "billing", "data-privacy"],
    content: `
## Organization Settings

Organization settings define your company's profile and compliance configuration in Klarvo. These settings affect template language, recommendation relevance, and export branding.

### Accessing Settings

Navigate to **Settings** → **General** in the sidebar.

### Organization Profile

| Setting | Description | Impact |
|---------|-------------|--------|
| **Organization Name** | Your legal entity name | Appears on all exports and reports |
| **Industry Sector** | Primary industry (dropdown) | Tailors risk recommendations and template language |
| **Company Size** | Employee count range | Affects training program recommendations |
| **Country** | Primary country of operation | Determines relevant national authority |
| **EU Presence** | EU member states where you operate | Affects which AI Act deadlines and authorities apply |
| **Description** | Brief company description | Included in governance pack exports |

### Compliance Configuration

| Setting | Description |
|---------|-------------|
| **Default Review Cadence** | How often AI systems should be reviewed (default: 90 days) |
| **Evidence Approval Required** | Whether evidence requires formal approval before counting |
| **Training Refresh Period** | Default re-certification interval (default: 12 months) |
| **Governance Charter** | Upload or generate your AI governance charter |

### Export Branding

Customize how your exports look:

- **Organization Logo**: Uploaded for export headers
- **Confidentiality Default**: Default marking for exports (Internal / Shareable)
- **Document Footer**: Custom text for export footers

### Department/Team Configuration

Manage the department list used across the platform:

1. Go to **Settings** → **General** → **Departments**
2. Add, rename, or remove departments
3. These appear as options in the AI System Wizard, filters, and reports

Default departments: Engineering, Product, HR, Finance, Operations, Marketing, Sales, Legal, Customer Success, IT, Other.

### Best Practices

> 📋 **Complete your profile**: A thorough organization profile means better-tailored recommendations
> 🏢 **Keep industry sector current**: If your business pivots, update this — it affects risk recommendations
> 🖼️ **Add your logo**: It makes exports look professional and branded
> 🔄 **Review annually**: Organization settings should be reviewed at least annually
    `
  },
  "notifications": {
    slug: "notifications",
    title: "Notification Preferences",
    description: "Configure notification preferences in Klarvo — control which alerts you receive, how you receive them, and how to manage notification volume.",
    readTime: "3 min",
    category: "Account & Settings",
    categorySlug: "settings",
    lastUpdated: "2026-02-15",
    relatedArticles: ["org-settings", "task-owners", "evidence-expiration"],
    content: `
## Notification Preferences

Klarvo sends notifications to keep you informed about compliance activities. You can configure what you receive and how you receive it.

### Notification Channels

| Channel | Description |
|---------|-------------|
| **In-App** | Notifications in the Klarvo interface (bell icon) — always on |
| **Email** | Email notifications for important events — configurable |
| **Weekly Digest** | Summary email of the week's compliance activity — configurable |

### Notification Types

| Event | Default | Configurable |
|-------|---------|-------------|
| Task assigned to you | ✅ In-App + Email | Yes |
| Task overdue | ✅ In-App + Email | Yes |
| Evidence approval request | ✅ In-App + Email | Yes |
| Evidence approved/rejected | ✅ In-App | Yes |
| Evidence expiring (30 days) | ✅ In-App + Email | Yes |
| Evidence expired | ✅ In-App + Email | Yes |
| Classification completed | ✅ In-App | Yes |
| Reassessment triggered | ✅ In-App + Email | Yes |
| Incident created (Critical/High) | ✅ In-App + Email | No (always on) |
| Team member invited | ✅ In-App | Yes |
| Training assigned | ✅ In-App + Email | Yes |
| Training due/overdue | ✅ In-App + Email | Yes |
| Contract renewal approaching | ✅ In-App + Email | Yes |
| Weekly digest | ✅ Email | Yes |

### Configuring Preferences

1. Navigate to **Settings** → **Notifications**
2. Toggle each notification type on/off for each channel
3. Set digest preferences:
   - Frequency: Weekly (default) or Daily
   - Day of week: Monday (default)
   - Include/exclude specific categories
4. Save changes

### Managing Notification Volume

If you're receiving too many notifications:

- **Disable email for low-priority items**: Keep in-app but turn off email for routine events
- **Use the weekly digest**: Instead of individual emails, get a consolidated summary
- **Delegate**: If you're receiving notifications for systems you don't own, ensure ownership is assigned to the right person

### Best Practices

> 🔔 **Keep critical alerts on**: Never disable incident or reassessment notifications
> 📧 **Enable the weekly digest**: It's a useful compliance check-in even if you disable individual emails
> 🎯 **Match to your role**: Admins need more notifications than Viewers
> 📱 **Check in-app regularly**: The bell icon shows unread notification count
    `
  },
  "billing": {
    slug: "billing",
    title: "Billing & Subscriptions",
    description: "Manage your Klarvo subscription, understand plan differences, upgrade or downgrade, and access billing information.",
    readTime: "4 min",
    category: "Account & Settings",
    categorySlug: "settings",
    lastUpdated: "2026-02-15",
    relatedArticles: ["org-settings", "data-privacy"],
    content: `
## Billing & Subscriptions

Klarvo offers tiered pricing designed for SMEs. This guide covers plan management, upgrades, and billing administration.

### Accessing Billing

Navigate to **Settings** → **Billing**. Only users with the **Admin** role can access billing settings.

### Plan Overview

| Plan | AI Systems | Users | Key Features |
|------|-----------|-------|-------------|
| **Free** | Up to 2 | 1 | Inventory, basic classification, PDF export (watermarked) |
| **Starter** (€99/mo) | Up to 10 | 5 | Evidence vault, templates, PDF + ZIP export |
| **Growth** (€249/mo) | Up to 25 | Unlimited | Approvals, versioning, training tracking, org reporting |
| **Pro** (€499/mo) | Up to 75 | Unlimited | FRIA workflow, auditor portal, SLA reminders, change management |
| **Enterprise** | Custom | Unlimited | SSO, EU data residency, custom templates, multi-workspace |

### What's in Each Plan

**Free**: Get started with a basic inventory. Classify up to 2 AI systems. PDF exports are watermarked. No evidence vault or team collaboration.

**Starter**: The core compliance toolkit. Upload evidence, use policy templates, generate branded PDF and ZIP exports. Suitable for small teams with a handful of AI systems.

**Growth**: Full team collaboration. Unlimited users, evidence approval workflows, training tracking, organization-wide reporting. Best for growing companies with 10-25 AI systems.

**Pro**: Advanced compliance for regulated industries. FRIA workflow, auditor portal links, SLA timers, change management prompts. For companies with complex AI portfolios or regulatory scrutiny.

**Enterprise**: Everything in Pro plus SSO/SAML, EU data residency, custom template libraries, multi-workspace for subsidiaries, and dedicated support.

### Upgrading Your Plan

1. Go to **Settings** → **Billing**
2. Click **Upgrade Plan**
3. Select your new plan
4. Enter payment details (if not already on file)
5. Confirm — access to new features is immediate

### Downgrading

You can downgrade at any time. Downgrade takes effect at the end of your current billing period. If you have more AI systems than the lower plan allows, you'll need to archive some before downgrading.

### Payment Methods

- Credit card (Visa, Mastercard, Amex)
- Annual billing available (save ~15%)

### Invoices

Access invoices in **Settings** → **Billing** → **Invoice History**. Download PDF invoices for your records.

### Best Practices

> 💰 **Start with Starter**: Most SMEs find Starter sufficient initially; upgrade as your inventory grows
> 📅 **Consider annual billing**: Save ~15% compared to monthly
> 📊 **Monitor system count**: Upgrade before hitting your plan's AI system limit
    `
  },
  "data-privacy": {
    slug: "data-privacy",
    title: "Data Export & Privacy",
    description: "How Klarvo handles your data — export capabilities, data retention controls, privacy settings, and your rights under GDPR.",
    readTime: "5 min",
    category: "Account & Settings",
    categorySlug: "settings",
    lastUpdated: "2026-02-15",
    relatedArticles: ["org-settings", "evidence-vault", "export-overview"],
    content: `
## Data Export & Privacy

As a compliance tool, Klarvo takes data protection seriously. This guide covers how your data is stored, how to export it, and your privacy controls.

### Data Storage

| Data Type | Storage | Encryption |
|-----------|---------|-----------|
| **AI System records** | Cloud database | Encrypted at rest (AES-256) |
| **Evidence files** | Cloud storage | Encrypted at rest + in transit (TLS 1.3) |
| **User data** | Cloud database | Encrypted at rest |
| **Audit logs** | Cloud database | Encrypted, immutable |
| **Exports** | Generated on demand | Encrypted in transit |

### Data Export

You can export your data at any time:

#### Full Data Export
1. Navigate to **Settings** → **Data Export & Privacy**
2. Click **Export All Data**
3. Klarvo generates a ZIP containing:
   - AI system records (JSON/CSV)
   - Evidence files (original format)
   - Classification records (JSON)
   - Audit log (CSV)
   - Training records (CSV)
   - Vendor records (JSON)
   - Task history (CSV)
4. Download link sent via email (large exports may take time)

#### Selective Export
Export specific data types:
- AI System Inventory (CSV)
- Evidence files (ZIP)
- Audit Log (CSV)
- Training Records (CSV)
- Vendor Registry (CSV)

### Data Retention

| Data | Retention | Your Control |
|------|-----------|-------------|
| AI System records | Until you delete | Full control |
| Evidence files | Until you delete (or expiration) | Full control |
| Audit logs | Minimum 7 years (regulatory) | Cannot delete (by design) |
| Deleted items | 30-day recovery window | Can request permanent deletion |
| Account data | Until account closure | Request via support |

### Privacy Settings

Navigate to **Settings** → **Data Export & Privacy**:

- **AI Assistant Privacy**: Control whether AI features process your data (see AI Privacy Settings)
- **Analytics**: Opt in/out of anonymous usage analytics
- **Data Processing**: View your DPA with Klarvo

### Your Rights Under GDPR

As Klarvo processes your data, you have the right to:

| Right | How to Exercise |
|-------|----------------|
| **Access** | Use the Full Data Export feature |
| **Rectification** | Edit your data directly in the platform |
| **Erasure** | Delete individual records or request account closure |
| **Portability** | Use the Full Data Export (machine-readable formats) |
| **Restriction** | Contact support to restrict specific processing |
| **Objection** | Contact support to object to specific processing |

### Account Closure

To close your account and delete all data:

1. Export your data first (recommended)
2. Navigate to **Settings** → **Data Export & Privacy**
3. Click **Request Account Closure**
4. Confirm via email
5. Data is deleted within 30 days (audit logs retained per regulatory requirements)

### Klarvo's Compliance Documentation

For your own compliance records:

- **Data Processing Agreement (DPA)**: Available at [/legal/dpa](/legal/dpa)
- **Privacy Policy**: Available at [/legal/privacy](/legal/privacy)
- **Security Overview**: Available at [/legal/security](/legal/security)
- **GDPR Statement**: Available at [/legal/gdpr](/legal/gdpr)

### Best Practices

> 📥 **Regular backups**: Export your data periodically as an additional backup
> 🔒 **Review privacy settings**: Check your AI privacy preferences during onboarding
> 📋 **Include in your ROPA**: Add Klarvo to your Record of Processing Activities
> 🔗 **DPA on file**: Download the DPA for your compliance records
    `
  }
};

// Helper function to get article by slug
export function getArticleBySlug(slug: string): DocArticle | undefined {
  return docArticles[slug];
}

// Helper function to get category for an article
export function getCategoryForArticle(slug: string): DocCategory | undefined {
  return docCategories.find(cat => 
    cat.articles.some(article => article.slug === slug)
  );
}

// Helper function to get all articles in a category
export function getArticlesInCategory(categorySlug: string): DocArticle[] {
  const category = docCategories.find(cat => cat.slug === categorySlug);
  if (!category) return [];
  
  return category.articles
    .map(article => docArticles[article.slug])
    .filter((article): article is DocArticle => article !== undefined);
}

// Get all blog posts helper
export function getAllDocArticles(): DocArticle[] {
  return Object.values(docArticles);
}

// Popular articles for homepage
export const popularArticles = [
  { title: "Quick Start Guide", category: "Getting Started", slug: "quick-start" },
  { title: "Using the AI System Wizard", category: "AI System Inventory", slug: "ai-system-wizard" },
  { title: "The Classification Engine Explained", category: "Classification", slug: "classification-engine" },
  { title: "High-Risk Categories (Annex III)", category: "Classification", slug: "high-risk-categories" },
  { title: "When is FRIA Required?", category: "FRIA", slug: "fria-requirements" },
  { title: "Full Evidence Pack (ZIP)", category: "Exports", slug: "evidence-pack" },
];

// Video tutorials
export const videoTutorials = [
  { title: "Platform Overview", duration: "5:32", thumbnail: "Getting a bird's eye view of Klarvo" },
  { title: "Adding Your First AI System", duration: "8:15", thumbnail: "Step-by-step wizard walkthrough" },
  { title: "Classification & Risk Assessment", duration: "12:45", thumbnail: "Understanding the classification engine" },
  { title: "Generating Evidence Packs", duration: "6:20", thumbnail: "Creating audit-ready exports" },
];
