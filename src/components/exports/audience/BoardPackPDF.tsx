import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { baseStyles, colors, formatRiskLevel, getRiskBadgeStyle } from "@/lib/pdfStyles";
import { RegulatoryBasisBanner } from "../RegulatoryBasisBanner";

const styles = StyleSheet.create({
  page: {
    ...baseStyles.page,
    paddingTop: 60,
  },
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.emerald,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 15,
  },
  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    width: "23%",
    padding: 12,
    backgroundColor: colors.gray[50],
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: colors.emerald,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.gray[800],
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 9,
    color: colors.gray[500],
    textTransform: "uppercase",
  },
  riskHeatmap: {
    marginBottom: 20,
  },
  riskRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  riskLabel: {
    width: 100,
    fontSize: 9,
    fontWeight: 600,
    color: colors.gray[700],
    paddingVertical: 6,
  },
  riskBar: {
    flex: 1,
    height: 20,
    backgroundColor: colors.gray[100],
    borderRadius: 4,
    flexDirection: "row",
    overflow: "hidden",
  },
  riskSegment: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  riskSegmentText: {
    fontSize: 8,
    color: "#fff",
    fontWeight: 600,
  },
  blockerCard: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
    borderLeftWidth: 4,
  },
  blockerHigh: {
    backgroundColor: colors.dangerLight,
    borderLeftColor: colors.danger,
  },
  blockerMedium: {
    backgroundColor: colors.warningLight,
    borderLeftColor: colors.warning,
  },
  blockerTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.gray[800],
    marginBottom: 4,
  },
  blockerDescription: {
    fontSize: 9,
    color: colors.gray[600],
  },
  deadlineTable: {
    marginTop: 15,
  },
  deadlineRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  deadlineDate: {
    width: 100,
    fontSize: 10,
    fontWeight: 600,
    color: colors.emerald,
  },
  deadlineDescription: {
    flex: 1,
    fontSize: 10,
    color: colors.gray[700],
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
});

interface BoardPackData {
  organization: { name: string };
  generatedBy: string;
  rulesetVersion: string;
  timelineMode: "current_law" | "proposed_amendments" | "early_compliance";
  metrics: {
    totalSystems: number;
    highRiskCount: number;
    pendingClassification: number;
    readinessScore: number;
  };
  riskDistribution: {
    minimal: number;
    limited: number;
    highRisk: number;
    prohibited: number;
    unclassified: number;
  };
  topBlockers: Array<{
    title: string;
    description: string;
    severity: "high" | "medium";
  }>;
  keyDeadlines: Array<{
    date: string;
    description: string;
  }>;
}

export function BoardPackPDF({
  organization,
  generatedBy,
  rulesetVersion,
  timelineMode,
  metrics,
  riskDistribution,
  topBlockers,
  keyDeadlines,
}: BoardPackData) {
  const generatedDate = format(new Date(), "PPP");
  const total = Object.values(riskDistribution).reduce((a, b) => a + b, 0) || 1;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI Governance Board Pack</Text>
          <Text style={styles.subtitle}>{organization.name} — Executive Summary</Text>
          <RegulatoryBasisBanner
            rulesetVersion={rulesetVersion}
            timelineMode={timelineMode}
            generatedDate={generatedDate}
          />
        </View>

        {/* Key Metrics */}
        <View style={styles.metricGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{metrics.totalSystems}</Text>
            <Text style={styles.metricLabel}>AI Systems</Text>
          </View>
          <View style={[styles.metricCard, { borderLeftColor: colors.danger }]}>
            <Text style={styles.metricValue}>{metrics.highRiskCount}</Text>
            <Text style={styles.metricLabel}>High-Risk</Text>
          </View>
          <View style={[styles.metricCard, { borderLeftColor: colors.warning }]}>
            <Text style={styles.metricValue}>{metrics.pendingClassification}</Text>
            <Text style={styles.metricLabel}>Pending</Text>
          </View>
          <View style={[styles.metricCard, { borderLeftColor: colors.success }]}>
            <Text style={styles.metricValue}>{metrics.readinessScore}%</Text>
            <Text style={styles.metricLabel}>Readiness</Text>
          </View>
        </View>

        {/* Risk Distribution */}
        <Text style={baseStyles.sectionTitle}>Risk Distribution</Text>
        <View style={styles.riskHeatmap}>
          <View style={styles.riskBar}>
            {riskDistribution.minimal > 0 && (
              <View style={[styles.riskSegment, { 
                width: `${(riskDistribution.minimal / total) * 100}%`,
                backgroundColor: colors.success 
              }]}>
                <Text style={styles.riskSegmentText}>{riskDistribution.minimal}</Text>
              </View>
            )}
            {riskDistribution.limited > 0 && (
              <View style={[styles.riskSegment, { 
                width: `${(riskDistribution.limited / total) * 100}%`,
                backgroundColor: colors.warning 
              }]}>
                <Text style={styles.riskSegmentText}>{riskDistribution.limited}</Text>
              </View>
            )}
            {riskDistribution.highRisk > 0 && (
              <View style={[styles.riskSegment, { 
                width: `${(riskDistribution.highRisk / total) * 100}%`,
                backgroundColor: colors.danger 
              }]}>
                <Text style={styles.riskSegmentText}>{riskDistribution.highRisk}</Text>
              </View>
            )}
            {riskDistribution.prohibited > 0 && (
              <View style={[styles.riskSegment, { 
                width: `${(riskDistribution.prohibited / total) * 100}%`,
                backgroundColor: colors.gray[900] 
              }]}>
                <Text style={styles.riskSegmentText}>{riskDistribution.prohibited}</Text>
              </View>
            )}
            {riskDistribution.unclassified > 0 && (
              <View style={[styles.riskSegment, { 
                width: `${(riskDistribution.unclassified / total) * 100}%`,
                backgroundColor: colors.gray[400] 
              }]}>
                <Text style={styles.riskSegmentText}>{riskDistribution.unclassified}</Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
            <Text style={{ fontSize: 8, color: colors.success }}>● Minimal</Text>
            <Text style={{ fontSize: 8, color: colors.warning }}>● Limited</Text>
            <Text style={{ fontSize: 8, color: colors.danger }}>● High-Risk</Text>
            <Text style={{ fontSize: 8, color: colors.gray[900] }}>● Prohibited</Text>
            <Text style={{ fontSize: 8, color: colors.gray[400] }}>● Unclassified</Text>
          </View>
        </View>

        {/* Top Blockers */}
        <Text style={baseStyles.sectionTitle}>Top Blockers</Text>
        {topBlockers.slice(0, 5).map((blocker, idx) => (
          <View 
            key={idx} 
            style={[
              styles.blockerCard,
              blocker.severity === "high" ? styles.blockerHigh : styles.blockerMedium
            ]}
          >
            <Text style={styles.blockerTitle}>{blocker.title}</Text>
            <Text style={styles.blockerDescription}>{blocker.description}</Text>
          </View>
        ))}

        {/* Key Deadlines */}
        <Text style={[baseStyles.sectionTitle, { marginTop: 20 }]}>Key Deadlines</Text>
        <View style={styles.deadlineTable}>
          {keyDeadlines.map((deadline, idx) => (
            <View key={idx} style={styles.deadlineRow}>
              <Text style={styles.deadlineDate}>{deadline.date}</Text>
              <Text style={styles.deadlineDescription}>{deadline.description}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generated by Klarvo EU AI Act Compliance Hub • {generatedDate} • {generatedBy}
          </Text>
          <Text style={[styles.footerText, { marginTop: 4 }]}>
            Confidential — For internal leadership use only
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export type { BoardPackData };
