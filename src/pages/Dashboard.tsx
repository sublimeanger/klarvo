import { 
  Cpu, 
  AlertTriangle, 
  HelpCircle, 
  Calendar, 
  FileCheck, 
  GraduationCap, 
  Shield,
  ArrowRight,
  Plus,
  CheckSquare,
  FileText,
  AlertCircle,
  Building2,
  ClipboardCheck,
  Bell,
} from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { useSubscription } from "@/hooks/useSubscription";
import { useBilling } from "@/hooks/useBilling";
import { TrialBanner } from "@/components/billing/TrialBanner";
import { useTasks } from "@/hooks/useTasks";
import { ComplianceAlerts } from "@/components/dashboard/ComplianceAlerts";
import { useComplianceAlerts } from "@/hooks/useComplianceAlerts";
import { RiskDistributionChart } from "@/components/dashboard/RiskDistributionChart";
import { ComplianceTrendChart } from "@/components/dashboard/ComplianceTrendChart";
import { DepartmentRiskChart } from "@/components/dashboard/DepartmentRiskChart";
import { AuditReadinessCard } from "@/components/dashboard/AuditReadinessCard";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { EscalationDashboardWidget } from "@/components/provider/EscalationDashboardWidget";
import { ModificationSummaryWidget } from "@/components/provider/SubstantialModificationAlert";

const upcomingDeadlines = [
  { date: "Feb 2, 2025", event: "Prohibited AI practices ban", type: "critical" as const },
  { date: "Aug 2, 2025", event: "GPAI model requirements", type: "warning" as const },
  { date: "Aug 2, 2026", event: "High-risk AI system rules", type: "info" as const },
];

