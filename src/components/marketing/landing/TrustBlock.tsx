import { Shield, FileSearch, Bot, Globe } from "lucide-react";

export const TrustBlock = () => {
  const trustPoints = [
    {
      icon: Shield,
      title: "Encryption at rest + in transit",
      description: "Your compliance data is protected with industry-standard encryption.",
    },
    {
      icon: FileSearch,
      title: "Audit logs for all actions",
      description: "Complete traceability for every classification, upload, and export.",
    },
    {
      icon: Bot,
      title: "AI-powered guidance, not legal advice",
      description: "Smart workflows and suggestions — you stay in control of decisions.",
    },
    {
      icon: Globe,
      title: "EU data residency (Enterprise)",
      description: "Keep your compliance data within EU borders when required.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Why trust Klarvo
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Built for compliance teams who need defensible documentation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {trustPoints.map((point, index) => (
            <div key={index} className="text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <point.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{point.title}</h3>
              <p className="text-sm text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
