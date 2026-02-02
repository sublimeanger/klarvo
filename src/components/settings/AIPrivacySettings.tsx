import { useState, useEffect } from "react";
import {
  Sparkles,
  ShieldCheck,
  Brain,
  FileText,
  MessageSquare,
  Wand2,
  BarChart3,
  Save,
  Loader2,
  Info,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useOrganization, useUpdateOrganization } from "@/hooks/useOrganization";
import { useAuth } from "@/contexts/AuthContext";

const AI_FEATURES = [
  {
    id: "ai_chat_enabled" as const,
    name: "AI Chat",
    description: "Context-aware compliance assistant",
    icon: MessageSquare,
  },
  {
    id: "ai_intake_enabled" as const,
    name: "AI-Powered Intake",
    description: "Natural language system intake",
    icon: Wand2,
  },
  {
    id: "ai_classification_enabled" as const,
    name: "Classification Assistant",
    description: "Risk classification suggestions",
    icon: Brain,
  },
  {
    id: "ai_document_enabled" as const,
    name: "Document Intelligence",
    description: "Contract and policy analysis",
    icon: FileText,
  },
  {
    id: "ai_copilot_enabled" as const,
    name: "Compliance Copilot",
    description: "AI-generated compliance digests",
    icon: BarChart3,
  },
];

type DataSharingMode = "standard" | "minimal" | "disabled";

interface AISettings {
  ai_features_enabled: boolean;
  ai_data_sharing_mode: DataSharingMode;
  ai_never_send_evidence_text: boolean;
  ai_chat_enabled: boolean;
  ai_intake_enabled: boolean;
  ai_classification_enabled: boolean;
  ai_document_enabled: boolean;
  ai_copilot_enabled: boolean;
}

