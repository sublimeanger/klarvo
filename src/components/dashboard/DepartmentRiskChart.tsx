import { useNavigate } from "react-router-dom";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2 } from "lucide-react";
import { useDepartmentDistribution } from "@/hooks/useComplianceTrends";

export function DepartmentRiskChart() {
  const { data: distribution, isLoading } = useDepartmentDistribution();
  const navigate = useNavigate();

  const handleBarClick = (data: { department: string }) => {
    if (data.department) {
      navigate(`/ai-systems?department=${encodeURIComponent(data.department)}`);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Risk by Department
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!distribution || distribution.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Risk by Department
          </CardTitle>
          <CardDescription>AI system risk levels across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
            <p className="text-sm">Assign departments to AI systems to see breakdown</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Take top 6 departments
  const chartData = distribution.slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Risk by Department
        </CardTitle>
        <CardDescription>AI system risk levels across departments • Click to filter</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              layout="vertical" 
              margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
              onClick={(data) => data?.activePayload?.[0]?.payload && handleBarClick(data.activePayload[0].payload)}
              style={{ cursor: "pointer" }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <YAxis 
                dataKey="department" 
                type="category"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const total = data.highRisk + data.limitedRisk + data.minimalRisk + data.notClassified;
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-sm">
                        <p className="font-medium mb-2">{label}</p>
                        <p className="text-sm text-muted-foreground mb-1">{total} total systems</p>
                        {data.highRisk > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-2 w-2 rounded-full bg-destructive" />
                            <span>High Risk: {data.highRisk}</span>
                          </div>
                        )}
                        {data.limitedRisk > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "hsl(var(--warning))" }} />
                            <span>Limited Risk: {data.limitedRisk}</span>
                          </div>
                        )}
                        {data.minimalRisk > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "hsl(var(--success))" }} />
                            <span>Minimal Risk: {data.minimalRisk}</span>
                          </div>
                        )}
                        {data.notClassified > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                            <span>Not Classified: {data.notClassified}</span>
                          </div>
                        )}
                        <p className="text-xs text-primary mt-2">Click to view department</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: 10 }}
              />
              <Bar 
                dataKey="highRisk" 
                name="High Risk"
                stackId="a" 
                fill="hsl(var(--destructive))" 
                radius={[0, 0, 0, 0]}
              />
              <Bar 
                dataKey="limitedRisk" 
                name="Limited Risk"
                stackId="a" 
                fill="hsl(var(--warning))" 
              />
              <Bar 
                dataKey="minimalRisk" 
                name="Minimal Risk"
                stackId="a" 
                fill="hsl(var(--success))" 
              />
              <Bar 
                dataKey="notClassified" 
                name="Not Classified"
                stackId="a" 
                fill="hsl(var(--muted-foreground) / 0.3)" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
