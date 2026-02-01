import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit2, FileText, CheckCircle2, Clock, File } from "lucide-react";
import { 
  useQMSDocuments, 
  useCreateQMSDocument, 
  useUpdateQMSDocument, 
  QMS_DOC_TYPES,
  type DocStatus
} from "@/hooks/useQMS";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface QMSLibraryProps {
  organizationId?: string;
}

const statusColors: Record<DocStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  in_review: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
};

const statusIcons: Record<DocStatus, React.ReactNode> = {
  draft: <File className="h-3 w-3" />,
  in_review: <Clock className="h-3 w-3" />,
  approved: <CheckCircle2 className="h-3 w-3" />,
};

export function QMSLibrary({ organizationId }: QMSLibraryProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any>(null);
  const { toast } = useToast();

  const { data: documents, isLoading } = useQMSDocuments();
  const createDoc = useCreateQMSDocument();
  const updateDoc = useUpdateQMSDocument();

  const [formData, setFormData] = useState({
    title: "",
    doc_type: "policy",
    version: "1.0",
    description: "",
    status: "draft" as DocStatus,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      doc_type: "policy",
      version: "1.0",
      description: "",
      status: "draft",
    });
    setEditingDoc(null);
  };

  const handleOpenDialog = (doc?: any) => {
    if (doc) {
      setEditingDoc(doc);
      setFormData({
        title: doc.title || "",
        doc_type: doc.doc_type || "policy",
        version: doc.version || "1.0",
        description: doc.description || "",
        status: doc.status || "draft",
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!organizationId) {
      toast({
        title: "Missing context",
        description: "Organization context required.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a document title.",
        variant: "destructive"
      });
      return;
    }

    if (editingDoc) {
      updateDoc.mutate({
        id: editingDoc.id,
        title: formData.title,
        doc_type: formData.doc_type,
        version: formData.version,
        description: formData.description,
        status: formData.status,
      }, {
        onSuccess: () => {
          setIsDialogOpen(false);
          resetForm();
        }
      });
    } else {
      createDoc.mutate({
        organization_id: organizationId,
        title: formData.title,
        doc_type: formData.doc_type,
        version: formData.version,
        description: formData.description,
      }, {
        onSuccess: () => {
          setIsDialogOpen(false);
          resetForm();
        }
      });
    }
  };

  const getDocTypeLabel = (type: string) => {
    return QMS_DOC_TYPES.find(t => t.value === type)?.label || type;
  };

  return (
    <Card className="rounded-xl">
      <CardHeader className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base sm:text-lg">QMS Document Library</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Quality Management System documentation under Article 17
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="h-10 w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-base sm:text-lg">{editingDoc ? "Edit Document" : "Add QMS Document"}</DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  Add a new document to your Quality Management System
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 sm:space-y-4 py-3 sm:py-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="title" className="text-xs sm:text-sm">Document Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., AI Quality Policy"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Document Type</Label>
                    <Select
                      value={formData.doc_type}
                      onValueChange={(value) => setFormData({ ...formData, doc_type: value })}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {QMS_DOC_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="version" className="text-xs sm:text-sm">Version</Label>
                    <Input
                      id="version"
                      placeholder="1.0"
                      value={formData.version}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="description" className="text-xs sm:text-sm">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the document..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[80px]"
                  />
                </div>
                {editingDoc && (
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: DocStatus) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="in_review">In Review</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="h-11 w-full sm:w-auto">Cancel</Button>
                <Button onClick={handleSubmit} className="h-11 w-full sm:w-auto">
                  {editingDoc ? "Update" : "Add Document"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
        ) : documents && documents.length > 0 ? (
          <>
            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3">
              {documents.map((doc: any) => (
                <div key={doc.id} className="border rounded-xl p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <p className="text-sm font-medium truncate">{doc.title}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(doc)}
                      className="h-8 w-8 shrink-0"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-xs">v{doc.version}</Badge>
                    <Badge className={statusColors[doc.status as DocStatus] || statusColors.draft}>
                      <span className="flex items-center gap-1">
                        {statusIcons[doc.status as DocStatus]}
                        {doc.status === 'in_review' ? 'Review' : doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {getDocTypeLabel(doc.doc_type)} • Updated {format(new Date(doc.updated_at), "MMM d")}
                  </p>
                </div>
              ))}
            </div>
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc: any) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {doc.title}
                        </div>
                      </TableCell>
                      <TableCell>{getDocTypeLabel(doc.doc_type)}</TableCell>
                      <TableCell>v{doc.version}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[doc.status as DocStatus] || statusColors.draft}>
                          <span className="flex items-center gap-1">
                            {statusIcons[doc.status as DocStatus]}
                            {doc.status === 'in_review' ? 'In Review' : doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(doc.updated_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(doc)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="text-center py-6 sm:py-8">
            <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <p className="text-sm text-muted-foreground">No QMS documents yet.</p>
            <p className="text-xs text-muted-foreground">
              Start building your Quality Management System documentation.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
