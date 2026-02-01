import { useMemo } from "react";
import { useTechnicalDocumentation } from "./useTechnicalDocumentation";
import { useRiskRecords } from "./useRiskManagement";
import { useQMSDocuments } from "./useQMS";
import { useConformityAssessment } from "./useConformityAssessment";
import { useEUDeclaration } from "./useEUDeclaration";
import { useCEMarkingRecords } from "./useCEMarking";
import { useEURegistration } from "./useEURegistration";
import { usePostMarketMonitoringPlan } from "./usePostMarketMonitoring";

export interface ReadinessCategory {
  name: string;
  weight: number;
  score: number;
  status: 'complete' | 'in_progress' | 'not_started' | 'blocking';
  blocking?: string;
  article?: string;
}

export interface ProviderReadinessResult {
  overallScore: number;
  categories: ReadinessCategory[];
  blockingIssues: string[];
  isLoading: boolean;
}

export function useProviderReadiness(versionId?: string): ProviderReadinessResult {
  const { data: techDoc, isLoading: loadingTechDoc } = useTechnicalDocumentation(versionId);
  const { data: riskRecords, isLoading: loadingRisk } = useRiskRecords(versionId);
  const { data: qmsDocs, isLoading: loadingQMS } = useQMSDocuments();
  const { data: conformity, isLoading: loadingConformity } = useConformityAssessment(versionId);
  const { data: declaration, isLoading: loadingDeclaration } = useEUDeclaration(versionId);
  const { data: ceMarkingRecords, isLoading: loadingCE } = useCEMarkingRecords(versionId);
  const { data: registration, isLoading: loadingReg } = useEURegistration(versionId);
  const { data: monitoring, isLoading: loadingMonitoring } = usePostMarketMonitoringPlan(versionId);

  const isLoading = loadingTechDoc || loadingRisk || loadingQMS || loadingConformity || 
                    loadingDeclaration || loadingCE || loadingReg || loadingMonitoring;

  const result = useMemo(() => {
    const categories: ReadinessCategory[] = [];
    const blockingIssues: string[] = [];

    // 1. Technical Documentation (Annex IV) - Weight: 20%
    const techDocStatus = techDoc?.status === 'approved' ? 'complete' : 
                          techDoc ? 'in_progress' : 'not_started';
    categories.push({
      name: "Technical Documentation (Annex IV)",
      weight: 20,
      score: techDocStatus === 'complete' ? 100 : techDocStatus === 'in_progress' ? 50 : 0,
      status: techDocStatus,
      article: "Article 11"
    });

    // 2. Risk Management - Weight: 15%
    const hasRisks = riskRecords && riskRecords.length > 0;
    const riskStatus = hasRisks ? 'complete' : 'not_started';
    categories.push({
      name: "Risk Management System",
      weight: 15,
      score: riskStatus === 'complete' ? 100 : 0,
      status: riskStatus,
      article: "Article 9"
    });

    // 3. QMS - Weight: 15%
    const hasQMS = qmsDocs && qmsDocs.length > 0;
    const qmsApproved = qmsDocs?.filter(d => d.status === 'approved').length || 0;
    const qmsScore = hasQMS ? Math.min(100, (qmsApproved / 4) * 100) : 0; // Expect 4 core QMS docs
    categories.push({
      name: "Quality Management System",
      weight: 15,
      score: qmsScore,
      status: qmsScore === 100 ? 'complete' : qmsScore > 0 ? 'in_progress' : 'not_started',
      article: "Article 17"
    });

    // 4. Conformity Assessment - Weight: 15%
    const conformityStatus = conformity?.status === 'certified' ? 'complete' :
                             conformity ? 'in_progress' : 'not_started';
    if (!conformity) {
      blockingIssues.push("Conformity assessment not started");
    }
    categories.push({
      name: "Conformity Assessment",
      weight: 15,
      score: conformityStatus === 'complete' ? 100 : conformityStatus === 'in_progress' ? 50 : 0,
      status: conformityStatus,
      article: "Article 43"
    });

    // 5. EU Declaration - Weight: 10%
    const declarationStatus = declaration?.signed_at ? 'complete' : 
                              declaration ? 'in_progress' : 'not_started';
    categories.push({
      name: "EU Declaration of Conformity",
      weight: 10,
      score: declarationStatus === 'complete' ? 100 : declarationStatus === 'in_progress' ? 50 : 0,
      status: declarationStatus,
      article: "Annex V"
    });

    // 6. CE Marking - Weight: 5%
    const ceMarking = ceMarkingRecords && ceMarkingRecords.length > 0 ? ceMarkingRecords[0] : null;
    const ceStatus = ceMarking?.verified_at ? 'complete' : 
                     ceMarking ? 'in_progress' : 'not_started';
    categories.push({
      name: "CE Marking",
      weight: 5,
      score: ceStatus === 'complete' ? 100 : ceStatus === 'in_progress' ? 50 : 0,
      status: ceStatus,
      article: "Article 48"
    });

    // 7. EU Registration - Weight: 10%
    const regStatus = registration?.registration_status === 'submitted' || registration?.registration_status === 'registered' ? 'complete' :
                      registration ? 'in_progress' : 'not_started';
    categories.push({
      name: "EU Database Registration",
      weight: 10,
      score: regStatus === 'complete' ? 100 : regStatus === 'in_progress' ? 50 : 0,
      status: regStatus,
      article: "Article 49"
    });

    // 8. Post-Market Monitoring - Weight: 10%
    const monitoringStatus = monitoring?.status === 'approved' ? 'complete' :
                             monitoring ? 'in_progress' : 'not_started';
    categories.push({
      name: "Post-Market Monitoring",
      weight: 10,
      score: monitoringStatus === 'complete' ? 100 : monitoringStatus === 'in_progress' ? 50 : 0,
      status: monitoringStatus,
      article: "Article 72"
    });

    // Calculate overall score
    const overallScore = categories.reduce((sum, cat) => {
      return sum + (cat.score * cat.weight / 100);
    }, 0);

    return {
      overallScore: Math.round(overallScore),
      categories,
      blockingIssues,
      isLoading
    };
  }, [techDoc, riskRecords, qmsDocs, conformity, declaration, ceMarkingRecords, registration, monitoring, isLoading]);

  return result;
}