export function AIPrivacySettings() {
  const { userRole } = useAuth();
  const { data: org, isLoading } = useOrganization();
  const updateOrg = useUpdateOrganization();

  const isAdmin = userRole?.role === "admin";
  const [expandedFeatures, setExpandedFeatures] = useState(false);

  const [settings, setSettings] = useState<AISettings>({
    ai_features_enabled: true,
    ai_data_sharing_mode: "standard",
    ai_never_send_evidence_text: false,
    ai_chat_enabled: true,
    ai_intake_enabled: true,
    ai_classification_enabled: true,
    ai_document_enabled: true,
    ai_copilot_enabled: true,
  });

  useEffect(() => {
    if (org) {
      setSettings({
        ai_features_enabled: org.ai_features_enabled ?? true,
        ai_data_sharing_mode: (org.ai_data_sharing_mode as DataSharingMode) ?? "standard",
        ai_never_send_evidence_text: org.ai_never_send_evidence_text ?? false,
        ai_chat_enabled: org.ai_chat_enabled ?? true,
        ai_intake_enabled: org.ai_intake_enabled ?? true,
        ai_classification_enabled: org.ai_classification_enabled ?? true,
        ai_document_enabled: org.ai_document_enabled ?? true,
        ai_copilot_enabled: org.ai_copilot_enabled ?? true,
      });
    }
  }, [org]);

  const handleSave = async () => {
    await updateOrg.mutateAsync(settings);
  };

  const updateSetting = <K extends keyof AISettings>(key: K, value: AISettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const allFeaturesDisabled = !settings.ai_features_enabled || settings.ai_data_sharing_mode === "disabled";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-base sm:text-lg">AI Features & Privacy</CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm">
            Control how AI-powered features work in your workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-3 sm:p-6 pt-0 sm:pt-0">
          {/* Master AI Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="ai-master" className="text-sm font-medium">
                  Enable AI-powered features
                </Label>
                {settings.ai_features_enabled && (
                  <Badge variant="secondary" className="text-[10px]">Active</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Controls: Classification Assistant, Document Intelligence, Compliance Copilot, AI Chat
              </p>
            </div>
            <Switch
              id="ai-master"
              checked={settings.ai_features_enabled}
              onCheckedChange={(checked) => updateSetting("ai_features_enabled", checked)}
              disabled={!isAdmin}
            />
          </div>

          {/* Data Sharing Mode */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Data Sharing Mode</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Controls what data is sent to AI models for personalized guidance.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select
              value={settings.ai_data_sharing_mode}
              onValueChange={(value: DataSharingMode) => updateSetting("ai_data_sharing_mode", value)}
              disabled={!isAdmin || !settings.ai_features_enabled}
            >
              <SelectTrigger className="h-10 sm:h-9">
                <SelectValue placeholder="Select mode..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">
                  <div className="flex flex-col items-start">
                    <span>Standard</span>
                    <span className="text-xs text-muted-foreground">Full context for personalized guidance</span>
                  </div>
                </SelectItem>
                <SelectItem value="minimal">
                  <div className="flex flex-col items-start">
                    <span>Minimal</span>
                    <span className="text-xs text-muted-foreground">Essential data only, no system names</span>
                  </div>
                </SelectItem>
                <SelectItem value="disabled">
                  <div className="flex flex-col items-start">
                    <span>Disabled</span>
                    <span className="text-xs text-muted-foreground">No data sent, AI features unavailable</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Evidence Text Protection */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-500" />
                <Label htmlFor="evidence-protect" className="text-sm font-medium">
                  Never send evidence text to AI
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Disables Document Intelligence for evidence analysis (protects sensitive documents)
              </p>
            </div>
            <Switch
              id="evidence-protect"
              checked={settings.ai_never_send_evidence_text}
              onCheckedChange={(checked) => updateSetting("ai_never_send_evidence_text", checked)}
              disabled={!isAdmin || !settings.ai_features_enabled}
            />
          </div>

          {/* Per-Feature Toggles (Collapsible) */}
          <Collapsible open={expandedFeatures} onOpenChange={setExpandedFeatures}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between px-4 h-10">
                <span className="text-sm">Advanced: Per-feature controls</span>
                <span className="text-xs text-muted-foreground">
                  {expandedFeatures ? "Hide" : "Show"}
                </span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-2 p-4 rounded-lg border bg-muted/30">
                {AI_FEATURES.map((feature) => {
                  const Icon = feature.icon;
                  const isEnabled = settings[feature.id];
                  return (
                    <div
                      key={feature.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-4 w-4 ${isEnabled && !allFeaturesDisabled ? "text-primary" : "text-muted-foreground"}`} />
                        <div>
                          <p className="text-sm font-medium">{feature.name}</p>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={(checked) => updateSetting(feature.id, checked)}
                        disabled={!isAdmin || allFeaturesDisabled}
                      />
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Info Alert */}
          <Alert variant="default" className="bg-muted/50">
            <Info className="h-4 w-4" />
            <AlertTitle className="text-sm">About AI features</AlertTitle>
            <AlertDescription className="text-xs">
              AI features use Lovable AI (powered by Google Gemini) to provide compliance guidance.
              Your data is processed securely. See our <a href="/legal/dpa" className="underline hover:text-primary">DPA</a> for data handling details.
            </AlertDescription>
          </Alert>

          {/* Warning if disabled */}
          {allFeaturesDisabled && (
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="text-sm">AI features disabled</AlertTitle>
              <AlertDescription className="text-xs">
                All AI-powered features are currently disabled. Users will see manual-only workflows.
              </AlertDescription>
            </Alert>
          )}

          {/* Save Button */}
          {isAdmin && (
            <Button
              onClick={handleSave}
              disabled={updateOrg.isPending}
              className="w-full sm:w-auto h-10 sm:h-9"
            >
              {updateOrg.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save AI Settings
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Regulatory Timeline Card */}
      <Card className="rounded-xl">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Regulatory Timeline Mode</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Choose which regulatory timeline to apply
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
          <Select
            value={org?.regulatory_timeline_mode || "current_law"}
            onValueChange={(value) => updateOrg.mutate({ regulatory_timeline_mode: value })}
            disabled={!isAdmin}
          >
            <SelectTrigger className="h-10 sm:h-9">
              <SelectValue placeholder="Select timeline..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_law">
                <div className="flex flex-col items-start">
                  <span>Current Law</span>
                  <span className="text-xs text-muted-foreground">Enacted EU AI Act timeline (Feb 2025 → Aug 2027)</span>
                </div>
              </SelectItem>
              <SelectItem value="proposed_amendments">
                <div className="flex flex-col items-start">
                  <span>Proposed Amendments</span>
                  <span className="text-xs text-muted-foreground">Includes Nov 2025 Omnibus proposal (not yet enacted)</span>
                </div>
              </SelectItem>
              <SelectItem value="early_compliance">
                <div className="flex flex-col items-start">
                  <span>Early Compliance</span>
                  <span className="text-xs text-muted-foreground">Apply all requirements now for maximum readiness</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <p className="text-xs text-muted-foreground">
            This affects deadline calculations and export annotations. Your classification decisions remain unchanged.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
