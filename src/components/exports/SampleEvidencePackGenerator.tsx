import { Document, Page, Text, View, StyleSheet, Font, pdf } from "@react-pdf/renderer";
import JSZip from "jszip";

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff", fontWeight: 700 },
  ],
});

const emerald = "#0d9373";
const emeraldLight = "#e6f7f3";

const baseStyles = StyleSheet.create({
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
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: emerald,
  },
  headerTitle: {
    fontSize: 8,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  headerPage: {
    fontSize: 8,
    color: "#666",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: emerald,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#333",
    marginBottom: 20,
  },
  h2: {
    fontSize: 14,
    fontWeight: 700,
    color: "#333",
    marginBottom: 10,
    marginTop: 15,
  },
  h3: {
    fontSize: 12,
    fontWeight: 600,
    color: "#444",
    marginBottom: 8,
    marginTop: 12,
  },
  paragraph: {
    fontSize: 10,
    color: "#333",
    marginBottom: 8,
    lineHeight: 1.6,
  },
  label: {
    fontSize: 9,
    fontWeight: 600,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 10,
    color: "#333",
    marginBottom: 10,
  },
  table: {
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: emerald,
    padding: 10,
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
    borderBottomColor: "#e5e7eb",
    padding: 10,
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    padding: 10,
    backgroundColor: "#f9fafb",
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    color: "#333",
  },
  infoBox: {
    backgroundColor: emeraldLight,
    padding: 12,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: emerald,
    borderRadius: 4,
  },
  infoBoxText: {
    fontSize: 10,
    color: emerald,
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
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  badge: {
    backgroundColor: emerald,
    color: "#fff",
    fontSize: 8,
    fontWeight: 600,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 30,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bullet: {
    width: 15,
    fontSize: 10,
    color: emerald,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: "#333",
  },
});

const sampleData = {
  systemName: "TalentMatch AI",
  systemId: "AI-SYS-2024-001",
  organization: "Acme Recruitment Ltd",
  department: "Human Resources",
  owner: "Sarah Chen",
  riskLevel: "High-Risk Candidate",
  vendor: "RecruitTech Solutions",
  generatedDate: new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
};

// Executive Summary PDF
function ExecutiveSummaryPDF() {
  return (
    <Document>
      <Page size="A4" style={baseStyles.coverPage}>
        <Text style={baseStyles.badge}>Executive Summary</Text>
        <Text style={baseStyles.title}>EU AI Act Evidence Pack</Text>
        <Text style={baseStyles.subtitle}>{sampleData.systemName}</Text>
        
        <View style={{ marginTop: 20 }}>
          <Text style={baseStyles.label}>Organisation</Text>
          <Text style={baseStyles.value}>{sampleData.organization}</Text>
          
          <Text style={baseStyles.label}>AI System ID</Text>
          <Text style={baseStyles.value}>{sampleData.systemId}</Text>
          
          <Text style={baseStyles.label}>Risk Classification</Text>
          <Text style={baseStyles.value}>{sampleData.riskLevel}</Text>
          
          <Text style={baseStyles.label}>Generated</Text>
          <Text style={baseStyles.value}>{sampleData.generatedDate}</Text>
        </View>

        <View style={{ ...baseStyles.infoBox, marginTop: 30 }}>
          <Text style={baseStyles.infoBoxText}>
            This evidence pack contains all compliance documentation required under the 
            EU AI Act for the {sampleData.systemName} AI system, including classification 
            assessment, control implementation status, and supporting evidence.
          </Text>
        </View>

        <Text style={{ ...baseStyles.h2, marginTop: 30 }}>Pack Contents</Text>
        <View style={baseStyles.table}>
          <View style={baseStyles.tableHeader}>
            <Text style={baseStyles.tableHeaderCell}>Folder</Text>
            <Text style={baseStyles.tableHeaderCell}>Contents</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={baseStyles.tableCell}>00_Executive</Text>
            <Text style={baseStyles.tableCell}>Summary, Table of Contents</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={baseStyles.tableCell}>01_Inventory</Text>
            <Text style={baseStyles.tableCell}>System Record, Metadata</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={baseStyles.tableCell}>02_Classification</Text>
            <Text style={baseStyles.tableCell}>Classification Memo, Screening Results</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={baseStyles.tableCell}>03_Transparency_Article50</Text>
            <Text style={baseStyles.tableCell}>Disclosure Evidence</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={baseStyles.tableCell}>04_HighRisk_Deployer_Article26</Text>
            <Text style={baseStyles.tableCell}>Obligations Checklist, FRIA</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={baseStyles.tableCell}>05_Evidence</Text>
            <Text style={baseStyles.tableCell}>All Supporting Documentation</Text>
          </View>
        </View>

        <View style={{ marginTop: "auto", paddingTop: 30, borderTopWidth: 1, borderTopColor: "#eee" }}>
          <Text style={{ fontSize: 9, color: "#666" }}>
            Generated by Klarvo EU AI Act Compliance Hub • {sampleData.generatedDate}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

// Inventory Record PDF
function InventoryRecordPDF() {
  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>AI System Inventory Record</Text>
          <Text style={baseStyles.headerPage}>{sampleData.systemId}</Text>
        </View>

        <Text style={baseStyles.title}>{sampleData.systemName}</Text>

        <Text style={baseStyles.h2}>System Identity</Text>
        <View style={baseStyles.table}>
          <View style={baseStyles.tableRow}>
            <Text style={baseStyles.tableCell}>System Name</Text>
            <Text style={baseStyles.tableCell}>{sampleData.systemName}</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={baseStyles.tableCell}>Internal ID</Text>
            <Text style={baseStyles.tableCell}>{sampleData.systemId}</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={baseStyles.tableCell}>Department</Text>
            <Text style={baseStyles.tableCell}>{sampleData.department}</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={baseStyles.tableCell}>Primary Owner</Text>
            <Text style={baseStyles.tableCell}>{sampleData.owner}</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={baseStyles.tableCell}>Lifecycle Status</Text>
            <Text style={baseStyles.tableCell}>Live</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={baseStyles.tableCell}>Risk Classification</Text>
            <Text style={baseStyles.tableCell}>{sampleData.riskLevel}</Text>
          </View>
        </View>

        <Text style={baseStyles.h2}>Vendor Information</Text>
        <View style={baseStyles.table}>
          <View style={baseStyles.tableRow}>
            <Text style={baseStyles.tableCell}>Vendor Name</Text>
            <Text style={baseStyles.tableCell}>{sampleData.vendor}</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={baseStyles.tableCell}>Acquisition Method</Text>
            <Text style={baseStyles.tableCell}>SaaS Platform</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={baseStyles.tableCell}>Contract Status</Text>
            <Text style={baseStyles.tableCell}>Active (Renews: Dec 2025)</Text>
          </View>
        </View>

        <Text style={baseStyles.h2}>Deployment Information</Text>
        <View style={baseStyles.table}>
          <View style={baseStyles.tableRow}>
            <Text style={baseStyles.tableCell}>Deployment Regions</Text>
            <Text style={baseStyles.tableCell}>EU (Germany, France, Netherlands)</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={baseStyles.tableCell}>Affected Groups</Text>
            <Text style={baseStyles.tableCell}>Job Applicants, Recruiters</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={baseStyles.tableCell}>Customer Facing</Text>
            <Text style={baseStyles.tableCell}>No (Backend Processing)</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={baseStyles.tableCell}>Workplace Impact</Text>
            <Text style={baseStyles.tableCell}>Yes (Hiring Decisions)</Text>
          </View>
        </View>

        <Text style={baseStyles.h2}>Purpose & Function</Text>
        <Text style={baseStyles.paragraph}>
          TalentMatch AI provides automated CV screening and candidate ranking for job applications. 
          The system analyzes submitted CVs, extracts qualifications and experience, compares them 
          against job requirements, and produces scored recommendations for recruiter review.
        </Text>

        <View style={baseStyles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{sampleData.generatedDate}</Text>
        </View>
      </Page>
    </Document>
  );
}

// Article 26 Checklist PDF
function Article26ChecklistPDF() {
  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>Article 26 Deployer Obligations</Text>
          <Text style={baseStyles.headerPage}>{sampleData.systemId}</Text>
        </View>

        <Text style={baseStyles.title}>High-Risk Deployer Checklist</Text>
        <Text style={baseStyles.paragraph}>
          Compliance status for Article 26 obligations applicable to deployers of high-risk 
          AI systems under the EU AI Act.
        </Text>

        <View style={baseStyles.table}>
          <View style={baseStyles.tableHeader}>
            <Text style={{ ...baseStyles.tableHeaderCell, flex: 2 }}>Obligation</Text>
            <Text style={baseStyles.tableHeaderCell}>Status</Text>
            <Text style={baseStyles.tableHeaderCell}>Evidence</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Use per provider instructions</Text>
            <Text style={baseStyles.tableCell}>✓ Implemented</Text>
            <Text style={baseStyles.tableCell}>EV-001</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Competent human oversight assigned</Text>
            <Text style={baseStyles.tableCell}>✓ Implemented</Text>
            <Text style={baseStyles.tableCell}>EV-002</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Input data relevance ensured</Text>
            <Text style={baseStyles.tableCell}>✓ Implemented</Text>
            <Text style={baseStyles.tableCell}>EV-003</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Operational monitoring active</Text>
            <Text style={baseStyles.tableCell}>✓ Implemented</Text>
            <Text style={baseStyles.tableCell}>EV-004</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Log retention ≥6 months</Text>
            <Text style={baseStyles.tableCell}>✓ Implemented</Text>
            <Text style={baseStyles.tableCell}>EV-005</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Worker notification issued</Text>
            <Text style={baseStyles.tableCell}>✓ Implemented</Text>
            <Text style={baseStyles.tableCell}>EV-006</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Incident reporting process</Text>
            <Text style={baseStyles.tableCell}>✓ Implemented</Text>
            <Text style={baseStyles.tableCell}>EV-007</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>FRIA completed (Article 27)</Text>
            <Text style={baseStyles.tableCell}>✓ Completed</Text>
            <Text style={baseStyles.tableCell}>EV-008</Text>
          </View>
        </View>

        <View style={baseStyles.infoBox}>
          <Text style={baseStyles.infoBoxText}>
            All Article 26 deployer obligations have been implemented. Evidence files are 
            available in the 05_Evidence folder of this pack.
          </Text>
        </View>

        <View style={baseStyles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{sampleData.generatedDate}</Text>
        </View>
      </Page>
    </Document>
  );
}

// Human Oversight Plan PDF
function HumanOversightPlanPDF() {
  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>Human Oversight Plan</Text>
          <Text style={baseStyles.headerPage}>{sampleData.systemId}</Text>
        </View>

        <Text style={baseStyles.title}>Human Oversight Plan</Text>
        <Text style={baseStyles.subtitle}>{sampleData.systemName}</Text>

        <Text style={baseStyles.h2}>1. Oversight Model</Text>
        <Text style={baseStyles.paragraph}>
          This AI system operates under a <Text style={{ fontWeight: 600 }}>Human-in-the-Loop (HITL)</Text> model. 
          All AI-generated recommendations require human review and approval before any action 
          is taken that affects candidates.
        </Text>

        <Text style={baseStyles.h2}>2. Oversight Roles</Text>
        <View style={baseStyles.table}>
          <View style={baseStyles.tableHeader}>
            <Text style={baseStyles.tableHeaderCell}>Role</Text>
            <Text style={baseStyles.tableHeaderCell}>Person</Text>
            <Text style={baseStyles.tableHeaderCell}>Authority</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={baseStyles.tableCell}>Oversight Owner</Text>
            <Text style={baseStyles.tableCell}>Sarah Chen</Text>
            <Text style={baseStyles.tableCell}>Full stop/suspend authority</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={baseStyles.tableCell}>Backup Owner</Text>
            <Text style={baseStyles.tableCell}>Michael Torres</Text>
            <Text style={baseStyles.tableCell}>Full stop/suspend authority</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={baseStyles.tableCell}>Operators</Text>
            <Text style={baseStyles.tableCell}>Recruitment Team (15)</Text>
            <Text style={baseStyles.tableCell}>Override individual decisions</Text>
          </View>
        </View>

        <Text style={baseStyles.h2}>3. Training Requirements</Text>
        <View style={{ marginLeft: 15, marginBottom: 10 }}>
          <View style={baseStyles.bulletItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.bulletText}>Vendor system training (4 hours) — Mandatory</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.bulletText}>AI literacy module (2 hours) — Mandatory</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.bulletText}>Bias awareness training (1 hour) — Mandatory</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.bulletText}>Annual re-certification — Required</Text>
          </View>
        </View>

        <Text style={baseStyles.h2}>4. Intervention Procedures</Text>
        <Text style={baseStyles.paragraph}>
          The Oversight Owner may immediately suspend the system if:
        </Text>
        <View style={{ marginLeft: 15, marginBottom: 10 }}>
          <View style={baseStyles.bulletItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.bulletText}>Bias or discrimination is suspected</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.bulletText}>System produces unexpected or erroneous outputs</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.bulletText}>Regulatory or compliance concern is raised</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.bulletText}>Vendor reports a system issue</Text>
          </View>
        </View>

        <View style={baseStyles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{sampleData.generatedDate}</Text>
        </View>
      </Page>
    </Document>
  );
}

