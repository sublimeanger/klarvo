import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2, Package } from "lucide-react";
import { AdCreative, AdSize, AdVariant } from "@/components/ads/AdCreative";
import { downloadAdAsPng, downloadAllAdsAsZip } from "@/components/ads/AdDownloader";
import { toast } from "sonner";

// 1.91:1 horizontal variants (5 different messages)
const horizontalVariants: { size: AdSize; variant: AdVariant; label: string }[] = [
  { size: "1200x628", variant: "main", label: "Main Message (1200×628)" },
  { size: "1200x628", variant: "inventory", label: "Inventory Focus (1200×628)" },
  { size: "1200x628", variant: "speed", label: "Speed Focus (1200×628)" },
  { size: "1200x628", variant: "evidence", label: "Evidence Focus (1200×628)" },
  { size: "1200x628", variant: "risk", label: "Risk Classification (1200×628)" },
];

// 1:1 square variants (8 different messages)  
const squareVariants: { size: AdSize; variant: AdVariant; label: string }[] = [
  { size: "1200x1200", variant: "main", label: "Main Message (1200×1200)" },
  { size: "1200x1200", variant: "inventory", label: "Inventory Focus (1200×1200)" },
  { size: "1200x1200", variant: "speed", label: "Speed Focus (1200×1200)" },
  { size: "1200x1200", variant: "evidence", label: "Evidence Focus (1200×1200)" },
  { size: "1200x1200", variant: "risk", label: "Risk Classification (1200×1200)" },
  { size: "1200x1200", variant: "deployer", label: "Deployer Obligations (1200×1200)" },
  { size: "1200x1200", variant: "fria", label: "FRIA Focus (1200×1200)" },
  { size: "1200x1200", variant: "transparency", label: "Transparency (1200×1200)" },
];

// Standard IAB sizes
const standardSizes: { size: AdSize; variant: AdVariant; label: string }[] = [
  { size: "300x250", variant: "main", label: "Medium Rectangle (300×250)" },
  { size: "336x280", variant: "main", label: "Large Rectangle (336×280)" },
  { size: "250x250", variant: "main", label: "Square (250×250)" },
  { size: "300x300", variant: "main", label: "Large Square (300×300)" },
  { size: "728x90", variant: "main", label: "Leaderboard (728×90)" },
  { size: "320x50", variant: "main", label: "Mobile Leaderboard (320×50)" },
];

export default function Creatives() {
  const adRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);

  const getAdKey = (size: AdSize, variant: AdVariant) => `${size}-${variant}`;

  const setAdRef = (size: AdSize, variant: AdVariant) => (el: HTMLDivElement | null) => {
    const key = getAdKey(size, variant);
    if (el) {
      adRefs.current.set(key, el);
    }
  };

  const handleDownloadSingle = async (size: AdSize, variant: AdVariant, label: string) => {
    const key = getAdKey(size, variant);
    const element = adRefs.current.get(key);
    if (!element) return;

    setDownloadingId(key);
    try {
      await downloadAdAsPng(element, `klarvo-ad-${size}-${variant}`);
      toast.success(`Downloaded ${label}`);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadAll = async () => {
    setDownloadingAll(true);
    try {
      await downloadAllAdsAsZip(adRefs.current);
      toast.success("Downloaded all ads as ZIP!");
    } catch (error) {
      console.error("ZIP download failed:", error);
      toast.error("Failed to create ZIP. Please try again.");
    } finally {
      setDownloadingAll(false);
    }
  };

  const renderAdCard = (
    { size, variant, label }: { size: AdSize; variant: AdVariant; label: string },
    showPreview: boolean = true
  ) => {
    const key = getAdKey(size, variant);
    const isDownloading = downloadingId === key;

    return (
      <Card key={key} className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="truncate">{label}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDownloadSingle(size, variant, label)}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center pb-6 overflow-auto">
          {showPreview ? (
            <div style={{ transform: size.startsWith("1200") ? "scale(0.25)" : "scale(1)", transformOrigin: "top center" }}>
              <AdCreative ref={setAdRef(size, variant)} size={size} variant={variant} theme="dark" />
            </div>
          ) : (
            <AdCreative ref={setAdRef(size, variant)} size={size} variant={variant} theme="dark" />
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Google Ads Creative Assets
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Download professional display ad creatives for Google Ads campaigns. 
            Multiple sizes and messaging variants included.
          </p>
          <Button
            size="lg"
            className="mt-6 bg-emerald-600 hover:bg-emerald-700"
            onClick={handleDownloadAll}
            disabled={downloadingAll}
          >
            {downloadingAll ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Package className="mr-2 h-4 w-4" />
            )}
            Download All ({horizontalVariants.length + squareVariants.length + standardSizes.length} ads)
          </Button>
        </div>

        {/* Horizontal 1.91:1 Ads */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm">1.91:1</span>
            Horizontal Ads ({horizontalVariants.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {horizontalVariants.map((ad) => renderAdCard(ad, true))}
          </div>
        </section>

        {/* Square 1:1 Ads */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm">1:1</span>
            Square Ads ({squareVariants.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {squareVariants.map((ad) => renderAdCard(ad, true))}
          </div>
        </section>

        {/* Standard IAB Sizes */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">IAB</span>
            Standard Sizes ({standardSizes.length})
          </h2>
          
          {/* Rectangle Ads */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {standardSizes.slice(0, 2).map((ad) => renderAdCard(ad, false))}
          </div>

          {/* Small Square Ads */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {standardSizes.slice(2, 4).map((ad) => renderAdCard(ad, false))}
          </div>

          {/* Leaderboard */}
          <div className="grid gap-6 mb-6">
            {renderAdCard(standardSizes[4], false)}
          </div>

          {/* Mobile Leaderboard */}
          <div className="grid md:grid-cols-2 gap-6">
            {renderAdCard(standardSizes[5], false)}
          </div>
        </section>

        {/* Usage Notes */}
        <div className="p-6 bg-white rounded-lg border">
          <h2 className="font-semibold text-gray-900 mb-3">Usage Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
            <li>Click "Download All" for a complete bundle, or download individual ads</li>
            <li>For Google Responsive Display Ads, upload the 1.91:1 horizontal and 1:1 square images</li>
            <li>Use different message variants for A/B testing ad performance</li>
            <li>The 300×250 Medium Rectangle has the widest ad network reach</li>
            <li>All images are exported at 2x resolution for crisp display on retina screens</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
