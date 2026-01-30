import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";
import { RadioGroupField } from "../RadioGroupField";
import {
  YES_NO,
  YES_NO_UNSURE,
  YES_NO_UNKNOWN,
  TRANSPARENCY_STATUS_OPTIONS,
} from "../constants";
import type { AISystemWizardData } from "../types";

interface Step10TransparencyProps {
  data: AISystemWizardData;
  onChange: (updates: Partial<AISystemWizardData>) => void;
}

export function Step10Transparency({ data, onChange }: Step10TransparencyProps) {
  const showObviousAI = data.transparency_direct_interaction === "yes";
  const showOutputsMarked = data.transparency_synthetic_content === "yes";

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-lg border border-primary/50 bg-primary/5 p-3 sm:p-4 flex gap-2 sm:gap-3">
        <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-xs sm:text-sm font-medium">Transparency Obligations (Article 50)</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Article 50 requires disclosure when people interact with AI, when content is 
            AI-generated, and in other specific scenarios.
          </p>
        </div>
      </div>

      <RadioGroupField
        label="Does the system interact directly with natural persons?"
        description="E.g., chatbots, voice assistants, customer-facing interfaces"
        options={YES_NO}
        value={data.transparency_direct_interaction}
        onChange={(value) => onChange({ transparency_direct_interaction: value })}
        layout="horizontal"
      />

      {showObviousAI && (
        <RadioGroupField
          label="Is it obvious to a reasonably informed person that it's AI?"
          description="Is the AI nature apparent from the context?"
          options={YES_NO_UNSURE}
          value={data.transparency_obvious_ai}
          onChange={(value) => onChange({ transparency_obvious_ai: value })}
          layout="horizontal"
        />
      )}

      <RadioGroupField
        label="Does it generate synthetic audio/image/video/text content?"
        description="Including AI-generated text, images, audio, or video"
        options={YES_NO}
        value={data.transparency_synthetic_content}
        onChange={(value) => onChange({ transparency_synthetic_content: value })}
        layout="horizontal"
      />

      {showOutputsMarked && (
        <RadioGroupField
          label="Does the provider/system mark outputs as AI-generated?"
          description="In a machine-readable and detectable way"
          options={YES_NO_UNKNOWN}
          value={data.transparency_outputs_marked}
          onChange={(value) => onChange({ transparency_outputs_marked: value })}
          layout="horizontal"
        />
      )}

      <RadioGroupField
        label="Does it perform emotion recognition or biometric categorisation?"
        options={YES_NO}
        value={data.transparency_emotion_recognition}
        onChange={(value) => onChange({ transparency_emotion_recognition: value })}
        layout="horizontal"
      />

      <RadioGroupField
        label="Does it generate/manipulate image/audio/video that constitutes a deepfake?"
        options={YES_NO}
        value={data.transparency_deepfake}
        onChange={(value) => onChange({ transparency_deepfake: value })}
        layout="horizontal"
      />

      <RadioGroupField
        label="Does it generate/manipulate text published to inform the public on matters of public interest?"
        description="E.g., news articles, public information content"
        options={YES_NO}
        value={data.transparency_public_text}
        onChange={(value) => onChange({ transparency_public_text: value })}
        layout="horizontal"
      />

      <div className="border-t pt-4 sm:pt-6">
        <RadioGroupField
          label="Transparency implementation status"
          options={TRANSPARENCY_STATUS_OPTIONS}
          value={data.transparency_status}
          onChange={(value) => onChange({ transparency_status: value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="transparency_notes" className="text-sm">Notes</Label>
        <Textarea
          id="transparency_notes"
          placeholder="Describe how transparency obligations are being addressed..."
          value={data.transparency_notes}
          onChange={(e) => onChange({ transparency_notes: e.target.value })}
          className="min-h-[70px] sm:min-h-[80px]"
        />
      </div>

      {data.transparency_status === "gaps_exist" && (
        <div className="rounded-lg border border-warning bg-warning/10 p-3 sm:p-4">
          <p className="text-xs sm:text-sm">
            <strong>Action required:</strong> Tasks will be created to implement missing 
            transparency disclosures.
          </p>
        </div>
      )}
    </div>
  );
}
