import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { baseStyles, colors } from "@/lib/pdfStyles";
import { RegulatoryBasisBanner } from "../RegulatoryBasisBanner";

const styles = StyleSheet.create({
  page: {
    ...baseStyles.page,
    paddingTop: 60,
  },
  header: {
    marginBottom: 25,
    marginTop: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.emerald,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 20,
  },
  commitmentBox: {
    backgroundColor: colors.emeraldLight,
    padding: 20,
    borderRadius: 8,
    marginBottom: 25,
    textAlign: "center",
  },
  commitmentTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.emerald,
    marginBottom: 8,
  },
  commitmentText: {
    fontSize: 10,
    color: colors.gray[700],
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.gray[800],
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: colors.emerald,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingLeft: 5,
  },
  checkmark: {
    fontSize: 12,
    color: colors.success,
    marginRight: 10,
    width: 18,
  },
  checklistText: {
    flex: 1,
    fontSize: 10,
    color: colors.gray[700],
    lineHeight: 1.5,
  },
  attestationBox: {
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 4,
  },
  attestationTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.gray[800],
    marginBottom: 10,
  },
  attestationText: {
    fontSize: 9,
    color: colors.gray[600],
    lineHeight: 1.5,
    marginBottom: 15,
  },
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  signatureBlock: {
    width: "45%",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[400],
    marginTop: 30,
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 8,
    color: colors.gray[500],
  },
  footer: {
    marginTop: "auto",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  footerText: {
    fontSize: 8,
    color: colors.gray[500],
    textAlign: "center",
  },
  redactedNote: {
    backgroundColor: colors.gray[100],
    padding: 8,
    borderRadius: 4,
    marginBottom: 15,
  },
  redactedText: {
    fontSize: 8,
    color: colors.gray[500],
    fontStyle: "italic",
  },
});

interface CustomerTrustPackData {
  organization: { name: string };
  generatedBy: string;
  rulesetVersion: string;
  timelineMode: "current_law" | "proposed_amendments" | "early_compliance";
  aiGovernanceStatement: string;
  transparencyPractices: string[];
  dataHandlingPractices: string[];
  vendorAttestations: Array<{
    vendorName: string;
    attestationType: string;
    validUntil?: string;
  }>;
  complianceHighlights: string[];
}

export function CustomerTrustPackPDF({
  organization,
  generatedBy,
  rulesetVersion,
  timelineMode,
  aiGovernanceStatement,
  transparencyPractices,
  dataHandlingPractices,
  vendorAttestations,
  complianceHighlights,
}: CustomerTrustPackData) {
  const generatedDate = format(new Date(), "PPP");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI Trust & Transparency Report</Text>
          <Text style={styles.subtitle}>{organization.name}</Text>
        </View>

        <RegulatoryBasisBanner
          rulesetVersion={rulesetVersion}
          timelineMode={timelineMode}
          generatedDate={generatedDate}
        />

        {/* Redaction Notice */}
        <View style={styles.redactedNote}>
          <Text style={styles.redactedText}>
            Note: This document has been prepared for external sharing. Internal identifiers, 
            employee names, and proprietary implementation details have been redacted.
          </Text>
        </View>

        {/* Commitment Statement */}
        <View style={styles.commitmentBox}>
          <Text style={styles.commitmentTitle}>Our Commitment to Responsible AI</Text>
          <Text style={styles.commitmentText}>{aiGovernanceStatement}</Text>
        </View>

        {/* Transparency Practices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transparency Practices</Text>
          {transparencyPractices.map((practice, idx) => (
            <View key={idx} style={styles.checklistItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.checklistText}>{practice}</Text>
            </View>
          ))}
        </View>

        {/* Data Handling */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Handling & Privacy</Text>
          {dataHandlingPractices.map((practice, idx) => (
            <View key={idx} style={styles.checklistItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.checklistText}>{practice}</Text>
            </View>
          ))}
        </View>

        {/* Compliance Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EU AI Act Compliance Highlights</Text>
          {complianceHighlights.map((highlight, idx) => (
            <View key={idx} style={styles.checklistItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.checklistText}>{highlight}</Text>
            </View>
          ))}
        </View>

        {/* Vendor Attestations */}
        {vendorAttestations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Third-Party AI Provider Attestations</Text>
            {vendorAttestations.map((attestation, idx) => (
              <View key={idx} style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 10, fontWeight: 600, color: colors.gray[800] }}>
                  {attestation.vendorName}
                </Text>
                <Text style={{ fontSize: 9, color: colors.gray[600] }}>
                  {attestation.attestationType}
                  {attestation.validUntil && ` • Valid until ${attestation.validUntil}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generated by Klarvo EU AI Act Compliance Hub • {generatedDate}
          </Text>
          <Text style={[styles.footerText, { marginTop: 4 }]}>
            For customer/partner sharing — {organization.name}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export type { CustomerTrustPackData };
