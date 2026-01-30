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
import { TrialBanner } from "@/components/billing/TrialBanner";
import { useTasks } from "@/hooks/useTasks";

const upcomingDeadlines = [
  { date: "Feb 2, 2025", event: "Prohibited AI practices ban", type: "critical" as const },
  { date: "Aug 2, 2025", event: "GPAI model requirements", type: "warning" as const },
  { date: "Aug 2, 2026", event: "High-risk AI system rules", type: "info" as const },
];

export default function Dashboard() {
  const { metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { isTrialing, daysRemaining } = useSubscription();
  const { data: recentTasks = [] } = useTasks({ status: "all" });

  // Calculate percentages
  const classifiedCount = metrics.highRiskCount + metrics.limitedRiskCount + metrics.minimalRiskCount;
  const classificationProgress = metrics.totalSystems > 0 
    ? Math.round((classifiedCount / metrics.totalSystems) * 100) 
    : 0;
  
  const evidenceProgress = metrics.evidenceCount > 0
    ? Math.round((metrics.approvedEvidenceCount / metrics.evidenceCount) * 100)
    : 0;

  // Get pending tasks for display
  const pendingTasks = recentTasks
    .filter(t => t.status === "todo" || t.status === "in_progress")
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Trial Banner */}
      {isTrialing && daysRemaining > 0 && (
        <TrialBanner daysRemaining={daysRemaining} />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Your EU AI Act compliance overview
          </p>
        </div>
        <Button asChild>
          <Link to="/ai-systems/new">
            <Plus className="mr-2 h-4 w-4" />
            Add AI System
          </Link>
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metricsLoading ? (
          <>
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </>
        ) : (
          <>
            <MetricCard
              title="Total AI Systems"
              value={metrics.totalSystems}
              subtitle={`${metrics.activeSystems} active, ${metrics.draftSystems} draft`}
              icon={Cpu}
            />
            <MetricCard
              title="High-Risk Systems"
              value={metrics.highRiskCount}
              subtitle="Require deployer obligations"
              icon={AlertTriangle}
            />
            <MetricCard
              title="Pending Classification"
              value={metrics.notClassifiedCount}
              subtitle="Need risk assessment"
              icon={HelpCircle}
            />
            <MetricCard
              title="Open Tasks"
              value={metrics.tasksTodo}
              subtitle={metrics.tasksOverdue > 0 ? `${metrics.tasksOverdue} overdue` : "All on track"}
              icon={CheckSquare}
            />
          </>
        )}
      </div>

      {/* Classification Breakdown */}
      {metrics.totalSystems > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Classification Breakdown
            </CardTitle>
            <CardDescription>Risk level distribution of your AI systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">High Risk</span>
                  <StatusBadge variant="high">{metrics.highRiskCount}</StatusBadge>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-destructive transition-all" 
                    style={{ width: `${metrics.totalSystems > 0 ? (metrics.highRiskCount / metrics.totalSystems) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Limited Risk</span>
                  <StatusBadge variant="limited">{metrics.limitedRiskCount}</StatusBadge>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-warning transition-all" 
                    style={{ width: `${metrics.totalSystems > 0 ? (metrics.limitedRiskCount / metrics.totalSystems) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Minimal Risk</span>
                  <StatusBadge variant="minimal">{metrics.minimalRiskCount}</StatusBadge>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-success transition-all" 
                    style={{ width: `${metrics.totalSystems > 0 ? (metrics.minimalRiskCount / metrics.totalSystems) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Not Classified</span>
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

      {/* Progress Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              Classification Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">{classificationProgress}%</span>
                <StatusBadge 
                  variant={classificationProgress === 100 ? "success" : classificationProgress > 50 ? "warning" : "draft"} 
                  dot
                >
                  {classificationProgress === 100 ? "Complete" : "In Progress"}
                </StatusBadge>
              </div>
              <Progress value={classificationProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {classifiedCount} of {metrics.totalSystems} systems classified
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Evidence Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">{metrics.evidenceCount}</span>
                <StatusBadge 
                  variant={evidenceProgress === 100 ? "success" : "warning"} 
                  dot
                >
                  {metrics.approvedEvidenceCount} approved
                </StatusBadge>
              </div>
              <Progress value={evidenceProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {metrics.approvedEvidenceCount} of {metrics.evidenceCount} files approved
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
              Task Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">{metrics.tasksTodo}</span>
                {metrics.tasksOverdue > 0 ? (
                  <StatusBadge variant="destructive" dot>
                    {metrics.tasksOverdue} overdue
                  </StatusBadge>
                ) : (
                  <StatusBadge variant="success" dot>On track</StatusBadge>
                )}
              </div>
              <Progress value={metrics.tasksTodo > 0 ? 50 : 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {metrics.tasksTodo} tasks pending completion
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* EU AI Act Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              EU AI Act Timeline
            </CardTitle>
            <CardDescription>Key compliance deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{deadline.event}</p>
                    <p className="text-sm text-muted-foreground">{deadline.date}</p>
                  </div>
                  <StatusBadge 
                    variant={deadline.type === "critical" ? "destructive" : deadline.type} 
                    dot
                  >
                    {deadline.type === "critical" ? "Critical" : deadline.type === "warning" ? "Upcoming" : "Future"}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Actions requiring attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/tasks">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {pendingTasks.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <CheckSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No pending tasks</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-4">
                    <div 
                      className={`h-2 w-2 mt-2 rounded-full ${
                        task.priority === "urgent" || task.priority === "high" 
                          ? "bg-destructive" 
                          : "bg-warning"
                      }`} 
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
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
