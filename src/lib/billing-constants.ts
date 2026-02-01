// Billing constants for EU AI Act Compliance Hub

export type PlanId = 'free' | 'starter' | 'growth' | 'pro' | 'enterprise';
export type BillingPeriod = 'monthly' | 'annual';
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'downgraded';
export type AddonId = 
  | 'shadow_ai_discovery' 
  | 'vendor_portal' 
  | 'export_pro_pack' 
  | 'partner_mode'
  | 'importer_distributor'
  | 'provider_track'
  | 'provider_assurance';

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  aiSystemsIncluded: number;
  storageGb: number;
  overageRate: number | null;
  isPublic: boolean;
  trialDays: number;
  features: string[];
  lockedFeatures: string[];
  bestFor: string;
  popular?: boolean;
}

export interface Addon {
  id: AddonId;
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual?: number;
  priceDetails?: string;
  category: 'operator_track' | 'workflow' | 'partner';
  stripePriceIdMonthly?: string;
  stripePriceIdAnnual?: string;
  requiredPlan?: PlanId;
  features?: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  details: string[];
}

export interface PlanEntitlements {
  aiSystemsIncluded: number;
  storageGbIncluded: number;
  watermarkExports: boolean;
  unlimitedUsers: boolean;
  approvalsEnabled: boolean;
  auditorLinksEnabled: boolean;
  policyVersioningEnabled: boolean;
  orgDashboardsEnabled: boolean;
  friaEnabled: boolean;
  incidentsEnabled: boolean;
  integrationsEnabled: boolean;
  apiEnabled: boolean;
  multiWorkspaceEnabled: boolean;
  ssoEnabled: boolean;
  // Note: Provider/Importer/Distributor tracks are NOW controlled via add-ons
  // These legacy flags are kept for backward compatibility but should check addons
  providerTrackEnabled: boolean;
  importerDistributorTrackEnabled: boolean;
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: 'free',
    name: 'Free',
    tagline: 'Getting your first inventory record and seeing the workflow.',
    priceMonthly: 0,
    priceAnnual: 0,
    aiSystemsIncluded: 1,
    storageGb: 1,
    overageRate: null,
    isPublic: true,
    trialDays: 0,
    bestFor: 'Lead gen + tiny teams',
    features: [
      '1 AI system in your inventory',
      'Quick intake wizard + basic classification memo',
      'Prohibited practices screening checklist',
      'Transparency screening checklist',
      'Evidence vault (1 GB)',
      'Watermarked exports (PDF/ZIP)',
    ],
    lockedFeatures: [
      'Org-wide dashboards',
      'Approvals/sign-off workflow',
      'Auditor share links',
      'Unlimited exports',
      'Market access tracks (Provider, Importer, Distributor)',
    ],
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    tagline: 'Everything you need to get organised and export evidence packs.',
    priceMonthly: 149,
    priceAnnual: 1490,
    aiSystemsIncluded: 10,
    storageGb: 50,
    overageRate: 12,
    isPublic: true,
    trialDays: 0,
    bestFor: 'Most SMEs getting compliant',
    features: [
      'Up to 10 AI systems',
      'Unlimited users',
      'Full AI system intake + classification memo + audit trail',
      'Obligations checklist + gap checklist',
      'Control Library v1 + task plan by owner',
      'Evidence vault (up to 50 GB)',
      'Templates: AI acceptable use, oversight plan, disclosure copy, vendor checklist',
      'Unlimited PDF exports + ZIP evidence packs (no watermark)',
      'Email reminders',
    ],
    lockedFeatures: [
      'Approvals/signatures',
      'Auditor portal',
      'API/integrations',
      'Market access tracks (add-on available)',
    ],
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    tagline: 'The best plan for teams managing AI across departments.',
    priceMonthly: 349,
    priceAnnual: 3490,
    aiSystemsIncluded: 25,
    storageGb: 250,
    overageRate: 9,
    isPublic: true,
    trialDays: 14,
    bestFor: 'Teams with multiple tools/use-cases',
    popular: true,
    features: [
      'Up to 25 AI systems',
      'Everything in Starter, plus:',
      'Evidence approvals (review/approve policies + evidence)',
      'Version history for policies and memos',
      'Org dashboards: readiness score, upcoming reviews, expiring evidence',
      'Vendor renewal reminders + evidence requests',
      'Auditor-friendly share links (read-only export access)',
      'Evidence vault (up to 250 GB)',
      'Market access add-ons available (Importer/Distributor, Provider)',
    ],
    lockedFeatures: [
      'FRIA module',
      'Incidents/monitoring',
      'API/integrations',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    tagline: 'For high scrutiny, high scale, and audit-ready operations.',
    priceMonthly: 749,
    priceAnnual: 7490,
    aiSystemsIncluded: 100,
    storageGb: 1000,
    overageRate: 6,
    isPublic: true,
    trialDays: 0,
    bestFor: 'Regulated / high scrutiny / scaling',
    features: [
      'Up to 100 AI systems',
      'Everything in Growth, plus:',
      'FRIA module + FRIA report exports (when required)',
      'Incident register + monitoring events + change triggers',
      'Advanced reporting (portfolio risk, control coverage, overdue owners)',
      'Integrations pack (Jira/Asana sync and/or evidence email ingestion)',
      'API access (basic)',
      'Evidence vault (up to 1 TB)',
      'All market access add-ons available',
    ],
    lockedFeatures: [],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For multi-entity organisations and procurement requirements.',
    priceMonthly: 0, // Custom
    priceAnnual: 15000, // Floor
    aiSystemsIncluded: Infinity,
    storageGb: Infinity,
    overageRate: null,
    isPublic: true,
    trialDays: 0,
    bestFor: 'Multi-entity, procurement, deep controls',
    features: [
      'Unlimited AI systems',
      'Multi-workspace / subsidiaries',
      'SSO (SAML/OIDC) + SCIM',
      'Data residency options',
      'Custom controls & templates',
      'Dedicated onboarding + SLA support',
      'All market access tracks included',
    ],
    lockedFeatures: [],
  },
};

