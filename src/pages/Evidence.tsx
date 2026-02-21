import { useState, useRef, useMemo } from "react";
import { format } from "date-fns";
import {
  Plus,
  Search,
  FileText,
  Download,
  Trash2,
  MoreHorizontal,
  Loader2,
  Upload,
  CheckCircle,
  Clock,
  AlertTriangle,
  Archive,
  Filter,
  File,
  FileImage,
  FileSpreadsheet,
  ClipboardCheck,
  History,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEvidenceFiles,
  useUploadEvidence,
  useDeleteEvidence,
  useDownloadEvidence,
  useUpdateEvidenceStatus,
  usePendingApprovals,
} from "@/hooks/useEvidence";
import { useAISystems } from "@/hooks/useAISystems";
import { useVendors } from "@/hooks/useVendors";
import { ApprovalQueue } from "@/components/evidence/ApprovalQueue";
import { ApprovalHistory } from "@/components/evidence/ApprovalHistory";
import { DocumentIntelligencePanel } from "@/components/evidence/DocumentIntelligencePanel";

const EVIDENCE_TYPES = [
  { value: "vendor_doc", label: "Vendor Documentation" },
  { value: "policy", label: "Policy Document" },
  { value: "training", label: "Training Material" },
  { value: "risk_assessment", label: "Risk Assessment" },
  { value: "monitoring", label: "Monitoring Report" },
  { value: "incident", label: "Incident Report" },
  { value: "transparency_notice", label: "Transparency Notice" },
  { value: "contract", label: "Contract" },
  { value: "other", label: "Other" },
];

const statusConfig: Record<string, { label: string; variant: "draft" | "success" | "warning" | "pending" }> = {
  draft: { label: "Draft", variant: "draft" },
  approved: { label: "Approved", variant: "success" },
  expired: { label: "Expired", variant: "warning" },
  archived: { label: "Archived", variant: "pending" },
};

function getFileIcon(mimeType: string | null) {
  if (!mimeType) return File;
  if (mimeType.startsWith("image/")) return FileImage;
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) return FileSpreadsheet;
  return FileText;
}

