import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Plus, AlertTriangle, Clock, Send, CheckCircle2 } from "lucide-react";
import { 
  useSeriousIncidentReports, 
  useCreateSeriousIncident,
  useSubmitSeriousIncident,
  INCIDENT_CATEGORY_LABELS,
  INCIDENT_STATUS_LABELS,
  isDeadlineApproaching,
  isDeadlinePassed,
  type SeriousIncidentCategory,
  type SeriousIncidentStatus
} from "@/hooks/useSeriousIncidents";
import { useToast } from "@/hooks/use-toast";
import { format, differenceInHours } from "date-fns";

interface SeriousIncidentFormProps {
  aiSystemId?: string;
  organizationId?: string;
}

const statusColors: Record<SeriousIncidentStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  pending_submission: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  submitted: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  acknowledged: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  closed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
};

export function SeriousIncidentForm({ aiSystemId, organizationId }: SeriousIncidentFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: incidents, isLoading } = useSeriousIncidentReports(aiSystemId);
  const createIncident = useCreateSeriousIncident();
  const submitIncident = useSubmitSeriousIncident();

  const [formData, setFormData] = useState({
    title: "",
    category: "other" as SeriousIncidentCategory,
    aware_at: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    description: "",
    immediate_actions: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      category: "other",
      aware_at: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      description: "",
      immediate_actions: "",
    });
  };

  const handleCreate = () => {
    if (!aiSystemId || !organizationId) {
      toast({
        title: "Missing context",
        description: "Please select an AI system first.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter an incident title.",
        variant: "destructive"
      });
      return;
    }

    createIncident.mutate({
      ai_system_id: aiSystemId,
      organization_id: organizationId,
      title: formData.title,
      category: formData.category,
      aware_at: formData.aware_at,
      description: formData.description,
      immediate_actions: formData.immediate_actions,
    }, {
      onSuccess: () => {
        setIsDialogOpen(false);
        resetForm();
      }
    });
  };

  const handleSubmit = (incidentId: string) => {
    submitIncident.mutate({
      id: incidentId,
      authority: "National Market Surveillance Authority",
    });
  };

  const getDeadlineStatus = (deadlineAt: string) => {
    if (isDeadlinePassed(deadlineAt)) {
      return { label: "Overdue", color: "bg-destructive text-destructive-foreground" };
    }
    if (isDeadlineApproaching(deadlineAt)) {
      return { label: "Urgent", color: "bg-orange-500 text-white" };
    }
    const hoursLeft = differenceInHours(new Date(deadlineAt), new Date());
    return { label: `${Math.floor(hoursLeft / 24)}d ${hoursLeft % 24}h`, color: "bg-muted text-muted-foreground" };
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Card */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base sm:text-lg">Serious Incident Register</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Article 73 serious incident reporting
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-10 w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Report Incident
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg">Report Serious Incident</DialogTitle>
                  <DialogDescription className="text-xs sm:text-sm">
                    Log a serious incident for reporting to market surveillance authorities
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 sm:space-y-4 py-3 sm:py-4 max-h-[60vh] overflow-y-auto">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="title" className="text-xs sm:text-sm">Incident Title *</Label>
                    <Input
                      id="title"
                      placeholder="Brief description of the incident"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: SeriousIncidentCategory) => 
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(INCIDENT_CATEGORY_LABELS).map(([value, { label, deadline }]) => (
                          <SelectItem key={value} value={value}>
                            <div className="flex flex-col">
                              <span className="text-sm">{label}</span>
                              <span className="text-xs text-muted-foreground">Deadline: {deadline}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="aware_at" className="text-xs sm:text-sm">Became Aware At *</Label>
                    <Input
                      id="aware_at"
                      type="datetime-local"
                      value={formData.aware_at}
                      onChange={(e) => setFormData({ ...formData, aware_at: e.target.value })}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="description" className="text-xs sm:text-sm">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of the incident..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="immediate_actions" className="text-xs sm:text-sm">Immediate Actions Taken</Label>
                    <Textarea
                      id="immediate_actions"
                      placeholder="Actions taken immediately upon becoming aware..."
                      value={formData.immediate_actions}
                      onChange={(e) => setFormData({ ...formData, immediate_actions: e.target.value })}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="h-11 w-full sm:w-auto">Cancel</Button>
                  <Button onClick={handleCreate} className="h-11 w-full sm:w-auto">Report Incident</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Incidents List */}
      <Card className="rounded-xl">
        <CardContent className="p-3 sm:p-6">
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-10 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
            </div>
          ) : incidents && incidents.length > 0 ? (
            <>
              {/* Mobile Card View */}
              <div className="sm:hidden space-y-3">
                {incidents.map((incident) => {
                  const deadlineStatus = getDeadlineStatus(incident.deadline_at);
                  return (
                    <div key={incident.id} className="border rounded-xl p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2">{incident.title}</p>
                          <p className="text-[10px] text-muted-foreground">
                            Aware: {format(new Date(incident.aware_at), "MMM d, HH:mm")}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge className={deadlineStatus.color} variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          {deadlineStatus.label}
                        </Badge>
                        <Badge className={statusColors[incident.status]} variant="secondary">
                          {INCIDENT_STATUS_LABELS[incident.status]}
                        </Badge>
                      </div>
                      {(incident.status === 'draft' || incident.status === 'pending_submission') && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSubmit(incident.id)}
                          className="w-full h-9"
                        >
                          <Send className="h-3 w-3 mr-1" />
                          Submit to Authority
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Incident</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidents.map((incident) => {
                      const deadlineStatus = getDeadlineStatus(incident.deadline_at);
                      return (
                        <TableRow key={incident.id}>
                          <TableCell>
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                              <div>
                                <p className="font-medium">{incident.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  Aware: {format(new Date(incident.aware_at), "MMM d, yyyy HH:mm")}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {INCIDENT_CATEGORY_LABELS[incident.category].label}
                          </TableCell>
                          <TableCell>
                            <Badge className={deadlineStatus.color}>
                              <Clock className="h-3 w-3 mr-1" />
                              {deadlineStatus.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[incident.status]}>
                              {INCIDENT_STATUS_LABELS[incident.status]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {incident.status === 'draft' || incident.status === 'pending_submission' ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSubmit(incident.id)}
                              >
                                <Send className="h-3 w-3 mr-1" />
                                Submit
                              </Button>
                            ) : incident.status === 'submitted' || incident.status === 'acknowledged' ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            ) : null}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
              <p className="text-sm text-muted-foreground">No serious incidents reported.</p>
              <p className="text-xs text-muted-foreground">
                Report any serious incidents as required by Article 73.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