// Evidence Index PDF
function EvidenceIndexPDF() {
  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>Evidence Index</Text>
          <Text style={baseStyles.headerPage}>{sampleData.systemId}</Text>
        </View>

        <Text style={baseStyles.title}>Evidence Index</Text>
        <Text style={baseStyles.paragraph}>
          Complete index of all evidence files included in this compliance pack.
        </Text>

        <View style={{ ...baseStyles.table, marginTop: 20 }}>
          <View style={baseStyles.tableHeader}>
            <Text style={{ ...baseStyles.tableHeaderCell, width: 60 }}>ID</Text>
            <Text style={{ ...baseStyles.tableHeaderCell, flex: 2 }}>Title</Text>
            <Text style={baseStyles.tableHeaderCell}>Type</Text>
            <Text style={baseStyles.tableHeaderCell}>Status</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, width: 60 }}>EV-001</Text>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Vendor User Guide & Instructions</Text>
            <Text style={baseStyles.tableCell}>Document</Text>
            <Text style={baseStyles.tableCell}>Approved</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={{ ...baseStyles.tableCell, width: 60 }}>EV-002</Text>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Human Oversight Plan</Text>
            <Text style={baseStyles.tableCell}>Policy</Text>
            <Text style={baseStyles.tableCell}>Approved</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, width: 60 }}>EV-003</Text>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Data Quality Procedures</Text>
            <Text style={baseStyles.tableCell}>SOP</Text>
            <Text style={baseStyles.tableCell}>Approved</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={{ ...baseStyles.tableCell, width: 60 }}>EV-004</Text>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Monitoring Dashboard Config</Text>
            <Text style={baseStyles.tableCell}>Screenshot</Text>
            <Text style={baseStyles.tableCell}>Approved</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, width: 60 }}>EV-005</Text>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Log Retention Policy</Text>
            <Text style={baseStyles.tableCell}>Policy</Text>
            <Text style={baseStyles.tableCell}>Approved</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={{ ...baseStyles.tableCell, width: 60 }}>EV-006</Text>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Worker Notification Email</Text>
            <Text style={baseStyles.tableCell}>Communication</Text>
            <Text style={baseStyles.tableCell}>Approved</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, width: 60 }}>EV-007</Text>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Incident Response Procedure</Text>
            <Text style={baseStyles.tableCell}>SOP</Text>
            <Text style={baseStyles.tableCell}>Approved</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={{ ...baseStyles.tableCell, width: 60 }}>EV-008</Text>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>FRIA Report</Text>
            <Text style={baseStyles.tableCell}>Assessment</Text>
            <Text style={baseStyles.tableCell}>Approved</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, width: 60 }}>EV-009</Text>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Training Completion Report</Text>
            <Text style={baseStyles.tableCell}>Report</Text>
            <Text style={baseStyles.tableCell}>Approved</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={{ ...baseStyles.tableCell, width: 60 }}>EV-010</Text>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Vendor Security Whitepaper</Text>
            <Text style={baseStyles.tableCell}>Document</Text>
            <Text style={baseStyles.tableCell}>Approved</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, width: 60 }}>EV-011</Text>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Bias Audit Report (Q4 2024)</Text>
            <Text style={baseStyles.tableCell}>Audit</Text>
            <Text style={baseStyles.tableCell}>Approved</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={{ ...baseStyles.tableCell, width: 60 }}>EV-012</Text>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Classification Memo</Text>
            <Text style={baseStyles.tableCell}>Assessment</Text>
            <Text style={baseStyles.tableCell}>Approved</Text>
          </View>
        </View>

        <View style={{ ...baseStyles.infoBox, marginTop: 20 }}>
          <Text style={baseStyles.infoBoxText}>
            All evidence files have been reviewed and approved by the Compliance Owner. 
            Evidence is valid as of {sampleData.generatedDate}.
          </Text>
        </View>

        <View style={baseStyles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{sampleData.generatedDate}</Text>
        </View>
      </Page>
    </Document>
  );
}

