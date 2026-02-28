

# Marketing Pages Audit & Content Enhancement Plan

## Audit Findings Summary

After reviewing 40+ marketing, legal, and documentation pages, I identified the following categories of issues:

### A. Business Details Missing/Incorrect Across All Pages

1. **Organization schema** (SchemaMarkup.tsx line 28-31): `addressCountry: "EU"` is invalid. Must be updated to real business details:
   - Company: Open Digital WEB LTD
   - Address: 36 Tyndall Court, Lynchwood Business Park, Peterborough, PE2 6LR, GB
   - Phone: +443300435929

2. **index.html** structured data (line 83-103): Organization schema has no address, no phone, no legal name.

3. **MarketingFooter.tsx**: No company registration details, no address, no phone number. Copyright says "Klarvo" not the legal entity.

4. **Contact.tsx**: No phone number, no physical address, no company registration number.

5. **About.tsx**: No mention of the legal entity, registered address, or UK company details.

6. **Press.tsx** boilerplate (line 276-293): Says "Founded in 2024" but doesn't mention legal entity or location.

7. **All legal pages** (Terms, Privacy, DPA, etc.): Reference "Klarvo" generically without legal entity name, registration number, or registered address.

### B. Content Accuracy Issues

8. **ComplianceSoftwarePage.tsx line 82-83**: Free tier says "up to 2 AI systems" but memory says it's 1 system. Also has `aggregateRating: { ratingValue: 4.9, reviewCount: 47 }` which is fabricated.

9. **Integrations page**: Lists Jira, Slack, Teams, Google Workspace as "Available" but these are not actually implemented — they're aspirational. This is misleading.

10. **FAQ page line 106-107**: Says integrations with Jira, Slack, Teams, Google Workspace exist and mentions a "REST API" — neither exists yet.

11. **Changelog.tsx**: Last entry is January 2025 — over a year old. Needs updating to reflect current state.

12. **Careers page**: Lists specific open positions that may not be real.

### C. Content Density Gaps (SEO Weakness)

13. **About page**: ~200 words of body content. Needs company history, team section, mission expansion, regulatory context, and business details. Target: 800+ words.

14. **Contact page**: No physical address, no phone, no map. Missing structured data (LocalBusiness schema).

15. **Features page**: Good structure but each feature description is only 1-2 sentences. Needs 3-4 sentence descriptions with specific EU AI Act article references.

16. **EU AI Act Guide**: Good content but lacks internal linking to tools/templates within each section. Missing "What should I do next?" actionable callouts.

17. **All product pages** (ComplianceSoftware, AIInventory, FRIA, EvidenceVault, EvidencePacks, TrainingTracker): Decent structure but content is thin — each section has 1-2 sentence descriptions. Need expanded "how it works" prose, more specific regulatory references, comparison sections.

18. **Industry pages**: Need content density check — likely thin.

19. **Guide pages**: Need content density check — these are the highest SEO value pages.

20. **Template pages**: Need to verify each has proper structured data and sufficient descriptive content.

21. **Tool pages**: Interactive tools are great for SEO but need more explanatory content around them.

22. **Compare pages**: High-value BOFU pages that need dense, persuasive content.

### D. SEO Infrastructure Issues

23. **Missing FAQ schemas**: Several product pages have FAQs but don't all use `createFAQSchema` for structured data.

24. **Stale dateModified values**: Many pages have `dateModified: "2025-01-31"` — should be current.

25. **Missing HowTo schemas**: Product pages with step-by-step workflows should use HowTo schema.

26. **Footer**: Missing GDPR/AUP links in legal column.

---

## Implementation Plan

### Phase 1: Business Identity Fixes (Critical — affects legal compliance and trust)

**Task 1: Update organization schema globally**
- `SchemaMarkup.tsx`: Update `organizationSchema` with legal name "Open Digital WEB LTD", full address (36 Tyndall Court, Lynchwood Business Park, Peterborough, PE2 6LR, GB), phone (+443300435929), country code "GB"
- `index.html`: Mirror the same Organization structured data with complete business details
- Add `legalName`, `telephone`, and proper `PostalAddress` fields

**Task 2: Update MarketingFooter.tsx**
- Add company details line: "Klarvo is a product of Open Digital WEB LTD"
- Add registered address
- Add phone number
- Update copyright to "Open Digital WEB LTD trading as Klarvo"
- Add GDPR and AUP to legal links column

**Task 3: Update Contact page**
- Add physical address section with full registered address
- Add phone number
- Add LocalBusiness structured data schema
- Add opening hours

