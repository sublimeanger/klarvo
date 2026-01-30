import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import type { FRIAAssessment, FRIARisk } from "@/hooks/useFRIA";

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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#111827",
  },
  subtitle: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 8,
  },
  regulatoryRef: {
    fontSize: 9,
    color: "#3b82f6",
    marginTop: 4,
  },
  meta: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  metaItem: {
    fontSize: 9,
    color: "#6b7280",
  },
  metaValue: {
    fontWeight: "bold",
    color: "#374151",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
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
  paragraph: {
    marginBottom: 6,
    lineHeight: 1.5,
    fontSize: 9,
    color: "#374151",
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
  badge: {
    padding: "3 8",
    borderRadius: 3,
    fontSize: 8,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  badgeApprove: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  badgeMitigations: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  badgeReject: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  badgeDraft: {
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
  },
  conclusionBox: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  approveBox: {
    backgroundColor: "#f0fdf4",
    borderColor: "#16a34a",
  },
  mitigationsBox: {
    backgroundColor: "#fefce8",
    borderColor: "#ca8a04",
  },
  rejectBox: {
    backgroundColor: "#fef2f2",
    borderColor: "#dc2626",
  },
  riskTable: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
  },
  riskHeader: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  riskHeaderCell: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#374151",
  },
  riskRow: {
    flexDirection: "row",
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  riskRowLast: {
    borderBottomWidth: 0,
  },
  riskCell: {
    fontSize: 8,
    color: "#374151",
  },
  categoryCol: { width: "25%" },
  descriptionCol: { width: "40%" },
  likelihoodCol: { width: "17.5%" },
  severityCol: { width: "17.5%" },
  lowRisk: { color: "#16a34a" },
  mediumRisk: { color: "#ca8a04" },
  highRisk: { color: "#dc2626" },
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
  pageNumber: {
    fontSize: 8,
    color: "#9ca3af",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginVertical: 12,
  },
  infoBox: {
    backgroundColor: "#eff6ff",
    padding: 10,
    borderRadius: 4,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#3b82f6",
  },
  infoText: {
    fontSize: 8,
    color: "#1e40af",
    lineHeight: 1.4,
  },
});

const RISK_CATEGORY_LABELS: Record<string, string> = {
  discrimination: "Non-discrimination / Fairness",
  privacy: "Privacy & Data Protection",
  expression: "Freedom of Expression",
  worker_rights: "Worker Rights",
  due_process: "Due Process / Contestability",
  essential_services: "Access to Essential Services",
  safety: "Safety / Wellbeing",
};

const AFFECTED_CATEGORY_LABELS: Record<string, string> = {
  customers: "Customers",
  employees: "Employees",
  candidates: "Job Candidates",
  students: "Students",
  patients: "Patients",
  public: "General Public",
  children: "Children/Minors",
  vulnerable: "Vulnerable Groups",
};

const DURATION_LABELS: Record<string, string> = {
  "3_months": "3 months",
  "6_months": "6 months",
  "1_year": "1 year",
  "2_years": "2 years",
  ongoing: "Ongoing / Indefinite",
};

const FREQUENCY_LABELS: Record<string, string> = {
  continuous: "Continuous",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  ad_hoc: "Ad-hoc",
};

interface FRIAReportPDFProps {
  fria: FRIAAssessment;
  systemName: string;
  organizationName?: string;
  ownerName?: string;
  approverName?: string;
}

