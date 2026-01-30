import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Scale,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileCheck,
  Loader2,
  ExternalLink,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAllClassifications, useAllFRIAs } from "@/hooks/useAssessments";

const RISK_LEVELS = [
  { value: "all", label: "All Risk Levels" },
  { value: "prohibited", label: "Prohibited" },
  { value: "high_risk", label: "High Risk" },
  { value: "limited_risk", label: "Limited Risk" },
  { value: "minimal_risk", label: "Minimal Risk" },
  { value: "not_classified", label: "Not Classified" },
];

const FRIA_STATUSES = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "needs_review", label: "Needs Review" },
];

function getRiskBadgeVariant(riskLevel: string) {
  switch (riskLevel) {
    case "prohibited":
      return "destructive";
    case "high_risk":
      return "warning";
    case "limited_risk":
      return "pending";
    case "minimal_risk":
      return "success";
    default:
      return "draft";
  }
}

function getRiskLabel(riskLevel: string) {
  switch (riskLevel) {
    case "prohibited":
      return "Prohibited";
    case "high_risk":
      return "High Risk";
    case "limited_risk":
      return "Limited Risk";
    case "minimal_risk":
      return "Minimal Risk";
    default:
      return "Not Classified";
  }
}

function getFRIAStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return "success";
    case "in_progress":
      return "pending";
    case "needs_review":
      return "warning";
    default:
      return "draft";
  }
}

function getFRIAConclusionBadge(conclusion: string | null) {
  switch (conclusion) {
    case "approve":
      return { variant: "success" as const, label: "Approved" };
    case "approve_with_mitigations":
      return { variant: "warning" as const, label: "Approved with Mitigations" };
    case "do_not_deploy":
      return { variant: "destructive" as const, label: "Do Not Deploy" };
    default:
      return null;
  }
}

