import { 
  Cpu, 
  AlertTriangle, 
  HelpCircle, 
  Calendar, 
  FileCheck, 
  GraduationCap, 
  Shield,
  ArrowRight,
  Plus
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

const upcomingDeadlines = [
  { date: "Feb 2, 2025", event: "Prohibited AI practices ban", type: "critical" as const },
  { date: "Aug 2, 2025", event: "GPAI model requirements", type: "warning" as const },
  { date: "Aug 2, 2026", event: "High-risk AI system rules", type: "info" as const },
];

const recentActivity = [
  { action: "Added AI System", item: "ChatGPT for Customer Support", time: "2 hours ago" },
  { action: "Classification completed", item: "CV Screening Assistant", time: "5 hours ago" },
  { action: "Evidence uploaded", item: "Vendor Agreement - OpenAI", time: "1 day ago" },
  { action: "Task completed", item: "Add transparency notice", time: "2 days ago" },
];

const pendingTasks = [
  { title: "Complete classification for Marketing AI", priority: "high", dueIn: "2 days" },
  { title: "Upload vendor documentation for Fraud Detection", priority: "medium", dueIn: "5 days" },
  { title: "Assign oversight owner for CV Screening", priority: "high", dueIn: "1 day" },
];

export default function Dashboard() {
  const { metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { isTrialing, daysRemaining, plan, entitlements } = useSubscription();

  // Mock these for now - in production would come from real data
  const highRiskCandidates = 0;
  const missingClassification = metrics.draftSystems;
  const evidenceCompleteness = 0;
  const trainingCompletion = 0;
  const auditReadiness = 0;

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metricsLoading ? (
          <>
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
              title="High-Risk Candidates"
              value={highRiskCandidates}
              subtitle="Require deployer obligations"
              icon={AlertTriangle}
            />
            <MetricCard
              title="Missing Classification"
              value={missingClassification}
              subtitle="Need risk assessment"
              icon={HelpCircle}
            />
          </>
        )}
      </div>

      {/* Progress Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-muted-foreground" />
              Evidence Completeness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">{evidenceCompleteness}%</span>
                <StatusBadge variant="warning" dot>In Progress</StatusBadge>
              </div>
              <Progress value={evidenceCompleteness} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              Training Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">{trainingCompletion}%</span>
                <StatusBadge variant="warning" dot>In Progress</StatusBadge>
              </div>
              <Progress value={trainingCompletion} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              Audit Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">{auditReadiness}%</span>
                <StatusBadge variant="warning" dot>In Progress</StatusBadge>
              </div>
              <Progress value={auditReadiness} className="h-2" />
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
            <div className="space-y-4">
              {pendingTasks.map((task, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div 
                    className={`h-2 w-2 mt-2 rounded-full ${
                      task.priority === "high" ? "bg-destructive" : "bg-warning"
                    }`} 
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">Due in {task.dueIn}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions in your workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.action}</span>
                    {" · "}
                    <span className="text-muted-foreground">{activity.item}</span>
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