export const PLAN_ENTITLEMENTS: Record<PlanId, PlanEntitlements> = {
  free: {
    aiSystemsIncluded: 1,
    storageGbIncluded: 1,
    watermarkExports: true,
    unlimitedUsers: false,
    approvalsEnabled: false,
    auditorLinksEnabled: false,
    policyVersioningEnabled: false,
    orgDashboardsEnabled: false,
    friaEnabled: false,
    incidentsEnabled: false,
    integrationsEnabled: false,
    apiEnabled: false,
    multiWorkspaceEnabled: false,
    ssoEnabled: false,
    providerTrackEnabled: false,
    importerDistributorTrackEnabled: false,
  },
  starter: {
    aiSystemsIncluded: 10,
    storageGbIncluded: 50,
    watermarkExports: false,
    unlimitedUsers: true,
    approvalsEnabled: false,
    auditorLinksEnabled: false,
    policyVersioningEnabled: false,
    orgDashboardsEnabled: false,
    friaEnabled: false,
    incidentsEnabled: false,
    integrationsEnabled: false,
    apiEnabled: false,
    multiWorkspaceEnabled: false,
    ssoEnabled: false,
    // Starter can purchase add-ons but doesn't have them by default
    providerTrackEnabled: false,
    importerDistributorTrackEnabled: false,
  },
  growth: {
    aiSystemsIncluded: 25,
    storageGbIncluded: 250,
    watermarkExports: false,
    unlimitedUsers: true,
    approvalsEnabled: true,
    auditorLinksEnabled: true,
    policyVersioningEnabled: true,
    orgDashboardsEnabled: true,
    friaEnabled: false,
    incidentsEnabled: false,
    integrationsEnabled: false,
    apiEnabled: false,
    multiWorkspaceEnabled: false,
    ssoEnabled: false,
    // Growth can purchase add-ons but doesn't have them by default
    providerTrackEnabled: false,
    importerDistributorTrackEnabled: false,
  },
  pro: {
    aiSystemsIncluded: 100,
    storageGbIncluded: 1000,
    watermarkExports: false,
    unlimitedUsers: true,
    approvalsEnabled: true,
    auditorLinksEnabled: true,
    policyVersioningEnabled: true,
    orgDashboardsEnabled: true,
    friaEnabled: true,
    incidentsEnabled: true,
    integrationsEnabled: true,
    apiEnabled: true,
    multiWorkspaceEnabled: false,
    ssoEnabled: false,
    // Pro can purchase add-ons but doesn't have them by default
    providerTrackEnabled: false,
    importerDistributorTrackEnabled: false,
  },
  enterprise: {
    aiSystemsIncluded: Infinity,
    storageGbIncluded: Infinity,
    watermarkExports: false,
    unlimitedUsers: true,
    approvalsEnabled: true,
    auditorLinksEnabled: true,
    policyVersioningEnabled: true,
    orgDashboardsEnabled: true,
    friaEnabled: true,
    incidentsEnabled: true,
    integrationsEnabled: true,
    apiEnabled: true,
    multiWorkspaceEnabled: true,
    ssoEnabled: true,
    // Enterprise includes all tracks by default
    providerTrackEnabled: true,
    importerDistributorTrackEnabled: true,
  },
};

