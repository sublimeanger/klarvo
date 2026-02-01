import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import JSZip from "jszip";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

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
      console.error("Failed to log export:", error);
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
      console.error("Error downloading file:", error);
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

  const exportProviderPack = async (options: ProviderPackOptions) => {
    setIsExporting(true);
    try {
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

      // 00_Executive
      const execFolder = root.folder("00_Executive")!;
      execFolder.file("Provider_Executive_Summary.txt", createTextFile(`
Provider Executive Summary
==========================
Generated: ${new Date().toISOString()}
Generated By: ${generatedBy}
Organization: ${organization.name}

AI System: ${system.name}
Status: ${system.lifecycle_status}
Department: ${system.department || "N/A"}

Classification: ${system.classification?.risk_level || "Not classified"}
Is High-Risk Candidate: ${system.classification?.is_high_risk_candidate ? "Yes" : "No"}
Has Prohibited Indicators: ${system.classification?.has_prohibited_indicators ? "Yes" : "No"}

This pack contains all documentation required for EU AI Act provider compliance.
      `));

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

      // Fetch version-specific data if versionId is provided
      let version = null;
      if (versionId) {
        version = await fetchVersion(versionId);
      }

      // 03_Technical_Documentation_AnnexIV
      const techFolder = root.folder("03_Technical_Documentation_AnnexIV")!;
      if (versionId) {
        const techDocs = await fetchTechnicalDocs(versionId);
        if (techDocs) {
          techFolder.file("AnnexIV_Documentation.json", createJSONFile(techDocs));
        }

        const riskRecords = await fetchRiskRecords(versionId);
        if (riskRecords.length > 0) {
          techFolder.file("Risk_Management_Records.json", createJSONFile(riskRecords));
        }

        const datasets = await fetchDatasets(versionId);
        if (datasets.length > 0) {
          techFolder.file("Dataset_Registry.json", createJSONFile(datasets));
        }
      }

      // 04_QMS_Article17
      const qmsFolder = root.folder("04_QMS_Article17")!;
      const qmsDocs = await fetchQMSDocs();
      if (qmsDocs.length > 0) {
        qmsFolder.file("QMS_Documents.json", createJSONFile(qmsDocs));
      }

      // 05_Conformity_Assessment_Article43
      const confFolder = root.folder("05_Conformity_Assessment_Article43")!;
      if (versionId) {
        const conformityAssessments = await fetchConformityAssessments(versionId);
        if (conformityAssessments.length > 0) {
          confFolder.file("Conformity_Assessments.json", createJSONFile(conformityAssessments));
        }
      }

      // 06_EU_Declaration_AnnexV
      const docFolder = root.folder("06_EU_Declaration_AnnexV")!;
      if (versionId) {
        const declarations = await fetchDeclarations(versionId);
        if (declarations.length > 0) {
          docFolder.file("EU_Declarations.json", createJSONFile(declarations));
        }
      }

      // 07_CE_Marking_Article48
      const ceFolder = root.folder("07_CE_Marking_Article48")!;
      if (versionId) {
        const ceMarkings = await fetchCEMarkings(versionId);
        if (ceMarkings.length > 0) {
          ceFolder.file("CE_Marking_Records.json", createJSONFile(ceMarkings));
        }
      }

      // 08_EU_Registration_Article49
      const regFolder = root.folder("08_EU_Registration_Article49")!;
      if (versionId) {
        const registrations = await fetchRegistrations(versionId);
        if (registrations.length > 0) {
          regFolder.file("Registration_Records.json", createJSONFile(registrations));
        }
      }

      // 09_PostMarketMonitoring_Article72
      const pmsFolder = root.folder("09_PostMarketMonitoring_Article72")!;
      if (versionId) {
        const monitoringPlans = await fetchMonitoringPlans(versionId);
        if (monitoringPlans.length > 0) {
          pmsFolder.file("Monitoring_Plans.json", createJSONFile(monitoringPlans));
        }
      }

      // 10_Serious_Incidents_Article73
      const incFolder = root.folder("10_Serious_Incidents_Article73")!;
      const seriousIncidents = await fetchSeriousIncidents(aiSystemId);
      if (seriousIncidents.length > 0) {
        incFolder.file("Serious_Incident_Reports.json", createJSONFile(seriousIncidents));
      }

      // 98_Supporting_Evidence
      if (includeEvidence) {
        const evidenceFolder = root.folder("98_Supporting_Evidence")!;
        const evidenceFiles = await fetchEvidenceFiles(aiSystemId);
        
        for (const file of evidenceFiles) {
          const fileBlob = await downloadFile(file.file_path);
          if (fileBlob) {
            evidenceFolder.file(file.name, fileBlob);
          }
        }
      }

      // Evidence_Index.csv
      const evidenceFiles = await fetchEvidenceFiles(aiSystemId);
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
      console.error("Provider Pack export error:", error);
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
