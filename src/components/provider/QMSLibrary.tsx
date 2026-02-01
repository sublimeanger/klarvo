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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">QMS Document Library</CardTitle>
            <CardDescription>
              Quality Management System documentation under Article 17
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingDoc ? "Edit Document" : "Add QMS Document"}</DialogTitle>
                <DialogDescription>
                  Add a new document to your Quality Management System
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Document Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., AI Quality Policy"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Document Type</Label>
                    <Select
                      value={formData.doc_type}
                      onValueChange={(value) => setFormData({ ...formData, doc_type: value })}
                    >
                      <SelectTrigger>
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
                  <div className="space-y-2">
                    <Label htmlFor="version">Version</Label>
                    <Input
                      id="version"
                      placeholder="1.0"
                      value={formData.version}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the document..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                {editingDoc && (
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: DocStatus) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
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
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>
                  {editingDoc ? "Update" : "Add Document"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
        ) : documents && documents.length > 0 ? (
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
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No QMS documents yet.</p>
            <p className="text-sm text-muted-foreground">
              Start building your Quality Management System documentation.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
