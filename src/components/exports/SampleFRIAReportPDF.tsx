import { Document, Page, Text, View, StyleSheet, Font, Image, pdf } from "@react-pdf/renderer";
import { KLARVO_LOGO_BASE64, WATERMARK_CONFIG } from "@/lib/pdfAssets";

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff", fontWeight: 700 },
  ],
});

// Brand colors - using Klarvo emerald palette
const emerald = "#0d9373";
const emeraldLight = "#e6f7f3";
const gray = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827",
};

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
    height: "100%",
  },
  coverBadge: {
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
  coverTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: gray[900],
    marginBottom: 8,
  },
  coverSubtitle: {
    fontSize: 16,
    fontWeight: 600,
    color: emerald,
    marginBottom: 30,
  },
  coverSystemName: {
    fontSize: 20,
    fontWeight: 700,
    color: gray[800],
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: emerald,
  },
  coverMeta: {
    fontSize: 10,
    color: gray[500],
    marginBottom: 6,
  },
  coverMetaLabel: {
    fontWeight: 600,
    color: gray[800],
  },
  coverFooter: {
    marginTop: "auto",
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: gray[200],
  },
  articleBadge: {
    backgroundColor: emeraldLight,
    color: emerald,
    fontSize: 10,
    fontWeight: 600,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 15,
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
    color: gray[500],
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  headerPage: {
    fontSize: 8,
    color: gray[500],
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: emerald,
    marginBottom: 12,
    marginTop: 5,
  },
  articleRef: {
    fontSize: 9,
    color: emerald,
    fontWeight: 600,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  h2: {
    fontSize: 12,
    fontWeight: 700,
    color: gray[800],
    marginBottom: 8,
    marginTop: 15,
  },
  h3: {
    fontSize: 11,
    fontWeight: 600,
    color: gray[700],
    marginBottom: 6,
    marginTop: 10,
  },
  paragraph: {
    fontSize: 10,
    color: gray[800],
    marginBottom: 8,
    lineHeight: 1.6,
  },
  label: {
    fontSize: 9,
    fontWeight: 600,
    color: gray[500],
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 10,
    color: gray[800],
    marginBottom: 12,
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
  table: {
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: gray[200],
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
  tableHeaderCellWide: {
    flex: 2,
    fontSize: 9,
    fontWeight: 700,
    color: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: gray[200],
    padding: 10,
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: gray[200],
    padding: 10,
    backgroundColor: gray[50],
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    color: gray[800],
  },
  tableCellWide: {
    flex: 2,
    fontSize: 9,
    color: gray[800],
  },
  riskBadgeHigh: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    fontSize: 8,
    fontWeight: 600,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  riskBadgeMedium: {
    backgroundColor: "#fef3c7",
    color: "#d97706",
    fontSize: 8,
    fontWeight: 600,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  riskBadgeLow: {
    backgroundColor: "#dcfce7",
    color: "#16a34a",
    fontSize: 8,
    fontWeight: 600,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  mitigationBox: {
    backgroundColor: emeraldLight,
    padding: 12,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: emerald,
    borderRadius: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: gray[400],
    borderTopWidth: 1,
    borderTopColor: gray[200],
    paddingTop: 10,
  },
  signatureSection: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: gray[200],
    borderRadius: 4,
  },
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  signatureBlock: {
    width: "30%",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: gray[800],
    marginTop: 30,
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 8,
    color: gray[500],
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
    color: gray[800],
  },
  watermark: {
    position: "absolute",
    top: "45%",
    left: "15%",
    fontSize: 60,
    color: gray[300],
    transform: "rotate(-45deg)",
    opacity: 0.15,
  },
});

const sampleData = {
  systemName: "TalentMatch AI",
  systemId: "AI-SYS-2024-001",
  assessmentTitle: "FRIA — TalentMatch AI Recruitment System",
  assessmentOwner: "Sarah Chen, Head of People Operations",
  startDate: "December 10, 2024",
  deploymentDate: "February 1, 2025",
  approvedBy: "James Morrison, Compliance Lead",
  approvedDate: "January 20, 2025",
};

export function SampleFRIAReportPDF() {
  const generatedDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.watermark} fixed>SAMPLE REPORT</Text>
        
        <Image src={KLARVO_LOGO_BASE64} style={{ width: 80, marginBottom: 25 }} />
        
        <Text style={styles.coverBadge}>Fundamental Rights Impact Assessment</Text>
        
        <Text style={styles.coverTitle}>FRIA Report</Text>
        <Text style={styles.coverSubtitle}>Article 27 — EU AI Act Compliance</Text>
        
        <View style={{ marginTop: 40 }}>
          <Text style={styles.coverSystemName}>{sampleData.assessmentTitle}</Text>
          
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.coverMeta}>
                <Text style={styles.coverMetaLabel}>Assessment Owner: </Text>
                {sampleData.assessmentOwner}
              </Text>
              <Text style={styles.coverMeta}>
                <Text style={styles.coverMetaLabel}>Assessment Started: </Text>
                {sampleData.startDate}
              </Text>
              <Text style={styles.coverMeta}>
                <Text style={styles.coverMetaLabel}>Target Deployment: </Text>
                {sampleData.deploymentDate}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.coverMeta}>
                <Text style={styles.coverMetaLabel}>Linked System: </Text>
                {sampleData.systemId}
              </Text>
              <Text style={styles.coverMeta}>
                <Text style={styles.coverMetaLabel}>Approved By: </Text>
                {sampleData.approvedBy}
              </Text>
              <Text style={styles.coverMeta}>
                <Text style={styles.coverMetaLabel}>Approval Date: </Text>
                {sampleData.approvedDate}
              </Text>
            </View>
          </View>
          
          <Text style={styles.articleBadge}>Article 27 Compliant Assessment</Text>
        </View>
        
        <View style={styles.coverFooter}>
          <Text style={{ fontSize: 9, color: gray[500], marginBottom: 4 }}>
            This Fundamental Rights Impact Assessment has been completed in accordance with Article 27 
            of the EU AI Act for high-risk AI systems affecting employment decisions.
          </Text>
          <Text style={{ fontSize: 9, color: gray[500] }}>
            Generated by Klarvo EU AI Act Compliance Hub • {generatedDate}
          </Text>
        </View>
      </Page>

      {/* Page 2: Table of Contents */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FRIA Report — {sampleData.systemName}</Text>
          <Text style={styles.headerPage}>Page 2 of 8</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Table of Contents</Text>
        
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCellWide}>Section</Text>
            <Text style={styles.tableHeaderCell}>Article 27 Ref</Text>
            <Text style={styles.tableHeaderCell}>Page</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>1. Overview & Scope</Text>
            <Text style={styles.tableCell}>—</Text>
            <Text style={styles.tableCell}>3</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>2. Process Description</Text>
            <Text style={styles.tableCell}>Art. 27(a)</Text>
            <Text style={styles.tableCell}>3</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>3. Duration & Frequency</Text>
            <Text style={styles.tableCell}>Art. 27(b)</Text>
            <Text style={styles.tableCell}>4</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>4. Affected Groups</Text>
            <Text style={styles.tableCell}>Art. 27(c)</Text>
            <Text style={styles.tableCell}>4</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>5. Fundamental Rights Risk Analysis</Text>
            <Text style={styles.tableCell}>Art. 27(d)</Text>
            <Text style={styles.tableCell}>5</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>6. Human Oversight Measures</Text>
            <Text style={styles.tableCell}>Art. 27(e)</Text>
            <Text style={styles.tableCell}>6</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>7. Mitigation & Governance</Text>
            <Text style={styles.tableCell}>Art. 27(f)</Text>
            <Text style={styles.tableCell}>7</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>8. Final Conclusion & Approval</Text>
            <Text style={styles.tableCell}>—</Text>
            <Text style={styles.tableCell}>8</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            <Text style={{ fontWeight: 600 }}>Regulatory Basis: </Text>
            Article 27 of the EU AI Act requires deployers of high-risk AI systems to conduct 
            a Fundamental Rights Impact Assessment prior to first use. This assessment must be 
            updated when the AI system or its use significantly changes, and results must be 
            notified to the relevant market surveillance authority using the prescribed template.
          </Text>
        </View>

        <Text style={styles.h2}>Assessment Metadata</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>First Use Assessment</Text>
            <Text style={styles.tableCell}>Yes</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCell}>DPIA Completed</Text>
            <Text style={styles.tableCell}>Yes (December 2024)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Assessment Status</Text>
            <Text style={styles.tableCell}>Approved with Mitigations</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Page 3: Process Description */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FRIA Report — {sampleData.systemName}</Text>
          <Text style={styles.headerPage}>Page 3 of 8</Text>
        </View>
        
        <Text style={styles.sectionTitle}>1. Overview & Scope</Text>
        <Text style={styles.paragraph}>
          This Fundamental Rights Impact Assessment evaluates the deployment of TalentMatch AI, 
          an automated CV screening and candidate ranking system, within the organisation's 
          recruitment process. The system is classified as high-risk under Annex III, Point 4 
          (Employment and Worker Management) of the EU AI Act.
        </Text>

        <Text style={styles.sectionTitle}>2. Process Description</Text>
        <Text style={styles.articleRef}>Article 27(a) — Deployer's Processes</Text>
        
        <Text style={styles.h3}>2.1 Process Where AI Is Used</Text>
        <Text style={styles.paragraph}>
          TalentMatch AI is integrated into the initial candidate screening phase of our 
          recruitment workflow. When job applications are received through our careers portal, 
          the system automatically:
        </Text>
        <View style={{ marginLeft: 15, marginBottom: 10 }}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Parses CV content and extracts qualifications, skills, and experience</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Compares extracted data against job requirement criteria</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Generates a match score (0-100) for each candidate</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Produces a ranked shortlist recommendation for recruiter review</Text>
          </View>
        </View>

        <Text style={styles.h3}>2.2 Intended Purpose</Text>
        <Text style={styles.paragraph}>
          The system aims to reduce time-to-hire by automating initial CV screening, allowing 
          recruiters to focus on high-potential candidates. It is intended to improve consistency 
          in screening criteria application across all applications.
        </Text>

        <Text style={styles.h3}>2.3 Decision Points Affected</Text>
        <Text style={styles.paragraph}>
          The AI system influences the following decisions:
        </Text>
        <View style={{ marginLeft: 15, marginBottom: 10 }}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>1.</Text>
            <Text style={styles.bulletText}>Whether a candidate progresses to first-round interview</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>2.</Text>
            <Text style={styles.bulletText}>Priority order for recruiter review</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>3.</Text>
            <Text style={styles.bulletText}>Automatic rejection of candidates below minimum threshold (if enabled)</Text>
          </View>
        </View>

        <Text style={styles.h3}>2.4 Human Oversight in Process</Text>
        <Text style={styles.paragraph}>
          All AI-generated recommendations are reviewed by qualified recruiters before any 
          candidate communication. The system operates in "Human-in-the-Loop" mode, meaning 
          no automated rejections are sent without human approval.
        </Text>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Page 4: Duration & Affected Groups */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FRIA Report — {sampleData.systemName}</Text>
          <Text style={styles.headerPage}>Page 4 of 8</Text>
        </View>
        
        <Text style={styles.sectionTitle}>3. Duration & Frequency</Text>
        <Text style={styles.articleRef}>Article 27(b) — Time Period and Frequency</Text>
        
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Deployment Duration</Text>
            <Text style={styles.tableCell}>Indefinite (ongoing recruitment tool)</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCell}>Usage Frequency</Text>
            <Text style={styles.tableCell}>Continuous (processes applications daily)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Estimated Volume</Text>
            <Text style={styles.tableCell}>500-1,000 applications per month</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCell}>Review Cycle</Text>
            <Text style={styles.tableCell}>Quarterly performance and bias audits</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>4. Affected Groups</Text>
        <Text style={styles.articleRef}>Article 27(c) — Categories of Affected Persons</Text>
        
        <Text style={styles.h3}>4.1 Primary Affected Persons</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCellWide}>Affected Group</Text>
            <Text style={styles.tableHeaderCell}>Impact Type</Text>
            <Text style={styles.tableHeaderCell}>Scale</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>Job applicants</Text>
            <Text style={styles.tableCell}>Direct — employment access</Text>
            <Text style={styles.tableCell}>~10,000/year</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>Recruiters (employees)</Text>
            <Text style={styles.tableCell}>Indirect — workflow change</Text>
            <Text style={styles.tableCell}>~15 staff</Text>
          </View>
        </View>

        <Text style={styles.h3}>4.2 Vulnerable Groups Assessment</Text>
        <Text style={styles.paragraph}>
          <Text style={{ fontWeight: 600 }}>Potentially present: </Text>
          Applicants from diverse backgrounds, non-native language speakers, career changers, 
          candidates with non-traditional education paths, candidates with disabilities, 
          and older workers re-entering the workforce.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            <Text style={{ fontWeight: 600 }}>Accessibility Note: </Text>
            The organisation maintains an alternative application pathway for candidates who 
            require reasonable adjustments. Candidates can request human-only review of their 
            application through the careers portal or by contacting HR directly.
          </Text>
        </View>

        <Text style={styles.h3}>4.3 Notification Method</Text>
        <Text style={styles.paragraph}>
          Affected persons are informed about AI involvement through:
        </Text>
        <View style={{ marginLeft: 15, marginBottom: 10 }}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Clear disclosure on the job application form</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Updated privacy notice explaining AI-assisted screening</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Option to request human-only review</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Page 5: Risk Analysis */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FRIA Report — {sampleData.systemName}</Text>
          <Text style={styles.headerPage}>Page 5 of 8</Text>
        </View>
        
        <Text style={styles.sectionTitle}>5. Fundamental Rights Risk Analysis</Text>
        <Text style={styles.articleRef}>Article 27(d) — Specific Risks of Harm</Text>
        
        <Text style={styles.paragraph}>
          The following fundamental rights were assessed for potential harm from the deployment 
          of TalentMatch AI in the recruitment process:
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={{ ...styles.tableHeaderCell, flex: 2 }}>Right / Harm Category</Text>
            <Text style={styles.tableHeaderCell}>Likelihood</Text>
            <Text style={styles.tableHeaderCell}>Severity</Text>
            <Text style={styles.tableHeaderCell}>Risk Level</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableCell, flex: 2 }}>Non-discrimination & Fairness</Text>
            <Text style={styles.tableCell}>Medium</Text>
            <Text style={styles.tableCell}>High</Text>
            <View style={styles.tableCell}>
              <Text style={styles.riskBadgeHigh}>HIGH</Text>
            </View>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={{ ...styles.tableCell, flex: 2 }}>Privacy & Data Protection</Text>
            <Text style={styles.tableCell}>Low</Text>
            <Text style={styles.tableCell}>Medium</Text>
            <View style={styles.tableCell}>
              <Text style={styles.riskBadgeMedium}>MEDIUM</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableCell, flex: 2 }}>Access to Employment</Text>
            <Text style={styles.tableCell}>Medium</Text>
            <Text style={styles.tableCell}>High</Text>
            <View style={styles.tableCell}>
              <Text style={styles.riskBadgeHigh}>HIGH</Text>
            </View>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={{ ...styles.tableCell, flex: 2 }}>Due Process / Contestability</Text>
            <Text style={styles.tableCell}>Medium</Text>
            <Text style={styles.tableCell}>Medium</Text>
            <View style={styles.tableCell}>
              <Text style={styles.riskBadgeMedium}>MEDIUM</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableCell, flex: 2 }}>Human Dignity</Text>
            <Text style={styles.tableCell}>Low</Text>
            <Text style={styles.tableCell}>Low</Text>
            <View style={styles.tableCell}>
              <Text style={styles.riskBadgeLow}>LOW</Text>
            </View>
          </View>
        </View>

        <Text style={styles.h3}>5.1 Non-Discrimination Risk Details</Text>
        <Text style={styles.paragraph}>
          <Text style={{ fontWeight: 600 }}>Concern: </Text>
          Machine learning models trained on historical hiring data may perpetuate or amplify 
          existing biases related to gender, age, ethnicity, or educational background.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={{ fontWeight: 600 }}>Evidence: </Text>
          Initial vendor bias testing showed slight preference for candidates from certain 
          university types. The vendor has provided updated model (v2.3) with bias corrections.
        </Text>

        <Text style={styles.h3}>5.2 Access to Employment Risk Details</Text>
        <Text style={styles.paragraph}>
          <Text style={{ fontWeight: 600 }}>Concern: </Text>
          Automated filtering may incorrectly exclude qualified candidates due to CV formatting, 
          unconventional career paths, or keyword mismatches.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={{ fontWeight: 600 }}>Evidence: </Text>
          During pilot phase, 3% of manually reviewed "rejected" candidates were found to be 
          viable. Threshold adjustments implemented.
        </Text>

        <Text style={styles.h3}>5.3 Supporting Evidence</Text>
        <Text style={styles.paragraph}>
          See attached: Vendor Bias Audit Report (Dec 2024), Pilot Phase Analysis (Nov 2024), 
          DPIA Summary (Dec 2024).
        </Text>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Page 6: Human Oversight */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FRIA Report — {sampleData.systemName}</Text>
          <Text style={styles.headerPage}>Page 6 of 8</Text>
        </View>
        
        <Text style={styles.sectionTitle}>6. Human Oversight Measures</Text>
        <Text style={styles.articleRef}>Article 27(e) — Human Oversight Implementation</Text>
        
        <Text style={styles.h3}>6.1 Oversight Design</Text>
        <Text style={styles.paragraph}>
          The system operates in a "Human-in-the-Loop" (HITL) configuration. All AI-generated 
          recommendations are presented to qualified human recruiters for review before any 
          candidate is advanced or rejected. The system provides recommendations and supporting 
          reasoning, but final decisions rest with human operators.
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCellWide}>Oversight Measure</Text>
            <Text style={styles.tableHeaderCell}>Status</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>Named Oversight Owner</Text>
            <Text style={styles.tableCell}>✓ Sarah Chen, Head of People Ops</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>Authority to Stop/Suspend</Text>
            <Text style={styles.tableCell}>✓ Immediate suspension capability</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>Override Capability</Text>
            <Text style={styles.tableCell}>✓ All recommendations reviewable</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>Escalation Path</Text>
            <Text style={styles.tableCell}>✓ To Compliance Lead + vendor</Text>
          </View>
        </View>

        <Text style={styles.h3}>6.2 Competence & Training Requirements</Text>
        <Text style={styles.paragraph}>
          Operators of the TalentMatch AI system must complete:
        </Text>
        <View style={{ marginLeft: 15, marginBottom: 10 }}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Vendor-provided system training (4 hours)</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Internal AI literacy module (2 hours)</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Bias awareness and fair hiring refresher (1 hour)</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Annual re-certification requirement</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            <Text style={{ fontWeight: 600 }}>Training Status: </Text>
            12 of 15 recruitment team members have completed all required training modules. 
            Remaining 3 (new hires) scheduled for completion by January 31, 2025.
          </Text>
        </View>

        <Text style={styles.h3}>6.3 Intervention Authority</Text>
        <Text style={styles.paragraph}>
          The Oversight Owner has documented authority to:
        </Text>
        <View style={{ marginLeft: 15, marginBottom: 10 }}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Immediately suspend AI recommendations for any role or all roles</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Require human-only review for specific candidate pools</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Mandate system shutdown pending incident investigation</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Request vendor model adjustments or rollback</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Page 7: Mitigation & Governance */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FRIA Report — {sampleData.systemName}</Text>
          <Text style={styles.headerPage}>Page 7 of 8</Text>
        </View>
        
        <Text style={styles.sectionTitle}>7. Mitigation & Governance</Text>
        <Text style={styles.articleRef}>Article 27(f) — Mitigations, Governance & Complaints</Text>
        
        <Text style={styles.h3}>7.1 Risk Mitigations</Text>
        
        <View style={styles.mitigationBox}>
          <Text style={{ fontSize: 10, fontWeight: 600, color: emerald, marginBottom: 4 }}>
            HIGH RISK: Non-Discrimination
          </Text>
          <Text style={{ fontSize: 9, color: "#333" }}>
            <Text style={{ fontWeight: 600 }}>Mitigation: </Text>
            Quarterly bias audits by independent third party; vendor contractual obligation for 
            model fairness testing; monitoring dashboard for demographic distribution of outcomes; 
            human review of all borderline cases.
          </Text>
        </View>

        <View style={styles.mitigationBox}>
          <Text style={{ fontSize: 10, fontWeight: 600, color: emerald, marginBottom: 4 }}>
            HIGH RISK: Access to Employment
          </Text>
          <Text style={{ fontSize: 9, color: "#333" }}>
            <Text style={{ fontWeight: 600 }}>Mitigation: </Text>
            Conservative scoring thresholds (err toward inclusion); alternative application 
            pathway for human-only review; regular sampling of "rejected" pool to identify 
            false negatives; candidate feedback mechanism.
          </Text>
        </View>

        <View style={{ ...styles.mitigationBox, borderLeftColor: "#f59e0b", backgroundColor: "#fef3c7" }}>
          <Text style={{ fontSize: 10, fontWeight: 600, color: "#92400e", marginBottom: 4 }}>
            MEDIUM RISK: Due Process / Contestability
          </Text>
          <Text style={{ fontSize: 9, color: "#333" }}>
            <Text style={{ fontWeight: 600 }}>Mitigation: </Text>
            Clear explanation in rejection communications about AI involvement; documented 
            appeal process with human review guarantee; response SLA of 10 business days.
          </Text>
        </View>

        <Text style={styles.h3}>7.2 Governance Arrangements</Text>
        <View style={{ marginLeft: 15, marginBottom: 10 }}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Quarterly AI Governance Review Committee meeting</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Monthly performance and fairness metrics reporting</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Annual external audit of AI recruitment systems</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Vendor SLA with 48-hour incident response</Text>
          </View>
        </View>

        <Text style={styles.h3}>7.3 Complaint Mechanism</Text>
        <Text style={styles.paragraph}>
          Candidates may raise concerns or request review through:
        </Text>
        <View style={{ marginLeft: 15, marginBottom: 10 }}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Dedicated email: recruitment-appeals@company.com</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Online form accessible from rejection notification</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Data protection rights request (via DPO)</Text>
          </View>
        </View>

        <Text style={styles.h3}>7.4 Monitoring & Reassessment Triggers</Text>
        <Text style={styles.paragraph}>
          This FRIA will be updated when:
        </Text>
        <View style={{ marginLeft: 15, marginBottom: 10 }}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Vendor releases major model update (v3.0+)</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>System is expanded to new job categories or regions</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Bias audit identifies statistically significant disparities</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Serious incident is reported or regulatory guidance changes</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Page 8: Conclusion & Approval */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FRIA Report — {sampleData.systemName}</Text>
          <Text style={styles.headerPage}>Page 8 of 8</Text>
        </View>
        
        <Text style={styles.sectionTitle}>8. Final Conclusion & Approval</Text>
        
        <View style={{ backgroundColor: "#dcfce7", padding: 20, borderRadius: 6, marginVertical: 15 }}>
          <Text style={{ fontSize: 10, fontWeight: 600, color: "#166534", marginBottom: 8 }}>
            ASSESSMENT CONCLUSION
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 700, color: "#166534", marginBottom: 10 }}>
            APPROVED WITH MITIGATIONS
          </Text>
          <Text style={{ fontSize: 10, color: "#14532d" }}>
            This AI system may be deployed provided all documented mitigation measures are 
            implemented and maintained. The identified high-risk areas (non-discrimination, 
            access to employment) require ongoing monitoring through quarterly bias audits 
            and monthly metrics review.
          </Text>
        </View>

        <Text style={styles.h3}>Conditions for Deployment</Text>
        <View style={{ marginLeft: 15, marginBottom: 15 }}>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>1.</Text>
            <Text style={styles.bulletText}>All recruitment team members complete required training before go-live</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>2.</Text>
            <Text style={styles.bulletText}>Bias monitoring dashboard operational from day one</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>3.</Text>
            <Text style={styles.bulletText}>Alternative application pathway live on careers portal</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>4.</Text>
            <Text style={styles.bulletText}>Privacy notice updated with AI disclosure language</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>5.</Text>
            <Text style={styles.bulletText}>First external bias audit scheduled within 90 days</Text>
          </View>
        </View>

        <Text style={styles.h3}>Authority Notification</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Notification Required?</Text>
            <Text style={styles.tableCell}>No (private sector deployer)</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCell}>Reason</Text>
            <Text style={styles.tableCell}>Not a public authority or providing public service</Text>
          </View>
        </View>

        <View style={styles.signatureSection}>
          <Text style={{ fontSize: 11, fontWeight: 600, color: "#333", marginBottom: 5 }}>Approval Sign-Off</Text>
          <Text style={{ fontSize: 9, color: "#666", marginBottom: 15 }}>
            This FRIA has been reviewed and approved in accordance with Article 27 of the EU AI Act.
          </Text>
          <View style={styles.signatureRow}>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Assessment Owner</Text>
              <Text style={{ fontSize: 8, color: "#333", marginTop: 3 }}>{sampleData.assessmentOwner}</Text>
            </View>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Compliance Approver</Text>
              <Text style={{ fontSize: 8, color: "#333", marginTop: 3 }}>{sampleData.approvedBy}</Text>
            </View>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Date</Text>
              <Text style={{ fontSize: 8, color: "#333", marginTop: 3 }}>{sampleData.approvedDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generateSampleFRIAReportPDF(): Promise<Blob> {
  const doc = <SampleFRIAReportPDF />;
  const blob = await pdf(doc).toBlob();
  return blob;
}
