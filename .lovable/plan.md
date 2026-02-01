

# AI Engine Integration Testing & Enhancement Plan

## Current State Analysis

### What's Already Working (Active in UI)

| Feature | Location | Status |
|---------|----------|--------|
| **Compliance Copilot** | Dashboard.tsx line 319 | Active - Generates AI digest of compliance status |
| **Smart Recommendations** | AISystemDetail.tsx line 738 | Active - AI-powered recommendations panel |
| **AI Help Assistant** | App.tsx - global floating chat | Active - Context-aware streaming chat |
| **Natural Language Intake** | Component built, not integrated | **Not visible to users** |
| **Classification Assistant** | Component built, not integrated | **Not visible to users** |
| **Document Intelligence** | Component built, not integrated | **Not visible to users** |

### Gap Analysis - Missing Integrations

1. **Natural Language Intake** (`NaturalLanguageIntake.tsx`)
   - Component exists and is fully functional
   - **NOT integrated** into the AI System Wizard flow
   - Should appear at Step 0 as an optional "AI Quick Start" option

2. **Classification Assistant** (`ClassificationAssistantPanel.tsx`)
   - Component exists with full Annex III/Article 5 analysis
   - **NOT integrated** into either:
     - ClassificationWizard.tsx (standalone classification)
     - AISystemDetail.tsx (system detail page)

3. **Document Intelligence** (`DocumentIntelligencePanel.tsx`)
   - Component exists with clause extraction and control mapping
   - **NOT integrated** into:
     - Evidence.tsx (Evidence Vault page)
     - ControlEvidenceSection.tsx (per-control evidence)

## Required Integrations

### 1. Natural Language Intake Integration

**Location**: `src/pages/AISystemWizard.tsx` and `Step0ModeSelection.tsx`

**Enhancement**:
- Add a third option on Step 0: "AI-Powered Quick Start"
- When selected, show the NaturalLanguageIntake component
- After extraction, auto-populate wizard fields and skip to a review step
- Maintain existing Quick Capture and Full Assessment options

**User Flow**:
```text
Step 0 Mode Selection
  |
  +-- Quick Capture (existing)
  +-- Full Assessment (existing)
  +-- AI-Powered Quick Start (NEW)
        |
        v
      [NaturalLanguageIntake overlay]
        |
        v
      Preview extracted fields
        |
        v
      "Apply to Wizard" -> Step 1 with pre-filled data
```

### 2. Classification Assistant Integration

**Location**: `src/pages/ClassificationWizard.tsx`

**Enhancement**:
- Add ClassificationAssistantPanel as a sidebar/floating panel
- Available on all 4 classification steps
- Shows AI-suggested classification with confidence
- Users can compare their manual answers with AI suggestion
- "Apply Suggestion" button to auto-fill answers

**Location**: `src/pages/AISystemDetail.tsx`

**Enhancement**:
- Add a collapsed panel below the Classification section
- When system has wizard data but no classification, offer AI assist
- Show "Get AI Classification Suggestion" button

### 3. Document Intelligence Integration

**Location**: `src/pages/Evidence.tsx`

**Enhancement**:
- Add a new tab: "AI Analysis" alongside "All Files", "Approval Queue", "History"
- Or add a button in the upload dialog: "Paste & Analyze with AI"
- When analyzing, auto-suggest evidence type, linked controls, and risk flags

**Location**: Upload Dialog in Evidence.tsx

**Enhancement**:
- Add an expandable section: "Paste document text for AI analysis"
- Show DocumentIntelligencePanel inline
- Auto-populate evidence metadata from analysis results

### 4. Styling & UX Consistency Audit

All AI components should share:
- Gradient background: `bg-gradient-to-br from-primary/5 to-accent/5`
- Sparkles icon for AI features
- "AI-powered" or "AI Copilot" labeling
- Confidence score display with progress bar
- Clear disclaimer: "AI-powered guidance, not legal advice"

**Components to audit for consistency**:
- ComplianceCopilotCard - Uses gradient background
- ClassificationAssistantPanel - Uses gradient background
- DocumentIntelligencePanel - Uses gradient background
- NaturalLanguageIntake - Uses gradient background
- RecommendationsPanel - Uses solid background (needs update)
- AIAssistant - Uses gradient header

