import JSZip from "jszip";

export type AdSize = 
  | "250x250" | "300x300" | "300x250" | "336x280" | "728x90" | "320x50"
  | "1200x628" | "600x314" | "1200x1200" | "600x600";

export type AdVariant = 
  | "main" | "inventory" | "speed" | "evidence" | "risk" 
  | "deployer" | "fria" | "transparency";

const sizeConfigs: Record<AdSize, { width: number; height: number }> = {
  "250x250": { width: 250, height: 250 },
  "300x300": { width: 300, height: 300 },
  "300x250": { width: 300, height: 250 },
  "336x280": { width: 336, height: 280 },
  "728x90": { width: 728, height: 90 },
  "320x50": { width: 320, height: 50 },
  "1200x628": { width: 1200, height: 628 },
  "600x314": { width: 600, height: 314 },
  "1200x1200": { width: 1200, height: 1200 },
  "600x600": { width: 600, height: 600 },
};

/**
 * Converts an HTML element to a PNG blob using Canvas
 */
export async function elementToPng(element: HTMLElement): Promise<Blob> {
  const { toPng } = await import("html-to-image");
  
  const dataUrl = await toPng(element, {
    quality: 1,
    pixelRatio: 2,
    cacheBust: true,
  });
  
  const response = await fetch(dataUrl);
  return response.blob();
}

/**
 * Downloads a single ad as PNG
 */
export async function downloadAdAsPng(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const blob = await elementToPng(element);
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Downloads all ads as a ZIP file
 */
export async function downloadAllAdsAsZip(
  elements: Map<string, HTMLElement>
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder("klarvo-google-ads");
  
  if (!folder) throw new Error("Failed to create ZIP folder");
  
  const promises = Array.from(elements.entries()).map(async ([filename, element]) => {
    const blob = await elementToPng(element);
    folder.file(`${filename}.png`, blob);
  });
  
  await Promise.all(promises);
  
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
