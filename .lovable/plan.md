# Klarvo v2.2 Enhancement Plan — Shadow AI Discovery

## Status: Phase 3 Complete ✓

**Started**: 2 Feb 2026  
**Phase 1 Completed**: 2 Feb 2026  
**Phase 3 Completed**: 2 Feb 2026

---

## Overview

Shadow AI Discovery enables organizations to automatically detect AI tools being used across their tech stack by connecting to Google Workspace and Microsoft 365. Detected tools are matched against a known AI services database and presented as draft inventory entries for review.

---

## Architecture

### Data Flow
```
Google Workspace / M365 APIs
         ↓
   Edge Function (oauth-callback, discovery-scan)
         ↓
   AI Tool Pattern Matching Engine
         ↓
   discovered_ai_tools table (draft entries)
         ↓
   Review Queue UI → One-click add to ai_systems
```

### Key Components

| Component | Purpose |
|-----------|---------|
| `workspace_connections` table | Store OAuth tokens + connection status |
| `discovered_ai_tools` table | Detected tools pending review |
| `ai_tool_patterns` table | Known AI services + detection patterns |
| `discovery-scan` edge function | Fetch app data from connected workspaces |
| `DiscoveryDashboard` page | Review queue + bulk actions |

---

## Priority 1: Database Schema

### Tables to Create

**workspace_connections**
- `id` UUID PK
- `organization_id` UUID FK
- `provider` ENUM (google_workspace, microsoft_365)
- `access_token` TEXT (encrypted)
- `refresh_token` TEXT (encrypted)
- `token_expires_at` TIMESTAMP
- `scopes` TEXT[]
- `connected_by` UUID FK profiles
- `connected_at` TIMESTAMP
- `last_scan_at` TIMESTAMP
- `status` ENUM (active, disconnected, error)

**discovered_ai_tools**
- `id` UUID PK
- `organization_id` UUID FK
- `workspace_connection_id` UUID FK
- `tool_name` TEXT
- `vendor_name` TEXT
- `detected_source` TEXT (sso_app, oauth_grant, api_token, etc.)
- `detection_confidence` DECIMAL
- `user_count` INTEGER
- `first_seen_at` TIMESTAMP
- `last_seen_at` TIMESTAMP
- `status` ENUM (pending, reviewed, added_to_inventory, dismissed)
- `ai_system_id` UUID FK (nullable, set when added)
- `metadata` JSONB (raw API data)

**ai_tool_patterns** (seeded reference data)
- `id` UUID PK
- `tool_name` TEXT
- `vendor_name` TEXT
- `detection_patterns` TEXT[] (app names, oauth scopes, domains)
- `category` TEXT (llm, image_gen, code_assist, etc.)
- `is_ai_confirmed` BOOLEAN
- `typical_risk_level` TEXT
- `notes` TEXT

---

## Priority 2: Edge Functions

| Function | Purpose |
|----------|---------|
| `workspace-oauth-init` | Generate OAuth URL for Google/M365 |
| `workspace-oauth-callback` | Handle OAuth callback, store tokens |
| `discovery-scan` | Fetch installed apps from workspace APIs |
| `discovery-match` | Match apps against ai_tool_patterns |

---

## Priority 3: Frontend Components

| Component | Location |
|-----------|----------|
| `WorkspaceConnectionCard` | Settings or dedicated page |
| `DiscoveryDashboard` | New page under AI Systems |
| `DiscoveredToolCard` | Individual tool review card |
| `BulkReviewActions` | Select multiple + add/dismiss |

---

## Implementation Phases

### Phase 1: Database + Patterns ✅
- [x] Create migration for tables
- [x] Seed ai_tool_patterns with 50+ known AI tools
- [x] Add RLS policies

### Phase 2: OAuth Integration ✅
- [x] workspace-oauth-init edge function
- [x] workspace-oauth-callback edge function  
- [x] WorkspaceConnectionCard UI

### Phase 3: Discovery Engine ✅
- [x] discovery-scan edge function (pattern matching)
- [x] discovery-match logic
- [ ] Scheduled re-scans (cron) — future enhancement

### Phase 4: Review UI ✅
- [x] DiscoveryDashboard page
- [x] DiscoveredToolCard component
- [x] One-click "Add to Inventory" flow
- [x] Bulk dismiss/review actions

---

## Known AI Tools to Seed (Initial List)

| Tool | Vendor | Category |
|------|--------|----------|
| ChatGPT | OpenAI | LLM |
| Claude | Anthropic | LLM |
| Gemini | Google | LLM |
| Copilot | Microsoft | Code Assist |
| GitHub Copilot | GitHub | Code Assist |
| Midjourney | Midjourney | Image Gen |
| DALL-E | OpenAI | Image Gen |
| Jasper | Jasper AI | Content |
| Grammarly | Grammarly | Writing |
| Notion AI | Notion | Productivity |
| Fireflies | Fireflies.ai | Meeting |
| Otter.ai | Otter | Meeting |
| HubSpot AI | HubSpot | Sales |
| Salesforce Einstein | Salesforce | Sales |
| Intercom Fin | Intercom | Support |
| Zendesk AI | Zendesk | Support |
| Canva AI | Canva | Design |
| Adobe Firefly | Adobe | Design |
| Loom AI | Loom | Video |
| Descript | Descript | Video |
| Perplexity | Perplexity AI | Search |
| Cursor | Cursor | Code |
| Tabnine | Tabnine | Code |
| Codeium | Codeium | Code |
| Replit AI | Replit | Code |
| v0 | Vercel | Code |
| Lovable | Lovable | Code |
| Zapier AI | Zapier | Automation |
| Make (Integromat) | Make | Automation |
| Typeform AI | Typeform | Forms |
| SurveyMonkey AI | SurveyMonkey | Forms |
| Calendly AI | Calendly | Scheduling |
| Reclaim.ai | Reclaim | Scheduling |
| Motion | Motion | Scheduling |
| Linear AI | Linear | PM |
| Asana AI | Asana | PM |
| Monday AI | Monday | PM |
| ClickUp AI | ClickUp | PM |
| Figma AI | Figma | Design |
| Miro AI | Miro | Whiteboard |
| Slack AI | Slack | Communication |
| Teams Copilot | Microsoft | Communication |
| Zoom AI | Zoom | Video |
| Gong | Gong | Sales Intel |
| Chorus | ZoomInfo | Sales Intel |
| Drift | Salesloft | Chat |
| Qualified | Qualified | Chat |

---

## Addon Gating

This feature is gated by the `shadow_ai_discovery` addon:
- Required plan: Starter or above
- Price: €149/month or €1,490/year

---

## Previous Plan Summary (v2.1)

**Completed**: 2 Feb 2026  
**Final Score**: 94%

All Priority 1 (Security) and Priority 2 (UX) items were implemented:
- RLS hardening on 47 tables
- AI Privacy Settings + kill switches
- Regulatory versioning + banners
- AI classification override tracking
- Control N/A justification workflow
- Audience-specific export packs
- Export eligibility progress indicator
