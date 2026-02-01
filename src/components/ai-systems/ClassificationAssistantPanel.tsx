import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sparkles, 
  Loader2, 
  Check, 
  X, 
  AlertTriangle, 
  FileText,
  Shield,
  Target,
  ChevronRight
} from "lucide-react";
import { useClassificationAssistant, ClassificationResult } from "@/hooks/useClassificationAssistant";
import { cn } from "@/lib/utils";

interface ClassificationAssistantPanelProps {
  systemData: Record<string, unknown>;
  onApplyClassification?: (result: ClassificationResult) => void;
}

export function ClassificationAssistantPanel({ systemData, onApplyClassification }: ClassificationAssistantPanelProps) {
  const { isClassifying, result, classifySystem, clearResult } = useClassificationAssistant();

  const handleClassify = () => {
    classifySystem(systemData);
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "prohibited": return "destructive";
      case "high_risk": return "destructive";
      case "limited_risk": return "warning";
      case "minimal_risk": return "success";
      default: return "secondary";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-success";
    if (confidence >= 0.6) return "text-warning";
    return "text-destructive";
  };

  if (!result) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">AI Classification Assistant</CardTitle>
              <CardDescription>Get AI-powered risk classification suggestions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Based on the information you've provided, our AI will analyze your system against EU AI Act criteria and suggest a risk classification.
          </p>
          <Button onClick={handleClassify} disabled={isClassifying} className="w-full">
            {isClassifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing System...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get AI Classification
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">AI Classification Result</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={clearResult}>
            Run Again
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main result */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Suggested Classification</p>
            <Badge 
              variant={getClassificationColor(result.suggested_classification) as "destructive" | "secondary" | "default" | "outline"}
              className="text-sm capitalize"
            >
              {result.suggested_classification.replace("_", " ")}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Confidence</p>
            <div className="flex items-center gap-2">
              <Progress value={result.confidence_score * 100} className="w-16 h-2" />
              <span className={cn("text-sm font-medium", getConfidenceColor(result.confidence_score))}>
                {Math.round(result.confidence_score * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Reasoning */}
        <div className="p-3 rounded-lg bg-background border">
          <p className="text-sm">{result.reasoning}</p>
        </div>

        {/* Detailed analysis tabs */}
        <Tabs defaultValue="factors" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="factors" className="text-xs py-1.5">Factors</TabsTrigger>
            <TabsTrigger value="prohibited" className="text-xs py-1.5">Prohibited</TabsTrigger>
            <TabsTrigger value="highrisk" className="text-xs py-1.5">High-Risk</TabsTrigger>
            <TabsTrigger value="next" className="text-xs py-1.5">Next Steps</TabsTrigger>
          </TabsList>

          <TabsContent value="factors" className="mt-3">
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {result.key_factors.map((factor, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded bg-muted/30">
                    <div className={cn(
                      "h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                      factor.impact === "increases_risk" ? "bg-destructive/20 text-destructive" :
                      factor.impact === "decreases_risk" ? "bg-success/20 text-success" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {factor.impact === "increases_risk" ? <AlertTriangle className="h-3 w-3" /> :
                       factor.impact === "decreases_risk" ? <Check className="h-3 w-3" /> :
                       <Target className="h-3 w-3" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{factor.factor}</p>
                      <p className="text-xs text-muted-foreground">{factor.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="prohibited" className="mt-3">
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {result.prohibited_indicators.map((indicator, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded bg-muted/30">
                    {indicator.present ? (
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    ) : (
                      <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm">{indicator.indicator}</p>
                      <p className="text-xs text-muted-foreground">{indicator.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="highrisk" className="mt-3">
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {result.high_risk_categories.map((category, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded bg-muted/30">
                    {category.applicable ? (
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm">{category.category}</p>
                      <p className="text-xs text-muted-foreground">{category.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="next" className="mt-3">
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {result.recommended_next_steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded bg-muted/30">
                    <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Ambiguities warning */}
        {result.ambiguities.length > 0 && (
          <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
            <div className="flex items-center gap-2 text-warning mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Review Needed</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              {result.ambiguities.map((ambiguity, i) => (
                <li key={i}>• {ambiguity}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Article references */}
        {result.article_references.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <FileText className="h-4 w-4 text-muted-foreground" />
            {result.article_references.map((ref, i) => (
              <Badge key={i} variant="outline" className="text-xs">{ref}</Badge>
            ))}
          </div>
        )}

        {/* Apply button */}
        {onApplyClassification && (
          <Button 
            onClick={() => onApplyClassification(result)} 
            className="w-full"
            variant="outline"
          >
            <Check className="mr-2 h-4 w-4" />
            Apply This Classification
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
