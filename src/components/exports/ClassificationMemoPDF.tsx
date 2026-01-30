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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1f2937",
    backgroundColor: "#f3f4f6",
    padding: 6,
  },
  subsectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 8,
    color: "#374151",
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
    paddingBottom: 4,
  },
  label: {
    width: "35%",
    fontWeight: "bold",
    color: "#374151",
    fontSize: 9,
  },
  value: {
    width: "65%",
    color: "#1f2937",
    fontSize: 9,
  },
  badge: {
    padding: "3 6",
    borderRadius: 3,
    fontSize: 8,
    fontWeight: "bold",
  },
  badgeProhibited: {
    backgroundColor: "#1f2937",
    color: "#ffffff",
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
  paragraph: {
    marginBottom: 6,
    lineHeight: 1.4,
    fontSize: 9,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 8,
  },
  bullet: {
    width: 12,
    fontSize: 9,
  },
  listText: {
    flex: 1,
    fontSize: 9,
  },
  verdictBox: {
    padding: 10,
    marginVertical: 8,
    borderRadius: 4,
  },
  verdictPass: {
    backgroundColor: "#f0fdf4",
    borderLeft: "3 solid #16a34a",
  },
  verdictFail: {
    backgroundColor: "#fef2f2",
    borderLeft: "3 solid #dc2626",
  },
  verdictWarning: {
    backgroundColor: "#fefce8",
    borderLeft: "3 solid #ca8a04",
  },
  table: {
    marginTop: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5 solid #e5e7eb",
    paddingVertical: 4,
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 4,
    fontSize: 8,
  },
  tableCellSmall: {
    width: 60,
    paddingHorizontal: 4,
    fontSize: 8,
  },
});

// Type definitions
interface AISystemData {
  id: string;
  name: string;
  description?: string | null;
  department?: string | null;
  lifecycle_status: string;
  vendor?: { name: string } | null;
  primary_owner?: { full_name: string | null } | null;
  // Wizard data
  wizard_mode?: string | null;
  summary?: string | null;
  deployment_regions?: string[] | null;
  eu_countries?: string[] | null;
  affected_groups?: string[] | null;
  value_chain_role?: string[] | null;
  // AI Definition
  ai_definition_result?: string | null;
  ai_definition_rationale?: string | null;
  ai_definition_confidence?: string | null;
  infers_outputs?: string | null;
  operates_autonomously?: string | null;
  output_types?: string[] | null;
  technical_approach?: string[] | null;
  // Prohibited Screening
  prohibited_screening_result?: string | null;
  prohibited_screening_notes?: string | null;
  prohibited_manipulation?: string | null;
  prohibited_exploitation?: string | null;
  prohibited_social_scoring?: string | null;
  prohibited_criminal_profiling?: string | null;
  prohibited_facial_scraping?: string | null;
  prohibited_emotion_inference?: string | null;
  prohibited_biometric_categorisation?: string | null;
  prohibited_realtime_biometric?: string | null;
  // High-Risk Screening
  highrisk_screening_result?: string | null;
  highrisk_screening_notes?: string | null;
  highrisk_biometric?: string | null;
  highrisk_critical_infrastructure?: string | null;
  highrisk_education?: string | null;
  highrisk_employment?: string | null;
  highrisk_essential_services?: string | null;
  highrisk_law_enforcement?: string | null;
  highrisk_migration?: string | null;
  highrisk_justice?: string | null;
  highrisk_safety_component?: string | null;
  // Transparency
  transparency_direct_interaction?: string | null;
  transparency_obvious_ai?: string | null;
  transparency_synthetic_content?: string | null;
  transparency_outputs_marked?: string | null;
  transparency_emotion_recognition?: string | null;
  transparency_deepfake?: string | null;
  transparency_public_text?: string | null;
  transparency_status?: string | null;
  // Signoff
  signoff_reviewer_id?: string | null;
  signoff_date?: string | null;
  signoff_notes?: string | null;
  final_classification?: string | null;
  created_at: string;
}

interface ClassificationData {
  risk_level: string;
  is_ai_system?: boolean | null;
  has_prohibited_indicators?: boolean | null;
  is_high_risk_candidate?: boolean | null;
  has_transparency_obligations?: boolean | null;
  high_risk_categories?: string[] | null;
  transparency_categories?: string[] | null;
  classification_rationale?: string | null;
  classified_at?: string | null;
  confidence_level?: string | null;
}

interface Props {
  system: AISystemData;
  classification: ClassificationData | null;
  organization: { name: string };
  generatedBy: string;
  reviewerName?: string;
}

const getRiskBadgeStyle = (riskLevel: string) => {
  switch (riskLevel) {
    case "prohibited":
      return styles.badgeProhibited;
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
    case "prohibited":
      return "PROHIBITED";
    case "high_risk":
      return "High Risk";
    case "limited_risk":
      return "Limited Risk (Transparency)";
    case "minimal_risk":
      return "Minimal Risk";
    default:
      return "Not Classified";
  }
};