export default function Dashboard() {
  const { metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { isTrialing, daysRemaining } = useSubscription();
  const { createCheckoutSession } = useBilling();
  const { data: recentTasks = [] } = useTasks({ status: "all" });
  const { totalCount: alertsCount, criticalCount } = useComplianceAlerts();

  // Calculate percentages
  const classifiedCount = metrics.highRiskCount + metrics.limitedRiskCount + metrics.minimalRiskCount;
  const classificationProgress = metrics.totalSystems > 0 
    ? Math.round((classifiedCount / metrics.totalSystems) * 100) 
    : 0;
  
  const evidenceProgress = metrics.evidenceCount > 0
    ? Math.round((metrics.approvedEvidenceCount / metrics.evidenceCount) * 100)
    : 0;

  const controlsProgress = metrics.controlsTotal > 0
    ? Math.round((metrics.controlsImplemented / metrics.controlsTotal) * 100)
    : 0;

  // Get pending tasks for display
  const pendingTasks = recentTasks
    .filter(t => t.status === "todo" || t.status === "in_progress")
    .slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-up">
      {/* Trial Banner */}
      {isTrialing && daysRemaining > 0 && (
        <TrialBanner 
          daysRemaining={daysRemaining} 
          onUpgrade={() => createCheckoutSession("growth", "annual")}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Your EU AI Act compliance overview
          </p>
        </div>
        <Button asChild size="sm" className="w-full sm:w-auto">
          <Link to="/ai-systems/new">
            <Plus className="mr-2 h-4 w-4" />
            Add AI System
          </Link>
        </Button>
      </div>

      {/* Substantial Modification Alert - Article 25 */}
      <ModificationSummaryWidget />

      {/* Welcome Card for new users */}
      {!metricsLoading && metrics.totalSystems === 0 && <WelcomeCard />}

      {/* Metrics Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-5">
        {metricsLoading ? (
          <>
            <Skeleton className="h-28 sm:h-32 rounded-xl" />
            <Skeleton className="h-28 sm:h-32 rounded-xl" />
            <Skeleton className="h-28 sm:h-32 rounded-xl" />
            <Skeleton className="h-28 sm:h-32 rounded-xl" />
            <Skeleton className="h-28 sm:h-32 rounded-xl col-span-2 lg:col-span-1" />
          </>
        ) : (
          <>
            <MetricCard
              title="Total AI Systems"
              value={metrics.totalSystems}
              subtitle={`${metrics.activeSystems} active`}
              icon={Cpu}
            />
            <MetricCard
              title="High-Risk"
              value={metrics.highRiskCount}
              subtitle="Deployer duties"
              icon={AlertTriangle}
            />
            <MetricCard
              title="Pending"
              value={metrics.notClassifiedCount}
              subtitle="Need assessment"
              icon={HelpCircle}
            />
            <MetricCard
              title="Open Tasks"
              value={metrics.tasksTodo}
              subtitle={metrics.tasksOverdue > 0 ? `${metrics.tasksOverdue} overdue` : "On track"}
              icon={CheckSquare}
            />
            <MetricCard
              title="Alerts"
              value={alertsCount}
              subtitle={criticalCount > 0 ? `${criticalCount} critical` : "Attention needed"}
              icon={Bell}
              className="col-span-2 lg:col-span-1"
            />
          </>
        )}
      </div>

      {/* Audit Readiness Score */}
      <AuditReadinessCard />

      {/* Classification Breakdown - Mobile friendly */}
      {metrics.totalSystems > 0 && (
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
              Classification Breakdown
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Risk level distribution of your AI systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
              <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium">High Risk</span>
                  <StatusBadge variant="high">{metrics.highRiskCount}</StatusBadge>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-destructive transition-all" 
                    style={{ width: `${metrics.totalSystems > 0 ? (metrics.highRiskCount / metrics.totalSystems) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium">Limited</span>
                  <StatusBadge variant="limited">{metrics.limitedRiskCount}</StatusBadge>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-warning transition-all" 
                    style={{ width: `${metrics.totalSystems > 0 ? (metrics.limitedRiskCount / metrics.totalSystems) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium">Minimal</span>
                  <StatusBadge variant="minimal">{metrics.minimalRiskCount}</StatusBadge>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-success transition-all" 
                    style={{ width: `${metrics.totalSystems > 0 ? (metrics.minimalRiskCount / metrics.totalSystems) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium">Unclassified</span>
                  <StatusBadge variant="draft">{metrics.notClassifiedCount}</StatusBadge>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-muted-foreground/30 transition-all" 
                    style={{ width: `${metrics.totalSystems > 0 ? (metrics.notClassifiedCount / metrics.totalSystems) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Section - Mobile 2-col grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm font-medium">Classification</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xl sm:text-2xl font-bold">{classificationProgress}%</span>
            </div>
            <Progress value={classificationProgress} className="h-1.5 sm:h-2" />
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {classifiedCount}/{metrics.totalSystems} done
            </p>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm font-medium">Controls</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xl sm:text-2xl font-bold">{controlsProgress}%</span>
            </div>
            <Progress value={controlsProgress} className="h-1.5 sm:h-2" />
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {metrics.controlsImplemented}/{metrics.controlsTotal} impl
            </p>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm font-medium">Attestations</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xl sm:text-2xl font-bold">{metrics.attestationsTotal}</span>
            </div>
            <Progress 
              value={metrics.attestationsTotal > 0 ? (metrics.attestationsVerified / metrics.attestationsTotal) * 100 : 0} 
              className="h-1.5 sm:h-2" 
            />
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {metrics.attestationsVerified} verified
            </p>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm font-medium">Evidence</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xl sm:text-2xl font-bold">{metrics.evidenceCount}</span>
            </div>
            <Progress value={evidenceProgress} className="h-1.5 sm:h-2" />
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {metrics.approvedEvidenceCount} approved
            </p>
          </div>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <ComplianceTrendChart />
        <RiskDistributionChart />
      </div>

      {/* Department Distribution */}
      <DepartmentRiskChart />

      {/* Compliance Alerts */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ComplianceAlerts />
        </div>
        <EscalationDashboardWidget />
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* EU AI Act Timeline */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              EU AI Act Timeline
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Key compliance deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium">{deadline.event}</p>
                    <p className="text-[10px] sm:text-sm text-muted-foreground">{deadline.date}</p>
                  </div>
                  <StatusBadge 
                    variant={deadline.type === "critical" ? "destructive" : deadline.type} 
                    className="shrink-0 text-[10px] sm:text-xs"
                  >
                    {deadline.type === "critical" ? "Critical" : deadline.type === "warning" ? "Soon" : "Later"}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3 sm:pb-6">
            <div>
              <CardTitle className="text-base sm:text-lg">Pending Tasks</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Actions requiring attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm">
              <Link to="/tasks">
                View all
                <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {pendingTasks.length === 0 ? (
              <div className="text-center py-4 sm:py-6 text-muted-foreground">
                <CheckSquare className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs sm:text-sm">No pending tasks</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 sm:gap-4">
                    <div 
                      className={`h-2 w-2 mt-1.5 sm:mt-2 rounded-full shrink-0 ${
                        task.priority === "urgent" || task.priority === "high" 
                          ? "bg-destructive" 
                          : "bg-warning"
                      }`} 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium line-clamp-1">{task.title}</p>
                      <p className="text-[10px] sm:text-sm text-muted-foreground">
                        {task.due_date 
                          ? `Due ${new Date(task.due_date).toLocaleDateString()}`
                          : "No due date"
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
