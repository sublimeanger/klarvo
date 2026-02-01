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

const emerald = "#0d9373";
const emeraldLight = "#e6f7f3";

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
    marginBottom: 40,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: "#111",
    marginBottom: 8,
  },
  coverSubtitle: {
    fontSize: 16,
    fontWeight: 600,
    color: emerald,
    marginBottom: 30,
  },
  coverSystemName: {
    fontSize: 22,
    fontWeight: 700,
    color: "#333",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: emerald,
  },
  coverMeta: {
    fontSize: 10,
    color: "#666",
    marginBottom: 6,
  },
  coverMetaLabel: {
    fontWeight: 600,
    color: "#333",
  },
  coverFooter: {
    marginTop: "auto",
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  classificationBadge: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    fontSize: 12,
    fontWeight: 700,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: emerald,
    marginBottom: 15,
    marginTop: 5,
  },
  h2: {
    fontSize: 13,
    fontWeight: 700,
    color: "#333",
    marginBottom: 8,
    marginTop: 18,
  },
  h3: {
    fontSize: 11,
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
    marginBottom: 12,
  },
  resultBox: {
    backgroundColor: emeraldLight,
    padding: 15,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: emerald,
    borderRadius: 4,
  },
  resultLabel: {
    fontSize: 9,
    fontWeight: 600,
    color: emerald,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111",
  },
  warningBox: {
    backgroundColor: "#fef3c7",
    padding: 15,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
    borderRadius: 4,
  },
  warningLabel: {
    fontSize: 9,
    fontWeight: 600,
    color: "#92400e",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  warningValue: {
    fontSize: 14,
    fontWeight: 700,
    color: "#92400e",
  },
  successBox: {
    backgroundColor: "#dcfce7",
    padding: 15,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#22c55e",
    borderRadius: 4,
  },
  successLabel: {
    fontSize: 9,
    fontWeight: 600,
    color: "#166534",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  successValue: {
    fontSize: 14,
    fontWeight: 700,
    color: "#166534",
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
  tableHeaderCellWide: {
    flex: 2,
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
  tableCellWide: {
    flex: 2,
    fontSize: 9,
    color: "#333",
  },
  checkItem: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  checkIcon: {
    width: 20,
    fontSize: 12,
    color: "#22c55e",
    fontWeight: 700,
  },
  crossIcon: {
    width: 20,
    fontSize: 12,
    color: "#ef4444",
    fontWeight: 700,
  },
  checkText: {
    flex: 1,
    fontSize: 10,
    color: "#333",
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
  signatureSection: {
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
  },
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  signatureBlock: {
    width: "45%",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginTop: 40,
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 9,
    color: "#666",
  },
});

// Sample data for the demo
const sampleData = {
  systemName: "TalentMatch AI",
  systemId: "AI-SYS-2024-001",
  version: "1.0",
  department: "Human Resources",
  owner: "Sarah Chen",
  vendor: "RecruitTech Solutions",
  purpose: "Automated CV screening and candidate ranking for job applications",
  classificationDate: "January 15, 2025",
  reviewer: "James Morrison, Compliance Lead",
  confidenceLevel: "High",
  riskLevel: "High-Risk Candidate",
};

export function SampleClassificationMemoPDF() {
  const generatedDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverBadge}>Classification Memo</Text>
        
        <Text style={styles.coverTitle}>EU AI Act</Text>
        <Text style={styles.coverSubtitle}>Risk Classification Assessment</Text>
        
        <View style={{ marginTop: 40 }}>
          <Text style={styles.coverSystemName}>{sampleData.systemName}</Text>
          
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.coverMeta}>
                <Text style={styles.coverMetaLabel}>System ID: </Text>
                {sampleData.systemId}
              </Text>
              <Text style={styles.coverMeta}>
                <Text style={styles.coverMetaLabel}>Department: </Text>
                {sampleData.department}
              </Text>
              <Text style={styles.coverMeta}>
                <Text style={styles.coverMetaLabel}>System Owner: </Text>
                {sampleData.owner}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.coverMeta}>
                <Text style={styles.coverMetaLabel}>Vendor: </Text>
                {sampleData.vendor}
              </Text>
              <Text style={styles.coverMeta}>
                <Text style={styles.coverMetaLabel}>Assessment Date: </Text>
                {sampleData.classificationDate}
              </Text>
              <Text style={styles.coverMeta}>
                <Text style={styles.coverMetaLabel}>Reviewed By: </Text>
                {sampleData.reviewer}
              </Text>
            </View>
          </View>
          
          <Text style={styles.classificationBadge}>⚠ HIGH-RISK CANDIDATE</Text>
        </View>
        
        <View style={styles.coverFooter}>
          <Text style={{ fontSize: 9, color: "#666", marginBottom: 4 }}>
            This document summarizes the EU AI Act risk classification for the above AI system.
          </Text>
          <Text style={{ fontSize: 9, color: "#666" }}>
            Generated by Klarvo EU AI Act Compliance Hub • {generatedDate}
          </Text>
        </View>
      </Page>

      {/* Page 2: AI Definition Test */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Classification Memo — {sampleData.systemName}</Text>
          <Text style={styles.headerPage}>Page 2 of 4</Text>
        </View>
        
        <Text style={styles.sectionTitle}>1. AI System Definition Test</Text>
        <Text style={styles.paragraph}>
          The first step in classification is determining whether the system meets the EU AI Act's 
          definition of an "AI system" as per Article 3(1).
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCellWide}>Assessment Criterion</Text>
            <Text style={styles.tableHeaderCell}>Result</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>Does the system infer outputs from inputs to achieve objectives?</Text>
            <Text style={styles.tableCell}>Yes ✓</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>What types of outputs does it produce?</Text>
            <Text style={styles.tableCell}>Recommendations, Scores, Classifications</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>Does it operate with some degree of autonomy?</Text>
            <Text style={styles.tableCell}>Yes ✓</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>Does it adapt or learn after deployment?</Text>
            <Text style={styles.tableCell}>No</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>Technical approach used?</Text>
            <Text style={styles.tableCell}>Machine Learning, NLP</Text>
          </View>
        </View>

        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Conclusion</Text>
          <Text style={styles.resultValue}>✓ Likely an AI System (High Confidence)</Text>
        </View>

        <Text style={styles.h2}>Rationale</Text>
        <Text style={styles.paragraph}>
          TalentMatch AI uses machine learning algorithms to analyze CV content, extract relevant 
          qualifications, and generate candidate rankings based on job requirements. The system 
          produces predictions (match scores) and recommendations (shortlist candidates) that influence 
          hiring decisions. It operates autonomously once configured, without requiring human intervention 
          for each CV processed. This meets the core criteria of inferring outputs from inputs with 
          a degree of autonomy, as defined in Article 3(1) of the EU AI Act.
        </Text>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Page 3: Prohibited Practices & High-Risk Screening */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Classification Memo — {sampleData.systemName}</Text>
          <Text style={styles.headerPage}>Page 3 of 4</Text>
        </View>
        
        <Text style={styles.sectionTitle}>2. Prohibited Practices Screening (Article 5)</Text>
        <Text style={styles.paragraph}>
          Article 5 of the EU AI Act prohibits certain AI practices that pose unacceptable risks.
          Each criterion was assessed against the system's functionality.
        </Text>

        <View style={{ marginVertical: 10 }}>
          <View style={styles.checkItem}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.checkText}>No subliminal manipulation or deceptive techniques</Text>
          </View>
          <View style={styles.checkItem}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.checkText}>No exploitation of vulnerable groups</Text>
          </View>
          <View style={styles.checkItem}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.checkText}>No social scoring for unrelated contexts</Text>
          </View>
          <View style={styles.checkItem}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.checkText}>No criminal profiling based solely on personality traits</Text>
          </View>
          <View style={styles.checkItem}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.checkText}>No untargeted facial recognition database building</Text>
          </View>
          <View style={styles.checkItem}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.checkText}>No emotion inference in workplace context</Text>
          </View>
          <View style={styles.checkItem}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.checkText}>No biometric categorisation of sensitive characteristics</Text>
          </View>
          <View style={styles.checkItem}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.checkText}>No real-time remote biometric identification</Text>
          </View>
        </View>

        <View style={styles.successBox}>
          <Text style={styles.successLabel}>Article 5 Result</Text>
          <Text style={styles.successValue}>✓ No Prohibited Indicators Found</Text>
        </View>

        <Text style={styles.sectionTitle}>3. High-Risk Screening (Annex III)</Text>
        <Text style={styles.paragraph}>
          Annex III of the EU AI Act identifies specific high-risk use cases that trigger 
          additional compliance obligations under Article 26.
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCellWide}>High-Risk Category</Text>
            <Text style={styles.tableHeaderCell}>Applicable?</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>Biometrics (identification, categorisation)</Text>
            <Text style={styles.tableCell}>No</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>Critical infrastructure</Text>
            <Text style={styles.tableCell}>No</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>Education & vocational training</Text>
            <Text style={styles.tableCell}>No</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>Employment & worker management</Text>
            <Text style={styles.tableCell}>Yes ⚠</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>Essential services (credit, insurance, housing)</Text>
            <Text style={styles.tableCell}>No</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>Law enforcement</Text>
            <Text style={styles.tableCell}>No</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>Migration, asylum, border control</Text>
            <Text style={styles.tableCell}>No</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>Justice & democratic processes</Text>
            <Text style={styles.tableCell}>No</Text>
          </View>
        </View>

        <View style={styles.warningBox}>
          <Text style={styles.warningLabel}>High-Risk Result</Text>
          <Text style={styles.warningValue}>⚠ High-Risk Candidate — Employment (Annex III, Point 4)</Text>
        </View>

        <View style={styles.footer}>
          <Text>Klarvo — Confidential</Text>
          <Text>{generatedDate}</Text>
        </View>
      </Page>

      {/* Page 4: Transparency & Final Classification */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Classification Memo — {sampleData.systemName}</Text>
          <Text style={styles.headerPage}>Page 4 of 4</Text>
        </View>
        
        <Text style={styles.sectionTitle}>4. Transparency Obligations (Article 50)</Text>
        <Text style={styles.paragraph}>
          Article 50 requires transparency measures for AI systems that interact with people, 
          generate synthetic content, or perform emotion recognition.
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCellWide}>Transparency Scenario</Text>
            <Text style={styles.tableHeaderCell}>Applicable?</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>Direct interaction with natural persons</Text>
            <Text style={styles.tableCell}>No (backend system)</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>Generates synthetic content (text, audio, video)</Text>
            <Text style={styles.tableCell}>No</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellWide}>Emotion recognition or biometric categorisation</Text>
            <Text style={styles.tableCell}>No</Text>
          </View>
          <View style={styles.tableRowAlt}>
            <Text style={styles.tableCellWide}>Deepfake generation or manipulation</Text>
            <Text style={styles.tableCell}>No</Text>
          </View>
        </View>

        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Transparency Result</Text>
          <Text style={styles.resultValue}>No additional Article 50 obligations apply</Text>
        </View>

        <Text style={styles.sectionTitle}>5. Final Classification Summary</Text>
        
        <View style={{ backgroundColor: "#fef3c7", padding: 20, borderRadius: 6, marginVertical: 15 }}>
          <Text style={{ fontSize: 10, fontWeight: 600, color: "#92400e", marginBottom: 8 }}>
            FINAL RISK CLASSIFICATION
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 700, color: "#92400e", marginBottom: 10 }}>
            HIGH-RISK CANDIDATE
          </Text>
          <Text style={{ fontSize: 10, color: "#78350f" }}>
            This AI system falls under Annex III, Point 4 (Employment and Worker Management) and 
            must comply with Article 26 deployer obligations. A Fundamental Rights Impact Assessment 
            (FRIA) should be conducted before deployment.
          </Text>
        </View>

        <Text style={styles.h2}>Next Steps</Text>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.checkItem}>
            <Text style={{ ...styles.checkIcon, color: emerald }}>1.</Text>
            <Text style={styles.checkText}>Complete Article 26 deployer obligations checklist</Text>
          </View>
          <View style={styles.checkItem}>
            <Text style={{ ...styles.checkIcon, color: emerald }}>2.</Text>
            <Text style={styles.checkText}>Conduct Fundamental Rights Impact Assessment (FRIA)</Text>
          </View>
          <View style={styles.checkItem}>
            <Text style={{ ...styles.checkIcon, color: emerald }}>3.</Text>
            <Text style={styles.checkText}>Establish human oversight procedures</Text>
          </View>
          <View style={styles.checkItem}>
            <Text style={{ ...styles.checkIcon, color: emerald }}>4.</Text>
            <Text style={styles.checkText}>Implement log retention (minimum 6 months)</Text>
          </View>
          <View style={styles.checkItem}>
            <Text style={{ ...styles.checkIcon, color: emerald }}>5.</Text>
            <Text style={styles.checkText}>Notify workers/representatives before deployment</Text>
          </View>
        </View>

        <View style={styles.signatureSection}>
          <Text style={{ fontSize: 11, fontWeight: 600, color: "#333", marginBottom: 5 }}>Review Sign-Off</Text>
          <Text style={{ fontSize: 9, color: "#666" }}>
            This classification has been reviewed and approved in accordance with the organisation's 
            AI governance procedures.
          </Text>
          <View style={styles.signatureRow}>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Reviewer Signature</Text>
              <Text style={{ fontSize: 9, color: "#333", marginTop: 4 }}>{sampleData.reviewer}</Text>
            </View>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Date</Text>
              <Text style={{ fontSize: 9, color: "#333", marginTop: 4 }}>{sampleData.classificationDate}</Text>
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

export async function generateSampleClassificationMemoPDF(): Promise<Blob> {
  const doc = <SampleClassificationMemoPDF />;
  const blob = await pdf(doc).toBlob();
  return blob;
}
