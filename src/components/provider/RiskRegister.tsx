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
    <Card className="rounded-xl">
      <CardHeader className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base sm:text-lg">Risk Register</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Document and track risks under Article 9 risk management requirements
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="h-10 sm:h-9 w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Risk
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-base sm:text-lg">{editingRisk ? "Edit Risk" : "Add New Risk"}</DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  Document a risk to the AI system and its mitigation strategy
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 sm:space-y-4 py-3 sm:py-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="hazard" className="text-xs sm:text-sm">Hazard Description *</Label>
                  <Textarea
                    id="hazard"
                    placeholder="Describe the hazard or risk..."
                    value={formData.hazard}
                    onChange={(e) => setFormData({ ...formData, hazard: e.target.value })}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stakeholders" className="text-xs sm:text-sm">Impacted Stakeholders</Label>
                  <Input
                    id="stakeholders"
                    placeholder="e.g., End users, Operators, Third parties"
                    value={formData.impacted_stakeholders}
                    onChange={(e) => setFormData({ ...formData, impacted_stakeholders: e.target.value })}
                  />
                </div>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm">Severity</Label>
                    <Select
                      value={formData.severity}
                      onValueChange={(value: RiskSeverity) => setFormData({ ...formData, severity: value })}
                    >
                      <SelectTrigger className="h-10">
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
                    <Label className="text-xs sm:text-sm">Likelihood</Label>
                    <Select
                      value={formData.likelihood}
                      onValueChange={(value: RiskLikelihood) => setFormData({ ...formData, likelihood: value })}
                    >
                      <SelectTrigger className="h-10">
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
                  <Label htmlFor="mitigation" className="text-xs sm:text-sm">Mitigation Measures</Label>
                  <Textarea
                    id="mitigation"
                    placeholder="Describe mitigation measures..."
                    value={formData.mitigation_measures}
                    onChange={(e) => setFormData({ ...formData, mitigation_measures: e.target.value })}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="residual" className="text-xs sm:text-sm">Residual Risk Level</Label>
                  <Input
                    id="residual"
                    placeholder="e.g., Low, Medium, High"
                    value={formData.residual_risk_level}
                    onChange={(e) => setFormData({ ...formData, residual_risk_level: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm">Review Cadence</Label>
                  <Select
                    value={formData.review_cadence}
                    onValueChange={(value) => setFormData({ ...formData, review_cadence: value })}
                  >
                    <SelectTrigger className="h-10">
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
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="h-11 w-full sm:w-auto">Cancel</Button>
                <Button onClick={handleSubmit} className="h-11 w-full sm:w-auto">
                  {editingRisk ? "Update Risk" : "Add Risk"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
        ) : risks && risks.length > 0 ? (
          <>
            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3">
              {risks.map((risk: any) => {
                const level = risk.risk_level || calculateRiskLevel(risk.severity, risk.likelihood);
                return (
                  <div key={risk.id} className="border rounded-xl p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium line-clamp-2">{risk.hazard}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(risk)}
                        className="h-8 w-8 shrink-0"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge className={severityColors[risk.severity as RiskSeverity]} variant="secondary">
                        {risk.severity}
                      </Badge>
                      <Badge variant={level === 'critical' || level === 'high' ? 'destructive' : 'secondary'}>
                        {getRiskLevelLabel(level)}
                      </Badge>
                    </div>
                    {risk.impacted_stakeholders && (
                      <p className="text-xs text-muted-foreground">{risk.impacted_stakeholders}</p>
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
            </div>
          </>
        ) : (
          <div className="text-center py-6 sm:py-8">
            <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <p className="text-sm text-muted-foreground">No risks documented yet.</p>
            <p className="text-xs text-muted-foreground">
              Add risks to build your Article 9 risk management documentation.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
