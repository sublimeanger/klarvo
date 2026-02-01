import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, ArrowRight, CheckCircle2, Clock, AlertTriangle, FileCheck } from "lucide-react";
import { 
  useConformityAssessments, 
  useCreateConformityAssessment, 
  useUpdateConformityAssessment,
  CONFORMITY_PATH_LABELS,
  CONFORMITY_STATUS_LABELS,
  type ConformityPathType,
  type ConformityStatus
} from "@/hooks/useConformityAssessment";
import { useToast } from "@/hooks/use-toast";

interface ConformityBoardProps {
  versionId?: string;
  organizationId?: string;
}

const statusConfig: Record<ConformityStatus, { color: string; icon: React.ReactNode }> = {
  draft: { 
    color: "bg-muted text-muted-foreground", 
    icon: <Clock className="h-4 w-4" />
  },
  internal_review: { 
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", 
    icon: <Clock className="h-4 w-4" />
  },
  submitted: { 
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300", 
    icon: <ArrowRight className="h-4 w-4" />
  },
  findings: { 
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300", 
    icon: <AlertTriangle className="h-4 w-4" />
  },
  closed: { 
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300", 
    icon: <FileCheck className="h-4 w-4" />
  },
  certified: { 
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300", 
    icon: <CheckCircle2 className="h-4 w-4" />
  },
  reassessment_triggered: { 
    color: "bg-destructive/10 text-destructive", 
    icon: <AlertTriangle className="h-4 w-4" />
  },
};

const statusOrder: ConformityStatus[] = ['draft', 'internal_review', 'submitted', 'findings', 'closed', 'certified'];

export function ConformityBoard({ versionId, organizationId }: ConformityBoardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: assessments, isLoading } = useConformityAssessments(versionId);
  const createAssessment = useCreateConformityAssessment();
  const updateAssessment = useUpdateConformityAssessment();

  const assessment = assessments && assessments.length > 0 ? assessments[0] : null;

  const [formData, setFormData] = useState({
    path_type: "annex_vi_internal" as ConformityPathType,
    notes: "",
  });

  const handleCreate = () => {
    if (!versionId || !organizationId) {
      toast({
        title: "Missing context",
        description: "Please select an AI system version first.",
        variant: "destructive"
      });
      return;
    }

    createAssessment.mutate({
      ai_system_version_id: versionId,
      organization_id: organizationId,
      path_type: formData.path_type,
      notes: formData.notes,
    }, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setFormData({ path_type: "annex_vi_internal", notes: "" });
      }
    });
  };

  const handleStatusChange = (newStatus: ConformityStatus) => {
    if (!assessment) return;

    updateAssessment.mutate({
      id: assessment.id,
      status: newStatus,
    });
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

  if (!assessment) {
    return (
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Conformity Assessment</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Article 43 conformity assessment workflow
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="text-center py-6 sm:py-8">
            <FileCheck className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <p className="text-sm text-muted-foreground mb-4">No conformity assessment started.</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-11 w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Start Assessment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg">Start Conformity Assessment</DialogTitle>
                  <DialogDescription className="text-xs sm:text-sm">
                    Choose the conformity assessment path for this AI system version
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Assessment Path</Label>
                    <Select
                      value={formData.path_type}
                      onValueChange={(value: ConformityPathType) => 
                        setFormData({ ...formData, path_type: value })
                      }
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annex_vi_internal">
                          {CONFORMITY_PATH_LABELS.annex_vi_internal}
                        </SelectItem>
                        <SelectItem value="annex_vii_notified_body">
                          {CONFORMITY_PATH_LABELS.annex_vii_notified_body}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="notes" className="text-xs sm:text-sm">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Initial notes about the assessment..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="h-11 w-full sm:w-auto">Cancel</Button>
                  <Button onClick={handleCreate} className="h-11 w-full sm:w-auto">Start Assessment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentStatus = statusConfig[assessment.status] || statusConfig.draft;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Current Status Card */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base sm:text-lg">Conformity Assessment</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {CONFORMITY_PATH_LABELS[assessment.path_type]}
              </CardDescription>
            </div>
            <Badge className={currentStatus.color}>
              <span className="flex items-center gap-1">
                {currentStatus.icon}
                {CONFORMITY_STATUS_LABELS[assessment.status]}
              </span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0 sm:pt-0">
          {/* Status Progress - horizontal scroll on mobile */}
          <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="flex items-center justify-between min-w-[500px] sm:min-w-0">
              {statusOrder.map((status, idx) => {
                const config = statusConfig[status];
                const isActive = assessment.status === status;
                const isPast = statusOrder.indexOf(assessment.status) > idx;
                
                return (
                  <div key={status} className="flex items-center">
                    <button
                      onClick={() => handleStatusChange(status)}
                      className={`flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-primary/10' : 'hover:bg-muted active:bg-muted'
                      }`}
                    >
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-primary text-primary-foreground' : 
                        isPast ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 
                        'bg-muted text-muted-foreground'
                      }`}>
                        {config?.icon || <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                      </div>
                      <span className={`text-[10px] sm:text-xs ${isActive ? 'font-medium' : 'text-muted-foreground'}`}>
                        {CONFORMITY_STATUS_LABELS[status]}
                      </span>
                    </button>
                    {idx < statusOrder.length - 1 && (
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mx-0.5 sm:mx-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assessment Details */}
          {assessment.notes && (
            <div className="bg-muted/50 rounded-xl p-3 sm:p-4">
              <p className="text-xs sm:text-sm font-medium mb-1">Notes</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{assessment.notes}</p>
            </div>
          )}

          {assessment.certificate_id && (
            <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-3 sm:p-4">
              <p className="text-xs sm:text-sm font-medium mb-1 text-emerald-700 dark:text-emerald-300">Certificate ID</p>
              <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">{assessment.certificate_id}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