### 5. Error Handling & Rate Limit UX

All AI features must handle:
- 429 (Rate Limit): Show toast "Rate limit exceeded. Please try again in a moment."
- 402 (Credits Exhausted): Show toast "AI credits exhausted. Add credits in Settings > Billing."
- Generic errors: Show descriptive error with retry option

**Components to verify**:
- useComplianceCopilot - Has error handling
- useClassificationAssistant - Has error handling
- useDocumentIntelligence - Has error handling
- useAISystemIntake - Has error handling
- useComplianceRecommendations - Needs verification

### 6. Compliance Accuracy Safeguards

Critical for regulatory compliance:

1. **Classification Assistant**:
   - Shows confidence score prominently
   - Lists "ambiguities" that require human review
   - Displays article references for transparency
   - Has "Review Needed" warning when confidence < 70%

2. **Document Intelligence**:
   - Shows "gaps" that need attention
   - Maps to specific control IDs for traceability
   - Lists "risk_flags" explicitly

3. **Compliance Copilot**:
   - Sources recommendations from actual database state
   - Shows EU AI Act deadlines with accurate dates
   - Metrics are calculated from real data, not AI-generated

4. **Natural Language Intake**:
   - Shows extraction confidence score
   - Highlights potential high-risk indicators
   - Allows user to review and edit before applying

## Implementation Priority

| Priority | Task | Impact |
|----------|------|--------|
| **P0** | Integrate NaturalLanguageIntake into AISystemWizard Step0 | High - Major UX improvement for onboarding |
| **P0** | Integrate ClassificationAssistantPanel into ClassificationWizard | High - Helps users with classification decisions |
| **P1** | Integrate DocumentIntelligencePanel into Evidence page | Medium - Streamlines evidence collection |
| **P1** | Add ClassificationAssistant to AISystemDetail page | Medium - Quick classification for existing systems |
| **P2** | Update RecommendationsPanel styling for consistency | Low - Visual polish |
| **P2** | Add comprehensive error boundary for AI failures | Low - Edge case handling |

## Technical Changes Summary

### Files to Modify

1. **`src/components/ai-systems/wizard/steps/Step0ModeSelection.tsx`**
   - Add third "AI-Powered Quick Start" card option
   - Add state for showing NaturalLanguageIntake overlay
   - Import and render NaturalLanguageIntake conditionally

2. **`src/pages/AISystemWizard.tsx`**
   - Handle extracted data from NaturalLanguageIntake
   - Map extracted fields to wizard data structure
   - Skip to appropriate step after extraction

3. **`src/pages/ClassificationWizard.tsx`**
   - Add ClassificationAssistantPanel as collapsible sidebar
   - Pass current system data to the assistant
   - Add "Apply AI Suggestion" functionality

4. **`src/pages/Evidence.tsx`**
   - Add new "AI Analysis" tab or upload enhancement
   - Import and render DocumentIntelligencePanel
   - Wire up analysis results to evidence metadata

5. **`src/pages/AISystemDetail.tsx`**
   - Add ClassificationAssistantPanel for unclassified systems
   - Show in a collapsible card below the classification section

6. **`src/components/recommendations/RecommendationsPanel.tsx`**
   - Update background styling for consistency with other AI components

## Testing Plan

After implementation, verify:

1. **Natural Language Intake Flow**:
   - Describe a chatbot AI system in plain text
   - Verify extracted fields are accurate
   - Apply to wizard and confirm pre-fill

2. **Classification Assistant Flow**:
   - Navigate to ClassificationWizard for a system
   - Click "Get AI Classification"
   - Verify suggested level matches manual assessment
   - Check confidence score and ambiguities

3. **Document Intelligence Flow**:
   - Go to Evidence page
   - Paste a sample vendor contract text
   - Verify key clauses and control mappings
   - Check risk flags are accurate

4. **Compliance Copilot Flow**:
   - Dashboard loads copilot card
   - Click "Generate Digest"
   - Verify metrics match actual database state
   - Check deadline calculations are correct

5. **Error Handling**:
   - Simulate rate limit (rapid requests)
   - Verify toast messages appear
   - Confirm retry functionality works

