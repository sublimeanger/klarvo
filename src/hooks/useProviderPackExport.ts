import { useState } from "react";
import JSZip from "jszip";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { logger } from "@/lib/logger";
import type {
  TechnicalDocumentation,
  RiskRecord,
  Dataset,
  EUDeclaration,
  CEMarkingRecord,
  ProviderComplianceStatus,
} from "@/components/exports/provider";

interface ProviderPackOptions {
  aiSystemId: string;
  versionId?: string;
  includeEvidence?: boolean;
}

export function useProviderPackExport() {
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
      logger.error("Failed to log export:", error);
    }
  };

  const getOrganization = async () => {
    if (!profile?.organization_id) return { name: "Unknown Organization" };

    const { data } = await supabase
      .from("organizations")
      .select("name")
      .eq("id", profile.organization_id)
      .single();

    return data || { name: "Unknown Organization" };
  };

  const fetchAISystem = async (systemId: string) => {
    const { data, error } = await supabase
      .from("ai_systems")
      .select(`
        *,
        vendor:vendors(name),
        primary_owner:profiles!ai_systems_primary_owner_id_fkey(full_name),
        classification:ai_system_classifications(*)
      `)
      .eq("id", systemId)
      .maybeSingle();

    if (error) throw error;
    return data;
  };

  const fetchVersion = async (versionId: string) => {
    const { data, error } = await supabase
      .from("ai_system_versions")
      .select("*")
      .eq("id", versionId)
      .maybeSingle();

    if (error) throw error;
    return data;
  };

  const fetchTechnicalDocs = async (versionId: string) => {
    const { data, error } = await supabase
      .from("technical_documentation_annexiv")
      .select("*")
      .eq("ai_system_version_id", versionId)
      .maybeSingle();

    if (error) throw error;
    return data;
  };

  const fetchQMSDocs = async () => {
    if (!profile?.organization_id) return [];

    const { data, error } = await supabase
      .from("qms_documents")
      .select("*")
      .eq("organization_id", profile.organization_id)
      .eq("status", "approved");

    if (error) throw error;
    return data || [];
  };

  const fetchConformityAssessments = async (versionId: string) => {
    const { data, error } = await supabase
      .from("conformity_assessments")
      .select("*")
      .eq("ai_system_version_id", versionId);

    if (error) throw error;
    return data || [];
  };

  const fetchDeclarations = async (versionId: string) => {
    const { data, error } = await supabase
      .from("eu_declarations_of_conformity")
      .select("*")
      .eq("ai_system_version_id", versionId);

    if (error) throw error;
    return data || [];
  };

  const fetchCEMarkings = async (versionId: string) => {
    const { data, error } = await supabase
      .from("ce_marking_records")
      .select("*")
      .eq("ai_system_version_id", versionId);

    if (error) throw error;
    return data || [];
  };

  const fetchRegistrations = async (versionId: string) => {
    const { data, error } = await supabase
      .from("eu_registration_records")
      .select("*")
      .eq("ai_system_version_id", versionId);

    if (error) throw error;
    return data || [];
  };

  const fetchMonitoringPlans = async (versionId: string) => {
    const { data, error } = await supabase
      .from("post_market_monitoring_plans")
      .select("*")
      .eq("ai_system_version_id", versionId);

    if (error) throw error;
    return data || [];
  };

  const fetchSeriousIncidents = async (systemId: string) => {
    const { data, error } = await supabase
      .from("serious_incident_reports")
      .select("*")
      .eq("ai_system_id", systemId);

    if (error) throw error;
    return data || [];
  };

  const fetchRiskRecords = async (versionId: string) => {
    const { data, error } = await supabase
      .from("risk_management_records")
      .select("*")
      .eq("ai_system_version_id", versionId);

    if (error) throw error;
    return data || [];
  };

  const fetchDatasets = async (versionId: string) => {
    const { data, error } = await supabase
      .from("dataset_registry")
      .select("*")
      .eq("ai_system_version_id", versionId);

    if (error) throw error;
    return data || [];
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
      logger.error("Error downloading file:", error);
      return null;
    }

    return data;
  };

  const createTextFile = (content: string): Blob => {
    return new Blob([content], { type: "text/plain" });
  };

  const createJSONFile = (data: unknown): Blob => {
    return new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  };

  const calculateTechDocsPercent = (techDocs: TechnicalDocumentation | null): number => {
    if (!techDocs) return 0;
    
    const fields = [
      techDocs.general_description,
      techDocs.intended_purpose,
      techDocs.design_specifications,
      techDocs.development_process,
      techDocs.monitoring_functioning,
      techDocs.risk_management_measures,
      techDocs.changes_modifications,
      techDocs.validation_testing,
      techDocs.cybersecurity_measures,
      techDocs.accuracy_metrics,
      techDocs.human_oversight_measures,
      techDocs.expected_lifetime,
    ];
    
    const completed = fields.filter(f => f && f.length >= 50).length;
    const partial = fields.filter(f => f && f.length > 0 && f.length < 50).length;
    
    return Math.round(((completed + partial * 0.5) / fields.length) * 100);
  };

  const exportProviderPack = async (options: ProviderPackOptions) => {
    setIsExporting(true);
    try {
      toast.info("Preparing Provider Pack...");
      const { aiSystemId, versionId, includeEvidence = true } = options;

      const system = await fetchAISystem(aiSystemId);
      if (!system) throw new Error("AI System not found");

      const organization = await getOrganization();
      const generatedBy = profile?.full_name || user?.email || "Unknown";
      const dateStr = format(new Date(), "yyyy-MM-dd");
      const systemSlug = system.name.replace(/[^a-z0-9]/gi, "_");
      const orgSlug = organization.name.replace(/[^a-z0-9]/gi, "_");

      const zip = new JSZip();

      // Create folder structure per the plan
      const rootName = `EU-AI-Act_ProviderPack_${orgSlug}_${systemSlug}_${dateStr}`;
      const root = zip.folder(rootName)!;

      // Fetch version-specific data if versionId is provided
      let version = null;
      let techDocs: TechnicalDocumentation | null = null;
      let riskRecords: RiskRecord[] = [];
      let datasets: Dataset[] = [];
      let conformityAssessments: unknown[] = [];
      let declarations: EUDeclaration[] = [];
      let ceMarkings: CEMarkingRecord[] = [];
      let registrations: unknown[] = [];
      let monitoringPlans: unknown[] = [];

      if (versionId) {
        version = await fetchVersion(versionId);
        techDocs = await fetchTechnicalDocs(versionId) as TechnicalDocumentation | null;
        riskRecords = (await fetchRiskRecords(versionId)) as RiskRecord[];
        datasets = (await fetchDatasets(versionId)) as Dataset[];
        conformityAssessments = await fetchConformityAssessments(versionId);
        declarations = (await fetchDeclarations(versionId)) as EUDeclaration[];
        ceMarkings = (await fetchCEMarkings(versionId)) as CEMarkingRecord[];
        registrations = await fetchRegistrations(versionId);
        monitoringPlans = await fetchMonitoringPlans(versionId);
      }

      const qmsDocs = await fetchQMSDocs();
      const seriousIncidents = await fetchSeriousIncidents(aiSystemId);
      const evidenceFiles = await fetchEvidenceFiles(aiSystemId);

      // Calculate compliance status for executive summary
      const complianceStatus: ProviderComplianceStatus = {
        technicalDocsComplete: !!techDocs,
        technicalDocsPercent: techDocs ? calculateTechDocsPercent(techDocs) : 0,
        qmsDocumentsCount: qmsDocs.length,
        conformityAssessmentStatus: conformityAssessments.length > 0 
          ? (conformityAssessments[0] as { status?: string })?.status || "draft" 
          : "not_started",
        declarationStatus: declarations.length > 0 ? declarations[0].status : "not_started",
        ceMarkingStatus: ceMarkings.length > 0 
          ? (ceMarkings[0].verified_at ? "verified" : "pending") 
          : "not_started",
        registrationStatus: registrations.length > 0 
          ? (registrations[0] as { status?: string })?.status || "draft" 
          : "not_started",
        monitoringPlanExists: monitoringPlans.length > 0,
        incidentsCount: seriousIncidents.length,
        riskRecordsCount: riskRecords.length,
        datasetsCount: datasets.length,
      };

      // Lazy-load PDF renderer and all provider PDF components
      const [
        { pdf },
        { AnnexIVTechDocsPDF, EUDeclarationPDF, CEMarkingPDF, ProviderExecutiveSummaryPDF },
      ] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/exports/provider"),
      ]);

      // 00_Executive - Generate Executive Summary PDF
      const execFolder = root.folder("00_Executive")!;
      const execPdfBlob = await pdf(
        ProviderExecutiveSummaryPDF({
          system: {
            name: system.name,
            description: system.description,
            department: system.department,
            lifecycle_status: system.lifecycle_status,
            created_at: system.created_at,
            classification: system.classification ? {
              risk_level: system.classification.risk_level,
              is_high_risk_candidate: system.classification.is_high_risk_candidate || false,
            } : null,
          },
          version: {
            version_label: version?.version_label || "1.0",
            release_date: version?.release_date,
            status: version?.status || "draft",
          },
          complianceStatus,
          organizationName: organization.name,
          generatedBy,
        })
      ).toBlob();
      execFolder.file("Provider_Executive_Summary.pdf", execPdfBlob);

      // 01_Inventory
      const invFolder = root.folder("01_Inventory")!;
      invFolder.file("System_Record.json", createJSONFile({
        id: system.id,
        name: system.name,
        description: system.description,
        department: system.department,
        lifecycle_status: system.lifecycle_status,
        created_at: system.created_at,
        vendor: system.vendor?.name,
        primary_owner: system.primary_owner?.full_name,
        value_chain_role: system.value_chain_role,
      }));

      // 02_Classification
      const classFolder = root.folder("02_Classification")!;
      if (system.classification) {
        classFolder.file("Classification_Record.json", createJSONFile(system.classification));
      }

      // 03_Technical_Documentation_AnnexIV - Generate PDF
      const techFolder = root.folder("03_Technical_Documentation_AnnexIV")!;
      if (versionId) {
        const annexIVPdfBlob = await pdf(
          AnnexIVTechDocsPDF({
            techDocs,
            riskRecords,
            datasets,
            systemName: system.name,
            versionLabel: version?.version_label || "1.0",
            organizationName: organization.name,
            generatedBy,
          })
        ).toBlob();
        techFolder.file("AnnexIV_Technical_Documentation.pdf", annexIVPdfBlob);

        // Also include raw data as JSON for reference
        if (riskRecords.length > 0) {
          techFolder.file("Risk_Management_Records.json", createJSONFile(riskRecords));
        }
        if (datasets.length > 0) {
          techFolder.file("Dataset_Registry.json", createJSONFile(datasets));
        }
      }

      // 04_QMS_Article17
      const qmsFolder = root.folder("04_QMS_Article17")!;
      if (qmsDocs.length > 0) {
        qmsFolder.file("QMS_Documents.json", createJSONFile(qmsDocs));
      }

      // 05_Conformity_Assessment_Article43
      const confFolder = root.folder("05_Conformity_Assessment_Article43")!;
      if (conformityAssessments.length > 0) {
        confFolder.file("Conformity_Assessments.json", createJSONFile(conformityAssessments));
      }

      // 06_EU_Declaration_AnnexV - Generate PDF
      const docFolder = root.folder("06_EU_Declaration_AnnexV")!;
      if (declarations.length > 0) {
        const declaration = declarations[0];
        const declarationPdfBlob = await pdf(
          EUDeclarationPDF({
            declaration,
            systemName: system.name,
            versionLabel: version?.version_label || "1.0",
            organizationName: organization.name,
          })
        ).toBlob();
        docFolder.file("EU_Declaration_of_Conformity.pdf", declarationPdfBlob);
        docFolder.file("EU_Declarations_Data.json", createJSONFile(declarations));
      }

      // 07_CE_Marking_Article48 - Generate PDF
      const ceFolder = root.folder("07_CE_Marking_Article48")!;
      if (ceMarkings.length > 0) {
        const ceRecord = ceMarkings[0];
        const cePdfBlob = await pdf(
          CEMarkingPDF({
            ceRecord,
            systemName: system.name,
            versionLabel: version?.version_label || "1.0",
            organizationName: organization.name,
            verifierName: ceRecord.verified_by || undefined,
            hasDeclaration: declarations.length > 0 && declarations[0].status === "signed",
            hasConformityAssessment: conformityAssessments.length > 0 && 
              (conformityAssessments[0] as { status?: string })?.status === "approved",
            hasTechnicalDocs: !!techDocs,
          })
        ).toBlob();
        ceFolder.file("CE_Marking_Record.pdf", cePdfBlob);
        ceFolder.file("CE_Marking_Data.json", createJSONFile(ceMarkings));
      }

      // 08_EU_Registration_Article49
      const regFolder = root.folder("08_EU_Registration_Article49")!;
      if (registrations.length > 0) {
        regFolder.file("Registration_Records.json", createJSONFile(registrations));
      }

      // 09_PostMarketMonitoring_Article72
      const pmsFolder = root.folder("09_PostMarketMonitoring_Article72")!;
      if (monitoringPlans.length > 0) {
        pmsFolder.file("Monitoring_Plans.json", createJSONFile(monitoringPlans));
      }

      // 10_Serious_Incidents_Article73
      const incFolder = root.folder("10_Serious_Incidents_Article73")!;
      if (seriousIncidents.length > 0) {
        incFolder.file("Serious_Incident_Reports.json", createJSONFile(seriousIncidents));
      }

      // 98_Supporting_Evidence
      if (includeEvidence) {
        const evidenceFolder = root.folder("98_Supporting_Evidence")!;
        
        for (const file of evidenceFiles) {
          const fileBlob = await downloadFile(file.file_path);
          if (fileBlob) {
            evidenceFolder.file(file.name, fileBlob);
          }
        }
      }

      // Evidence_Index.csv
      const csvHeader = "Evidence_ID,Name,Type,Status,Uploaded_At,Uploaded_By\n";
      const csvRows = evidenceFiles.map((f, i) => 
        `EV-${String(i + 1).padStart(3, "0")},${f.name},${f.evidence_type || "Unknown"},${f.status},${f.created_at},${f.uploaded_by || "Unknown"}`
      ).join("\n");
      root.file("Evidence_Index.csv", createTextFile(csvHeader + csvRows));

      // Generate ZIP and download
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const fileName = `${rootName}.zip`;
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Log the export
      await logExport("provider_pack", fileName, zipBlob.size, aiSystemId);

      toast.success("Provider Pack exported successfully");
    } catch (error) {
      logger.error("Provider Pack export error:", error);
      toast.error("Failed to export Provider Pack");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportProviderPack,
  };
}