const formatYesNoUnsure = (value: string | null | undefined) => {
  if (!value) return "Not assessed";
  switch (value) {
    case "yes":
      return "Yes";
    case "no":
      return "No";
    case "unsure":
      return "Unsure / Needs Review";
    case "unknown":
      return "Unknown";
    default:
      return value;
  }
};

const formatList = (arr: string[] | null | undefined) => {
  if (!arr || arr.length === 0) return "None specified";
  return arr.join(", ");
};

export function ClassificationMemoPDF({ 
  system, 
  classification, 
  organization, 
  generatedBy,
  reviewerName 
}: Props) {
  const prohibitedQuestions = [
    { key: "prohibited_manipulation", label: "Harmful manipulation/deception" },
    { key: "prohibited_exploitation", label: "Exploitation of vulnerabilities" },
    { key: "prohibited_social_scoring", label: "Social scoring" },
    { key: "prohibited_criminal_profiling", label: "Criminal risk profiling" },
    { key: "prohibited_facial_scraping", label: "Untargeted facial scraping" },
    { key: "prohibited_emotion_inference", label: "Workplace/education emotion inference" },
    { key: "prohibited_biometric_categorisation", label: "Sensitive biometric categorisation" },
    { key: "prohibited_realtime_biometric", label: "Real-time remote biometric ID" },
  ];

  const highRiskCategories = [
    { key: "highrisk_biometric", label: "Biometric identification/categorisation" },
    { key: "highrisk_critical_infrastructure", label: "Critical infrastructure" },
    { key: "highrisk_education", label: "Education & vocational training" },
    { key: "highrisk_employment", label: "Employment & worker management" },
    { key: "highrisk_essential_services", label: "Essential services access" },
    { key: "highrisk_law_enforcement", label: "Law enforcement" },
    { key: "highrisk_migration", label: "Migration & border control" },
    { key: "highrisk_justice", label: "Justice & democracy" },
    { key: "highrisk_safety_component", label: "Regulated product safety component" },
  ];

  const hasProhibitedFlags = prohibitedQuestions.some(
    q => system[q.key as keyof AISystemData] === "yes" || system[q.key as keyof AISystemData] === "unsure"
  );

  const hasHighRiskFlags = highRiskCategories.some(
    q => system[q.key as keyof AISystemData] === "yes" || system[q.key as keyof AISystemData] === "unsure"
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Classification Memo</Text>
          <Text style={styles.subtitle}>{system.name}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaItem}>Organization: {organization.name}</Text>
            <Text style={styles.metaItem}>Generated: {format(new Date(), "PPP")}</Text>
            <Text style={styles.metaItem}>By: {generatedBy}</Text>
          </View>
        </View>

        {/* Executive Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Executive Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>System Name</Text>
            <Text style={styles.value}>{system.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Final Classification</Text>
            <View style={[styles.badge, getRiskBadgeStyle(classification?.risk_level || "not_classified")]}>
              <Text>{formatRiskLevel(classification?.risk_level || "not_classified")}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Confidence Level</Text>
            <Text style={styles.value}>{classification?.confidence_level || system.ai_definition_confidence || "—"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Classification Date</Text>
            <Text style={styles.value}>
              {classification?.classified_at 
                ? format(new Date(classification.classified_at), "PPP") 
                : system.signoff_date 
                  ? format(new Date(system.signoff_date), "PPP")
                  : "—"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Reviewer</Text>
            <Text style={styles.value}>{reviewerName || "—"}</Text>
          </View>
          {(classification?.classification_rationale || system.signoff_notes) && (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.subsectionTitle}>Rationale</Text>
              <Text style={styles.paragraph}>
                {classification?.classification_rationale || system.signoff_notes}
              </Text>
            </View>
          )}
        </View>

        {/* AI System Definition Test */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. AI System Definition Test</Text>
          <View style={[
            styles.verdictBox, 
            system.ai_definition_result === "likely_ai" 
              ? styles.verdictPass 
              : system.ai_definition_result === "likely_not"
                ? styles.verdictWarning
                : styles.verdictWarning
          ]}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>
              Conclusion: {system.ai_definition_result === "likely_ai" 
                ? "Likely an AI System (in scope)" 
                : system.ai_definition_result === "likely_not"
                  ? "Likely NOT an AI System (may be out of scope)"
                  : "Needs Further Review"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Infers outputs from inputs</Text>
            <Text style={styles.value}>{formatYesNoUnsure(system.infers_outputs)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Operates with autonomy</Text>
            <Text style={styles.value}>{formatYesNoUnsure(system.operates_autonomously)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Output types</Text>
            <Text style={styles.value}>{formatList(system.output_types)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Technical approach</Text>
            <Text style={styles.value}>{formatList(system.technical_approach)}</Text>
          </View>
          {system.ai_definition_rationale && (
            <View style={{ marginTop: 6 }}>
              <Text style={styles.subsectionTitle}>Rationale</Text>
              <Text style={styles.paragraph}>{system.ai_definition_rationale}</Text>
            </View>
          )}
        </View>

        {/* Prohibited Practices Screening */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Prohibited Practices Screening (Article 5)</Text>
          <View style={[
            styles.verdictBox,
            system.prohibited_screening_result === "no_prohibited" 
              ? styles.verdictPass 
              : styles.verdictFail
          ]}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>
              Result: {system.prohibited_screening_result === "no_prohibited" 
                ? "No prohibited practice indicators found" 
                : system.prohibited_screening_result === "potential_prohibited"
                  ? "POTENTIAL PROHIBITED PRACTICE - Stop & Escalate"
                  : "Needs Legal Review"}
            </Text>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Practice</Text>
              <Text style={styles.tableCellSmall}>Answer</Text>
            </View>
            {prohibitedQuestions.map(q => (
              <View key={q.key} style={styles.tableRow}>
                <Text style={styles.tableCell}>{q.label}</Text>
                <Text style={styles.tableCellSmall}>
                  {formatYesNoUnsure(system[q.key as keyof AISystemData] as string)}
                </Text>
              </View>
            ))}
          </View>
          {system.prohibited_screening_notes && (
            <View style={{ marginTop: 6 }}>
              <Text style={styles.subsectionTitle}>Notes</Text>
              <Text style={styles.paragraph}>{system.prohibited_screening_notes}</Text>
            </View>
          )}
        </View>

        {/* Page Break for High-Risk section */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Classification Memo — {system.name}
          </Text>
          <Text style={styles.footerText}>
            Page 1 of 2
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        {/* High-Risk Screening */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. High-Risk Screening (Annex III)</Text>
          <View style={[
            styles.verdictBox,
            system.highrisk_screening_result === "not_high_risk"
              ? styles.verdictPass
              : hasHighRiskFlags
                ? styles.verdictFail
                : styles.verdictWarning
          ]}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>
              Result: {system.highrisk_screening_result === "not_high_risk"
                ? "Not a high-risk candidate"
                : system.highrisk_screening_result === "high_risk_annex_iii"
                  ? "HIGH-RISK CANDIDATE (Annex III)"
                  : system.highrisk_screening_result === "high_risk_product"
                    ? "HIGH-RISK CANDIDATE (Regulated Product)"
                    : "Needs Review"}
            </Text>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Category</Text>
              <Text style={styles.tableCellSmall}>Applies?</Text>
            </View>
            {highRiskCategories.map(q => (
              <View key={q.key} style={styles.tableRow}>
                <Text style={styles.tableCell}>{q.label}</Text>
                <Text style={styles.tableCellSmall}>
                  {formatYesNoUnsure(system[q.key as keyof AISystemData] as string)}
                </Text>
              </View>
            ))}
          </View>
          {system.highrisk_screening_notes && (
            <View style={{ marginTop: 6 }}>
              <Text style={styles.subsectionTitle}>Notes</Text>
              <Text style={styles.paragraph}>{system.highrisk_screening_notes}</Text>
            </View>
          )}
        </View>

        {/* Transparency Obligations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Transparency Obligations (Article 50)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Direct interaction with persons</Text>
            <Text style={styles.value}>{formatYesNoUnsure(system.transparency_direct_interaction)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Obviously AI to users</Text>
            <Text style={styles.value}>{formatYesNoUnsure(system.transparency_obvious_ai)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Generates synthetic content</Text>
            <Text style={styles.value}>{formatYesNoUnsure(system.transparency_synthetic_content)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Outputs marked as AI-generated</Text>
            <Text style={styles.value}>{formatYesNoUnsure(system.transparency_outputs_marked)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Emotion recognition/biometric</Text>
            <Text style={styles.value}>{formatYesNoUnsure(system.transparency_emotion_recognition)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Deepfake generation</Text>
            <Text style={styles.value}>{formatYesNoUnsure(system.transparency_deepfake)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Public interest text generation</Text>
            <Text style={styles.value}>{formatYesNoUnsure(system.transparency_public_text)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Implementation Status</Text>
            <Text style={styles.value}>{system.transparency_status || "Not assessed"}</Text>
          </View>
        </View>

        {/* Context Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. System Context</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{system.description || system.summary || "—"}</Text>
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
            <Text style={styles.label}>Deployment Regions</Text>
            <Text style={styles.value}>{formatList(system.deployment_regions)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>EU Countries</Text>
            <Text style={styles.value}>{formatList(system.eu_countries)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Affected Groups</Text>
            <Text style={styles.value}>{formatList(system.affected_groups)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Value Chain Role</Text>
            <Text style={styles.value}>{formatList(system.value_chain_role)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Lifecycle Status</Text>
            <Text style={styles.value}>{system.lifecycle_status}</Text>
          </View>
        </View>

        {/* Document Control */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Document Control</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Assessment Mode</Text>
            <Text style={styles.value}>{system.wizard_mode === "full" ? "Full Assessment" : "Quick Capture"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>System Created</Text>
            <Text style={styles.value}>{format(new Date(system.created_at), "PPP")}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Document Generated</Text>
            <Text style={styles.value}>{format(new Date(), "PPP 'at' HH:mm")}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Generated By</Text>
            <Text style={styles.value}>{generatedBy}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Classification Memo — {system.name} — Generated by Klarvo EU AI Act Compliance Hub
          </Text>
          <Text style={styles.footerText}>
            Page 2 of 2
          </Text>
        </View>
      </Page>
    </Document>
  );
}
