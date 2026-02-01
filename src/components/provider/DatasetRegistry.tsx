import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Plus, Edit2, Database, Trash2 } from "lucide-react";
import { 
  useDatasets, 
  useCreateDataset,
  useUpdateDataset,
  useDeleteDataset,
  DATASET_PURPOSE_OPTIONS,
  COLLECTION_METHOD_OPTIONS,
  BIAS_CHECK_OPTIONS
} from "@/hooks/useDataGovernance";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface DatasetRegistryProps {
  versionId?: string;
  organizationId?: string;
}

export function DatasetRegistry({ versionId, organizationId }: DatasetRegistryProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDataset, setEditingDataset] = useState<any>(null);
  const [selectedBiasChecks, setSelectedBiasChecks] = useState<string[]>([]);
  const { toast } = useToast();

  const { data: datasets, isLoading } = useDatasets(versionId);
  const createDataset = useCreateDataset();
  const updateDataset = useUpdateDataset();
  const deleteDataset = useDeleteDataset();

  const [formData, setFormData] = useState({
    name: "",
    purpose: "training",
    description: "",
    data_source: "",
    collection_method: "",
    geographic_scope: "",
    known_limitations: "",
    bias_mitigation_measures: "",
    record_count: "",
    feature_count: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      purpose: "training",
      description: "",
      data_source: "",
      collection_method: "",
      geographic_scope: "",
      known_limitations: "",
      bias_mitigation_measures: "",
      record_count: "",
      feature_count: "",
    });
    setSelectedBiasChecks([]);
    setEditingDataset(null);
  };

  const handleOpenDialog = (dataset?: any) => {
    if (dataset) {
      setEditingDataset(dataset);
      setFormData({
        name: dataset.name || "",
        purpose: dataset.purpose || "training",
        description: dataset.description || "",
        data_source: dataset.data_source || "",
        collection_method: dataset.collection_method || "",
        geographic_scope: dataset.geographic_scope || "",
        known_limitations: dataset.known_limitations || "",
        bias_mitigation_measures: dataset.bias_mitigation_measures || "",
        record_count: dataset.record_count?.toString() || "",
        feature_count: dataset.feature_count?.toString() || "",
      });
      if (Array.isArray(dataset.bias_checks_performed)) {
        setSelectedBiasChecks(dataset.bias_checks_performed);
      }
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

    if (!formData.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a dataset name.",
        variant: "destructive"
      });
      return;
    }

    const payload = {
      name: formData.name,
      purpose: formData.purpose,
      description: formData.description || undefined,
      data_source: formData.data_source || undefined,
      collection_method: formData.collection_method || undefined,
      geographic_scope: formData.geographic_scope || undefined,
      known_limitations: formData.known_limitations || undefined,
      bias_mitigation_measures: formData.bias_mitigation_measures || undefined,
      bias_checks_performed: selectedBiasChecks,
      record_count: formData.record_count ? parseInt(formData.record_count) : undefined,
      feature_count: formData.feature_count ? parseInt(formData.feature_count) : undefined,
    };

    if (editingDataset) {
      updateDataset.mutate({
        id: editingDataset.id,
        ...payload,
      }, {
        onSuccess: () => {
          setIsDialogOpen(false);
          resetForm();
        }
      });
    } else {
      createDataset.mutate({
        ai_system_version_id: versionId,
        organization_id: organizationId,
        ...payload,
      }, {
        onSuccess: () => {
          setIsDialogOpen(false);
          resetForm();
        }
      });
    }
  };

  const handleDelete = (datasetId: string) => {
    if (!versionId) return;
    deleteDataset.mutate({ id: datasetId, versionId });
  };

  const toggleBiasCheck = (check: string) => {
    setSelectedBiasChecks(prev => 
      prev.includes(check) 
        ? prev.filter(c => c !== check)
        : [...prev, check]
    );
  };

  const getPurposeLabel = (purpose: string) => {
    return DATASET_PURPOSE_OPTIONS.find(p => p.value === purpose)?.label || purpose;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Dataset Registry</CardTitle>
            <CardDescription>
              Article 10 data governance documentation
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Dataset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingDataset ? "Edit Dataset" : "Register Dataset"}</DialogTitle>
                <DialogDescription>
                  Document datasets used for training, validation, or testing
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Dataset Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Training Dataset v2.3"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Purpose</Label>
                    <Select
                      value={formData.purpose}
                      onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DATASET_PURPOSE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the dataset..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="data_source">Data Source</Label>
                    <Input
                      id="data_source"
                      placeholder="e.g., Internal CRM, Public API"
                      value={formData.data_source}
                      onChange={(e) => setFormData({ ...formData, data_source: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Collection Method</Label>
                    <Select
                      value={formData.collection_method}
                      onValueChange={(value) => setFormData({ ...formData, collection_method: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {COLLECTION_METHOD_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="geographic_scope">Geographic Scope</Label>
                    <Input
                      id="geographic_scope"
                      placeholder="e.g., EU, Global"
                      value={formData.geographic_scope}
                      onChange={(e) => setFormData({ ...formData, geographic_scope: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="record_count">Record Count</Label>
                    <Input
                      id="record_count"
                      type="number"
                      placeholder="e.g., 100000"
                      value={formData.record_count}
                      onChange={(e) => setFormData({ ...formData, record_count: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feature_count">Feature Count</Label>
                    <Input
                      id="feature_count"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.feature_count}
                      onChange={(e) => setFormData({ ...formData, feature_count: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="known_limitations">Known Limitations</Label>
                  <Textarea
                    id="known_limitations"
                    placeholder="Document any known limitations, gaps, or biases..."
                    value={formData.known_limitations}
                    onChange={(e) => setFormData({ ...formData, known_limitations: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bias Checks Performed</Label>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {BIAS_CHECK_OPTIONS.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.value}
                          checked={selectedBiasChecks.includes(option.value)}
                          onCheckedChange={() => toggleBiasCheck(option.value)}
                        />
                        <Label htmlFor={option.value} className="text-sm cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bias_mitigation">Bias Mitigation Measures</Label>
                  <Textarea
                    id="bias_mitigation"
                    placeholder="Describe measures taken to mitigate identified biases..."
                    value={formData.bias_mitigation_measures}
                    onChange={(e) => setFormData({ ...formData, bias_mitigation_measures: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>
                  {editingDataset ? "Update" : "Register Dataset"}
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
        ) : datasets && datasets.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dataset</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Bias Checks</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((dataset: any) => (
                <TableRow key={dataset.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      {dataset.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {getPurposeLabel(dataset.purpose)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {dataset.record_count ? dataset.record_count.toLocaleString() : "—"}
                  </TableCell>
                  <TableCell>
                    {Array.isArray(dataset.bias_checks_performed) && dataset.bias_checks_performed.length > 0 ? (
                      <Badge variant="outline">
                        {dataset.bias_checks_performed.length} checks
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">None</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(dataset.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(dataset)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(dataset.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No datasets registered.</p>
            <p className="text-sm text-muted-foreground">
              Document your training, validation, and testing datasets.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
