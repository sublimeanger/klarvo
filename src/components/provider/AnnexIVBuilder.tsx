import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Save, 
  FileText, 
  Cpu, 
  Database, 
  Users, 
  TestTube, 
  Shield, 
  AlertTriangle,
  BookOpen,
  FileCheck,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  useTechnicalDocumentation, 
  useCreateTechnicalDocumentation, 
  useUpdateTechnicalDocumentation 
} from "@/hooks/useTechnicalDocumentation";

interface AnnexIVBuilderProps {
  versionId?: string;
  organizationId?: string;
}

const sections = [
  { id: "general", label: "General Description", icon: FileText },
  { id: "development", label: "Development Process", icon: Cpu },
  { id: "data", label: "Data Requirements", icon: Database },
  { id: "oversight", label: "Human Oversight", icon: Users },
  { id: "testing", label: "Testing Procedures", icon: TestTube },
  { id: "cybersecurity", label: "Cybersecurity", icon: Shield },
  { id: "risk", label: "Risk Management", icon: AlertTriangle },
  { id: "standards", label: "Standards Applied", icon: BookOpen },
  { id: "doc", label: "DoC Reference", icon: FileCheck },
  { id: "pms", label: "PMS Reference", icon: Activity },
];

export function AnnexIVBuilder({ versionId, organizationId }: AnnexIVBuilderProps) {
  const [activeSection, setActiveSection] = useState("general");
  const { toast } = useToast();
  
  const { data: existingDoc, isLoading } = useTechnicalDocumentation(versionId);
  const createDoc = useCreateTechnicalDocumentation();
  const updateDoc = useUpdateTechnicalDocumentation();

  const { register, handleSubmit, watch, formState: { isDirty } } = useForm({
    defaultValues: {
      // General Description
      purposeDescription: "",
      providerDetails: "",
      versionInfo: "",
      hardwareRequirements: "",
      softwareRequirements: "",
      // Development Process
      developmentMethods: "",
      thirdPartyTools: "",
      architectureDescription: "",
      // Data Requirements
      dataSheets: "",
      dataProvenance: "",
      dataLabeling: "",
      dataPreparation: "",
      // Human Oversight
      oversightMeasures: "",
      userInterface: "",
      interpretability: "",
      // Testing
      testingDatasets: "",
      metrics: "",
      testLogs: "",
      // Cybersecurity
      cybersecurityMeasures: "",
      vulnerabilityAssessment: "",
      // Risk Management
      riskDescription: "",
      residualRisks: "",
      // Standards
      harmonisedStandards: "",
      otherStandards: "",
      // References
      docReference: "",
      pmsReference: "",
    }
  });

  const calculateProgress = () => {
    const values = watch();
    const filledFields = Object.values(values).filter(v => v && v.toString().trim().length > 0).length;
    return Math.round((filledFields / Object.keys(values).length) * 100);
  };

  const onSave = async (data: any) => {
    if (!versionId || !organizationId) {
      toast({
        title: "Missing context",
        description: "Please select an AI system version first.",
        variant: "destructive"
      });
      return;
    }

    const docData = {
      general_description: {
        purpose: data.purposeDescription,
        provider: data.providerDetails,
        version: data.versionInfo,
        hardware: data.hardwareRequirements,
        software: data.softwareRequirements,
      },
      development_process: {
        methods: data.developmentMethods,
        third_party_tools: data.thirdPartyTools,
        architecture: data.architectureDescription,
      },
      data_requirements: {
        data_sheets: data.dataSheets,
        provenance: data.dataProvenance,
        labeling: data.dataLabeling,
        preparation: data.dataPreparation,
      },
      human_oversight_measures: {
        measures: data.oversightMeasures,
        user_interface: data.userInterface,
        interpretability: data.interpretability,
      },
      testing_procedures: {
        datasets: data.testingDatasets,
        metrics: data.metrics,
        logs: data.testLogs,
      },
      cybersecurity_measures: {
        measures: data.cybersecurityMeasures,
        vulnerability_assessment: data.vulnerabilityAssessment,
      },
      risk_management_description: {
        description: data.riskDescription,
        residual_risks: data.residualRisks,
      },
      standards_applied: {
        harmonised: data.harmonisedStandards,
        other: data.otherStandards,
      },
      doc_reference: data.docReference,
      pms_reference: data.pmsReference,
    };

    if (existingDoc) {
      updateDoc.mutate({ id: existingDoc.id, ...docData });
    } else {
      createDoc.mutate({
        ai_system_version_id: versionId,
        organization_id: organizationId,
        ...docData
      });
    }
  };

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 bg-muted rounded w-1/3" />
      <div className="h-64 bg-muted rounded" />
    </div>;
  }

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Technical Documentation (Annex IV)</CardTitle>
              <CardDescription>
                Required documentation for high-risk AI systems under Article 11
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Completion</p>
                <p className="text-2xl font-bold">{calculateProgress()}%</p>
              </div>
              <Button type="submit" disabled={!isDirty}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
          <Progress value={calculateProgress()} className="mt-4" />
        </CardHeader>
      </Card>

      {/* Section Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
          {sections.map((section) => (
            <TabsTrigger 
              key={section.id} 
              value={section.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <section.icon className="h-4 w-4 mr-1.5" />
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* General Description */}
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">1. General Description</CardTitle>
              <CardDescription>
                Describe the AI system's purpose, provider details, and technical requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purposeDescription">Intended Purpose & Use Cases</Label>
                <Textarea 
                  id="purposeDescription"
                  placeholder="Describe the intended purpose and use cases of the AI system..."
                  {...register("purposeDescription")}
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="providerDetails">Provider Details</Label>
                <Textarea 
                  id="providerDetails"
                  placeholder="Provider name, address, contact information..."
                  {...register("providerDetails")}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="versionInfo">Version Information</Label>
                  <Input 
                    id="versionInfo"
                    placeholder="e.g., v2.1.0"
                    {...register("versionInfo")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hardwareRequirements">Hardware Requirements</Label>
                <Textarea 
                  id="hardwareRequirements"
                  placeholder="Specify hardware requirements and compute resources..."
                  {...register("hardwareRequirements")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="softwareRequirements">Software Requirements</Label>
                <Textarea 
                  id="softwareRequirements"
                  placeholder="Specify software dependencies and runtime requirements..."
                  {...register("softwareRequirements")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Development Process */}
        <TabsContent value="development" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">2. Development Process</CardTitle>
              <CardDescription>
                Document the development methods, tools, and architecture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="developmentMethods">Development Methods</Label>
                <Textarea 
                  id="developmentMethods"
                  placeholder="Describe development methodologies, training approaches..."
                  {...register("developmentMethods")}
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thirdPartyTools">Third-Party Tools & Libraries</Label>
                <Textarea 
                  id="thirdPartyTools"
                  placeholder="List third-party components, frameworks, pre-trained models..."
                  {...register("thirdPartyTools")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="architectureDescription">System Architecture</Label>
                <Textarea 
                  id="architectureDescription"
                  placeholder="Describe the system architecture and component interactions..."
                  {...register("architectureDescription")}
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Requirements */}
        <TabsContent value="data" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">3. Data Requirements</CardTitle>
              <CardDescription>
                Document training data, data governance, and data preparation processes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataSheets">Data Sheets / Dataset Documentation</Label>
                <Textarea 
                  id="dataSheets"
                  placeholder="Describe datasets used for training, validation, and testing..."
                  {...register("dataSheets")}
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataProvenance">Data Provenance</Label>
                <Textarea 
                  id="dataProvenance"
                  placeholder="Document data sources, collection methods, and lineage..."
                  {...register("dataProvenance")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataLabeling">Data Labeling</Label>
                <Textarea 
                  id="dataLabeling"
                  placeholder="Describe labeling processes, quality controls, annotator guidelines..."
                  {...register("dataLabeling")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataPreparation">Data Preparation</Label>
                <Textarea 
                  id="dataPreparation"
                  placeholder="Document preprocessing, cleaning, augmentation steps..."
                  {...register("dataPreparation")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Human Oversight */}
        <TabsContent value="oversight" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">4. Human Oversight Measures</CardTitle>
              <CardDescription>
                Document measures enabling human oversight of the AI system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oversightMeasures">Oversight Measures</Label>
                <Textarea 
                  id="oversightMeasures"
                  placeholder="Describe human oversight mechanisms built into the system..."
                  {...register("oversightMeasures")}
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userInterface">User Interface for Oversight</Label>
                <Textarea 
                  id="userInterface"
                  placeholder="Describe interfaces enabling human monitoring and intervention..."
                  {...register("userInterface")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interpretability">Interpretability Features</Label>
                <Textarea 
                  id="interpretability"
                  placeholder="Describe explainability and interpretability features..."
                  {...register("interpretability")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testing Procedures */}
        <TabsContent value="testing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">5. Testing Procedures</CardTitle>
              <CardDescription>
                Document testing methodologies, datasets, metrics, and results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testingDatasets">Testing Datasets</Label>
                <Textarea 
                  id="testingDatasets"
                  placeholder="Describe testing and validation datasets..."
                  {...register("testingDatasets")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metrics">Performance Metrics</Label>
                <Textarea 
                  id="metrics"
                  placeholder="Document metrics used to evaluate performance (accuracy, fairness, etc.)..."
                  {...register("metrics")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testLogs">Test Logs & Results</Label>
                <Textarea 
                  id="testLogs"
                  placeholder="Reference test logs, validation reports, and benchmark results..."
                  {...register("testLogs")}
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cybersecurity */}
        <TabsContent value="cybersecurity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">6. Cybersecurity Measures</CardTitle>
              <CardDescription>
                Document security measures protecting against threats and vulnerabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cybersecurityMeasures">Security Measures</Label>
                <Textarea 
                  id="cybersecurityMeasures"
                  placeholder="Describe cybersecurity measures implemented..."
                  {...register("cybersecurityMeasures")}
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vulnerabilityAssessment">Vulnerability Assessment</Label>
                <Textarea 
                  id="vulnerabilityAssessment"
                  placeholder="Document vulnerability assessments, penetration testing, threat modeling..."
                  {...register("vulnerabilityAssessment")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Management */}
        <TabsContent value="risk" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">7. Risk Management Description</CardTitle>
              <CardDescription>
                Summarize the risk management system applied during development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="riskDescription">Risk Management System</Label>
                <Textarea 
                  id="riskDescription"
                  placeholder="Describe the risk management system and processes..."
                  {...register("riskDescription")}
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="residualRisks">Known Residual Risks</Label>
                <Textarea 
                  id="residualRisks"
                  placeholder="Document known residual risks and mitigation strategies..."
                  {...register("residualRisks")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Standards */}
        <TabsContent value="standards" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">8. Standards Applied</CardTitle>
              <CardDescription>
                Reference harmonised standards and other technical specifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="harmonisedStandards">Harmonised Standards</Label>
                <Textarea 
                  id="harmonisedStandards"
                  placeholder="List harmonised standards applied (e.g., ISO/IEC standards)..."
                  {...register("harmonisedStandards")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherStandards">Other Technical Specifications</Label>
                <Textarea 
                  id="otherStandards"
                  placeholder="List other standards, specifications, or certifications..."
                  {...register("otherStandards")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DoC Reference */}
        <TabsContent value="doc" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">9. Declaration of Conformity Reference</CardTitle>
              <CardDescription>
                Reference to the EU Declaration of Conformity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="docReference">DoC Reference</Label>
                <Input 
                  id="docReference"
                  placeholder="Reference number or link to Declaration of Conformity..."
                  {...register("docReference")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PMS Reference */}
        <TabsContent value="pms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">10. Post-Market Monitoring Reference</CardTitle>
              <CardDescription>
                Reference to the post-market monitoring plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pmsReference">PMS Plan Reference</Label>
                <Input 
                  id="pmsReference"
                  placeholder="Reference to post-market monitoring plan..."
                  {...register("pmsReference")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Preview PDF
        </Button>
        <Button type="submit" disabled={!isDirty}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
      </div>
    </form>
  );
}
