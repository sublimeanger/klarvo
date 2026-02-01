import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { baseStyles, colors } from "@/lib/pdfStyles";
import type { FRIAAssessment, FRIARisk } from "@/hooks/useFRIA";

// Extend styles for FRIA report
const styles = StyleSheet.create({
  page: {
    ...baseStyles.page,
    paddingTop: 60,
  },
  riskTable: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 4,
  },
  riskHeader: {
    flexDirection: "row",
    backgroundColor: colors.gray[100],
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  riskHeaderCell: {
    fontSize: 8,
    fontWeight: 600,
    color: colors.gray[700],
  },
  riskRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    // @ts-ignore - prevent break
    minPresenceAhead: 20,
  },
  riskRowLast: {
    borderBottomWidth: 0,
  },
  riskCell: {
    fontSize: 8,
    color: colors.gray[700],
  },
  categoryCol: { width: "25%" },
  descriptionCol: { width: "40%" },
  likelihoodCol: { width: "17.5%" },
  severityCol: { width: "17.5%" },
  lowRisk: { color: colors.success },
  mediumRisk: { color: colors.warning },
  highRisk: { color: colors.danger },
  badgeApprove: {
    backgroundColor: colors.successLight,
    color: "#166534",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 600,
  },
  badgeMitigations: {
    backgroundColor: colors.warningLight,
    color: "#92400e",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 600,
  },
  badgeReject: {
    backgroundColor: colors.dangerLight,
    color: "#991b1b",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 600,
  },
  badgeDraft: {
    backgroundColor: colors.gray[100],
    color: colors.gray[600],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 600,
  },
  conclusionBox: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    // @ts-ignore
    minPresenceAhead: 40,
  },
  approveBox: {
    backgroundColor: "#f0fdf4",
    borderColor: colors.success,
  },
  mitigationsBox: {
    backgroundColor: colors.warningLight,
    borderColor: colors.warning,
  },
  rejectBox: {
    backgroundColor: colors.dangerLight,
    borderColor: colors.danger,
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

// Running Header
function RunningHeader({ title, orgName }: { title: string; orgName: string }) {
  return (
    <View style={baseStyles.runningHeader} fixed>
      <Text style={baseStyles.runningHeaderTitle}>FRIA Report — {title}</Text>
      <Text style={baseStyles.runningHeaderOrg}>{orgName}</Text>
    </View>
  );
}

// Running Footer with dynamic page numbers
function RunningFooter({ orgName }: { orgName: string }) {
  return (
    <View style={baseStyles.runningFooter} fixed>
      <Text style={baseStyles.footerText}>FRIA Report — {orgName}</Text>
      <Text style={baseStyles.footerConfidential}>Confidential</Text>
      <Text style={baseStyles.footerPage} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
    </View>
  );
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
        <RunningHeader title={systemName} orgName={organizationName} />
        <RunningFooter orgName={organizationName} />

        {/* Header */}
        <View style={{ marginBottom: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 700, color: colors.emerald, marginBottom: 4 }}>
            Fundamental Rights Impact Assessment
          </Text>
          <Text style={{ fontSize: 12, color: colors.gray[600], marginBottom: 8 }}>
            {fria.title}
          </Text>
          <Text style={{ fontSize: 9, color: colors.emerald, fontWeight: 600 }}>
            EU AI Act — Article 27 Compliance Report
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 10 }}>
            <Text style={{ fontSize: 9, color: colors.gray[500] }}>
              AI System: <Text style={{ fontWeight: 600, color: colors.gray[700] }}>{systemName}</Text>
            </Text>
            <Text style={{ fontSize: 9, color: colors.gray[500] }}>
              Generated: <Text style={{ fontWeight: 600, color: colors.gray[700] }}>{format(new Date(), "PPP")}</Text>
            </Text>
            <Text style={{ fontSize: 9, color: colors.gray[500] }}>
              Status: <Text style={{ fontWeight: 600, color: colors.gray[700] }}>{fria.status.replace("_", " ").toUpperCase()}</Text>
            </Text>
          </View>
        </View>

        {/* Conclusion Summary */}
        <View style={[styles.conclusionBox, getConclusionStyle()]} wrap={false}>
          <View style={getConclusionBadgeStyle()}>
            <Text>{getConclusionLabel()}</Text>
          </View>
          {approverName && fria.approved_at && (
            <Text style={[baseStyles.paragraph, { marginTop: 8, marginBottom: 0 }]}>
              Approved by {approverName} on {format(new Date(fria.approved_at), "PPP")}
            </Text>
          )}
        </View>

        {/* Section A: Overview */}
        <View style={baseStyles.sectionKeepTogether}>
          <Text style={baseStyles.sectionTitle}>A. Assessment Overview</Text>
          <View style={baseStyles.row}>
            <Text style={baseStyles.rowLabel}>Assessment Owner:</Text>
            <Text style={baseStyles.rowValue}>{ownerName || "Not assigned"}</Text>
          </View>
          <View style={baseStyles.row}>
            <Text style={baseStyles.rowLabel}>Expected Deployment:</Text>
            <Text style={baseStyles.rowValue}>
              {fria.expected_deployment_date
                ? format(new Date(fria.expected_deployment_date), "PPP")
                : "Not specified"}
            </Text>
          </View>
          <View style={baseStyles.row}>
            <Text style={baseStyles.rowLabel}>First Use:</Text>
            <Text style={baseStyles.rowValue}>{fria.is_first_use ? "Yes" : "No"}</Text>
          </View>
          <View style={baseStyles.row}>
            <Text style={baseStyles.rowLabel}>Existing DPIA:</Text>
            <Text style={baseStyles.rowValue}>
              {fria.has_existing_dpia === null
                ? "Not specified"
                : fria.has_existing_dpia
                ? "Yes (can be leveraged)"
                : "No"}
            </Text>
          </View>
        </View>

        {/* Section B: Process Description */}
        <View style={baseStyles.sectionKeepTogether}>
          <Text style={baseStyles.sectionTitle}>B. Process Description (Article 27(a))</Text>
          
          <Text style={baseStyles.h3}>Deployer's Process</Text>
          <Text style={baseStyles.paragraph}>
            {fria.process_description || "Not documented"}
          </Text>

          <Text style={baseStyles.h3}>Intended Purpose</Text>
          <Text style={baseStyles.paragraph}>
            {fria.intended_purpose || "Not documented"}
          </Text>

          <Text style={baseStyles.h3}>Decision Points</Text>
          <Text style={baseStyles.paragraph}>
            {fria.decision_points || "Not documented"}
          </Text>

          <Text style={baseStyles.h3}>Human Oversight in Process</Text>
          <Text style={baseStyles.paragraph}>
            {fria.human_oversight_description || "Not documented"}
          </Text>
        </View>

        {/* Section C: Time Period & Frequency */}
        <View style={baseStyles.sectionKeepTogether}>
          <Text style={baseStyles.sectionTitle}>C. Duration & Frequency (Article 27(b))</Text>
          <View style={baseStyles.row}>
            <Text style={baseStyles.rowLabel}>Deployment Duration:</Text>
            <Text style={baseStyles.rowValue}>
              {fria.deployment_duration
                ? DURATION_LABELS[fria.deployment_duration] || fria.deployment_duration
                : "Not specified"}
            </Text>
          </View>
          <View style={baseStyles.row}>
            <Text style={baseStyles.rowLabel}>Usage Frequency:</Text>
            <Text style={baseStyles.rowValue}>
              {fria.usage_frequency
                ? FREQUENCY_LABELS[fria.usage_frequency] || fria.usage_frequency
                : "Not specified"}
            </Text>
          </View>
          <View style={baseStyles.row}>
            <Text style={baseStyles.rowLabel}>Scale (people/month):</Text>
            <Text style={baseStyles.rowValue}>
              {fria.affected_scale_per_month?.toLocaleString() || "Not specified"}
            </Text>
          </View>
        </View>
      </Page>

      {/* Page 2: Affected Persons & Risks */}
      <Page size="A4" style={styles.page}>
        <RunningHeader title={systemName} orgName={organizationName} />
        <RunningFooter orgName={organizationName} />

        {/* Section D: Affected Persons */}
        <View style={baseStyles.sectionKeepTogether}>
          <Text style={baseStyles.sectionTitle}>D. Affected Persons & Groups (Article 27(c))</Text>
          
          <Text style={baseStyles.h3}>Categories of Affected Persons</Text>
          {affectedCategories.length > 0 ? (
            <View style={baseStyles.bulletList}>
              {affectedCategories.map((cat, idx) => (
                <View key={idx} style={baseStyles.bulletItem}>
                  <Text style={baseStyles.bullet}>•</Text>
                  <Text style={baseStyles.bulletText}>
                    {AFFECTED_CATEGORY_LABELS[cat] || cat}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={baseStyles.paragraph}>No categories specified</Text>
          )}

          <View style={[baseStyles.row, { marginTop: 8 }]}>
            <Text style={baseStyles.rowLabel}>Vulnerable Groups:</Text>
            <Text style={baseStyles.rowValue}>
              {fria.has_vulnerable_groups === null
                ? "Not assessed"
                : fria.has_vulnerable_groups
                ? "Yes — additional safeguards required"
                : "No vulnerable groups identified"}
            </Text>
          </View>

          <Text style={baseStyles.h3}>Notification Method</Text>
          <Text style={baseStyles.paragraph}>
            {fria.affected_notification_method || "Not documented"}
          </Text>

          {fria.accessibility_considerations && (
            <>
              <Text style={baseStyles.h3}>Accessibility Considerations</Text>
              <Text style={baseStyles.paragraph}>{fria.accessibility_considerations}</Text>
            </>
          )}
        </View>

        {/* Section E: Identified Risks */}
        <View style={baseStyles.sectionKeepTogether}>
          <Text style={baseStyles.sectionTitle}>E. Risks of Harm (Article 27(d))</Text>
          
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
                  wrap={false}
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
            <View style={baseStyles.infoBox} wrap={false}>
              <Text style={baseStyles.infoBoxText}>
                No risks have been formally identified in this assessment. This may indicate
                incomplete analysis — all high-risk AI deployments should evaluate potential
                impacts across fundamental rights categories.
              </Text>
            </View>
          )}
        </View>
      </Page>

      {/* Page 3: Oversight & Mitigation */}
      <Page size="A4" style={styles.page}>
        <RunningHeader title={systemName} orgName={organizationName} />
        <RunningFooter orgName={organizationName} />

        {/* Section F: Human Oversight */}
        <View style={baseStyles.sectionKeepTogether}>
          <Text style={baseStyles.sectionTitle}>F. Human Oversight Measures (Article 27(e))</Text>
          
          <Text style={baseStyles.h3}>Oversight Design</Text>
          <Text style={baseStyles.paragraph}>
            {fria.oversight_design || "Not documented"}
          </Text>

          <Text style={baseStyles.h3}>Competence & Training</Text>
          <Text style={baseStyles.paragraph}>
            {fria.oversight_competence || "Not documented"}
          </Text>

          <View style={[baseStyles.row, { marginTop: 8 }]}>
            <Text style={baseStyles.rowLabel}>Authority to Intervene/Stop:</Text>
            <Text style={baseStyles.rowValue}>
              {fria.has_intervention_authority === null
                ? "Not specified"
                : fria.has_intervention_authority
                ? "Yes — oversight personnel can pause or stop the system"
                : "No — limited intervention capability"}
            </Text>
          </View>
        </View>

        {/* Section G: Mitigation & Governance */}
        <View style={baseStyles.sectionKeepTogether}>
          <Text style={baseStyles.sectionTitle}>G. Mitigation, Governance & Complaints (Article 27(f))</Text>
          
          <Text style={baseStyles.h3}>Mitigation Measures</Text>
          <Text style={baseStyles.paragraph}>
            {fria.mitigation_measures || "Not documented"}
          </Text>

          <Text style={baseStyles.h3}>Governance Arrangements</Text>
          <Text style={baseStyles.paragraph}>
            {fria.governance_arrangements || "Not documented"}
          </Text>

          <Text style={baseStyles.h3}>Complaint Mechanism</Text>
          <Text style={baseStyles.paragraph}>
            {fria.complaint_mechanism || "Not documented"}
          </Text>

          <Text style={baseStyles.h3}>Monitoring Plan</Text>
          <Text style={baseStyles.paragraph}>
            {fria.monitoring_plan || "Not documented"}
          </Text>

          {reassessmentTriggers.length > 0 && (
            <>
              <Text style={baseStyles.h3}>Reassessment Triggers</Text>
              <View style={baseStyles.bulletList}>
                {reassessmentTriggers.map((trigger, idx) => (
                  <View key={idx} style={baseStyles.bulletItem}>
                    <Text style={baseStyles.bullet}>•</Text>
                    <Text style={baseStyles.bulletText}>{trigger}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        {/* Divider */}
        <View style={{ borderBottomWidth: 1, borderBottomColor: colors.gray[200], marginVertical: 15 }} />

        {/* Section H: Approval Summary */}
        <View style={baseStyles.sectionKeepTogether}>
          <Text style={baseStyles.sectionTitle}>H. Approval & Notification</Text>
          
          <View style={[styles.conclusionBox, getConclusionStyle()]} wrap={false}>
            <View style={baseStyles.row}>
              <Text style={baseStyles.rowLabel}>Final Decision:</Text>
              <View style={getConclusionBadgeStyle()}>
                <Text>{getConclusionLabel()}</Text>
              </View>
            </View>
            {approverName && (
              <View style={[baseStyles.row, { marginTop: 4 }]}>
                <Text style={baseStyles.rowLabel}>Approved By:</Text>
                <Text style={baseStyles.rowValue}>{approverName}</Text>
              </View>
            )}
            {fria.approved_at && (
              <View style={baseStyles.row}>
                <Text style={baseStyles.rowLabel}>Approval Date:</Text>
                <Text style={baseStyles.rowValue}>
                  {format(new Date(fria.approved_at), "PPP 'at' p")}
                </Text>
              </View>
            )}
          </View>

          <View style={[baseStyles.row, { marginTop: 8 }]}>
            <Text style={baseStyles.rowLabel}>Notify Market Surveillance Authority:</Text>
            <Text style={baseStyles.rowValue}>
              {fria.notify_authority === null
                ? "Not determined"
                : fria.notify_authority
                ? "Yes — notification required"
                : "No — exempt or not applicable"}
            </Text>
          </View>
          {fria.notification_evidence_url && (
            <View style={baseStyles.row}>
              <Text style={baseStyles.rowLabel}>Notification Evidence:</Text>
              <Text style={baseStyles.rowValue}>{fria.notification_evidence_url}</Text>
            </View>
          )}
        </View>

        <View style={baseStyles.infoBox} wrap={false}>
          <Text style={baseStyles.infoBoxText}>
            This Fundamental Rights Impact Assessment has been prepared in accordance with
            Article 27 of the EU AI Act. The assessment must be updated when there are
            material changes to the AI system's deployment, affected persons, or risk profile.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