// ============================================================================
// OPERATOR TRACK ADD-ONS (Market Access)
// These are purchasable modules for Provider, Importer, and Distributor roles
// ============================================================================

export const OPERATOR_TRACK_ADDONS: Addon[] = [
  {
    id: 'importer_distributor',
    name: 'Importer & Distributor Track',
    description: 'Verification checklists, supplier due diligence workflows, and evidence packs for importers and distributors placing AI systems on the EU market.',
    priceMonthly: 149,
    priceAnnual: 1490,
    category: 'operator_track',
    requiredPlan: 'starter',
    features: [
      'Importer verification checklist (Article 23)',
      'Distributor verification checklist (Article 24)',
      'Supplier due diligence workflows',
      'Market placement evidence packs',
      'Authorized representative tracking',
      'Conformity documentation verification',
    ],
  },
  {
    id: 'provider_track',
    name: 'Provider Track',
    description: 'Full conformity assessment workflows, technical documentation (Annex IV), EU database registration, and CE marking for AI system providers.',
    priceMonthly: 499,
    priceAnnual: 4990,
    category: 'operator_track',
    requiredPlan: 'growth',
    features: [
      'Everything in Importer & Distributor Track',
      'Risk Management System (Article 9)',
      'Technical Documentation Builder (Annex IV)',
      'Data Governance workflows (Article 10)',
      'Conformity Assessment Board',
      'EU Declaration of Conformity generator',
      'CE Marking checklist',
      'EU Database registration wizard',
      'QMS document library',
      'Post-market monitoring plan builder',
      'Serious incident reporting (Article 73)',
      'Substantial modification detection (Article 25)',
    ],
  },
  {
    id: 'provider_assurance',
    name: 'Provider Assurance Bundle',
    description: 'Premium provider package with Notified Body coordination, advanced monitoring dashboards, and priority support for high-risk AI providers.',
    priceMonthly: 899,
    priceAnnual: 8990,
    category: 'operator_track',
    requiredPlan: 'pro',
    features: [
      'Everything in Provider Track',
      'Notified Body coordination workspace',
      'Advanced monitoring dashboards',
      'Multi-version conformity tracking',
      'Corrective action management',
      'Certificate expiry tracking',
      'Priority support channel',
      'Quarterly compliance review calls',
    ],
  },
];

// ============================================================================
// WORKFLOW & UTILITY ADD-ONS
// ============================================================================

export const WORKFLOW_ADDONS: Addon[] = [
  {
    id: 'shadow_ai_discovery',
    name: 'Shadow AI Discovery',
    description: 'Automatically draft inventory entries from your app list (SSO/M365/Workspace exports). Reduce manual discovery.',
    priceMonthly: 149,
    priceAnnual: 1490,
    category: 'workflow',
    requiredPlan: 'starter',
    features: [
      'SSO/M365/Google Workspace integration',
      'Auto-detect AI tools in your stack',
      'Draft inventory entries automatically',
      'Periodic re-scans',
    ],
  },
  {
    id: 'vendor_portal',
    name: 'Vendor Portal',
    description: 'Let vendors upload AI docs, attestations, and incident contacts directly into your evidence vault.',
    priceMonthly: 199,
    priceAnnual: 1990,
    category: 'workflow',
    requiredPlan: 'growth',
    features: [
      'Vendor self-service uploads',
      'Attestation request workflows',
      'Document expiry tracking',
      'Vendor compliance scoring',
    ],
  },
  {
    id: 'export_pro_pack',
    name: 'Export Pro Pack',
    description: 'Branded exports, enhanced evidence index formats, and auditor-ready "one-click" bundles.',
    priceMonthly: 99,
    priceAnnual: 990,
    category: 'workflow',
    requiredPlan: 'starter',
    features: [
      'Custom branding on exports',
      'Enhanced evidence index',
      'One-click auditor bundles',
      'White-label options',
    ],
  },
];

