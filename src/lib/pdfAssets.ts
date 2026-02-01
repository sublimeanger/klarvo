/**
 * PDF Assets for React-PDF
 * Contains bundled images for reliable embedding in PDF documents
 * 
 * IMPORTANT: We use direct imports (ES6 modules) so Vite bundles the images
 * as data URLs or hashed paths that react-pdf can render reliably.
 * External URLs fail due to CORS restrictions in browser-based PDF generation.
 */

// Import the horizontal logo PNG directly - Vite will bundle it
import klarvoLogoHorizontal from "@/assets/klarvo-logo-horizontal.png";

// Primary logo for PDF cover pages and headers (4000x1000 high-res horizontal)
export const KLARVO_LOGO = klarvoLogoHorizontal;

// Legacy export name for backwards compatibility
export const KLARVO_LOGO_URL = klarvoLogoHorizontal;

// Watermark configuration
export const WATERMARK_CONFIG = {
  sampleText: "SAMPLE REPORT",
  freeTierText: "FREE TIER",
  demoText: "DEMO",
  fontSize: 60,
  opacity: 0.15,
  rotation: -45,
};
