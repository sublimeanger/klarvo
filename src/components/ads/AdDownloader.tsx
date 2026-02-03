import JSZip from "jszip";

export type AdSize = "250x250" | "300x300" | "300x250" | "336x280" | "728x90" | "320x50";

const sizeConfigs: Record<AdSize, { width: number; height: number }> = {
  "250x250": { width: 250, height: 250 },
  "300x300": { width: 300, height: 300 },
  "300x250": { width: 300, height: 250 },
  "336x280": { width: 336, height: 280 },
  "728x90": { width: 728, height: 90 },
  "320x50": { width: 320, height: 50 },
};

/**
 * Converts an HTML element to a PNG blob using Canvas
 */
export async function elementToPng(element: HTMLElement): Promise<Blob> {
  // Dynamically import html-to-image to keep bundle size small
  const { toPng } = await import("html-to-image");
  
  const dataUrl = await toPng(element, {
    quality: 1,
    pixelRatio: 2, // Higher resolution for crisp ads
    cacheBust: true,
  });
  
  // Convert data URL to Blob
  const response = await fetch(dataUrl);
  return response.blob();
}

/**
 * Downloads a single ad as PNG
 */
export async function downloadAdAsPng(
  element: HTMLElement,
  size: AdSize
): Promise<void> {
  const blob = await elementToPng(element);
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = `klarvo-ad-${size}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Downloads all ads as a ZIP file
 */
export async function downloadAllAdsAsZip(
  elements: Map<AdSize, HTMLElement>
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder("klarvo-google-ads");
  
  if (!folder) throw new Error("Failed to create ZIP folder");
  
  // Generate all PNGs in parallel
  const promises = Array.from(elements.entries()).map(async ([size, element]) => {
    const blob = await elementToPng(element);
    folder.file(`klarvo-ad-${size}.png`, blob);
  });
  
  await Promise.all(promises);
  
  // Generate and download ZIP
  const zipBlob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(zipBlob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "klarvo-google-ads.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

export { sizeConfigs };
