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
  alertBox: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#EF4444",
    padding: 12,
    borderRadius: 4,
    marginTop: 10,
  },
  alertTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#DC2626",
    marginBottom: 4,
  },
  alertText: {
    fontSize: 9,
    color: "#7F1D1D",
    lineHeight: 1.4,
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

export interface DistributorVerificationData {
  id: string;
  ai_system_id: string;
  verification_data: Record<string, boolean | null>;
  has_rebranded: boolean;
  has_modified: boolean;
  escalation_to_provider_triggered: boolean;
  escalation_notes: string | null;
  status: string;
  non_compliance_details: string | null;
  corrective_actions_taken: string | null;
  verified_by: string | null;
  verified_at: string | null;
  notes: string | null;
  created_at: string;
}

interface DistributorVerificationPDFProps {
  verification: DistributorVerificationData;
  systemName: string;
  organizationName: string;
  verifierName?: string;
  generatedBy: string;
}

const CHECKLIST_LABELS: Record<string, string> = {
  ce_marking_present: "CE marking is present and visible",
  doc_accompanies_system: "EU declaration of conformity accompanies the system",
  instructions_for_use_present: "Instructions for use are provided",
  provider_identified: "Provider is clearly identified",
  importer_identified: "Importer is identified (if applicable)",
  storage_transport_compliant: "Storage and transport conditions maintain compliance",
  no_modifications_made: "No modifications have been made to the AI system",
  no_rebranding_done: "No rebranding has been performed",
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

export function DistributorVerificationPDF({
  verification,
  systemName,
  organizationName,
  verifierName,
  generatedBy,
}: DistributorVerificationPDFProps) {
  const generatedAt = format(new Date(), "dd MMMM yyyy, HH:mm");
  const checklistItems = Object.entries(verification.verification_data || {});
  const completedCount = checklistItems.filter(([_, v]) => v === true).length;
  const totalCount = checklistItems.length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Distributor Verification Record</Text>
          <Text style={styles.subtitle}>
            Article 24 EU AI Act Compliance — {systemName}
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

        {/* Escalation Alert */}
        {verification.escalation_to_provider_triggered && (
          <View style={styles.section}>
            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>⚠ Article 25 Escalation Triggered</Text>
              <Text style={styles.alertText}>
                This distributor may be considered a Provider under Article 25 of the EU AI Act due to:
                {verification.has_rebranded && " rebranding the AI system under their name/trademark"}
                {verification.has_rebranded && verification.has_modified && " and"}
                {verification.has_modified && " making substantial modifications to the AI system"}.
                {"\n\n"}Provider obligations under Articles 16-22 may apply.
              </Text>
              {verification.escalation_notes && (
                <Text style={[styles.alertText, { marginTop: 8 }]}>
                  Notes: {verification.escalation_notes}
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Modification Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Modification & Rebranding Status</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Has Rebranded:</Text>
            <Text style={[styles.value, verification.has_rebranded ? { color: "#EF4444" } : {}]}>
              {verification.has_rebranded ? "Yes — Escalation Risk" : "No"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Has Modified:</Text>
            <Text style={[styles.value, verification.has_modified ? { color: "#EF4444" } : {}]}>
              {verification.has_modified ? "Yes — Escalation Risk" : "No"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Escalation Triggered:</Text>
            <Text style={[styles.value, verification.escalation_to_provider_triggered ? { color: "#EF4444", fontFamily: "Helvetica-Bold" } : {}]}>
              {verification.escalation_to_provider_triggered ? "YES — Provider Obligations Apply" : "No"}
            </Text>
          </View>
        </View>

        {/* Verification Checklist */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Article 24 Verification Checklist</Text>
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
            Distributor Verification — {organizationName}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
