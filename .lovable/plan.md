
# Smart Compliance Recommendations Engine - Implementation Plan

## Overview
Build an AI-powered recommendation system that analyzes each AI system's compliance profile, identifies gaps, suggests prioritized next steps, and provides personalized remediation paths. The engine will use the existing gap analysis infrastructure combined with a new AI-powered suggestion layer.

## Architecture

```text
+---------------------------+     +----------------------------+
|  AI System Profile        |     |  Organization Context      |
|  - Classification         |     |  - Industry                |
|  - Controls Status        |     |  - Team Size               |
|  - Evidence Files         |     |  - Plan/Entitlements       |
|  - Tasks                  |     |  - Active Systems          |
+---------------------------+     +----------------------------+
            |                                   |
            v                                   v
+-----------------------------------------------------------+
|              Recommendation Engine (Edge Function)         |
|  - Aggregates compliance data                             |
|  - Analyzes gaps and patterns                             |
|  - Calls Lovable AI for smart prioritization              |
|  - Returns structured recommendations                     |
+-----------------------------------------------------------+
            |
            v
+-----------------------------------------------------------+
|              Frontend Components                           |
|  - RecommendationsPanel (AI System Detail page)           |
|  - DashboardRecommendations (Dashboard overview)          |
|  - Quick Action Cards (one-click task creation)           |
+-----------------------------------------------------------+
```

## Implementation Components

### 1. Database Schema Extension
Create a table to cache AI-generated recommendations for performance and audit purposes.

**New table: `compliance_recommendations`**
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| organization_id | uuid | FK to organizations |
| ai_system_id | uuid | FK to ai_systems (nullable for org-wide) |
| recommendation_type | text | gap_remediation, control_suggestion, next_step, risk_mitigation |
| priority | integer | 1-5 priority ranking |
| title | text | Short recommendation title |
| description | text | Detailed explanation |
| action_type | text | task, evidence, control, classification, fria |
| action_path | text | Navigation path for quick action |
| action_payload | jsonb | Structured data for auto-creating tasks |
| confidence_score | decimal | AI confidence (0.0-1.0) |
| is_dismissed | boolean | User dismissed this recommendation |
| generated_at | timestamp | When generated |
| expires_at | timestamp | Recommendation validity window |
| created_at | timestamp | Record creation |

### 2. Edge Function: `compliance-recommendations`
A new edge function that aggregates system data and generates smart recommendations.

**Inputs:**
- `ai_system_id` (optional): Get recommendations for a specific system
- `scope`: "system" | "organization" - scope of analysis
- `regenerate`: boolean - force fresh generation vs. cached

**Processing Logic:**
1. Fetch AI system(s) with classifications, controls, evidence, tasks
2. Build a structured profile including:
   - Risk level and high-risk categories
   - Control implementation percentages by category
   - Evidence coverage and approval rates
   - Overdue/pending tasks
   - FRIA status (if applicable)
   - Transparency obligations status
3. Call Lovable AI Gateway with structured tool calling to generate:
   - Prioritized list of 5-10 recommendations
   - Each with: title, description, priority, action_type, confidence
4. Store recommendations in database
5. Return recommendations to client

**AI Prompt Strategy:**
Use tool calling to ensure structured output:
```typescript
{
  tools: [{
    type: "function",
    function: {
      name: "generate_recommendations",
      description: "Generate prioritized compliance recommendations",
      parameters: {
        type: "object",
        properties: {
          recommendations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                priority: { type: "integer", minimum: 1, maximum: 5 },
                action_type: { type: "string", enum: [...] },
                rationale: { type: "string" },
                confidence: { type: "number" }
              }
            }
          }
        }
      }
    }
  }],
  tool_choice: { type: "function", function: { name: "generate_recommendations" } }
}
```

### 3. React Hook: `useComplianceRecommendations`
Custom hook to fetch and manage recommendations.

**Features:**
- Fetch recommendations for a system or organization
- Trigger regeneration on demand
- Handle dismissal (hide specific recommendations)
- Track loading/error states
- One-click task creation from recommendations

**Interface:**
```typescript
interface Recommendation {
  id: string;
  priority: number;
  title: string;
  description: string;
  action_type: 'task' | 'evidence' | 'control' | 'classification' | 'fria';
  action_path?: string;
  action_payload?: object;
  confidence_score: number;
  is_dismissed: boolean;
}

function useComplianceRecommendations(aiSystemId?: string): {
  recommendations: Recommendation[];
  isLoading: boolean;
  isGenerating: boolean;
  error: Error | null;
  regenerate: () => void;
  dismiss: (id: string) => void;
  createTaskFromRecommendation: (id: string) => void;
}
```

