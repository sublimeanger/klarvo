import { Check, X } from "lucide-react";

export const ComparisonTable = () => {
  const comparisons = [
    {
      feature: "Risk classification",
      spreadsheet: "Manual, error-prone",
      klarvo: "Automated with rationale",
    },
    {
      feature: "Evidence storage",
      spreadsheet: "Scattered files",
      klarvo: "Linked, versioned vault",
    },
    {
      feature: "Audit exports",
      spreadsheet: "Copy-paste chaos",
      klarvo: "One-click PDF/ZIP packs",
    },
    {
      feature: "Deadline tracking",
      spreadsheet: "No reminders",
      klarvo: "Expiry alerts + tasks",
    },
    {
      feature: "Obligation mapping",
      spreadsheet: "Manual lookup",
      klarvo: "Auto-generated checklists",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Why not spreadsheets?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Generic tools weren't built for EU AI Act compliance.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 mb-4 px-4">
            <div className="text-sm font-medium text-muted-foreground">Feature</div>
            <div className="text-sm font-medium text-muted-foreground text-center">Spreadsheet</div>
            <div className="text-sm font-medium text-primary text-center">Klarvo</div>
          </div>

          {/* Rows */}
          <div className="space-y-2">
            {comparisons.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 items-center bg-card rounded-lg border border-border p-4"
              >
                <div className="text-sm font-medium text-foreground">{row.feature}</div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <X className="h-4 w-4 text-destructive/70" />
                    <span className="hidden sm:inline">{row.spreadsheet}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-success" />
                    <span className="hidden sm:inline">{row.klarvo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
