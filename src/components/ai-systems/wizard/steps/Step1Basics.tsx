import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEPARTMENTS } from "../constants";
import type { AISystemWizardData, LifecycleStatus } from "../types";

interface Step1BasicsProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
  errors?: Record<string, string>;
}

export function Step1Basics({ data, onChange, errors }: Step1BasicsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">AI System Name *</Label>
        <Input
          id="name"
          placeholder="e.g., ChatGPT for Customer Support"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className={errors?.name ? "border-destructive" : ""}
        />
        <p className="text-sm text-muted-foreground">
          A clear, descriptive name for this AI system
        </p>
        {errors?.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="internal_reference_id">Internal Reference ID</Label>
        <Input
          id="internal_reference_id"
          placeholder="e.g., AI-CS-001"
          value={data.internal_reference_id}
          onChange={(e) => onChange({ internal_reference_id: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">
          Optional internal tracking identifier
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Briefly describe what this AI system does..."
          className="min-h-[100px]"
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Department</Label>
          <Select
            value={data.department}
            onValueChange={(value) => onChange({ department: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={data.lifecycle_status}
            onValueChange={(value) => onChange({ lifecycle_status: value as LifecycleStatus })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft / Idea</SelectItem>
              <SelectItem value="pilot">Pilot</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
