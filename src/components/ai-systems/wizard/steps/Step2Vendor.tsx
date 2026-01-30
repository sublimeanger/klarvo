import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AISystemWizardData } from "../types";
import type { Tables } from "@/integrations/supabase/types";

interface Step2VendorProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
  vendors: Tables<"vendors">[];
}

export function Step2Vendor({ data, onChange, vendors }: Step2VendorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Vendor / Provider</Label>
        <Select
          value={data.vendor_id}
          onValueChange={(value) => onChange({ vendor_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select or add vendor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="internal">Internal / Built in-house</SelectItem>
            {vendors.map((vendor) => (
              <SelectItem key={vendor.id} value={vendor.id}>
                {vendor.name}
              </SelectItem>
            ))}
            <SelectItem value="new">+ Add new vendor</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Is this AI system from an external vendor or built internally?
        </p>
      </div>

      {data.vendor_id === "new" && (
        <div className="space-y-2">
          <Label htmlFor="new_vendor_name">New Vendor Name</Label>
          <Input
            id="new_vendor_name"
            placeholder="e.g., OpenAI, Microsoft, Anthropic"
            value={data.new_vendor_name}
            onChange={(e) => onChange({ new_vendor_name: e.target.value })}
          />
        </div>
      )}

      <div className="rounded-lg border border-dashed bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Why we ask:</strong> The EU AI Act has different obligations depending on 
          whether you're a provider (building AI) or deployer (using AI). External vendors 
          may also need to provide compliance documentation.
        </p>
      </div>
    </div>
  );
}
