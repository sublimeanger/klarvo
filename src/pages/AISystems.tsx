import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Cpu,
  Building2,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

// Demo data - 5 sample AI systems
const demoSystems = [
  {
    id: "1",
    name: "ChatGPT for Customer Support",
    vendor: "OpenAI",
    department: "Customer Service",
    riskLevel: "minimal",
    status: "classified",
    completeness: 85,
    transparencyObligations: true,
  },
  {
    id: "2",
    name: "CV Screening Assistant",
    vendor: "Internal",
    department: "Human Resources",
    riskLevel: "high",
    status: "classified",
    completeness: 72,
    transparencyObligations: true,
  },
  {
    id: "3",
    name: "Marketing Content Generator",
    vendor: "Jasper AI",
    department: "Marketing",
    riskLevel: "limited",
    status: "classified",
    completeness: 60,
    transparencyObligations: true,
  },
  {
    id: "4",
    name: "Fraud Detection Model",
    vendor: "Internal",
    department: "Finance",
    riskLevel: "high",
    status: "classified",
    completeness: 45,
    transparencyObligations: false,
  },
  {
    id: "5",
    name: "Employee Productivity Analytics",
    vendor: "Microsoft",
    department: "Operations",
    riskLevel: null,
    status: "pending",
    completeness: 20,
    transparencyObligations: true,
  },
];

const riskLevelConfig = {
  prohibited: { label: "Prohibited", variant: "prohibited" as const },
  high: { label: "High-Risk", variant: "high" as const },
  limited: { label: "Limited Risk", variant: "limited" as const },
  minimal: { label: "Minimal Risk", variant: "minimal" as const },
};

export default function AISystems() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSystems = demoSystems.filter(system =>
    system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Systems</h1>
          <p className="text-muted-foreground">
            Inventory and manage your AI systems
          </p>
        </div>
        <Button asChild>
          <Link to="/ai-systems/new">
            <Plus className="mr-2 h-4 w-4" />
            Add AI System
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search systems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline" size="sm">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Cpu className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{demoSystems.length}</p>
              <p className="text-sm text-muted-foreground">Total Systems</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-risk-high/10 p-2">
              <AlertTriangle className="h-4 w-4 text-risk-high" />
            </div>
            <div>
              <p className="text-2xl font-semibold">
                {demoSystems.filter(s => s.riskLevel === "high").length}
              </p>
              <p className="text-sm text-muted-foreground">High-Risk</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/10 p-2">
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-2xl font-semibold">
                {demoSystems.filter(s => s.status === "classified").length}
              </p>
              <p className="text-sm text-muted-foreground">Classified</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/10 p-2">
              <HelpCircle className="h-4 w-4 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-semibold">
                {demoSystems.filter(s => s.status === "pending").length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>System Name</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Completeness</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSystems.map((system) => (
              <TableRow key={system.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <Link 
                    to={`/ai-systems/${system.id}`}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Cpu className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{system.name}</p>
                      {system.transparencyObligations && (
                        <p className="text-xs text-muted-foreground">
                          Transparency obligations apply
                        </p>
                      )}
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {system.vendor}
                  </div>
                </TableCell>
                <TableCell>{system.department}</TableCell>
                <TableCell>
                  {system.riskLevel ? (
                    <StatusBadge 
                      variant={riskLevelConfig[system.riskLevel].variant} 
                      dot
                    >
                      {riskLevelConfig[system.riskLevel].label}
                    </StatusBadge>
                  ) : (
                    <StatusBadge variant="draft" dot>
                      Not Classified
                    </StatusBadge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Progress value={system.completeness} className="h-2 w-20" />
                    <span className="text-sm text-muted-foreground">
                      {system.completeness}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge
                    variant={system.status === "classified" ? "success" : "pending"}
                    dot
                  >
                    {system.status === "classified" ? "Classified" : "Pending"}
                  </StatusBadge>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit System</DropdownMenuItem>
                      <DropdownMenuItem>Start Classification</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Delete System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
