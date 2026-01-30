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
  coverPage: {
    padding: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#111827",
    textAlign: "center",
  },
  coverSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 40,
  },
  coverMeta: {
    marginTop: 60,
    padding: 20,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    width: "80%",
  },
  coverMetaRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  coverMetaLabel: {
    width: "40%",
    fontWeight: "bold",
    color: "#374151",
    fontSize: 10,
  },
  coverMetaValue: {
    width: "60%",
    color: "#1f2937",
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    borderBottom: "1 solid #e5e7eb",
    paddingBottom: 15,
  },
  pageHeader: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: "0.5 solid #e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageHeaderTitle: {
    fontSize: 9,
    color: "#6b7280",
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
  subsectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 10,
    color: "#374151",
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
  badgeSuccess: {
    backgroundColor: "#f0fdf4",
    color: "#16a34a",
  },
  badgeWarning: {
    backgroundColor: "#fefce8",
    color: "#ca8a04",
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
  tableCellWide: {
    flex: 2,
    paddingHorizontal: 4,
  },
  paragraph: {
    marginBottom: 8,
    lineHeight: 1.4,
  },
  tocItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottom: "0.5 solid #e5e7eb",
  },
  tocTitle: {
    fontSize: 11,
  },
  tocPage: {
    fontSize: 11,
    color: "#6b7280",
  },
  infoBox: {
    backgroundColor: "#eff6ff",
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    borderLeft: "3 solid #3b82f6",
  },
  infoBoxText: {
    fontSize: 9,
    color: "#1e40af",
    lineHeight: 1.4,
  },
  warningBox: {
    backgroundColor: "#fef3c7",
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    borderLeft: "3 solid #f59e0b",
  },
  warningBoxText: {
    fontSize: 9,
    color: "#92400e",
    lineHeight: 1.4,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  listBullet: {
    width: 15,
    color: "#6b7280",
  },
  listText: {
    flex: 1,
    color: "#1f2937",
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
  oversight_model?: string | null;
  human_involvement?: string | null;
  oversight_sop_status?: string | null;
  operators_trained?: string | null;
  has_automatic_logs?: string | null;
  log_storage_location?: string | null;
  log_retention_period?: string | null;
  can_export_logs?: string | null;
  processes_personal_data?: string | null;
  special_category_data?: string | null;
  dpia_status?: string | null;
  training_exists?: string | null;
  training_completion_status?: string | null;
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

const formatValue = (value: string | null | undefined, fallback = "—") => {
  if (!value) return fallback;
  return value.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
};

export function AISystemPDF({ system, organization, generatedBy, showWatermark = false }: Props) {
  const classification = system.classification;
  const generatedDate = format(new Date(), "PPP");
  const documentVersion = "1.0";

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
        {showWatermark && <Text style={styles.watermark}>FREE TIER</Text>}
        <View style={styles.coverPage}>
          <Text style={styles.coverTitle}>AI System Evidence Pack</Text>
          <Text style={styles.coverSubtitle}>{system.name}</Text>
          <Text style={{ fontSize: 12, color: "#6b7280", marginBottom: 20 }}>
            EU AI Act Compliance Documentation
          </Text>
          
          <View style={styles.coverMeta}>
            <View style={styles.coverMetaRow}>
              <Text style={styles.coverMetaLabel}>Organization:</Text>
              <Text style={styles.coverMetaValue}>{organization.name}</Text>
            </View>
            <View style={styles.coverMetaRow}>
              <Text style={styles.coverMetaLabel}>Document Version:</Text>
              <Text style={styles.coverMetaValue}>{documentVersion}</Text>
            </View>
            <View style={styles.coverMetaRow}>
              <Text style={styles.coverMetaLabel}>Generated Date:</Text>
              <Text style={styles.coverMetaValue}>{generatedDate}</Text>
            </View>
            <View style={styles.coverMetaRow}>
              <Text style={styles.coverMetaLabel}>Generated By:</Text>
              <Text style={styles.coverMetaValue}>{generatedBy}</Text>
            </View>
            <View style={styles.coverMetaRow}>
              <Text style={styles.coverMetaLabel}>Classification:</Text>
              <Text style={styles.coverMetaValue}>Internal / Shareable with Auditors</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Generated by Klarvo EU AI Act Compliance Hub</Text>
          <Text style={styles.footerText}>Page 1</Text>
        </View>
      </Page>

      {/* Table of Contents */}
      <Page size="A4" style={styles.page}>
        {showWatermark && <Text style={styles.watermark}>FREE TIER</Text>}
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>{system.name} - Evidence Pack</Text>
          <Text style={styles.pageHeaderTitle}>{organization.name}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Table of Contents</Text>
          
          <View style={styles.tocItem}>
            <Text style={styles.tocTitle}>1. Executive Summary</Text>
            <Text style={styles.tocPage}>3</Text>
          </View>
          <View style={styles.tocItem}>
            <Text style={styles.tocTitle}>2. System Overview</Text>
            <Text style={styles.tocPage}>3</Text>
          </View>
          <View style={styles.tocItem}>
            <Text style={styles.tocTitle}>3. EU AI Act Classification</Text>
            <Text style={styles.tocPage}>3</Text>
          </View>
          <View style={styles.tocItem}>
            <Text style={styles.tocTitle}>4. Applicable Obligations</Text>
            <Text style={styles.tocPage}>4</Text>
          </View>
          <View style={styles.tocItem}>
            <Text style={styles.tocTitle}>5. Human Oversight</Text>
            <Text style={styles.tocPage}>4</Text>
          </View>
          <View style={styles.tocItem}>
            <Text style={styles.tocTitle}>6. Logging & Record-keeping</Text>
            <Text style={styles.tocPage}>5</Text>
          </View>
          <View style={styles.tocItem}>
            <Text style={styles.tocTitle}>7. Data & Privacy</Text>
            <Text style={styles.tocPage}>5</Text>
          </View>
          <View style={styles.tocItem}>
            <Text style={styles.tocTitle}>8. Training & AI Literacy</Text>
            <Text style={styles.tocPage}>5</Text>
          </View>
          <View style={styles.tocItem}>
            <Text style={styles.tocTitle}>9. Vendor Information</Text>
            <Text style={styles.tocPage}>6</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Generated by Klarvo EU AI Act Compliance Hub</Text>
          <Text style={styles.footerText}>Page 2</Text>
        </View>
      </Page>

      {/* Page 3: Executive Summary & System Overview */}
      <Page size="A4" style={styles.page}>
        {showWatermark && <Text style={styles.watermark}>FREE TIER</Text>}
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>{system.name} - Evidence Pack</Text>
          <Text style={styles.pageHeaderTitle}>{organization.name}</Text>
        </View>

        {/* Executive Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Executive Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>System Name</Text>
            <Text style={styles.value}>{system.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Risk Level</Text>
            <View style={[styles.badge, getRiskBadgeStyle(classification?.risk_level || "not_classified")]}>
              <Text>{formatRiskLevel(classification?.risk_level || "not_classified")}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{formatValue(system.lifecycle_status)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Owner</Text>
            <Text style={styles.value}>{system.primary_owner?.full_name || "Unassigned"}</Text>
          </View>
        </View>

        {/* System Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. System Overview</Text>
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
            <Text style={styles.label}>Created</Text>
            <Text style={styles.value}>{format(new Date(system.created_at), "PPP")}</Text>
          </View>
        </View>

        {/* Classification */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. EU AI Act Classification</Text>
          {classification ? (
            <>
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
              This AI system has not been classified yet. Complete the classification wizard to assess risk level.
            </Text>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Generated by Klarvo EU AI Act Compliance Hub</Text>
          <Text style={styles.footerText}>Page 3</Text>
        </View>
      </Page>

      {/* Page 4: Applicable Obligations & Human Oversight */}
      <Page size="A4" style={styles.page}>
        {showWatermark && <Text style={styles.watermark}>FREE TIER</Text>}
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>{system.name} - Evidence Pack</Text>
          <Text style={styles.pageHeaderTitle}>{organization.name}</Text>
        </View>

        {/* Applicable Obligations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Applicable Obligations</Text>
          {classification?.risk_level === "high_risk" ? (
            <>
              <View style={styles.warningBox}>
                <Text style={styles.warningBoxText}>
                  As a high-risk AI system, deployer obligations under Article 26 apply. These requirements ensure proper use, oversight, and accountability.
                </Text>
              </View>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableCellWide}>Obligation</Text>
                  <Text style={styles.tableCell}>Reference</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellWide}>Use according to provider instructions</Text>
                  <Text style={styles.tableCell}>Art. 26(1)</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellWide}>Assign competent human oversight</Text>
                  <Text style={styles.tableCell}>Art. 26(2)</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellWide}>Ensure input data relevance & representativeness</Text>
                  <Text style={styles.tableCell}>Art. 26(4)</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellWide}>Monitor system operation</Text>
                  <Text style={styles.tableCell}>Art. 26(5)</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellWide}>Keep logs for minimum 6 months</Text>
                  <Text style={styles.tableCell}>Art. 26(6)</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellWide}>Inform workers (if workplace use)</Text>
                  <Text style={styles.tableCell}>Art. 26(7)</Text>
                </View>
              </View>
            </>
          ) : classification?.has_transparency_obligations ? (
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>
                Transparency obligations apply under Article 50. Users must be informed when interacting with AI, and synthetic content must be appropriately marked.
              </Text>
            </View>
          ) : (
            <Text style={styles.paragraph}>
              Based on the current classification, no specific high-risk or transparency obligations apply. Continue to follow AI governance best practices.
            </Text>
          )}
        </View>

        {/* Human Oversight */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Human Oversight</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Oversight Model</Text>
            <Text style={styles.value}>{formatValue(system.oversight_model)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Human Involvement</Text>
            <Text style={styles.value}>{formatValue(system.human_involvement)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Oversight SOP Status</Text>
            <Text style={styles.value}>{formatValue(system.oversight_sop_status)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Operators Trained</Text>
            <Text style={styles.value}>{formatValue(system.operators_trained)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Generated by Klarvo EU AI Act Compliance Hub</Text>
          <Text style={styles.footerText}>Page 4</Text>
        </View>
      </Page>

      {/* Page 5: Logging, Data & Privacy, Training */}
      <Page size="A4" style={styles.page}>
        {showWatermark && <Text style={styles.watermark}>FREE TIER</Text>}
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>{system.name} - Evidence Pack</Text>
          <Text style={styles.pageHeaderTitle}>{organization.name}</Text>
        </View>

        {/* Logging & Record-keeping */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Logging & Record-keeping</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Automatic Logs</Text>
            <Text style={styles.value}>{formatValue(system.has_automatic_logs)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Log Storage Location</Text>
            <Text style={styles.value}>{formatValue(system.log_storage_location)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Retention Period</Text>
            <Text style={styles.value}>{formatValue(system.log_retention_period)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Can Export Logs</Text>
            <Text style={styles.value}>{formatValue(system.can_export_logs)}</Text>
          </View>
          {classification?.risk_level === "high_risk" && (
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>
                Article 26(6) requires deployers to keep logs under their control for at least 6 months, unless otherwise specified by law.
              </Text>
            </View>
          )}
        </View>

        {/* Data & Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Data & Privacy</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Processes Personal Data</Text>
            <Text style={styles.value}>{formatValue(system.processes_personal_data)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Special Category Data</Text>
            <Text style={styles.value}>{formatValue(system.special_category_data)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>DPIA Status</Text>
            <Text style={styles.value}>{formatValue(system.dpia_status)}</Text>
          </View>
        </View>

        {/* Training & AI Literacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Training & AI Literacy</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Training Exists</Text>
            <Text style={styles.value}>{formatValue(system.training_exists)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Completion Status</Text>
            <Text style={styles.value}>{formatValue(system.training_completion_status)}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxText}>
              Article 4 requires providers and deployers to take measures to ensure sufficient AI literacy of staff and others operating AI on their behalf.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Generated by Klarvo EU AI Act Compliance Hub</Text>
          <Text style={styles.footerText}>Page 5</Text>
        </View>
      </Page>

      {/* Page 6: Vendor Information */}
      <Page size="A4" style={styles.page}>
        {showWatermark && <Text style={styles.watermark}>FREE TIER</Text>}
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderTitle}>{system.name} - Evidence Pack</Text>
          <Text style={styles.pageHeaderTitle}>{organization.name}</Text>
        </View>

        {/* Vendor Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Vendor Information</Text>
          {system.vendor ? (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Vendor Name</Text>
                <Text style={styles.value}>{system.vendor.name}</Text>
              </View>
              <Text style={styles.paragraph}>
                For detailed vendor attestations, security documentation, and contract information, refer to the vendor profile in the Klarvo platform.
              </Text>
            </>
          ) : (
            <Text style={styles.paragraph}>
              No vendor associated with this AI system. This may indicate an internally-built system or that vendor information has not been recorded.
            </Text>
          )}
        </View>

        {/* Document Control */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Document Control</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Document Version</Text>
            <Text style={styles.value}>{documentVersion}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Generated</Text>
            <Text style={styles.value}>{generatedDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Generated By</Text>
            <Text style={styles.value}>{generatedBy}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>System ID</Text>
            <Text style={styles.value}>{system.id}</Text>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={{ marginTop: 40, padding: 15, backgroundColor: "#f9fafb", borderRadius: 4 }}>
          <Text style={{ fontSize: 9, fontWeight: "bold", marginBottom: 6, color: "#374151" }}>
            Disclaimer
          </Text>
          <Text style={{ fontSize: 8, color: "#6b7280", lineHeight: 1.4 }}>
            This document is generated based on information entered into the Klarvo platform. It is intended to support EU AI Act compliance efforts but does not constitute legal advice. Organizations should consult qualified legal counsel to ensure full compliance with applicable regulations. The accuracy of this document depends on the completeness and accuracy of the underlying data.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Generated by Klarvo EU AI Act Compliance Hub</Text>
          <Text style={styles.footerText}>Page 6</Text>
        </View>
      </Page>
    </Document>
  );
}
