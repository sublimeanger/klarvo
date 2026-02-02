import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { baseStyles, colors } from "@/lib/pdfStyles";
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
    marginBottom: 20,
  },
  vendorCard: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 4,
  },
  vendorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  vendorName: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.gray[800],
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 8,
    fontWeight: 600,
  },
  statusVerified: {
    backgroundColor: colors.successLight,
    color: colors.success,
  },
  statusPending: {
    backgroundColor: colors.warningLight,
    color: colors.warning,
  },
  statusNotReviewed: {
    backgroundColor: colors.gray[100],
    color: colors.gray[600],
  },
  attestationRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray[200],
  },
  attestationLabel: {
    width: "40%",
    fontSize: 9,
    color: colors.gray[600],
  },
  attestationValue: {
    width: "60%",
    fontSize: 9,
    color: colors.gray[800],
  },
  controlGrid: {
    marginTop: 20,
  },
  controlCategory: {
    marginBottom: 15,
  },
  controlCategoryTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.gray[800],
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.emerald,
  },
  controlItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    paddingLeft: 10,
  },
  controlCheck: {
    width: 16,
    height: 16,
    borderRadius: 3,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  controlCheckImplemented: {
    backgroundColor: colors.success,
  },
  controlCheckPending: {
    backgroundColor: colors.warning,
  },
  controlCheckMissing: {
    backgroundColor: colors.gray[300],
  },
  controlCheckText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: 700,
  },
  controlName: {
    fontSize: 9,
    color: colors.gray[700],
    flex: 1,
  },
  securitySection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: colors.gray[50],
    borderRadius: 4,
  },
  securityTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.gray[800],
    marginBottom: 12,
  },
  securityItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  securityLabel: {
    width: "50%",
    fontSize: 9,
    fontWeight: 600,
    color: colors.gray[700],
  },
  securityValue: {
    width: "50%",
    fontSize: 9,
    color: colors.gray[600],
  },
  dpaSection: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.emerald,
    borderRadius: 4,
    backgroundColor: colors.emeraldLight,
  },
  dpaTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.emerald,
    marginBottom: 8,
  },
  dpaItem: {
    flexDirection: "row",
    marginBottom: 6,
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

interface VendorAttestation {
  type: string;
  value: string;
  validUntil?: string;
  documentRef?: string;
}

interface VendorData {
  id: string;
  name: string;
  status: "verified" | "pending" | "not_reviewed";
  attestations: VendorAttestation[];
  aiSystemsCount: number;
  riskLevel: string;
}

interface ControlCategory {
  name: string;
  controls: Array<{
    id: string;
    name: string;
    status: "implemented" | "in_progress" | "not_started";
  }>;
}

interface SecurityPosture {
  encryptionAtRest: string;
  encryptionInTransit: string;
  accessControl: string;
  auditLogging: string;
  dataResidency: string;
  certifications: string[];
}

interface DPADetails {
  signedDate?: string;
  subprocessors: string[];
  dataCategories: string[];
  retentionPeriod: string;
}

interface ProcurementPackData {
  organization: { name: string };
  generatedBy: string;
  rulesetVersion: string;
  timelineMode: "current_law" | "proposed_amendments" | "early_compliance";
  vendors: VendorData[];
  controlCategories: ControlCategory[];
  securityPosture: SecurityPosture;
  dpaDetails: DPADetails;
}

export function ProcurementPackPDF({
  organization,
  generatedBy,
  rulesetVersion,
  timelineMode,
  vendors,
  controlCategories,
  securityPosture,
  dpaDetails,
}: ProcurementPackData) {
  const generatedDate = format(new Date(), "PPP");

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "verified":
        return styles.statusVerified;
      case "pending":
        return styles.statusPending;
      default:
        return styles.statusNotReviewed;
    }
  };

  const getControlCheckStyle = (status: string) => {
    switch (status) {
      case "implemented":
        return styles.controlCheckImplemented;
      case "in_progress":
        return styles.controlCheckPending;
      default:
        return styles.controlCheckMissing;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Procurement & Vendor Assessment Pack</Text>
          <Text style={styles.subtitle}>{organization.name} — AI Vendor Due Diligence</Text>
          <RegulatoryBasisBanner
            rulesetVersion={rulesetVersion}
            timelineMode={timelineMode}
            generatedDate={generatedDate}
          />
        </View>

        {/* Vendor Cards */}
        <Text style={baseStyles.sectionTitle}>AI Vendors & Attestations</Text>
        {vendors.map((vendor) => (
          <View key={vendor.id} style={styles.vendorCard} wrap={false}>
            <View style={styles.vendorHeader}>
              <Text style={styles.vendorName}>{vendor.name}</Text>
              <View style={[styles.statusBadge, getStatusStyle(vendor.status)]}>
                <Text>{vendor.status.toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.attestationRow}>
              <Text style={styles.attestationLabel}>AI Systems Using</Text>
              <Text style={styles.attestationValue}>{vendor.aiSystemsCount}</Text>
            </View>
            <View style={styles.attestationRow}>
              <Text style={styles.attestationLabel}>Highest Risk Level</Text>
              <Text style={styles.attestationValue}>{vendor.riskLevel}</Text>
            </View>
            {vendor.attestations.map((att, idx) => (
              <View key={idx} style={styles.attestationRow}>
                <Text style={styles.attestationLabel}>{att.type}</Text>
                <Text style={styles.attestationValue}>
                  {att.value}
                  {att.validUntil && ` (until ${att.validUntil})`}
                </Text>
              </View>
            ))}
          </View>
        ))}

        {/* Security Posture */}
        <View style={styles.securitySection}>
          <Text style={styles.securityTitle}>Organization Security Posture</Text>
          <View style={styles.securityItem}>
            <Text style={styles.securityLabel}>Encryption at Rest</Text>
            <Text style={styles.securityValue}>{securityPosture.encryptionAtRest}</Text>
          </View>
          <View style={styles.securityItem}>
            <Text style={styles.securityLabel}>Encryption in Transit</Text>
            <Text style={styles.securityValue}>{securityPosture.encryptionInTransit}</Text>
          </View>
          <View style={styles.securityItem}>
            <Text style={styles.securityLabel}>Access Control</Text>
            <Text style={styles.securityValue}>{securityPosture.accessControl}</Text>
          </View>
          <View style={styles.securityItem}>
            <Text style={styles.securityLabel}>Audit Logging</Text>
            <Text style={styles.securityValue}>{securityPosture.auditLogging}</Text>
          </View>
          <View style={styles.securityItem}>
            <Text style={styles.securityLabel}>Data Residency</Text>
            <Text style={styles.securityValue}>{securityPosture.dataResidency}</Text>
          </View>
          <View style={styles.securityItem}>
            <Text style={styles.securityLabel}>Certifications</Text>
            <Text style={styles.securityValue}>{securityPosture.certifications.join(", ") || "—"}</Text>
          </View>
        </View>

        {/* DPA Details */}
        <View style={styles.dpaSection}>
          <Text style={styles.dpaTitle}>Data Processing Agreement Summary</Text>
          <View style={styles.dpaItem}>
            <Text style={styles.securityLabel}>DPA Signed</Text>
            <Text style={styles.securityValue}>{dpaDetails.signedDate || "Not yet signed"}</Text>
          </View>
          <View style={styles.dpaItem}>
            <Text style={styles.securityLabel}>Subprocessors</Text>
            <Text style={styles.securityValue}>{dpaDetails.subprocessors.join(", ") || "None listed"}</Text>
          </View>
          <View style={styles.dpaItem}>
            <Text style={styles.securityLabel}>Data Categories</Text>
            <Text style={styles.securityValue}>{dpaDetails.dataCategories.join(", ")}</Text>
          </View>
          <View style={styles.dpaItem}>
            <Text style={styles.securityLabel}>Retention Period</Text>
            <Text style={styles.securityValue}>{dpaDetails.retentionPeriod}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generated by Klarvo EU AI Act Compliance Hub • {generatedDate} • {generatedBy}
          </Text>
          <Text style={[styles.footerText, { marginTop: 4 }]}>
            For vendor assessment and procurement use — {organization.name}
          </Text>
        </View>
      </Page>

      {/* Control Implementation Page */}
      <Page size="A4" style={styles.page}>
        <Text style={baseStyles.sectionTitle}>Control Implementation Status</Text>
        <View style={styles.controlGrid}>
          {controlCategories.map((category) => (
            <View key={category.name} style={styles.controlCategory} wrap={false}>
              <Text style={styles.controlCategoryTitle}>{category.name}</Text>
              {category.controls.map((control) => (
                <View key={control.id} style={styles.controlItem}>
                  <View style={[styles.controlCheck, getControlCheckStyle(control.status)]}>
                    <Text style={styles.controlCheckText}>
                      {control.status === "implemented" ? "✓" : control.status === "in_progress" ? "○" : "—"}
                    </Text>
                  </View>
                  <Text style={styles.controlName}>{control.id}: {control.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generated by Klarvo EU AI Act Compliance Hub • {generatedDate}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export type { ProcurementPackData, VendorData, VendorAttestation, ControlCategory, SecurityPosture, DPADetails };
