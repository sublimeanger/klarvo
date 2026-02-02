import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { baseStyles, colors, formatRiskLevel, getRiskBadgeStyle, formatYesNoUnsure } from "@/lib/pdfStyles";
import { RegulatoryBasisBanner } from "../RegulatoryBasisBanner";

const styles = StyleSheet.create({
  page: {
    ...baseStyles.page,
    paddingTop: 60,
  },
  coverPage: {
    ...baseStyles.coverPage,
  },
  watermark: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-45deg)",
    fontSize: 60,
    color: colors.gray[200],
    fontWeight: 700,
    opacity: 0.3,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.emerald,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 20,
  },
  tocItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray[200],
  },
  tocSection: {
    fontSize: 10,
    color: colors.gray[800],
  },
  tocPage: {
    fontSize: 10,
    color: colors.gray[500],
  },
  systemCard: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 4,
  },
  systemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  systemName: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.gray[800],
  },
  historyEntry: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: colors.gray[50],
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: colors.emerald,
  },
  historyVersion: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.gray[800],
    marginBottom: 4,
  },
  historyMeta: {
    fontSize: 8,
    color: colors.gray[500],
    marginBottom: 6,
  },
  historyChange: {
    fontSize: 9,
    color: colors.gray[700],
  },
  evidenceTable: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 4,
  },
  evidenceRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  evidenceRowAlt: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    backgroundColor: colors.gray[50],
  },
  controlSection: {
    marginBottom: 15,
  },
  controlStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  aiDecisionBox: {
    marginTop: 15,
    padding: 12,
    backgroundColor: colors.purpleLight,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.purple,
  },
  aiLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: colors.purple,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  footer: {
    position: "absolute",
    bottom: 25,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  footerText: {
    fontSize: 8,
    color: colors.gray[400],
  },
});

interface ClassificationHistoryEntry {
  versionNumber: number;
  riskLevel: string;
  classifiedAt: string;
  classifiedBy: string;
  changeReason?: string;
  aiAssisted?: boolean;
  aiModelVersion?: string;
  humanOverride?: boolean;
  overrideReason?: string;
}

interface ControlImplementation {
  controlId: string;
  controlName: string;
  status: "implemented" | "in_progress" | "not_started" | "not_applicable";
  evidenceCount: number;
  lastUpdated?: string;
}

interface EvidenceItem {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
  status: "approved" | "pending" | "draft";
}

interface AISystemAuditData {
  id: string;
  name: string;
  riskLevel: string;
  classificationHistory: ClassificationHistoryEntry[];
  controls: ControlImplementation[];
  evidence: EvidenceItem[];
}

interface AuditorPackData {
  organization: { name: string };
  generatedBy: string;
  rulesetVersion: string;
  timelineMode: "current_law" | "proposed_amendments" | "early_compliance";
  systems: AISystemAuditData[];
  auditPeriod: { start: string; end: string };
}

function RunningHeader({ orgName }: { orgName: string }) {
  return (
    <View style={baseStyles.runningHeader} fixed>
      <Text style={baseStyles.runningHeaderTitle}>Auditor Pack — Full Traceability</Text>
      <Text style={baseStyles.runningHeaderOrg}>{orgName}</Text>
    </View>
  );
}

function RunningFooter({ orgName, generatedDate }: { orgName: string; generatedDate: string }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>{orgName} • {generatedDate}</Text>
      <Text style={styles.footerText}>CONFIDENTIAL — AUDITOR USE ONLY</Text>
      <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
    </View>
  );
}

