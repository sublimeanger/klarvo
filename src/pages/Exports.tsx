import { useState } from "react";
import {
  Download,
  FileText,
  FolderArchive,
  Loader2,
  Cpu,
  Building2,
  FileCheck,
  Package,
  Clock,
  User,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAISystems } from "@/hooks/useAISystems";
import { useExports } from "@/hooks/useExports";
import { useExportHistory } from "@/hooks/useExportHistory";
import { useSubscription } from "@/hooks/useSubscription";
import { AuditorLinksPanel } from "@/components/exports/AuditorLinksPanel";
import { format } from "date-fns";

const formatExportType = (type: string) => {
  switch (type) {
    case "ai_system_pdf":
      return "PDF";
    case "ai_system_zip":
      return "ZIP";
    case "org_pack":
      return "Org Pack";
    case "classification_memo":
      return "Classification";
    case "fria_report":
      return "FRIA Report";
    default:
      return type;
  }
};

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function Exports() {
  const [selectedSystem, setSelectedSystem] = useState<string>("");
  const [includeEvidence, setIncludeEvidence] = useState(true);
  
  const { systems, isLoading: systemsLoading } = useAISystems();
  const { isExporting, exportAISystemPDF, exportAISystemZIP, exportAllSystems } = useExports();
  const { exports, isLoading: historyLoading } = useExportHistory();
  const { subscription } = useSubscription();

  // Free tier gets watermarks
  const isFreeTier = !subscription || subscription.plan_id === "free";

  const handleExportPDF = async () => {
    if (!selectedSystem) return;
    await exportAISystemPDF(selectedSystem, isFreeTier);
  };

  const handleExportZIP = async () => {
    if (!selectedSystem) return;
    await exportAISystemZIP(selectedSystem, { includeEvidence, showWatermark: isFreeTier });
  };

  const handleExportAll = async () => {
    await exportAllSystems(isFreeTier);
  };

  if (systemsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-up">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-2xl font-semibold tracking-tight">Export & Share</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Generate audit-ready documentation and share with external auditors
        </p>
      </div>

      <Tabs defaultValue="exports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="exports" className="gap-2">
            <Download className="h-4 w-4" />
            Export Packs
          </TabsTrigger>
          <TabsTrigger value="auditor-links" className="gap-2">
            <Link2 className="h-4 w-4" />
            Auditor Links
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exports" className="space-y-6">

      {/* Export Types Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Single System Export */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">AI System Evidence Pack</CardTitle>
                <CardDescription>
                  Export a single AI system with classification and evidence
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select AI System</Label>
              <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a system..." />
                </SelectTrigger>
                <SelectContent>
                  {systems.map((system) => (
                    <SelectItem key={system.id} value={system.id}>
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        {system.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-evidence"
                checked={includeEvidence}
                onCheckedChange={(checked) => setIncludeEvidence(checked === true)}
              />
              <Label htmlFor="include-evidence" className="text-sm">
                Include uploaded evidence files (ZIP only)
              </Label>
            </div>

            {isFreeTier && (
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Free tier:</span> Exports include a watermark.
                  Upgrade to remove watermarks.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleExportPDF}
                disabled={!selectedSystem || isExporting}
                className="flex-1"
                size="sm"
              >
                {isExporting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                Export PDF
              </Button>
              <Button
                onClick={handleExportZIP}
                disabled={!selectedSystem || isExporting}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                {isExporting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FolderArchive className="mr-2 h-4 w-4" />
                )}
                Export ZIP
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Full Organization Export */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Full Organization Export</CardTitle>
                <CardDescription>
                  Export all AI systems in a single ZIP bundle
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{systems.length} AI Systems</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Includes evidence packs for each AI system with classification details.
              </p>
            </div>

            {isFreeTier && (
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Free tier:</span> Exports include watermarks.
                </p>
              </div>
            )}

            <Button
              onClick={handleExportAll}
              disabled={systems.length === 0 || isExporting}
              className="w-full"
            >
              {isExporting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Export All Systems
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Export Contents Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What's Included</CardTitle>
          <CardDescription>
            Evidence packs contain everything auditors need
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-primary" />
                <span className="font-medium">System Overview</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                <li>• System name & description</li>
                <li>• Owner & department</li>
                <li>• Vendor information</li>
                <li>• Lifecycle status</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-primary" />
                <span className="font-medium">EU AI Act Classification</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                <li>• Risk level determination</li>
                <li>• Prohibited practices screening</li>
                <li>• High-risk categories</li>
                <li>• Transparency obligations</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-primary" />
                <span className="font-medium">Applicable Obligations</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                <li>• Deployer duties (Art. 26)</li>
                <li>• Human oversight requirements</li>
                <li>• Logging & monitoring</li>
                <li>• Transparency disclosures</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export History */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-muted p-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">Export History</CardTitle>
              <CardDescription>
                Recent exports for audit trail
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {historyLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : exports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Download className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Exports Yet</h3>
              <p className="text-muted-foreground max-w-sm">
                Your export history will appear here. Generate a PDF or ZIP above to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead>AI System</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Exported By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exports.map((exp) => (
                    <TableRow key={exp.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(exp.created_at), "MMM d, yyyy HH:mm")}
                      </TableCell>
                      <TableCell>
                        <StatusBadge variant="default">
                          {formatExportType(exp.export_type)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell className="font-mono text-xs max-w-[200px] truncate">
                        {exp.file_name}
                      </TableCell>
                      <TableCell>
                        {exp.ai_system?.name || "—"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatFileSize(exp.file_size_bytes)}
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">
                          {exp.user?.full_name || "Unknown"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="auditor-links">
          <AuditorLinksPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
