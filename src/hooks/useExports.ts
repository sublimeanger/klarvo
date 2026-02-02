import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import JSZip from "jszip";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { AISystemPDF } from "@/components/exports/AISystemPDF";
import { BoardPackPDF, type BoardPackData } from "@/components/exports/audience/BoardPackPDF";
import { CustomerTrustPackPDF, type CustomerTrustPackData } from "@/components/exports/audience/CustomerTrustPackPDF";
import { AuditorPackPDF, type AuditorPackData } from "@/components/exports/audience/AuditorPackPDF";
import { ProcurementPackPDF, type ProcurementPackData } from "@/components/exports/audience/ProcurementPackPDF";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { calculateAuditReadinessScore, getTopBlockers } from "@/lib/calculateAuditReadiness";

interface AISystemExportData {
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

export type AudiencePackType = "board" | "customer_trust" | "auditor" | "procurement";

export function useExports() {
  const { profile, user } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const queryClient = useQueryClient();

  const logExport = async (
    exportType: string,
    fileName: string,
    fileSizeBytes?: number,
    aiSystemId?: string
  ) => {
    if (!profile?.organization_id) return;
    
    try {
      await supabase.from("export_logs").insert({
        organization_id: profile.organization_id,
        user_id: profile.id,
        export_type: exportType,
        ai_system_id: aiSystemId || null,
        file_name: fileName,
        file_size_bytes: fileSizeBytes || null,
      });
      queryClient.invalidateQueries({ queryKey: ["export-history"] });
      queryClient.invalidateQueries({ queryKey: ["export-stats"] });
    } catch (error) {
      console.error("Failed to log export:", error);
    }
  };

  const fetchAISystemData = async (systemId: string): Promise<AISystemExportData | null> => {
    const { data, error } = await supabase
      .from("ai_systems")
      .select(`
        id,
        name,
        description,
        department,
        lifecycle_status,
        created_at,
        oversight_model,
        human_involvement,
        oversight_sop_status,
        operators_trained,
        has_automatic_logs,
        log_storage_location,
        log_retention_period,
        can_export_logs,
        processes_personal_data,
        special_category_data,
        dpia_status,
        training_exists,
        training_completion_status,
        vendor:vendors(name),
        primary_owner:profiles!ai_systems_primary_owner_id_fkey(full_name),
        classification:ai_system_classifications(*)
      `)
      .eq("id", systemId)
      .maybeSingle();

    if (error) throw error;
    return data as AISystemExportData | null;
  };

  const fetchEvidenceFiles = async (systemId: string) => {
    if (!profile?.organization_id) return [];

    const { data, error } = await supabase
      .from("evidence_files")
      .select("*")
      .eq("organization_id", profile.organization_id)
      .eq("ai_system_id", systemId);

    if (error) throw error;
    return data || [];
  };

  const downloadFile = async (filePath: string): Promise<Blob | null> => {
    const { data, error } = await supabase.storage
      .from("evidence")
      .download(filePath);

    if (error) {
      console.error("Error downloading file:", error);
      return null;
    }

    return data;
  };

  const getOrganization = async () => {
    if (!profile?.organization_id) return { name: "Unknown Organization" };

    const { data } = await supabase
      .from("organizations")
      .select("name, regulatory_timeline_mode")
      .eq("id", profile.organization_id)
      .single();

    return data || { name: "Unknown Organization", regulatory_timeline_mode: "current_law" };
  };

  const getRulesetVersion = async () => {
    const { data } = await supabase
      .from("regulatory_rulesets")
      .select("version")
      .eq("is_current", true)
      .single();

    return data?.version || "2025.02.01";
  };

  const exportAISystemPDF = async (systemId: string, showWatermark = false) => {
    setIsExporting(true);
    try {
      const system = await fetchAISystemData(systemId);
      if (!system) throw new Error("System not found");

      const organization = await getOrganization();
      const generatedBy = profile?.full_name || user?.email || "Unknown";

      const doc = AISystemPDF({
        system,
        organization,
        generatedBy,
        showWatermark,
      });

      const blob = await pdf(doc).toBlob();
      const fileName = `${system.name.replace(/[^a-z0-9]/gi, "_")}_Evidence_Pack.pdf`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await logExport("ai_system_pdf", fileName, blob.size, systemId);

      toast.success("PDF exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export PDF");
    } finally {
      setIsExporting(false);
    }
  };

  const exportAISystemZIP = async (systemId: string, options?: { includeEvidence?: boolean; showWatermark?: boolean }) => {
    setIsExporting(true);
    try {
      const system = await fetchAISystemData(systemId);
      if (!system) throw new Error("System not found");

      const organization = await getOrganization();
      const generatedBy = profile?.full_name || user?.email || "Unknown";

      const zip = new JSZip();

      const doc = AISystemPDF({
        system,
        organization,
        generatedBy,
        showWatermark: options?.showWatermark,
      });
      const pdfBlob = await pdf(doc).toBlob();
      zip.file("AI_System_Evidence_Pack.pdf", pdfBlob);

      if (options?.includeEvidence) {
        const evidenceFiles = await fetchEvidenceFiles(systemId);
        const evidenceFolder = zip.folder("Evidence");

        for (const file of evidenceFiles) {
          const fileBlob = await downloadFile(file.file_path);
          if (fileBlob && evidenceFolder) {
            evidenceFolder.file(file.name, fileBlob);
          }
        }
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const fileName = `${system.name.replace(/[^a-z0-9]/gi, "_")}_Evidence_Pack.zip`;
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await logExport("ai_system_zip", fileName, zipBlob.size, systemId);

      toast.success("ZIP exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export ZIP");
    } finally {
      setIsExporting(false);
    }
  };

  const exportAllSystems = async (showWatermark = false) => {
    setIsExporting(true);
    try {
      if (!profile?.organization_id) throw new Error("No organization");

      const { data: systems, error } = await supabase
        .from("ai_systems")
        .select(`
          *,
          vendor:vendors(name),
          primary_owner:profiles!ai_systems_primary_owner_id_fkey(full_name),
          classification:ai_system_classifications(*)
        `)
        .eq("organization_id", profile.organization_id);

      if (error) throw error;
      if (!systems || systems.length === 0) {
        toast.error("No AI systems to export");
        return;
      }

      const organization = await getOrganization();
      const generatedBy = profile?.full_name || user?.email || "Unknown";

      const zip = new JSZip();

      for (const system of systems) {
        const systemFolder = zip.folder(system.name.replace(/[^a-z0-9]/gi, "_"));
        if (!systemFolder) continue;

        const doc = AISystemPDF({
          system: system as AISystemExportData,
          organization,
          generatedBy,
          showWatermark,
        });
        const pdfBlob = await pdf(doc).toBlob();
        systemFolder.file("Evidence_Pack.pdf", pdfBlob);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const fileName = `${organization.name.replace(/[^a-z0-9]/gi, "_")}_AI_Systems_Export.zip`;
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await logExport("org_pack", fileName, zipBlob.size);

      toast.success(`Exported ${systems.length} AI systems`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export systems");
    } finally {
      setIsExporting(false);
    }
  };

  // New audience-specific export functions
  const exportBoardPack = async () => {
    setIsExporting(true);
    try {
      if (!profile?.organization_id) throw new Error("No organization");

      const [organization, rulesetVersion] = await Promise.all([
        getOrganization(),
        getRulesetVersion(),
      ]);

      // Fetch metrics
      const { data: systems } = await supabase
        .from("ai_systems")
        .select("id, classification:ai_system_classifications(risk_level)")
        .eq("organization_id", profile.organization_id);

      const riskDistribution = {
        minimal: 0,
        limited: 0,
        highRisk: 0,
        prohibited: 0,
        unclassified: 0,
      };

      systems?.forEach((s) => {
        const level = (s.classification as any)?.risk_level;
        if (level === "minimal_risk") riskDistribution.minimal++;
        else if (level === "limited_risk") riskDistribution.limited++;
        else if (level === "high_risk") riskDistribution.highRisk++;
        else if (level === "prohibited") riskDistribution.prohibited++;
        else riskDistribution.unclassified++;
      });

      // Calculate real readiness score and blockers
      const [readinessResult, topBlockers] = await Promise.all([
        calculateAuditReadinessScore(profile.organization_id),
        getTopBlockers(profile.organization_id),
      ]);

      const data: BoardPackData = {
        organization,
        generatedBy: profile?.full_name || user?.email || "Unknown",
        rulesetVersion,
        timelineMode: (organization as any).regulatory_timeline_mode || "current_law",
        metrics: {
          totalSystems: systems?.length || 0,
          highRiskCount: riskDistribution.highRisk + riskDistribution.prohibited,
          pendingClassification: riskDistribution.unclassified,
          readinessScore: readinessResult.overallScore,
        },
        riskDistribution,
        topBlockers: topBlockers.length > 0 ? topBlockers : [
          { title: "No blockers detected", description: "Your organization is on track for compliance", severity: "medium" as const },
        ],
        keyDeadlines: [
          { date: "2 Feb 2025", description: "Prohibited practices + AI literacy obligations apply" },
          { date: "2 Aug 2025", description: "GPAI model provider obligations apply" },
          { date: "2 Aug 2026", description: "Full applicability of most provisions" },
        ],
      };

      const doc = BoardPackPDF(data);
      const blob = await pdf(doc).toBlob();
      const fileName = `${organization.name.replace(/[^a-z0-9]/gi, "_")}_Board_Pack.pdf`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await logExport("board_pack", fileName, blob.size);
      toast.success("Board Pack exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export Board Pack");
    } finally {
      setIsExporting(false);
    }
  };

  const exportCustomerTrustPack = async () => {
    setIsExporting(true);
    try {
      const [organization, rulesetVersion] = await Promise.all([
        getOrganization(),
        getRulesetVersion(),
      ]);

      const data: CustomerTrustPackData = {
        organization,
        generatedBy: profile?.full_name || user?.email || "Unknown",
        rulesetVersion,
        timelineMode: (organization as any).regulatory_timeline_mode || "current_law",
        aiGovernanceStatement: "We are committed to the responsible development and deployment of AI systems. Our governance framework ensures transparency, accountability, and compliance with the EU AI Act.",
        transparencyPractices: [
          "All AI-powered features are clearly disclosed to users",
          "AI-generated content is labeled appropriately",
          "Users are informed when interacting with AI systems",
          "We provide explanations of how AI decisions are made",
        ],
        dataHandlingPractices: [
          "Personal data is processed in accordance with GDPR",
          "AI model inputs are minimized to what's necessary",
          "Data retention periods are defined and enforced",
          "Users can request human review of AI decisions",
        ],
        vendorAttestations: [],
        complianceHighlights: [
          "Complete AI system inventory maintained",
          "Risk classification performed for all AI systems",
          "Human oversight procedures in place",
          "Staff AI literacy training program active",
        ],
      };

      const doc = CustomerTrustPackPDF(data);
      const blob = await pdf(doc).toBlob();
      const fileName = `${organization.name.replace(/[^a-z0-9]/gi, "_")}_Trust_Pack.pdf`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await logExport("customer_trust_pack", fileName, blob.size);
      toast.success("Customer Trust Pack exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export Customer Trust Pack");
    } finally {
      setIsExporting(false);
    }
  };

  const exportAuditorPack = async () => {
    setIsExporting(true);
    try {
      if (!profile?.organization_id) throw new Error("No organization");

      const [organization, rulesetVersion] = await Promise.all([
        getOrganization(),
        getRulesetVersion(),
      ]);

      // Fetch systems with history
      const { data: systems } = await supabase
        .from("ai_systems")
        .select(`
          id, name,
          classification:ai_system_classifications(risk_level)
        `)
        .eq("organization_id", profile.organization_id);

      const auditSystems = (systems || []).map((s) => ({
        id: s.id,
        name: s.name,
        riskLevel: (s.classification as any)?.risk_level || "not_classified",
        classificationHistory: [
          {
            versionNumber: 1,
            riskLevel: (s.classification as any)?.risk_level || "not_classified",
            classifiedAt: format(new Date(), "PPP"),
            classifiedBy: "System",
            aiAssisted: false,
          },
        ],
        controls: [],
        evidence: [],
      }));

      const data: AuditorPackData = {
        organization,
        generatedBy: profile?.full_name || user?.email || "Unknown",
        rulesetVersion,
        timelineMode: (organization as any).regulatory_timeline_mode || "current_law",
        systems: auditSystems,
        auditPeriod: {
          start: format(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), "PPP"),
          end: format(new Date(), "PPP"),
        },
      };

      const doc = AuditorPackPDF(data);
      const blob = await pdf(doc).toBlob();
      const fileName = `${organization.name.replace(/[^a-z0-9]/gi, "_")}_Auditor_Pack.pdf`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await logExport("auditor_pack", fileName, blob.size);
      toast.success("Auditor Pack exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export Auditor Pack");
    } finally {
      setIsExporting(false);
    }
  };

  const exportProcurementPack = async () => {
    setIsExporting(true);
    try {
      if (!profile?.organization_id) throw new Error("No organization");

      const [organization, rulesetVersion] = await Promise.all([
        getOrganization(),
        getRulesetVersion(),
      ]);

      // Fetch vendors
      const { data: vendors } = await supabase
        .from("vendors")
        .select("id, name")
        .eq("organization_id", profile.organization_id);

      const vendorData = (vendors || []).map((v) => ({
        id: v.id,
        name: v.name,
        status: "pending" as const,
        attestations: [],
        aiSystemsCount: 0,
        riskLevel: "Unknown",
      }));

      const data: ProcurementPackData = {
        organization,
        generatedBy: profile?.full_name || user?.email || "Unknown",
        rulesetVersion,
        timelineMode: (organization as any).regulatory_timeline_mode || "current_law",
        vendors: vendorData,
        controlCategories: [
          {
            name: "Vendor Governance (VEN)",
            controls: [
              { id: "VEN-01", name: "Vendor Identified & Contract Stored", status: "implemented" },
              { id: "VEN-02", name: "Vendor AI Use Description Captured", status: "in_progress" },
              { id: "VEN-03", name: "Vendor Security Evidence Stored", status: "not_started" },
            ],
          },
        ],
        securityPosture: {
          encryptionAtRest: "AES-256",
          encryptionInTransit: "TLS 1.3",
          accessControl: "Role-based (RBAC)",
          auditLogging: "Enabled",
          dataResidency: "EU (Ireland)",
          certifications: [],
        },
        dpaDetails: {
          subprocessors: [],
          dataCategories: ["Usage data", "Account data"],
          retentionPeriod: "Duration of contract + 2 years",
        },
      };

      const doc = ProcurementPackPDF(data);
      const blob = await pdf(doc).toBlob();
      const fileName = `${organization.name.replace(/[^a-z0-9]/gi, "_")}_Procurement_Pack.pdf`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await logExport("procurement_pack", fileName, blob.size);
      toast.success("Procurement Pack exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export Procurement Pack");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportAISystemPDF,
    exportAISystemZIP,
    exportAllSystems,
    // Audience packs
    exportBoardPack,
    exportCustomerTrustPack,
    exportAuditorPack,
    exportProcurementPack,
  };
}
