import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackFAQExpand } from "@/lib/analytics";

export const LandingFAQ = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleValueChange = (value: string) => {
    if (value && !expandedItems.has(value)) {
      const faqIndex = parseInt(value.replace('faq-', ''));
      if (!isNaN(faqIndex) && faqs[faqIndex]) {
        trackFAQExpand(faqs[faqIndex].question);
        setExpandedItems((prev) => new Set(prev).add(value));
      }
    }
  };

  const faqs = [
    {
      question: "Do we need a lawyer to use Klarvo?",
      answer:
        "No. Klarvo provides guided workflows and generates documentation — it's not legal advice. The platform helps you build a defensible compliance record, but you should consult legal counsel for binding interpretations of the EU AI Act.",
    },
    {
      question: "Are we a 'provider' or 'deployer'?",
      answer:
        "If you build or sell AI systems, you're likely a provider. If you use AI tools (including vendor software), you're a deployer. Many companies are both. Klarvo supports all tracks — deployer, provider, importer, and distributor.",
    },
    {
      question: "How long does setup take?",
      answer:
        "You can add your first AI system in under 10 minutes with our guided intake wizard. A complete inventory with classifications typically takes 30–60 minutes per system, depending on complexity.",
    },
    {
      question: "What do I get after the first session?",
      answer:
        "A Classification Memo PDF, a list of auto-generated tasks with owners and due dates, evidence requests for your team, and a clear action plan for each AI system.",
    },
    {
      question: "Can I share exports with auditors or customers?",
      answer:
        "Yes. Klarvo generates audit-ready Evidence Packs (PDF + ZIP) and supports shareable auditor links with access controls. Enterprise plans include redaction tools for sensitive information.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Frequently asked questions
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3" onValueChange={handleValueChange}>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
