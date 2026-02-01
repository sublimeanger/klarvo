import { StyleSheet, Font } from "@react-pdf/renderer";

// Register Inter font for consistent branding
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff", fontWeight: 700 },
  ],
});

// Brand colors
export const colors = {
  emerald: "#0d9373",
  emeraldLight: "#e6f7f3",
  purple: "#7c3aed",
  purpleLight: "#f3e8ff",
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  success: "#16a34a",
  successLight: "#dcfce7",
  warning: "#ca8a04",
  warningLight: "#fef3c7",
  danger: "#dc2626",
  dangerLight: "#fee2e2",
};

// Shared PDF styles with pagination hardening
export const baseStyles = StyleSheet.create({
  // Page with proper padding for running headers/footers
  page: {
    padding: 50,
    paddingBottom: 70, // Extra space for footer
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.5,
  },
  
  // Cover page styling
  coverPage: {
    padding: 50,
    fontFamily: "Inter",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  
  // Running header - appears on all pages except cover
  runningHeader: {
    position: "absolute",
    top: 25,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.emerald,
  },
  runningHeaderTitle: {
    fontSize: 8,
    color: colors.gray[500],
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  runningHeaderOrg: {
    fontSize: 8,
    color: colors.gray[500],
  },
  
  // Running footer - appears on all pages
  runningFooter: {
    position: "absolute",
    bottom: 25,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  footerText: {
    fontSize: 8,
    color: colors.gray[400],
  },
  footerConfidential: {
    fontSize: 8,
    color: colors.gray[400],
  },
  footerPage: {
    fontSize: 8,
    color: colors.gray[400],
  },
  
  // Section styling with break control
  section: {
    marginBottom: 16,
  },
  sectionBreakBefore: {
    marginBottom: 16,
    // @ts-ignore - react-pdf specific property
    break: "before",
  },
  sectionKeepTogether: {
    marginBottom: 16,
    // @ts-ignore - react-pdf specific property
    minPresenceAhead: 100, // Ensure at least 100pt of content ahead
  },
  
  // Section titles - prevent orphans
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.emerald,
    marginBottom: 12,
    marginTop: 5,
    // @ts-ignore - react-pdf specific property
    minPresenceAhead: 60, // Never orphan section titles
  },
  
  // Headings with orphan prevention
  h2: {
    fontSize: 13,
    fontWeight: 700,
    color: colors.gray[800],
    marginBottom: 8,
    marginTop: 15,
    // @ts-ignore - react-pdf specific property
    minPresenceAhead: 40,
  },
  h3: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.gray[700],
    marginBottom: 6,
    marginTop: 12,
    // @ts-ignore - react-pdf specific property
    minPresenceAhead: 30,
  },
  
  // Text styles
  paragraph: {
    fontSize: 10,
    color: colors.gray[800],
    marginBottom: 8,
    lineHeight: 1.6,
  },
  label: {
    fontSize: 9,
    fontWeight: 600,
    color: colors.gray[500],
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 10,
    color: colors.gray[800],
    marginBottom: 12,
  },
  
  // Row layouts
  row: {
    flexDirection: "row",
    marginBottom: 6,
    paddingBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray[200],
  },
  rowLabel: {
    width: "35%",
    fontWeight: 600,
    color: colors.gray[700],
    fontSize: 9,
  },
  rowValue: {
    width: "65%",
    color: colors.gray[800],
    fontSize: 9,
  },
  
  // Table styles with row break prevention
  table: {
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.emerald,
    padding: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 9,
    fontWeight: 700,
    color: "#fff",
  },
  tableHeaderCellWide: {
    flex: 2,
    fontSize: 9,
    fontWeight: 700,
    color: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    padding: 10,
    // @ts-ignore - prevent row breaks
    minPresenceAhead: 20,
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    padding: 10,
    backgroundColor: colors.gray[50],
    // @ts-ignore - prevent row breaks
    minPresenceAhead: 20,
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    color: colors.gray[800],
  },
  tableCellWide: {
    flex: 2,
    fontSize: 9,
    color: colors.gray[800],
  },
  
  // Info boxes
  infoBox: {
    backgroundColor: colors.emeraldLight,
    padding: 12,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.emerald,
    borderRadius: 4,
    // @ts-ignore - keep together
    minPresenceAhead: 40,
  },
  infoBoxText: {
    fontSize: 10,
    color: colors.emerald,
    fontWeight: 600,
  },
  warningBox: {
    backgroundColor: colors.warningLight,
    padding: 12,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    borderRadius: 4,
    // @ts-ignore - keep together
    minPresenceAhead: 40,
  },
  warningBoxText: {
    fontSize: 10,
    color: "#92400e",
  },
  successBox: {
    backgroundColor: colors.successLight,
    padding: 12,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
    borderRadius: 4,
    // @ts-ignore - keep together
    minPresenceAhead: 40,
  },
  successBoxText: {
    fontSize: 10,
    color: "#166534",
  },
  dangerBox: {
    backgroundColor: colors.dangerLight,
    padding: 12,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
    borderRadius: 4,
    // @ts-ignore - keep together
    minPresenceAhead: 40,
  },
  dangerBoxText: {
    fontSize: 10,
    color: "#991b1b",
  },
  
  // Bullet lists
  bulletList: {
    marginLeft: 15,
    marginBottom: 10,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bullet: {
    width: 15,
    fontSize: 10,
    color: colors.emerald,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: colors.gray[800],
  },
  
  // Badges
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 8,
    fontWeight: 600,
  },
  badgeEmerald: {
    backgroundColor: colors.emeraldLight,
    color: colors.emerald,
  },
  badgeSuccess: {
    backgroundColor: colors.successLight,
    color: colors.success,
  },
  badgeWarning: {
    backgroundColor: colors.warningLight,
    color: colors.warning,
  },
  badgeDanger: {
    backgroundColor: colors.dangerLight,
    color: colors.danger,
  },
  badgeGray: {
    backgroundColor: colors.gray[100],
    color: colors.gray[600],
  },
  
  // Signature section
  signatureSection: {
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 4,
    // @ts-ignore - keep together
    break: "avoid",
  },
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  signatureBlock: {
    width: "45%",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[800],
    marginTop: 40,
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 9,
    color: colors.gray[500],
  },
  
  // Cover page elements
  coverBadge: {
    backgroundColor: colors.emerald,
    color: "#fff",
    fontSize: 8,
    fontWeight: 600,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 40,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.gray[900],
    marginBottom: 8,
  },
  coverSubtitle: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.emerald,
    marginBottom: 30,
  },
  coverSystemName: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.gray[800],
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: colors.emerald,
  },
  coverMeta: {
    fontSize: 10,
    color: colors.gray[500],
    marginBottom: 6,
  },
  coverMetaLabel: {
    fontWeight: 600,
    color: colors.gray[800],
  },
  coverFooter: {
    marginTop: "auto",
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  
  // ToC styles
  tocItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray[200],
  },
  tocSection: {
    fontSize: 11,
    color: colors.gray[800],
  },
  tocPage: {
    fontSize: 11,
    color: colors.gray[500],
  },
});

// Risk level badge styles
export const getRiskBadgeStyle = (riskLevel: string) => {
  switch (riskLevel) {
    case "prohibited":
      return { backgroundColor: colors.gray[900], color: "#fff" };
    case "high_risk":
      return baseStyles.badgeDanger;
    case "limited_risk":
      return baseStyles.badgeWarning;
    case "minimal_risk":
      return baseStyles.badgeSuccess;
    default:
      return baseStyles.badgeGray;
  }
};

// Format risk level for display
export const formatRiskLevel = (level: string) => {
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

// Format yes/no/unsure values
export const formatYesNoUnsure = (value: string | null | undefined) => {
  if (!value) return "Not assessed";
  switch (value) {
    case "yes": return "Yes";
    case "no": return "No";
    case "unsure": return "Unsure / Needs Review";
    case "unknown": return "Unknown";
    default: return value;
  }
};

// Format arrays for display
export const formatList = (arr: string[] | null | undefined) => {
  if (!arr || arr.length === 0) return "None specified";
  return arr.join(", ");
};

// Format generic values with fallback
export const formatValue = (value: string | null | undefined, fallback = "—") => {
  if (!value) return fallback;
  return value.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
};
