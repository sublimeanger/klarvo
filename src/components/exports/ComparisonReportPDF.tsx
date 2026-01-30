import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import type { ComparisonSystemData } from "@/hooks/useAISystemComparison";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#0066cc",
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: "#666666",
  },
  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    fontSize: 9,
    color: "#888888",
  },
  columnsContainer: {
    flexDirection: "row",
    gap: 15,
  },
  column: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  systemName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  statusText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#666666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 10,
    marginBottom: 6,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  riskText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
  },
  statLabel: {
    fontSize: 7,
    color: "#888888",
    marginTop: 2,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    marginTop: 6,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#22c55e",
    borderRadius: 3,
  },
  metaItem: {
    flexDirection: "row",
    marginTop: 4,
    fontSize: 8,
    color: "#666666",
  },
  metaLabel: {
    width: 50,
    color: "#888888",
  },
  flagBadge: {
    backgroundColor: "#fef3c7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 4,
    marginTop: 4,
  },
  flagText: {
    fontSize: 7,
    color: "#92400e",
  },
  flagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#888888",
  },
  summarySection: {
    marginTop: 25,
    padding: 15,
    backgroundColor: "#f0f9ff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#bae6fd",
  },
  summaryTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#0369a1",
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  summaryLabel: {
    width: 120,
    fontSize: 9,
    color: "#666666",
  },
  summaryValue: {
    flex: 1,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
  },
});

interface ComparisonReportPDFProps {
  systems: ComparisonSystemData[];
  organization: { name: string };
  generatedBy: string;
}

const riskLevelLabels: Record<string, { label: string; bg: string; text: string }> = {
  prohibited: { label: "Prohibited", bg: "#fef2f2", text: "#991b1b" },
  high_risk: { label: "High Risk", bg: "#fef3c7", text: "#92400e" },
  limited_risk: { label: "Limited Risk", bg: "#dbeafe", text: "#1e40af" },
  minimal_risk: { label: "Minimal Risk", bg: "#dcfce7", text: "#166534" },
  not_classified: { label: "Not Classified", bg: "#f3f4f6", text: "#374151" },
};

const statusLabels: Record<string, { label: string; bg: string; text: string }> = {
  draft: { label: "Draft", bg: "#f3f4f6", text: "#374151" },
  pilot: { label: "Pilot", bg: "#dbeafe", text: "#1e40af" },
  live: { label: "Live", bg: "#dcfce7", text: "#166534" },
  retired: { label: "Retired", bg: "#fef3c7", text: "#92400e" },
  archived: { label: "Archived", bg: "#f3f4f6", text: "#374151" },
};

