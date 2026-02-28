## Blog Content Overhaul Plan

### Current State

- **8 blog posts** in `src/lib/blogContent.ts`, each ~300-600 words (far below 1500-2000 target)
- All posts have `date` fields and individual author names (Dr. Anna Muller, James Robertson, Sarah Chen)
- `BlogArticle.tsx` renders date with Calendar icon (lines 103-106)
- `Blog.tsx` has **hardcoded duplicate** featured post + blog list data (lines 26-111) with dates and author names displayed

### Changes Required

#### 1. Remove date display and update authorship in `BlogArticle.tsx`

- Remove the Calendar/date `<span>` block (lines 103-106)
- Remove `Calendar` from icon imports
- Remove `datePublished` from article schema (or keep as hidden metadata)

#### 2. Remove date display and update authorship in `Blog.tsx`

- Remove date from featured post card (line 33)
- Remove all `date` fields from hardcoded `blogPosts` array (lines 38-111)
- Remove Calendar icon references from post cards (line 369)
- Update all `author` fields to "Klarvo Staff"
- Remove `authorRole` from featured post

#### 3. Update `blogContent.ts` data model and all 8 posts

- Change all `author` fields to `"Klarvo Staff"`
- Remove all `authorRole` fields
- Keep `date` field in data (for internal use / schema) but don't display it
- Enrich all 8 post `content` fields to 1500-2000 words each:


| Post                           | Current ~words | Topic                      |
| ------------------------------ | -------------- | -------------------------- |
| february-2025-deadline         | ~500           | Prohibited AI practices    |
| annex-iii-categories-explained | ~450           | High-risk Annex III        |
| ai-literacy-article-4          | ~400           | AI literacy training       |
| deployer-obligations-checklist | ~400           | Article 26 deployer duties |
| fria-step-by-step              | ~350           | FRIA walkthrough           |
| ai-inventory-mistakes          | ~350           | Inventory pitfalls         |
| vendor-due-diligence-ai        | ~400           | Vendor questionnaire       |
| transparency-obligations-guide | ~400           | Article 50 transparency    |
| building-oversight-culture     | ~400           | Human oversight culture    |


Each enriched post will include: regulatory article references, practical SME examples, step-by-step guidance, internal links to Klarvo tools/templates, and "What to Do Next" sections.

#### 4. File-level summary

- `src/lib/blogContent.ts` — bulk content enrichment + author/role updates
- `src/pages/marketing/BlogArticle.tsx` — remove date display, clean imports
- `src/pages/marketing/Blog.tsx` — remove dates from hardcoded data, update authors, remove Calendar from cards  
  
add a featured image for all blog posts, do NOT generate any images with words in them.