// ============================================================================
// PARTNER ADD-ONS
// ============================================================================

export const PARTNER_ADDONS: Addon[] = [
  {
    id: 'partner_mode',
    name: 'Partner Mode',
    description: 'For consultants/agencies managing multiple client workspaces with separate vaults and cross-client dashboards.',
    priceMonthly: 299,
    priceAnnual: 2990,
    priceDetails: '+ €49/client workspace/mo',
    category: 'partner',
    requiredPlan: 'growth',
    features: [
      'Multi-client dashboard',
      'Separate evidence vaults per client',
      'Cross-client reporting',
      'Client onboarding templates',
      'White-label client portals',
    ],
  },
];

// Combined addons for backward compatibility
export const ADDONS: Addon[] = [
  ...OPERATOR_TRACK_ADDONS,
  ...WORKFLOW_ADDONS,
  ...PARTNER_ADDONS,
];

// Helper to get addon by ID
export function getAddonById(id: AddonId): Addon | undefined {
  return ADDONS.find(addon => addon.id === id);
}

// Helper to check if an addon requires a higher plan
export function addonRequiresPlan(addonId: AddonId, currentPlan: PlanId): boolean {
  const addon = getAddonById(addonId);
  if (!addon || !addon.requiredPlan) return false;
  
  const planOrder: PlanId[] = ['free', 'starter', 'growth', 'pro', 'enterprise'];
  const currentIndex = planOrder.indexOf(currentPlan);
  const requiredIndex = planOrder.indexOf(addon.requiredPlan);
  
  return currentIndex < requiredIndex;
}

// Helper to get available addons for a plan
export function getAvailableAddons(planId: PlanId): Addon[] {
  const planOrder: PlanId[] = ['free', 'starter', 'growth', 'pro', 'enterprise'];
  const currentIndex = planOrder.indexOf(planId);
  
  return ADDONS.filter(addon => {
    if (!addon.requiredPlan) return true;
    const requiredIndex = planOrder.indexOf(addon.requiredPlan);
    return currentIndex >= requiredIndex;
  });
}

export const SERVICES: Service[] = [
  {
    id: 'kickstart_setup',
    name: 'Kickstart Setup',
    description: 'We configure your workspace, import your first systems, and help generate your first evidence packs.',
    price: 'from €1,500',
    details: [
      'Set up workspace',
      'Configure your controls library',
      'Import 5–10 AI systems from spreadsheet',
      'First evidence pack export delivered',
    ],
  },
  {
    id: 'compliance_sprint',
    name: 'Compliance Sprint',
    description: 'A focused 2-week sprint to go from scattered docs to a clean inventory, classification, and export-ready evidence.',
    price: 'from €3,500',
    details: [
      'Review classification + gap checklist for up to 10 systems',
      'Produce "ready for audit" evidence pack structure',
      'Operator training run-through',
    ],
  },
  {
    id: 'quarterly_review',
    name: 'Quarterly Governance Review',
    description: 'Keep everything current: evidence refresh, changes review, and a board-ready governance report.',
    price: '€1,200/quarter',
    details: [
      'Review changes',
      'Update evidence expiries',
      'Produce board-ready report',
    ],
  },
];

export const INCLUDED_IN_ALL_PAID: string[] = [
  'Unlimited users',
  'Audit-ready PDF and ZIP exports',
  'Control library + gap checklist + task planning',
  'Policy and disclosure templates',
  'Regulatory template updates as guidance evolves',
  'Secure evidence vault + audit logs',
  'Cancel anytime (monthly) / keep access through your term (annual)',
];

