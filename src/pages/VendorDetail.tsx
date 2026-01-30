import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Building2,
  ArrowLeft,
  ExternalLink,
  Mail,
  Calendar,
  Loader2,
  Edit,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { StatusBadge } from "@/components/ui/status-badge";
import { VendorAttestations } from "@/components/vendors/VendorAttestations";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Vendor = Database["public"]["Tables"]["vendors"]["Row"];
type DueDiligenceStatus = Database["public"]["Enums"]["due_diligence_status"];

const dueDiligenceConfig: Record<DueDiligenceStatus, { label: string; variant: "draft" | "pending" | "success" | "warning" }> = {
  not_started: { label: "Not Started", variant: "draft" },
  in_progress: { label: "In Progress", variant: "pending" },
  completed: { label: "Completed", variant: "success" },
  needs_review: { label: "Needs Review", variant: "warning" },
};

function useVendor(id: string | undefined) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["vendor", id],
    queryFn: async () => {
      if (!id || !profile?.organization_id) return null;

      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .eq("id", id)
        .eq("organization_id", profile.organization_id)
        .single();

      if (error) throw error;
      return data as Vendor;
    },
    enabled: !!id && !!profile?.organization_id,
  });
}

function useVendorAISystems(vendorId: string | undefined) {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ["vendor-ai-systems", vendorId],
    queryFn: async () => {
      if (!vendorId || !profile?.organization_id) return [];

      const { data, error } = await supabase
        .from("ai_systems")
        .select("id, name, lifecycle_status")
        .eq("vendor_id", vendorId)
        .eq("organization_id", profile.organization_id);

      if (error) throw error;
      return data;
    },
    enabled: !!vendorId && !!profile?.organization_id,
  });
}

function useDeleteVendor() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("vendors").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      toast.success("Vendor deleted");
      navigate("/vendors");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete vendor: ${error.message}`);
    },
  });
}

export default function VendorDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: vendor, isLoading } = useVendor(id);
  const { data: aiSystems } = useVendorAISystems(id);
  const deleteVendor = useDeleteVendor();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="text-center py-12">
        <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Vendor not found</h2>
        <Button asChild>
          <Link to="/vendors">Back to Vendors</Link>
        </Button>
      </div>
    );
  }

  const statusConfig = dueDiligenceConfig[vendor.due_diligence_status];

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/vendors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{vendor.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge variant={statusConfig.variant} dot>
                  {statusConfig.label}
                </StatusBadge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Vendor?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove the vendor and all associated attestations. AI systems
                  linked to this vendor will have their vendor field cleared.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteVendor.mutate(vendor.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Vendor Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Website</p>
                {vendor.website ? (
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary flex items-center gap-1 hover:underline"
                  >
                    {vendor.website.replace(/^https?:\/\//, "").split("/")[0]}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <p className="font-medium text-muted-foreground">Not specified</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact Email</p>
                {vendor.contact_email ? (
                  <a
                    href={`mailto:${vendor.contact_email}`}
                    className="font-medium text-primary flex items-center gap-1 hover:underline"
                  >
                    <Mail className="h-3 w-3" />
                    {vendor.contact_email}
                  </a>
                ) : (
                  <p className="font-medium text-muted-foreground">Not specified</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contract Renewal</p>
                {vendor.contract_renewal_date ? (
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    {format(new Date(vendor.contract_renewal_date), "PP")}
                  </p>
                ) : (
                  <p className="font-medium text-muted-foreground">Not specified</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Diligence Status</p>
                <StatusBadge variant={statusConfig.variant} dot>
                  {statusConfig.label}
                </StatusBadge>
              </div>
            </div>
            {vendor.notes && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Notes</p>
                <p className="text-sm">{vendor.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Linked AI Systems</CardTitle>
            <CardDescription>
              AI systems using this vendor
            </CardDescription>
          </CardHeader>
          <CardContent>
            {aiSystems && aiSystems.length > 0 ? (
              <div className="space-y-2">
                {aiSystems.map((system) => (
                  <Link
                    key={system.id}
                    to={`/ai-systems/${system.id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="font-medium text-sm">{system.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {system.lifecycle_status}
                      </p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No AI systems linked</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Attestations */}
      <VendorAttestations vendorId={vendor.id} vendorName={vendor.name} />
    </div>
  );
}
