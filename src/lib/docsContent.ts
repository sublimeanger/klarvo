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
  "quick-start": {
    slug: "quick-start",
    title: "Quick Start Guide",
    description: "Get up and running with Klarvo in under 10 minutes. This guide walks you through creating your account, adding your first AI system, and understanding the core features.",
    readTime: "5 min",
    category: "Getting Started",
    categorySlug: "getting-started",
    lastUpdated: "2025-01-28",
    relatedArticles: ["dashboard-overview", "first-ai-system", "invite-team"],
    content: `
## Welcome to Klarvo

Klarvo is the leading EU AI Act compliance platform designed specifically for SMEs. This guide will help you get started quickly and understand the core concepts.

### Step 1: Create Your Organization

After signing up, you'll be prompted to create your organization. This is where all your AI systems, evidence, and compliance data will live.

1. **Organization Name**: Enter your company name
2. **Industry Sector**: Select your primary industry (this helps us tailor recommendations)
3. **Company Size**: Choose your employee count range

> 💡 **Tip**: You can always update these settings later in **Settings → General**.

### Step 2: Understand the Dashboard

Once your organization is set up, you'll land on the **Dashboard**. This is your compliance command center, showing:

- **AI Systems Overview**: Total count and classification breakdown
- **Compliance Alerts**: Upcoming deadlines and action items
- **Risk Distribution**: Visual breakdown of your AI portfolio
- **Audit Readiness Score**: Your overall compliance health

### Step 3: Add Your First AI System

The heart of Klarvo is the **AI System Inventory**. To add your first system:

1. Navigate to **AI Systems** in the sidebar
2. Click **Add AI System**
3. Choose between:
   - **Quick Capture** (2-4 minutes) — Minimal fields, creates tasks to complete later
   - **Full Assessment** (10-20 minutes) — Complete classification in one session

### Step 4: Complete the Classification

The AI System Wizard guides you through:

1. **Basic Information**: Name, description, department
2. **Scope & Impact**: Where it's used, who's affected
3. **Value Chain Role**: Are you a deployer, provider, or both?
4. **AI Definition Test**: Is this actually an AI system under the Act?
5. **Prohibited Practices Screening**: Red flag checks
6. **High-Risk Screening**: Annex III category matching
7. **Transparency Obligations**: Article 50 requirements

### Step 5: Review Your Classification

After completing the wizard, you'll receive:

- **Risk Level Classification**: Minimal, Limited, or High-Risk Candidate
- **Applicable Obligations**: What you need to do
- **Gap Checklist**: Missing controls and evidence
- **Auto-Generated Tasks**: Assigned action items

### Next Steps

Now that you've added your first AI system, explore these resources:

- [Understanding the Dashboard](/docs/dashboard-overview) — Deep dive into metrics
- [Inviting Team Members](/docs/invite-team) — Collaborate with your team
- [Evidence Vault Overview](/docs/evidence-vault) — Organize your compliance evidence

---

## Need Help?

If you get stuck at any point:

- Check our [FAQ](/faq) for common questions
- [Contact Support](/contact) for personalized assistance
- [Explore Features](/features) to see how it works
    `
  },
  "dashboard-overview": {
    slug: "dashboard-overview",
    title: "Understanding the Dashboard",
    description: "A comprehensive guide to the Klarvo dashboard, explaining each metric, chart, and widget to help you monitor your compliance posture.",
    readTime: "3 min",
    category: "Getting Started",
    categorySlug: "getting-started",
    lastUpdated: "2025-01-27",
    relatedArticles: ["quick-start", "first-ai-system"],
    content: `
## Dashboard Overview

The Klarvo Dashboard is your compliance command center, providing real-time visibility into your EU AI Act readiness.

### Key Metrics

#### AI Systems Count
The total number of AI systems in your inventory, broken down by classification:

| Classification | Description |
|---------------|-------------|
| **Minimal Risk** | No specific obligations beyond good practice |
| **Limited Risk** | Transparency obligations apply (Article 50) |
| **High-Risk Candidate** | Full compliance requirements (Article 26) |
| **Blocked** | Potential prohibited practice flagged |

#### Audit Readiness Score

This percentage reflects your overall compliance health based on:

- **Evidence Completeness**: % of required evidence uploaded and approved
- **Control Implementation**: % of applicable controls implemented
- **Task Completion**: % of compliance tasks completed
- **Training Coverage**: % of staff with required AI literacy training

> 🎯 **Goal**: Aim for 80%+ to be considered "audit-ready"

### Charts & Visualizations

#### Risk Distribution Chart
A pie chart showing the breakdown of your AI systems by risk level. This helps you quickly identify your exposure to high-risk obligations.

#### Department Risk Heatmap
A matrix view showing which departments have the highest concentration of high-risk AI systems, helping you prioritize compliance efforts.

#### Compliance Trend Chart
A 12-month trend line showing your audit readiness score over time, so you can track improvement or identify regression.

### Alerts & Action Items

The **Compliance Alerts** panel shows:

- ⏰ **Upcoming Deadlines**: Evidence renewals, review dates
- ⚠️ **Missing Evidence**: Controls without documentation
- 🔄 **Reassessment Needed**: Systems flagged for re-review
- 📋 **Overdue Tasks**: Past-due action items

### Customizing Your Dashboard

You can personalize the dashboard by:

1. Clicking the **Customize** button (top right)
2. Dragging widgets to rearrange
3. Showing/hiding specific panels
4. Setting your preferred date range for charts

---

## Quick Actions

From the dashboard, you can quickly:

- **Add AI System**: Start the intake wizard
- **Upload Evidence**: Add documentation
- **View All Tasks**: See your to-do list
- **Export Report**: Generate a compliance summary
    `
  },
  "first-ai-system": {
    slug: "first-ai-system",
    title: "Adding Your First AI System",
    description: "Step-by-step walkthrough of adding an AI system to your inventory using the guided wizard.",
    readTime: "8 min",
    category: "Getting Started",
    categorySlug: "getting-started",
    lastUpdated: "2025-01-26",
    relatedArticles: ["ai-system-wizard", "capture-modes", "ownership-oversight"],
    content: `
## Adding Your First AI System

This guide walks you through the complete process of adding an AI system to your Klarvo inventory.

### Before You Begin

Gather the following information about your AI system:

- **System Name & Description**: What it's called internally
- **Vendor/Provider Details**: If it's a third-party tool
- **Primary Owner**: Who's responsible for this system
- **Deployment Scope**: Where and how it's used
- **Affected Groups**: Customers, employees, etc.

### Starting the Wizard

1. Navigate to **AI Systems** in the sidebar
2. Click the **Add AI System** button
3. Select your assessment mode:

#### Quick Capture Mode
Best for: Initial inventory building, time-constrained situations

- Takes 2-4 minutes
- Captures essential information only
- Creates follow-up tasks for completion
- Classification may be marked "Needs Review"

#### Full Assessment Mode
Best for: Complete compliance documentation, high-priority systems

- Takes 10-20 minutes
- Comprehensive classification questionnaire
- Immediate risk level determination
- Generates full obligation checklist

### Wizard Steps Explained

#### Step 1: Basic Information
Enter the system name, internal reference ID, and a brief description. Select the wizard mode and assign initial ownership.

#### Step 2: Vendor Information
If using a third-party system, link or create the vendor record. Attach contract documentation and note any model providers (e.g., "OpenAI GPT-4").

#### Step 3: Ownership & Oversight
Assign the primary owner, backup owner, and oversight owner. These individuals are accountable for compliance.

#### Step 4: Scope & Deployment
Specify where the system operates (EU countries), which departments use it, and who is affected by its outputs.

#### Step 5: Value Chain Role
Determine your organization's role:

- **Deployer**: You use AI made by others
- **Provider**: You build/sell AI to others
- **Both**: You customize vendor AI significantly

#### Step 6: AI Definition Test
Answer questions to confirm this qualifies as an "AI system" under the Act's definition.

#### Step 7: Use Case & Functionality
Describe what the system does, what decisions it influences, and the level of human involvement.

#### Step 8: Prohibited Practices Screening
Critical safety check against Article 5 prohibited practices. Any "Yes" or "Unsure" flags require legal review.

#### Step 9: High-Risk Screening
Systematic check against Annex III categories (employment, education, credit, etc.) to identify high-risk candidates.

### After Completion

Once you finish the wizard:

1. **Classification Memo**: Auto-generated document with rationale
2. **Gap Checklist**: Shows missing controls and evidence
3. **Task Plan**: Auto-created tasks with owners and due dates
4. **Evidence Requests**: Prompts for required documentation

### Tips for Success

> ✅ **Be thorough**: More detail now means less rework later
> ✅ **Involve stakeholders**: Loop in the actual system users
> ✅ **Attach evidence early**: Upload vendor docs during the wizard
> ✅ **Set realistic dates**: Default review is 90 days; adjust as needed
    `
  },
  "invite-team": {
    slug: "invite-team",
    title: "Inviting Team Members",
    description: "Learn how to add colleagues to your Klarvo workspace and assign appropriate roles and permissions.",
    readTime: "3 min",
    category: "Getting Started",
    categorySlug: "getting-started",
    lastUpdated: "2025-01-25",
    relatedArticles: ["roles-permissions", "task-owners"],
    content: `
## Inviting Team Members

Klarvo is designed for collaboration. This guide explains how to invite colleagues and assign appropriate access levels.

### How to Invite Members

1. Go to **Settings** → **Team** (or click the **Share** button)
2. Click **Invite Member**
3. Enter their email address
4. Select a role (see below)
5. Click **Send Invitation**

The invitee will receive an email with a link to join your organization.

### Available Roles

| Role | Description | Capabilities |
|------|-------------|--------------|
| **Admin** | Full access to everything | All features + billing + integrations |
| **Compliance Owner** | Manages compliance program | Everything except billing/integrations |
| **System Owner** | Owns specific AI systems | Their assigned systems, evidence upload |
| **Reviewer/Approver** | Reviews and approves | Approve assessments, evidence, policies |
| **Viewer** | Read-only access | View dashboards, reports, no edits |

### Assigning Ownership

After inviting team members, you can assign them as:

- **Primary Owner**: Main responsible person for an AI system
- **Backup Owner**: Secondary contact when primary is unavailable
- **Oversight Owner**: Human oversight authority
- **Task Assignee**: Person responsible for specific compliance tasks

### Pending Invitations

Track outstanding invitations in **Settings → Team → Pending**. You can:

- **Resend** invitation emails
- **Revoke** invitations not yet accepted
- **Modify** role before acceptance

### Best Practices

> 👥 **Least privilege principle**: Give users only the access they need
> 📧 **Use work emails**: Avoid personal email addresses
> 🔄 **Regular review**: Audit team access quarterly
> 🚪 **Offboarding**: Remove access promptly when people leave
    `
  },
  "ai-system-wizard": {
    slug: "ai-system-wizard",
    title: "Using the AI System Wizard",
    description: "Master the 20-step AI System Intake Wizard to capture comprehensive compliance information.",
    readTime: "10 min",
    category: "AI System Inventory",
    categorySlug: "ai-system-inventory",
    lastUpdated: "2025-01-28",
    relatedArticles: ["capture-modes", "first-ai-system", "classification-engine"],
    content: `
## The AI System Wizard

The AI System Wizard is Klarvo's guided intake process, designed to capture all information needed for EU AI Act compliance in a structured, user-friendly flow.

### Wizard Design Philosophy

The wizard follows these principles:

1. **< 10 minutes** for a complete Full Assessment
2. **Every answer creates action**: Classification decision, obligation flag, evidence request, or task
3. **Progressive disclosure**: Complex questions only appear when relevant
4. **Save progress**: Resume anytime without losing work

### The 20 Steps

#### Part 1: Foundation (Steps 0-3)

**Step 0: Mode Selection**
Choose Quick Capture or Full Assessment. Quick Capture skips optional questions and creates follow-up tasks.

**Step 1: Basic Information**
- System name and internal reference ID
- Lifecycle status (Idea, Pilot, Live, Retired)
- Primary owner assignment

**Step 2: Vendor Information**
- Built in-house vs. third-party acquisition
- Vendor selection or creation
- Contract documentation links

**Step 3: Ownership & Accountability**
- Backup owner
- Oversight owner
- Department/team assignment

#### Part 2: Scope & Context (Steps 4-5)

**Step 4: Deployment Scope**
- Deployment regions (EU, UK, US, Other)
- EU countries of operation
- Internal user groups
- Affected external parties

**Step 5: Value Chain Role**
- Deployer, Provider, or Both
- External offering assessment
- Foundation model usage

#### Part 3: Definition & Classification (Steps 6-9)

**Step 6: AI System Definition Test**
- Infers outputs from inputs?
- Output types (predictions, recommendations, etc.)
- Operates autonomously?
- Adapts after deployment?
- Technical approach (ML, LLM, rules-based)

**Step 7: Use Case & Functionality**
- Purpose category
- Workflow description
- Human involvement level
- Override capability
- Usage frequency and scale

**Step 8: Prohibited Practices Screening**
Eight critical questions covering Article 5:
- Manipulation/deception
- Exploitation of vulnerabilities
- Social scoring
- Criminal profiling
- Facial recognition scraping
- Workplace emotion inference
- Biometric categorisation
- Real-time remote biometric ID

**Step 9: High-Risk Screening**
Nine Annex III category checks:
- Biometrics
- Critical infrastructure
- Education
- Employment
- Essential services
- Law enforcement
- Migration/border
- Justice/democratic processes
- Safety components

#### Part 4: Obligations (Steps 10-14)

**Step 10: Transparency Obligations**
Article 50 requirements:
- Direct interaction disclosure
- Synthetic content marking
- Emotion recognition notice
- Deepfake disclosure
- Public-interest text disclosure

**Step 11: Data & Privacy**
- Personal data processing
- Special category data
- Minors involved
- Data sources and control
- Retention periods
- DPIA status

**Step 12: Human Oversight**
- Oversight model (HITL/HOTL/HOOTL)
- Oversight owner authority
- Competence requirements
- Training status
- SOP documentation

**Step 13: Logging & Records**
- Automatic logging capability
- Log storage location
- Access controls
- Retention period
- Export capability
- 6-month retention confirmation

**Step 14: Incidents & Monitoring**
- Incident response process
- Severity levels
- Notification procedures
- Suspension capability

#### Part 5: Special Contexts (Steps 15-17)

**Step 15: Workplace Context**
- Workplace use assessment
- Worker notification status

**Step 16: Public Authority Context**
- Public authority status
- Public service provision
- Registration status

**Step 17: Training & AI Literacy**
- Staff roles involved
- Training program status
- Completion tracking

#### Part 6: Finalization (Steps 18-20)

**Step 18: FRIA Assessment**
- FRIA trigger evaluation
- FRIA status tracking
- Link to FRIA Wizard

**Step 19: Review & Sign-off**
- Final classification confirmation
- Reviewer assignment
- Sign-off date
- Notes

**Step 20: Completion**
- Summary of outputs
- Generated documents
- Next steps
- Action items

### Auto-Generated Outputs

Upon completion, the wizard creates:

1. **AI System Record**: Full database entry
2. **Classification Memo**: PDF with rationale
3. **Gap Checklist**: Missing controls/evidence
4. **Task Plan**: Auto-assigned action items
5. **Evidence Requests**: Specific document needs
    `
  },
  "capture-modes": {
    slug: "capture-modes",
    title: "Quick Capture vs Full Assessment",
    description: "Understand when to use Quick Capture mode versus Full Assessment mode for AI system intake.",
    readTime: "4 min",
    category: "AI System Inventory",
    categorySlug: "ai-system-inventory",
    lastUpdated: "2025-01-24",
    relatedArticles: ["ai-system-wizard", "first-ai-system"],
    content: `
## Choosing Your Assessment Mode

When adding an AI system, you can choose between two modes. This guide helps you pick the right one.

### Quick Capture Mode

**Duration**: 2-4 minutes

**Best for**:
- Initial inventory building
- Shadow AI discovery triage
- Time-constrained situations
- Low-priority systems
- Pilots and experiments

**What it captures**:
- Essential identification (name, ID, owner)
- High-level scope (region, department)
- Basic vendor information
- Preliminary risk indicators

**What it skips**:
- Detailed classification questions
- Transparency obligation screening
- Data governance details
- Human oversight specifics

**Output**:
- Classification: "Needs Review"
- Auto-generated tasks to complete missing sections
- Basic system record in inventory

### Full Assessment Mode

**Duration**: 10-20 minutes

**Best for**:
- Production systems
- Customer-facing AI
- High-risk candidates
- Audit preparation
- Regulatory inquiries

**What it captures**:
- Complete 20-step questionnaire
- All classification screenings
- Detailed obligation mapping
- Evidence requirements
- Control assignments

**Output**:
- Definitive classification (Minimal/Limited/High-Risk/Blocked)
- Classification Memo PDF
- Complete gap checklist
- Full task plan with deadlines

### Comparison Table

| Feature | Quick Capture | Full Assessment |
|---------|--------------|-----------------|
| Time required | 2-4 min | 10-20 min |
| Questions asked | ~15 | ~80 |
| Classification | Preliminary | Definitive |
| Evidence requests | Generic | Specific |
| Task generation | Basic | Comprehensive |
| Best for | Inventory building | Compliance readiness |

### Upgrading from Quick to Full

You can always upgrade a Quick Capture to Full Assessment:

1. Open the AI system detail page
2. Click **Complete Assessment**
3. Continue from where Quick Capture left off
4. New classification replaces preliminary result

### Our Recommendation

> 🚀 **Start with Quick Capture** for initial inventory building, then upgrade high-priority systems to Full Assessment based on risk.
    `
  },
  "classification-engine": {
    slug: "classification-engine",
    title: "The Classification Engine Explained",
    description: "Deep dive into how Klarvo's classification engine determines risk levels and applicable obligations.",
    readTime: "8 min",
    category: "Classification & Risk Assessment",
    categorySlug: "classification",
    lastUpdated: "2025-01-28",
    relatedArticles: ["definition-test", "prohibited-screening", "high-risk-categories"],
    content: `
## The Classification Engine

Klarvo's Classification Engine is the core logic that determines your AI system's risk level and applicable EU AI Act obligations.

### How Classification Works

The engine processes your wizard answers through four sequential stages:

\`\`\`
Stage 1: AI System Definition → Is this even an AI system?
     ↓
Stage 2: Prohibited Screening → Any red flags under Article 5?
     ↓
Stage 3: High-Risk Screening → Annex III category match?
     ↓
Stage 4: Transparency Check → Article 50 obligations?
     ↓
Final Classification + Obligation Mapping
\`\`\`

### Stage 1: AI System Definition

First, we determine if your system meets the EU AI Act definition of an "AI system":

**Key criteria**:
1. Infers outputs from inputs to achieve objectives
2. Produces predictions, recommendations, decisions, or content
3. Operates with some degree of autonomy
4. Uses ML, statistical, or logic-based approaches

**Possible outcomes**:
- ✅ Likely AI System → Continue to Stage 2
- ❌ Likely Not AI System → Out of scope (still tracked)
- ⚠️ Needs Review → Flag for legal/compliance review

### Stage 2: Prohibited Practices (Article 5)

Critical safety check against eight prohibited AI practices:

1. Harmful manipulation/deception
2. Exploitation of vulnerabilities
3. Social scoring for unrelated decisions
4. Criminal risk prediction via profiling alone
5. Untargeted facial recognition database scraping
6. Workplace/education emotion inference
7. Biometric categorisation revealing protected characteristics
8. Real-time remote biometric ID in public spaces (law enforcement)

**Possible outcomes**:
- ✅ No indicators → Continue to Stage 3
- ⚠️ Potential prohibited → **STOP** - Legal review required
- ❓ Unsure on any → Flag for compliance review

> ⛔ **If any prohibited indicator is flagged, the system is classified as "Blocked" until cleared by legal review.**

### Stage 3: High-Risk Screening (Annex III)

Check against nine high-risk use case categories:

| Category | Examples |
|----------|----------|
| Biometrics | Facial recognition, fingerprint matching |
| Critical Infrastructure | Energy grid control, water systems |
| Education | Exam proctoring, admissions scoring |
| Employment | CV screening, performance evaluation |
| Essential Services | Credit scoring, insurance underwriting |
| Law Enforcement | Evidence analysis, risk assessment |
| Migration | Visa processing, asylum decisions |
| Justice | Sentencing recommendations, case triage |
| Safety Components | Medical device AI, vehicle ADAS |

**Possible outcomes**:
- ✅ No matches → Continue to Stage 4
- ⚠️ High-Risk Candidate → Deployer obligations apply
- 🏭 Safety Component → Provider obligations may apply

### Stage 4: Transparency Check (Article 50)

Evaluate transparency disclosure requirements:

1. **Direct AI interaction** → Must inform unless obvious
2. **Synthetic content generation** → Machine-readable marking
3. **Emotion recognition** → Must inform affected persons
4. **Deepfake generation** → Must disclose artificial nature
5. **Public-interest text** → Disclosure unless editorial control

### Final Classification Output

Based on all stages, systems are classified:

| Level | Meaning | Obligations |
|-------|---------|-------------|
| **Minimal Risk** | No specific EU AI Act requirements | Best practices only |
| **Limited Risk** | Transparency obligations apply | Article 50 disclosures |
| **High-Risk Candidate** | Full deployer duties | Article 26 + controls |
| **Blocked** | Potential prohibited practice | Legal review + escalation |

### Classification Confidence

Each classification includes a confidence level:

- **High Confidence**: Clear answers, unambiguous category
- **Medium Confidence**: Some uncertainty, recommend review
- **Low Confidence**: Multiple unsure answers, requires expert input

### Audit Trail

Every classification decision is logged with:

- All questions asked and answers given
- Decision path taken
- Classification rationale
- Reviewer (if any) and approval date
- Version history for re-classifications
    `
  },
  "prohibited-screening": {
    slug: "prohibited-screening",
    title: "Prohibited Practices Screening",
    description: "Understanding the eight prohibited AI practices under Article 5 and how Klarvo screens for them.",
    readTime: "7 min",
    category: "Classification & Risk Assessment",
    categorySlug: "classification",
    lastUpdated: "2025-01-27",
    relatedArticles: ["classification-engine", "high-risk-categories"],
    content: `
## Prohibited Practices Screening

Article 5 of the EU AI Act prohibits certain AI practices that pose unacceptable risks to fundamental rights. Klarvo screens every AI system against these eight prohibitions.

### The Eight Prohibited Practices

#### 1. Harmful Manipulation or Deception

**Prohibition**: AI systems that deploy subliminal, manipulative, or deceptive techniques to distort behavior and cause significant harm.

**Examples**:
- Dark patterns exploiting cognitive biases
- Subliminal advertising manipulation
- Deceptive chatbots designed to extract sensitive information

**Screening question**: Does the system use subliminal, manipulative, or deceptive techniques likely to distort behaviour and cause significant harm?

---

#### 2. Exploitation of Vulnerabilities

**Prohibition**: AI that exploits vulnerabilities of specific groups (age, disability, socio-economic situation) in ways likely to cause significant harm.

**Examples**:
- Predatory lending targeting cognitive impairments
- Gambling systems exploiting addiction vulnerabilities
- Scams targeting elderly users

**Screening question**: Does it exploit vulnerabilities (age, disability, socio-economic situation) in a way likely to cause significant harm?

---

#### 3. Social Scoring

**Prohibition**: AI systems evaluating or classifying people based on social behavior or personality characteristics for unrelated decisions, leading to detrimental treatment.

**Examples**:
- Citizenship scoring affecting access to services
- General trustworthiness ratings
- Social media behavior affecting credit decisions

**Screening question**: Does it do "social scoring" of individuals for unrelated context decisions?

---

#### 4. Criminal Risk Prediction via Profiling

**Prohibition**: AI predicting criminal offence risk based solely on profiling or personality traits (without additional objective evidence).

**Examples**:
- Predictive policing based on demographics
- Pre-crime assessment via personality analysis
- Risk scoring without behavioral indicators

**Screening question**: Does it assess/predict risk of committing criminal offences based solely on profiling/personality traits?

---

#### 5. Untargeted Facial Recognition Scraping

**Prohibition**: Creating or expanding facial recognition databases via untargeted scraping from internet or CCTV.

**Examples**:
- Clearview AI-style mass scraping
- Building facial databases without consent
- Harvesting social media photos for FR

**Screening question**: Does it create/expand facial recognition databases via untargeted scraping (internet/CCTV)?

---

#### 6. Workplace/Education Emotion Inference

**Prohibition**: Inferring emotions in workplace or educational settings (with specific exceptions for medical/safety purposes).

**Examples**:
- Employee sentiment monitoring
- Student engagement emotion detection
- Interview emotion analysis

**Screening question**: Does it infer emotions of people in a workplace or education institution?

---

#### 7. Biometric Categorisation Revealing Protected Characteristics

**Prohibition**: Biometric categorisation systems inferring race, political opinions, trade union membership, religious beliefs, sex life, or sexual orientation.

**Examples**:
- Race inference from facial analysis
- Political affiliation prediction
- Sexual orientation classification

**Screening question**: Does it do biometric categorisation that could reveal sensitive/protected characteristics?

---

#### 8. Real-time Remote Biometric Identification (Law Enforcement)

**Prohibition**: Real-time biometric identification in publicly accessible spaces for law enforcement (with narrow exceptions).

**Examples**:
- Live facial recognition surveillance
- Crowd scanning for suspects
- Public space biometric monitoring

**Screening question**: Does it use real-time remote biometric identification in publicly accessible spaces for law enforcement purposes?

---

### If You Flag a Prohibition

If any screening question is answered "Yes" or "Unsure":

1. **Immediate escalation**: System marked "Blocked"
2. **Task created**: "Legal review — prohibited practices"
3. **No further classification**: Must be cleared first
4. **Documentation required**: Context + safeguards explanation

### False Positives

Not all flags indicate actual prohibitions. Context matters:

- Emotion AI for **medical purposes** may be exempt
- Biometric categorisation for **specific security contexts** may be allowed
- Law enforcement exceptions exist for **serious crimes**

Always document context and get legal sign-off for edge cases.
    `
  },
  "high-risk-categories": {
    slug: "high-risk-categories",
    title: "High-Risk Categories (Annex III)",
    description: "Complete reference guide to the nine high-risk AI use case categories defined in Annex III of the EU AI Act.",
    readTime: "10 min",
    category: "Classification & Risk Assessment",
    categorySlug: "classification",
    lastUpdated: "2025-01-28",
    relatedArticles: ["classification-engine", "prohibited-screening", "fria-requirements"],
    content: `
## High-Risk Categories (Annex III)

Annex III of the EU AI Act lists specific use cases where AI systems are considered "high-risk" and subject to extensive compliance requirements.

### Category 1: Biometrics

**Scope**: AI systems used for biometric identification, categorisation, or verification.

**Covered uses**:
- Remote biometric identification
- Biometric categorisation (not prohibited)
- Real-time biometric verification
- Emotion recognition (beyond workplace/education)

**Examples**:
- Airport facial recognition gates
- Age verification systems
- Access control biometrics
- Customer identification in banking

---

### Category 2: Critical Infrastructure

**Scope**: AI as safety components of critical infrastructure management.

**Covered uses**:
- Energy grid management
- Water supply control
- Digital infrastructure
- Road traffic management

**Examples**:
- Smart grid load balancing
- SCADA system AI components
- Network traffic optimization
- Traffic light AI control

---

### Category 3: Education & Vocational Training

**Scope**: AI affecting educational access, assessment, or opportunities.

**Covered uses**:
- Admissions decisions
- Student assessment/grading
- Learning outcome evaluation
- Proctoring and cheating detection
- Educational resource access

**Examples**:
- University admission scoring
- Automated essay grading
- Exam proctoring systems
- Learning management AI

---

### Category 4: Employment & Worker Management

**Scope**: AI systems affecting employment decisions and worker management.

**Covered uses**:
- Recruitment and screening
- Job advertising targeting
- CV/application filtering
- Interview assessment
- Performance evaluation
- Task allocation
- Promotion/termination decisions
- Workplace monitoring

**Examples**:
- ATS candidate ranking
- Video interview analysis
- Performance management AI
- Shift scheduling systems
- Productivity monitoring

---

### Category 5: Essential Private & Public Services

**Scope**: AI affecting access to essential services and benefits.

**Covered uses**:
- Creditworthiness assessment
- Credit scoring
- Risk assessment for insurance (life/health)
- Emergency service dispatch
- Public benefit eligibility
- Social service allocation
- Healthcare access prioritization

**Examples**:
- Bank loan decisioning
- Insurance premium calculation
- Emergency 911/112 triage
- Benefit fraud detection
- Hospital bed allocation

---

### Category 6: Law Enforcement

**Scope**: AI supporting law enforcement activities.

**Covered uses**:
- Evidence reliability assessment
- Crime risk assessment (polygraph, etc.)
- Profiling during investigation
- Lie detection
- Crime pattern prediction
- Deep fake detection in evidence

**Examples**:
- Forensic evidence analysis
- Risk assessment tools for courts
- Investigative AI assistants
- Predictive analytics (location-based)

---

### Category 7: Migration, Asylum & Border Control

**Scope**: AI in immigration and border management contexts.

**Covered uses**:
- Polygraph/similar tools
- Security/health/environmental risk assessment
- Visa/asylum application processing
- Document verification
- Petition/complaint examination
- Irregular migration risk assessment

**Examples**:
- Visa decision support
- Asylum case prioritization
- Border crossing risk assessment
- Document fraud detection

---

### Category 8: Administration of Justice & Democratic Processes

**Scope**: AI assisting judicial and democratic institutions.

**Covered uses**:
- Researching legal facts
- Applying law to facts
- Alternative dispute resolution
- Election result influence (advertising excepted)
- Voting behavior influence

**Examples**:
- Legal research AI
- Sentencing recommendation systems
- Contract analysis tools
- Voter registration assistance

---

### Category 9: Safety Components of Regulated Products

**Scope**: AI that is a safety component of products covered by EU product legislation (Annex I).

**Covered sectors**:
- Medical devices
- Motor vehicles
- Aviation
- Marine equipment
- Toys
- Machinery
- Lifts
- Personal protective equipment

**Examples**:
- ADAS/autonomous driving
- Medical diagnostic AI
- Industrial robot safety
- Drone flight control

---

### Implications of High-Risk Classification

If your AI system matches any Annex III category, you become subject to:

**For Deployers (Article 26)**:
- Use according to provider instructions
- Assign competent human oversight
- Ensure input data quality
- Monitor operation
- Keep logs ≥ 6 months
- Report incidents
- Conduct FRIA (if applicable)

**For Providers (Chapter III, Section 2)**:
- Risk management system
- Data governance
- Technical documentation
- Logging capability
- Transparency & user info
- Human oversight design
- Accuracy & robustness
- Conformity assessment
- Registration in EU database
    `
  },
  "fria-requirements": {
    slug: "fria-requirements",
    title: "When is FRIA Required?",
    description: "Understand the triggers and requirements for conducting a Fundamental Rights Impact Assessment under Article 27.",
    readTime: "5 min",
    category: "FRIA",
    categorySlug: "fria",
    lastUpdated: "2025-01-27",
    relatedArticles: ["fria-wizard", "fria-risks", "high-risk-categories"],
    content: `
## Fundamental Rights Impact Assessment (FRIA)

Article 27 of the EU AI Act requires certain deployers to conduct a Fundamental Rights Impact Assessment before deploying high-risk AI systems.

### Who Must Conduct a FRIA?

FRIA is required when **all** of the following conditions are met:

1. **You are a deployer** (not just a provider)
2. **The AI system is classified as high-risk** (Annex III)
3. **You fall into one of these categories**:
   - Public body / body governed by public law
   - Private entity providing public services
   - Deployer of certain Annex III systems (credit scoring, insurance, emergency services)

### Specific Triggers

#### Public Authorities
Any public body deploying high-risk AI must conduct a FRIA.

**Examples**:
- Government agencies
- Municipalities
- Public hospitals
- State universities
- Regulatory bodies

#### Private Entities Providing Public Services
Private organizations performing public functions:

**Examples**:
- Private hospitals under public contracts
- Utility companies
- Public transport operators
- Social service providers

#### Specific Annex III Use Cases
Regardless of public/private status, FRIA is required for:

- Credit scoring (essential services access)
- Life/health insurance risk assessment
- Emergency services dispatch prioritization

### FRIA Timing

| Scenario | When to Conduct FRIA |
|----------|---------------------|
| First deployment | **Before** putting the system into use |
| Material changes | **Before** implementing significant changes |
| New use case | **Before** extending to new applications |
| Periodic review | As defined in your governance policy |

### What FRIA Must Include

Article 27 specifies six mandatory elements:

**(a) Process Description**
- How the deployer uses the AI system
- Intended purpose in operations
- Decision points affected

**(b) Time Period & Frequency**
- Duration of intended use
- How often it will be used
- Scale of affected individuals

**(c) Affected Categories**
- Natural persons/groups likely affected
- Vulnerable group identification
- Geographic scope

**(d) Specific Risks to Fundamental Rights**
- Right-by-right risk analysis
- Harm categories
- Severity and likelihood assessment

**(e) Human Oversight Measures**
- Oversight design
- Competence requirements
- Intervention authority

**(f) Mitigation & Governance**
- Risk mitigation measures
- Governance arrangements
- Complaint mechanism
- Monitoring plan

### Notification Requirements

After completing your FRIA:

1. **Notify the market surveillance authority** (unless exempt)
2. **Use the prescribed template** (when available)
3. **Update when circumstances change**

### Exemptions

You may be exempt from notification (not from conducting FRIA) if:

- National security exemption applies
- Military/defense context
- Research-only use (not affecting people)

### Integration with DPIA

If you've already conducted a DPIA (Data Protection Impact Assessment) under GDPR, you can:

- Reference and build upon the DPIA
- Reuse relevant risk analyses
- Extend rather than duplicate

However, FRIA has broader scope than DPIA:

| Aspect | DPIA | FRIA |
|--------|------|------|
| Focus | Personal data protection | All fundamental rights |
| Trigger | High-risk data processing | High-risk AI deployment |
| Rights | Privacy & data protection | Dignity, non-discrimination, safety, etc. |
    `
  },
  "evidence-vault": {
    slug: "evidence-vault",
    title: "Evidence Vault Overview",
    description: "Learn how to organize, manage, and maintain audit-ready compliance evidence in Klarvo.",
    readTime: "5 min",
    category: "Evidence & Documentation",
    categorySlug: "evidence",
    lastUpdated: "2025-01-26",
    relatedArticles: ["uploading-evidence", "approval-workflows", "linking-evidence"],
    content: `
## Evidence Vault Overview

The Evidence Vault is Klarvo's secure repository for all compliance documentation, organized for rapid audit response.

### What is the Evidence Vault?

The Evidence Vault stores, organizes, and manages all compliance evidence including:

- **Vendor documentation** (DPAs, security docs, model cards)
- **Internal policies** (AI acceptable use, oversight procedures)
- **Training materials** (courses, completion logs)
- **Risk assessments** (FRIA, DPIA, internal reviews)
- **Monitoring reports** (performance data, bias tests)
- **Incident documentation** (logs, postmortems)
- **Transparency notices** (screenshots, disclosure copy)

### Evidence Organization

Evidence can be attached to:

| Entity | Purpose |
|--------|---------|
| **AI System** | System-specific documentation |
| **Control** | Proof of control implementation |
| **Vendor** | Vendor due diligence records |
| **Policy** | Supporting materials |
| **Task** | Task completion evidence |
| **Incident** | Incident investigation records |

### Evidence Metadata

Every evidence file includes:

- **Name & Description**: What this document proves
- **Evidence Type**: Policy, screenshot, report, attestation, etc.
- **Uploaded By/Date**: Who added it and when
- **Status**: Draft, Pending Approval, Approved
- **Expiration Date**: When evidence needs refresh
- **Confidentiality**: Internal only vs. shareable
- **Tags**: Custom labels for filtering

### Status Workflow

Evidence progresses through these states:

\`\`\`
Draft → Pending Approval → Approved
                           ↓
                      (if rejected)
                         Draft
\`\`\`

### Evidence Expiration

Many compliance documents have limited validity:

- **Vendor security certifications**: Annual renewal
- **Training completions**: Annual refresh
- **Risk assessments**: Review triggers
- **Policies**: Version control

Klarvo automatically:
- Tracks expiration dates
- Sends renewal reminders
- Creates refresh tasks
- Flags expired evidence

### Search & Filtering

Find evidence quickly using:

- **Full-text search**: Document names, descriptions
- **Type filters**: Policies, screenshots, reports
- **Status filters**: Draft, approved, expired
- **Entity filters**: By AI system, vendor, control
- **Date filters**: Upload date, expiration

### Security & Access

The Evidence Vault includes:

- **Role-based access**: View, upload, approve
- **Audit trail**: All actions logged
- **Version history**: Previous versions preserved
- **Encryption**: At-rest and in-transit
- **Retention controls**: Configurable policies

### Best Practices

> 📁 **Organize by entity**: Link evidence to the system/control it supports
> 📅 **Set expiration dates**: Never forget renewal
> ✅ **Require approval**: For audit-critical documents
> 🏷️ **Use tags consistently**: Create organizational taxonomy
> 🔄 **Regular review**: Quarterly evidence hygiene
    `
  },
  "roles-permissions": {
    slug: "roles-permissions",
    title: "User Roles & Permissions",
    description: "Comprehensive guide to Klarvo's role-based access control system and permission levels.",
    readTime: "5 min",
    category: "Team & Collaboration",
    categorySlug: "team",
    lastUpdated: "2025-01-25",
    relatedArticles: ["invite-team", "task-owners"],
    content: `
## User Roles & Permissions

Klarvo uses role-based access control (RBAC) to ensure users have appropriate access to compliance data.

### Available Roles

#### Admin
**Full platform access**

| Area | Permissions |
|------|-------------|
| AI Systems | Create, Read, Update, Delete |
| Evidence | All actions + approve |
| Tasks | All actions + reassign |
| Team | Invite, manage, remove |
| Settings | All including billing |
| Integrations | Configure all |
| Reports | Generate any |

#### Compliance Owner
**Manages the compliance program**

| Area | Permissions |
|------|-------------|
| AI Systems | Create, Read, Update, Delete |
| Evidence | All actions + approve |
| Tasks | All actions |
| Team | Invite (except admin) |
| Settings | Org settings, not billing |
| Reports | Generate any |

#### System Owner
**Owns specific AI systems**

| Area | Permissions |
|------|-------------|
| AI Systems | Read/Update own systems |
| Evidence | Upload for own systems |
| Tasks | Complete assigned tasks |
| Team | View only |
| Settings | Personal settings only |
| Reports | Own systems only |

#### Reviewer/Approver
**Reviews and approves compliance artifacts**

| Area | Permissions |
|------|-------------|
| AI Systems | Read all |
| Evidence | Read + approve |
| Assessments | Review + approve |
| Policies | Review + approve |
| Tasks | View + comment |

#### Viewer
**Read-only access**

| Area | Permissions |
|------|-------------|
| AI Systems | Read only |
| Evidence | View only |
| Tasks | View only |
| Reports | View shared reports |

### Permission Matrix

| Capability | Admin | Comp. Owner | Sys. Owner | Reviewer | Viewer |
|------------|-------|-------------|------------|----------|--------|
| Create AI systems | ✅ | ✅ | ❌ | ❌ | ❌ |
| Edit any AI system | ✅ | ✅ | ❌ | ❌ | ❌ |
| Edit own AI systems | ✅ | ✅ | ✅ | ❌ | ❌ |
| Upload evidence | ✅ | ✅ | ✅ | ❌ | ❌ |
| Approve evidence | ✅ | ✅ | ❌ | ✅ | ❌ |
| Create tasks | ✅ | ✅ | ❌ | ❌ | ❌ |
| Complete tasks | ✅ | ✅ | ✅ | ❌ | ❌ |
| Invite members | ✅ | ✅* | ❌ | ❌ | ❌ |
| Manage billing | ✅ | ❌ | ❌ | ❌ | ❌ |
| Export reports | ✅ | ✅ | ✅** | ✅ | ❌ |

*Cannot invite Admin users
**Own systems only

### Auditor Role (Special)

For external auditors, Klarvo offers a restricted "Auditor" view:

- Read-only access to shared areas
- No editing capabilities
- Export-ready document views
- Time-limited access tokens
- Watermarked document views

### Custom Roles (Enterprise)

Enterprise plans support custom role definitions:

1. Start from a base role template
2. Add or remove specific permissions
3. Create department-specific variants
4. Apply to user groups

### Best Practices

> 🔒 **Least privilege**: Assign minimum necessary access
> 👥 **Separation of duties**: Different people for create vs. approve
> 📋 **Regular audits**: Review access quarterly
> 🚪 **Prompt offboarding**: Remove access same-day
    `
  },
  "incident-management": {
    slug: "incident-management",
    title: "Incident Management Overview",
    description: "How to log, track, and respond to AI-related incidents using Klarvo's incident management system.",
    readTime: "5 min",
    category: "Incidents & Monitoring",
    categorySlug: "incidents",
    lastUpdated: "2025-01-24",
    relatedArticles: ["creating-incidents", "monitoring-events", "reassessment-triggers"],
    content: `
## Incident Management

For high-risk AI systems, deployers must monitor operation and report serious incidents. Klarvo's incident management helps you track, respond to, and document AI-related incidents.

### What Counts as an Incident?

AI incidents requiring documentation include:

- **Safety events**: Physical or psychological harm
- **Rights violations**: Discrimination, privacy breaches
- **Performance failures**: Unexpected outputs, hallucinations
- **Security events**: Data leaks, unauthorized access
- **Compliance gaps**: Discovered non-conformities
- **User complaints**: Documented concerns about AI behavior

### Incident Severity Levels

| Level | Description | Response Time |
|-------|-------------|---------------|
| **Critical** | Immediate harm, safety risk, prohibited practice | < 24 hours |
| **High** | Significant impact, rights violation | < 48 hours |
| **Medium** | Moderate impact, contained | < 1 week |
| **Low** | Minor issue, no harm | < 2 weeks |

### Incident Workflow

\`\`\`
Detection → Logging → Triage → Containment → Investigation
     ↓                                              ↓
  Notify                                        Resolution
     ↓                                              ↓
Internal teams                              Postmortem
     ↓                                              ↓
Provider (if needed)                        Reassessment
     ↓                                              ↓
Authority (if serious)                      Closure
\`\`\`

### Required Documentation

Each incident record should capture:

**Basic Information**
- Title and description
- Linked AI system
- Severity level
- Status (Open, Investigating, Resolved)

**Timeline**
- When it occurred
- When detected
- When contained
- When resolved

**Impact Assessment**
- Affected parties
- Harm description
- Scale of impact

**Response Actions**
- Containment measures taken
- Internal notifications sent
- External notifications required

**Resolution**
- Root cause analysis
- Resolution actions
- Preventive measures

### Serious Incident Reporting

Under Article 26(5), deployers must report serious incidents to:

1. **The AI system provider** — Immediately
2. **Market surveillance authority** — Within required timeframe

A "serious incident" includes:
- Death or serious damage to health
- Serious/irreversible disruption of critical infrastructure
- Serious and irreversible environmental damage
- Serious violation of fundamental rights

### Integration with Reassessment

Incidents can trigger system reassessment:

- Critical incidents → Automatic reassessment flag
- Patterns of medium incidents → Recommended review
- Resolved incidents → Documented in system history

### Best Practices

> 🚨 **Log immediately**: Don't wait to document
> 📞 **Notify early**: Err on the side of over-communication
> 🔍 **Root cause**: Always dig to underlying issues
> 📝 **Postmortem**: Learn and prevent recurrence
> 🔄 **Update procedures**: Improve based on learnings
    `
  },
  "export-overview": {
    slug: "export-overview",
    title: "Export Pack Overview",
    description: "Learn about Klarvo's audit-ready export packs including PDFs and ZIP bundles.",
    readTime: "4 min",
    category: "Exports & Reports",
    categorySlug: "exports",
    lastUpdated: "2025-01-27",
    relatedArticles: ["classification-exports", "fria-exports", "evidence-pack"],
    content: `
## Export Pack Overview

Klarvo generates professional, audit-ready export packs that compile your compliance documentation into structured deliverables.

### Export Types

#### Classification Memo (PDF)
Single-page summary of an AI system's risk classification.

**Includes**:
- System identification
- Classification result with rationale
- Reviewer sign-off
- Key risk indicators
- Applicable obligations summary

#### FRIA Report (PDF)
Complete Fundamental Rights Impact Assessment document.

**Includes**:
- All FRIA sections (a-f)
- Risk analysis matrix
- Mitigation measures
- Approval sign-offs
- Notification status

#### AI System Evidence Pack (ZIP)
Comprehensive bundle for a single AI system.

**Folder structure**:
\`\`\`
📁 [System Name]_Evidence_Pack/
├── 📁 00_Executive/
│   └── Executive_Summary.pdf
├── 📁 01_Classification/
│   ├── Classification_Memo.pdf
│   └── Screening_Results.pdf
├── 📁 02_Obligations/
│   └── Obligations_Checklist.pdf
├── 📁 03_Controls/
│   └── Control_Status.pdf
├── 📁 04_Evidence/
│   └── [All linked evidence files]
├── 📁 05_Vendor/
│   └── [Vendor documentation]
└── Evidence_Index.csv
\`\`\`

#### Organization Governance Pack (PDF)
High-level compliance summary for leadership.

**Includes**:
- AI inventory summary
- Classification distribution
- Compliance readiness score
- Training completion stats
- High-risk system list
- Open gaps and remediation

### Export Quality

All exports are designed to look like professional consultancy deliverables:

- **Branded headers/footers**: Your organization name
- **Version control**: Date, version, generator
- **Document control**: Revision history
- **Confidentiality marking**: Classification level
- **Cross-references**: Evidence IDs, links

### Generating Exports

1. Navigate to the entity (AI System, FRIA, etc.)
2. Click the **Export** button
3. Select export type
4. Choose format (PDF, ZIP)
5. Download or share link

### Sharing Exports

Options for sharing:

- **Direct download**: Immediate file download
- **Secure link**: Time-limited access URL
- **Auditor portal**: Read-only viewer access
- **Email**: Send directly from platform

### Best Practices

> 📋 **Pre-flight check**: Review before sharing externally
> 🔒 **Confidentiality**: Mark sensitive exports appropriately
> 📅 **Freshness**: Regenerate before audits for latest data
> 📚 **Archive**: Keep copies for regulatory retention
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
