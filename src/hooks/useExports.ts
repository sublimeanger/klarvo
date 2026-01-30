import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import JSZip from "jszip";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { AISystemPDF } from "@/components/exports/AISystemPDF";

interface AISystemExportData {
  id: string;
  name: string;
  description?: string | null;
  department?: string | null;
  lifecycle_status: string;
  vendor?: { name: string } | null;
  primary_owner?: { full_name: string | null } | null;
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

interface ExportOptions {
  includeEvidence?: boolean;
  includeClassification?: boolean;
  format: "pdf" | "zip";
}

export function useExports() {
  const { profile, user } = useAuth();
  const [isExporting, setIsExporting] = useState(false);

  const fetchAISystemData = async (systemId: string): Promise<AISystemExportData | null> => {
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
      .select("name")
      .eq("id", profile.organization_id)
      .single();

    return data || { name: "Unknown Organization" };
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

      // Download the file
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${system.name.replace(/[^a-z0-9]/gi, "_")}_Evidence_Pack.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

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

      // Add PDF to ZIP
      const doc = AISystemPDF({
        system,
        organization,
        generatedBy,
        showWatermark: options?.showWatermark,
      });
      const pdfBlob = await pdf(doc).toBlob();
      zip.file("AI_System_Evidence_Pack.pdf", pdfBlob);

      // Add evidence files if requested
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

      // Generate ZIP and download
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${system.name.replace(/[^a-z0-9]/gi, "_")}_Evidence_Pack.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

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

        // Add PDF for each system
        const doc = AISystemPDF({
          system: system as AISystemExportData,
          organization,
          generatedBy,
          showWatermark,
        });
        const pdfBlob = await pdf(doc).toBlob();
        systemFolder.file("Evidence_Pack.pdf", pdfBlob);
      }

      // Generate ZIP and download
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${organization.name.replace(/[^a-z0-9]/gi, "_")}_AI_Systems_Export.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`Exported ${systems.length} AI systems`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export systems");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportAISystemPDF,
    exportAISystemZIP,
    exportAllSystems,
  };
}