function SystemColumn({ system }: { system: ComparisonSystemData }) {
  const riskLevel = system.classification?.risk_level || "not_classified";
  const riskConfig = riskLevelLabels[riskLevel] || riskLevelLabels.not_classified;
  const statusConfig = statusLabels[system.lifecycle_status] || statusLabels.draft;

  const controlProgress = system.controlStats.total > 0
    ? Math.round((system.controlStats.implemented / system.controlStats.total) * 100)
    : 0;

  const evidenceProgress = system.evidenceStats.total > 0
    ? Math.round((system.evidenceStats.approved / system.evidenceStats.total) * 100)
    : 0;

  return (
    <View style={styles.column}>
      <Text style={styles.systemName}>{system.name}</Text>
      <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
        <Text style={[styles.statusText, { color: statusConfig.text }]}>
          {statusConfig.label}
        </Text>
      </View>

      {/* Risk Classification */}
      <Text style={styles.sectionTitle}>Risk Classification</Text>
      <View style={[styles.riskBadge, { backgroundColor: riskConfig.bg }]}>
        <Text style={[styles.riskText, { color: riskConfig.text }]}>
          {riskConfig.label}
        </Text>
      </View>
      {system.classification?.confidence_level && (
        <Text style={{ fontSize: 8, color: "#666666", marginTop: 2 }}>
          Confidence: {system.classification.confidence_level}
        </Text>
      )}

      {/* Flags */}
      <View style={styles.flagsContainer}>
        {system.classification?.is_high_risk_candidate && (
          <View style={styles.flagBadge}>
            <Text style={styles.flagText}>High-Risk Candidate</Text>
          </View>
        )}
        {system.classification?.has_transparency_obligations && (
          <View style={styles.flagBadge}>
            <Text style={styles.flagText}>Transparency</Text>
          </View>
        )}
        {system.classification?.has_prohibited_indicators && (
          <View style={[styles.flagBadge, { backgroundColor: "#fee2e2" }]}>
            <Text style={[styles.flagText, { color: "#991b1b" }]}>Prohibited</Text>
          </View>
        )}
      </View>

      {/* Controls */}
      <Text style={styles.sectionTitle}>Controls ({system.controlStats.total})</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${controlProgress}%` }]} />
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: "#22c55e" }]}>{system.controlStats.implemented}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: "#f59e0b" }]}>{system.controlStats.inProgress}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: "#6b7280" }]}>{system.controlStats.notStarted}</Text>
          <Text style={styles.statLabel}>Not Started</Text>
        </View>
      </View>

      {/* Evidence */}
      <Text style={styles.sectionTitle}>Evidence ({system.evidenceStats.total})</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${evidenceProgress}%` }]} />
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: "#22c55e" }]}>{system.evidenceStats.approved}</Text>
          <Text style={styles.statLabel}>Approved</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: "#f59e0b" }]}>{system.evidenceStats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      {/* Metadata */}
      <Text style={styles.sectionTitle}>Details</Text>
      <View style={styles.metaItem}>
        <Text style={styles.metaLabel}>Vendor:</Text>
        <Text>{system.vendor?.name || system.department || "—"}</Text>
      </View>
      <View style={styles.metaItem}>
        <Text style={styles.metaLabel}>Owner:</Text>
        <Text>{system.primary_owner?.full_name || "Unassigned"}</Text>
      </View>
      <View style={styles.metaItem}>
        <Text style={styles.metaLabel}>Created:</Text>
        <Text>{format(new Date(system.created_at), "MMM d, yyyy")}</Text>
      </View>
    </View>
  );
}

export function ComparisonReportPDF({
  systems,
  organization,
  generatedBy,
}: ComparisonReportPDFProps) {
  const now = new Date();

  // Calculate summary stats
  const highRiskCount = systems.filter(
    (s) => s.classification?.risk_level === "high_risk" || s.classification?.risk_level === "prohibited"
  ).length;
  const avgControlProgress = systems.length > 0
    ? Math.round(
        systems.reduce((acc, s) => {
          const progress = s.controlStats.total > 0
            ? (s.controlStats.implemented / s.controlStats.total) * 100
            : 0;
          return acc + progress;
        }, 0) / systems.length
      )
    : 0;
  const avgEvidenceProgress = systems.length > 0
    ? Math.round(
        systems.reduce((acc, s) => {
          const progress = s.evidenceStats.total > 0
            ? (s.evidenceStats.approved / s.evidenceStats.total) * 100
            : 0;
          return acc + progress;
        }, 0) / systems.length
      )
    : 0;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI System Comparison Report</Text>
          <Text style={styles.subtitle}>
            Side-by-side analysis of {systems.length} AI systems
          </Text>
          <View style={styles.metadata}>
            <Text>Organization: {organization.name}</Text>
            <Text>Generated: {format(now, "MMMM d, yyyy 'at' h:mm a")}</Text>
            <Text>By: {generatedBy}</Text>
          </View>
        </View>

        {/* System Columns */}
        <View style={styles.columnsContainer}>
          {systems.slice(0, 4).map((system) => (
            <SystemColumn key={system.id} system={system} />
          ))}
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Comparison Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Systems Compared:</Text>
            <Text style={styles.summaryValue}>{systems.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>High Risk / Prohibited:</Text>
            <Text style={styles.summaryValue}>{highRiskCount} system{highRiskCount !== 1 ? "s" : ""}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Avg. Control Completion:</Text>
            <Text style={styles.summaryValue}>{avgControlProgress}%</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Avg. Evidence Approved:</Text>
            <Text style={styles.summaryValue}>{avgEvidenceProgress}%</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Klarvo — EU AI Act Compliance Hub</Text>
          <Text>Confidential — For Internal Use Only</Text>
        </View>
      </Page>
    </Document>
  );
}
