import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { colors } from "@/lib/pdfStyles";

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.gray[100],
    padding: 10,
    marginBottom: 15,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: colors.emerald,
  },
  title: {
    fontSize: 8,
    fontWeight: 700,
    color: colors.emerald,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  text: {
    fontSize: 8,
    color: colors.gray[600],
    lineHeight: 1.4,
  },
  version: {
    fontSize: 7,
    color: colors.gray[500],
    marginTop: 4,
  },
});

interface RegulatoryBasisBannerProps {
  rulesetVersion: string;
  timelineMode: "current_law" | "proposed_amendments" | "early_compliance";
  generatedDate: string;
}

const timelineModeLabels: Record<string, string> = {
  current_law: "Current Law (enacted provisions only)",
  proposed_amendments: "Includes Omnibus Proposal (Nov 2025) — not yet enacted",
  early_compliance: "Early Compliance Mode (customer policy)",
};

export function RegulatoryBasisBanner({
  rulesetVersion,
  timelineMode,
  generatedDate,
}: RegulatoryBasisBannerProps) {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Regulatory Basis</Text>
      <Text style={styles.text}>
        Generated under EU AI Act timeline as of {generatedDate}.{" "}
        {timelineModeLabels[timelineMode] || timelineModeLabels.current_law}
      </Text>
      <Text style={styles.version}>Ruleset version: {rulesetVersion}</Text>
    </View>
  );
}
