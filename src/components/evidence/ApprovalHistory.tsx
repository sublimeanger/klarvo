import { format } from "date-fns";
import { CheckCircle, FileText, User, Calendar, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApprovalHistory } from "@/hooks/useEvidence";

const EVIDENCE_TYPES: Record<string, string> = {
  vendor_doc: "Vendor Doc",
  policy: "Policy",
  training: "Training",
  risk_assessment: "Risk Assessment",
  monitoring: "Monitoring",
  incident: "Incident",
  transparency_notice: "Transparency",
  contract: "Contract",
  other: "Other",
};

export function ApprovalHistory() {
  const { data: history = [], isLoading } = useApprovalHistory(50);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <CheckCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No approval history</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            Approved evidence files will appear here with their approval details.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Evidence</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Linked To</TableHead>
            <TableHead>Approved By</TableHead>
            <TableHead>Approved Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((evidence) => (
            <TableRow key={evidence.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                    <FileText className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="font-medium">{evidence.name}</p>
                    {evidence.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {evidence.description}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {evidence.evidence_type ? (
                  <Badge variant="outline" className="text-xs">
                    {EVIDENCE_TYPES[evidence.evidence_type] || evidence.evidence_type}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {evidence.ai_systems?.name && (
                    <span className="text-primary">{evidence.ai_systems.name}</span>
                  )}
                  {evidence.vendors?.name && (
                    <span className="text-muted-foreground">
                      {evidence.ai_systems?.name ? " • " : ""}
                      {evidence.vendors.name}
                    </span>
                  )}
                  {!evidence.ai_systems?.name && !evidence.vendors?.name && (
                    <span className="text-muted-foreground">—</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-3 w-3 text-muted-foreground" />
                  {evidence.approver?.full_name || "Unknown"}
                </div>
              </TableCell>
              <TableCell>
                {evidence.approved_at ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(evidence.approved_at), "MMM d, yyyy")}
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
