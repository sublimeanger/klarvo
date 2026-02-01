import { useState } from "react";
import { format } from "date-fns";
import { History, ChevronDown, ChevronUp, ArrowRight, User, Calendar, FileText, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  useClassificationHistory, 
  ClassificationHistoryEntry,
  compareVersions 
} from "@/hooks/useClassificationHistory";

interface ClassificationHistoryPanelProps {
  aiSystemId: string;
}

const formatRiskLevel = (level: string) => {
  switch (level) {
    case "high_risk": return "High Risk";
    case "limited_risk": return "Limited Risk";
    case "minimal_risk": return "Minimal Risk";
    case "prohibited": return "Prohibited";
    default: return "Not Classified";
  }
};

const getRiskBadgeVariant = (level: string): "default" | "destructive" | "secondary" | "outline" => {
  switch (level) {
    case "high_risk":
    case "prohibited":
      return "destructive";
    case "limited_risk":
      return "default";
    case "minimal_risk":
      return "secondary";
    default:
      return "outline";
  }
};

function VersionCard({ 
  entry, 
  previousEntry,
  isLatest 
}: { 
  entry: ClassificationHistoryEntry; 
  previousEntry?: ClassificationHistoryEntry;
  isLatest: boolean;
}) {
  const [isOpen, setIsOpen] = useState(isLatest);
  const changes = previousEntry ? compareVersions(previousEntry, entry) : [];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={isLatest ? "border-primary/50 bg-primary/5" : ""}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                  v{entry.version_number}
                </div>
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Badge variant={getRiskBadgeVariant(entry.risk_level)}>
                      {formatRiskLevel(entry.risk_level)}
                    </Badge>
                    {isLatest && (
                      <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                        Current
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(entry.classified_at), "PPP")}
                    </span>
                    {entry.classifier?.full_name && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {entry.classifier.full_name}
                      </span>
                    )}
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {/* Change Reason */}
            {entry.change_reason && (
              <div className="rounded-lg border bg-muted/50 p-3">
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Change Reason</p>
                    <p className="text-sm text-muted-foreground">{entry.change_reason}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Changes from previous version */}
            {changes.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Changes from v{previousEntry?.version_number}
                </p>
                <div className="space-y-2">
                  {changes.map((change, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <span className="font-medium w-36">{change.field}:</span>
                      <span className="text-muted-foreground line-through">{change.before}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-foreground font-medium">{change.after}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Classification Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Is AI System</p>
                <p className="font-medium">
                  {entry.is_ai_system === null ? "Not assessed" : entry.is_ai_system ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Confidence</p>
                <p className="font-medium capitalize">{entry.confidence_level || "—"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Prohibited Indicators</p>
                <p className="font-medium">
                  {entry.has_prohibited_indicators === null 
                    ? "Not screened" 
                    : entry.has_prohibited_indicators 
                      ? "Found" 
                      : "None"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">High-Risk Candidate</p>
                <p className="font-medium">
                  {entry.is_high_risk_candidate === null 
                    ? "Not assessed" 
                    : entry.is_high_risk_candidate 
                      ? "Yes" 
                      : "No"}
                </p>
              </div>
            </div>

            {/* Rationale */}
            {entry.classification_rationale && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Classification Rationale</p>
                <p className="text-sm">{entry.classification_rationale}</p>
              </div>
            )}

            {/* High-Risk Categories */}
            {entry.high_risk_categories && entry.high_risk_categories.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">High-Risk Categories</p>
                <div className="flex flex-wrap gap-1">
                  {entry.high_risk_categories.map((cat) => (
                    <Badge key={cat} variant="outline" className="text-xs">
                      {cat.replace(/_/g, " ")}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export function ClassificationHistoryPanel({ aiSystemId }: ClassificationHistoryPanelProps) {
  const { data: history, isLoading, error } = useClassificationHistory(aiSystemId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Failed to load classification history</p>
        </CardContent>
      </Card>
    );
  }

  if (!history || history.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <History className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground font-medium">No classification history</p>
          <p className="text-sm text-muted-foreground mt-1">
            Complete the classification wizard to create the first version
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <History className="h-4 w-4" />
        <span className="text-sm">{history.length} version{history.length !== 1 ? "s" : ""} recorded</span>
      </div>
      
      {history.map((entry, idx) => (
        <VersionCard 
          key={entry.id} 
          entry={entry} 
          previousEntry={history[idx + 1]}
          isLatest={idx === 0}
        />
      ))}
    </div>
  );
}
