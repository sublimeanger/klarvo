#!/usr/bin/env node

/**
 * Klarvo Production-Grade Prerender + SEO Pipeline
 *
 * This script handles the complete build → prerender → validate → sitemap pipeline:
 *   1a) Vite build
 *   1b) Local static server
 *   1c) Puppeteer prerender of every SSG route
 *   1d) Localhost sanitisation (CRITICAL)
 *   1e) SEO validation pass
 *   1f) XML sitemap generation
 *   1g) robots.txt generation
 *   1h) Internal link audit
 *   1i) Preserve _redirects
 *   1j) Final summary report
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');
const PRODUCTION_DOMAIN = 'https://klarvo.io';
const TODAY = new Date().toISOString().split('T')[0];

// ─── Colour helpers for terminal output ────────────────────────────────────────

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function log(msg) { console.log(msg); }
function logStep(step, msg) { log(`\n${c.bold}${c.cyan}[STEP ${step}]${c.reset} ${c.bold}${msg}${c.reset}`); }
function logOk(msg) { log(`  ${c.green}✓${c.reset} ${msg}`); }
function logWarn(msg) { log(`  ${c.yellow}⚠${c.reset} ${msg}`); }
function logErr(msg) { log(`  ${c.red}✗${c.reset} ${msg}`); }
function logInfo(msg) { log(`  ${c.blue}ℹ${c.reset} ${msg}`); }
function logFatal(msg) { log(`\n${c.bold}${c.red}FATAL: ${msg}${c.reset}`); }

// ─── Tracking counters ────────────────────────────────────────────────────────

const report = {
  totalRoutes: 0,
  prerendered: 0,
  failed: 0,
  failedRoutes: [],
  localhostContamination: false,
  seo: {
    titleTags: { ok: 0, missing: 0, tooGeneric: 0, duplicates: [] },
    metaDescriptions: { ok: 0, missing: 0, duplicates: [] },
    canonicalUrls: { ok: 0, missing: 0, fixed: 0 },
    ogTags: { ok: 0, missing: 0 },
    twitterTags: { ok: 0, missing: 0 },
    schemaTags: { ok: 0, missing: 0 },
    h1Tags: { ok: 0, zero: 0, multiple: 0 },
    robotsMeta: { ok: 0, missing: 0, injected: 0 },
    imgAlt: { ok: 0, missing: 0 },
    externalRel: { ok: 0, missing: 0 },
    htmlLang: { ok: 0, missing: 0 },
  },
  links: { internal: 0, broken: 0, external: 0, brokenList: [] },
  sitemapEntries: 0,
  robotsTxt: false,
  redirects: false,
  distSize: 0,
};

// ═════════════════════════════════════════════════════════════════════════════
// 1a) VITE BUILD
// ═════════════════════════════════════════════════════════════════════════════

logStep('1a', 'Running Vite build...');

try {
  execSync('npx vite build', { cwd: ROOT, stdio: 'inherit' });
  logOk('Vite build completed successfully');
} catch (err) {
  logFatal('Vite build failed');
  console.error(err);
  process.exit(1);
}

// ═════════════════════════════════════════════════════════════════════════════
// 1b) LOCAL STATIC SERVER
// ═════════════════════════════════════════════════════════════════════════════

logStep('1b', 'Starting local static server...');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function startServer(distDir) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent(req.url.split('?')[0]);
      let filePath = path.join(distDir, urlPath);

      // Try exact file first
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        serveFile(filePath, res);
        return;
      }

      // Try with index.html for directory paths
      const indexPath = path.join(filePath, 'index.html');
      if (fs.existsSync(indexPath)) {
        serveFile(indexPath, res);
        return;
      }

      // SPA fallback — serve index.html for any route
      const spaFallback = path.join(distDir, 'index.html');
      if (fs.existsSync(spaFallback)) {
        serveFile(spaFallback, res);
        return;
      }

      res.writeHead(404);
      res.end('Not found');
    });

    // Listen on port 0 for random available port
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      logOk(`Static server listening on http://127.0.0.1:${port}`);
      resolve({ server, port });
    });

    server.on('error', reject);
  });
}

function serveFile(filePath, res) {
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(content);
}

// ═════════════════════════════════════════════════════════════════════════════
// 1c) PRERENDER EVERY ROUTE
// ═════════════════════════════════════════════════════════════════════════════

function parseSSGRoutes() {
  const routesFile = path.join(ROOT, 'src', 'ssgRoutes.ts');
  const content = fs.readFileSync(routesFile, 'utf-8');

  // Extract all string literals from the array
  const matches = content.match(/'([^']+)'/g) || [];
  const routes = matches
    .map(m => m.replace(/'/g, ''))
    .filter(r => r.startsWith('/'));

  return routes;
}

async function prerenderRoutes(port, routes) {
  logStep('1c', `Prerendering ${routes.length} routes with Puppeteer...`);

  const puppeteer = await import('puppeteer');
  const browser = await puppeteer.default.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-extensions',
      '--disable-background-networking',
    ],
  });

  report.totalRoutes = routes.length;
  const failedFirstAttempt = [];

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const start = Date.now();

    try {
      await prerenderSingleRoute(browser, port, route);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      report.prerendered++;
      log(`  ${c.dim}[${i + 1}/${routes.length}]${c.reset} ${c.green}✓${c.reset} ${route} ${c.dim}(${elapsed}s)${c.reset}`);
    } catch (err) {
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      log(`  ${c.dim}[${i + 1}/${routes.length}]${c.reset} ${c.red}✗${c.reset} ${route} ${c.dim}(${elapsed}s)${c.reset} — ${err.message}`);
      failedFirstAttempt.push(route);
    }
  }

  // Retry failed pages once
  if (failedFirstAttempt.length > 0) {
    log(`\n  ${c.yellow}Retrying ${failedFirstAttempt.length} failed pages...${c.reset}`);
    for (const route of failedFirstAttempt) {
      const start = Date.now();
      try {
        await prerenderSingleRoute(browser, port, route);
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        report.prerendered++;
        logOk(`${route} (retry) (${elapsed}s)`);
      } catch (err) {
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        logErr(`${route} (retry failed) (${elapsed}s) — ${err.message}`);
        report.failed++;
        report.failedRoutes.push(route);
      }
    }
  }

  await browser.close();
}

async function prerenderSingleRoute(browser, port, route) {
  const page = await browser.newPage();
  const url = `http://127.0.0.1:${port}${route}`;

  try {
    // Set a reasonable viewport
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate with networkidle0
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait additional 3 seconds for lazy-loaded components
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Wait for document.readyState === 'complete'
    await page.waitForFunction(() => document.readyState === 'complete', { timeout: 10000 });

    // Wait for React suspense boundaries to resolve
    await page.waitForFunction(() => {
      // Check no loading spinners or skeleton elements
      const loadingIndicators = document.querySelectorAll(
        '[data-loading], .skeleton, .loading-spinner, [aria-busy="true"], .animate-pulse'
      );
      return loadingIndicators.length === 0;
    }, { timeout: 10000 }).catch(() => {
      // Not fatal — some pages may not have these elements
    });

    // Capture the full HTML
    const html = await page.evaluate(() => document.documentElement.outerHTML);
    const fullHtml = `<!DOCTYPE html>\n${html}`;

    // Determine output path
    let outputPath;
    if (route === '/') {
      outputPath = path.join(DIST, 'index.html');
    } else {
      // /features → dist/features/index.html
      const dir = path.join(DIST, route);
      fs.mkdirSync(dir, { recursive: true });
      outputPath = path.join(dir, 'index.html');
    }

    fs.writeFileSync(outputPath, fullHtml, 'utf-8');
  } finally {
    await page.close();
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 1d) LOCALHOST SANITISATION (CRITICAL)
// ═════════════════════════════════════════════════════════════════════════════

function sanitiseLocalhost() {
  logStep('1d', 'Sanitising localhost references (CRITICAL)...');

  const textExtensions = new Set([
    '.html', '.js', '.css', '.json', '.xml', '.txt', '.svg', '.map', '.mjs',
  ]);

  // Patterns to replace — ordered from most specific to least
  const replacements = [
    [/https?:\/\/localhost:5173/g, PRODUCTION_DOMAIN],
    [/https?:\/\/localhost:4173/g, PRODUCTION_DOMAIN],
    [/https?:\/\/localhost:3000/g, PRODUCTION_DOMAIN],
    [/https?:\/\/localhost:\d+/g, PRODUCTION_DOMAIN],
    [/https?:\/\/localhost/g, PRODUCTION_DOMAIN],
    [/https:\/\/localhost/g, PRODUCTION_DOMAIN],
    [/http:\/\/127\.0\.0\.1(:\d+)?/g, PRODUCTION_DOMAIN],
  ];

  let totalReplacements = 0;

  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (textExtensions.has(ext)) {
          let content = fs.readFileSync(fullPath, 'utf-8');
          let changed = false;
          for (const [pattern, replacement] of replacements) {
            const newContent = content.replace(pattern, replacement);
            if (newContent !== content) {
              totalReplacements++;
              changed = true;
              content = newContent;
            }
          }
          if (changed) {
            fs.writeFileSync(fullPath, content, 'utf-8');
          }
        }
      }
    }
  }

  walkDir(DIST);
  logOk(`Replaced localhost references in ${totalReplacements} files`);

  // FINAL SCAN — check for any remaining localhost in HTML files
  let contaminated = false;
  function finalScan(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        finalScan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const lines = content.split('\n');
        for (let lineNum = 0; lineNum < lines.length; lineNum++) {
          if (/localhost/i.test(lines[lineNum])) {
            contaminated = true;
            report.localhostContamination = true;
            const start = Math.max(0, lineNum - 1);
            const end = Math.min(lines.length, lineNum + 2);
            const context = lines.slice(start, end).join('\n');
            logFatal(`localhost found in ${path.relative(DIST, fullPath)}:${lineNum + 1}`);
            log(`    ${c.dim}${context}${c.reset}`);
          }
        }
      }
    }
  }

  finalScan(DIST);

  if (!contaminated) {
    logOk('Final scan: ZERO localhost contamination');
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 1e) SEO VALIDATION PASS
// ═════════════════════════════════════════════════════════════════════════════

function validateSEO(routes) {
  logStep('1e', 'Running SEO validation pass...');

  const htmlFiles = [];
  findHtmlFiles(DIST, htmlFiles);

  const titleMap = new Map(); // title → [files]
  const descMap = new Map();  // desc → [files]

  for (const filePath of htmlFiles) {
    const relativePath = path.relative(DIST, filePath);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Determine the route for this file
    let route;
    if (filePath === path.join(DIST, 'index.html')) {
      route = '/';
    } else {
      route = '/' + path.relative(DIST, path.dirname(filePath)).replace(/\\/g, '/');
    }

    const isAuthPage = route.startsWith('/auth');

    log(`\n  ${c.dim}── ${relativePath} ──${c.reset}`);

    // ── Meta robots ───────────────────────────────────────────────────
    const robotsMatch = content.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
    if (isAuthPage) {
      if (robotsMatch) {
        if (!robotsMatch[1].includes('noindex')) {
          logWarn(`Auth page ${route} should have noindex`);
        }
      }
      // Auth pages exist due to prerender but _redirects should handle them
      logWarn(`Auth page ${route} was prerendered — _redirects will handle the 301`);
    } else {
      const expectedRobots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
      if (!robotsMatch) {
        // Inject robots meta
        const injected = content.replace(
          /<head>/i,
          `<head>\n<meta name="robots" content="${expectedRobots}">`
        );
        fs.writeFileSync(filePath, injected, 'utf-8');
        report.seo.robotsMeta.injected++;
        logInfo(`Injected robots meta for ${route}`);
      } else {
        report.seo.robotsMeta.ok++;
      }
    }

    // Re-read after possible injection
    const updatedContent = fs.readFileSync(filePath, 'utf-8');

    // ── Title tag ─────────────────────────────────────────────────────
    const titleMatch = updatedContent.match(/<title>([^<]*)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      report.seo.titleTags.missing++;
      logWarn(`Missing <title> on ${route}`);
    } else {
      const title = titleMatch[1].trim();
      if (title === 'Klarvo' || title === 'Klarvo — EU AI Act Compliance Platform') {
        report.seo.titleTags.tooGeneric++;
        logWarn(`Generic title on ${route}: "${title}"`);
      } else {
        report.seo.titleTags.ok++;
      }
      const len = title.length;
      if (len < 30 || len > 60) {
        logInfo(`Title length ${len} chars on ${route}: "${title}"`);
      }
      // Track duplicates
      if (!titleMap.has(title)) titleMap.set(title, []);
      titleMap.get(title).push(route);
    }

    // ── Meta description ──────────────────────────────────────────────
    const descMatch = updatedContent.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    if (!descMatch || !descMatch[1].trim()) {
      report.seo.metaDescriptions.missing++;
      logWarn(`Missing meta description on ${route}`);
    } else {
      report.seo.metaDescriptions.ok++;
      const desc = descMatch[1].trim();
      const len = desc.length;
      if (len < 120 || len > 160) {
        logInfo(`Description length ${len} chars on ${route}`);
      }
      if (!descMap.has(desc)) descMap.set(desc, []);
      descMap.get(desc).push(route);
    }

    // ── Canonical URL ─────────────────────────────────────────────────
    const canonicalMatch = updatedContent.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
    const expectedCanonical = `${PRODUCTION_DOMAIN}${route === '/' ? '' : route}`;
    if (!canonicalMatch) {
      // Inject canonical
      const withCanonical = updatedContent.replace(
        /<head>/i,
        `<head>\n<link rel="canonical" href="${expectedCanonical}">`
      );
      fs.writeFileSync(filePath, withCanonical, 'utf-8');
      report.seo.canonicalUrls.fixed++;
      logInfo(`Injected canonical for ${route}`);
    } else if (canonicalMatch[1].includes('localhost')) {
      // Fix localhost canonical
      const fixed = updatedContent.replace(
        canonicalMatch[0],
        `<link rel="canonical" href="${expectedCanonical}"`
      );
      fs.writeFileSync(filePath, fixed, 'utf-8');
      report.seo.canonicalUrls.fixed++;
      logInfo(`Fixed localhost canonical for ${route}`);
    } else {
      report.seo.canonicalUrls.ok++;
    }

    // ── Open Graph tags ───────────────────────────────────────────────
    const ogTags = ['og:title', 'og:description', 'og:url', 'og:image', 'og:type', 'og:site_name'];
    let ogMissing = false;
    for (const tag of ogTags) {
      const regex = new RegExp(`<meta\\s+property="${tag}"\\s+content="([^"]*)"`, 'i');
      const match = updatedContent.match(regex);
      if (!match) {
        ogMissing = true;
        logWarn(`Missing ${tag} on ${route}`);
      } else if (match[1].includes('localhost')) {
        logWarn(`${tag} contains localhost on ${route}`);
      }
    }
    if (ogMissing) {
      report.seo.ogTags.missing++;
    } else {
      report.seo.ogTags.ok++;
    }

    // Fix og:url if pointing to localhost
    const ogUrlMatch = updatedContent.match(/<meta\s+property="og:url"\s+content="([^"]*)"/i);
    if (ogUrlMatch && ogUrlMatch[1].includes('localhost')) {
      const fixedContent = fs.readFileSync(filePath, 'utf-8').replace(
        ogUrlMatch[0],
        `<meta property="og:url" content="${expectedCanonical}"`
      );
      fs.writeFileSync(filePath, fixedContent, 'utf-8');
    }

    // ── Twitter Card tags ─────────────────────────────────────────────
    const twitterTags = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
    let twitterMissing = false;
    for (const tag of twitterTags) {
      const regex = new RegExp(`<meta\\s+name="${tag}"\\s+content="([^"]*)"`, 'i');
      if (!updatedContent.match(regex)) {
        twitterMissing = true;
        logWarn(`Missing ${tag} on ${route}`);
      }
    }
    if (twitterMissing) {
      report.seo.twitterTags.missing++;
    } else {
      report.seo.twitterTags.ok++;
    }

    // ── HTML lang attribute ───────────────────────────────────────────
    if (/<html[^>]*\slang="en"/.test(updatedContent)) {
      report.seo.htmlLang.ok++;
    } else {
      report.seo.htmlLang.missing++;
      // Fix: add lang and dir attributes
      const fixedHtml = fs.readFileSync(filePath, 'utf-8').replace(
        /<html([^>]*)>/i,
        (match, attrs) => {
          let newAttrs = attrs;
          if (!/\slang=/.test(newAttrs)) newAttrs += ' lang="en"';
          if (!/\sdir=/.test(newAttrs)) newAttrs += ' dir="ltr"';
          return `<html${newAttrs}>`;
        }
      );
      fs.writeFileSync(filePath, fixedHtml, 'utf-8');
      logInfo(`Fixed html lang attribute on ${route}`);
    }

    // ── Image alt attributes ──────────────────────────────────────────
    const imgTags = updatedContent.match(/<img\s[^>]*>/gi) || [];
    for (const img of imgTags) {
      if (!/\salt=/.test(img)) {
        report.seo.imgAlt.missing++;
        logWarn(`Image missing alt attribute on ${route}: ${img.substring(0, 80)}...`);
      } else {
        report.seo.imgAlt.ok++;
      }
    }

    // ── External link rel attributes ──────────────────────────────────
    const linkRegex = /<a\s[^>]*href="(https?:\/\/[^"]*)"[^>]*>/gi;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(updatedContent)) !== null) {
      const href = linkMatch[1];
      if (!href.includes('klarvo.io')) {
        // External link — check for rel="noopener noreferrer"
        if (!/rel="[^"]*noopener[^"]*"/.test(linkMatch[0])) {
          report.seo.externalRel.missing++;
        } else {
          report.seo.externalRel.ok++;
        }
      }
    }

    // ── Schema markup ─────────────────────────────────────────────────
    const schemaBlocks = updatedContent.match(/<script\s+type="application\/ld\+json">[^<]*<\/script>/gi) || [];
    if (schemaBlocks.length === 0) {
      report.seo.schemaTags.missing++;
      logWarn(`No schema markup on ${route}`);
    } else {
      let allValid = true;
      for (const block of schemaBlocks) {
        const jsonStr = block.replace(/<script\s+type="application\/ld\+json">/i, '').replace(/<\/script>/i, '');
        try {
          JSON.parse(jsonStr);
        } catch {
          allValid = false;
          logWarn(`Invalid JSON-LD on ${route}`);
        }
      }
      if (allValid) {
        report.seo.schemaTags.ok++;
      }
    }

    // ── Heading structure ─────────────────────────────────────────────
    const h1Matches = updatedContent.match(/<h1[\s>]/gi) || [];
    if (h1Matches.length === 0) {
      report.seo.h1Tags.zero++;
      logWarn(`No <h1> tag on ${route}`);
    } else if (h1Matches.length > 1) {
      report.seo.h1Tags.multiple++;
      logWarn(`Multiple <h1> tags (${h1Matches.length}) on ${route}`);
    } else {
      report.seo.h1Tags.ok++;
    }

    // Log heading hierarchy
    const headings = [];
    const headingRegex = /<(h[1-6])[^>]*>([^<]*)</gi;
    let hMatch;
    while ((hMatch = headingRegex.exec(updatedContent)) !== null) {
      headings.push({ level: hMatch[1].toUpperCase(), text: hMatch[2].trim().substring(0, 60) });
    }
    if (headings.length > 0) {
      const hierarchy = headings.slice(0, 5).map(h => `${h.level}: ${h.text}`).join(' → ');
      logInfo(`Headings: ${hierarchy}${headings.length > 5 ? ' ...' : ''}`);
    }
  }

  // ── Check for duplicate titles ────────────────────────────────────────
  log(`\n  ${c.bold}Duplicate check:${c.reset}`);
  for (const [title, pages] of titleMap) {
    if (pages.length > 1) {
      report.seo.titleTags.duplicates.push({ title, pages });
      logWarn(`Duplicate title "${title}" on: ${pages.join(', ')}`);
    }
  }
  for (const [desc, pages] of descMap) {
    if (pages.length > 1) {
      report.seo.metaDescriptions.duplicates.push({ desc: desc.substring(0, 60), pages });
      logWarn(`Duplicate description on: ${pages.join(', ')}`);
    }
  }
}

function findHtmlFiles(dir, result) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath, result);
    } else if (entry.name.endsWith('.html')) {
      result.push(fullPath);
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 1f) GENERATE XML SITEMAP
// ═════════════════════════════════════════════════════════════════════════════

function generateSitemap(routes) {
  logStep('1f', 'Generating XML sitemap...');

  // Filter out auth pages from sitemap
  const sitemapRoutes = routes.filter(r => !r.startsWith('/auth'));

  function getChangefreq(route) {
    if (route === '/') return 'weekly';
    if (['/pricing', '/blog', '/changelog'].includes(route)) return 'weekly';
    if (route.startsWith('/guides') || route.startsWith('/templates') || route.startsWith('/tools')) return 'monthly';
    if (['/terms', '/privacy', '/cookies', '/security', '/dpa', '/gdpr', '/aup'].includes(route)) return 'yearly';
    return 'monthly';
  }

  function getPriority(route) {
    if (route === '/') return '1.0';
    // Core pages
    if (['/features', '/pricing', '/about'].includes(route)) return '0.9';
    // Product pages
    if (['/eu-ai-act-compliance-software', '/ai-inventory-software', '/fria-software'].includes(route)) return '0.9';
    // Hub pages
    if (['/templates', '/tools', '/guides', '/compare', '/industries', '/eu-ai-act'].includes(route)) return '0.8';
    // Individual guides, templates, tools
    if (route.startsWith('/guides/')) return '0.7';
    if (route.startsWith('/templates/')) return '0.7';
    if (route.startsWith('/tools/')) return '0.7';
    // Industry and use-case pages
    if (route.startsWith('/industries/')) return '0.7';
    if (route.startsWith('/use-cases/')) return '0.7';
    // Comparison pages
    if (route.startsWith('/compare/')) return '0.7';
    // Additional BOFU
    if (['/ai-governance-evidence-packs', '/ai-literacy-training-tracker', '/product/evidence-vault', '/evidence-vault', '/samples'].includes(route)) return '0.8';
    // Blog, resources, docs
    if (['/blog', '/resources', '/docs', '/api'].includes(route)) return '0.6';
    // Legal pages
    if (['/terms', '/privacy', '/cookies', '/security', '/dpa', '/gdpr', '/aup'].includes(route)) return '0.3';
    // FAQ, careers, press, status, changelog
    if (['/faq', '/careers', '/press', '/status', '/changelog'].includes(route)) return '0.5';
    // Contact, integrations, partners
    if (['/contact', '/integrations', '/partners'].includes(route)) return '0.6';
    return '0.5';
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  for (const route of sitemapRoutes) {
    const loc = `${PRODUCTION_DOMAIN}${route === '/' ? '' : route}`;
    const changefreq = getChangefreq(route);
    const priority = getPriority(route);

    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;

    // Check if the page has an OG image
    const htmlPath = route === '/'
      ? path.join(DIST, 'index.html')
      : path.join(DIST, route, 'index.html');

    if (fs.existsSync(htmlPath)) {
      const content = fs.readFileSync(htmlPath, 'utf-8');
      const ogImageMatch = content.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i);
      if (ogImageMatch && ogImageMatch[1] && !ogImageMatch[1].includes('localhost')) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${ogImageMatch[1]}</image:loc>\n`;
        xml += `    </image:image>\n`;
      }
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf-8');
  report.sitemapEntries = sitemapRoutes.length;
  logOk(`Generated sitemap.xml with ${sitemapRoutes.length} entries`);

  // Generate sitemap-index.xml
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  indexXml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  indexXml += `  <sitemap>\n`;
  indexXml += `    <loc>${PRODUCTION_DOMAIN}/sitemap.xml</loc>\n`;
  indexXml += `    <lastmod>${TODAY}</lastmod>\n`;
  indexXml += `  </sitemap>\n`;
  indexXml += `</sitemapindex>\n`;

  fs.writeFileSync(path.join(DIST, 'sitemap-index.xml'), indexXml, 'utf-8');
  logOk('Generated sitemap-index.xml');
}

// ═════════════════════════════════════════════════════════════════════════════
// 1g) GENERATE robots.txt
// ═════════════════════════════════════════════════════════════════════════════

function generateRobotsTxt() {
  logStep('1g', 'Generating robots.txt...');

  const robotsTxt = `# Klarvo EU AI Act Compliance Platform
# https://klarvo.io

User-agent: *
Allow: /

# App routes (served from app.klarvo.io)
Disallow: /auth/
Disallow: /dashboard/
Disallow: /onboarding/
Disallow: /ai-systems/
Disallow: /vendors/
Disallow: /assessments/
Disallow: /controls/
Disallow: /evidence/
Disallow: /policies/
Disallow: /training/
Disallow: /tasks/
Disallow: /incidents/
Disallow: /exports/
Disallow: /disclosures/
Disallow: /audit-log/
Disallow: /discovery/
Disallow: /settings/
Disallow: /invite/
Disallow: /provider-track/
Disallow: /ads/

# Sitemaps
Sitemap: https://klarvo.io/sitemap-index.xml
Sitemap: https://klarvo.io/sitemap.xml

# Crawl-delay for polite crawling
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Allow: /
`;

  fs.writeFileSync(path.join(DIST, 'robots.txt'), robotsTxt, 'utf-8');
  report.robotsTxt = true;
  logOk('Generated robots.txt');
}

// ═════════════════════════════════════════════════════════════════════════════
// 1h) INTERNAL LINK AUDIT
// ═════════════════════════════════════════════════════════════════════════════

function auditInternalLinks(routes) {
  logStep('1h', 'Auditing internal links...');

  // Parse _redirects to know which paths are redirected
  const redirectPatterns = [];
  const redirectsPath = path.join(DIST, '_redirects');
  if (fs.existsSync(redirectsPath)) {
    const redirectContent = fs.readFileSync(redirectsPath, 'utf-8');
    for (const line of redirectContent.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const parts = trimmed.split(/\s+/);
        if (parts.length >= 2) {
          // Convert wildcard pattern to prefix: /auth/* → /auth/
          const pattern = parts[0].replace('/*', '/');
          redirectPatterns.push(pattern);
        }
      }
    }
  }

  // Build set of known pages
  const knownPages = new Set();
  for (const route of routes) {
    knownPages.add(route);
  }

  // Scan all HTML files for internal links
  const htmlFiles = [];
  findHtmlFiles(DIST, htmlFiles);

  for (const filePath of htmlFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(DIST, filePath);

    // Extract all href values
    const hrefRegex = /<a\s[^>]*href="([^"#]*)"/gi;
    let match;

    while ((match = hrefRegex.exec(content)) !== null) {
      const href = match[1].trim();

      // Skip empty, javascript:, mailto:, tel:
      if (!href || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        continue;
      }

      // External links to app.klarvo.io — these are correct
      if (href.startsWith('https://app.klarvo.io')) {
        report.links.external++;
        continue;
      }

      // External links
      if (href.startsWith('http://') || href.startsWith('https://')) {
        if (href.startsWith(`${PRODUCTION_DOMAIN}/`)) {
          // Link to our own domain — extract path and verify
          const urlPath = href.replace(PRODUCTION_DOMAIN, '');
          const normalizedPath = urlPath.replace(/\/$/, '') || '/';
          report.links.internal++;

          if (!knownPages.has(normalizedPath)) {
            // Check if covered by a redirect
            const isRedirected = redirectPatterns.some(p => normalizedPath.startsWith(p));
            if (!isRedirected) {
              // Check if the file exists
              const targetFile = normalizedPath === '/'
                ? path.join(DIST, 'index.html')
                : path.join(DIST, normalizedPath, 'index.html');
              if (!fs.existsSync(targetFile)) {
                report.links.broken++;
                report.links.brokenList.push({ from: relativePath, to: normalizedPath });
                logErr(`BROKEN LINK: ${relativePath} → ${normalizedPath}`);
              }
            }
          }
        } else {
          report.links.external++;
        }
        continue;
      }

      // Internal links starting with /
      if (href.startsWith('/')) {
        const normalizedPath = href.replace(/\/$/, '') || '/';
        report.links.internal++;

        if (!knownPages.has(normalizedPath)) {
          // Check if covered by a redirect
          const isRedirected = redirectPatterns.some(p => normalizedPath.startsWith(p));
          if (!isRedirected) {
            // Check if the file actually exists
            const targetFile = normalizedPath === '/'
              ? path.join(DIST, 'index.html')
              : path.join(DIST, normalizedPath, 'index.html');
            if (!fs.existsSync(targetFile)) {
              // Also check for direct file match (assets, etc.)
              const directFile = path.join(DIST, normalizedPath);
              if (!fs.existsSync(directFile)) {
                report.links.broken++;
                report.links.brokenList.push({ from: relativePath, to: normalizedPath });
                logErr(`BROKEN LINK: ${relativePath} → ${normalizedPath}`);
              }
            }
          }
        }
      }
    }
  }

  logOk(`${report.links.internal.toLocaleString()} internal links checked, ${report.links.broken} broken, ${report.links.external} external`);
}

// ═════════════════════════════════════════════════════════════════════════════
// 1i) PRESERVE _redirects
// ═════════════════════════════════════════════════════════════════════════════

function preserveRedirects() {
  logStep('1i', 'Verifying _redirects...');

  const distRedirects = path.join(DIST, '_redirects');
  const publicRedirects = path.join(PUBLIC, '_redirects');

  if (fs.existsSync(distRedirects)) {
    report.redirects = true;
    logOk('_redirects exists in dist/');
  } else if (fs.existsSync(publicRedirects)) {
    fs.copyFileSync(publicRedirects, distRedirects);
    report.redirects = true;
    logOk('Copied _redirects from public/ to dist/');
  } else {
    logWarn('No _redirects file found!');
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 1j) FINAL SUMMARY REPORT
// ═════════════════════════════════════════════════════════════════════════════

function calculateDistSize() {
  let totalSize = 0;
  function walkSize(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkSize(fullPath);
      } else if (entry.isFile()) {
        totalSize += fs.statSync(fullPath).size;
      }
    }
  }
  walkSize(DIST);
  return totalSize;
}

function printReport() {
  logStep('1j', 'Final Summary Report');

  const distSize = calculateDistSize();
  const distSizeMB = (distSize / (1024 * 1024)).toFixed(1);

  const totalSeoPages = report.prerendered;
  const titleTotal = report.seo.titleTags.ok + report.seo.titleTags.missing + report.seo.titleTags.tooGeneric;
  const descTotal = report.seo.metaDescriptions.ok + report.seo.metaDescriptions.missing;
  const canonicalTotal = report.seo.canonicalUrls.ok + report.seo.canonicalUrls.fixed;
  const ogTotal = report.seo.ogTags.ok + report.seo.ogTags.missing;
  const schemaTotal = report.seo.schemaTags.ok + report.seo.schemaTags.missing;
  const h1Total = report.seo.h1Tags.ok + report.seo.h1Tags.zero + report.seo.h1Tags.multiple;
  const robotsTotal = report.seo.robotsMeta.ok + report.seo.robotsMeta.injected;

  const check = (ok, total) => ok === total ? `${c.green}✓${c.reset}` : `${c.yellow}⚠${c.reset}`;
  const fmt = (n) => n.toLocaleString();

  log(`
${c.bold}══════════════════════════════════════════════${c.reset}
${c.bold} KLARVO PRERENDER REPORT${c.reset}
${c.bold}══════════════════════════════════════════════${c.reset}

  Pages prerendered:      ${report.prerendered}/${report.totalRoutes}
  Failed pages:           ${report.failed}${report.failedRoutes.length > 0 ? ` (${report.failedRoutes.join(', ')})` : ''}
  Localhost contamination: ${report.localhostContamination ? `${c.red}DETECTED${c.reset}` : `${c.green}NONE ✓${c.reset}`}

  ${c.bold}SEO HEALTH:${c.reset}
  ├─ Title tags:          ${report.seo.titleTags.ok}/${titleTotal} ${check(report.seo.titleTags.ok, titleTotal)}${report.seo.titleTags.missing > 0 ? ` (${report.seo.titleTags.missing} missing)` : ''}${report.seo.titleTags.tooGeneric > 0 ? ` (${report.seo.titleTags.tooGeneric} generic)` : ''}
  ├─ Meta descriptions:   ${report.seo.metaDescriptions.ok}/${descTotal} ${check(report.seo.metaDescriptions.ok, descTotal)}${report.seo.metaDescriptions.missing > 0 ? ` (${report.seo.metaDescriptions.missing} missing)` : ''}
  ├─ Canonical URLs:      ${canonicalTotal}/${canonicalTotal} ${c.green}✓${c.reset}${report.seo.canonicalUrls.fixed > 0 ? ` (${report.seo.canonicalUrls.fixed} injected/fixed)` : ''}
  ├─ OG tags:             ${report.seo.ogTags.ok}/${ogTotal} ${check(report.seo.ogTags.ok, ogTotal)}${report.seo.ogTags.missing > 0 ? ` (${report.seo.ogTags.missing} missing)` : ''}
  ├─ Twitter tags:        ${report.seo.twitterTags.ok}/${report.seo.twitterTags.ok + report.seo.twitterTags.missing} ${check(report.seo.twitterTags.ok, report.seo.twitterTags.ok + report.seo.twitterTags.missing)}
  ├─ Schema markup:       ${report.seo.schemaTags.ok}/${schemaTotal} ${check(report.seo.schemaTags.ok, schemaTotal)}${report.seo.schemaTags.missing > 0 ? ` (${report.seo.schemaTags.missing} missing)` : ''}
  ├─ H1 tags:             ${report.seo.h1Tags.ok}/${h1Total} ${check(report.seo.h1Tags.ok, h1Total)}${report.seo.h1Tags.zero > 0 ? ` (${report.seo.h1Tags.zero} missing)` : ''}${report.seo.h1Tags.multiple > 0 ? ` (${report.seo.h1Tags.multiple} multiple)` : ''}
  ├─ Robots meta:         ${robotsTotal}/${robotsTotal} ${c.green}✓${c.reset}${report.seo.robotsMeta.injected > 0 ? ` (${report.seo.robotsMeta.injected} injected)` : ''}
  ├─ HTML lang:           ${report.seo.htmlLang.ok}/${report.seo.htmlLang.ok + report.seo.htmlLang.missing} ${check(report.seo.htmlLang.ok, report.seo.htmlLang.ok + report.seo.htmlLang.missing)}
  └─ Img alt attrs:       ${report.seo.imgAlt.ok} ok, ${report.seo.imgAlt.missing} missing

  ${c.bold}LINKS:${c.reset}
  ├─ Internal links:      ${fmt(report.links.internal)} checked
  ├─ Broken links:        ${report.links.broken} ${report.links.broken === 0 ? `${c.green}✓${c.reset}` : `${c.red}✗${c.reset}`}
  └─ External links:      ${fmt(report.links.external)}

  ${c.bold}OUTPUT:${c.reset}
  ├─ Sitemap entries:     ${report.sitemapEntries}
  ├─ robots.txt:          ${report.robotsTxt ? `Generated ${c.green}✓${c.reset}` : `${c.red}Missing${c.reset}`}
  ├─ _redirects:          ${report.redirects ? `Preserved ${c.green}✓${c.reset}` : `${c.red}Missing${c.reset}`}
  └─ Total dist/ size:    ${distSizeMB} MB

${c.bold}══════════════════════════════════════════════${c.reset}
`);

  if (report.links.broken > 0) {
    log(`  ${c.bold}${c.red}Broken links:${c.reset}`);
    for (const bl of report.links.brokenList) {
      logErr(`${bl.from} → ${bl.to}`);
    }
    log('');
  }

  if (report.seo.titleTags.duplicates.length > 0) {
    log(`  ${c.bold}${c.yellow}Duplicate titles:${c.reset}`);
    for (const dup of report.seo.titleTags.duplicates) {
      logWarn(`"${dup.title}" → ${dup.pages.join(', ')}`);
    }
    log('');
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═════════════════════════════════════════════════════════════════════════════

async function main() {
  const startTime = Date.now();
  log(`\n${c.bold}${c.magenta}═══ KLARVO PRERENDER + SEO PIPELINE ═══${c.reset}`);
  log(`${c.dim}Started at ${new Date().toISOString()}${c.reset}\n`);

  // Parse routes
  const routes = parseSSGRoutes();
  log(`${c.dim}Found ${routes.length} routes in ssgRoutes.ts${c.reset}`);

  // 1b) Start local server
  const { server, port } = await startServer(DIST);

  try {
    // 1c) Prerender
    await prerenderRoutes(port, routes);
  } finally {
    // Always close the server
    server.close();
    logOk('Local server stopped');
  }

  // 1d) Localhost sanitisation
  sanitiseLocalhost();

  // 1e) SEO validation
  validateSEO(routes);

  // 1f) Generate sitemap
  generateSitemap(routes);

  // 1g) Generate robots.txt
  generateRobotsTxt();

  // 1h) Internal link audit
  auditInternalLinks(routes);

  // 1i) Preserve _redirects
  preserveRedirects();

  // 1j) Final report
  printReport();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  log(`${c.dim}Total pipeline time: ${elapsed}s${c.reset}\n`);

  // Exit with error if there was localhost contamination
  if (report.localhostContamination) {
    process.exit(1);
  }
}

main().catch((err) => {
  logFatal(err.message);
  console.error(err);
  process.exit(1);
});
