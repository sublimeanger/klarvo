import { Document, Page, Text, View, StyleSheet, Font, pdf } from "@react-pdf/renderer";

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.5,
  },
  coverPage: {
    padding: 50,
    fontFamily: "Inter",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: "#0d9373",
    marginBottom: 10,
    textAlign: "center",
  },
  coverSubtitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  coverMeta: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  tocPage: {
    padding: 50,
    fontFamily: "Inter",
  },
  tocTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 30,
    color: "#0d9373",
  },
  tocItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tocSection: {
    fontSize: 12,
    fontWeight: 600,
  },
  tocPage2: {
    fontSize: 11,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#0d9373",
  },
  headerTitle: {
    fontSize: 8,
    color: "#666",
  },
  headerPage: {
    fontSize: 8,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0d9373",
    marginBottom: 15,
    marginTop: 10,
  },
  h2: {
    fontSize: 14,
    fontWeight: 700,
    color: "#333",
    marginBottom: 8,
    marginTop: 15,
  },
  h3: {
    fontSize: 12,
    fontWeight: 600,
    color: "#444",
    marginBottom: 6,
    marginTop: 12,
  },
  paragraph: {
    fontSize: 10,
    color: "#333",
    marginBottom: 8,
    lineHeight: 1.6,
  },
  bulletList: {
    marginLeft: 15,
    marginBottom: 10,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bullet: {
    width: 15,
    fontSize: 10,
    color: "#0d9373",
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: "#333",
  },
  table: {
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0d9373",
    padding: 8,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 9,
    fontWeight: 700,
    color: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 6,
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 6,
    backgroundColor: "#f9f9f9",
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    color: "#333",
  },
  tableCellSmall: {
    width: 60,
    fontSize: 9,
    color: "#333",
  },
  infoBox: {
    backgroundColor: "#e6f7f3",
    padding: 12,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#0d9373",
  },
  infoBoxText: {
    fontSize: 10,
    color: "#0d9373",
    fontWeight: 600,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#999",
  },
});

