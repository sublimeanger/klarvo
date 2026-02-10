import { Document, Page, Text, View, StyleSheet, Font, pdf } from "@react-pdf/renderer";

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff", fontWeight: 700 },
  ],
});

const s = StyleSheet.create({
  page: { padding: 50, paddingBottom: 70, fontFamily: "Inter", fontSize: 10, lineHeight: 1.5 },
  cover: { padding: 50, fontFamily: "Inter", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" },
  coverTitle: { fontSize: 32, fontWeight: 700, color: "#0d9373", marginBottom: 10, textAlign: "center" },
  coverSub: { fontSize: 18, fontWeight: 600, color: "#333", marginBottom: 20, textAlign: "center" },
  coverBadge: { fontSize: 14, fontWeight: 700, color: "#fff", backgroundColor: "#0d9373", padding: "8 16", borderRadius: 4, marginBottom: 40 },
  coverMeta: { fontSize: 11, color: "#666", textAlign: "center", marginTop: 8 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: "#0d9373" },
  headerText: { fontSize: 8, color: "#666" },
  footer: { position: "absolute", bottom: 30, left: 50, right: 50, flexDirection: "row", justifyContent: "space-between", fontSize: 8, color: "#999" },
  sectionTitle: { fontSize: 20, fontWeight: 700, color: "#0d9373", marginBottom: 15, marginTop: 10 },
  h2: { fontSize: 14, fontWeight: 700, color: "#333", marginBottom: 8, marginTop: 15 },
  h3: { fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 6, marginTop: 12 },
  p: { fontSize: 10, color: "#333", marginBottom: 8, lineHeight: 1.6 },
  bl: { marginLeft: 15, marginBottom: 10 },
  bi: { flexDirection: "row", marginBottom: 4 },
  bullet: { width: 15, fontSize: 10, color: "#0d9373" },
  bt: { flex: 1, fontSize: 10, color: "#333" },
  table: { marginTop: 10, marginBottom: 15, borderWidth: 1, borderColor: "#ddd" },
  th: { flexDirection: "row", backgroundColor: "#0d9373", padding: 8 },
  thc: { flex: 1, fontSize: 9, fontWeight: 700, color: "#fff" },
  tr: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee", padding: 6 },
  tra: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee", padding: 6, backgroundColor: "#f9f9f9" },
  tc: { flex: 1, fontSize: 9, color: "#333" },
  info: { backgroundColor: "#e6f7f3", padding: 12, marginVertical: 10, borderLeftWidth: 4, borderLeftColor: "#0d9373" },
  infoText: { fontSize: 10, color: "#0d9373", fontWeight: 600 },
  tocItem: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: "#eee" },
  tocSection: { fontSize: 12, fontWeight: 600 },
  tocPage: { fontSize: 11, color: "#666" },
});

const B = ({ items }: { items: string[] }) => (
  <View style={s.bl}>{items.map((t, i) => <View key={i} style={s.bi}><Text style={s.bullet}>•</Text><Text style={s.bt}>{t}</Text></View>)}</View>
);
const TR = ({ cells, isHeader, isAlt }: { cells: string[]; isHeader?: boolean; isAlt?: boolean }) => (
  <View style={isHeader ? s.th : isAlt ? s.tra : s.tr}>{cells.map((c, i) => <Text key={i} style={isHeader ? s.thc : s.tc}>{c}</Text>)}</View>
);
const Header = ({ date }: { date: string }) => (
  <><View style={s.header}><Text style={s.headerText}>Klarvo — Feature & Function Reference</Text><Text style={s.headerText}>Internal Document</Text></View><View style={s.footer}><Text>Klarvo — Confidential</Text><Text>{date}</Text></View></>
);

interface Props { generatedDate: string }

