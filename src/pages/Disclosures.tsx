import { DisclosureSnippetLibrary } from "@/components/disclosures/DisclosureSnippetLibrary";

export default function Disclosures() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Article 50 Disclosures</h1>
        <p className="text-muted-foreground">
          Ready-to-use transparency notice snippets for EU AI Act compliance
        </p>
      </div>

      <DisclosureSnippetLibrary />
    </div>
  );
}
