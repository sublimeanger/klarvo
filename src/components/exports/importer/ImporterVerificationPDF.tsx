import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { colors } from "@/lib/pdfStyles";

const pdfColors = {
  primary: colors.emerald,
  foreground: colors.gray[800],
  mutedForeground: colors.gray[500],
  muted: colors.gray[100],
  border: colors.gray[200],
};

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: pdfColors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: pdfColors.mutedForeground,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: pdfColors.foreground,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: pdfColors.border,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: pdfColors.border,
  },
  label: {
    width: "40%",
    fontSize: 10,
    color: pdfColors.mutedForeground,
  },
  value: {
    width: "60%",
    fontSize: 10,
    color: pdfColors.foreground,
  },
  checklistTable: {
    marginTop: 10,
  },
  checklistHeader: {
    flexDirection: "row",
    backgroundColor: pdfColors.muted,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  checklistHeaderText: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: pdfColors.foreground,
  },
  checklistRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: pdfColors.border,
  },
  checklistItem: {
    width: "70%",
    fontSize: 10,
    color: pdfColors.foreground,
  },
  checklistStatus: {
    width: "30%",
    fontSize: 10,
    textAlign: "center",
  },
  statusCompliant: {
    color: "#10B981",
    fontFamily: "Helvetica-Bold",
  },
  statusNonCompliant: {
    color: "#EF4444",
    fontFamily: "Helvetica-Bold",
  },
  statusPending: {
    color: "#F59E0B",
  },
  infoBox: {
    backgroundColor: pdfColors.muted,
    padding: 12,
    borderRadius: 4,
    marginTop: 10,
  },
  infoText: {
    fontSize: 9,
    color: pdfColors.mutedForeground,
    lineHeight: 1.4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: pdfColors.border,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: pdfColors.mutedForeground,
  },
  signatureSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: pdfColors.border,
  },
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  signatureBlock: {
    width: "45%",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: pdfColors.foreground,
    marginBottom: 4,
  },
  signatureLabel: {
    fontSize: 9,
    color: pdfColors.mutedForeground,
  },
});

export interface ImporterVerificationData {
  id: string;
  ai_system_id: string;
  verification_data: Record<string, boolean | null>;
  provider_name: string | null;
  provider_address: string | null;
  provider_contact: string | null;
  authorised_rep_name: string | null;
  authorised_rep_address: string | null;
  status: string;
  non_compliance_details: string | null;
  corrective_actions_taken: string | null;
  verified_by: string | null;
  verified_at: string | null;
  notes: string | null;
  created_at: string;
}

interface ImporterVerificationPDFProps {
  verification: ImporterVerificationData;
  systemName: string;
  organizationName: string;
  verifierName?: string;
  generatedBy: string;
}

const CHECKLIST_LABELS: Record<string, string> = {
  conformity_assessment_carried_out: "Conformity assessment has been carried out by provider",
  technical_documentation_available: "Technical documentation is available upon request",
  instructions_for_use_available: "Instructions for use accompany the AI system",
  ce_marking_affixed: "CE marking is correctly affixed",
  doc_accompanies_system: "EU declaration of conformity accompanies the system",
  provider_identified: "Provider is identified on the system or packaging",
  authorised_rep_appointed: "Authorised representative is appointed (if provider outside EU)",
  contact_point_established: "Contact point for national authorities is established",
  storage_transport_compliant: "Storage and transport conditions are compliant",
  corrective_actions_cooperated: "Cooperation with corrective actions is confirmed",
};

function getStatusText(value: boolean | null): string {
  if (value === true) return "✓ Verified";
  if (value === false) return "✗ Not Verified";
  return "— Pending";
}

function getStatusStyle(value: boolean | null) {
  if (value === true) return styles.statusCompliant;
  if (value === false) return styles.statusNonCompliant;
  return styles.statusPending;
}

