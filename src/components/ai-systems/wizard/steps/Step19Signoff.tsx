import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, ShieldX, Eye, Info } from "lucide-react";
import { RadioGroupField } from "../RadioGroupField";
import { FINAL_CLASSIFICATION_OPTIONS, CONFIDENCE_LEVELS } from "../constants";
import type { AISystemWizardData } from "../types";
import type { Tables } from "@/integrations/supabase/types";

interface Step19SignoffProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
  members: Tables<"profiles">[];
}

function getClassificationBadge(classification: string) {
  switch (classification) {
    case "prohibited":
      return <Badge variant="destructive" className="gap-1"><ShieldX className="h-3 w-3" /> Prohibited</Badge>;
    case "high_risk":
      return <Badge variant="outline" className="gap-1 border-warning text-warning"><AlertTriangle className="h-3 w-3" /> High-Risk</Badge>;
    case "limited_risk":
      return <Badge variant="outline" className="gap-1 border-primary text-primary"><Eye className="h-3 w-3" /> Limited Risk</Badge>;
    case "minimal_risk":
      return <Badge variant="outline" className="gap-1 border-success text-success"><CheckCircle className="h-3 w-3" /> Minimal Risk</Badge>;
    default:
      return <Badge variant="secondary" className="gap-1"><Info className="h-3 w-3" /> Needs Review</Badge>;
  }
}

export function Step19Signoff({ data, onChange, members }: Step19SignoffProps) {
  // Calculate suggested classification based on screening results
  const getSuggestedClassification = () => {
    if (data.prohibited_screening_result === "potential_prohibited") {
      return "prohibited";
    }
    if (data.highrisk_screening_result === "high_risk_annex_iii" || 
        data.highrisk_screening_result === "high_risk_product") {
      return "high_risk";
    }
    if (data.transparency_status === "implemented" || 
        data.transparency_status === "gaps_exist") {
      return "limited_risk";
    }
    return "minimal_risk";
  };

  const suggestedClassification = getSuggestedClassification();

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm font-medium">Review & Sign-off</p>
        <p className="text-sm text-muted-foreground mt-1">
          Review the classification and confirm the assessment is complete.
        </p>
      </div>

      <div className="rounded-lg border p-4 space-y-4">
        <h4 className="font-medium">Assessment Summary</h4>
        
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">AI Definition:</span>
            <span>{data.ai_definition_result === "likely_ai" ? "Likely AI System" : 
                   data.ai_definition_result === "likely_not" ? "Likely NOT AI" : "Needs Review"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Prohibited Screening:</span>
            <span>{data.prohibited_screening_result === "no_indicators" ? "Clear" : 
                   data.prohibited_screening_result === "potential_prohibited" ? "⚠️ Flagged" : "Needs Review"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">High-Risk Screening:</span>
            <span>{data.highrisk_screening_result === "not_high_risk" ? "Not High-Risk" : 
                   data.highrisk_screening_result?.includes("high_risk") ? "⚠️ High-Risk" : "Needs Review"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Transparency:</span>
            <span>{data.transparency_status === "not_applicable" ? "N/A" : 
                   data.transparency_status === "implemented" ? "Implemented" : "Gaps Exist"}</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Suggested Classification</span>
          {getClassificationBadge(suggestedClassification)}
        </div>
        <p className="text-xs text-muted-foreground">
          Based on your screening answers
        </p>
      </div>

      <RadioGroupField
        label="Final classification"
        description="Confirm or override the suggested classification"
        options={FINAL_CLASSIFICATION_OPTIONS}
        value={data.final_classification || suggestedClassification}
        onChange={(value) => onChange({ final_classification: value })}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Reviewer sign-off</Label>
          <Select
            value={data.signoff_reviewer_id}
            onValueChange={(value) => onChange({ signoff_reviewer_id: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select reviewer" />
            </SelectTrigger>
            <SelectContent>
              {members.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.full_name || "Unnamed User"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Confidence level</Label>
          <Select
            value={data.ai_definition_confidence}
            onValueChange={(value) => onChange({ ai_definition_confidence: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select confidence" />
            </SelectTrigger>
            <SelectContent>
              {CONFIDENCE_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signoff_notes">Notes</Label>
        <Textarea
          id="signoff_notes"
          placeholder="Any additional notes or context..."
          value={data.signoff_notes}
          onChange={(e) => onChange({ signoff_notes: e.target.value })}
        />
      </div>

      <div className="rounded-lg border border-dashed bg-muted/50 p-4">
        <p className="text-sm font-medium mb-2">Upon completion, the system will generate:</p>
        <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
          <li>Classification Memo (PDF)</li>
          <li>Gap Checklist with missing controls</li>
          <li>Task Plan with owners and due dates</li>
          <li>Evidence Requests for required documentation</li>
        </ul>
      </div>
    </div>
  );
}
