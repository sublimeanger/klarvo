import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1 solid #e5e7eb",
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  meta: {
    marginTop: 10,
    flexDirection: "row",
    gap: 20,
  },
  metaItem: {
    fontSize: 9,
    color: "#6b7280",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1f2937",
    backgroundColor: "#f3f4f6",
    padding: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
    paddingBottom: 6,
    borderBottom: "0.5 solid #e5e7eb",
  },
  label: {
    width: "30%",
    fontWeight: "bold",
    color: "#374151",
  },
  value: {
    width: "70%",
    color: "#1f2937",
  },
  badge: {
    padding: "4 8",
    borderRadius: 4,
    fontSize: 9,
    fontWeight: "bold",
  },
  badgeHighRisk: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
  },
  badgeLimitedRisk: {
    backgroundColor: "#fefce8",
    color: "#ca8a04",
  },
  badgeMinimalRisk: {
    backgroundColor: "#f0fdf4",
    color: "#16a34a",
  },
  badgeNotClassified: {
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: "1 solid #e5e7eb",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color: "#9ca3af",
  },
  watermark: {
    position: "absolute",
    top: "45%",
    left: "25%",
    fontSize: 60,
    color: "#e5e7eb",
    transform: "rotate(-45deg)",
    opacity: 0.3,
  },
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5 solid #e5e7eb",
    paddingVertical: 6,
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  paragraph: {
    marginBottom: 8,
    lineHeight: 1.4,
  },
});

interface AISystemData {
  id: string;
  name: string;
  description?: string | null;
  department?: string | null;
  lifecycle_status: string;
  vendor?: { name: string } | null;
  primary_owner?: { full_name: string | null } | null;
  classification?: {
    risk_level: string;
    is_ai_system?: boolean | null;
    has_prohibited_indicators?: boolean | null;
    is_high_risk_candidate?: boolean | null;
    has_transparency_obligations?: boolean | null;
    high_risk_categories?: string[] | null;
    transparency_categories?: string[] | null;
    classification_rationale?: string | null;
    classified_at?: string | null;
  } | null;
  created_at: string;
}

interface Props {
  system: AISystemData;
  organization: { name: string };
  generatedBy: string;
  showWatermark?: boolean;
}

const getRiskBadgeStyle = (riskLevel: string) => {
  switch (riskLevel) {
    case "high_risk":
      return styles.badgeHighRisk;
    case "limited_risk":
      return styles.badgeLimitedRisk;
    case "minimal_risk":
      return styles.badgeMinimalRisk;
    default:
      return styles.badgeNotClassified;
  }
};

const formatRiskLevel = (level: string) => {
  switch (level) {
    case "high_risk":
      return "High Risk";
    case "limited_risk":
      return "Limited Risk (Transparency)";
    case "minimal_risk":
      return "Minimal Risk";
    case "prohibited":
      return "Prohibited";
    default:
      return "Not Classified";
  }
};