export const FAQS = [
  {
    question: 'What counts as an "AI system"?',
    answer: 'An AI system is one distinct AI use-case that needs its own classification, controls, and evidence pack. If the same tool is used for different purposes (e.g., HR screening and credit decisions), that\'s typically more than one AI system.',
  },
  {
    question: 'Do you charge per user?',
    answer: 'No. Paid plans include unlimited users because compliance requires cross-functional collaboration.',
  },
  {
    question: 'What\'s included in the 14-day trial?',
    answer: 'You get full Growth features for 14 days so you can complete an end-to-end workflow: add systems, classify, upload evidence, and export packs.',
  },
  {
    question: 'What happens when the trial ends?',
    answer: 'If you don\'t upgrade, your workspace moves to Free. You keep your data, but premium actions (like unlimited exports, approvals, auditor links) become locked until you upgrade.',
  },
  {
    question: 'Can I export everything for an auditor or customer due diligence?',
    answer: 'Yes. Paid plans include audit-ready PDF and ZIP evidence packs, plus an evidence index so reviewers can quickly verify artifacts.',
  },
  {
    question: 'Do you provide legal advice?',
    answer: 'No. The platform helps you organise workflows, evidence, and templates. For legal interpretation, you should consult qualified counsel.',
  },
  {
    question: 'We only use AI internally (e.g., LLM tools). Do we still need this?',
    answer: 'Most teams start here. Even internal AI use benefits from an inventory, policy coverage, training logs, and evidence packs—especially when customers ask how you govern AI.',
  },
  {
    question: 'We don\'t think we have any "high-risk" AI. Is this still useful?',
    answer: 'Yes. Many obligations are about governance, transparency, and operational discipline. You also get a defensible record showing you assessed and classified your use-cases.',
  },
  {
    question: 'Can we start small and expand later?',
    answer: 'Yes. Start with a few systems, then add more AI systems via overages or upgrade.',
  },
  {
    question: 'Can we delete our data?',
    answer: 'Yes. You can export your records and request deletion in line with your contract terms.',
  },
  {
    question: 'Do you support SSO?',
    answer: 'SSO is included in Enterprise (and can be offered as an add-on if you want). Most SMEs start without it.',
  },
  {
    question: 'Is there a discount for annual billing?',
    answer: 'Yes—annual plans include ~2 months free.',
  },
  {
    question: 'Do retired systems count toward limits?',
    answer: 'No. Only active systems count (Draft, Pilot, Live). Retired/Archived systems don\'t.',
  },
  {
    question: 'Can we manage multiple companies or subsidiaries?',
    answer: 'That\'s Enterprise (multi-workspace). Partner Mode is available for consultants/agencies managing multiple client workspaces.',
  },
  {
    question: 'What security measures do you have?',
    answer: 'We maintain audit logs and secure evidence storage. Enterprise customers can request additional security documentation during procurement.',
  },
  {
    question: 'What are the Provider, Importer, and Distributor tracks?',
    answer: 'These are add-on modules for organisations with specific EU AI Act roles. Importer/Distributor Track covers verification checklists for market access. Provider Track includes full conformity assessment, technical documentation, and CE marking workflows.',
  },
];

export const OBJECTION_HANDLING = [
  {
    objection: '"We\'re too small for this."',
    response: 'Start Free and inventory your first AI use-case in minutes. Most small teams upgrade when they need watermark-free exports, approvals, or multi-system visibility.',
  },
  {
    objection: '"We already have ISO/SOC2 compliance tooling."',
    response: 'Great—this complements it. Those platforms rarely give you an AI-system-level inventory, classification rationale, and AI-specific evidence packs in one place.',
  },
  {
    objection: '"We\'re not sure if we\'re in scope."',
    response: 'That\'s exactly why the tool exists. Run the intake wizard, record your reasoning, and generate a defensible memo for each use-case.',
  },
  {
    objection: '"We don\'t want another complex compliance platform."',
    response: 'This is intentionally SME-first: guided workflows, simple dashboards, and exports that make audits faster—not another giant GRC suite.',
  },
  {
    objection: '"We need to show customers we\'re safe."',
    response: 'Send your auditor/customer an evidence pack with an index: inventory summary, classification memo, policies, training evidence, and monitoring/incident history—ready for procurement.',
  },
];