export default function Assessments() {
  const [riskFilter, setRiskFilter] = useState("all");
  const [friaStatusFilter, setFriaStatusFilter] = useState("all");

  const { data: classifications, isLoading: classLoading } = useAllClassifications();
  const { data: frias, isLoading: friasLoading } = useAllFRIAs();

  const filteredClassifications = classifications?.filter((c) =>
    riskFilter === "all" ? true : c.risk_level === riskFilter
  );

  const filteredFRIAs = frias?.filter((f) =>
    friaStatusFilter === "all" ? true : f.status === friaStatusFilter
  );

  // Stats
  const classificationStats = {
    total: classifications?.length || 0,
    highRisk: classifications?.filter((c) => c.risk_level === "high_risk").length || 0,
    limitedRisk: classifications?.filter((c) => c.risk_level === "limited_risk").length || 0,
    minimalRisk: classifications?.filter((c) => c.risk_level === "minimal_risk").length || 0,
  };

  const friaStats = {
    total: frias?.length || 0,
    completed: frias?.filter((f) => f.status === "completed").length || 0,
    inProgress: frias?.filter((f) => f.status === "in_progress" || f.status === "draft").length || 0,
    approved: frias?.filter((f) => f.final_conclusion === "approve" || f.final_conclusion === "approve_with_mitigations").length || 0,
  };

  const isLoading = classLoading || friasLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-up">
      <div>
        <h1 className="text-lg sm:text-2xl font-semibold tracking-tight">Assessments</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Overview of all risk classifications and fundamental rights assessments
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="p-3 sm:p-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Classifications</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold">{classificationStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {classificationStats.highRisk} high-risk
            </p>
          </CardContent>
        </Card>

        <Card className="p-3 sm:p-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">High Risk</CardTitle>
            <ShieldAlert className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent className="p-0 pt-2 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold">{classificationStats.highRisk}</div>
            <p className="text-xs text-muted-foreground">
              Require FRIA
            </p>
          </CardContent>
        </Card>

        <Card className="p-3 sm:p-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">FRIAs</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 pt-2 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold">{friaStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {friaStats.completed} completed
            </p>
          </CardContent>
        </Card>

        <Card className="p-3 sm:p-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent className="p-0 pt-2 sm:p-6 sm:pt-0">
            <div className="text-xl sm:text-2xl font-bold">{friaStats.approved}</div>
            <p className="text-xs text-muted-foreground">
              {friaStats.inProgress} in progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="classifications" className="space-y-4">
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="classifications" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <FileCheck className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Risk </span>Classifications
            </TabsTrigger>
            <TabsTrigger value="frias" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Scale className="h-3 w-3 sm:h-4 sm:w-4" />
              FRIAs
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Classifications Tab */}
        <TabsContent value="classifications" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base sm:text-lg">Risk Classifications</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    EU AI Act risk level classifications for your AI systems
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RISK_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              {filteredClassifications && filteredClassifications.length > 0 ? (
                <>
                  {/* Mobile cards */}
                  <div className="md:hidden space-y-3">
                    {filteredClassifications.map((classification) => (
                      <div key={classification.id} className="border rounded-lg p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate">
                              {classification.ai_system?.name || "Unknown System"}
                            </p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {classification.ai_system?.lifecycle_status?.replace("_", " ")}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" asChild className="h-7 w-7 shrink-0">
                            <Link to={`/ai-systems/${classification.ai_system_id}`}>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <StatusBadge variant={getRiskBadgeVariant(classification.risk_level)} dot className="text-[10px] px-1.5 py-0.5">
                            {getRiskLabel(classification.risk_level)}
                          </StatusBadge>
                          {classification.confidence_level && (
                            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded capitalize">
                              {classification.confidence_level}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2">
                          {classification.classified_by_profile?.full_name || "—"} • {classification.classified_at
                            ? new Date(classification.classified_at).toLocaleDateString()
                            : "—"}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Desktop table */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>AI System</TableHead>
                          <TableHead>Risk Level</TableHead>
                          <TableHead>Confidence</TableHead>
                          <TableHead>Classified By</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredClassifications.map((classification) => (
                          <TableRow key={classification.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">
                                  {classification.ai_system?.name || "Unknown System"}
                                </p>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {classification.ai_system?.lifecycle_status?.replace("_", " ")}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <StatusBadge variant={getRiskBadgeVariant(classification.risk_level)} dot>
                                {getRiskLabel(classification.risk_level)}
                              </StatusBadge>
                            </TableCell>
                            <TableCell>
                              {classification.confidence_level ? (
                                <span className="capitalize">{classification.confidence_level}</span>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {classification.classified_by_profile?.full_name || "—"}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {classification.classified_at
                                ? new Date(classification.classified_at).toLocaleDateString()
                                : "—"}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/ai-systems/${classification.ai_system_id}`}>
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <FileCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No classifications found</h3>
                  <p className="text-muted-foreground mb-4">
                    {riskFilter !== "all"
                      ? "No classifications match the selected filter"
                      : "Start by classifying your AI systems"}
                  </p>
                  <Button asChild>
                    <Link to="/ai-systems">View AI Systems</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* FRIAs Tab */}
        <TabsContent value="frias" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base sm:text-lg">Fundamental Rights Impact Assessments</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Article 27 assessments for high-risk AI systems
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={friaStatusFilter} onValueChange={setFriaStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FRIA_STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              {filteredFRIAs && filteredFRIAs.length > 0 ? (
                <>
                  {/* Mobile cards */}
                  <div className="md:hidden space-y-3">
                    {filteredFRIAs.map((fria) => {
                      const conclusion = getFRIAConclusionBadge(fria.final_conclusion);
                      return (
                        <div key={fria.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">{fria.title}</p>
                              <p className="text-xs text-primary truncate">
                                {fria.ai_system?.name || "Unknown System"}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon" asChild className="h-7 w-7 shrink-0">
                              <Link to={`/ai-systems/${fria.ai_system_id}/fria`}>
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            <StatusBadge variant={getFRIAStatusBadge(fria.status)} dot className="text-[10px] px-1.5 py-0.5">
                              {fria.status === "in_progress"
                                ? "In Progress"
                                : fria.status.charAt(0).toUpperCase() + fria.status.slice(1).replace("_", " ")}
                            </StatusBadge>
                            {conclusion && (
                              <StatusBadge variant={conclusion.variant} className="text-[10px] px-1.5 py-0.5">
                                {conclusion.label}
                              </StatusBadge>
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-2">
                            {fria.owner?.full_name || "—"} • {fria.completed_at
                              ? new Date(fria.completed_at).toLocaleDateString()
                              : new Date(fria.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop table */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Assessment</TableHead>
                          <TableHead>AI System</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Conclusion</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredFRIAs.map((fria) => {
                          const conclusion = getFRIAConclusionBadge(fria.final_conclusion);
                          return (
                            <TableRow key={fria.id}>
                              <TableCell>
                                <p className="font-medium">{fria.title}</p>
                              </TableCell>
                              <TableCell>
                                {fria.ai_system?.name || "Unknown System"}
                              </TableCell>
                              <TableCell>
                                <StatusBadge variant={getFRIAStatusBadge(fria.status)} dot>
                                  {fria.status === "in_progress"
                                    ? "In Progress"
                                    : fria.status.charAt(0).toUpperCase() + fria.status.slice(1).replace("_", " ")}
                                </StatusBadge>
                              </TableCell>
                              <TableCell>
                                {conclusion ? (
                                  <StatusBadge variant={conclusion.variant}>
                                    {conclusion.label}
                                  </StatusBadge>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {fria.owner?.full_name || "—"}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {fria.completed_at
                                  ? new Date(fria.completed_at).toLocaleDateString()
                                  : new Date(fria.created_at).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon" asChild>
                                  <Link to={`/ai-systems/${fria.ai_system_id}/fria`}>
                                    <ExternalLink className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No FRIAs found</h3>
                  <p className="text-muted-foreground mb-4">
                    {friaStatusFilter !== "all"
                      ? "No FRIAs match the selected filter"
                      : "FRIAs are required for high-risk AI systems"}
                  </p>
                  <Button asChild>
                    <Link to="/ai-systems">View AI Systems</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
