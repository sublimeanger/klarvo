import { useState, useMemo } from "react";
import { format } from "date-fns";
import {
  Activity,
  Download,
  Filter,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllAuditLogs, ActionType, EntityType, AuditLogEntry } from "@/hooks/useAuditLog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ACTION_TYPE_OPTIONS: { value: ActionType | "all"; label: string }[] = [
  { value: "all", label: "All Actions" },
  { value: "ai_system.created", label: "AI System Created" },
  { value: "ai_system.updated", label: "AI System Updated" },
  { value: "ai_system.deleted", label: "AI System Deleted" },
  { value: "classification.created", label: "Classification Created" },
  { value: "classification.updated", label: "Classification Updated" },
  { value: "control.status_changed", label: "Control Status Changed" },
  { value: "evidence.uploaded", label: "Evidence Uploaded" },
  { value: "evidence.linked", label: "Evidence Linked" },
  { value: "evidence.approved", label: "Evidence Approved" },
  { value: "task.created", label: "Task Created" },
  { value: "task.completed", label: "Task Completed" },
  { value: "incident.created", label: "Incident Created" },
  { value: "incident.resolved", label: "Incident Resolved" },
  { value: "vendor.created", label: "Vendor Added" },
  { value: "attestation.added", label: "Attestation Added" },
  { value: "fria.created", label: "FRIA Started" },
  { value: "fria.completed", label: "FRIA Completed" },
];

const ENTITY_TYPE_OPTIONS: { value: EntityType | "all"; label: string }[] = [
  { value: "all", label: "All Entities" },
  { value: "ai_system", label: "AI Systems" },
  { value: "classification", label: "Classifications" },
  { value: "control", label: "Controls" },
  { value: "evidence", label: "Evidence" },
  { value: "task", label: "Tasks" },
  { value: "incident", label: "Incidents" },
  { value: "vendor", label: "Vendors" },
  { value: "attestation", label: "Attestations" },
  { value: "fria", label: "FRIA" },
];

const PAGE_SIZE = 25;

export default function AuditLog() {
  const [page, setPage] = useState(0);
  const [actionFilter, setActionFilter] = useState<ActionType | "all">("all");
  const [entityFilter, setEntityFilter] = useState<EntityType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [isExporting, setIsExporting] = useState(false);

  // Fetch with larger page size for client-side filtering
  const { data, isLoading } = useAllAuditLogs(0, 1000);
  const allEntries = data?.data || [];

  // Apply filters client-side
  const filteredEntries = useMemo(() => {
    return allEntries.filter((entry) => {
      // Action type filter
      if (actionFilter !== "all" && entry.action_type !== actionFilter) {
        return false;
      }

      // Entity type filter
      if (entityFilter !== "all" && entry.entity_type !== entityFilter) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const userName = entry.user?.full_name?.toLowerCase() || "";
        const entityName = entry.entity_name?.toLowerCase() || "";
        const actionType = entry.action_type.toLowerCase();
        if (
          !userName.includes(query) &&
          !entityName.includes(query) &&
          !actionType.includes(query)
        ) {
          return false;
        }
      }

      // Date range filter
      const entryDate = new Date(entry.created_at);
      if (dateFrom && entryDate < dateFrom) {
        return false;
      }
      if (dateTo) {
        const endOfDay = new Date(dateTo);
        endOfDay.setHours(23, 59, 59, 999);
        if (entryDate > endOfDay) {
          return false;
        }
      }

      return true;
    });
  }, [allEntries, actionFilter, entityFilter, searchQuery, dateFrom, dateTo]);

  // Paginate filtered results
  const paginatedEntries = filteredEntries.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );
  const totalPages = Math.ceil(filteredEntries.length / PAGE_SIZE);

  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      const headers = [
        "Date",
        "Time",
        "User",
        "Action",
        "Entity Type",
        "Entity Name",
        "Details",
      ];
      const rows = filteredEntries.map((entry) => [
        format(new Date(entry.created_at), "yyyy-MM-dd"),
        format(new Date(entry.created_at), "HH:mm:ss"),
        entry.user?.full_name || "System",
        entry.action_type,
        entry.entity_type,
        entry.entity_name || "",
        entry.details ? JSON.stringify(entry.details) : "",
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `audit-log-${format(new Date(), "yyyy-MM-dd")}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Exported ${filteredEntries.length} records`);
    } catch (error) {
      toast.error("Failed to export audit log");
    } finally {
      setIsExporting(false);
    }
  };

  const clearFilters = () => {
    setActionFilter("all");
    setEntityFilter("all");
    setSearchQuery("");
    setDateFrom(undefined);
    setDateTo(undefined);
    setPage(0);
  };

  const hasActiveFilters =
    actionFilter !== "all" ||
    entityFilter !== "all" ||
    searchQuery !== "" ||
    dateFrom !== undefined ||
    dateTo !== undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Audit Log
          </h1>
          <p className="text-muted-foreground">
            Track all compliance actions across your organization
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleExportCSV}
          disabled={isExporting || filteredEntries.length === 0}
        >
          {isExporting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user, entity, or action..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(0);
                }}
                className="pl-9"
              />
            </div>

            {/* Action Type */}
            <Select
              value={actionFilter}
              onValueChange={(v) => {
                setActionFilter(v as ActionType | "all");
                setPage(0);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Action type" />
              </SelectTrigger>
              <SelectContent>
                {ACTION_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Entity Type */}
            <Select
              value={entityFilter}
              onValueChange={(v) => {
                setEntityFilter(v as EntityType | "all");
                setPage(0);
              }}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Entity type" />
              </SelectTrigger>
              <SelectContent>
                {ENTITY_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date From */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[140px] justify-start text-left font-normal",
                    !dateFrom && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "MMM d, yyyy") : "From"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={dateFrom}
                  onSelect={(d) => {
                    setDateFrom(d);
                    setPage(0);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Date To */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[140px] justify-start text-left font-normal",
                    !dateTo && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "MMM d, yyyy") : "To"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={dateTo}
                  onSelect={(d) => {
                    setDateTo(d);
                    setPage(0);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="mt-3 text-sm text-muted-foreground">
              Showing {filteredEntries.length} of {allEntries.length} records
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : paginatedEntries.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">No audit logs found</p>
              <p className="text-sm mt-1">
                {hasActiveFilters
                  ? "Try adjusting your filters"
                  : "Actions will appear here as you use the platform"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[160px]">Date & Time</TableHead>
                  <TableHead className="w-[150px]">User</TableHead>
                  <TableHead className="w-[180px]">Action</TableHead>
                  <TableHead className="w-[120px]">Entity Type</TableHead>
                  <TableHead>Entity Name</TableHead>
                  <TableHead className="w-[200px]">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-sm">
                      <div>{format(new Date(entry.created_at), "MMM d, yyyy")}</div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(entry.created_at), "HH:mm:ss")}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {entry.user?.full_name || "System"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {entry.action_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">
                      {entry.entity_type.replace("_", " ")}
                    </TableCell>
                    <TableCell className="truncate max-w-[200px]">
                      {entry.entity_name || "—"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {entry.details ? JSON.stringify(entry.details) : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground">
              Page {page + 1} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
