import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Calendar,
  ChevronRight,
  Clock,
  RefreshCw,
  Target,
  TrendingUp,
  Loader2,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { useComplianceCopilot, ComplianceDigest } from "@/hooks/useComplianceCopilot";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const categoryToPath: Record<string, string> = {
  classification: "/ai-systems",
  controls: "/controls",
  evidence: "/evidence",
  training: "/training",
  fria: "/assessments",
  tasks: "/tasks",
  vendors: "/vendors",
  policies: "/policies",
};

export function ComplianceCopilotCard() {
  const { digest, generatedAt, isLoading, isRefreshing, refresh } = useComplianceCopilot();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-sm text-muted-foreground">Generating your compliance digest...</p>
        </CardContent>
      </Card>
    );
  }

  if (!digest) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">AI Compliance Copilot</CardTitle>
              <CardDescription>Get personalized compliance insights</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Generate an AI-powered digest of your compliance status with prioritized recommendations.
          </p>
          <Button onClick={refresh} disabled={isRefreshing} className="w-full">
            {isRefreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Digest
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on_track": return "success";
      case "attention_needed": return "warning";
      case "at_risk": return "destructive";
      case "critical": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on_track": return <CheckCircle2 className="h-4 w-4" />;
      case "attention_needed": return <AlertTriangle className="h-4 w-4" />;
      case "at_risk": return <XCircle className="h-4 w-4" />;
      case "critical": return <XCircle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "immediate": return "destructive";
      case "this_week": return "warning";
      case "this_month": return "secondary";
      default: return "secondary";
    }
  };

  const getCategoryPath = (category: string) => {
    return categoryToPath[category.toLowerCase()] || "/tasks";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Compliance Copilot</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {generatedAt && (
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(generatedAt), { addSuffix: true })}
              </span>
            )}
            <Button variant="ghost" size="icon" onClick={refresh} disabled={isRefreshing}>
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status badge and summary */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
          <div className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
            digest.overall_status === "on_track" ? "bg-success/20 text-success" :
            digest.overall_status === "attention_needed" ? "bg-warning/20 text-warning" :
            "bg-destructive/20 text-destructive"
          )}>
            {getStatusIcon(digest.overall_status)}
          </div>
          <div>
            <Badge variant={getStatusColor(digest.overall_status) as "destructive" | "secondary" | "default" | "outline"} className="mb-1 capitalize">
              {digest.overall_status.replace("_", " ")}
            </Badge>
            <p className="text-sm">{digest.summary}</p>
          </div>
        </div>

        {/* Metrics row - clickable */}
        <div className="grid grid-cols-4 gap-2">
          <Link to="/ai-systems" className="text-center p-2 rounded bg-muted/30 hover:bg-muted transition-colors cursor-pointer group">
            <p className="text-lg font-semibold group-hover:text-primary transition-colors">{digest.compliance_metrics.systems_classified}/{digest.compliance_metrics.systems_total}</p>
            <p className="text-xs text-muted-foreground">Classified</p>
          </Link>
          <Link to="/ai-systems?classification=high_risk" className="text-center p-2 rounded bg-muted/30 hover:bg-muted transition-colors cursor-pointer group">
            <p className="text-lg font-semibold group-hover:text-primary transition-colors">{digest.compliance_metrics.high_risk_count}</p>
            <p className="text-xs text-muted-foreground">High-Risk</p>
          </Link>
          <Link to="/controls" className="text-center p-2 rounded bg-muted/30 hover:bg-muted transition-colors cursor-pointer group">
            <p className="text-lg font-semibold group-hover:text-primary transition-colors">{Math.round(digest.compliance_metrics.controls_implemented_pct)}%</p>
            <p className="text-xs text-muted-foreground">Controls</p>
          </Link>
          <Link to="/assessments" className="text-center p-2 rounded bg-muted/30 hover:bg-muted transition-colors cursor-pointer group">
            <p className="text-lg font-semibold group-hover:text-primary transition-colors">{digest.compliance_metrics.fria_completed}/{digest.compliance_metrics.fria_required}</p>
            <p className="text-xs text-muted-foreground">FRIA</p>
          </Link>
        </div>

        <Tabs defaultValue="actions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="actions" className="text-xs py-1.5">Actions</TabsTrigger>
            <TabsTrigger value="deadlines" className="text-xs py-1.5">Deadlines</TabsTrigger>
            <TabsTrigger value="risks" className="text-xs py-1.5">Risks</TabsTrigger>
          </TabsList>

          <TabsContent value="actions" className="mt-3">
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {digest.priority_actions.map((action, i) => (
                  <Link 
                    key={i} 
                    to={getCategoryPath(action.category)}
                    className="block p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">{action.title}</p>
                      <Badge variant={getUrgencyColor(action.urgency) as "destructive" | "secondary" | "default" | "outline"} className="text-xs shrink-0 capitalize">
                        {action.urgency.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs capitalize">{action.category}</Badge>
                        <span className="text-muted-foreground">•</span>
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{action.estimated_effort}</span>
                      </div>
                      <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="deadlines" className="mt-3">
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {digest.deadline_alerts.map((alert, i) => (
                  <Link
                    key={i}
                    to="/tasks"
                    className="block p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">{alert.deadline}</p>
                      <Badge variant={alert.priority === "critical" || alert.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                        {alert.days_remaining} days
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{alert.action_required}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{new Date(alert.deadline_date).toLocaleDateString()}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{alert.affected_systems} systems affected</span>
                      </div>
                      <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="risks" className="mt-3">
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {digest.risk_highlights.map((risk, i) => (
                  <Link
                    key={i}
                    to="/ai-systems?classification=high_risk"
                    className="flex items-start gap-2 p-2 rounded bg-destructive/5 border border-destructive/10 hover:bg-destructive/10 transition-colors group"
                  >
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm flex-1 group-hover:text-destructive transition-colors">{risk}</p>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Next review */}
        <Separator />
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">{digest.next_review_recommendation}</span>
        </div>
      </CardContent>
    </Card>
  );
}
