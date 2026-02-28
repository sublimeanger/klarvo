

## Documentation Audit Results

### Critical Finding: 35 of 48 Articles Have No Content

The sidebar navigation lists 48 articles across 11 categories, but only **13 articles** have actual content in `docArticles`. Clicking any of the 35 missing articles redirects to the docs homepage — a broken user experience.

### Articles WITH Content (13)
quick-start, dashboard-overview, first-ai-system, invite-team, ai-system-wizard, capture-modes, classification-engine, prohibited-screening, high-risk-categories, fria-requirements, evidence-vault, roles-permissions, incident-management, export-overview

### Articles MISSING Content (35)
**AI System Inventory (3):** ownership-oversight, vendor-tracking, bulk-import
**Classification (3):** definition-test, transparency-obligations, classification-memos
**FRIA (4):** fria-wizard, fria-risks, fria-mitigation, fria-reports
**Evidence (4):** uploading-evidence, approval-workflows, evidence-expiration, linking-evidence
**Exports (4):** classification-exports, fria-exports, evidence-pack, org-reports
**Team (3):** task-owners, activity-feed, evidence-requests
**Incidents (3):** creating-incidents, monitoring-events, reassessment-triggers
**Training (4):** ai-literacy, training-programs, training-completion, training-reports
**Vendors (4):** vendor-profiles, due-diligence, vendor-attestations, contract-management
**Settings (4):** org-settings, notifications, billing, data-privacy

### Accuracy Issues in Existing Content
- Content is generally accurate on EU AI Act references (Articles 4, 5, 26, 27, 50, Annex III)
- Existing articles are short (300-500 words each) — should be enhanced to 800-1200 words for documentation
- `lastUpdated` dates show 2025-01 — should be updated

### Implementation Plan

#### Task 1: Create all 35 missing articles
Write substantive content (800-1200 words each) for every missing article, covering practical platform guidance with EU AI Act regulatory anchors. Each article needs: description, readTime, relatedArticles, and rich markdown content with tables, code blocks, and internal links.

#### Task 2: Enhance existing 13 articles
Expand thin articles to 800-1200 words with more practical examples, step-by-step instructions, and cross-references.

#### Task 3: Update metadata
Refresh all `lastUpdated` fields. Ensure all `relatedArticles` reference valid slugs.

#### File changes
- `src/lib/docsContent.ts` — Add 35 new article entries + enhance 13 existing ones (this will be a very large file, ~4000-5000 lines)

