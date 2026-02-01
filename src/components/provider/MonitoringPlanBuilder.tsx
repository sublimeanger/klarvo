import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, CheckCircle2, Plus, Activity, Calendar } from "lucide-react";
import { 
  usePostMarketMonitoringPlan, 
  useCreatePMSPlan, 
  useUpdatePMSPlan,
  useApprovePMSPlan,
  DATA_COLLECTION_METHODS,
  REVIEW_FREQUENCY_OPTIONS,
  type DocStatus
} from "@/hooks/usePostMarketMonitoring";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface MonitoringPlanBuilderProps {
  versionId?: string;
  organizationId?: string;
}

const statusColors: Record<DocStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  in_review: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
};

interface KPIItem {
  name: string;
  target: string;
  threshold: string;
}

export function MonitoringPlanBuilder({ versionId, organizationId }: MonitoringPlanBuilderProps) {
  const { toast } = useToast();

  const { data: plan, isLoading } = usePostMarketMonitoringPlan(versionId);
  const createPlan = useCreatePMSPlan();
  const updatePlan = useUpdatePMSPlan();
  const approvePlan = useApprovePMSPlan();

  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [kpis, setKpis] = useState<KPIItem[]>([{ name: "", target: "", threshold: "" }]);
  const [reviewFrequency, setReviewFrequency] = useState("quarterly");
  const [nextReviewDate, setNextReviewDate] = useState("");
  const [escalationProcedures, setEscalationProcedures] = useState("");

  useEffect(() => {
    if (plan) {
      if (Array.isArray(plan.data_collection_methods)) {
        setSelectedMethods(plan.data_collection_methods as string[]);
      }
      if (Array.isArray(plan.performance_kpis)) {
        setKpis(plan.performance_kpis as unknown as KPIItem[]);
      }
      if (plan.review_frequency) {
        setReviewFrequency(plan.review_frequency);
      }
      if (plan.next_review_date) {
        setNextReviewDate(plan.next_review_date.split('T')[0]);
      }
      if (plan.escalation_procedures) {
        setEscalationProcedures(plan.escalation_procedures);
      }
    }
  }, [plan]);

  const handleStart = () => {
    if (!versionId || !organizationId) {
      toast({
        title: "Missing context",
        description: "Please select an AI system version first.",
        variant: "destructive"
      });
      return;
    }

    createPlan.mutate({
      ai_system_version_id: versionId,
      organization_id: organizationId,
    });
  };

  const handleSave = () => {
    if (!plan) return;

    updatePlan.mutate({
      id: plan.id,
      data_collection_methods: selectedMethods as unknown as import("@/integrations/supabase/types").Json,
      performance_kpis: kpis.filter(k => k.name.trim()) as unknown as import("@/integrations/supabase/types").Json,
      review_frequency: reviewFrequency,
      next_review_date: nextReviewDate || undefined,
      escalation_procedures: escalationProcedures,
    });
  };

  const handleApprove = () => {
    if (!plan) return;
    approvePlan.mutate({ id: plan.id, approvedBy: "current-user" });
  };

  const toggleMethod = (method: string) => {
    setSelectedMethods(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const addKPI = () => {
    setKpis([...kpis, { name: "", target: "", threshold: "" }]);
  };

  const updateKPI = (index: number, field: keyof KPIItem, value: string) => {
    const updated = [...kpis];
    updated[index][field] = value;
    setKpis(updated);
  };

  const removeKPI = (index: number) => {
    setKpis(kpis.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <Card className="rounded-xl">
        <CardContent className="py-6 sm:py-8 p-3 sm:p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 sm:h-8 bg-muted rounded w-1/3" />
            <div className="h-24 sm:h-32 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!plan) {
    return (
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Post-Market Monitoring Plan</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Article 72 monitoring requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="text-center py-6 sm:py-8">
            <Activity className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <p className="text-sm text-muted-foreground mb-4">No monitoring plan created.</p>
            <Button onClick={handleStart} className="h-11 w-full sm:w-auto">
              Create Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Status Card */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base sm:text-lg">Post-Market Monitoring Plan</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Article 72 monitoring requirements
              </CardDescription>
            </div>
            <Badge className={statusColors[plan.status]}>
              {plan.status === 'in_review' ? 'In Review' : plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        {plan.approved_at && (
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
            <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
                  Approved on {format(new Date(plan.approved_at), "MMMM d, yyyy")}
                </span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Data Collection Methods */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base">Data Collection Methods</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Select all methods used to collect post-market data
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {DATA_COLLECTION_METHODS.map((method) => (
              <div key={method.value} className="flex items-center space-x-2 min-h-[44px]">
                <Checkbox 
                  id={method.value}
                  checked={selectedMethods.includes(method.value)}
                  onCheckedChange={() => toggleMethod(method.value)}
                  className="h-5 w-5"
                />
                <Label htmlFor={method.value} className="text-xs sm:text-sm cursor-pointer">
                  {method.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance KPIs */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-sm sm:text-base">Performance KPIs</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Define key performance indicators and thresholds
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addKPI} className="h-9 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-1" />
              Add KPI
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
          {kpis.map((kpi, index) => (
            <div key={index} className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-4 items-end border-b pb-3 sm:pb-4 last:border-0">
              <div className="space-y-1.5 sm:space-y-2 sm:col-span-1">
                <Label className="text-xs sm:text-sm">KPI Name</Label>
                <Input 
                  placeholder="e.g., Accuracy"
                  value={kpi.name}
                  onChange={(e) => updateKPI(index, "name", e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-xs sm:text-sm">Target</Label>
                <Input 
                  placeholder="e.g., 95%"
                  value={kpi.target}
                  onChange={(e) => updateKPI(index, "target", e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-xs sm:text-sm">Alert Threshold</Label>
                <Input 
                  placeholder="e.g., < 90%"
                  value={kpi.threshold}
                  onChange={(e) => updateKPI(index, "threshold", e.target.value)}
                  className="h-10"
                />
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeKPI(index)}
                disabled={kpis.length === 1}
                className="h-10 w-full sm:w-auto"
              >
                Remove
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Review Schedule */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Review Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="space-y-1.5 sm:space-y-2">
              <Label className="text-xs sm:text-sm">Review Frequency</Label>
              <Select value={reviewFrequency} onValueChange={setReviewFrequency}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REVIEW_FREQUENCY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label className="text-xs sm:text-sm">Next Review Date</Label>
              <Input 
                type="date"
                value={nextReviewDate}
                onChange={(e) => setNextReviewDate(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Escalation Procedures */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base">Escalation Procedures</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Define what happens when thresholds are breached
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <Textarea 
            placeholder="Describe the escalation procedures when KPI thresholds are breached or incidents occur..."
            className="min-h-[100px] sm:min-h-[120px]"
            value={escalationProcedures}
            onChange={(e) => setEscalationProcedures(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
        <Button variant="outline" onClick={handleSave} className="h-11 w-full sm:w-auto">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button 
          onClick={handleApprove}
          disabled={plan.status === 'approved'}
          className="h-11 w-full sm:w-auto"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          {plan.status === 'approved' ? 'Approved' : 'Approve Plan'}
        </Button>
      </div>
    </div>
  );
}