export function FRIAReportPDF({
  fria,
  systemName,
  organizationName = "Organization",
  ownerName,
  approverName,
}: FRIAReportPDFProps) {
  const getConclusionStyle = () => {
    switch (fria.final_conclusion) {
      case "approve":
        return styles.approveBox;
      case "approve_with_mitigations":
        return styles.mitigationsBox;
      case "do_not_deploy":
        return styles.rejectBox;
      default:
        return {};
    }
  };

  const getConclusionBadgeStyle = () => {
    switch (fria.final_conclusion) {
      case "approve":
        return styles.badgeApprove;
      case "approve_with_mitigations":
        return styles.badgeMitigations;
      case "do_not_deploy":
        return styles.badgeReject;
      default:
        return styles.badgeDraft;
    }
  };

  const getConclusionLabel = () => {
    switch (fria.final_conclusion) {
      case "approve":
        return "APPROVED FOR DEPLOYMENT";
      case "approve_with_mitigations":
        return "APPROVED WITH MITIGATIONS";
      case "do_not_deploy":
        return "DO NOT DEPLOY";
      default:
        return "PENDING REVIEW";
    }
  };

  const getRiskLevelStyle = (level: string) => {
    switch (level) {
      case "low":
        return styles.lowRisk;
      case "medium":
        return styles.mediumRisk;
      case "high":
        return styles.highRisk;
      default:
        return {};
    }
  };

  const risks = (fria.identified_risks || []) as FRIARisk[];
  const affectedCategories = fria.affected_categories || [];
  const reassessmentTriggers = fria.reassessment_triggers || [];

  return (
    <Document>
      {/* Page 1: Overview & Process */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Fundamental Rights Impact Assessment</Text>
          <Text style={styles.subtitle}>{fria.title}</Text>
          <Text style={styles.regulatoryRef}>
            EU AI Act — Article 27 Compliance Report
          </Text>
          <View style={styles.meta}>
            <Text style={styles.metaItem}>
              Organization: <Text style={styles.metaValue}>{organizationName}</Text>
            </Text>
            <Text style={styles.metaItem}>
              AI System: <Text style={styles.metaValue}>{systemName}</Text>
            </Text>
            <Text style={styles.metaItem}>
              Generated: <Text style={styles.metaValue}>{format(new Date(), "PPP")}</Text>
            </Text>
          </View>
          <View style={[styles.meta, { marginTop: 8 }]}>
            <Text style={styles.metaItem}>
              Status: <Text style={styles.metaValue}>{fria.status.replace("_", " ").toUpperCase()}</Text>
            </Text>
            {fria.completed_at && (
              <Text style={styles.metaItem}>
                Completed: <Text style={styles.metaValue}>{format(new Date(fria.completed_at), "PPP")}</Text>
              </Text>
            )}
          </View>
        </View>

        {/* Conclusion Summary */}
        <View style={[styles.conclusionBox, getConclusionStyle()]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={[styles.badge, getConclusionBadgeStyle()]}>
              <Text>{getConclusionLabel()}</Text>
            </View>
          </View>
          {approverName && fria.approved_at && (
            <Text style={[styles.paragraph, { marginTop: 8, marginBottom: 0 }]}>
              Approved by {approverName} on {format(new Date(fria.approved_at), "PPP")}
            </Text>
          )}
        </View>

        {/* Section A: Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>A. Assessment Overview</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Assessment Owner:</Text>
            <Text style={styles.value}>{ownerName || "Not assigned"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Expected Deployment:</Text>
            <Text style={styles.value}>
              {fria.expected_deployment_date
                ? format(new Date(fria.expected_deployment_date), "PPP")
                : "Not specified"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>First Use:</Text>
            <Text style={styles.value}>{fria.is_first_use ? "Yes" : "No"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Existing DPIA:</Text>
            <Text style={styles.value}>
              {fria.has_existing_dpia === null
                ? "Not specified"
                : fria.has_existing_dpia
                ? "Yes (can be leveraged)"
                : "No"}
            </Text>
          </View>
        </View>

        {/* Section B: Process Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>B. Process Description (Article 27(a))</Text>
          
          <Text style={styles.subsectionTitle}>Deployer's Process</Text>
          <Text style={styles.paragraph}>
            {fria.process_description || "Not documented"}
          </Text>

          <Text style={styles.subsectionTitle}>Intended Purpose</Text>
          <Text style={styles.paragraph}>
            {fria.intended_purpose || "Not documented"}
          </Text>

          <Text style={styles.subsectionTitle}>Decision Points</Text>
          <Text style={styles.paragraph}>
            {fria.decision_points || "Not documented"}
          </Text>

          <Text style={styles.subsectionTitle}>Human Oversight in Process</Text>
          <Text style={styles.paragraph}>
            {fria.human_oversight_description || "Not documented"}
          </Text>
        </View>

        {/* Section C: Time Period & Frequency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>C. Duration & Frequency (Article 27(b))</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Deployment Duration:</Text>
            <Text style={styles.value}>
              {fria.deployment_duration
                ? DURATION_LABELS[fria.deployment_duration] || fria.deployment_duration
                : "Not specified"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Usage Frequency:</Text>
            <Text style={styles.value}>
              {fria.usage_frequency
                ? FREQUENCY_LABELS[fria.usage_frequency] || fria.usage_frequency
                : "Not specified"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Scale (people/month):</Text>
            <Text style={styles.value}>
              {fria.affected_scale_per_month?.toLocaleString() || "Not specified"}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            FRIA Report — {organizationName} — Confidential
          </Text>
          <Text style={styles.pageNumber}>Page 1</Text>
        </View>
      </Page>

      {/* Page 2: Affected Persons & Risks */}
      <Page size="A4" style={styles.page}>
        {/* Section D: Affected Persons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>D. Affected Persons & Groups (Article 27(c))</Text>
          
          <Text style={styles.subsectionTitle}>Categories of Affected Persons</Text>
          {affectedCategories.length > 0 ? (
            affectedCategories.map((cat, idx) => (
              <View key={idx} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  {AFFECTED_CATEGORY_LABELS[cat] || cat}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.paragraph}>No categories specified</Text>
          )}

          <View style={[styles.row, { marginTop: 8 }]}>
            <Text style={styles.label}>Vulnerable Groups:</Text>
            <Text style={styles.value}>
              {fria.has_vulnerable_groups === null
                ? "Not assessed"
                : fria.has_vulnerable_groups
                ? "Yes — additional safeguards required"
                : "No vulnerable groups identified"}
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>Notification Method</Text>
          <Text style={styles.paragraph}>
            {fria.affected_notification_method || "Not documented"}
          </Text>

          {fria.accessibility_considerations && (
            <>
              <Text style={styles.subsectionTitle}>Accessibility Considerations</Text>
              <Text style={styles.paragraph}>{fria.accessibility_considerations}</Text>
            </>
          )}
        </View>

        {/* Section E: Identified Risks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>E. Risks of Harm (Article 27(d))</Text>
          
          {risks.length > 0 ? (
            <View style={styles.riskTable}>
              <View style={styles.riskHeader}>
                <Text style={[styles.riskHeaderCell, styles.categoryCol]}>Category</Text>
                <Text style={[styles.riskHeaderCell, styles.descriptionCol]}>Description</Text>
                <Text style={[styles.riskHeaderCell, styles.likelihoodCol]}>Likelihood</Text>
                <Text style={[styles.riskHeaderCell, styles.severityCol]}>Severity</Text>
              </View>
              {risks.map((risk, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.riskRow,
                    idx === risks.length - 1 && styles.riskRowLast,
                  ]}
                >
                  <Text style={[styles.riskCell, styles.categoryCol]}>
                    {RISK_CATEGORY_LABELS[risk.category] || risk.category}
                  </Text>
                  <Text style={[styles.riskCell, styles.descriptionCol]}>
                    {risk.description}
                  </Text>
                  <Text
                    style={[
                      styles.riskCell,
                      styles.likelihoodCol,
                      getRiskLevelStyle(risk.likelihood),
                    ]}
                  >
                    {risk.likelihood.toUpperCase()}
                  </Text>
                  <Text
                    style={[
                      styles.riskCell,
                      styles.severityCol,
                      getRiskLevelStyle(risk.severity),
                    ]}
                  >
                    {risk.severity.toUpperCase()}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                No risks have been formally identified in this assessment. This may indicate
                incomplete analysis — all high-risk AI deployments should evaluate potential
                impacts across fundamental rights categories.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            FRIA Report — {organizationName} — Confidential
          </Text>
          <Text style={styles.pageNumber}>Page 2</Text>
        </View>
      </Page>

      {/* Page 3: Oversight & Mitigation */}
      <Page size="A4" style={styles.page}>
        {/* Section F: Human Oversight */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>F. Human Oversight Measures (Article 27(e))</Text>
          
          <Text style={styles.subsectionTitle}>Oversight Design</Text>
          <Text style={styles.paragraph}>
            {fria.oversight_design || "Not documented"}
          </Text>

          <Text style={styles.subsectionTitle}>Competence & Training</Text>
          <Text style={styles.paragraph}>
            {fria.oversight_competence || "Not documented"}
          </Text>

          <View style={[styles.row, { marginTop: 8 }]}>
            <Text style={styles.label}>Authority to Intervene/Stop:</Text>
            <Text style={styles.value}>
              {fria.has_intervention_authority === null
                ? "Not specified"
                : fria.has_intervention_authority
                ? "Yes — oversight personnel can pause or stop the system"
                : "No — limited intervention capability"}
            </Text>
          </View>
        </View>

        {/* Section G: Mitigation & Governance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>G. Mitigation, Governance & Complaints (Article 27(f))</Text>
          
          <Text style={styles.subsectionTitle}>Mitigation Measures</Text>
          <Text style={styles.paragraph}>
            {fria.mitigation_measures || "Not documented"}
          </Text>

          <Text style={styles.subsectionTitle}>Governance Arrangements</Text>
          <Text style={styles.paragraph}>
            {fria.governance_arrangements || "Not documented"}
          </Text>

          <Text style={styles.subsectionTitle}>Complaint Mechanism</Text>
          <Text style={styles.paragraph}>
            {fria.complaint_mechanism || "Not documented"}
          </Text>

          <Text style={styles.subsectionTitle}>Monitoring Plan</Text>
          <Text style={styles.paragraph}>
            {fria.monitoring_plan || "Not documented"}
          </Text>

          {reassessmentTriggers.length > 0 && (
            <>
              <Text style={styles.subsectionTitle}>Reassessment Triggers</Text>
              {reassessmentTriggers.map((trigger, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{trigger}</Text>
                </View>
              ))}
            </>
          )}
        </View>

        <View style={styles.divider} />

        {/* Section H: Approval Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>H. Approval & Notification</Text>
          
          <View style={[styles.conclusionBox, getConclusionStyle()]}>
            <View style={styles.row}>
              <Text style={styles.label}>Final Decision:</Text>
              <View style={[styles.badge, getConclusionBadgeStyle()]}>
                <Text>{getConclusionLabel()}</Text>
              </View>
            </View>
            {approverName && (
              <View style={[styles.row, { marginTop: 4 }]}>
                <Text style={styles.label}>Approved By:</Text>
                <Text style={styles.value}>{approverName}</Text>
              </View>
            )}
            {fria.approved_at && (
              <View style={styles.row}>
                <Text style={styles.label}>Approval Date:</Text>
                <Text style={styles.value}>
                  {format(new Date(fria.approved_at), "PPP 'at' p")}
                </Text>
              </View>
            )}
          </View>

          <View style={[styles.row, { marginTop: 8 }]}>
            <Text style={styles.label}>Notify Market Surveillance Authority:</Text>
            <Text style={styles.value}>
              {fria.notify_authority === null
                ? "Not determined"
                : fria.notify_authority
                ? "Yes — notification required"
                : "No — exempt or not applicable"}
            </Text>
          </View>
          {fria.notification_evidence_url && (
            <View style={styles.row}>
              <Text style={styles.label}>Notification Evidence:</Text>
              <Text style={styles.value}>{fria.notification_evidence_url}</Text>
            </View>
          )}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            This Fundamental Rights Impact Assessment has been prepared in accordance with
            Article 27 of the EU AI Act. The assessment must be updated when there are
            material changes to the AI system's deployment, affected persons, or risk profile.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            FRIA Report — {organizationName} — Confidential
          </Text>
          <Text style={styles.pageNumber}>Page 3</Text>
        </View>
      </Page>
    </Document>
  );
}
