import { FileText, FolderArchive, ClipboardCheck } from "lucide-react";

export const ArtifactShowcase = () => {
  const artifacts = [
    {
      icon: FileText,
      title: "Classification Memo (PDF)",
      description: "4-page report with AI definition test, Article 5 screening, Annex III screening, transparency obligations, and reviewer sign-off.",
      highlights: ["Risk classification", "Regulatory basis", "Next actions"],
    },
    {
      icon: FolderArchive,
      title: "Evidence Pack (ZIP)",
      description: "Complete audit bundle with organized folders: executive summary, inventory, classification, transparency, deployer obligations, and evidence index.",
      highlights: ["PDF + raw evidence", "Folder structure", "Evidence index CSV"],
    },
    {
      icon: ClipboardCheck,
      title: "FRIA Report",
      description: "Article 27-compliant Fundamental Rights Impact Assessment with process description, affected groups, risk analysis, and mitigation measures.",
      highlights: ["Article 27 template", "Risk mitigation", "Approver sign-off"],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            See what you'll export
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Klarvo generates consultancy-grade compliance artifacts — not just dashboards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {artifacts.map((artifact, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <artifact.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {artifact.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {artifact.description}
              </p>
              <ul className="space-y-1.5">
                {artifact.highlights.map((highlight, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