// Upgrade modal copy for each locked feature
export const UPGRADE_MODAL_COPY: Record<string, { title: string; bullets: string[]; recommendedPlan: PlanId; addon?: AddonId }> = {
  approvals: {
    title: 'Unlock Approvals Workflow',
    bullets: [
      'Get sign-offs on policies and evidence',
      'Assign reviewers and track approval status',
      'Build an audit trail of who approved what',
    ],
    recommendedPlan: 'growth',
  },
  auditor_links: {
    title: 'Share with Auditors',
    bullets: [
      'Create read-only links for external auditors',
      'Control access with expiring links',
      'Show procurement teams you\'re audit-ready',
    ],
    recommendedPlan: 'growth',
  },
  fria: {
    title: 'Unlock FRIA Workflow',
    bullets: [
      'Complete Fundamental Rights Impact Assessments',
      'Generate FRIA reports for high-risk systems',
      'Meet Article 27 requirements with guided workflows',
    ],
    recommendedPlan: 'pro',
  },
  watermark_removal: {
    title: 'Remove Export Watermarks',
    bullets: [
      'Professional, clean exports without branding',
      'Unlimited PDF and ZIP evidence packs',
      'Share polished documents with stakeholders',
    ],
    recommendedPlan: 'starter',
  },
  integrations: {
    title: 'Unlock Integrations',
    bullets: [
      'Sync tasks with Jira or Asana',
      'Forward evidence via email to your vault',
      'Connect your existing workflows',
    ],
    recommendedPlan: 'pro',
  },
  api_access: {
    title: 'Enable API Access',
    bullets: [
      'Programmatic access to your compliance data',
      'Build custom integrations',
      'Automate data synchronisation',
    ],
    recommendedPlan: 'pro',
  },
  incidents: {
    title: 'Unlock Incident Management',
    bullets: [
      'Track AI-related incidents and monitoring events',
      'Document containment actions and postmortems',
      'Trigger re-assessments on material changes',
    ],
    recommendedPlan: 'pro',
  },
  ai_system_limit: {
    title: 'Add More AI Systems',
    bullets: [
      'Track more AI use-cases across your organisation',
      'Complete classification for each system',
      'Generate evidence packs for every AI tool',
    ],
    recommendedPlan: 'growth',
  },
  storage_limit: {
    title: 'Expand Your Evidence Vault',
    bullets: [
      'Store more policies, screenshots, and vendor docs',
      'Keep comprehensive evidence for audits',
      'Never run out of space for compliance artifacts',
    ],
    recommendedPlan: 'growth',
  },
  importer_distributor_track: {
    title: 'Unlock Importer & Distributor Track',
    bullets: [
      'Article 23 & 24 verification checklists',
      'Supplier due diligence workflows',
      'Market placement evidence packs',
      'Authorized representative tracking',
    ],
    recommendedPlan: 'starter',
    addon: 'importer_distributor',
  },
  provider_track: {
    title: 'Unlock Provider Track',
    bullets: [
      'Full conformity assessment workflows',
      'Technical documentation builder (Annex IV)',
      'EU Declaration of Conformity & CE Marking',
      'EU Database registration wizard',
      'Post-market monitoring & serious incident reporting',
    ],
    recommendedPlan: 'growth',
    addon: 'provider_track',
  },
  provider_assurance: {
    title: 'Unlock Provider Assurance Bundle',
    bullets: [
      'Everything in Provider Track, plus:',
      'Notified Body coordination workspace',
      'Advanced monitoring dashboards',
      'Priority support & quarterly reviews',
    ],
    recommendedPlan: 'pro',
    addon: 'provider_assurance',
  },
};

// Storage add-on pricing
export const STORAGE_ADDONS = [
  { gb: 100, priceMonthly: 29 },
  { gb: 500, priceMonthly: 99 },
];

// Trial configuration
export const TRIAL_CONFIG = {
  durationDays: 14,
  plan: 'growth' as PlanId,
  checklist: [
    { id: 'add_systems', label: 'Add 3 AI systems', target: 3 },
    { id: 'complete_classification', label: 'Complete classification for 1', target: 1 },
    { id: 'upload_evidence', label: 'Upload 5 evidence files', target: 5 },
    { id: 'export_pack', label: 'Export an evidence pack', target: 1 },
  ],
  warningDaysBefore: 3,
};