// Transparency Disclosure PDF
function TransparencyDisclosurePDF() {
  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>Transparency Obligations (Article 50)</Text>
          <Text style={baseStyles.headerPage}>{sampleData.systemId}</Text>
        </View>

        <Text style={baseStyles.title}>Article 50 Transparency Assessment</Text>
        <Text style={baseStyles.subtitle}>{sampleData.systemName}</Text>

        <Text style={baseStyles.h2}>Transparency Scenarios Assessed</Text>
        <View style={baseStyles.table}>
          <View style={baseStyles.tableHeader}>
            <Text style={{ ...baseStyles.tableHeaderCell, flex: 2 }}>Scenario</Text>
            <Text style={baseStyles.tableHeaderCell}>Applicable?</Text>
            <Text style={baseStyles.tableHeaderCell}>Status</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Direct interaction with natural persons</Text>
            <Text style={baseStyles.tableCell}>No</Text>
            <Text style={baseStyles.tableCell}>N/A</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Generates synthetic content</Text>
            <Text style={baseStyles.tableCell}>No</Text>
            <Text style={baseStyles.tableCell}>N/A</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Emotion recognition/biometric categorisation</Text>
            <Text style={baseStyles.tableCell}>No</Text>
            <Text style={baseStyles.tableCell}>N/A</Text>
          </View>
          <View style={baseStyles.tableRowAlt}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Deepfake generation/manipulation</Text>
            <Text style={baseStyles.tableCell}>No</Text>
            <Text style={baseStyles.tableCell}>N/A</Text>
          </View>
          <View style={baseStyles.tableRow}>
            <Text style={{ ...baseStyles.tableCell, flex: 2 }}>Public-interest text generation</Text>
            <Text style={baseStyles.tableCell}>No</Text>
            <Text style={baseStyles.tableCell}>N/A</Text>
          </View>
        </View>

        <View style={baseStyles.infoBox}>
          <Text style={baseStyles.infoBoxText}>
            <Text style={{ fontWeight: 600 }}>Result: </Text>
            No specific Article 50 transparency obligations apply to this system. The system 
            operates as a backend processing tool without direct interaction with affected persons.
          </Text>
        </View>

        <Text style={baseStyles.h2}>Voluntary Disclosures Implemented</Text>
        <Text style={baseStyles.paragraph}>
          Although not required by Article 50, the following transparency measures have been 
          voluntarily implemented as best practice:
        </Text>
        <View style={{ marginLeft: 15, marginBottom: 10 }}>
          <View style={baseStyles.bulletItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.bulletText}>Job application form includes AI screening disclosure</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.bulletText}>Privacy notice updated with AI processing information</Text>
          </View>
          <View style={baseStyles.bulletItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.bulletText}>Option for candidates to request human-only review</Text>
          </View>
        </View>

        <View style={baseStyles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{sampleData.generatedDate}</Text>
        </View>
      </Page>
    </Document>
  );
}