export function PlatformFeatureDocPDF({ generatedDate }: Props) {
  return (
    <Document>
      {/* Cover */}
      <Page size="A4" style={s.cover}>
        <Text style={s.coverTitle}>Klarvo</Text>
        <Text style={s.coverSub}>EU AI Act Compliance Hub for SMEs</Text>
        <Text style={s.coverBadge}>Complete Feature & Function Reference</Text>
        <Text style={{ fontSize: 14, color: "#666", marginBottom: 60, textAlign: "center" }}>For Testing Protocol Development</Text>
        <View style={{ borderTopWidth: 2, borderTopColor: "#0d9373", width: 100, marginBottom: 40 }} />
        <Text style={s.coverMeta}>Generated: {generatedDate}</Text>
        <Text style={s.coverMeta}>Classification: Internal Document</Text>
        <Text style={s.coverMeta}>24 Sections + 3 Appendices</Text>
      </Page>

      {/* Table of Contents */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>Table of Contents</Text>
        {[
          ["1. Platform Overview", "3"], ["2. Authentication & Onboarding", "4-5"], ["3. Dashboard", "6-7"],
          ["4. AI System Inventory", "8-12"], ["5. Classification Engine", "13-14"], ["6. FRIA Workflow", "15"],
          ["7. Controls & Obligations", "16-17"], ["8. Evidence Vault", "18-19"], ["9. Vendors & Supply Chain", "20"],
          ["10. Policies & Templates", "21"], ["11. Training & AI Literacy", "22"], ["12. Tasks", "23"],
          ["13. Incidents & Monitoring", "24"], ["14. Disclosures (Article 50)", "25"], ["15. Exports", "26-27"],
          ["16. AI Engine (5 Features)", "28-29"], ["17. Provider Track (Add-on)", "30-31"],
          ["18. Importer & Distributor Tracks", "32"], ["19. Discovery (Shadow AI)", "33"],
          ["20. Billing & Subscriptions", "34"], ["21. Team & Collaboration", "35"], ["22. Settings", "36"],
          ["23. Marketing & Public Pages", "37"], ["24. Security & Compliance", "38"],
          ["Appendix A: Complete Route Map", "39-41"], ["Appendix B: Database Tables", "42-43"],
          ["Appendix C: Edge Functions", "44"],
        ].map(([sec, pg], i) => (
          <View key={i} style={s.tocItem}><Text style={s.tocSection}>{sec}</Text><Text style={s.tocPage}>{pg}</Text></View>
        ))}
      </Page>

      {/* Section 1: Platform Overview */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>1. Platform Overview</Text>
        <Text style={s.h2}>Product Description</Text>
        <Text style={s.p}>Klarvo is a SaaS platform that enables Small and Medium Enterprises (SMEs) to achieve and maintain compliance with the EU AI Act. The platform provides tools for inventorying AI systems, classifying risk levels, mapping regulatory obligations, collecting evidence, and generating audit-ready export packs through guided, jargon-free workflows.</Text>
        <Text style={s.h2}>Core Promise</Text>
        <Text style={s.p}>"Know every AI system you use, its EU AI Act risk level, what you must do next, and have an audit-ready evidence pack in 1 click."</Text>
        <Text style={s.h2}>Technology Stack</Text>
        <B items={["Frontend: React 18 + TypeScript + Tailwind CSS + shadcn/ui", "Backend: Lovable Cloud (database, auth, edge functions, storage)", "PDF Generation: @react-pdf/renderer + JSZip", "AI Engine: Gemini 2.5 Flash (via Lovable AI integration)", "Payment: Stripe (checkout, portal, webhooks)", "State Management: TanStack React Query"]} />
        <Text style={s.h2}>User Roles</Text>
        <View style={s.table}>
          <TR cells={["Role", "Permissions", "Use Case"]} isHeader />
          <TR cells={["Admin", "Full access (all features, billing, integrations)", "Founders, CTOs"]} />
          <TR cells={["Compliance Owner", "Everything except billing/integrations", "DPOs, compliance leads"]} isAlt />
          <TR cells={["System Owner", "Own AI systems only, upload evidence", "Product managers, team leads"]} />
          <TR cells={["Reviewer/Approver", "Approve assessments and evidence", "Legal, senior compliance"]} isAlt />
          <TR cells={["Viewer", "Read-only access", "Board members, auditors"]} />
        </View>
      </Page>

      {/* Section 2: Authentication & Onboarding */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>2. Authentication & Onboarding</Text>
        <Text style={s.h2}>Signup Flow</Text>
        <B items={["Email + password registration (minimum requirements enforced)", "Email confirmation required (redirect to /auth/callback)", "After confirmation: session established → check onboarding status", "If new user: redirect to /onboarding", "If returning user: redirect to /dashboard"]} />
        <Text style={s.h2}>Login Flow</Text>
        <B items={["Email + password authentication", "Magic link option (passwordless via email)", "Session persistence via Supabase auth tokens", "Protected routes redirect unauthenticated users to /auth/login"]} />
        <Text style={s.h2}>Password Reset</Text>
        <B items={["Forgot password page (/auth/forgot-password) sends reset email", "Reset password page (/auth/reset-password) accepts new password", "Email redirect to /auth/reset-password with token"]} />
        <Text style={s.h2}>OAuth Callback (/auth/callback)</Text>
        <B items={["Handles email confirmation tokens", "Handles magic link tokens", "Handles password reset tokens", "Routes to appropriate destination based on auth event type"]} />
        <Text style={s.h2}>Onboarding Wizard (/onboarding)</Text>
        <B items={["Organization name (required)", "Industry selection (dropdown)", "Company size (range selector)", "Country/region", "Creates organization record in database", "Creates user profile linked to organization", "Sets user role to Admin for first user", "Redirects to /dashboard on completion"]} />
        <Text style={s.h2}>Session Management</Text>
        <B items={["ProtectedRoute component wraps all authenticated routes", "AuthContext provides user/session state globally", "Auto-refresh of auth tokens", "Logout clears session and redirects to /"]} />
      </Page>

      {/* Section 3: Dashboard */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>3. Dashboard</Text>
        <Text style={s.h2}>Metric Cards</Text>
        <View style={s.table}>
          <TR cells={["Metric", "Source", "Display"]} isHeader />
          <TR cells={["Total AI Systems", "ai_systems table count", "Number card"]} />
          <TR cells={["High-Risk Count", "ai_system_classifications where risk_level = high_risk", "Number card (red)"]} isAlt />
          <TR cells={["Unclassified Systems", "Systems without classification record", "Number card (amber)"]} />
          <TR cells={["Evidence Completeness %", "Evidence files / required evidence ratio", "Percentage card"]} isAlt />
          <TR cells={["Training Completion %", "Completed / assigned training ratio", "Percentage card"]} />
        </View>
        <Text style={s.h2}>Audit Readiness Score</Text>
        <Text style={s.p}>Weighted composite score (0-100%) displayed as a circular progress indicator:</Text>
        <B items={["Classification completeness: 25% weight", "Controls implementation: 30% weight", "Evidence coverage: 25% weight", "Task completion: 10% weight", "Training completion: 10% weight"]} />
        <Text style={s.h2}>Charts & Visualizations</Text>
        <B items={["Risk Distribution Chart: Pie/donut chart showing systems by risk level", "Department Risk Heatmap: Grid showing risk levels per department", "Compliance Trend Chart: Line chart showing readiness score over time (30/60/90 days)"]} />
        <Text style={s.h2}>Compliance Alerts</Text>
        <B items={["Expiring vendor attestations (within 30 days)", "Overdue tasks (past due date)", "Controls needing review (quarterly cadence)", "Evidence expiring soon", "Classification reassessment triggers"]} />
        <Text style={s.h2}>Additional Widgets</Text>
        <B items={["Compliance Copilot Card: AI-powered digest summarizing current compliance posture with real system data", "Recommendations Panel: Prioritized next actions based on gap analysis", "EU AI Act Timeline: Key regulatory deadlines with countdown", "Role Escalation Alert: Monitors if deployer activities trigger provider obligations (Article 25)", "Substantial Modification Alert: Flags material changes requiring reassessment"]} />
      </Page>

      {/* Section 4: AI System Inventory */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>4. AI System Inventory</Text>
        <Text style={s.h2}>List View (/ai-systems)</Text>
        <B items={["Table/card view of all AI systems in organization", "Search by name, description, vendor", "Filter by: risk level, department, status, owner", "Sort by: name, created date, risk level, last updated", "Bulk actions: export selected, compare (up to 4)"]} />
        <Text style={s.h2}>Two Intake Wizard Modes</Text>
        <Text style={s.h3}>Quick Capture (4 steps, ~2-4 minutes)</Text>
        <B items={["Step 0: System name, owner, department, status", "Step 1: Basic description and type", "Step 2: Vendor selection (optional)", "Step 3: Initial scope (geography, customer-facing)", "Creates a Draft record with tasks to complete later"]} />
        <Text style={s.h3}>Full Assessment (20 steps, ~10-20 minutes)</Text>
        <Text style={s.p}>Complete regulatory assessment capturing granular data across 16+ categories. Each step is documented below with field names, types, and validation rules.</Text>
        <Text style={s.h2}>Step 0 — Mode Selection & Setup</Text>
        <View style={s.table}>
          <TR cells={["Field", "Type", "Required", "Notes"]} isHeader />
          <TR cells={["Wizard mode", "Single select", "Yes", "Quick Capture / Full Assessment"]} />
          <TR cells={["AI system name", "Short text", "Yes", "Max 200 chars"]} isAlt />
          <TR cells={["Internal reference ID", "Short text", "No", "Optional internal tracking"]} />
          <TR cells={["Primary owner", "Person select", "Yes", "From workspace users"]} isAlt />
          <TR cells={["Backup owner", "Person select", "No", "Recommended"]} />
          <TR cells={["Department / team", "Single select", "Yes", "Configurable list"]} isAlt />
          <TR cells={["Status", "Single select", "Yes", "Idea / Pilot / Live / Retired"]} />
        </View>
        <Text style={s.p}>Auto-actions: Creates AI System record (status=Draft), default tasks (complete classification, upload docs, assign oversight), sets review date = 90 days.</Text>
      </Page>

      {/* Section 4 continued: Wizard Steps 1-5 */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.h2}>Step 1 — Basics</Text>
        <B items={["System name and description (long text)", "System type: internal tool / customer-facing / embedded in product"]} />
        <Text style={s.h2}>Step 2 — Vendor Selection</Text>
        <B items={["Select existing vendor or add new vendor inline", "Vendor name, website, contract URL", "Foundation model used (e.g., GPT-4, Claude, Gemini)", "Triggers vendor due diligence tasks if vendor is selected"]} />
        <Text style={s.h2}>Step 3 — Ownership Assignment</Text>
        <B items={["Primary owner (person select, required)", "Backup owner (person select, recommended)", "Oversight owner (person select)", "Privacy owner / DPO (person select)"]} />
        <Text style={s.h2}>Step 4 — Scope (Geography & Impact)</Text>
        <View style={s.table}>
          <TR cells={["Field", "Type", "Required"]} isHeader />
          <TR cells={["Deployment regions", "Multi select (EU/UK/US/Other)", "Yes"]} />
          <TR cells={["EU countries", "Multi select (27 countries)", "If EU selected"]} isAlt />
          <TR cells={["Internal user groups", "Multi select", "Yes"]} />
          <TR cells={["Affected groups", "Multi select", "Yes"]} isAlt />
          <TR cells={["Customer-facing?", "Yes/No", "Yes"]} />
          <TR cells={["Workplace impact?", "Yes/No", "Yes"]} isAlt />
          <TR cells={["Legal/significant effects?", "Yes/No", "Yes"]} />
          <TR cells={["One-sentence summary", "Long text", "Yes"]} isAlt />
        </View>
        <Text style={s.h2}>Step 5 — Value Chain Role</Text>
        <View style={s.table}>
          <TR cells={["Field", "Type", "Required"]} isHeader />
          <TR cells={["Built internally?", "Single select (Fully/Partially/Not by us)", "Yes"]} />
          <TR cells={["Acquisition method", "Multi select (SaaS/API/Open-source/Contractor)", "Yes"]} isAlt />
          <TR cells={["Value chain role", "Multi select (Deployer/Provider/Importer/Distributor/Unsure)", "Yes"]} />
          <TR cells={["Externally offered?", "Yes/No", "If Provider"]} isAlt />
          <TR cells={["Vendor name(s)", "Multi select from Vendors", "If not fully in-house"]} />
          <TR cells={["Foundation model", "Short text", "No"]} isAlt />
          <TR cells={["Contract/terms link", "URL or file upload", "If vendor"]} />
        </View>
      </Page>

      {/* Section 4 continued: Wizard Steps 6-8 */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.h2}>Step 6 — AI System Definition Test</Text>
        <Text style={s.p}>Determines whether the system qualifies as an "AI system" under the EU AI Act definition, referencing Commission guidelines.</Text>
        <View style={s.table}>
          <TR cells={["Field", "Type", "Required"]} isHeader />
          <TR cells={["Infers outputs from inputs?", "Yes/No/Unsure", "Yes"]} />
          <TR cells={["Output types", "Multi select (Predictions/Recommendations/Decisions/etc.)", "Yes"]} isAlt />
          <TR cells={["Operates with autonomy?", "Yes/No/Unsure", "Yes"]} />
          <TR cells={["Adapts after deployment?", "Yes/No/Unknown", "Yes"]} isAlt />
          <TR cells={["Technical approach", "Multi select (ML/DL/LLM/Statistical/Rules/Optimization)", "Yes"]} />
          <TR cells={["AI system conclusion", "Single select (Likely AI / Likely not / Needs review)", "Yes"]} isAlt />
          <TR cells={["Rationale", "Long text", "Yes"]} />
          <TR cells={["Reviewer", "Person select", "Yes"]} isAlt />
          <TR cells={["Confidence level", "High/Medium/Low", "Yes"]} />
        </View>
        <Text style={s.p}>Auto-actions: If "Likely not" → set scope = Out of Scope, generate short memo. If "Needs review" → create compliance review task.</Text>

        <Text style={s.h2}>Step 7 — Use Case & Functionality</Text>
        <View style={s.table}>
          <TR cells={["Field", "Type", "Required"]} isHeader />
          <TR cells={["Purpose category", "Single select (HR/Finance/Support/Marketing/Security/Ops/Product/Other)", "Yes"]} />
          <TR cells={["Workflow description", "Long text", "Yes"]} isAlt />
          <TR cells={["Output action type", "Single select (Recommend/Decide/Automate/Generate/Other)", "Yes"]} />
          <TR cells={["Output destinations", "Multi select (Dashboard/Customer UI/Email/API/Reports/Other)", "Yes"]} isAlt />
          <TR cells={["Human involvement", "Single select (HITL/HOTL/HOOTL)", "Yes"]} />
          <TR cells={["Override capability", "Long text", "If human involvement"]} isAlt />
          <TR cells={["Usage frequency", "Single select (Continuous/Daily/Weekly/Monthly/Ad hoc)", "Yes"]} />
          <TR cells={["Impact scale", "Number + unit (people/month)", "Recommended"]} isAlt />
        </View>

        <Text style={s.h2}>Step 8 — Prohibited Practices Screening (Article 5)</Text>
        <Text style={s.p}>8 mandatory questions screening for prohibited AI practices. Any "Yes" or "Unsure" triggers escalation.</Text>
        <B items={["Subliminal manipulation causing significant harm?", "Exploitation of vulnerabilities (age, disability, socio-economic)?", "Social scoring for unrelated context decisions?", "Criminal profiling based solely on personality traits?", "Untargeted facial recognition database building?", "Emotion inference in workplace/education?", "Biometric categorisation revealing sensitive characteristics?", "Real-time remote biometric ID in public spaces?"]} />
        <Text style={s.p}>All fields: Yes/No/Unsure (required). If any Yes/Unsure → context field (long text, required) + conclusion: No indicators / Potential prohibited / Needs legal review.</Text>
        <Text style={s.p}>Auto-actions: If "Potential prohibited" → lock classification to Blocked, create "Legal review" task.</Text>
      </Page>

      {/* Section 4 continued: Wizard Steps 9-12 */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.h2}>Step 9 — High-Risk Screening (Annex III)</Text>
        <Text style={s.p}>9 category questions determining if the system is a high-risk candidate:</Text>
        <B items={["Biometric identification/categorisation?", "Critical infrastructure / safety (energy, transport, utilities)?", "Education / vocational training (admissions, scoring, proctoring)?", "Employment / worker management (recruiting, performance, monitoring)?", "Essential services (credit, insurance, housing, healthcare, benefits)?", "Law enforcement / public security?", "Migration / asylum / border control?", "Justice / democratic processes?", "Safety component of regulated product (medical device, vehicle, machinery)?"]} />
        <Text style={s.p}>All fields: Yes/No/Unsure (required). Result: Not high-risk / Potential high-risk (Annex III) / Potential high-risk (regulated product) / Needs review. Notes field required.</Text>
        <Text style={s.p}>Auto-actions: If "Potential high-risk" → trigger High-risk Deployer Checklist (Article 26 duties).</Text>

        <Text style={s.h2}>Step 10 — Transparency Obligations (Article 50)</Text>
        <View style={s.table}>
          <TR cells={["Field", "Type", "Required"]} isHeader />
          <TR cells={["Direct interaction with persons?", "Yes/No", "Yes"]} />
          <TR cells={["Obvious it's AI?", "Yes/No/Unsure", "If interaction"]} isAlt />
          <TR cells={["Generates synthetic content?", "Yes/No", "Yes"]} />
          <TR cells={["Outputs marked as AI-generated?", "Yes/No/Unknown", "If synthetic"]} isAlt />
          <TR cells={["Emotion recognition / biometric?", "Yes/No", "Yes"]} />
          <TR cells={["Exposed persons informed?", "Yes/No/Planned", "If emotion rec."]} isAlt />
          <TR cells={["Deepfake generation?", "Yes/No", "Yes"]} />
          <TR cells={["Deepfake disclosed?", "Yes/No/Planned", "If deepfake"]} isAlt />
          <TR cells={["AI-generated public interest text?", "Yes/No", "Yes"]} />
          <TR cells={["Editorial control exists?", "Yes/No/Planned", "If public text"]} isAlt />
          <TR cells={["Transparency status", "Not applicable / Implemented / Gaps exist", "Yes"]} />
        </View>

        <Text style={s.h2}>Step 11 — Data & Privacy</Text>
        <View style={s.table}>
          <TR cells={["Field", "Type", "Required"]} isHeader />
          <TR cells={["Processes personal data?", "Yes/No/Unknown", "Yes"]} />
          <TR cells={["Special category data?", "Yes/No/Unknown", "Yes"]} isAlt />
          <TR cells={["Involves minors?", "Yes/No/Unknown", "Yes"]} />
          <TR cells={["Data sources", "Multi select (User/Internal/Third-party/Public web/Other)", "Yes"]} isAlt />
          <TR cells={["Data under deployer control?", "Yes/No/Partly", "Yes"]} />
          <TR cells={["Input retention period", "Single select + custom (30/90/180/365 days)", "Recommended"]} isAlt />
          <TR cells={["Output retention period", "Single select + custom", "Recommended"]} />
          <TR cells={["DPIA status", "Not needed / Planned / Completed / Unknown", "Yes"]} isAlt />
          <TR cells={["DPIA link/upload", "URL/File", "If completed"]} />
          <TR cells={["Privacy owner", "Person select", "If personal data"]} isAlt />
        </View>

        <Text style={s.h2}>Step 12 — Human Oversight & Operating Model</Text>
        <B items={["Oversight model: HITL (human-in-the-loop) / HOTL (human-on-the-loop) / HOOTL (human-out-of-the-loop)", "Oversight owner (person select, required)", "Authority to pause/stop (Yes/No, required)", "Competence requirements (long text, required)", "Operators trained? (Yes/Partially/No, required)", "Oversight SOP status (Exists/Draft/Not started, required) + file upload", "Monitoring plan status (Exists/Draft/Not started, required)", "Monitoring metrics: Multi select (Accuracy/Drift/Bias/Complaints/Edge cases/Security/Other)"]} />
      </Page>

      {/* Section 4 continued: Wizard Steps 13-20 */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.h2}>Step 13 — Logging & Record-Keeping</Text>
        <B items={["Automatic logs generated? (Yes/No/Unknown)", "Log storage location (Vendor system/Internal DB/SIEM/Unknown)", "Log access roles (Multi select)", "Log retention period (Single select + custom)", "Can export logs on demand? (Yes/No/Unknown)", "For high-risk: confirm ≥ 6 months retention (Yes/No/Planned)"]} />

        <Text style={s.h2}>Step 14 — Incidents & Response</Text>
        <B items={["Incident response process exists? (Yes/Partially/No)", "Severity levels defined? (Yes/No)", "Internal notification list (Multi select)", "External notification requirements (Long text)", "Can suspend/turn off quickly? (Yes immediately/Yes but slow/No/Unknown)"]} />

        <Text style={s.h2}>Step 15 — Workplace Obligations</Text>
        <B items={["Used in workplace context? (Yes/No)", "If yes + high-risk candidate: Worker notification prepared? (Implemented/Planned/Not started)", "Upload worker notice (File upload, if implemented)"]} />

        <Text style={s.h2}>Step 16 — Public Authority / Registration</Text>
        <B items={["Is organization a public authority? (Yes/No)", "Provides public service (private entity)? (Yes/No)", "If yes + high-risk: Registration status (Registered/Not registered/Vendor responsible/Unknown)", "Upload registration evidence (File/URL, if registered)"]} />

        <Text style={s.h2}>Step 17 — Training & AI Literacy</Text>
        <B items={["Staff roles operating this system (Multi select)", "AI literacy training exists? (Yes/Partially/No)", "Training completion status (≥90%/50-89%/<50%/Unknown)", "Upload training material + completion report (File upload)"]} />

        <Text style={s.h2}>Step 18 — FRIA Trigger Check</Text>
        <B items={["Auto-reads high-risk candidate status from Step 9", "Auto-suggests FRIA requirement based on Steps 9 + 16", "User confirms FRIA requirement (Yes/No)", "FRIA status: Not required / Required-planned / In progress / Completed", "Button to launch FRIA Wizard if required"]} />

        <Text style={s.h2}>Step 19 — Sign-off & Classification</Text>
        <B items={["Final classification (pre-filled from screening): Prohibited/Blocked, High-risk candidate, Limited risk, Minimal risk, Needs review", "Reviewer sign-off (Person select, required)", "Sign-off date (Date, required)", "Notes (Long text, optional)"]} />
        <Text style={s.p}>Auto-generated outputs: Classification Memo PDF, Gap Checklist, Task Plan (owners + due dates), Evidence Requests.</Text>

        <Text style={s.h2}>Step 20 — Done</Text>
        <B items={["Summary of created tasks", "Export eligibility display (Tier 1: Classification Memo, Tier 2: Evidence Pack, Tier 3: Full Compliance)", "Links to: AI system detail page, classification wizard, evidence vault", "Wizard completion timestamp recorded"]} />

        <Text style={s.h2}>Additional Inventory Features</Text>
        <B items={["Wizard draft auto-save (progress saved on each step)", "Natural language AI intake mode (describe system → wizard pre-filled)", "Duplicate system functionality (copy existing system as template)", "AI system comparison (up to 4 systems side-by-side)", "System versioning (version history with labels and conformity notes)"]} />
      </Page>

      {/* Section 5: Classification Engine */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>5. Classification Engine</Text>
        <Text style={s.h2}>4-Step Classification Wizard (/classification-wizard/:id)</Text>
        <View style={s.table}>
          <TR cells={["Step", "Purpose", "Output"]} isHeader />
          <TR cells={["1. AI Definition Test", "Is this an AI system?", "In-scope / Out-of-scope / Needs review"]} />
          <TR cells={["2. Prohibited Screening", "Article 5 violations", "No indicators / Potential prohibited / Legal review"]} isAlt />
          <TR cells={["3. High-Risk Screening", "Annex III categories", "Not high-risk / High-risk candidate / Needs review"]} />
          <TR cells={["4. Final Classification", "Risk level determination", "Risk level + rationale + confidence"]} isAlt />
        </View>
        <Text style={s.h2}>Risk Levels</Text>
        <View style={s.table}>
          <TR cells={["Level", "Badge Color", "Implications"]} isHeader />
          <TR cells={["Prohibited / Blocked", "Black", "Cannot deploy, legal review required"]} />
          <TR cells={["High-Risk Candidate", "Red", "Full Article 26 obligations, FRIA check"]} isAlt />
          <TR cells={["Limited Risk (Transparency)", "Amber", "Article 50 disclosure obligations"]} />
          <TR cells={["Minimal Risk", "Green", "Voluntary codes only"]} isAlt />
          <TR cells={["Not Classified", "Gray", "Pending classification"]} />
        </View>
        <Text style={s.h2}>Classification History</Text>
        <B items={["Append-only classification_history table", "Version number auto-incremented", "Stores: risk_level, rationale, classified_by, classified_at, ai_assisted, ai_model_version, ai_suggestion", "is_current flag marks active classification", "change_reason required for reclassifications", "ruleset_version tracked for audit"]} />
        <Text style={s.h2}>AI-Assisted Classification</Text>
        <B items={["Classification Assistant provides confidence scoring (High/Medium/Low)", "References specific EU AI Act articles in suggestions", "AI suggestion stored alongside human decision", "Human override with mandatory override_reason field", "AI model version recorded for traceability"]} />
        <Text style={s.h2}>Reassessment Triggers</Text>
        <B items={["Model change (foundation model updated)", "Vendor change (new provider)", "New use case (expanded scope)", "Material change to AI system behavior", "Regulatory update (new guidance published)", "Triggered via ReassessmentAlert component on AI system detail page"]} />
        <Text style={s.h2}>Classification Memo PDF Export</Text>
        <Text style={s.p}>One-page PDF including: system identity, all screening inputs and results, final classification with rationale, confidence level, reviewer name and date, next steps list.</Text>
      </Page>

      {/* Section 6: FRIA Workflow */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>6. FRIA Workflow (Article 27)</Text>
        <Text style={s.p}>Fundamental Rights Impact Assessment — required for certain deployers of high-risk AI systems. 7-step guided workflow with PDF report export.</Text>
        <View style={s.table}>
          <TR cells={["Step", "Content", "Key Fields"]} isHeader />
          <TR cells={["A. Overview", "Scope and context", "Title, linked AI system, assessment owner, deployment date, DPIA leverage"]} />
          <TR cells={["B. Process", "How AI is used", "Process description, intended purpose, decision points, human oversight"]} isAlt />
          <TR cells={["C. Time/Frequency", "Duration and scale", "Deployment duration, frequency, people affected per month"]} />
          <TR cells={["D. Affected Persons", "Who is impacted", "Person categories, vulnerable groups, notification method, accessibility"]} isAlt />
          <TR cells={["E. Risks of Harm", "Fundamental rights analysis", "Harm categories (7), risk rating, likelihood, severity per category"]} />
          <TR cells={["F. Oversight Measures", "How risks are managed", "Oversight design, competence, authority to intervene"]} isAlt />
          <TR cells={["G. Mitigation", "Controls and governance", "Risk mitigations, governance arrangements, complaint mechanism, monitoring"]} />
          <TR cells={["H. Approval", "Sign-off", "Conclusion (Approve/Approve with mitigations/Do not deploy), approvers, notification status"]} isAlt />
        </View>
        <Text style={s.h2}>FRIA Harm Categories</Text>
        <B items={["Non-discrimination / fairness", "Privacy & data protection", "Freedom of expression / information integrity", "Worker rights (if workplace)", "Due process / contestability", "Access to essential services", "Safety / wellbeing"]} />
        <Text style={s.h2}>Tier Gating</Text>
        <B items={["Growth plan: Basic FRIA (simplified workflow)", "Pro plan: Advanced FRIA (full Article 27 compliance, all fields)", "Free/Starter: FRIA not available"]} />
      </Page>

      {/* Section 7: Controls & Obligations */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>7. Controls & Obligations</Text>
        <Text style={s.h2}>Control Library (50+ Controls)</Text>
        <Text style={s.p}>Controls are organized into 11 categories. Each control has: ID, name, description, applies-to rules, owner role, evidence requirements, and review frequency.</Text>
        <View style={s.table}>
          <TR cells={["Category", "Code", "Count", "Scope"]} isHeader />
          <TR cells={["Governance & Accountability", "GOV", "8", "All systems"]} />
          <TR cells={["Classification & Scoping", "CLS", "5", "All systems"]} isAlt />
          <TR cells={["Prohibited Practices", "PROH", "6", "All systems"]} />
          <TR cells={["Transparency & Disclosure", "TRN", "7", "Transparency triggers"]} isAlt />
          <TR cells={["High-Risk Deployer", "DEP", "11", "High-risk candidates"]} />
          <TR cells={["Record-Keeping", "LOG", "4", "High-risk candidates"]} isAlt />
          <TR cells={["Data Governance", "DATA", "8", "Personal data systems"]} />
          <TR cells={["Vendor & Supply Chain", "VEN", "8", "Vendor-based systems"]} isAlt />
          <TR cells={["Security & Robustness", "SEC", "6", "All systems"]} />
          <TR cells={["AI Literacy & Training", "LIT", "3", "Organization-level"]} isAlt />
          <TR cells={["Monitoring & Incidents", "MON", "6", "All, especially high-impact"]} />
        </View>
        <Text style={s.h2}>Auto-Attachment Logic</Text>
        <B items={["On classification result, controls are automatically attached based on risk level and role", "High-risk candidate → DEP-*, LOG-*, MON-* controls attached", "Transparency triggers → TRN-* controls attached", "All systems → GOV basics, CLS, PROH screening, SEC basics, LIT basics"]} />
        <Text style={s.h2}>Control Status Tracking</Text>
        <View style={s.table}>
          <TR cells={["Status", "Meaning", "Action"]} isHeader />
          <TR cells={["Not Started", "Control not yet addressed", "Shows in gap checklist"]} />
          <TR cells={["In Progress", "Work underway", "Owner assigned, due date set"]} isAlt />
          <TR cells={["Implemented", "Control is in place", "Evidence required"]} />
          <TR cells={["Not Applicable", "Control doesn't apply", "Justification + reviewer sign-off required"]} isAlt />
        </View>
        <Text style={s.h2}>N/A Justification</Text>
        <Text style={s.p}>When marking a control as "Not Applicable", a justification dialog requires: reason text (required), reviewer selection, and reviewer approval. Stored for audit trail.</Text>
        <Text style={s.h2}>Gap Checklist</Text>
        <Text style={s.p}>Auto-generated per AI system showing: controls not yet implemented, evidence not yet uploaded, tasks not yet completed. Used to drive the "Audit Readiness Score".</Text>
      </Page>

      {/* Section 8: Evidence Vault */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>8. Evidence Vault</Text>
        <Text style={s.h2}>File Upload & Metadata</Text>
        <View style={s.table}>
          <TR cells={["Field", "Type", "Notes"]} isHeader />
          <TR cells={["File", "Upload (any type)", "Stored in Supabase Storage"]} />
          <TR cells={["Uploaded by", "Auto (current user)", "Read-only"]} isAlt />
          <TR cells={["Upload date", "Auto (timestamp)", "Read-only"]} />
          <TR cells={["Status", "Draft / Approved", "Default: Draft"]} isAlt />
          <TR cells={["Confidentiality", "Internal / Shareable with auditor", "Default: Internal"]} />
          <TR cells={["Tags", "Multi-tag input", "Free-form tags"]} isAlt />
          <TR cells={["Expiry date", "Date (optional)", "Triggers renewal reminder"]} />
          <TR cells={["Linked to", "AI system / Control / Task / Policy", "Multiple links supported"]} isAlt />
        </View>
        <Text style={s.h2}>Approval Workflow</Text>
        <B items={["Evidence uploaded as Draft by default", "Reviewer/Approver can approve evidence", "Approval history tracked: who approved, when, any notes", "Approved evidence contributes to Audit Readiness Score"]} />
        <Text style={s.h2}>Evidence Requests</Text>
        <B items={["Request specific evidence from a teammate", "Request includes: what's needed, linked control/system, due date", "Requestee receives notification", "Completed when evidence is uploaded and linked"]} />
        <Text style={s.h2}>Document Intelligence (AI-Powered)</Text>
        <B items={["Automated clause extraction from uploaded documents", "Identifies relevant compliance clauses in vendor contracts", "Extracts key terms: data processing, liability, AI-specific provisions", "Results displayed in DocumentIntelligencePanel", "Requires AI features to be enabled in settings"]} />
      </Page>

      {/* Section 9-10: Vendors & Policies */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>9. Vendors & Supply Chain</Text>
        <Text style={s.h2}>Vendor Registry</Text>
        <B items={["Vendor list page (/vendors) with search and filtering", "Vendor detail page (/vendors/:id) with full profile", "Fields: name, website, description, contact info, contract dates, risk rating", "Linked AI systems shown on vendor detail page"]} />
        <Text style={s.h2}>Vendor Attestations</Text>
        <B items={["Security documentation (SOC2, ISO 27001, penetration tests)", "AI Act compliance statements", "Model cards and technical documentation", "Data Processing Agreements (DPA)", "Attestation status tracking with expiry dates", "Expiring attestations trigger compliance alerts on dashboard"]} />
        <Text style={s.h2}>Due Diligence & Change Triggers</Text>
        <B items={["Vendor due diligence checklist (auto-created when vendor added)", "Contract renewal date tracking with reminders", "Vendor changes trigger AI system reassessment", "VEN-01 through VEN-08 controls auto-attached for vendor-based systems"]} />

        <Text style={s.sectionTitle}>10. Policies & Templates</Text>
        <Text style={s.h2}>Pre-Built Policy Templates (8+)</Text>
        <B items={["AI Acceptable Use Policy", "AI Governance Charter", "Human Oversight Plan", "Transparency Notice Pack (web/app copy variants)", "Vendor Due Diligence Questionnaire", "AI Incident Response Playbook", "AI System Register Export", "FRIA Template"]} />
        <Text style={s.h2}>Template Features</Text>
        <B items={["Adopt template → creates editable copy in your organization", "In-app rich text editing", "Version control: each save creates a new version with diff view", "Rollback to any previous version", "Approval workflow: Draft → Review → Approved", "Template source tracking for audit (which template was used as basis)", "Two tone options: 'Startup-simple' vs 'Procurement-ready'"]} />
      </Page>

      {/* Section 11-14: Training, Tasks, Incidents, Disclosures */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>11. Training & AI Literacy (Article 4)</Text>
        <B items={["Training campaign management by role (All staff / AI operators / Reviewers / Managers)", "Course creation: upload PDF, add video link, optional quiz", "Assignment to individual users or role-based groups", "Completion tracking with per-user status", "Automatic reminders for incomplete training", "Annual re-certification automation", "Policy acknowledgement tracking (separate from training)", "Training completion report export (PDF)"]} />

        <Text style={s.sectionTitle}>12. Tasks</Text>
        <B items={["Auto-generated tasks from wizard completion (complete classification, upload docs, assign oversight)", "Manual task creation with title, description, owner, due date", "Status workflow: To Do → In Progress → Done", "Linked to: AI system, control, evidence request", "Filtering by: status, owner, AI system, due date", "Overdue task alerts on dashboard", "Task counts contribute to Audit Readiness Score (10% weight)"]} />

        <Text style={s.sectionTitle}>13. Incidents & Monitoring</Text>
        <Text style={s.h2}>Incident Register</Text>
        <B items={["What happened (description)", "Severity level (Critical / High / Medium / Low)", "Impacted groups (who was affected)", "Containment actions taken", "Internal notification log", "External notification requirements", "Postmortem / root cause analysis", "Attachments (evidence, screenshots, logs)"]} />
        <Text style={s.h2}>Monitoring Events</Text>
        <B items={["Performance drift noted", "Complaint received", "Bias concern flagged", "Security event detected", "Manual log entries"]} />
        <Text style={s.h2}>Change Management Triggers</Text>
        <B items={["Material change to AI system → reclassification prompt", "Model update → FRIA review prompt (if applicable)", "Vendor change → reassessment + new evidence requests"]} />

        <Text style={s.sectionTitle}>14. Disclosures (Article 50)</Text>
        <B items={["Disclosure Snippet Library with pre-built text notices", "Categories: AI interaction disclosure, synthetic content marking, deepfake disclosure", "Copy-to-clipboard functionality for each snippet", "Evidence capture workflow: take screenshot → auto-upload to evidence vault", "Linked to TRN-* transparency controls", "Accessibility guidance for disclosure placement"]} />
      </Page>

      {/* Section 15: Exports */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>15. Exports</Text>
        <Text style={s.h2}>Export Types</Text>
        <View style={s.table}>
          <TR cells={["Export", "Format", "Content"]} isHeader />
          <TR cells={["AI System Evidence Pack", "PDF + ZIP", "Full compliance package per system"]} />
          <TR cells={["Classification Memo", "PDF", "One-page classification decision record"]} isAlt />
          <TR cells={["FRIA Report", "PDF", "Full Article 27 assessment"]} />
          <TR cells={["Organisation Governance Pack", "PDF", "Org-wide AI governance summary"]} isAlt />
          <TR cells={["Board Summary Pack", "PDF", "Executive-friendly 1-3 page summary"]} />
          <TR cells={["Auditor Pack", "PDF", "Audit-ready documentation bundle"]} isAlt />
          <TR cells={["Customer Trust Pack", "PDF", "Customer-facing AI responsibility summary"]} />
          <TR cells={["Procurement Pack", "PDF", "Vendor assessment documentation"]} isAlt />
          <TR cells={["Annex IV Tech Docs", "PDF", "Provider technical documentation"]} />
          <TR cells={["CE Marking Pack", "PDF", "CE marking verification"]} isAlt />
          <TR cells={["EU Declaration", "PDF", "EU Declaration of Conformity"]} />
          <TR cells={["Importer Verification", "PDF", "Article 23 checklist"]} isAlt />
          <TR cells={["Distributor Verification", "PDF", "Article 24-25 checklist"]} />
          <TR cells={["Comparison Report", "PDF", "Side-by-side system comparison"]} isAlt />
          <TR cells={["System Specification", "PDF", "Complete system spec document"]} />
        </View>
        <Text style={s.h2}>Export Features</Text>
        <B items={["Export history tracking (who exported what, when)", "Regulatory Basis Banner on all exports (cites specific EU AI Act articles)", "Free tier: watermarked 'SAMPLE REPORT' at 0.15 opacity", "Paid tiers: 'Powered by Klarvo' footer", "All exports use Klarvo Emerald (#0d9373) branding", "Professional cover pages with high-resolution logo", "Running headers and footers on all pages", "Evidence Index with traceable IDs (EV-001, EV-002...)"]} />
        <Text style={s.h2}>Evidence Pack ZIP Structure</Text>
        <B items={["/00_Executive/ — Executive summary PDF", "/01_Inventory/ — AI system inventory record", "/02_Classification/ — Definition test, prohibited screening, risk classification memo", "/03_Transparency_Article50/ — Disclosure evidence by category", "/04_HighRisk_Deployer_Article26/ — Instructions, oversight, monitoring, incidents, logs, workplace notice", "/05_Logging_Article12/ — Logging capability documentation", "/06_Data_Privacy/ — Data flow, DPIA, retention policies", "/07_Training_AI_Literacy/ — Training materials and completion reports", "/08_Vendor/ — Vendor profile, contract, security docs", "/09_Evidence_Index/ — CSV and PDF evidence index"]} />
      </Page>

      {/* Section 16: AI Engine */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>16. AI Engine (5 Features)</Text>
        <Text style={s.p}>All AI features use Gemini 2.5 Flash via Lovable AI integration (no external API key required). Each feature can be individually toggled in AI Privacy Settings.</Text>
        <View style={s.table}>
          <TR cells={["Feature", "Trigger", "Output"]} isHeader />
          <TR cells={["AI Chat Assistant", "Chat icon in app sidebar", "Context-aware compliance Q&A responses"]} />
          <TR cells={["Natural Language Intake", "'Describe your system' textarea in wizard", "Pre-filled wizard fields from plain text description"]} isAlt />
          <TR cells={["Classification Assistant", "Button during classification wizard", "Confidence score + article references + suggested risk level"]} />
          <TR cells={["Document Intelligence", "Upload evidence file + click 'Analyze'", "Extracted compliance clauses + key terms"]} isAlt />
          <TR cells={["Compliance Copilot", "Dashboard widget (auto-refresh)", "Proactive digest with real system data + recommendations"]} />
        </View>
        <Text style={s.h2}>AI Chat Assistant</Text>
        <B items={["Floating chat panel accessible from any authenticated page", "Context-aware: knows user's AI systems, classifications, and controls", "Answers EU AI Act compliance questions with article references", "Can suggest next actions based on current compliance state", "Conversation history maintained per session"]} />
        <Text style={s.h2}>Natural Language System Intake</Text>
        <B items={["User describes AI system in plain text (e.g., 'We use an AI chatbot for customer support')", "AI extracts: system name, purpose, affected groups, risk indicators", "Pre-fills wizard fields, user reviews and confirms", "Edge function: ai-system-intake"]} />
        <Text style={s.h2}>Classification Assistant</Text>
        <B items={["Analyzes system data and provides classification suggestion", "Confidence scoring: High / Medium / Low", "References specific EU AI Act articles in reasoning", "Human override always required (AI suggestion is advisory only)", "Edge function: classification-assistant"]} />
        <Text style={s.h2}>AI Privacy Settings</Text>
        <B items={["Master toggle: enable/disable all AI features", "Per-feature toggles: individually control each of 5 features", "Data sharing mode: Minimal / Standard / Full", "Settings stored per-organization", "Changes take effect immediately"]} />
      </Page>

      {/* Section 17: Provider Track */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>17. Provider Track (Market Access Add-on)</Text>
        <Text style={s.p}>The Provider Track is a paid add-on for organizations that develop/provide AI systems (not just deploy them). It covers Articles 9-11 and 17-49 obligations.</Text>
        <Text style={s.h2}>Provider Dashboard</Text>
        <B items={["Weighted Provider Readiness Score across 8 compliance areas", "Quick action buttons for common provider tasks", "Status indicators for each compliance requirement"]} />
        <Text style={s.h2}>Provider Modules</Text>
        <View style={s.table}>
          <TR cells={["Module", "EU AI Act Reference", "Purpose"]} isHeader />
          <TR cells={["Technical Documentation", "Annex IV", "Build and maintain technical docs"]} />
          <TR cells={["Risk Management", "Article 9", "Risk identification and mitigation"]} isAlt />
          <TR cells={["Quality Management System", "Article 17", "QMS documentation library"]} />
          <TR cells={["Conformity Assessment", "Article 43", "Self-assessment or third-party process"]} isAlt />
          <TR cells={["EU Declaration", "Article 47", "Declaration of Conformity"]} />
          <TR cells={["CE Marking", "Article 48", "CE marking checklist and evidence"]} isAlt />
          <TR cells={["EU Database Registration", "Article 49/71", "Registration data bundle"]} />
          <TR cells={["Post-Market Monitoring", "Article 72", "Ongoing monitoring plan"]} isAlt />
          <TR cells={["Serious Incident Reporting", "Article 73", "Incident form and notification"]} />
          <TR cells={["Data Governance", "Article 10", "Dataset registry and quality"]} isAlt />
        </View>
        <Text style={s.h2}>Special Features</Text>
        <B items={["Role Escalation Monitoring (Article 25): Detects when deployer modifications make them a provider", "Substantial Modification Tracking: Flags material changes with full audit history", "Modification History Panel: Chronological record of all significant changes"]} />
      </Page>

      {/* Section 18-19: Importer/Distributor + Discovery */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>18. Importer & Distributor Tracks</Text>
        <Text style={s.h2}>Importer Verification (Article 23)</Text>
        <B items={["Verification checklist: CE marking confirmed, Declaration of Conformity obtained, Provider contact established", "Evidence collection for each verification step", "Importer Verification Pack PDF export", "Available as paid add-on"]} />
        <Text style={s.h2}>Distributor Verification (Articles 24-25)</Text>
        <B items={["Verification checklist: CE marking visible, Declaration accessible, Provider/Importer in compliance", "Storage and transport compliance checks", "Distributor Verification Pack PDF export", "Role escalation monitoring (when distributor modifications trigger provider obligations)"]} />

        <Text style={s.sectionTitle}>19. Discovery (Shadow AI)</Text>
        <Text style={s.h2}>Workspace Connection</Text>
        <B items={["OAuth connection to Google Workspace or Microsoft 365", "Encrypted token storage (AES-256-GCM)", "Edge functions: workspace-oauth-init, workspace-oauth-callback"]} />
        <Text style={s.h2}>Automated Detection</Text>
        <B items={["Scans connected workspace for AI tool usage patterns", "Matches against ai_tool_patterns table (known AI tools)", "Creates draft AI system records for discovered tools", "Discovery statistics dashboard showing found vs. inventoried tools", "Edge functions: discovery-scan, scheduled-discovery-scan"]} />

        <Text style={s.sectionTitle}>20. Billing & Subscriptions</Text>
        <View style={s.table}>
          <TR cells={["Tier", "Price (EUR/mo)", "AI Systems", "Key Features"]} isHeader />
          <TR cells={["Free", "€0", "2", "Inventory, basic classification, watermarked PDF"]} />
          <TR cells={["Starter", "€99", "10", "Evidence vault, templates, ZIP export"]} isAlt />
          <TR cells={["Growth", "€249", "25", "Approvals, training tracking, org reporting"]} />
          <TR cells={["Pro", "€499", "75", "FRIA workflow, auditor links, SLA reminders"]} isAlt />
          <TR cells={["Enterprise", "Custom", "Unlimited", "SSO, EU residency, custom templates"]} />
        </View>
        <Text style={s.h2}>Billing Features</Text>
        <B items={["Stripe Checkout integration for plan upgrades", "Stripe Customer Portal for plan management", "Stripe Webhooks for subscription status sync", "Plan upgrade dialog with feature comparison", "Usage meters: AI system count, storage usage", "Add-on purchases: Provider Track, Importer/Distributor Track", "Trial banner with days remaining", "ROI calculator on pricing page"]} />
      </Page>

      {/* Section 21-24: Team, Settings, Marketing, Security */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>21. Team & Collaboration</Text>
        <B items={["Team member management page with role assignment", "Email invitations via edge function (send-team-invite)", "Accept invite flow (/invite/:token) via edge function (accept-team-invite)", "Role-based permissions (Admin, Compliance Owner, System Owner, Reviewer, Viewer)", "Activity feed per AI system showing all changes", "Audit log: who changed what, when (searchable, filterable, exportable)"]} />

        <Text style={s.sectionTitle}>22. Settings</Text>
        <Text style={s.h2}>General Settings (/settings/general)</Text>
        <B items={["Organization profile: name, industry, size, country", "User profile: display name, email (read-only)", "Notification settings: compliance digest frequency, email preferences"]} />
        <Text style={s.h2}>AI Privacy Settings</Text>
        <B items={["Master toggle: enable/disable all AI features organization-wide", "Per-feature toggles for each of 5 AI features", "Data sharing mode: Minimal (no context) / Standard (system names) / Full (all data)", "Changes apply immediately, stored in organization settings"]} />
        <Text style={s.h2}>Billing Settings (/settings/billing)</Text>
        <B items={["Current plan display", "Plan upgrade/downgrade", "Payment method management (via Stripe Portal)", "Invoice history", "Add-on management"]} />

        <Text style={s.sectionTitle}>23. Marketing & Public Pages</Text>
        <B items={["Landing page (/), Features, About, Contact, Pricing", "Blog with articles (/blog, /blog/:slug)", "Documentation hub (/docs, /docs/:slug) with sidebar navigation", "FAQ page", "Changelog, Status, Press, Careers, Partners pages", "8 template pages (AI Acceptable Use Policy, FRIA Template, etc.)", "4 interactive tool pages (AI Definition Checker, High-Risk Checker, etc.)", "10 guide pages (EU AI Act for SMEs, Article 26, Article 50, etc.)", "4 industry pages (HR, Fintech, Education, SaaS)", "5 use-case pages (SME, Enterprise, HR, Fintech, Healthcare)", "2 comparison pages (Klarvo vs Spreadsheets, vs Trust Platforms)", "3 BOFU product pages (Evidence Packs, Training Tracker, Evidence Vault)", "Paid search landing pages (/lp/demo, /lp/start)", "Lead capture forms (2-step newsletter form)", "Sample reports page (/samples) with email-gated downloads", "SEO: meta tags, schema markup, sitemap.xml, robots.txt, canonical URLs"]} />

        <Text style={s.sectionTitle}>24. Security & Compliance</Text>
        <B items={["Row-level security (RLS) on all database tables", "Organization-scoped data isolation (users only see their org's data)", "Encrypted OAuth token storage for workspace connections (AES-256-GCM)", "Audit logging for all key actions (create, update, delete, export, classify)", "Role-based access control (5 roles with distinct permission sets)", "Protected routes with authentication checks", "Legal pages: Terms of Service, Privacy Policy, Cookie Policy, Security Overview, DPA, GDPR Statement, Acceptable Use Policy"]} />
      </Page>

      {/* Appendix A: Route Map */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>Appendix A: Complete Route Map</Text>
        <Text style={s.h2}>Public Routes (No Auth Required)</Text>
        <View style={s.table}>
          <TR cells={["Route", "Page", "Purpose"]} isHeader />
          <TR cells={["/", "Landing Page", "Marketing homepage"]} />
          <TR cells={["/features", "Features", "Product features showcase"]} isAlt />
          <TR cells={["/pricing", "Pricing", "Plan comparison + ROI calculator"]} />
          <TR cells={["/about", "About", "Company information"]} isAlt />
          <TR cells={["/contact", "Contact", "Contact form"]} />
          <TR cells={["/blog", "Blog", "Article listing"]} isAlt />
          <TR cells={["/blog/:slug", "Blog Article", "Individual article"]} />
          <TR cells={["/docs", "Documentation", "Docs hub"]} isAlt />
          <TR cells={["/docs/:slug", "Docs Article", "Individual doc page"]} />
          <TR cells={["/faq", "FAQ", "Frequently asked questions"]} isAlt />
          <TR cells={["/eu-ai-act", "EU AI Act Guide", "Regulatory overview"]} />
          <TR cells={["/templates", "Templates Hub", "Template listing"]} isAlt />
          <TR cells={["/tools", "Tools Hub", "Interactive tools listing"]} />
          <TR cells={["/guides", "Guides Hub", "Guide listing"]} isAlt />
          <TR cells={["/compare", "Compare Hub", "Comparison listing"]} />
          <TR cells={["/industries", "Industries Hub", "Industry pages listing"]} isAlt />
          <TR cells={["/samples", "Sample Reports", "Email-gated downloads"]} />
          <TR cells={["/system-spec", "System Spec", "Technical specification PDF"]} isAlt />
        </View>
      </Page>

      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.h2}>Authentication Routes</Text>
        <View style={s.table}>
          <TR cells={["Route", "Page", "Purpose"]} isHeader />
          <TR cells={["/auth/login", "Login", "Email/password + magic link"]} />
          <TR cells={["/auth/signup", "Signup", "New account registration"]} isAlt />
          <TR cells={["/auth/callback", "Callback", "OAuth/email confirmation handler"]} />
          <TR cells={["/auth/forgot-password", "Forgot Password", "Password reset request"]} isAlt />
          <TR cells={["/auth/reset-password", "Reset Password", "New password form"]} />
          <TR cells={["/onboarding", "Onboarding", "Organization setup wizard"]} isAlt />
          <TR cells={["/invite/:token", "Accept Invite", "Team invite acceptance"]} />
        </View>
        <Text style={s.h2}>Authenticated App Routes (Require Login)</Text>
        <View style={s.table}>
          <TR cells={["Route", "Page", "Purpose"]} isHeader />
          <TR cells={["/dashboard", "Dashboard", "Main dashboard with metrics"]} />
          <TR cells={["/ai-systems", "AI Systems", "System inventory list"]} isAlt />
          <TR cells={["/ai-systems/new", "AI System Wizard", "New system intake"]} />
          <TR cells={["/ai-systems/:id", "AI System Detail", "System detail view"]} isAlt />
          <TR cells={["/ai-systems/:id/edit", "Edit System", "Edit existing system"]} />
          <TR cells={["/classification-wizard/:id", "Classification", "4-step classification"]} isAlt />
          <TR cells={["/fria-wizard/:id", "FRIA Wizard", "Article 27 assessment"]} />
          <TR cells={["/vendors", "Vendors", "Vendor registry"]} isAlt />
          <TR cells={["/vendors/:id", "Vendor Detail", "Vendor profile"]} />
          <TR cells={["/evidence", "Evidence", "Evidence vault"]} isAlt />
          <TR cells={["/tasks", "Tasks", "Task management"]} />
          <TR cells={["/policies", "Policies", "Policy library"]} isAlt />
          <TR cells={["/assessments", "Assessments", "Assessment overview"]} />
          <TR cells={["/controls", "Controls", "Control library + status"]} isAlt />
          <TR cells={["/training", "Training", "AI literacy tracking"]} />
          <TR cells={["/incidents", "Incidents", "Incident register"]} isAlt />
          <TR cells={["/disclosures", "Disclosures", "Article 50 snippets"]} />
          <TR cells={["/exports", "Exports", "Export center"]} isAlt />
          <TR cells={["/audit-log", "Audit Log", "Activity history"]} />
          <TR cells={["/discovery", "Discovery", "Shadow AI detection"]} isAlt />
          <TR cells={["/settings/general", "General Settings", "Org + user profile"]} />
          <TR cells={["/settings/billing", "Billing", "Plan + payment mgmt"]} isAlt />
        </View>
      </Page>

      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.h2}>Provider Track Routes (Add-on, Auth Required)</Text>
        <View style={s.table}>
          <TR cells={["Route", "Page", "Purpose"]} isHeader />
          <TR cells={["/provider-track", "Provider Dashboard", "Readiness score + actions"]} />
          <TR cells={["/provider-track/technical-docs", "Technical Docs", "Annex IV builder"]} isAlt />
          <TR cells={["/provider-track/risk-management", "Risk Management", "Risk register"]} />
          <TR cells={["/provider-track/qms", "QMS", "Quality management library"]} isAlt />
          <TR cells={["/provider-track/conformity", "Conformity", "Assessment process"]} />
          <TR cells={["/provider-track/declaration", "Declaration", "EU Declaration form"]} isAlt />
          <TR cells={["/provider-track/ce-marking", "CE Marking", "CE marking checklist"]} />
          <TR cells={["/provider-track/registration", "Registration", "EU database registration"]} isAlt />
          <TR cells={["/provider-track/monitoring", "Monitoring", "Post-market monitoring"]} />
          <TR cells={["/provider-track/serious-incidents", "Serious Incidents", "Incident reporting"]} isAlt />
          <TR cells={["/provider-track/data-governance", "Data Governance", "Dataset registry"]} />
          <TR cells={["/provider-track/importer", "Importer Verification", "Article 23 checklist"]} isAlt />
          <TR cells={["/provider-track/distributor", "Distributor Verification", "Article 24-25 checklist"]} />
        </View>
      </Page>

      {/* Appendix B: Database Tables */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>Appendix B: Database Table Summary</Text>
        <View style={s.table}>
          <TR cells={["Table", "Purpose", "Key Relations"]} isHeader />
          <TR cells={["organizations", "Organization profiles", "Root entity for all data"]} />
          <TR cells={["profiles", "User profiles", "Links to auth.users"]} isAlt />
          <TR cells={["ai_systems", "AI system inventory", "→ organizations, vendors, profiles"]} />
          <TR cells={["ai_system_classifications", "Current classification", "→ ai_systems (1:1)"]} isAlt />
          <TR cells={["classification_history", "Version history", "→ ai_systems (append-only)"]} />
          <TR cells={["ai_system_versions", "System version tracking", "→ ai_systems"]} isAlt />
          <TR cells={["ai_system_operator_roles", "Value chain roles", "→ ai_systems"]} />
          <TR cells={["assessment_answers", "Wizard Q&A detail", "→ classifications"]} isAlt />
          <TR cells={["vendors", "Vendor registry", "→ organizations"]} />
          <TR cells={["vendor_attestations", "Vendor evidence", "→ vendors"]} isAlt />
          <TR cells={["controls", "Control library instances", "→ ai_systems"]} />
          <TR cells={["evidence_files", "Evidence vault", "→ ai_systems, controls"]} isAlt />
          <TR cells={["evidence_requests", "Evidence asks", "→ evidence_files"]} />
          <TR cells={["policies", "Policy documents", "→ organizations"]} isAlt />
          <TR cells={["policy_versions", "Policy version history", "→ policies"]} />
          <TR cells={["tasks", "Task management", "→ ai_systems"]} isAlt />
          <TR cells={["training_courses", "Training content", "→ organizations"]} />
          <TR cells={["training_assignments", "Training assignments", "→ training_courses, profiles"]} isAlt />
          <TR cells={["incidents", "Incident register", "→ ai_systems"]} />
          <TR cells={["monitoring_events", "Monitoring log", "→ ai_systems"]} isAlt />
          <TR cells={["fria_assessments", "FRIA records", "→ ai_systems"]} />
          <TR cells={["fria_risks", "FRIA harm analysis", "→ fria_assessments"]} isAlt />
          <TR cells={["audit_logs", "Activity audit trail", "→ organizations, profiles"]} />
          <TR cells={["auditor_links", "Shareable auditor access", "→ ai_systems"]} isAlt />
          <TR cells={["compliance_recommendations", "AI recommendations", "→ organizations"]} />
          <TR cells={["subscriptions", "Billing subscriptions", "→ organizations"]} isAlt />
          <TR cells={["team_invites", "Pending invites", "→ organizations"]} />
          <TR cells={["workspace_connections", "OAuth connections", "→ organizations"]} isAlt />
          <TR cells={["discovered_tools", "Shadow AI findings", "→ organizations"]} />
          <TR cells={["ai_tool_patterns", "Known AI tool signatures", "Global reference table"]} isAlt />
          <TR cells={["export_history", "Export tracking", "→ organizations"]} />
          <TR cells={["ce_marking_records", "CE marking evidence", "→ ai_system_versions"]} isAlt />
        </View>
      </Page>

      {/* Appendix C: Edge Functions */}
      <Page size="A4" style={s.page}>
        <Header date={generatedDate} />
        <Text style={s.sectionTitle}>Appendix C: Edge Functions</Text>
        <View style={s.table}>
          <TR cells={["Function", "Trigger", "Purpose"]} isHeader />
          <TR cells={["ai-assistant", "POST from chat UI", "Context-aware AI compliance Q&A"]} />
          <TR cells={["ai-system-intake", "POST from wizard", "Natural language → wizard field extraction"]} isAlt />
          <TR cells={["classification-assistant", "POST from classifier", "AI-assisted risk classification"]} />
          <TR cells={["compliance-copilot", "POST from dashboard", "AI-powered compliance digest"]} isAlt />
          <TR cells={["compliance-recommendations", "POST from dashboard", "Generate prioritized recommendations"]} />
          <TR cells={["document-intelligence", "POST from evidence vault", "Automated clause extraction"]} isAlt />
          <TR cells={["send-team-invite", "POST from team settings", "Email invitation to join org"]} />
          <TR cells={["accept-team-invite", "POST from invite page", "Process invite acceptance"]} isAlt />
          <TR cells={["create-checkout-session", "POST from billing", "Stripe checkout session creation"]} />
          <TR cells={["create-portal-session", "POST from billing", "Stripe customer portal session"]} isAlt />
          <TR cells={["stripe-webhook", "Webhook from Stripe", "Subscription status sync"]} />
          <TR cells={["workspace-oauth-init", "POST from discovery", "Initiate workspace OAuth flow"]} isAlt />
          <TR cells={["workspace-oauth-callback", "GET redirect", "Complete workspace OAuth"]} />
          <TR cells={["discovery-scan", "POST from discovery", "Scan workspace for AI tools"]} isAlt />
          <TR cells={["scheduled-discovery-scan", "CRON", "Periodic automated discovery scan"]} />
          <TR cells={["send-compliance-digest", "POST internal", "Send compliance digest email"]} isAlt />
          <TR cells={["scheduled-digest-cron", "CRON", "Trigger periodic digest emails"]} />
        </View>

        <View style={s.info}>
          <Text style={s.infoText}>
            This document was auto-generated from the Klarvo codebase. For the latest version, visit /platform-doc in your Klarvo instance.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generatePlatformFeatureDocPDF(): Promise<Blob> {
  const generatedDate = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return pdf(<PlatformFeatureDocPDF generatedDate={generatedDate} />).toBlob();
}