### 4. UI Components

#### a) `RecommendationsPanel` (for AI System Detail page)
A collapsible card showing AI-powered recommendations for that system.

**Features:**
- Displays 3-5 prioritized recommendations
- Priority badges (Critical, High, Medium, Low)
- One-click actions: "Create Task", "Go to Control", "Upload Evidence"
- "Regenerate" button to get fresh analysis
- Dismiss individual recommendations
- Loading skeleton during generation
- Streaming indicator when AI is analyzing

**Placement:** AI System Detail page, below Gap Checklist

#### b) `DashboardRecommendationsCard` (for Dashboard)
Organization-wide recommendations overview.

**Features:**
- Top 3-5 recommendations across all systems
- "View All" link to dedicated recommendations page (future)
- Quick stats: X recommendations across Y systems
- Links to specific systems needing attention

**Placement:** Dashboard, in the main content area

#### c) `RecommendationActionButton`
Reusable component for executing recommendation actions.

**Actions supported:**
- Create task with pre-filled data
- Navigate to classification wizard
- Navigate to evidence upload
- Navigate to control detail
- Start FRIA wizard

### 5. Integration Points

#### AI System Detail Page (`AISystemDetail.tsx`)
Add RecommendationsPanel after the Gap Checklist section:
```tsx
<GapChecklist systemId={id} />
<RecommendationsPanel aiSystemId={id} />
```

#### Dashboard (`Dashboard.tsx`)
Add DashboardRecommendationsCard in the alerts section:
```tsx
<div className="lg:col-span-2">
  <ComplianceAlerts />
</div>
<DashboardRecommendationsCard />
```

### 6. Feature Gating
Recommendations engine will be available based on plan:

| Plan | Access |
|------|--------|
| Free | No access |
| Starter | 3 recommendations per system, basic priority |
| Growth | Full recommendations, regeneration |
| Pro/Enterprise | Full + organization-wide insights |

Add to `billing-constants.ts`:
```typescript
recommendationsEnabled: boolean;
recommendationsLimit: number;
```

## Technical Details

### Edge Function Implementation
Location: `supabase/functions/compliance-recommendations/index.ts`

The function will:
1. Validate user authentication
2. Fetch organization_id from the profile
3. Query the AI system(s) with related data
4. Check for cached valid recommendations (< 24 hours old)
5. If regenerate=true or no cache, call Lovable AI
6. Upsert recommendations to the database
7. Return formatted recommendations

### Caching Strategy
- Recommendations cached for 24 hours by default
- Auto-invalidate when: classification changes, controls updated, evidence uploaded
- Manual regenerate button for on-demand refresh
- Rate limit: 10 regenerations per system per day

### AI Model Selection
Use `google/gemini-3-flash-preview` for fast response times while maintaining quality recommendations.

## File Changes Summary

### New Files
1. `supabase/functions/compliance-recommendations/index.ts` - Edge function
2. `src/hooks/useComplianceRecommendations.ts` - React hook
3. `src/components/recommendations/RecommendationsPanel.tsx` - System-level panel
4. `src/components/recommendations/DashboardRecommendationsCard.tsx` - Dashboard card
5. `src/components/recommendations/RecommendationCard.tsx` - Individual recommendation
6. `src/components/recommendations/RecommendationActionButton.tsx` - Action buttons
7. `src/components/recommendations/index.ts` - Barrel export

### Modified Files
1. `src/pages/AISystemDetail.tsx` - Add RecommendationsPanel
2. `src/pages/Dashboard.tsx` - Add DashboardRecommendationsCard
3. `src/lib/billing-constants.ts` - Add recommendation entitlements
4. `supabase/config.toml` - Register new edge function

### Database Migration
1. Create `compliance_recommendations` table
2. Add RLS policies for organization-scoped access
3. Add indexes for ai_system_id and organization_id

## Success Criteria
1. Users see relevant, actionable recommendations on AI system pages
2. Recommendations are properly prioritized based on risk and urgency
3. One-click actions work to create tasks, navigate to relevant pages
4. Dashboard shows organization-wide compliance insights
5. Feature properly gated by subscription plan
6. Recommendations refresh automatically on relevant changes

## Future Enhancements (Not in Scope)
- Dedicated recommendations page with filtering
- Email digest of weekly recommendations
- Cross-framework mapping suggestions
- Trend analysis and prediction
- Team performance insights
