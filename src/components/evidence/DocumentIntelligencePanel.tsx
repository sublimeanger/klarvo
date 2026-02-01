import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Loader2,
  Sparkles,
  Check,
  X,
  AlertTriangle,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useDocumentIntelligence, DocumentAnalysis } from "@/hooks/useDocumentIntelligence";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface DocumentIntelligencePanelProps {
  aiSystemId?: string;
  onAnalysisComplete?: (analysis: DocumentAnalysis) => void;
}

export function DocumentIntelligencePanel({ aiSystemId, onAnalysisComplete }: DocumentIntelligencePanelProps) {
  const [documentText, setDocumentText] = useState("");
  const [documentType, setDocumentType] = useState<string>("vendor_contract");
  const [expandedSections, setExpandedSections] = useState<string[]>(["clauses"]);
  const { isAnalyzing, analysis, analyzeDocument, clearAnalysis } = useDocumentIntelligence();

  const handleAnalyze = async () => {
    const result = await analyzeDocument(documentText, documentType, aiSystemId);
    if (result && onAnalysisComplete) {
      onAnalysisComplete(result);
    }
  };

  const handleReset = () => {
    setDocumentText("");
    clearAnalysis();
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getCoverageColor = (coverage: string) => {
    switch (coverage) {
      case "full": return "text-success";
      case "partial": return "text-warning";
      case "none": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  if (!analysis) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Document Intelligence</CardTitle>
              <CardDescription>AI-powered analysis of contracts and policies</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Document Type</label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vendor_contract">Vendor Contract</SelectItem>
                <SelectItem value="dpa">Data Processing Agreement</SelectItem>
                <SelectItem value="ai_policy">AI Policy</SelectItem>
                <SelectItem value="security_whitepaper">Security Whitepaper</SelectItem>
                <SelectItem value="terms_of_service">Terms of Service</SelectItem>
                <SelectItem value="model_card">Model Card</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Document Text</label>
            <Textarea
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              placeholder="Paste the document text here for AI analysis..."
              className="min-h-[200px] resize-none"
              disabled={isAnalyzing}
            />
            <p className="text-xs text-muted-foreground">
              {documentText.length < 100
                ? `${100 - documentText.length} more characters needed`
                : `${documentText.length} characters`}
            </p>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || documentText.length < 100}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Document...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze Document
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Analysis Results</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Analyze Another
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="capitalize">{analysis.document_type.replace("_", " ")}</Badge>
            <span className="text-xs text-muted-foreground">
              {Math.round(analysis.confidence_score * 100)}% confidence
            </span>
          </div>
          <p className="text-sm">{analysis.summary}</p>
        </div>

        {/* AI Provisions Checklist */}
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(analysis.ai_provisions).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2 p-2 rounded bg-muted/30">
              {value ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <X className="h-4 w-4 text-destructive" />
              )}
              <span className="text-xs capitalize">{key.replace(/_/g, " ")}</span>
            </div>
          ))}
        </div>

        {/* Risk Flags */}
        {analysis.risk_flags.length > 0 && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <div className="flex items-center gap-2 text-destructive mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Risk Flags</span>
            </div>
            <ul className="text-xs space-y-1">
              {analysis.risk_flags.map((flag, i) => (
                <li key={i}>• {flag}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Clauses */}
        <Collapsible
          open={expandedSections.includes("clauses")}
          onOpenChange={() => toggleSection("clauses")}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span className="font-medium">Key Clauses ({analysis.key_clauses.length})</span>
              {expandedSections.includes("clauses") ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ScrollArea className="h-[150px] mt-2">
              <div className="space-y-2">
                {analysis.key_clauses.map((clause, i) => (
                  <div key={i} className="p-2 rounded border bg-background">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{clause.title}</span>
                      <Badge variant={clause.relevance === "high" ? "default" : "secondary"} className="text-xs">
                        {clause.relevance}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{clause.content}</p>
                    {clause.article_reference && (
                      <Badge variant="outline" className="text-xs mt-1">{clause.article_reference}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>

        {/* Gaps */}
        <Collapsible
          open={expandedSections.includes("gaps")}
          onOpenChange={() => toggleSection("gaps")}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span className="font-medium">Compliance Gaps ({analysis.gaps.length})</span>
              {expandedSections.includes("gaps") ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ScrollArea className="h-[150px] mt-2">
              <div className="space-y-2">
                {analysis.gaps.map((gap, i) => (
                  <div key={i} className="p-2 rounded border bg-background">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{gap.gap_type}</span>
                      <Badge variant={getSeverityColor(gap.severity) as "destructive" | "secondary" | "default" | "outline"} className="text-xs">
                        {gap.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{gap.description}</p>
                    <p className="text-xs text-primary">💡 {gap.recommendation}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>

        {/* Control Mappings */}
        <Collapsible
          open={expandedSections.includes("controls")}
          onOpenChange={() => toggleSection("controls")}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span className="font-medium">Control Coverage ({analysis.control_mappings.length})</span>
              {expandedSections.includes("controls") ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ScrollArea className="h-[150px] mt-2">
              <div className="space-y-2">
                {analysis.control_mappings.map((mapping, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded border bg-background">
                    <div>
                      <span className="text-xs font-mono text-muted-foreground">{mapping.control_id}</span>
                      <p className="text-sm">{mapping.control_name}</p>
                    </div>
                    <span className={cn("text-sm font-medium capitalize", getCoverageColor(mapping.coverage))}>
                      {mapping.coverage}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