export function ImporterVerificationPDF({
  verification,
  systemName,
  organizationName,
  verifierName,
  generatedBy,
}: ImporterVerificationPDFProps) {
  const generatedAt = format(new Date(), "dd MMMM yyyy, HH:mm");
  const checklistItems = Object.entries(verification.verification_data || {});
  const completedCount = checklistItems.filter(([_, v]) => v === true).length;
  const totalCount = checklistItems.length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Importer Verification Record</Text>
          <Text style={styles.subtitle}>
            Article 23 EU AI Act Compliance — {systemName}
          </Text>
        </View>

        {/* System & Organization Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. General Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Organization:</Text>
            <Text style={styles.value}>{organizationName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>AI System:</Text>
            <Text style={styles.value}>{systemName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Verification Status:</Text>
            <Text style={styles.value}>{verification.status?.replace(/_/g, " ").toUpperCase()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Completion:</Text>
            <Text style={styles.value}>{completedCount} of {totalCount} items verified</Text>
          </View>
        </View>

        {/* Provider Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Provider Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Provider Name:</Text>
            <Text style={styles.value}>{verification.provider_name || "Not specified"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Provider Address:</Text>
            <Text style={styles.value}>{verification.provider_address || "Not specified"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Provider Contact:</Text>
            <Text style={styles.value}>{verification.provider_contact || "Not specified"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Authorised Rep. Name:</Text>
            <Text style={styles.value}>{verification.authorised_rep_name || "Not applicable"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Authorised Rep. Address:</Text>
            <Text style={styles.value}>{verification.authorised_rep_address || "Not applicable"}</Text>
          </View>
        </View>

        {/* Verification Checklist */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Article 23 Verification Checklist</Text>
          <View style={styles.checklistTable}>
            <View style={styles.checklistHeader}>
              <Text style={[styles.checklistHeaderText, { width: "70%" }]}>Requirement</Text>
              <Text style={[styles.checklistHeaderText, { width: "30%", textAlign: "center" }]}>Status</Text>
            </View>
            {checklistItems.map(([key, value]) => (
              <View key={key} style={styles.checklistRow}>
                <Text style={styles.checklistItem}>
                  {CHECKLIST_LABELS[key] || key.replace(/_/g, " ")}
                </Text>
                <Text style={[styles.checklistStatus, getStatusStyle(value)]}>
                  {getStatusText(value)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Non-compliance & Corrective Actions */}
        {(verification.non_compliance_details || verification.corrective_actions_taken) && (
          <View style={styles.section} break>
            <Text style={styles.sectionTitle}>4. Non-Compliance & Corrective Actions</Text>
            {verification.non_compliance_details && (
              <View style={styles.infoBox}>
                <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold", marginBottom: 4 }}>
                  Non-Compliance Details:
                </Text>
                <Text style={styles.infoText}>{verification.non_compliance_details}</Text>
              </View>
            )}
            {verification.corrective_actions_taken && (
              <View style={[styles.infoBox, { marginTop: 10 }]}>
                <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold", marginBottom: 4 }}>
                  Corrective Actions Taken:
                </Text>
                <Text style={styles.infoText}>{verification.corrective_actions_taken}</Text>
              </View>
            )}
          </View>
        )}

        {/* Notes */}
        {verification.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Additional Notes</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{verification.notes}</Text>
            </View>
          </View>
        )}

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold", marginBottom: 10 }}>
            Verification Sign-off
          </Text>
          <View style={styles.signatureRow}>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Verified By: {verifierName || "—"}</Text>
              <Text style={styles.signatureLabel}>
                Date: {verification.verified_at ? format(new Date(verification.verified_at), "dd MMM yyyy") : "—"}
              </Text>
            </View>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Compliance Officer Approval</Text>
              <Text style={styles.signatureLabel}>Date:</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Generated: {generatedAt} by {generatedBy}
          </Text>
          <Text style={styles.footerText}>
            Importer Verification — {organizationName}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
