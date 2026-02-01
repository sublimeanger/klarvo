import { useState } from "react";
import {
  FileText,
  Clock,
  BookOpen,
  Plus,
  Check,
  Loader2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useCreatePolicy, POLICY_TYPES } from "@/hooks/usePolicies";
import { POLICY_TEMPLATES, TEMPLATE_CATEGORIES, type PolicyTemplate } from "@/lib/policyTemplates";
import { cn } from "@/lib/utils";

interface PolicyTemplateLibraryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdopt?: () => void;
}

export function PolicyTemplateLibrary({ open, onOpenChange, onAdopt }: PolicyTemplateLibraryProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<PolicyTemplate | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const createPolicy = useCreatePolicy();

  const filteredTemplates = activeCategory === "all"
    ? POLICY_TEMPLATES
    : POLICY_TEMPLATES.filter(t => t.category === activeCategory);

  const handleAdopt = async (template: PolicyTemplate) => {
    try {
      await createPolicy.mutateAsync({
        name: template.name,
        description: template.description,
        policy_type: template.policy_type,
        content: template.content,
        is_template: false,
        template_source: template.id,
      });
      
      toast.success("Template adopted successfully", {
        description: `"${template.name}" has been added to your policies as a draft.`,
      });
      
      setSelectedTemplate(null);
      onOpenChange(false);
      onAdopt?.();
    } catch (error) {
      toast.error("Failed to adopt template");
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "governance":
        return "🏛️";
      case "operational":
        return "⚙️";
      case "transparency":
        return "👁️";
      case "vendor":
        return "🤝";
      default:
        return "📄";
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[85vh] p-0 w-[95vw] sm:w-auto">
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-base sm:text-lg">Policy Template Library</DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  Pre-built EU AI Act compliant templates ready to customize
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex-1">
            <div className="px-4 sm:px-6 border-b overflow-x-auto">
              <TabsList className="h-9 sm:h-10 w-max sm:w-full justify-start bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-xs sm:text-sm px-2 sm:px-3"
                >
                  All
                </TabsTrigger>
                {TEMPLATE_CATEGORIES.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-xs sm:text-sm px-2 sm:px-3"
                  >
                    <span className="mr-1">{getCategoryIcon(cat.id)}</span>
                    <span className="hidden sm:inline">{cat.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <ScrollArea className="h-[400px] sm:h-[500px]">
              <div className="p-4 sm:p-6">
                <TabsContent value={activeCategory} className="mt-0">
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    {filteredTemplates.map((template) => (
                      <Card
                        key={template.id}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md hover:border-primary/50 rounded-xl",
                          selectedTemplate?.id === template.id && "ring-2 ring-primary"
                        )}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="rounded-lg bg-primary/10 p-1.5 sm:p-2 shrink-0">
                                <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                              </div>
                              <div className="space-y-0.5 sm:space-y-1 min-w-0">
                                <CardTitle className="text-sm sm:text-base truncate">{template.name}</CardTitle>
                                <CardDescription className="text-[10px] sm:text-xs line-clamp-2">
                                  {template.description}
                                </CardDescription>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 p-3 sm:p-4">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                              <Badge variant="secondary" className="text-[10px] sm:text-xs">
                                {getCategoryIcon(template.category)} <span className="hidden sm:inline">{TEMPLATE_CATEGORIES.find(c => c.id === template.category)?.label}</span>
                              </Badge>
                              {template.articleReference && (
                                <Badge variant="outline" className="text-[10px] sm:text-xs hidden sm:flex">
                                  <BookOpen className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                  {template.articleReference}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground shrink-0">
                              <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              {template.estimatedTime}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>

          {selectedTemplate && (
            <div className="border-t bg-muted/30 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-medium text-sm sm:text-base truncate">{selectedTemplate.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Will be added as a draft policy
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleAdopt(selectedTemplate)}
                  disabled={createPolicy.isPending}
                  className="h-10 sm:h-9 w-full sm:w-auto"
                >
                  {createPolicy.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Adopt Template
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle>{selectedTemplate?.name}</DialogTitle>
                <DialogDescription>{selectedTemplate?.description}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">
              {POLICY_TYPES.find(t => t.value === selectedTemplate?.policy_type)?.label}
            </Badge>
            {selectedTemplate?.articleReference && (
              <Badge variant="outline">
                <BookOpen className="mr-1 h-3 w-3" />
                {selectedTemplate.articleReference}
              </Badge>
            )}
            <Badge variant="outline">
              <Clock className="mr-1 h-3 w-3" />
              {selectedTemplate?.estimatedTime}
            </Badge>
          </div>

          <ScrollArea className="h-[400px] rounded-lg border bg-muted/20 p-4">
            <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
              {selectedTemplate?.content}
            </pre>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => selectedTemplate && handleAdopt(selectedTemplate)}
              disabled={createPolicy.isPending}
            >
              {createPolicy.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Adopt Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