const BulletList = ({ items }: { items: string[] }) => (
  <View style={styles.bulletList}>
    {items.map((item, i) => (
      <View key={i} style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
);

const TableRow = ({ cells, isHeader = false, isAlt = false }: { cells: string[]; isHeader?: boolean; isAlt?: boolean }) => (
  <View style={isHeader ? styles.tableHeader : isAlt ? styles.tableRowAlt : styles.tableRow}>
    {cells.map((cell, i) => (
      <Text key={i} style={isHeader ? styles.tableHeaderCell : styles.tableCell}>{cell}</Text>
    ))}
  </View>
);

interface SystemSpecificationPDFProps {
  generatedDate: string;
  version: string;
}

export function SystemSpecificationPDF({ generatedDate, version }: SystemSpecificationPDFProps) {
  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverTitle}>Klarvo</Text>
        <Text style={styles.coverSubtitle}>EU AI Act Compliance Hub for SMEs</Text>
        <Text style={{ fontSize: 14, color: "#666", marginBottom: 60, textAlign: "center" }}>
          Complete System Specification & Product Requirements Document
        </Text>
        <View style={{ borderTopWidth: 2, borderTopColor: "#0d9373", width: 100, marginBottom: 40 }} />
        <Text style={styles.coverMeta}>Version {version}</Text>
        <Text style={styles.coverMeta}>Generated: {generatedDate}</Text>
        <Text style={styles.coverMeta}>Classification: Internal / Review Copy</Text>
      </Page>

      {/* Table of Contents */}
      <Page size="A4" style={styles.tocPage}>
        <Text style={styles.tocTitle}>Table of Contents</Text>
        {[
          ["1. Executive Summary", "3"],
          ["2. Product Vision & Positioning", "4"],
          ["3. Target Audience", "5"],
          ["4. Regulatory Framework", "6"],
          ["5. Core Modules Overview", "8"],
          ["6. AI System Intake Wizard (20 Steps)", "10"],
          ["7. Classification Engine", "14"],
          ["8. FRIA Workflow", "16"],
          ["9. Control Library (30+ Controls)", "17"],
          ["10. Evidence Pack Export Structure", "21"],
          ["11. Database Schema", "22"],
          ["12. Pricing & Packaging", "24"],
          ["13. Feature Gating Matrix", "26"],
          ["14. Security & Permissions", "27"],
          ["15. Marketing Infrastructure", "28"],
          ["16. Implementation Status", "29"],
        ].map(([section, page], i) => (
          <View key={i} style={styles.tocItem}>
            <Text style={styles.tocSection}>{section}</Text>
            <Text style={styles.tocPage2}>{page}</Text>
          </View>
        ))}
      </Page>

      {/* Section 1: Executive Summary */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 3</Text>
        </View>
        <Text style={styles.sectionTitle}>1. Executive Summary</Text>
        
        <Text style={styles.h2}>Product Promise</Text>
        <Text style={styles.paragraph}>
          "Know every AI system you use, its EU AI Act risk level, what you must do next, and have an audit-ready evidence pack in 1 click."
        </Text>

        <Text style={styles.h2}>Core Outcomes</Text>
        <BulletList items={[
          "A company can produce an AI System Inventory + Risk Classification + Action Plan in hours (not weeks)",
          "The platform generates a complete 'Evidence Pack' (PDF/ZIP) that can be shared with leadership, customers, and auditors",
          "Compliance stays continuous: systems get reviewed, policies stay current, training is tracked, and evidence is always fresh",
        ]} />

        <Text style={styles.h2}>Key Differentiators</Text>
        <BulletList items={[
          "SMB-first: Minimal setup, opinionated templates, simple pricing",
          "Evidence-first: Never 'compliance theatre' — always output artifacts",
          "Deployer-focused: Full Article 26 workflow with provider track coming soon",
          "Guided: Decision trees + ready checklists, not 'read the law'",
          "Export-perfect: PDF/ZIP packs that look like a top consultancy produced them",
        ]} />

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            Klarvo is positioned as an 'AI system-of-record' for ongoing governance, specifically leveraging the regulatory urgency of the EU AI Act timelines.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 2: Product Vision & Positioning */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 4</Text>
        </View>
        <Text style={styles.sectionTitle}>2. Product Vision & Positioning</Text>

        <Text style={styles.h2}>Vision Statement</Text>
        <Text style={styles.paragraph}>
          Klarvo is a world-class SaaS platform that enables SMEs to achieve EU AI Act compliance efficiently, offering tools for inventorying AI systems, classifying risk, mapping obligations, collecting evidence, and generating audit-ready export packs with guided, jargon-free workflows.
        </Text>

        <Text style={styles.h2}>Competitive Positioning</Text>
        <Text style={styles.paragraph}>
          Klarvo differs from general GRC tools like Vanta or OneTrust by automating the generation of AI-specific regulatory artifacts — such as Article 27 FRIA Reports and Article 5/Annex III Classification Memos — rather than focusing on organization-wide security controls.
        </Text>

        <Text style={styles.h2}>How We Beat Enterprise Tools</Text>
        <View style={styles.table}>
          <TableRow cells={["Dimension", "Enterprise GRC", "Klarvo"]} isHeader />
          <TableRow cells={["Setup Time", "Weeks/Months", "Hours"]} />
          <TableRow cells={["Primary Unit", "Organization", "AI System"]} isAlt />
          <TableRow cells={["Target User", "Large enterprises", "SMEs (10-500 employees)"]} />
          <TableRow cells={["Pricing", "$50k+/year", "€149-749/month"]} isAlt />
          <TableRow cells={["AI-Specific Outputs", "Generic templates", "Article-specific memos & packs"]} />
        </View>

        <Text style={styles.h2}>Content Acquisition Strategy</Text>
        <BulletList items={[
          "Bottom-funnel tools (compliance software pages)",
          "Mid-funnel regulatory requirements (checklists/explanations)",
          "Template lead-magnets (FRIA/Inventory templates with email gates)",
          "Procurement due-diligence artifacts (evidence packs)",
        ]} />

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 3: Target Audience */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 5</Text>
        </View>
        <Text style={styles.sectionTitle}>3. Target Audience</Text>

        <Text style={styles.h2}>Primary Buyers</Text>
        <View style={styles.table}>
          <TableRow cells={["Role", "Motivation", "Key Need"]} isHeader />
          <TableRow cells={["SME Founder / CEO", "Risk reduction + customer trust", "Simple dashboard, board-ready reports"]} />
          <TableRow cells={["COO / Ops Manager", "'Make it happen' workflows", "Task management, deadlines"]} isAlt />
          <TableRow cells={["Head of Product / CTO", "Owns AI features + vendors", "Inventory, vendor oversight"]} />
          <TableRow cells={["DPO / Compliance Lead", "Documentation, governance, audit", "Evidence vault, export packs"]} isAlt />
        </View>

        <Text style={styles.h2}>Primary Users</Text>
        <BulletList items={[
          "System owners (product managers)",
          "Security/IT admins",
          "HR (AI used in hiring — high-risk category)",
          "Marketing/content teams (genAI output + disclosures)",
          "Procurement/vendor manager",
        ]} />

        <Text style={styles.h2}>Industry Segments</Text>
        <View style={styles.table}>
          <TableRow cells={["Industry", "AI Use Cases", "Risk Level"]} isHeader />
          <TableRow cells={["HR & Recruitment", "CV screening, candidate ranking", "High-Risk (Annex III)"]} />
          <TableRow cells={["Financial Services", "Credit scoring, fraud detection", "High-Risk (Annex III)"]} isAlt />
          <TableRow cells={["Healthcare", "Diagnostic support, triage", "High-Risk (Safety Component)"]} />
          <TableRow cells={["SaaS Companies", "AI features in products", "Varies (Deployer/Provider)"]} isAlt />
          <TableRow cells={["Education", "Proctoring, grading, admissions", "High-Risk (Annex III)"]} />
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 4: Regulatory Framework */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 6</Text>
        </View>
        <Text style={styles.sectionTitle}>4. Regulatory Framework</Text>

        <Text style={styles.h2}>EU AI Act Key Dates</Text>
        <View style={styles.table}>
          <TableRow cells={["Date", "Milestone", "Obligations"]} isHeader />
          <TableRow cells={["1 Aug 2024", "Entered into force", "Act officially active"]} />
          <TableRow cells={["2 Feb 2025", "First obligations apply", "Prohibited practices + AI literacy"]} isAlt />
          <TableRow cells={["2 Aug 2025", "Governance rules", "GPAI obligations apply"]} />
          <TableRow cells={["2 Aug 2026", "Most obligations", "Full compliance required"]} isAlt />
          <TableRow cells={["2 Aug 2027", "Extended transition", "High-risk in regulated products (Annex I)"]} />
        </View>

        <Text style={styles.h2}>Risk Classification Hierarchy</Text>
        <View style={styles.table}>
          <TableRow cells={["Level", "Description", "Obligations"]} isHeader />
          <TableRow cells={["Prohibited", "Article 5 violations", "Cannot be deployed in EU"]} />
          <TableRow cells={["High-Risk", "Annex III categories", "Full compliance package (Art. 26)"]} isAlt />
          <TableRow cells={["Limited Risk", "Transparency obligations", "Article 50 disclosures"]} />
          <TableRow cells={["Minimal Risk", "No specific obligations", "Voluntary codes"]} isAlt />
        </View>

        <Text style={styles.h2}>Article 5: Prohibited Practices</Text>
        <BulletList items={[
          "Subliminal manipulation causing significant harm",
          "Exploitation of vulnerabilities (age, disability, socio-economic)",
          "Social scoring for unrelated contexts",
          "Criminal profiling based solely on personality traits",
          "Untargeted facial recognition database building",
          "Emotion inference in workplace/education (with exceptions)",
          "Biometric categorisation revealing sensitive characteristics",
          "Real-time remote biometric ID in public spaces (law enforcement)",
        ]} />

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 4 continued: Regulatory Framework */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 7</Text>
        </View>

        <Text style={styles.h2}>Annex III: High-Risk Categories</Text>
        <BulletList items={[
          "Biometrics — Identification, categorisation, verification",
          "Critical Infrastructure — Energy, transport, utilities, digital infrastructure",
          "Education & Training — Admissions, scoring, proctoring, access decisions",
          "Employment & Worker Management — Recruiting, CV filtering, performance monitoring",
          "Essential Services — Credit scoring, insurance, housing, healthcare access, benefits",
          "Law Enforcement — Evidence assessment, risk profiling, investigation support",
          "Migration & Border — Visa assessment, risk evaluation, identity verification",
          "Justice & Democracy — Court support, case triage, election-related systems",
          "Safety Components — AI embedded in regulated products (medical devices, vehicles)",
        ]} />

        <Text style={styles.h2}>Article 26: Deployer Obligations (High-Risk)</Text>
        <BulletList items={[
          "Use AI system according to provider instructions",
          "Assign competent human oversight with necessary training",
          "Ensure input data relevance and representativeness (if under deployer control)",
          "Monitor operation and report risks/incidents to provider",
          "Keep logs under deployer control for at least 6 months",
          "Inform workers/representatives before workplace deployment",
          "Suspend use if serious risk is identified",
          "Complete FRIA where required (Article 27)",
        ]} />

        <Text style={styles.h2}>Article 50: Transparency Obligations</Text>
        <BulletList items={[
          "Inform people when interacting directly with AI (unless obvious)",
          "Mark synthetic content (audio/image/video) as AI-generated",
          "Disclose emotion recognition or biometric categorisation to exposed persons",
          "Label deepfake content at point of exposure",
          "Disclose AI-generated text on public interest matters (with exceptions)",
        ]} />

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 5: Core Modules Overview */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 8</Text>
        </View>
        <Text style={styles.sectionTitle}>5. Core Modules Overview</Text>

        <Text style={styles.h2}>Module A: Workspace & Governance</Text>
        <Text style={styles.paragraph}>Organization profile (industry, size, EU presence, regulated sector). Governance roles: AI Owner, Compliance Owner, DPO, Security Owner. Governance charter generator with board/leadership sign-off workflow and quarterly review agenda auto-generation.</Text>

        <Text style={styles.h2}>Module B: AI System Inventory</Text>
        <Text style={styles.paragraph}>The heart of the product. Each AI system record captures: Identity (name, ID, type), Role & Value Chain (deployer/provider), Purpose & Decisions, Data handling, Model behavior, Risk flags, and Operational controls. Two wizard modes: Quick Capture (10 min) and Full Assessment (20 steps). Supports bulk import via CSV and "duplicate system" for similar deployments.</Text>

        <Text style={styles.h2}>Module C: Classification Engine</Text>
        <Text style={styles.paragraph}>4-step classification process: (1) AI System Definition Test, (2) Prohibited Practices Screening, (3) High-Risk Screening, (4) Transparency Obligations Check. Generates one-page Classification Memo PDF with inputs, result, confidence level, reviewer name/date, and next steps. Supports version history and human review queues for low-confidence classifications.</Text>

        <Text style={styles.h2}>Module D: Obligations & Control Mapping</Text>
        <Text style={styles.paragraph}>Converts law into work. Pre-defined library of 30+ controls (GOV, CLS, PROH, TRN, DEP, LOG, DATA, VEN, SEC, LIT, MON categories). Auto-attaches applicable controls based on classification. Gap checklist shows existing vs. missing controls with task plan generation.</Text>

        <Text style={styles.h2}>Module E: Evidence Vault</Text>
        <Text style={styles.paragraph}>Evidence types: Vendor docs, internal policies, training materials, risk assessments, monitoring reports, incident logs, transparency notices. Evidence metadata: uploader, date, status (draft/approved), confidentiality, retention/expiry, tags. Approval workflow with "evidence request" feature and redaction tools.</Text>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 5 continued */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 9</Text>
        </View>

        <Text style={styles.h2}>Module F: Policies, Notices & Templates</Text>
        <Text style={styles.paragraph}>Pre-built, customizable templates: AI Acceptable Use Policy, AI Vendor Procurement Checklist, Human Oversight Plan, AI Incident Response Addendum, Transparency Notice Templates, Employee Notice Template. Supports versioning, approvals, jurisdiction variants (EU-only, UK+EU, global), and tone selector (Startup-simple vs Procurement-ready).</Text>

        <Text style={styles.h2}>Module G: Training & AI Literacy</Text>
        <Text style={styles.paragraph}>Training campaigns by role: All staff AI basics, People using AI tools, High-risk AI operators, Reviewers/approvers. Supports content upload (PDF/video), optional quizzes, completion tracking with reminders, and exportable completion reports. Policy acknowledgement and annual re-certification automation.</Text>

        <Text style={styles.h2}>Module H: Incidents, Monitoring & Change Management</Text>
        <Text style={styles.paragraph}>Monitor log for performance drift, complaints, bias concerns. Incident records capture: what happened, impacted groups, severity, containment actions, notified parties, postmortem. Change management triggers re-classification and FRIA review prompts. Configurable SLA timers and ticketing integrations.</Text>

        <Text style={styles.h2}>Dashboard</Text>
        <Text style={styles.paragraph}>Executive-friendly overview showing: Total AI systems, High-risk candidates, Systems missing classification, Upcoming deadlines, Evidence completeness %, Training completion %. Risk heat map by department and weighted Audit Readiness Score (0-100%) across Classification (25%), Controls (30%), Evidence (25%), Tasks (10%), Training (10%).</Text>

        <Text style={styles.h2}>Exports</Text>
        <Text style={styles.paragraph}>AI System Evidence Pack (PDF + ZIP), Organisation AI Governance Pack, Classification Memo, FRIA Report, Board Summary. ZIP structure follows regulatory-aligned folders: 00_Executive, 01_Inventory, 02_Classification, 03_Transparency_Article50, 04_HighRisk_Deployer_Article26, 05_Evidence with Evidence_Index.csv.</Text>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 6: AI System Intake Wizard */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 10</Text>
        </View>
        <Text style={styles.sectionTitle}>6. AI System Intake Wizard</Text>

        <Text style={styles.paragraph}>
          The intake wizard supports two modes: Quick Capture (4 steps, ~5 minutes) and Full Assessment (20 steps, ~20 minutes). Every answer creates a classification decision, obligation flag, evidence request, or task with owner/due date.
        </Text>

        <Text style={styles.h2}>Wizard Steps Overview</Text>
        <View style={styles.table}>
          <TableRow cells={["Step", "Title", "Purpose"]} isHeader />
          <TableRow cells={["0", "Mode Selection", "Choose Quick Capture or Full Assessment"]} />
          <TableRow cells={["1", "Basics", "Name, ID, department, status"]} isAlt />
          <TableRow cells={["2", "Vendor", "Built internally or vendor-based"]} />
          <TableRow cells={["3", "Ownership", "Primary owner, backup, oversight"]} isAlt />
          <TableRow cells={["4", "Scope", "Geography, EU countries, who is affected"]} />
          <TableRow cells={["5", "Value Chain", "Role: Deployer/Provider/Both"]} isAlt />
          <TableRow cells={["6", "AI Definition", "Is this an AI system? (Commission guidance)"]} />
          <TableRow cells={["7", "Use Case", "Purpose category, workflow, human involvement"]} isAlt />
          <TableRow cells={["8", "Prohibited", "Article 5 screening (8 questions)"]} />
          <TableRow cells={["9", "High-Risk", "Annex III screening (9 categories)"]} isAlt />
          <TableRow cells={["10", "Transparency", "Article 50 obligations screening"]} />
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 6 continued */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 11</Text>
        </View>

        <View style={styles.table}>
          <TableRow cells={["Step", "Title", "Purpose"]} isHeader />
          <TableRow cells={["11", "Data & Privacy", "Personal data, DPIA status, retention"]} />
          <TableRow cells={["12", "Oversight", "HITL/HOTL/HOOTL model, oversight owner"]} isAlt />
          <TableRow cells={["13", "Logging", "Automatic logs, storage, retention period"]} />
          <TableRow cells={["14", "Incidents", "Incident process, severity levels, suspension"]} isAlt />
          <TableRow cells={["15", "Workplace", "Worker notification requirements"]} />
          <TableRow cells={["16", "Authority", "Public authority, registration status"]} isAlt />
          <TableRow cells={["17", "Training", "AI literacy for staff operating system"]} />
          <TableRow cells={["18", "FRIA", "Fundamental Rights Impact Assessment trigger"]} isAlt />
          <TableRow cells={["19", "Sign-off", "Final classification, reviewer approval"]} />
          <TableRow cells={["20", "Complete", "Summary, tasks generated, next steps"]} isAlt />
        </View>

        <Text style={styles.h2}>Step 8: Prohibited Practices Screening (Article 5)</Text>
        <Text style={styles.paragraph}>8 questions covering:</Text>
        <BulletList items={[
          "Subliminal manipulation causing significant harm",
          "Exploitation of vulnerabilities",
          "Social scoring",
          "Criminal profiling based on personality",
          "Untargeted facial scraping",
          "Emotion inference in workplace/education",
          "Biometric categorisation revealing sensitive characteristics",
          "Real-time remote biometric ID in public spaces",
        ]} />

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            If any prohibited indicator is flagged, the system is BLOCKED until legal review is completed. Creates mandatory escalation task.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 6 continued: Wizard Steps Detail */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 12</Text>
        </View>

        <Text style={styles.h2}>Step 9: High-Risk Screening (Annex III)</Text>
        <Text style={styles.paragraph}>9 categories assessed:</Text>
        <BulletList items={[
          "Biometric identification, categorisation, or similar",
          "Critical infrastructure or safety-related contexts",
          "Education or vocational training",
          "Employment / worker management / self-employment access",
          "Access to essential services (credit, insurance, housing, healthcare)",
          "Law enforcement or public security",
          "Migration, asylum, border control",
          "Administration of justice or democratic processes",
          "Safety component of regulated product (medical device, vehicle, machinery)",
        ]} />

        <Text style={styles.h2}>Step 10: Transparency Screening (Article 50)</Text>
        <BulletList items={[
          "Direct interaction with natural persons (is AI obvious?)",
          "Synthetic audio/image/video/text generation",
          "Emotion recognition or biometric categorisation",
          "Deepfake generation/manipulation",
          "AI-generated text for public interest matters",
        ]} />

        <Text style={styles.h2}>Step 12: Human Oversight Model</Text>
        <View style={styles.table}>
          <TableRow cells={["Model", "Description", "Authority"]} isHeader />
          <TableRow cells={["HITL", "Human-in-the-loop", "Human must approve each action"]} />
          <TableRow cells={["HOTL", "Human-on-the-loop", "Human monitors, can intervene"]} isAlt />
          <TableRow cells={["HOOTL", "Human-out-of-the-loop", "Fully automated"]} />
        </View>

        <Text style={styles.h2}>Auto-Generated Outputs (Step 20)</Text>
        <BulletList items={[
          "Classification Memo (PDF)",
          "Gap Checklist (controls missing + evidence missing)",
          "Task Plan (owners + due dates)",
          "Evidence Requests (assigned to specific people)",
          "Export Pack stub (placeholders until evidence filled)",
        ]} />

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Field-level specification page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 13</Text>
        </View>

        <Text style={styles.h2}>Wizard Field Specifications</Text>
        <Text style={styles.paragraph}>The Full Assessment wizard captures 80+ data fields across 20 steps. Key field categories:</Text>

        <Text style={styles.h3}>Identity Fields</Text>
        <BulletList items={[
          "name (required) — AI system display name",
          "internal_reference_id — Organization's internal ID",
          "department — Business unit/team",
          "lifecycle_status — Idea, Pilot, Live, Retired",
          "wizard_mode — quick_capture or full_assessment",
        ]} />

        <Text style={styles.h3}>Ownership Fields</Text>
        <BulletList items={[
          "primary_owner_id — Main responsible person",
          "backup_owner_id — Backup contact",
          "oversight_owner_id — Human oversight responsible",
          "privacy_owner_id — DPO or privacy contact",
        ]} />

        <Text style={styles.h3}>Geography Fields</Text>
        <BulletList items={[
          "deployment_regions — EU, UK, US, Other",
          "eu_countries — Specific EU member states",
          "is_customer_facing — Boolean",
          "has_workplace_impact — Boolean",
          "affected_groups — Customers, Employees, Candidates, etc.",
        ]} />

        <Text style={styles.h3}>Classification Fields</Text>
        <BulletList items={[
          "prohibited_screening_result — none, potential, needs_review",
          "highrisk_screening_result — not_high_risk, potential_annex_iii, potential_safety_component",
          "transparency_status — not_applicable, implemented, gaps_exist",
          "final_classification — prohibited, high_risk_candidate, limited_risk, minimal_risk",
        ]} />

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 7: Classification Engine */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 14</Text>
        </View>
        <Text style={styles.sectionTitle}>7. Classification Engine</Text>

        <Text style={styles.h2}>4-Step Classification Process</Text>
        <View style={styles.table}>
          <TableRow cells={["Step", "Assessment", "Outcome"]} isHeader />
          <TableRow cells={["1", "AI System Definition Test", "In-scope / Out-of-scope / Needs review"]} />
          <TableRow cells={["2", "Prohibited Practices (Art. 5)", "No indicators / Potential / Blocked"]} isAlt />
          <TableRow cells={["3", "High-Risk Candidate (Annex III)", "Not high-risk / Potential / Safety component"]} />
          <TableRow cells={["4", "Transparency (Art. 50)", "Not applicable / Implemented / Gaps exist"]} isAlt />
        </View>

        <Text style={styles.h2}>Classification Logic</Text>
        <BulletList items={[
          "Any prohibited practice flagged → Status = Blocked + Legal review required",
          "Annex III category flagged → High-risk candidate → Full deployer obligations (Art. 26)",
          "Transparency scenario flagged → Generate disclosure tasks & templates",
          "Workplace + high-risk → Worker notification tasks (Art. 26)",
          "FRIA triggers met → Require FRIA workflow creation (Art. 27)",
        ]} />

        <Text style={styles.h2}>Confidence Levels</Text>
        <View style={styles.table}>
          <TableRow cells={["Level", "Description", "Action"]} isHeader />
          <TableRow cells={["High", "Clear answers, straightforward case", "Auto-approve classification"]} />
          <TableRow cells={["Medium", "Some ambiguity or edge cases", "Reviewer confirmation recommended"]} isAlt />
          <TableRow cells={["Low", "Significant uncertainty", "Mandatory human review queue"]} />
        </View>

        <Text style={styles.h2}>Classification Memo PDF Contents</Text>
        <BulletList items={[
          "AI System Summary (name, purpose, owner)",
          "AI Definition Test Results + rationale",
          "Prohibited Practices Screening (8 questions + conclusion)",
          "High-Risk Assessment (9 categories + conclusion)",
          "Transparency Obligations (5 scenarios + status)",
          "Final Classification + confidence level",
          "Reviewer sign-off (name, date, notes)",
          "Next Steps & obligations list",
        ]} />

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Classification continued */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 15</Text>
        </View>

        <Text style={styles.h2}>Reassessment Triggers</Text>
        <Text style={styles.paragraph}>The system monitors for material changes that trigger re-classification:</Text>
        <BulletList items={[
          "Significant change to AI system purpose or scope",
          "New user groups or affected populations",
          "Change in deployment geography (enters EU)",
          "Vendor/model change",
          "Regulatory update or guidance change",
          "Incident indicating unexpected behavior",
          "6-month periodic review (configurable)",
        ]} />

        <Text style={styles.h2}>Version History</Text>
        <Text style={styles.paragraph}>
          Every classification decision is versioned with timestamp, assessor, rationale, and confidence level. 
          Allows comparison between versions and supports audit trails showing how classification evolved.
        </Text>

        <Text style={styles.h2}>Auto-Generated Tasks from Classification</Text>
        <View style={styles.table}>
          <TableRow cells={["Classification Result", "Tasks Generated"]} isHeader />
          <TableRow cells={["Prohibited/Blocked", "Legal review required, Suspend use consideration"]} />
          <TableRow cells={["High-Risk Candidate", "Complete Art. 26 checklist, Assign oversight, Set up logging, Worker notification"]} isAlt />
          <TableRow cells={["Limited Risk", "Implement transparency disclosures, Upload evidence"]} />
          <TableRow cells={["FRIA Required", "Create FRIA assessment, Assign assessment owner"]} isAlt />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            All classification data feeds into the Evidence Pack export. The Classification Memo becomes a key artifact in the 02_Classification folder.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 8: FRIA Workflow */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 16</Text>
        </View>
        <Text style={styles.sectionTitle}>8. FRIA Workflow (Article 27)</Text>

        <Text style={styles.paragraph}>
          The Fundamental Rights Impact Assessment is required for deployers of high-risk AI systems in specified contexts (public bodies, certain private entities). The FRIA must be completed prior to first use and updated when material changes occur.
        </Text>

        <Text style={styles.h2}>7-Step FRIA Wizard</Text>
        <View style={styles.table}>
          <TableRow cells={["Step", "Article Ref", "Content"]} isHeader />
          <TableRow cells={["A. Overview", "—", "Title, linked AI system, owner, dates, existing DPIA"]} />
          <TableRow cells={["B. Process", "Art. 27(a)", "Deployer's process where AI is used"]} isAlt />
          <TableRow cells={["C. Scope", "Art. 27(b,c)", "Duration, frequency, affected categories, scale"]} />
          <TableRow cells={["D. Risks", "Art. 27(d)", "Fundamental rights risk matrix by category"]} isAlt />
          <TableRow cells={["E. Oversight", "Art. 27(e)", "Human oversight design and competence"]} />
          <TableRow cells={["F. Mitigation", "Art. 27(f)", "Mitigation measures, governance, complaints"]} isAlt />
          <TableRow cells={["G. Approval", "—", "Conclusion, approvers, authority notification"]} />
        </View>

        <Text style={styles.h2}>Risk Categories Assessed</Text>
        <BulletList items={[
          "Non-discrimination / fairness",
          "Privacy & data protection",
          "Freedom of expression / information integrity",
          "Worker rights (if workplace context)",
          "Due process / contestability",
          "Access to essential services",
          "Safety / wellbeing",
        ]} />

        <Text style={styles.h2}>FRIA Report PDF Contents</Text>
        <BulletList items={[
          "Cover page with assessment metadata",
          "Process description (Article 27a)",
          "Duration and scope (Article 27b)",
          "Affected groups analysis (Article 27c)",
          "Fundamental rights risk matrix with likelihood/severity",
          "Human oversight measures (Article 27e)",
          "Mitigation and governance plan (Article 27f)",
          "Approval signatures and authority notification status",
        ]} />

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 9: Control Library */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 17</Text>
        </View>
        <Text style={styles.sectionTitle}>9. Control Library</Text>

        <Text style={styles.paragraph}>
          Pre-defined library of 30+ EU AI Act controls. Each control has: status tracking (Not started / In progress / Implemented / Not applicable), owner assignment, evidence requirements, and review frequency. Controls are auto-attached based on classification.
        </Text>

        <Text style={styles.h2}>GOV — Governance & Accountability (8 controls)</Text>
        <View style={styles.table}>
          <TableRow cells={["Code", "Control Name"]} isHeader />
          <TableRow cells={["GOV-01", "AI Governance Ownership Assigned"]} />
          <TableRow cells={["GOV-02", "AI System Inventory Maintained"]} isAlt />
          <TableRow cells={["GOV-03", "Risk Classification Completed & Reviewed"]} />
          <TableRow cells={["GOV-04", "Prohibited Practices Screening Completed"]} isAlt />
          <TableRow cells={["GOV-05", "Change Management Process for AI Systems"]} />
          <TableRow cells={["GOV-06", "AI Vendor Governance Process"]} isAlt />
          <TableRow cells={["GOV-07", "Audit Log Enabled & Reviewed"]} />
          <TableRow cells={["GOV-08", "Board/Leadership Awareness Pack Produced"]} isAlt />
        </View>

        <Text style={styles.h2}>CLS — Classification & Scoping (5 controls)</Text>
        <View style={styles.table}>
          <TableRow cells={["Code", "Control Name"]} isHeader />
          <TableRow cells={["CLS-01", "AI System Definition Test Completed"]} />
          <TableRow cells={["CLS-02", "High-risk Screening Against Annex III Completed"]} isAlt />
          <TableRow cells={["CLS-03", "Workplace Use Flagged"]} />
          <TableRow cells={["CLS-04", "Transparency Scenario Screening Completed"]} isAlt />
          <TableRow cells={["CLS-05", "FRIA Trigger Assessed"]} />
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Control Library continued */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 18</Text>
        </View>

        <Text style={styles.h2}>PROH — Prohibited Practices Safeguards (6 controls)</Text>
        <View style={styles.table}>
          <TableRow cells={["Code", "Control Name"]} isHeader />
          <TableRow cells={["PROH-01", "No Harmful Manipulation / Deception Use-case"]} />
          <TableRow cells={["PROH-02", "No Exploitation of Vulnerable Groups"]} isAlt />
          <TableRow cells={["PROH-03", "No Social Scoring"]} />
          <TableRow cells={["PROH-04", "No Untargeted Facial Image Scraping"]} isAlt />
          <TableRow cells={["PROH-05", "No Workplace/Education Emotion Inference"]} />
          <TableRow cells={["PROH-06", "Legal Review Required When 'Unsure'"]} isAlt />
        </View>

        <Text style={styles.h2}>TRN — Transparency & Disclosure (7 controls)</Text>
        <View style={styles.table}>
          <TableRow cells={["Code", "Control Name"]} isHeader />
          <TableRow cells={["TRN-01", "AI Interaction Disclosure Implemented"]} />
          <TableRow cells={["TRN-02", "Synthetic Content Marking Enabled"]} isAlt />
          <TableRow cells={["TRN-03", "Emotion Recognition/Biometric Notice"]} />
          <TableRow cells={["TRN-04", "Deepfake Disclosure Implemented"]} isAlt />
          <TableRow cells={["TRN-05", "Public-Interest Text Disclosure Implemented"]} />
          <TableRow cells={["TRN-06", "Accessibility Requirements Met for Notices"]} isAlt />
          <TableRow cells={["TRN-07", "Disclosure Evidence Updated Each Major UI Change"]} />
        </View>

        <Text style={styles.h2}>DEP — High-Risk Deployer Controls (11 controls)</Text>
        <View style={styles.table}>
          <TableRow cells={["Code", "Control Name"]} isHeader />
          <TableRow cells={["DEP-01", "Instructions for Use Stored & Followed"]} />
          <TableRow cells={["DEP-02", "Competent Human Oversight Assigned"]} isAlt />
          <TableRow cells={["DEP-03", "Oversight Has Authority to Intervene/Suspend"]} />
          <TableRow cells={["DEP-04", "Input Data Relevance & Representativeness Managed"]} isAlt />
          <TableRow cells={["DEP-05", "Operational Monitoring Per Instructions"]} />
          <TableRow cells={["DEP-06", "Risk Escalation & Suspension Procedure"]} isAlt />
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Control Library continued */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 19</Text>
        </View>

        <Text style={styles.h2}>DEP — High-Risk Deployer Controls (continued)</Text>
        <View style={styles.table}>
          <TableRow cells={["Code", "Control Name"]} isHeader />
          <TableRow cells={["DEP-07", "Serious Incident Reporting Workflow"]} />
          <TableRow cells={["DEP-08", "Logs Retained ≥ 6 Months"]} isAlt />
          <TableRow cells={["DEP-09", "Workplace Notification Issued"]} />
          <TableRow cells={["DEP-10", "Public Authority Registration Check"]} isAlt />
          <TableRow cells={["DEP-11", "DPIA Linkage (where applicable)"]} />
        </View>

        <Text style={styles.h2}>LOG — Record-keeping (4 controls)</Text>
        <View style={styles.table}>
          <TableRow cells={["Code", "Control Name"]} isHeader />
          <TableRow cells={["LOG-01", "Logging Capability Confirmed & Documented"]} />
          <TableRow cells={["LOG-02", "Log Access Controlled"]} isAlt />
          <TableRow cells={["LOG-03", "Log Export On Demand"]} />
          <TableRow cells={["LOG-04", "Log Review Cadence Defined"]} isAlt />
        </View>

        <Text style={styles.h2}>DATA — Data Governance & Privacy (8 controls)</Text>
        <View style={styles.table}>
          <TableRow cells={["Code", "Control Name"]} isHeader />
          <TableRow cells={["DATA-01", "Data Flow Documented"]} />
          <TableRow cells={["DATA-02", "Data Minimisation & Purpose Limitation Reviewed"]} isAlt />
          <TableRow cells={["DATA-03", "Data Retention Defined for Inputs/Outputs"]} />
          <TableRow cells={["DATA-04", "Dataset Sourcing & Licenses Recorded"]} isAlt />
          <TableRow cells={["DATA-05", "Bias/Representativeness Checks"]} />
          <TableRow cells={["DATA-06", "User Consent / Notices Verified"]} isAlt />
          <TableRow cells={["DATA-07", "Right to Contest / Appeal Route Defined"]} />
          <TableRow cells={["DATA-08", "Complaint Intake & Handling Mechanism"]} isAlt />
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Control Library continued */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 20</Text>
        </View>

        <Text style={styles.h2}>VEN — Vendor & Supply Chain (8 controls)</Text>
        <View style={styles.table}>
          <TableRow cells={["Code", "Control Name"]} isHeader />
          <TableRow cells={["VEN-01", "Vendor Identified & Contract Stored"]} />
          <TableRow cells={["VEN-02", "Vendor AI Use Description Captured"]} isAlt />
          <TableRow cells={["VEN-03", "Vendor Security Evidence Stored"]} />
          <TableRow cells={["VEN-04", "Vendor Transparency Support Confirmed"]} isAlt />
          <TableRow cells={["VEN-05", "Vendor Logging/Export Capability Confirmed"]} />
          <TableRow cells={["VEN-06", "Vendor Incident Communication Path Set"]} isAlt />
          <TableRow cells={["VEN-07", "Renewal Review Triggered"]} />
          <TableRow cells={["VEN-08", "Vendor Changes Trigger Reassessment"]} isAlt />
        </View>

        <Text style={styles.h2}>SEC — Security & Operational Safety (6 controls)</Text>
        <View style={styles.table}>
          <TableRow cells={["Code", "Control Name"]} isHeader />
          <TableRow cells={["SEC-01", "Access Controls & Least Privilege"]} />
          <TableRow cells={["SEC-02", "Abuse Prevention / Misuse Scenarios Documented"]} isAlt />
          <TableRow cells={["SEC-03", "Prompt/Output Safety Rules Documented"]} />
          <TableRow cells={["SEC-04", "Monitoring for Drift or Degradation"]} isAlt />
          <TableRow cells={["SEC-05", "Security Testing Before Major Releases"]} />
          <TableRow cells={["SEC-06", "Backup / Rollback Plan Exists"]} isAlt />
        </View>

        <Text style={styles.h2}>LIT — AI Literacy & Training (3 controls)</Text>
        <View style={styles.table}>
          <TableRow cells={["Code", "Control Name"]} isHeader />
          <TableRow cells={["LIT-01", "Role-based AI Literacy Training Program"]} />
          <TableRow cells={["LIT-02", "Training Completion Tracked"]} isAlt />
          <TableRow cells={["LIT-03", "Annual Refresh / Re-certification"]} />
        </View>

        <Text style={styles.h2}>MON — Monitoring & Continuous Compliance (6 controls)</Text>
        <View style={styles.table}>
          <TableRow cells={["Code", "Control Name"]} isHeader />
          <TableRow cells={["MON-01", "KPIs Defined for Performance & Harm Signals"]} />
          <TableRow cells={["MON-02", "User/Employee Feedback Loop Implemented"]} isAlt />
          <TableRow cells={["MON-03", "Incident Register Maintained"]} />
          <TableRow cells={["MON-04", "Audit-Ready Evidence Refresh Cadence"]} isAlt />
          <TableRow cells={["MON-05", "Reassessment Trigger Rules"]} />
          <TableRow cells={["MON-06", "Quarterly AI Governance Review"]} isAlt />
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 10: Evidence Pack Export */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 21</Text>
        </View>
        <Text style={styles.sectionTitle}>10. Evidence Pack Export Structure</Text>

        <Text style={styles.h2}>Export Types</Text>
        <BulletList items={[
          "Classification Memo (PDF) — 4-page AI system classification document",
          "FRIA Report (PDF) — 8-page Article 27 impact assessment",
          "AI System Evidence Pack (PDF + ZIP) — Complete audit-ready bundle",
          "Organisation Governance Pack (PDF) — Executive summary for leadership",
          "Comparison Report (PDF) — Side-by-side analysis of multiple systems",
        ]} />

        <Text style={styles.h2}>ZIP Bundle Folder Structure</Text>
        <Text style={{ fontSize: 9, fontFamily: "Courier", marginBottom: 10, backgroundColor: "#f5f5f5", padding: 10 }}>
          EU-AI-Act_EvidencePack_[Org]_[System]_[Date]/{"\n"}
          ├── 00_Executive/{"\n"}
          │   └── Executive_Summary.pdf{"\n"}
          ├── 01_Inventory/{"\n"}
          │   └── Inventory_Record.pdf{"\n"}
          ├── 02_Classification/{"\n"}
          │   ├── AI_Definition_Test.pdf{"\n"}
          │   ├── Prohibited_Practices_Screening.pdf{"\n"}
          │   └── Risk_Classification_Memo.pdf{"\n"}
          ├── 03_Transparency_Article50/{"\n"}
          │   ├── Interaction_Disclosure/{"\n"}
          │   ├── Synthetic_Content_Marking/{"\n"}
          │   └── Deepfake_Disclosure/{"\n"}
          ├── 04_HighRisk_Deployer_Article26/{"\n"}
          │   ├── Instructions_For_Use/{"\n"}
          │   ├── Human_Oversight/{"\n"}
          │   ├── Monitoring/{"\n"}
          │   └── Logs_Retention/{"\n"}
          ├── 05_Evidence/{"\n"}
          │   └── [All supporting files]{"\n"}
          └── Evidence_Index.csv
        </Text>

        <Text style={styles.h2}>Evidence Index CSV Columns</Text>
        <BulletList items={[
          "Evidence ID (EV-001, EV-002...)",
          "Title — Descriptive name",
          "Type — Policy, screenshot, report, contract",
          "Linked Control(s) — DEP-02, TRN-01, etc.",
          "Date Collected — ISO date",
          "Owner — Person responsible",
          "Status — Draft / Approved",
          "Shareability — Internal / External / Auditor",
        ]} />

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 11: Database Schema */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 22</Text>
        </View>
        <Text style={styles.sectionTitle}>11. Database Schema</Text>

        <Text style={styles.h2}>Core Tables</Text>
        <View style={styles.table}>
          <TableRow cells={["Table", "Purpose", "Key Fields"]} isHeader />
          <TableRow cells={["organizations", "Multi-tenant root", "id, name, industry_sector, company_size"]} />
          <TableRow cells={["profiles", "User data (RBAC)", "id, organization_id, role, email"]} isAlt />
          <TableRow cells={["ai_systems", "AI inventory", "id, name, organization_id, lifecycle_status, 80+ fields"]} />
          <TableRow cells={["ai_system_classifications", "Risk classification", "id, ai_system_id, risk_level, confidence"]} isAlt />
          <TableRow cells={["vendors", "Vendor registry", "id, name, organization_id, contract details"]} />
        </View>

        <Text style={styles.h2}>Compliance Tables</Text>
        <View style={styles.table}>
          <TableRow cells={["Table", "Purpose", "Key Fields"]} isHeader />
          <TableRow cells={["control_library", "Master control list", "id, code, name, category, applies_to"]} />
          <TableRow cells={["control_implementations", "Per-system controls", "id, ai_system_id, control_id, status"]} isAlt />
          <TableRow cells={["evidence_files", "Evidence vault", "id, file_path, status, expires_at"]} />
          <TableRow cells={["control_evidence_links", "Control-evidence mapping", "control_implementation_id, evidence_file_id"]} isAlt />
          <TableRow cells={["fria_assessments", "Article 27 assessments", "id, ai_system_id, status, all FRIA fields"]} />
        </View>

        <Text style={styles.h2}>Operational Tables</Text>
        <View style={styles.table}>
          <TableRow cells={["Table", "Purpose", "Key Fields"]} isHeader />
          <TableRow cells={["tasks", "Task management", "id, title, status, assignee_id, due_date"]} />
          <TableRow cells={["incidents", "Incident register", "id, ai_system_id, severity, status"]} isAlt />
          <TableRow cells={["policies", "Policy documents", "id, title, status, version, template_source"]} />
          <TableRow cells={["training_courses", "Training content", "id, title, role_target"]} isAlt />
          <TableRow cells={["training_assignments", "User assignments", "id, user_id, course_id, status"]} />
          <TableRow cells={["audit_logs", "Activity tracking", "id, action_type, entity_type, user_id"]} isAlt />
          <TableRow cells={["export_logs", "Export history", "id, export_type, file_name, ai_system_id"]} />
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Database Schema continued */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 23</Text>
        </View>

        <Text style={styles.h2}>Billing Tables</Text>
        <View style={styles.table}>
          <TableRow cells={["Table", "Purpose", "Key Fields"]} isHeader />
          <TableRow cells={["subscriptions", "Stripe sync", "id, organization_id, plan_id, status"]} />
          <TableRow cells={["usage_snapshots", "Daily tracking", "id, organization_id, ai_system_count, storage_bytes"]} isAlt />
        </View>

        <Text style={styles.h2}>Data Isolation & Security</Text>
        <BulletList items={[
          "Multi-tenant isolation via organization_id foreign keys",
          "Row Level Security (RLS) policies on all tables",
          "Users can only access data within their organization",
          "Admin role can manage all org data; Member role is restricted",
          "Evidence files stored in private Supabase storage bucket",
          "Audit logs capture all sensitive operations",
        ]} />

        <Text style={styles.h2}>Key Relationships</Text>
        <BulletList items={[
          "ai_systems → organizations (1:N)",
          "ai_systems → vendors (N:1, optional)",
          "ai_systems → profiles (N:1 for owner fields)",
          "ai_system_classifications → ai_systems (1:1)",
          "control_implementations → ai_systems (N:1)",
          "control_implementations → control_library (N:1)",
          "evidence_files → ai_systems (N:1, optional)",
          "fria_assessments → ai_systems (1:N)",
        ]} />

        <Text style={styles.h2}>Enums</Text>
        <View style={styles.table}>
          <TableRow cells={["Enum", "Values"]} isHeader />
          <TableRow cells={["lifecycle_status", "draft, idea, pilot, live, retired, archived"]} />
          <TableRow cells={["risk_level", "unclassified, minimal, limited, high_risk_candidate, prohibited"]} isAlt />
          <TableRow cells={["assessment_type", "prohibited_screening, high_risk_screening, transparency_screening, ai_definition"]} />
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 12: Pricing & Packaging */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 24</Text>
        </View>
        <Text style={styles.sectionTitle}>12. Pricing & Packaging</Text>

        <Text style={styles.h2}>Pricing Tiers</Text>
        <View style={styles.table}>
          <TableRow cells={["Tier", "Monthly", "Annual", "AI Systems", "Storage"]} isHeader />
          <TableRow cells={["Free", "€0", "€0", "1", "1 GB"]} />
          <TableRow cells={["Starter", "€149", "€1,490", "10", "10 GB"]} isAlt />
          <TableRow cells={["Growth", "€349", "€3,490", "25", "50 GB"]} />
          <TableRow cells={["Pro", "€749", "€7,490", "100", "200 GB"]} isAlt />
          <TableRow cells={["Enterprise", "Custom", "Custom", "Unlimited", "1 TB+"]} />
        </View>

        <Text style={styles.h2}>System Count Logic</Text>
        <BulletList items={[
          "Only active statuses count: Draft, Pilot, Live",
          "Retired and Archived systems are excluded from limits",
          "Allows organizations to maintain historical records without penalty",
        ]} />

        <Text style={styles.h2}>Overage Pricing (per additional system/month)</Text>
        <View style={styles.table}>
          <TableRow cells={["Tier", "Overage Rate"]} isHeader />
          <TableRow cells={["Starter", "€12/system"]} />
          <TableRow cells={["Growth", "€9/system"]} isAlt />
          <TableRow cells={["Pro", "€6/system"]} />
        </View>

        <Text style={styles.h2}>Add-ons (Monthly)</Text>
        <View style={styles.table}>
          <TableRow cells={["Add-on", "Price", "Description"]} isHeader />
          <TableRow cells={["Shadow AI Discovery", "€149", "SSO/browser detection of AI tools"]} />
          <TableRow cells={["Vendor Portal", "€199", "Vendor self-service attestation uploads"]} isAlt />
          <TableRow cells={["Export Pro Pack", "€99", "Custom branding, additional formats"]} />
          <TableRow cells={["Partner Mode", "€299 + €49/client", "Multi-client management for consultants"]} isAlt />
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Pricing continued */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 25</Text>
        </View>

        <Text style={styles.h2}>Professional Services</Text>
        <View style={styles.table}>
          <TableRow cells={["Service", "Pricing", "Description"]} isHeader />
          <TableRow cells={["AI Act Readiness Sprint", "Fixed fee", "2-week guided implementation"]} />
          <TableRow cells={["Template Customisation Pack", "Fixed fee", "Bespoke policy/template adaptation"]} isAlt />
          <TableRow cells={["Annual Audit Refresh Pack", "Fixed fee", "Yearly compliance review & update"]} />
        </View>

        <Text style={styles.h2}>Free Tier Limitations</Text>
        <BulletList items={[
          "1 AI system only",
          "Watermarked PDF exports",
          "Watermarked ZIP evidence packs",
          "Basic classification only",
          "No FRIA workflow",
          "Limited template library",
          "Community support only",
        ]} />

        <Text style={styles.h2}>Enterprise Features</Text>
        <BulletList items={[
          "SSO/SAML authentication",
          "EU data residency option",
          "Custom control library extensions",
          "API access",
          "Dedicated customer success manager",
          "SLA guarantees",
          "Multi-workspace / subsidiary management",
          "Custom integrations",
        ]} />

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            Stripe integration handles all subscription management. Webhook sync updates local subscription status in real-time.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 13: Feature Gating Matrix */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 26</Text>
        </View>
        <Text style={styles.sectionTitle}>13. Feature Gating Matrix</Text>

        <Text style={styles.paragraph}>
          Features follow a "Visible but Locked with Soft Limits" strategy. Users see what's available but are prompted to upgrade for access.
        </Text>

        <Text style={styles.h2}>Core Features by Tier</Text>
        <View style={styles.table}>
          <TableRow cells={["Feature", "Free", "Starter", "Growth", "Pro"]} isHeader />
          <TableRow cells={["AI System Inventory", "1 system", "10", "25", "100"]} />
          <TableRow cells={["Classification Wizard", "Basic", "Full", "Full", "Full"]} isAlt />
          <TableRow cells={["Classification Memo PDF", "Watermark", "✓", "✓", "✓"]} />
          <TableRow cells={["Evidence Vault", "1 GB", "10 GB", "50 GB", "200 GB"]} isAlt />
          <TableRow cells={["Evidence Approvals", "—", "—", "✓", "✓"]} />
          <TableRow cells={["Control Library", "View only", "Full", "Full", "Full + Custom"]} isAlt />
          <TableRow cells={["Policy Templates", "3", "All", "All", "All + Custom"]} />
          <TableRow cells={["Training Tracking", "—", "Basic", "Full", "Full"]} isAlt />
          <TableRow cells={["FRIA Workflow", "—", "—", "—", "✓"]} />
          <TableRow cells={["Evidence Pack ZIP", "Watermark", "✓", "✓", "✓"]} isAlt />
          <TableRow cells={["Auditor Links", "—", "—", "✓", "✓"]} />
          <TableRow cells={["Incident Monitoring", "—", "—", "—", "✓"]} isAlt />
          <TableRow cells={["API Access", "—", "—", "—", "✓"]} />
        </View>

        <Text style={styles.h2}>Upgrade Triggers</Text>
        <BulletList items={[
          "System limit reached → Prompt to upgrade tier",
          "Storage limit reached → Prompt to upgrade or purchase add-on",
          "FRIA required by classification → Show Pro upsell",
          "Evidence approval attempted → Show Growth upsell",
          "API access requested → Show Pro upsell",
        ]} />

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 14: Security & Permissions */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 27</Text>
        </View>
        <Text style={styles.sectionTitle}>14. Security & Permissions</Text>

        <Text style={styles.h2}>Role-Based Access Control</Text>
        <View style={styles.table}>
          <TableRow cells={["Role", "Capabilities"]} isHeader />
          <TableRow cells={["Admin", "Full access: all settings, billing, user management, all AI systems"]} />
          <TableRow cells={["Compliance Owner", "All compliance features except billing/integrations"]} isAlt />
          <TableRow cells={["System Owner", "Only their assigned AI systems; can upload evidence"]} />
          <TableRow cells={["Reviewer/Approver", "Can approve assessments and evidence; read access to systems"]} isAlt />
          <TableRow cells={["Viewer", "Read-only access to dashboards and reports"]} />
          <TableRow cells={["Auditor (External)", "Export-only view with redaction controls"]} isAlt />
        </View>

        <Text style={styles.h2}>Data Security Measures</Text>
        <BulletList items={[
          "Encryption at rest (AES-256) for all database and storage",
          "Encryption in transit (TLS 1.3) for all API communications",
          "Row Level Security (RLS) policies enforce organization isolation",
          "Audit logs for all sensitive operations",
          "Evidence files stored in private Supabase storage bucket",
          "MFA support for all users",
          "SSO/SAML available on Enterprise tier",
        ]} />

        <Text style={styles.h2}>Privacy & Compliance</Text>
        <BulletList items={[
          "GDPR-compliant data handling",
          "Data Processing Agreement (DPA) available",
          "EU data residency option (Enterprise)",
          "Data retention controls with deletion on request",
          "Right to erasure / data export supported",
          "Security overview document for procurement",
        ]} />

        <Text style={styles.h2}>Authentication</Text>
        <BulletList items={[
          "Email/password with email verification",
          "Social login: Google OAuth",
          "Magic link authentication",
          "Password reset flow",
          "Session management with automatic expiry",
        ]} />

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 15: Marketing Infrastructure */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 28</Text>
        </View>
        <Text style={styles.sectionTitle}>15. Marketing Infrastructure</Text>

        <Text style={styles.h2}>Page Count: 68+ Marketing Pages</Text>

        <Text style={styles.h3}>Core Product Pages</Text>
        <BulletList items={[
          "/eu-ai-act-compliance-software — Main BOFU product page",
          "/ai-inventory-software — AI System Inventory feature",
          "/fria-software — FRIA workflow feature",
          "/product/evidence-vault — Evidence management feature",
          "/ai-literacy-training-tracker — Training module feature",
          "/ai-governance-evidence-packs — Export feature",
        ]} />

        <Text style={styles.h3}>Industry Pages (5)</Text>
        <BulletList items={[
          "/industries/hr-recruitment-ai-act",
          "/industries/fintech-credit-ai-act",
          "/industries/education-edtech-ai-act",
          "/industries/saas-ai-act",
          "/use-cases/healthcare",
        ]} />

        <Text style={styles.h3}>Guide Pages (10+)</Text>
        <BulletList items={[
          "/guides/eu-ai-act-for-smes — SME overview",
          "/guides/article-26-deployer-obligations",
          "/guides/article-50-transparency-obligations",
          "/guides/prohibited-ai-practices-article-5",
          "/guides/high-risk-ai-annex-iii",
          "/guides/ai-inventory-eu-ai-act",
          "/guides/is-this-an-ai-system",
          "/guides/ai-literacy-article-4",
          "/guides/fria-article-27",
          "/guides/evidence-pack-procurement",
        ]} />

        <Text style={styles.h3}>Template Pages (8+)</Text>
        <BulletList items={[
          "/templates/ai-inventory-template",
          "/templates/fria-template",
          "/templates/article-26-checklist",
          "/templates/article-50-disclosure-templates",
          "/templates/ai-acceptable-use-policy",
          "/templates/vendor-due-diligence-questionnaire",
          "/templates/human-oversight-plan-template",
          "/templates/ai-incident-register-template",
        ]} />

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Section 16: Implementation Status */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 29</Text>
        </View>
        <Text style={styles.sectionTitle}>16. Implementation Status</Text>

        <Text style={styles.h2}>Completed Modules</Text>
        <View style={styles.table}>
          <TableRow cells={["Module", "Status", "Notes"]} isHeader />
          <TableRow cells={["Dashboard + Audit Readiness", "✓ Complete", "Weighted scoring, alerts, charts"]} />
          <TableRow cells={["AI System Inventory", "✓ Complete", "20-step wizard, draft save, bulk ops"]} isAlt />
          <TableRow cells={["Classification Engine", "✓ Complete", "4-step wizard, memo PDF"]} />
          <TableRow cells={["Control Library (30+)", "✓ Complete", "Auto-attach, status tracking"]} isAlt />
          <TableRow cells={["Evidence Vault", "✓ Complete", "Upload, approval workflow, linking"]} />
          <TableRow cells={["Policy Templates", "✓ Complete", "8 templates, versioning"]} isAlt />
          <TableRow cells={["Training Tracking", "✓ Complete", "Course management, completion"]} />
          <TableRow cells={["Task Management", "✓ Complete", "Auto-generation, bulk ops"]} isAlt />
          <TableRow cells={["Incident Register", "✓ Complete", "Full incident lifecycle"]} />
          <TableRow cells={["FRIA Workflow", "✓ Complete", "7-step wizard, PDF report"]} isAlt />
          <TableRow cells={["Vendor Management", "✓ Complete", "Attestations, due diligence"]} />
          <TableRow cells={["Exports (PDF + ZIP)", "✓ Complete", "5 export types, Evidence_Index"]} isAlt />
          <TableRow cells={["Audit Log", "✓ Complete", "Activity feed, CSV export"]} />
          <TableRow cells={["Marketing Suite (68+ pages)", "✓ Complete", "SEO optimized, schema markup"]} isAlt />
          <TableRow cells={["Stripe Billing", "✓ Complete", "Subscriptions, checkout, portal"]} />
          <TableRow cells={["Authentication", "✓ Complete", "Email, Google OAuth, magic link"]} isAlt />
        </View>

        <Text style={styles.h2}>Planned Enhancements</Text>
        <BulletList items={[
          "Shadow AI Discovery add-on",
          "Vendor Portal add-on",
          "API access (Pro tier)",
          "Multi-framework mapping (ISO 42001, NIST AI RMF)",
          "Customer trust page generator",
          "Continuous monitoring connectors",
        ]} />

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Final page: Contact & Version */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Klarvo System Specification</Text>
          <Text style={styles.headerPage}>Page 30</Text>
        </View>
        <Text style={styles.sectionTitle}>Document Information</Text>

        <View style={{ marginTop: 30 }}>
          <Text style={styles.h2}>Version History</Text>
          <View style={styles.table}>
            <TableRow cells={["Version", "Date", "Author", "Changes"]} isHeader />
            <TableRow cells={[version, generatedDate, "Klarvo Platform", "Initial comprehensive specification"]} />
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={styles.h2}>Document Classification</Text>
          <Text style={styles.paragraph}>
            This document is classified as CONFIDENTIAL and is intended for internal review and authorized third-party assessment only. 
            Do not distribute without authorization.
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={styles.h2}>Contact Information</Text>
          <BulletList items={[
            "Website: https://klarvo.lovable.app",
            "Support: support@klarvo.io",
            "Sales: sales@klarvo.io",
          ]} />
        </View>

        <View style={{ marginTop: 40, padding: 20, borderWidth: 2, borderColor: "#0d9373", borderRadius: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#0d9373", textAlign: "center", marginBottom: 10 }}>
            END OF DOCUMENT
          </Text>
          <Text style={{ fontSize: 10, color: "#666", textAlign: "center" }}>
            Total Pages: 30 | Generated by Klarvo Platform
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generateSystemSpecificationPDF(): Promise<Blob> {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  
  const doc = <SystemSpecificationPDF generatedDate={today} version="1.0" />;
  const blob = await pdf(doc).toBlob();
  return blob;
}
