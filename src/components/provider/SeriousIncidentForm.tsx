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
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Serious Incident Register</CardTitle>
              <CardDescription>
                Article 73 serious incident reporting
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Report Incident
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Report Serious Incident</DialogTitle>
                  <DialogDescription>
                    Log a serious incident for reporting to market surveillance authorities
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Incident Title *</Label>
                    <Input
                      id="title"
                      placeholder="Brief description of the incident"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: SeriousIncidentCategory) => 
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(INCIDENT_CATEGORY_LABELS).map(([value, { label, deadline }]) => (
                          <SelectItem key={value} value={value}>
                            <div className="flex flex-col">
                              <span>{label}</span>
                              <span className="text-xs text-muted-foreground">Deadline: {deadline}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aware_at">Became Aware At *</Label>
                    <Input
                      id="aware_at"
                      type="datetime-local"
                      value={formData.aware_at}
                      onChange={(e) => setFormData({ ...formData, aware_at: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of the incident..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="immediate_actions">Immediate Actions Taken</Label>
                    <Textarea
                      id="immediate_actions"
                      placeholder="Actions taken immediately upon becoming aware..."
                      value={formData.immediate_actions}
                      onChange={(e) => setFormData({ ...formData, immediate_actions: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate}>Report Incident</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Incidents Table */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-10 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
            </div>
          ) : incidents && incidents.length > 0 ? (
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
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No serious incidents reported.</p>
              <p className="text-sm text-muted-foreground">
                Report any serious incidents as required by Article 73.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