**Task 4: Update About page**
- Add "About the Company" section with legal entity details, UK registration, registered address
- Expand mission section with more regulatory context (500+ additional words)
- Add team/leadership placeholder section
- Remove fabricated stats or mark as illustrative

**Task 5: Update all legal pages**
- Terms.tsx: Replace "Klarvo" with "Open Digital WEB LTD (trading as Klarvo)" in Section 1, add registered address, company number placeholder
- Privacy.tsx: Same legal entity update, add UK ICO registration reference, add physical address for data subject requests
- DPA.tsx: Update with legal entity details
- All other legal pages: Consistent legal entity naming

**Task 6: Update Press page boilerplate**
- Include legal entity name, UK registration, Peterborough address

### Phase 2: Content Accuracy Fixes (Critical — prevents misleading claims)

**Task 7: Fix fabricated/inaccurate content**
- ComplianceSoftwarePage: Remove `aggregateRating` (fabricated reviews), fix free tier from "2 systems" to "1 system"
- Integrations page: Change Jira/Slack/Teams/Google from "Available" to "Coming Soon" or remove the "Available" badge entirely. Be honest about current state.
- FAQ page: Remove claims about existing integrations. Update to say "planned" or "on roadmap"
- Careers page: Add disclaimer "Positions are indicative — contact careers@klarvo.io to discuss current openings"

### Phase 3: Content Density Enhancement (SEO — highest impact)

**Task 8: Enrich all BOFU product pages with dense content**

For each of these 6 pages, add 400-800 words of additional content:

- **ComplianceSoftwarePage**: Add "How Klarvo Works" prose section (4-step walkthrough with regulatory references), "Deployer vs Provider" explainer section, expanded use cases with specific Article references, competitive differentiation section
- **AIInventorySoftwarePage**: Add "What the EU AI Act Requires" section citing specific articles, "What Makes a Complete AI Inventory" checklist prose, "From Spreadsheet to System-of-Record" migration section
- **FRIASoftwarePage**: Add "When is FRIA Required?" decision tree prose, expand Article 27(a)-(f) descriptions, add "FRIA vs DPIA" comparison section
- **EvidencePacksPage**: Add "What Auditors Actually Want to See" section, expand pack contents with regulatory references, add sample pack structure diagram
- **EvidenceVaultPage**: Add "Why Documents Get Lost" problem section, "Compliance Evidence Lifecycle" section, add FAQ section with schema
- **TrainingTrackerPage**: Add "What Counts as AI Literacy" section with Article 4 deep-dive, expand training tier descriptions

**Task 9: Enrich guide pages**
Each guide page should target 2,000+ words. Add:
- More specific regulatory text references
- Practical examples (e.g., "If you use ChatGPT for customer support, here's what this means...")
- Internal links to relevant tools, templates, and product pages
- "What to do next" actionable sections
- Updated FAQ sections

**Task 10: Enrich template pages**
Each template page needs:
- Longer descriptions of what the template covers
- "Who needs this template" section
- "How to use this template" section
- Related templates cross-links

**Task 11: Enrich tool pages**
Each interactive tool page needs:
- 300-500 words of explanatory content below/around the tool
- "How to interpret your results" section
- Related guides and templates links

**Task 12: Enrich industry pages**
Each industry page needs:
- Industry-specific regulatory context (which Annex III categories apply)
- Real-world examples of AI systems in that industry
- Specific obligations matrix
- Internal linking to relevant tools and templates

**Task 13: Enrich comparison pages**
- KlarvoVsSpreadsheets: Add detailed feature comparison table, pain points, migration guide
- KlarvoVsTrustPlatforms: Add specific platform comparisons, differentiation on deployer focus

### Phase 4: SEO Infrastructure Polish

**Task 14: Update dateModified across all pages**
- Update all `dateModified` values to current date (2026-02-28)
- Update changelog with recent entries

**Task 15: Add missing structured data**
- Add HowTo schema to product pages with step workflows
- Add FAQ schema to pages that have FAQ content but lack the schema
- Ensure all pages have breadcrumb schema

**Task 16: Strengthen internal linking**
- Every guide should link to at least 2 templates, 1 tool, and 1 product page
- Every product page should link to at least 2 guides and 1 template
- Every template should link to its related guide

---

## Execution Priority

Given the volume, I recommend implementing in this order:
1. **Phase 1** (business identity) — affects legal compliance, trust signals, and all structured data
2. **Phase 2** (accuracy fixes) — removes misleading claims before driving more traffic
3. **Phase 3** (content density) — the SEO multiplier, starting with BOFU product pages
4. **Phase 4** (SEO infrastructure) — polish layer

This is a large scope touching 40+ files. I recommend breaking implementation into 3-4 rounds of work.