export function AISystemPDF({ system, organization, generatedBy, showWatermark = false }: Props) {
  const classification = system.classification;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {showWatermark && (
          <Text style={styles.watermark}>FREE TIER</Text>
        )}

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI System Evidence Pack</Text>
          <Text style={styles.subtitle}>{system.name}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaItem}>Organization: {organization.name}</Text>
            <Text style={styles.metaItem}>Generated: {format(new Date(), "PPP")}</Text>
            <Text style={styles.metaItem}>By: {generatedBy}</Text>
          </View>
        </View>

        {/* System Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. System Overview</Text>
          <View style={styles.row}>
            <Text style={styles.label}>System Name</Text>
            <Text style={styles.value}>{system.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{system.description || "—"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.value}>{system.department || "—"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vendor</Text>
            <Text style={styles.value}>{system.vendor?.name || "—"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Primary Owner</Text>
            <Text style={styles.value}>{system.primary_owner?.full_name || "Unassigned"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{system.lifecycle_status}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Created</Text>
            <Text style={styles.value}>{format(new Date(system.created_at), "PPP")}</Text>
          </View>
        </View>

        {/* Classification */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. EU AI Act Classification</Text>
          {classification ? (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Risk Level</Text>
                <View style={[styles.badge, getRiskBadgeStyle(classification.risk_level)]}>
                  <Text>{formatRiskLevel(classification.risk_level)}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Is AI System</Text>
                <Text style={styles.value}>
                  {classification.is_ai_system === true ? "Yes" : classification.is_ai_system === false ? "No" : "Not assessed"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Prohibited Indicators</Text>
                <Text style={styles.value}>
                  {classification.has_prohibited_indicators === true ? "Yes - Review Required" : "None Found"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>High-Risk Candidate</Text>
                <Text style={styles.value}>
                  {classification.is_high_risk_candidate === true ? "Yes" : "No"}
                </Text>
              </View>
              {classification.high_risk_categories && classification.high_risk_categories.length > 0 && (
                <View style={styles.row}>
                  <Text style={styles.label}>High-Risk Categories</Text>
                  <Text style={styles.value}>{classification.high_risk_categories.join(", ")}</Text>
                </View>
              )}
              <View style={styles.row}>
                <Text style={styles.label}>Transparency Obligations</Text>
                <Text style={styles.value}>
                  {classification.has_transparency_obligations === true ? "Yes" : "No"}
                </Text>
              </View>
              {classification.transparency_categories && classification.transparency_categories.length > 0 && (
                <View style={styles.row}>
                  <Text style={styles.label}>Transparency Categories</Text>
                  <Text style={styles.value}>{classification.transparency_categories.join(", ")}</Text>
                </View>
              )}
              {classification.classification_rationale && (
                <View style={styles.row}>
                  <Text style={styles.label}>Rationale</Text>
                  <Text style={styles.value}>{classification.classification_rationale}</Text>
                </View>
              )}
              {classification.classified_at && (
                <View style={styles.row}>
                  <Text style={styles.label}>Classified Date</Text>
                  <Text style={styles.value}>{format(new Date(classification.classified_at), "PPP")}</Text>
                </View>
              )}
            </>
          ) : (
            <Text style={styles.paragraph}>
              This AI system has not been classified yet. Complete the classification wizard to assess risk level and applicable obligations.
            </Text>
          )}
        </View>

        {/* Applicable Obligations */}
        {classification && classification.risk_level !== "not_classified" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Applicable Obligations</Text>
            {classification.risk_level === "high_risk" && (
              <>
                <Text style={styles.paragraph}>
                  As a high-risk AI system, the following deployer obligations apply under Article 26:
                </Text>
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={styles.tableCell}>Obligation</Text>
                    <Text style={styles.tableCell}>Reference</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Use according to instructions</Text>
                    <Text style={styles.tableCell}>Art. 26(1)</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Assign competent human oversight</Text>
                    <Text style={styles.tableCell}>Art. 26(2)</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Ensure input data relevance</Text>
                    <Text style={styles.tableCell}>Art. 26(4)</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Monitor system operation</Text>
                    <Text style={styles.tableCell}>Art. 26(5)</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Keep logs for 6+ months</Text>
                    <Text style={styles.tableCell}>Art. 26(6)</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Inform workers (if workplace use)</Text>
                    <Text style={styles.tableCell}>Art. 26(7)</Text>
                  </View>
                </View>
              </>
            )}
            {classification.has_transparency_obligations && (
              <Text style={styles.paragraph}>
                Transparency obligations apply under Article 50. Users must be informed when interacting with AI, and synthetic content must be appropriately marked.
              </Text>
            )}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generated by Klarvo EU AI Act Compliance Hub
          </Text>
          <Text style={styles.footerText}>
            Page 1 of 1
          </Text>
        </View>
      </Page>
    </Document>
  );
}
