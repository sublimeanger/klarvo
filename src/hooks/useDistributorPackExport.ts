import { useState } from "react";
import JSZip from "jszip";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { logger } from "@/lib/logger";
import type { DistributorVerificationData } from "@/components/exports/distributor";

interface DistributorPackOptions {
  aiSystemId: string;
  includeEvidence?: boolean;
}

export function useDistributorPackExport() {
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

  const fetchDistributorVerification = async (systemId: string) => {
    const { data, error } = await supabase
      .from("distributor_verifications")
      .select(`
        *,
        verifier:profiles!distributor_verifications_verified_by_fkey(full_name)
      `)
      .eq("ai_system_id", systemId)
      .maybeSingle();

    if (error) throw error;
    return data;
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

  const exportDistributorPack = async (options: DistributorPackOptions) => {
    setIsExporting(true);
    try {
      toast.info("Preparing Distributor Pack...");
      const { aiSystemId, includeEvidence = true } = options;

      const system = await fetchAISystem(aiSystemId);
      if (!system) throw new Error("AI System not found");

      const organization = await getOrganization();
      const generatedBy = profile?.full_name || user?.email || "Unknown";
      const dateStr = format(new Date(), "yyyy-MM-dd");
      const systemSlug = system.name.replace(/[^a-z0-9]/gi, "_");
      const orgSlug = organization.name.replace(/[^a-z0-9]/gi, "_");

      const zip = new JSZip();

      const rootName = `EU-AI-Act_DistributorPack_${orgSlug}_${systemSlug}_${dateStr}`;
      const root = zip.folder(rootName)!;

      // Fetch distributor verification data
      const verification = await fetchDistributorVerification(aiSystemId);
      const evidenceFiles = await fetchEvidenceFiles(aiSystemId);

      // 00_Summary
      const summaryFolder = root.folder("00_Summary")!;
      summaryFolder.file("System_Record.json", createJSONFile({
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

      // 01_Distributor_Verification - Generate PDF
      const verificationFolder = root.folder("01_Distributor_Verification_Article24")!;
      if (verification) {
        const verificationData: DistributorVerificationData = {
          id: verification.id,
          ai_system_id: verification.ai_system_id,
          verification_data: (verification.verification_data || {}) as Record<string, boolean | null>,
          has_rebranded: verification.has_rebranded || false,
          has_modified: verification.has_modified || false,
          escalation_to_provider_triggered: verification.escalation_to_provider_triggered || false,
          escalation_notes: verification.escalation_notes,
          status: verification.status,
          non_compliance_details: verification.non_compliance_details,
          corrective_actions_taken: verification.corrective_actions_taken,
          verified_by: verification.verified_by,
          verified_at: verification.verified_at,
          notes: verification.notes,
          created_at: verification.created_at,
        };

        const [{ pdf }, { DistributorVerificationPDF }] = await Promise.all([
          import("@react-pdf/renderer"),
          import("@/components/exports/distributor"),
        ]);
        const pdfBlob = await pdf(
          DistributorVerificationPDF({
            verification: verificationData,
            systemName: system.name,
            organizationName: organization.name,
            verifierName: verification.verifier?.full_name,
            generatedBy,
          })
        ).toBlob();
        verificationFolder.file("Distributor_Verification_Record.pdf", pdfBlob);
        verificationFolder.file("Verification_Data.json", createJSONFile(verification));

        // Add escalation warning if triggered
        if (verification.escalation_to_provider_triggered) {
          const escalationNote = `ARTICLE 25 ESCALATION WARNING
==============================

This distributor has been flagged as potentially being considered a Provider under Article 25 of the EU AI Act.

Reason(s):
${verification.has_rebranded ? "- Has rebranded the AI system under their name or trademark\n" : ""}${verification.has_modified ? "- Has made substantial modifications to the AI system\n" : ""}

Escalation Notes:
${verification.escalation_notes || "No additional notes provided."}

REQUIRED ACTION:
If this escalation is confirmed, the organization must comply with Provider obligations under Articles 16-22 of the EU AI Act.

Generated: ${format(new Date(), "dd MMMM yyyy, HH:mm")}
`;
          verificationFolder.file("ESCALATION_WARNING.txt", createTextFile(escalationNote));
        }
      }

      // 02_Classification
      const classFolder = root.folder("02_Classification")!;
      if (system.classification) {
        classFolder.file("Classification_Record.json", createJSONFile(system.classification));
      }

      // 03_Evidence
      if (includeEvidence && evidenceFiles.length > 0) {
        const evidenceFolder = root.folder("03_Evidence")!;
        
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
      await logExport("distributor_pack", fileName, zipBlob.size, aiSystemId);

      toast.success("Distributor Pack exported successfully");
    } catch (error) {
      logger.error("Distributor Pack export error:", error);
      toast.error("Failed to export Distributor Pack");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportDistributorPack,
  };
}
