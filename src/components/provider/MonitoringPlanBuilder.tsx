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
      <Card>
        <CardContent className="py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-32 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!plan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Post-Market Monitoring Plan</CardTitle>
          <CardDescription>
            Article 72 monitoring requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No monitoring plan created.</p>
            <Button onClick={handleStart}>
              Create Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Post-Market Monitoring Plan</CardTitle>
              <CardDescription>
                Article 72 monitoring requirements
              </CardDescription>
            </div>
            <Badge className={statusColors[plan.status]}>
              {plan.status === 'in_review' ? 'In Review' : plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        {plan.approved_at && (
          <CardContent>
            <div className="bg-emerald-50 dark:bg-emerald-950 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium text-emerald-700 dark:text-emerald-300">
                  Approved on {format(new Date(plan.approved_at), "MMMM d, yyyy")}
                </span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Data Collection Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Data Collection Methods</CardTitle>
          <CardDescription>
            Select all methods used to collect post-market data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {DATA_COLLECTION_METHODS.map((method) => (
              <div key={method.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={method.value}
                  checked={selectedMethods.includes(method.value)}
                  onCheckedChange={() => toggleMethod(method.value)}
                />
                <Label htmlFor={method.value} className="text-sm cursor-pointer">
                  {method.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance KPIs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Performance KPIs</CardTitle>
              <CardDescription>
                Define key performance indicators and thresholds
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addKPI}>
              <Plus className="h-4 w-4 mr-1" />
              Add KPI
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {kpis.map((kpi, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-4 items-end border-b pb-4 last:border-0">
              <div className="space-y-2 md:col-span-1">
                <Label>KPI Name</Label>
                <Input 
                  placeholder="e.g., Accuracy"
                  value={kpi.name}
                  onChange={(e) => updateKPI(index, "name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Target</Label>
                <Input 
                  placeholder="e.g., 95%"
                  value={kpi.target}
                  onChange={(e) => updateKPI(index, "target", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Alert Threshold</Label>
                <Input 
                  placeholder="e.g., < 90%"
                  value={kpi.threshold}
                  onChange={(e) => updateKPI(index, "threshold", e.target.value)}
                />
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeKPI(index)}
                disabled={kpis.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Review Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Review Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Review Frequency</Label>
              <Select value={reviewFrequency} onValueChange={setReviewFrequency}>
                <SelectTrigger>
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
            <div className="space-y-2">
              <Label>Next Review Date</Label>
              <Input 
                type="date"
                value={nextReviewDate}
                onChange={(e) => setNextReviewDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Escalation Procedures */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Escalation Procedures</CardTitle>
          <CardDescription>
            Define what happens when thresholds are breached
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Describe the escalation procedures when KPI thresholds are breached or incidents occur..."
            className="min-h-[120px]"
            value={escalationProcedures}
            onChange={(e) => setEscalationProcedures(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button 
          onClick={handleApprove}
          disabled={plan.status === 'approved'}
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          {plan.status === 'approved' ? 'Approved' : 'Approve Plan'}
        </Button>
      </div>
    </div>
  );
}
