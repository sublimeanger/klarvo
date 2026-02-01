import { useState } from "react";
import { Copy, Check, Eye, FileText, Bot, Image, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface DisclosureSnippet {
  id: string;
  title: string;
  category: "interaction" | "synthetic" | "deepfake" | "emotion" | "public_text";
  description: string;
  snippet: string;
  variant: "formal" | "friendly" | "minimal";
  article: string;
}

const disclosureSnippets: DisclosureSnippet[] = [
  // AI Interaction Disclosures (Article 50.1)
  {
    id: "interaction-formal",
    title: "AI System Interaction Notice (Formal)",
    category: "interaction",
    description: "Formal notice for professional/enterprise contexts",
    snippet: "You are interacting with an artificial intelligence system. This AI system is designed to assist with [PURPOSE]. A human representative is available upon request.",
    variant: "formal",
    article: "Article 50.1",
  },
  {
    id: "interaction-friendly",
    title: "AI System Interaction Notice (Friendly)",
    category: "interaction",
    description: "Conversational tone for consumer-facing products",
    snippet: "Hi! I'm an AI assistant here to help you with [PURPOSE]. While I'm not a human, I'll do my best to assist you. Need to speak with a person? Just let me know!",
    variant: "friendly",
    article: "Article 50.1",
  },
  {
    id: "interaction-minimal",
    title: "AI System Interaction Notice (Minimal)",
    category: "interaction",
    description: "Compact notice for space-constrained interfaces",
    snippet: "🤖 AI-powered assistant",
    variant: "minimal",
    article: "Article 50.1",
  },
  // Synthetic Content Disclosures (Article 50.2)
  {
    id: "synthetic-formal",
    title: "AI-Generated Content Notice (Formal)",
    category: "synthetic",
    description: "For AI-generated images, audio, or video",
    snippet: "This [image/audio/video] was generated using artificial intelligence technology. It does not depict real events, persons, or places unless explicitly stated.",
    variant: "formal",
    article: "Article 50.2",
  },
  {
    id: "synthetic-friendly",
    title: "AI-Generated Content Notice (Friendly)",
    category: "synthetic",
    description: "Casual tone for social/creative contexts",
    snippet: "✨ Made with AI — This content was created using artificial intelligence.",
    variant: "friendly",
    article: "Article 50.2",
  },
  {
    id: "synthetic-minimal",
    title: "AI-Generated Content Notice (Minimal)",
    category: "synthetic",
    description: "Badge or watermark text",
    snippet: "AI-Generated",
    variant: "minimal",
    article: "Article 50.2",
  },
  // Deepfake Disclosures (Article 50.4)
  {
    id: "deepfake-formal",
    title: "Deepfake/Manipulated Media Notice (Formal)",
    category: "deepfake",
    description: "For content depicting real people or manipulated real footage",
    snippet: "This content has been artificially generated or manipulated using AI technology. It depicts [simulated/altered] representations and should not be considered authentic documentation of real events.",
    variant: "formal",
    article: "Article 50.4",
  },
  {
    id: "deepfake-friendly",
    title: "Deepfake/Manipulated Media Notice (Friendly)",
    category: "deepfake",
    description: "For creative or entertainment contexts",
    snippet: "🎭 AI-Enhanced Content — This video/image uses AI to modify or simulate appearances. It's not a real recording of the depicted events.",
    variant: "friendly",
    article: "Article 50.4",
  },
  // Emotion Recognition Disclosures (Article 50.3)
  {
    id: "emotion-formal",
    title: "Emotion Recognition Notice (Formal)",
    category: "emotion",
    description: "For systems inferring emotional states",
    snippet: "This system uses artificial intelligence to analyse emotional indicators. By proceeding, you acknowledge that the system may process biometric data to infer emotional states. You may opt out at any time.",
    variant: "formal",
    article: "Article 50.3",
  },
  {
    id: "emotion-minimal",
    title: "Emotion Recognition Notice (Minimal)",
    category: "emotion",
    description: "Brief indicator for emotion-aware features",
    snippet: "This feature uses AI to understand emotional context.",
    variant: "minimal",
    article: "Article 50.3",
  },
  // Public Interest Text Disclosures (Article 50.4)
  {
    id: "public-text-formal",
    title: "AI-Generated Text Notice (Public Interest)",
    category: "public_text",
    description: "For AI-generated news or public interest content",
    snippet: "This article was generated with the assistance of artificial intelligence. All facts have been verified by our editorial team. [Publication Name] maintains editorial responsibility for this content.",
    variant: "formal",
    article: "Article 50.4",
  },
  {
    id: "public-text-minimal",
    title: "AI-Generated Text Notice (Minimal)",
    category: "public_text",
    description: "Compact disclosure for published text",
    snippet: "AI-assisted content • Editorially reviewed",
    variant: "minimal",
    article: "Article 50.4",
  },
];

const categoryInfo = {
  interaction: { icon: Bot, label: "AI Interaction", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  synthetic: { icon: Image, label: "Synthetic Content", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
  deepfake: { icon: Eye, label: "Deepfake/Manipulated", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  emotion: { icon: Sparkles, label: "Emotion Recognition", color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200" },
  public_text: { icon: FileText, label: "Public Interest Text", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" },
};

function SnippetCard({ snippet }: { snippet: DisclosureSnippet }) {
  const [copied, setCopied] = useState(false);
  const CategoryIcon = categoryInfo[snippet.category].icon;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.snippet);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <CategoryIcon className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">{snippet.title}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs shrink-0">
            {snippet.article}
          </Badge>
        </div>
        <CardDescription>{snippet.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg bg-muted p-3 text-sm font-mono">
          {snippet.snippet}
        </div>
        <div className="flex items-center justify-between">
          <Badge className={categoryInfo[snippet.category].color}>
            {snippet.variant}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function DisclosureSnippetLibrary() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Disclosure Snippet Library</h2>
        <p className="text-muted-foreground mt-1">
          Ready-to-use Article 50 transparency notices. Copy, customize, and implement.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="all">All Snippets</TabsTrigger>
          <TabsTrigger value="interaction" className="gap-1">
            <Bot className="h-3 w-3" /> Interaction
          </TabsTrigger>
          <TabsTrigger value="synthetic" className="gap-1">
            <Image className="h-3 w-3" /> Synthetic
          </TabsTrigger>
          <TabsTrigger value="deepfake" className="gap-1">
            <Eye className="h-3 w-3" /> Deepfake
          </TabsTrigger>
          <TabsTrigger value="emotion" className="gap-1">
            <Sparkles className="h-3 w-3" /> Emotion
          </TabsTrigger>
          <TabsTrigger value="public_text" className="gap-1">
            <FileText className="h-3 w-3" /> Public Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {disclosureSnippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </TabsContent>

        {(["interaction", "synthetic", "deepfake", "emotion", "public_text"] as const).map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {disclosureSnippets
                .filter((s) => s.category === category)
                .map((snippet) => (
                  <SnippetCard key={snippet.id} snippet={snippet} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