function formatFileSize(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Evidence() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; filePath: string } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadForm, setUploadForm] = useState({
    name: "",
    description: "",
    evidence_type: "",
    ai_system_id: "",
    vendor_id: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: files = [], isLoading } = useEvidenceFiles();
  const { data: pendingApprovals = [] } = usePendingApprovals();
  const { systems } = useAISystems();
  const { vendors } = useVendors();
  const uploadEvidence = useUploadEvidence();
  const deleteEvidence = useDeleteEvidence();
  const downloadEvidence = useDownloadEvidence();
  const updateStatus = useUpdateEvidenceStatus();

  const pendingCount = pendingApprovals.length;

  const filteredFiles = useMemo(() => files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (file.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  ), [files, searchQuery]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!uploadForm.name) {
        setUploadForm({ ...uploadForm, name: file.name });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadForm.name) return;

    await uploadEvidence.mutateAsync({
      file: selectedFile,
      metadata: {
        name: uploadForm.name,
        description: uploadForm.description || undefined,
        evidence_type: uploadForm.evidence_type || undefined,
        ai_system_id: uploadForm.ai_system_id || undefined,
        vendor_id: uploadForm.vendor_id || undefined,
      },
    });

    setShowUploadDialog(false);
    setSelectedFile(null);
    setUploadForm({ name: "", description: "", evidence_type: "", ai_system_id: "", vendor_id: "" });
  };

  const handleDelete = async () => {
    if (deleteTarget) {
      await deleteEvidence.mutateAsync(deleteTarget);
      setDeleteTarget(null);
    }
  };

  // Stats
  const { totalFiles, approvedFiles, draftFiles } = useMemo(() => ({
    totalFiles: files.length,
    approvedFiles: files.filter((f) => f.status === "approved").length,
    draftFiles: files.filter((f) => f.status === "draft").length,
  }), [files]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Evidence Vault</h1>
          <p className="text-sm text-muted-foreground">
            Store and manage compliance documentation
          </p>
        </div>
        <Button size="sm" onClick={() => setShowUploadDialog(true)} className="w-full sm:w-auto">
          <Upload className="mr-2 h-4 w-4" />
          Upload Evidence
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="w-full sm:w-auto overflow-x-auto">
          <TabsTrigger value="all" className="gap-1.5 text-xs sm:text-sm">
            <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">All Files</span>
            <span className="sm:hidden">Files</span>
          </TabsTrigger>
          <TabsTrigger value="approval" className="gap-1.5 text-xs sm:text-sm">
            <ClipboardCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Approval Queue</span>
            <span className="sm:hidden">Queue</span>
            {pendingCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-4 w-4 sm:h-5 sm:w-5 p-0 justify-center text-[10px] sm:text-xs">
                {pendingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-1.5 text-xs sm:text-sm">
            <History className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Approval History</span>
            <span className="sm:hidden">History</span>
          </TabsTrigger>
          <TabsTrigger value="ai-analysis" className="gap-1.5 text-xs sm:text-sm">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">AI Analysis</span>
            <span className="sm:hidden">AI</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 sm:space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 shrink-0">
              <Filter className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-primary/10 p-1.5 sm:p-2">
              <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{totalFiles}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Total</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-success/10 p-1.5 sm:p-2">
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{approvedFiles}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Approved</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg bg-warning/10 p-1.5 sm:p-2">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-warning" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-bold">{draftFiles}</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table or Empty State */}
      {filteredFiles.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? "No files found" : "No evidence yet"}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm text-center">
              {searchQuery
                ? "Try adjusting your search"
                : "Upload compliance documentation, policies, and evidence files"
              }
            </p>
            {!searchQuery && (
              <Button onClick={() => setShowUploadDialog(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Upload First File
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Linked To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.mime_type);
                return (
                  <TableRow key={file.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <FileIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.file_size)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {EVIDENCE_TYPES.find((t) => t.value === file.evidence_type)?.label || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {file.ai_systems?.name && (
                          <span className="text-primary">{file.ai_systems.name}</span>
                        )}
                        {file.vendors?.name && (
                          <span className="text-muted-foreground">
                            {file.ai_systems?.name ? " • " : ""}
                            {file.vendors.name}
                          </span>
                        )}
                        {!file.ai_systems?.name && !file.vendors?.name && (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={file.status}
                        onValueChange={(v) =>
                          updateStatus.mutate({ id: file.id, status: v as any })
                        }
                      >
                        <SelectTrigger className="w-[120px] h-8">
                          <StatusBadge
                            variant={statusConfig[file.status]?.variant || "draft"}
                            dot
                          >
                            {statusConfig[file.status]?.label || file.status}
                          </StatusBadge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(file.created_at), "PP")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => downloadEvidence.mutate(file.file_path)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() =>
                              setDeleteTarget({ id: file.id, filePath: file.file_path })
                            }
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
        </TabsContent>

        <TabsContent value="approval">
          <ApprovalQueue />
        </TabsContent>

        <TabsContent value="history">
          <ApprovalHistory />
        </TabsContent>

        <TabsContent value="ai-analysis" className="space-y-6">
          <DocumentIntelligencePanel />
        </TabsContent>
      </Tabs>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Evidence</DialogTitle>
            <DialogDescription>
              Add a new compliance document or evidence file
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* File Input */}
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
              />
              {selectedFile ? (
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-medium">{selectedFile.name}</span>
                  <span className="text-muted-foreground">
                    ({formatFileSize(selectedFile.size)})
                  </span>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to select a file or drag and drop
                  </p>
                </>
              )}
            </div>

            <div className="space-y-2">
              <Label>Display Name *</Label>
              <Input
                value={uploadForm.name}
                onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                placeholder="e.g., OpenAI Security Whitepaper"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={uploadForm.description}
                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                placeholder="Brief description of this evidence..."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Evidence Type</Label>
                <Select
                  value={uploadForm.evidence_type}
                  onValueChange={(v) => setUploadForm({ ...uploadForm, evidence_type: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {EVIDENCE_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Link to AI System</Label>
                <Select
                  value={uploadForm.ai_system_id || "__none__"}
                  onValueChange={(v) => setUploadForm({ ...uploadForm, ai_system_id: v === "__none__" ? "" : v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">None</SelectItem>
                    {systems.map((sys) => (
                      <SelectItem key={sys.id} value={sys.id}>
                        {sys.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Link to Vendor</Label>
              <Select
                value={uploadForm.vendor_id || "__none__"}
                onValueChange={(v) => setUploadForm({ ...uploadForm, vendor_id: v === "__none__" ? "" : v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Optional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">None</SelectItem>
                  {vendors.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !uploadForm.name || uploadEvidence.isPending}
            >
              {uploadEvidence.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Evidence?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the file from storage and remove its record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteEvidence.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
