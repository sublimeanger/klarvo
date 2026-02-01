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
import { Plus, Edit2, AlertTriangle } from "lucide-react";
import { 
  useRiskRecords, 
  useCreateRiskRecord, 
  useUpdateRiskRecord,
  type RiskSeverity,
  type RiskLikelihood,
  calculateRiskLevel
} from "@/hooks/useRiskManagement";
import { useToast } from "@/hooks/use-toast";

interface RiskRegisterProps {
  versionId?: string;
  organizationId?: string;
}

const severityColors: Record<RiskSeverity, string> = {
  negligible: "bg-slate-100 text-slate-700",
  minor: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  major: "bg-orange-100 text-orange-700",
  catastrophic: "bg-red-100 text-red-700",
};

const likelihoodLabels: Record<RiskLikelihood, string> = {
  rare: "Rare",
  unlikely: "Unlikely",
  possible: "Possible",
  likely: "Likely",
  almost_certain: "Almost Certain",
};

export function RiskRegister({ versionId, organizationId }: RiskRegisterProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRisk, setEditingRisk] = useState<any>(null);
  const { toast } = useToast();

  const { data: risks, isLoading } = useRiskRecords(versionId);
  const createRisk = useCreateRiskRecord();
  const updateRisk = useUpdateRiskRecord();

  const [formData, setFormData] = useState({
    hazard: "",
    impacted_stakeholders: "",
    severity: "moderate" as RiskSeverity,
    likelihood: "possible" as RiskLikelihood,
    mitigation_measures: "",
    residual_risk_level: "",
    review_cadence: "quarterly",
  });

  const resetForm = () => {
    setFormData({
      hazard: "",
      impacted_stakeholders: "",
      severity: "moderate",
      likelihood: "possible",
      mitigation_measures: "",
      residual_risk_level: "",
      review_cadence: "quarterly",
    });
    setEditingRisk(null);
  };

  const handleOpenDialog = (risk?: any) => {
    if (risk) {
      setEditingRisk(risk);
      setFormData({
        hazard: risk.hazard || "",
        impacted_stakeholders: risk.impacted_stakeholders || "",
        severity: risk.severity || "moderate",
        likelihood: risk.likelihood || "possible",
        mitigation_measures: risk.mitigation_measures || "",
        residual_risk_level: risk.residual_risk_level || "",
        review_cadence: risk.review_cadence || "quarterly",
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!versionId || !organizationId) {
      toast({
        title: "Missing context",
        description: "Please select an AI system version first.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.hazard.trim()) {
      toast({
        title: "Hazard required",
        description: "Please describe the hazard.",
        variant: "destructive"
      });
      return;
    }

    if (editingRisk) {
      updateRisk.mutate({
        id: editingRisk.id,
        hazard: formData.hazard,
        impacted_stakeholders: formData.impacted_stakeholders,
        severity: formData.severity,
        likelihood: formData.likelihood,
        mitigation_measures: formData.mitigation_measures,
        residual_risk_level: formData.residual_risk_level,
        review_cadence: formData.review_cadence,
      }, {
        onSuccess: () => {
          setIsDialogOpen(false);
          resetForm();
        }
      });
    } else {
      createRisk.mutate({
        ai_system_version_id: versionId,
        organization_id: organizationId,
        hazard: formData.hazard,
        severity: formData.severity,
        likelihood: formData.likelihood,
        impacted_stakeholders: formData.impacted_stakeholders,
        mitigation_measures: formData.mitigation_measures,
        review_cadence: formData.review_cadence,
      }, {
        onSuccess: () => {
          setIsDialogOpen(false);
          resetForm();
        }
      });
    }
  };

  const getRiskLevelLabel = (level: string): string => {
    if (level === 'low') return "Low";
    if (level === 'medium') return "Medium";
    if (level === 'high') return "High";
    return "Critical";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Risk Register</CardTitle>
            <CardDescription>
              Document and track risks under Article 9 risk management requirements
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Risk
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingRisk ? "Edit Risk" : "Add New Risk"}</DialogTitle>
                <DialogDescription>
                  Document a risk to the AI system and its mitigation strategy
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="hazard">Hazard Description *</Label>
                  <Textarea
                    id="hazard"
                    placeholder="Describe the hazard or risk..."
                    value={formData.hazard}
                    onChange={(e) => setFormData({ ...formData, hazard: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stakeholders">Impacted Stakeholders</Label>
                  <Input
                    id="stakeholders"
                    placeholder="e.g., End users, Operators, Third parties"
                    value={formData.impacted_stakeholders}
                    onChange={(e) => setFormData({ ...formData, impacted_stakeholders: e.target.value })}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Severity</Label>
                    <Select
                      value={formData.severity}
                      onValueChange={(value: RiskSeverity) => setFormData({ ...formData, severity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="negligible">Negligible</SelectItem>
                        <SelectItem value="minor">Minor</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="major">Major</SelectItem>
                        <SelectItem value="catastrophic">Catastrophic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Likelihood</Label>
                    <Select
                      value={formData.likelihood}
                      onValueChange={(value: RiskLikelihood) => setFormData({ ...formData, likelihood: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rare">Rare</SelectItem>
                        <SelectItem value="unlikely">Unlikely</SelectItem>
                        <SelectItem value="possible">Possible</SelectItem>
                        <SelectItem value="likely">Likely</SelectItem>
                        <SelectItem value="almost_certain">Almost Certain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mitigation">Mitigation Measures</Label>
                  <Textarea
                    id="mitigation"
                    placeholder="Describe mitigation measures..."
                    value={formData.mitigation_measures}
                    onChange={(e) => setFormData({ ...formData, mitigation_measures: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="residual">Residual Risk Level</Label>
                  <Input
                    id="residual"
                    placeholder="e.g., Low, Medium, High"
                    value={formData.residual_risk_level}
                    onChange={(e) => setFormData({ ...formData, residual_risk_level: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Review Cadence</Label>
                  <Select
                    value={formData.review_cadence}
                    onValueChange={(value) => setFormData({ ...formData, review_cadence: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="semi_annually">Semi-annually</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>
                  {editingRisk ? "Update Risk" : "Add Risk"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
        ) : risks && risks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hazard</TableHead>
                <TableHead>Stakeholders</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Likelihood</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((risk: any) => {
                const level = risk.risk_level || calculateRiskLevel(risk.severity, risk.likelihood);
                return (
                  <TableRow key={risk.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {risk.hazard}
                    </TableCell>
                    <TableCell>{risk.impacted_stakeholders || "-"}</TableCell>
                    <TableCell>
                      <Badge className={severityColors[risk.severity as RiskSeverity]}>
                        {risk.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{likelihoodLabels[risk.likelihood as RiskLikelihood] || risk.likelihood}</TableCell>
                    <TableCell>
                      <Badge variant={level === 'critical' || level === 'high' ? 'destructive' : 'secondary'}>
                        {getRiskLevelLabel(level)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(risk)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No risks documented yet.</p>
            <p className="text-sm text-muted-foreground">
              Add risks to build your Article 9 risk management documentation.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
