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

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Verification Status */}
      {marking?.verified_at && (
        <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950 rounded-xl">
          <CardContent className="py-3 sm:py-4 p-3 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-sm sm:text-base font-medium text-emerald-700 dark:text-emerald-300">CE Marking Verified</p>
                <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                  Verified on {format(new Date(marking.verified_at), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Marking Type */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base">CE Marking Method</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            How and where the CE marking is applied to the AI system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="space-y-1.5 sm:space-y-2">
            <Label className="text-xs sm:text-sm">Marking Type</Label>
            <Select
              value={formData.marking_type}
              onValueChange={(value) => setFormData({ ...formData, marking_type: value })}
            >
              <SelectTrigger className="h-10">
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
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="location" className="text-xs sm:text-sm">Location Description</Label>
            <Textarea
              id="location"
              placeholder="Describe where the CE marking is displayed..."
              value={formData.location_description}
              onChange={(e) => setFormData({ ...formData, location_description: e.target.value })}
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notified Body */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base">Notified Body (if applicable)</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            For systems assessed by a notified body under Annex VII
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="nb_number" className="text-xs sm:text-sm">Notified Body Number</Label>
            <Input
              id="nb_number"
              placeholder="e.g., 1234"
              value={formData.notified_body_number}
              onChange={(e) => setFormData({ ...formData, notified_body_number: e.target.value })}
              className="h-10"
            />
          </div>
          <div className="flex items-start space-x-3 min-h-[44px]">
            <Checkbox
              id="nb_displayed"
              checked={formData.notified_body_id_displayed}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, notified_body_id_displayed: checked as boolean })
              }
              className="mt-0.5"
            />
            <Label htmlFor="nb_displayed" className="text-xs sm:text-sm leading-relaxed cursor-pointer">
              Notified body identification number is displayed alongside CE marking
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base">Verification Checklist</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Confirm all CE marking requirements are met
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-6 pt-0 sm:pt-0">
          {checklistItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-3 min-h-[44px] py-1">
              <Checkbox
                id={item.id}
                checked={formData.checklist[item.id] || false}
                onCheckedChange={() => toggleChecklistItem(item.id)}
                className="mt-0.5"
              />
              <Label htmlFor={item.id} className="text-xs sm:text-sm leading-relaxed cursor-pointer">
                {item.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Evidence Upload */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base">Evidence</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Upload photos or screenshots of CE marking placement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="border-2 border-dashed rounded-xl p-4 sm:p-6 text-center">
            <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              Drag and drop or click to upload evidence
            </p>
            <Button variant="outline" size="sm" className="mt-2 h-10">
              Select Files
            </Button>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="notes" className="text-xs sm:text-sm">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes about the CE marking..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
        <Button variant="outline" onClick={handleSave} className="h-11 w-full sm:w-auto">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button 
          onClick={handleVerify}
          disabled={!marking || !!marking.verified_at || !allChecked}
          className="h-11 w-full sm:w-auto"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          {marking?.verified_at ? "Verified" : "Mark as Verified"}
        </Button>
      </div>
    </div>
  );
}