export function AuditorPackPDF({
  organization,
  generatedBy,
  rulesetVersion,
  timelineMode,
  systems,
  auditPeriod,
}: AuditorPackData) {
  const generatedDate = format(new Date(), "PPP 'at' HH:mm");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "implemented":
      case "approved":
        return colors.success;
      case "in_progress":
      case "pending":
        return colors.warning;
      case "not_started":
      case "draft":
        return colors.gray[400];
      case "not_applicable":
        return colors.gray[300];
      default:
        return colors.gray[400];
    }
  };

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <View style={{ marginTop: 100 }}>
          <Text style={baseStyles.coverBadge}>AUDITOR PACK</Text>
          <Text style={styles.title}>Full Traceability Report</Text>
          <Text style={styles.subtitle}>{organization.name}</Text>
          
          <View style={{ marginTop: 40 }}>
            <RegulatoryBasisBanner
              rulesetVersion={rulesetVersion}
              timelineMode={timelineMode}
              generatedDate={format(new Date(), "PPP")}
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <View style={baseStyles.row}>
              <Text style={baseStyles.rowLabel}>Audit Period</Text>
              <Text style={baseStyles.rowValue}>{auditPeriod.start} — {auditPeriod.end}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.rowLabel}>Systems Covered</Text>
              <Text style={baseStyles.rowValue}>{systems.length}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.rowLabel}>Generated By</Text>
              <Text style={baseStyles.rowValue}>{generatedBy}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.rowLabel}>Generated At</Text>
              <Text style={baseStyles.rowValue}>{generatedDate}</Text>
            </View>
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>{organization.name}</Text>

        <View style={baseStyles.coverFooter}>
          <Text style={{ fontSize: 9, color: colors.gray[500] }}>
            This document contains complete audit trail information including classification 
            history, control implementations, evidence records, and AI-assisted decision tracking.
          </Text>
        </View>
      </Page>

      {/* Table of Contents */}
      <Page size="A4" style={styles.page}>
        <RunningHeader orgName={organization.name} />
        <RunningFooter orgName={organization.name} generatedDate={generatedDate} />

        <Text style={baseStyles.sectionTitle}>Table of Contents</Text>
        <View style={styles.tocItem}>
          <Text style={styles.tocSection}>1. Executive Overview</Text>
          <Text style={styles.tocPage}>3</Text>
        </View>
        {systems.map((system, idx) => (
          <View key={system.id} style={styles.tocItem}>
            <Text style={styles.tocSection}>{idx + 2}. {system.name}</Text>
            <Text style={styles.tocPage}>{idx + 4}</Text>
          </View>
        ))}
        <View style={styles.tocItem}>
          <Text style={styles.tocSection}>{systems.length + 2}. Evidence Index</Text>
          <Text style={styles.tocPage}>{systems.length + 4}</Text>
        </View>
      </Page>

      {/* System Detail Pages */}
      {systems.map((system) => (
        <Page key={system.id} size="A4" style={styles.page}>
          <RunningHeader orgName={organization.name} />
          <RunningFooter orgName={organization.name} generatedDate={generatedDate} />

          <View style={styles.systemCard}>
            <View style={styles.systemHeader}>
              <Text style={styles.systemName}>{system.name}</Text>
              <View style={[baseStyles.badge, getRiskBadgeStyle(system.riskLevel)]}>
                <Text>{formatRiskLevel(system.riskLevel)}</Text>
              </View>
            </View>

            {/* Classification History */}
            <Text style={baseStyles.h2}>Classification History</Text>
            {system.classificationHistory.map((entry, idx) => (
              <View key={idx} style={styles.historyEntry}>
                <Text style={styles.historyVersion}>
                  Version {entry.versionNumber} — {formatRiskLevel(entry.riskLevel)}
                </Text>
                <Text style={styles.historyMeta}>
                  {entry.classifiedAt} by {entry.classifiedBy}
                </Text>
                {entry.changeReason && (
                  <Text style={styles.historyChange}>Reason: {entry.changeReason}</Text>
                )}
                {entry.aiAssisted && (
                  <View style={styles.aiDecisionBox}>
                    <Text style={styles.aiLabel}>AI-Assisted Classification</Text>
                    <Text style={{ fontSize: 8, color: colors.gray[600] }}>
                      Model: {entry.aiModelVersion || "Unknown"}
                    </Text>
                    {entry.humanOverride && (
                      <Text style={{ fontSize: 8, color: colors.gray[700], marginTop: 4 }}>
                        Human Override: {entry.overrideReason}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            ))}

            {/* Control Status */}
            <Text style={[baseStyles.h2, { marginTop: 15 }]}>Control Implementation Status</Text>
            {system.controls.slice(0, 10).map((control) => (
              <View key={control.controlId} style={styles.controlSection}>
                <View style={styles.controlStatus}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(control.status) }]} />
                  <Text style={{ fontSize: 9, fontWeight: 600, color: colors.gray[800] }}>
                    {control.controlId}: {control.controlName}
                  </Text>
                </View>
                <Text style={{ fontSize: 8, color: colors.gray[500], marginLeft: 16 }}>
                  {control.status.replace("_", " ").toUpperCase()} • {control.evidenceCount} evidence items
                </Text>
              </View>
            ))}

            {/* Evidence Summary */}
            <Text style={[baseStyles.h2, { marginTop: 15 }]}>Evidence Files ({system.evidence.length})</Text>
            <View style={styles.evidenceTable}>
              <View style={[styles.evidenceRow, { backgroundColor: colors.emerald }]}>
                <Text style={{ flex: 2, fontSize: 8, fontWeight: 700, color: "#fff" }}>File Name</Text>
                <Text style={{ flex: 1, fontSize: 8, fontWeight: 700, color: "#fff" }}>Type</Text>
                <Text style={{ flex: 1, fontSize: 8, fontWeight: 700, color: "#fff" }}>Status</Text>
                <Text style={{ flex: 1, fontSize: 8, fontWeight: 700, color: "#fff" }}>Uploaded</Text>
              </View>
              {system.evidence.slice(0, 8).map((ev, idx) => (
                <View key={ev.id} style={idx % 2 === 0 ? styles.evidenceRow : styles.evidenceRowAlt}>
                  <Text style={{ flex: 2, fontSize: 8, color: colors.gray[800] }}>{ev.name}</Text>
                  <Text style={{ flex: 1, fontSize: 8, color: colors.gray[600] }}>{ev.type}</Text>
                  <Text style={{ flex: 1, fontSize: 8, color: getStatusColor(ev.status) }}>
                    {ev.status.toUpperCase()}
                  </Text>
                  <Text style={{ flex: 1, fontSize: 8, color: colors.gray[500] }}>{ev.uploadedAt}</Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
}

export type { AuditorPackData, AISystemAuditData, ClassificationHistoryEntry, ControlImplementation, EvidenceItem };
