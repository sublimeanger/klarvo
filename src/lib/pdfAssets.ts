/**
 * PDF Assets for React-PDF
 * Contains URLs and base64-encoded images for embedding in PDF documents
 */

// Klarvo logo - using publicly hosted PNG for reliable rendering in react-pdf
// Note: react-pdf handles URLs better than base64 in many environments
export const KLARVO_LOGO_URL = "https://klarvo.lovable.app/favicon.png";

// Fallback base64 encoded emerald "K" chevron mark (100x100 PNG)
// Generated from the actual Klarvo brand mark
export const KLARVO_LOGO_BASE64 = "data:image/png;base64,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";

// Horizontal logo (text + icon) - use for cover page headers
export const KLARVO_LOGO_HORIZONTAL_BASE64 = KLARVO_LOGO_BASE64;

// Watermark configuration
export const WATERMARK_CONFIG = {
  sampleText: "SAMPLE REPORT",
  freeTierText: "FREE TIER",
  demoText: "DEMO",
  fontSize: 60,
  opacity: 0.15,
  rotation: -45,
};
