import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Loader2, Check, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useAISystemIntake, ExtractedSystemData } from "@/hooks/useAISystemIntake";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NaturalLanguageIntakeProps {
  onDataExtracted: (data: Partial<ExtractedSystemData>) => void;
  onClose?: () => void;
}

export function NaturalLanguageIntake({ onDataExtracted, onClose }: NaturalLanguageIntakeProps) {
  const [description, setDescription] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const { isExtracting, extractedData, extractFromDescription, clearExtractedData } = useAISystemIntake();

  const handleExtract = async () => {
    const data = await extractFromDescription(description);
    if (data) {
      setShowPreview(true);
    }
  };

  const handleApply = () => {
    if (extractedData) {
      onDataExtracted(extractedData);
      onClose?.();
    }
  };

  const handleReset = () => {
    setDescription("");
    setShowPreview(false);
    clearExtractedData();
  };

  const extractedFieldCount = extractedData 
    ? Object.entries(extractedData).filter(([k, v]) => v !== null && k !== "extraction_confidence" && k !== "extraction_notes").length
    : 0;

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-base">AI-Powered Quick Intake</CardTitle>
            <CardDescription>Describe your AI system in plain language and let AI extract the details</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showPreview ? (
          <>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: We use a ChatGPT-powered customer support bot that handles ticket triage and suggests responses to our support team. It's deployed across our EU customers and processes customer queries which may include personal data. The support team reviews all suggested responses before sending."
              className="min-h-[120px] resize-none"
              disabled={isExtracting}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {description.length < 20 
                  ? `${20 - description.length} more characters needed`
                  : `${description.length} characters`}
              </p>
              <div className="flex gap-2">
                {onClose && (
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    Skip
                  </Button>
                )}
                <Button 
                  onClick={handleExtract} 
                  disabled={isExtracting || description.length < 20}
                  size="sm"
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Extract Details
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : extractedData ? (
          <div className="space-y-4">
            {/* Confidence indicator */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
              <div className="flex items-center gap-2">
                {extractedData.extraction_confidence >= 0.7 ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
                <span className="text-sm font-medium">
                  {extractedFieldCount} fields extracted
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Confidence</span>
                <Progress value={extractedData.extraction_confidence * 100} className="w-20 h-2" />
                <span className="text-xs font-medium">{Math.round(extractedData.extraction_confidence * 100)}%</span>
              </div>
            </div>

            {/* Key extracted fields preview */}
            <div className="grid gap-2">
              {extractedData.name && (
                <div className="flex items-center justify-between p-2 rounded bg-background/50">
                  <span className="text-xs text-muted-foreground">System Name</span>
                  <span className="text-sm font-medium">{extractedData.name}</span>
                </div>
              )}
              {extractedData.department && (
                <div className="flex items-center justify-between p-2 rounded bg-background/50">
                  <span className="text-xs text-muted-foreground">Department</span>
                  <Badge variant="secondary">{extractedData.department}</Badge>
                </div>
              )}
              {extractedData.value_chain_role && extractedData.value_chain_role.length > 0 && (
                <div className="flex items-center justify-between p-2 rounded bg-background/50">
                  <span className="text-xs text-muted-foreground">Role</span>
                  <div className="flex gap-1">
                    {extractedData.value_chain_role.map((role) => (
                      <Badge key={role} variant="outline" className="capitalize">{role}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {extractedData.affected_groups && extractedData.affected_groups.length > 0 && (
                <div className="flex items-center justify-between p-2 rounded bg-background/50">
                  <span className="text-xs text-muted-foreground">Affected Groups</span>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {extractedData.affected_groups.slice(0, 3).map((group) => (
                      <Badge key={group} variant="secondary" className="text-xs">{group}</Badge>
                    ))}
                    {extractedData.affected_groups.length > 3 && (
                      <Badge variant="secondary" className="text-xs">+{extractedData.affected_groups.length - 3}</Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Risk indicators */}
            {(extractedData.highrisk_employment === "yes" || 
              extractedData.highrisk_essential_services === "yes" ||
              extractedData.highrisk_biometric === "yes") && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Potential High-Risk Indicators Detected</span>
                </div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {extractedData.highrisk_employment === "yes" && (
                    <Badge variant="destructive" className="text-xs">Employment</Badge>
                  )}
                  {extractedData.highrisk_essential_services === "yes" && (
                    <Badge variant="destructive" className="text-xs">Essential Services</Badge>
                  )}
                  {extractedData.highrisk_biometric === "yes" && (
                    <Badge variant="destructive" className="text-xs">Biometric</Badge>
                  )}
                </div>
              </div>
            )}

            {/* Extraction notes */}
            {extractedData.extraction_notes && (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full justify-between">
                    <span className="text-xs text-muted-foreground">AI Notes</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="text-xs text-muted-foreground p-2 bg-background/50 rounded">
                    {extractedData.extraction_notes}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={handleReset} className="flex-1">
                Start Over
              </Button>
              <Button onClick={handleApply} size="sm" className="flex-1">
                <Check className="mr-2 h-4 w-4" />
                Apply to Wizard
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
