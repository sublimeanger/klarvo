import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, CheckCircle2, Upload } from "lucide-react";
import { 
  useCEMarkingRecords, 
  useCreateCEMarking, 
  useUpdateCEMarking,
  useVerifyCEMarking,
  CE_MARKING_TYPES
} from "@/hooks/useCEMarking";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface CEMarkingChecklistProps {
  versionId?: string;
  organizationId?: string;
}

const checklistItems = [
  { id: "marking_visible", label: "CE marking is visible and legible" },
  { id: "marking_indelible", label: "CE marking is indelible (cannot be easily removed)" },
  { id: "marking_proportionate", label: "CE marking is at least 5mm high or proportionate to the product" },
  { id: "marking_compliant", label: "CE marking conforms to the general principles in Article 30 of Regulation (EC) No 765/2008" },
  { id: "notified_body_id", label: "Notified body identification number displayed (if applicable)" },
  { id: "documentation_available", label: "Technical documentation and EU DoC available on request" },
];

export function CEMarkingChecklist({ versionId, organizationId }: CEMarkingChecklistProps) {
  const { toast } = useToast();

  const { data: markingRecords, isLoading } = useCEMarkingRecords(versionId);
  const createMarking = useCreateCEMarking();
  const updateMarking = useUpdateCEMarking();
  const verifyMarking = useVerifyCEMarking();

  const marking = markingRecords && markingRecords.length > 0 ? markingRecords[0] : null;

  const [formData, setFormData] = useState({
    marking_type: marking?.marking_type || "digital",
    location_description: marking?.location_description || "",
    notified_body_number: marking?.notified_body_number || "",
    notified_body_id_displayed: marking?.notified_body_id_displayed || false,
    notes: marking?.notes || "",
    checklist: {} as Record<string, boolean>,
  });

  const handleSave = () => {
    if (!versionId || !organizationId) {
      toast({
        title: "Missing context",
        description: "Please select an AI system version first.",
        variant: "destructive"
      });
      return;
    }

    if (marking) {
      updateMarking.mutate({
        id: marking.id,
        marking_type: formData.marking_type,
        location_description: formData.location_description,
        notified_body_number: formData.notified_body_number,
        notified_body_id_displayed: formData.notified_body_id_displayed,
        notes: formData.notes,
      });
    } else {
      createMarking.mutate({
        ai_system_version_id: versionId,
        organization_id: organizationId,
        marking_type: formData.marking_type,
        location_description: formData.location_description,
        notified_body_number: formData.notified_body_number,
        notified_body_id_displayed: formData.notified_body_id_displayed,
        notes: formData.notes,
      });
    }
  };

  const handleVerify = () => {
    if (!marking) return;

    verifyMarking.mutate({
      id: marking.id,
      verifiedBy: "current-user", // In production, get from auth context
    });
  };

  const toggleChecklistItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [itemId]: !prev.checklist[itemId]
      }
    }));
  };

  const allChecked = checklistItems.every(item => formData.checklist[item.id]);

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

  return (
    <div className="space-y-6">
      {/* Verification Status */}
      {marking?.verified_at && (
        <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="font-medium text-emerald-700 dark:text-emerald-300">CE Marking Verified</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Verified on {format(new Date(marking.verified_at), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Marking Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">CE Marking Method</CardTitle>
          <CardDescription>
            How and where the CE marking is applied to the AI system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Marking Type</Label>
            <Select
              value={formData.marking_type}
              onValueChange={(value) => setFormData({ ...formData, marking_type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CE_MARKING_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location Description</Label>
            <Textarea
              id="location"
              placeholder="Describe where the CE marking is displayed (e.g., on product label, in software UI, on packaging)..."
              value={formData.location_description}
              onChange={(e) => setFormData({ ...formData, location_description: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notified Body */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notified Body (if applicable)</CardTitle>
          <CardDescription>
            For systems assessed by a notified body under Annex VII
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nb_number">Notified Body Number</Label>
            <Input
              id="nb_number"
              placeholder="e.g., 1234"
              value={formData.notified_body_number}
              onChange={(e) => setFormData({ ...formData, notified_body_number: e.target.value })}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="nb_displayed"
              checked={formData.notified_body_id_displayed}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, notified_body_id_displayed: checked as boolean })
              }
            />
            <Label htmlFor="nb_displayed" className="text-sm">
              Notified body identification number is displayed alongside CE marking
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Verification Checklist</CardTitle>
          <CardDescription>
            Confirm all CE marking requirements are met
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklistItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <Checkbox
                id={item.id}
                checked={formData.checklist[item.id] || false}
                onCheckedChange={() => toggleChecklistItem(item.id)}
              />
              <Label htmlFor={item.id} className="text-sm leading-relaxed cursor-pointer">
                {item.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Evidence Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Evidence</CardTitle>
          <CardDescription>
            Upload photos or screenshots of CE marking placement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Drag and drop or click to upload evidence
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Select Files
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes about the CE marking..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button 
          onClick={handleVerify}
          disabled={!marking || !!marking.verified_at || !allChecked}
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          {marking?.verified_at ? "Verified" : "Mark as Verified"}
        </Button>
      </div>
    </div>
  );
}
