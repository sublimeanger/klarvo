import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2, Package } from "lucide-react";
import { AdCreative } from "@/components/ads/AdCreative";
import { 
  AdSize, 
  downloadAdAsPng, 
  downloadAllAdsAsZip,
  sizeConfigs 
} from "@/components/ads/AdDownloader";
import { toast } from "sonner";

const adSizes: AdSize[] = ["300x250", "336x280", "250x250", "300x300", "728x90", "320x50"];

const adLabels: Record<AdSize, string> = {
  "250x250": "Square (250×250)",
  "300x300": "Large Square (300×300)",
  "300x250": "Medium Rectangle (300×250)",
  "336x280": "Large Rectangle (336×280)",
  "728x90": "Leaderboard (728×90)",
  "320x50": "Mobile Leaderboard (320×50)",
};

export default function Creatives() {
  const adRefs = useRef<Map<AdSize, HTMLDivElement>>(new Map());
  const [downloadingSize, setDownloadingSize] = useState<AdSize | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);

  const setAdRef = (size: AdSize) => (el: HTMLDivElement | null) => {
    if (el) {
      adRefs.current.set(size, el);
    }
  };

  const handleDownloadSingle = async (size: AdSize) => {
    const element = adRefs.current.get(size);
    if (!element) return;

    setDownloadingSize(size);
    try {
      await downloadAdAsPng(element, size);
      toast.success(`Downloaded ${adLabels[size]}`);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download. Please try again.");
    } finally {
      setDownloadingSize(null);
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Google Ads Creative Assets
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Download professional display ad creatives for Google Ads campaigns. 
            Available in all standard IAB sizes.
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
            Download All as ZIP
          </Button>
        </div>

        {/* Ad Grid */}
        <div className="grid gap-8">
          {/* Rectangle Ads Row */}
          <div className="grid md:grid-cols-2 gap-8">
            {(["300x250", "336x280"] as AdSize[]).map((size) => (
              <Card key={size} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {adLabels[size]}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadSingle(size)}
                      disabled={downloadingSize === size}
                    >
                      {downloadingSize === size ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center pb-6">
                  <AdCreative ref={setAdRef(size)} size={size} variant="dark" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Square Ads Row */}
          <div className="grid md:grid-cols-2 gap-8">
            {(["250x250", "300x300"] as AdSize[]).map((size) => (
              <Card key={size} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {adLabels[size]}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadSingle(size)}
                      disabled={downloadingSize === size}
                    >
                      {downloadingSize === size ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center pb-6">
                  <AdCreative ref={setAdRef(size)} size={size} variant="dark" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Leaderboard Ad */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                {adLabels["728x90"]}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownloadSingle("728x90")}
                  disabled={downloadingSize === "728x90"}
                >
                  {downloadingSize === "728x90" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center pb-6 overflow-x-auto">
              <AdCreative ref={setAdRef("728x90")} size="728x90" variant="dark" />
            </CardContent>
          </Card>

          {/* Mobile Leaderboard Ad */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                {adLabels["320x50"]}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownloadSingle("320x50")}
                  disabled={downloadingSize === "320x50"}
                >
                  {downloadingSize === "320x50" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <AdCreative ref={setAdRef("320x50")} size="320x50" variant="dark" />
            </CardContent>
          </Card>
        </div>

        {/* Usage Notes */}
        <div className="mt-12 p-6 bg-white rounded-lg border">
          <h2 className="font-semibold text-gray-900 mb-3">Usage Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
            <li>Click "Download All as ZIP" for a bundle of all sizes, or download individually</li>
            <li>Upload to Google Ads as responsive display ad assets</li>
            <li>Use 300×250 (Medium Rectangle) as your primary size - it has the widest reach</li>
            <li>Include both square and rectangular formats for maximum coverage</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
