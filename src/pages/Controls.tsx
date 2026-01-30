import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Loader2,
  Search,
  FileCheck,
  Users,
  Eye,
  Database,
  BookOpen,
  Activity,
  Building2,
  Filter,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useControlsByCategory, type Control } from "@/hooks/useControls";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "Governance", label: "Governance" },
  { value: "Classification", label: "Classification" },
  { value: "Transparency", label: "Transparency" },
  { value: "Deployer Obligations", label: "Deployer Obligations" },
  { value: "Record-keeping", label: "Record-keeping" },
  { value: "Data Governance", label: "Data Governance" },
  { value: "Vendor Management", label: "Vendor Management" },
  { value: "AI Literacy", label: "AI Literacy" },
  { value: "Monitoring", label: "Monitoring" },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Governance: <Shield className="h-5 w-5" />,
  Classification: <FileCheck className="h-5 w-5" />,
  Transparency: <Eye className="h-5 w-5" />,
  "Deployer Obligations": <Users className="h-5 w-5" />,
  "Record-keeping": <Database className="h-5 w-5" />,
  "Data Governance": <Database className="h-5 w-5" />,
  "Vendor Management": <Building2 className="h-5 w-5" />,
  "AI Literacy": <BookOpen className="h-5 w-5" />,
  Monitoring: <Activity className="h-5 w-5" />,
};

function getAppliesLabel(appliesTo: string[]) {
  if (appliesTo.includes("all")) return "All Systems";
  const labels = [];
  if (appliesTo.includes("high_risk")) labels.push("High-Risk");
  if (appliesTo.includes("limited_risk")) labels.push("Limited Risk");
  if (appliesTo.includes("vendor_based")) labels.push("Vendor-Based");
  return labels.join(", ") || "Specific";
}

function ControlRow({ control }: { control: Control }) {
  return (
    <TableRow>
      <TableCell>
        <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
          {control.code}
        </code>
      </TableCell>
      <TableCell>
        <div>
          <p className="font-medium">{control.name}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {control.description}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{getAppliesLabel(control.applies_to)}</Badge>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {control.evidence_requirements || "—"}
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {control.review_frequency || "—"}
      </TableCell>
      <TableCell className="text-sm">
        {control.article_reference ? (
          <Badge variant="secondary">{control.article_reference}</Badge>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
    </TableRow>
  );
}

export default function Controls() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: grouped, controls, isLoading } = useControlsByCategory();

  const filteredControls = controls?.filter((control) => {
    const matchesSearch =
      search === "" ||
      control.code.toLowerCase().includes(search.toLowerCase()) ||
      control.name.toLowerCase().includes(search.toLowerCase()) ||
      control.description?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || control.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const filteredGrouped = filteredControls?.reduce((acc, control) => {
    if (!acc[control.category]) {
      acc[control.category] = [];
    }
    acc[control.category].push(control);
    return acc;
  }, {} as Record<string, Control[]>);

  // Stats
  const stats = {
    total: controls?.length || 0,
    categories: grouped ? Object.keys(grouped).length : 0,
    highRisk: controls?.filter((c) => c.applies_to.includes("high_risk")).length || 0,
    allSystems: controls?.filter((c) => c.applies_to.includes("all")).length || 0,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Control Library</h1>
          <p className="text-sm text-muted-foreground">
            EU AI Act compliance controls
          </p>
        </div>
        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
          <Link to="/ai-systems">
            <FileCheck className="h-4 w-4 mr-2" />
            View AI Systems
          </Link>
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total</CardTitle>
            <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{stats.total}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {stats.categories} categories
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Universal</CardTitle>
            <FileCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{stats.allSystems}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">All systems</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">High-Risk</CardTitle>
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-warning" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{stats.highRisk}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              High-risk only
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Categories</CardTitle>
            <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:pt-0">
            <div className="text-lg sm:text-2xl font-bold">{stats.categories}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>All Controls</CardTitle>
              <CardDescription>
                Browse and understand EU AI Act compliance requirements
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search controls..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredGrouped && Object.keys(filteredGrouped).length > 0 ? (
            <Accordion type="multiple" defaultValue={Object.keys(filteredGrouped)} className="space-y-2">
              {Object.entries(filteredGrouped).map(([category, categoryControls]) => (
                <AccordionItem key={category} value={category} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {CATEGORY_ICONS[category] || <Shield className="h-5 w-5" />}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">{category}</p>
                        <p className="text-sm text-muted-foreground font-normal">
                          {categoryControls.length} control{categoryControls.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-24">Code</TableHead>
                          <TableHead>Control</TableHead>
                          <TableHead className="w-32">Applies To</TableHead>
                          <TableHead>Evidence Required</TableHead>
                          <TableHead className="w-28">Review</TableHead>
                          <TableHead className="w-28">Reference</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categoryControls.map((control) => (
                          <ControlRow key={control.id} control={control} />
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No controls found</h3>
              <p className="text-muted-foreground">
                {search || categoryFilter !== "all"
                  ? "Try adjusting your search or filter"
                  : "Control library is empty"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How Controls Work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <ChevronRight className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Classification Triggers Controls</p>
                <p className="text-sm text-muted-foreground">
                  When you classify an AI system, applicable controls are automatically assigned based on risk level.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <FileCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Track Implementation</p>
                <p className="text-sm text-muted-foreground">
                  Mark controls as implemented, attach evidence, and track review dates per AI system.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <ExternalLink className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Export for Audits</p>
                <p className="text-sm text-muted-foreground">
                  Control status is included in evidence packs for audit-ready documentation.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