// Generate ZIP bundle
export async function generateSampleEvidencePackZIP(): Promise<Blob> {
  const zip = new JSZip();
  const packName = `EU-AI-Act_EvidencePack_${sampleData.organization.replace(/\s+/g, "_")}_${sampleData.systemName.replace(/\s+/g, "_")}`;

  // Generate all PDFs
  const [
    executiveSummary,
    inventoryRecord,
    article26Checklist,
    humanOversightPlan,
    evidenceIndex,
    transparencyDisclosure,
  ] = await Promise.all([
    pdf(<ExecutiveSummaryPDF />).toBlob(),
    pdf(<InventoryRecordPDF />).toBlob(),
    pdf(<Article26ChecklistPDF />).toBlob(),
    pdf(<HumanOversightPlanPDF />).toBlob(),
    pdf(<EvidenceIndexPDF />).toBlob(),
    pdf(<TransparencyDisclosurePDF />).toBlob(),
  ]);

  // Create folder structure
  const folder00 = zip.folder("00_Executive");
  const folder01 = zip.folder("01_Inventory");
  const folder02 = zip.folder("02_Classification");
  const folder03 = zip.folder("03_Transparency_Article50");
  const folder04 = zip.folder("04_HighRisk_Deployer_Article26");
  const folder05 = zip.folder("05_Evidence");

  // Add files to folders
  folder00?.file("Executive_Summary.pdf", executiveSummary);
  folder01?.file("AI_System_Inventory_Record.pdf", inventoryRecord);
  folder02?.file("Classification_Memo.pdf", executiveSummary); // Would use actual classification memo
  folder03?.file("Transparency_Assessment.pdf", transparencyDisclosure);
  folder04?.file("Article26_Obligations_Checklist.pdf", article26Checklist);
  folder04?.file("Human_Oversight_Plan.pdf", humanOversightPlan);
  folder04?.file("FRIA_Report.pdf", executiveSummary); // Would use actual FRIA
  folder05?.file("Evidence_Index.pdf", evidenceIndex);

  // Add CSV evidence index
  const csvContent = `Evidence ID,Title,Type,Control,Date Collected,Owner,Status
EV-001,Vendor User Guide & Instructions,Document,DEP-01,2024-12-01,Sarah Chen,Approved
EV-002,Human Oversight Plan,Policy,DEP-02,2024-12-10,Sarah Chen,Approved
EV-003,Data Quality Procedures,SOP,DEP-04,2024-12-05,Data Team,Approved
EV-004,Monitoring Dashboard Config,Screenshot,DEP-05,2024-12-15,IT Ops,Approved
EV-005,Log Retention Policy,Policy,DEP-08,2024-11-20,IT Ops,Approved
EV-006,Worker Notification Email,Communication,DEP-09,2024-12-20,HR,Approved
EV-007,Incident Response Procedure,SOP,DEP-07,2024-11-15,Compliance,Approved
EV-008,FRIA Report,Assessment,DEP-11,2025-01-20,Sarah Chen,Approved
EV-009,Training Completion Report,Report,LIT-02,2025-01-15,HR,Approved
EV-010,Vendor Security Whitepaper,Document,VEN-03,2024-10-01,Vendor,Approved
EV-011,Bias Audit Report (Q4 2024),Audit,MON-01,2024-12-30,External,Approved
EV-012,Classification Memo,Assessment,CLS-01,2025-01-15,Compliance,Approved`;

  folder05?.file("Evidence_Index.csv", csvContent);

  // Add README
  const readme = `EU AI Act Evidence Pack
========================

Organisation: ${sampleData.organization}
AI System: ${sampleData.systemName}
System ID: ${sampleData.systemId}
Generated: ${sampleData.generatedDate}

This evidence pack contains all compliance documentation required under the 
EU AI Act for the above AI system.

Folder Structure:
- 00_Executive/ — Summary and table of contents
- 01_Inventory/ — AI system inventory record and metadata
- 02_Classification/ — Classification memo and screening results
- 03_Transparency_Article50/ — Article 50 transparency assessment
- 04_HighRisk_Deployer_Article26/ — Article 26 obligations and FRIA
- 05_Evidence/ — All supporting evidence files and index

Generated by Klarvo EU AI Act Compliance Hub
https://klarvo.lovable.app
`;

  zip.file("README.txt", readme);

  // Generate ZIP blob
  const zipBlob = await zip.generateAsync({ type: "blob" });
  return zipBlob;
}
