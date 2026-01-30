import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  Building2,
  User,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { useCreateAISystem } from "@/hooks/useAISystems";
import { useVendors, useCreateVendor } from "@/hooks/useVendors";
import { useOrgMembers } from "@/hooks/useOrgMembers";
import { useAuth } from "@/contexts/AuthContext";
import type { Database } from "@/integrations/supabase/types";

type LifecycleStatus = Database["public"]["Enums"]["lifecycle_status"];

const DEPARTMENTS = [
  "Customer Service",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "IT / Technology",
  "Legal",
  "Product",
  "Research & Development",
  "Other",
];

const quickCaptureSchema = z.object({
  name: z.string().min(1, "System name is required"),
  description: z.string().optional(),
  department: z.string().optional(),
  lifecycle_status: z.enum(["draft", "pilot", "live", "retired", "archived"]).default("draft"),
  vendor_id: z.string().optional(),
  new_vendor_name: z.string().optional(),
  primary_owner_id: z.string().optional(),
});

type QuickCaptureFormData = z.infer<typeof quickCaptureSchema>;

const steps = [
  { id: 1, title: "Basics", icon: Cpu },
  { id: 2, title: "Vendor", icon: Building2 },
  { id: 3, title: "Ownership", icon: User },
  { id: 4, title: "Done", icon: CheckCircle },
];

export default function AISystemWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useAuth();
  const { vendors } = useVendors();
  const { members } = useOrgMembers();
  const createSystem = useCreateAISystem();
  const createVendor = useCreateVendor();

  const form = useForm<QuickCaptureFormData>({
    resolver: zodResolver(quickCaptureSchema),
    defaultValues: {
      name: "",
      description: "",
      department: "",
      lifecycle_status: "draft",
      vendor_id: "",
      new_vendor_name: "",
      primary_owner_id: user?.id || "",
    },
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = async () => {
    if (currentStep === 1) {
      const valid = await form.trigger(["name", "description", "department", "lifecycle_status"]);
      if (!valid) return;
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (data: QuickCaptureFormData) => {
    try {
      let vendorId = data.vendor_id === "new" ? undefined : data.vendor_id || undefined;

      // Create vendor if needed
      if (data.vendor_id === "new" && data.new_vendor_name) {
        const vendor = await createVendor.mutateAsync({ name: data.new_vendor_name });
        vendorId = vendor.id;
      }

      await createSystem.mutateAsync({
        name: data.name,
        description: data.description || null,
        department: data.department || null,
        lifecycle_status: data.lifecycle_status as LifecycleStatus,
        vendor_id: vendorId || null,
        primary_owner_id: data.primary_owner_id || null,
      });

      setCurrentStep(4);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI System Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ChatGPT for Customer Support" {...field} />
                  </FormControl>
                  <FormDescription>
                    A clear, descriptive name for this AI system
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly describe what this AI system does..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DEPARTMENTS.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lifecycle_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft / Idea</SelectItem>
                        <SelectItem value="pilot">Pilot</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 2:
        const vendorValue = form.watch("vendor_id");
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="vendor_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor / Provider</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select or add vendor" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormDescription>
                    Is this AI system from an external vendor or built internally?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {vendorValue === "new" && (
              <FormField
                control={form.control}
                name="new_vendor_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Vendor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., OpenAI, Microsoft, Anthropic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="primary_owner_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Owner</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {members.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.full_name || "Unnamed User"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Who is responsible for managing this AI system's compliance?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-lg border border-dashed bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">
                <strong>What happens next:</strong> After creating this system, you'll be able to:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Run the EU AI Act classification wizard</li>
                <li>Upload vendor documentation and evidence</li>
                <li>Assign controls and track compliance</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 rounded-full bg-success/10 p-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI System Added!</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {form.getValues("name")} has been added to your inventory. 
              You can now classify it and start tracking compliance.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate("/ai-systems")}>
                View Inventory
              </Button>
              <Button onClick={() => {
                form.reset();
                setCurrentStep(1);
              }}>
                Add Another
              </Button>
            </div>
          </div>
        );
    }
  };

  const isSubmitting = createSystem.isPending || createVendor.isPending;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/ai-systems")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Add AI System</h1>
          <p className="text-muted-foreground">Quick capture — essential details only</p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-4">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-2 text-sm ${
                step.id <= currentStep ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <step.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Tell us about this AI system"}
            {currentStep === 2 && "Who provides this AI system?"}
            {currentStep === 3 && "Who's responsible for this system?"}
            {currentStep === 4 && "Your AI system has been added"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              {renderStep()}

              {currentStep < 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>

                  {currentStep < 3 ? (
                    <Button type="button" onClick={handleNext}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create AI System
                    </Button>
                  )}
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
