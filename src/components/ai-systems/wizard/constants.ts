import type { WizardStep } from "./types";

export const DEPARTMENTS = [
  "Customer Service",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "IT / Technology",
  "Legal",
  "Product",
  "Research & Development",
  "Other",
];

export const DEPLOYMENT_REGIONS = [
  { value: "eu", label: "European Union" },
  { value: "uk", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "other", label: "Other" },
];

export const EU_COUNTRIES = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
  "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
  "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden",
];

export const INTERNAL_USER_GROUPS = [
  { value: "employees", label: "Employees" },
  { value: "hr", label: "HR Team" },
  { value: "sales", label: "Sales Team" },
  { value: "support", label: "Support Team" },
  { value: "operations", label: "Operations" },
  { value: "engineering", label: "Engineering" },
  { value: "other", label: "Other" },
];

export const AFFECTED_GROUPS = [
  { value: "customers", label: "Customers" },
  { value: "employees", label: "Employees" },
  { value: "candidates", label: "Job Candidates" },
  { value: "students", label: "Students" },
  { value: "patients", label: "Patients" },
  { value: "public", label: "General Public" },
  { value: "other", label: "Other" },
];

export const BUILT_INTERNALLY_OPTIONS = [
  { value: "fully", label: "Fully in-house" },
  { value: "partially", label: "Partially (with external components)" },
  { value: "external", label: "Not built by us (external)" },
];

export const ACQUISITION_METHODS = [
  { value: "saas", label: "SaaS Tool" },
  { value: "api", label: "API / Model Provider" },
  { value: "opensource", label: "Open-source Model" },
  { value: "contractor", label: "Contractor-built" },
  { value: "other", label: "Other" },
];

export const VALUE_CHAIN_ROLES = [
  { value: "deployer", label: "Deployer (we use it)" },
  { value: "provider", label: "Provider (we build/sell it)" },
  { value: "importer", label: "Importer" },
  { value: "distributor", label: "Distributor" },
  { value: "unsure", label: "Unsure" },
];

export const YES_NO_UNSURE = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Unsure" },
];

export const YES_NO_UNKNOWN = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unknown", label: "Unknown" },
];

export const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const OUTPUT_TYPES = [
  { value: "predictions", label: "Predictions" },
  { value: "recommendations", label: "Recommendations" },
  { value: "decisions", label: "Decisions" },
  { value: "classifications", label: "Classifications" },
  { value: "generated_content", label: "Generated Content" },
  { value: "scores", label: "Scores" },
  { value: "other", label: "Other" },
];

export const TECHNICAL_APPROACHES = [
  { value: "ml", label: "Machine Learning" },
  { value: "deep_learning", label: "Deep Learning" },
  { value: "llm", label: "Large Language Model (LLM)" },
  { value: "statistical", label: "Statistical Model" },
  { value: "rules", label: "Rules/Logic-based" },
  { value: "optimization", label: "Optimization" },
  { value: "unknown", label: "Unknown" },
];

export const AI_DEFINITION_RESULTS = [
  { value: "likely_ai", label: "Likely an AI System" },
  { value: "likely_not", label: "Likely NOT an AI System" },
  { value: "needs_review", label: "Needs Review" },
];

export const CONFIDENCE_LEVELS = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export const PURPOSE_CATEGORIES = [
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
  { value: "customer_support", label: "Customer Support" },
  { value: "marketing", label: "Marketing" },
  { value: "security", label: "Security" },
  { value: "operations", label: "Operations" },
  { value: "product", label: "Product Feature" },
  { value: "other", label: "Other" },
];

export const OUTPUT_ACTION_TYPES = [
  { value: "recommend", label: "Recommend" },
  { value: "decide", label: "Decide" },
  { value: "automate", label: "Automate Action" },
  { value: "generate", label: "Generate Content" },
  { value: "other", label: "Other" },
];

export const OUTPUT_DESTINATIONS = [
  { value: "dashboard", label: "Internal Dashboard" },
  { value: "customer_ui", label: "Customer UI" },
  { value: "email", label: "Email" },
  { value: "api", label: "API" },
  { value: "reports", label: "Reports" },
  { value: "other", label: "Other" },
];

export const HUMAN_INVOLVEMENT_OPTIONS = [
  { value: "hitl", label: "Human-in-the-loop (human must approve)" },
  { value: "hotl", label: "Human-on-the-loop (human monitors, can intervene)" },
  { value: "hootl", label: "Human-out-of-the-loop (fully automated)" },
];

export const USAGE_FREQUENCIES = [
  { value: "continuous", label: "Continuous" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "adhoc", label: "Ad hoc" },
];

export const PROHIBITED_SCREENING_RESULTS = [
  { value: "no_indicators", label: "No prohibited indicators found" },
  { value: "potential_prohibited", label: "Potential prohibited practice (Stop & escalate)" },
  { value: "needs_review", label: "Needs legal review" },
];

export const HIGHRISK_SCREENING_RESULTS = [
  { value: "not_high_risk", label: "Not high-risk based on screening" },
  { value: "high_risk_annex_iii", label: "Potential high-risk (Annex III)" },
  { value: "high_risk_product", label: "Potential high-risk (regulated product safety component)" },
  { value: "needs_review", label: "Needs review" },
];

export const TRANSPARENCY_STATUS_OPTIONS = [
  { value: "not_applicable", label: "Not applicable" },
  { value: "implemented", label: "Applicable — implemented" },
  { value: "gaps_exist", label: "Applicable — gaps exist" },
];

export const DATA_SOURCES = [
  { value: "user_provided", label: "User provided" },
  { value: "internal_systems", label: "Internal systems" },
  { value: "third_party", label: "Third-party datasets" },
  { value: "public_web", label: "Public web" },
  { value: "other", label: "Other" },
];

export const DATA_CONTROL_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "partly", label: "Partly" },
];

export const RETENTION_PERIODS = [
  { value: "30_days", label: "30 days" },
  { value: "90_days", label: "90 days" },
  { value: "180_days", label: "180 days" },
  { value: "1_year", label: "1 year" },
  { value: "custom", label: "Custom" },
];

export const DPIA_STATUS_OPTIONS = [
  { value: "not_needed", label: "Not needed" },
  { value: "planned", label: "Needed — planned" },
  { value: "completed", label: "Completed" },
  { value: "unknown", label: "Unknown" },
];

export const SOP_STATUS_OPTIONS = [
  { value: "exists", label: "Exists" },
  { value: "draft", label: "Draft" },
  { value: "not_started", label: "Not started" },
];

export const MONITORING_METRICS = [
  { value: "accuracy", label: "Accuracy" },
  { value: "drift", label: "Drift" },
  { value: "bias", label: "Bias" },
  { value: "complaints", label: "Complaints" },
  { value: "edge_cases", label: "Edge cases" },
  { value: "security", label: "Security events" },
  { value: "other", label: "Other" },
];

export const PROCESS_STATUS_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "partially", label: "Partially" },
  { value: "no", label: "No" },
];

export const SUSPEND_QUICKLY_OPTIONS = [
  { value: "yes_immediately", label: "Yes, immediately" },
  { value: "yes_slow", label: "Yes, but slow" },
  { value: "no", label: "No" },
  { value: "unknown", label: "Unknown" },
];

export const NOTIFICATION_STATUS_OPTIONS = [
  { value: "implemented", label: "Implemented" },
  { value: "planned", label: "Planned" },
  { value: "not_started", label: "Not started" },
];

export const REGISTRATION_STATUS_OPTIONS = [
  { value: "registered", label: "Registered" },
  { value: "not_registered", label: "Not registered" },
  { value: "vendor_responsible", label: "Vendor responsible" },
  { value: "unknown", label: "Unknown" },
];

export const TRAINING_COMPLETION_STATUS = [
  { value: "over_90", label: "≥90% complete" },
  { value: "50_to_89", label: "50-89% complete" },
  { value: "under_50", label: "<50% complete" },
  { value: "unknown", label: "Unknown" },
];

export const FRIA_STATUS_OPTIONS = [
  { value: "not_required", label: "Not required" },
  { value: "required_planned", label: "Required — planned" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

export const FINAL_CLASSIFICATION_OPTIONS = [
  { value: "prohibited", label: "Prohibited/Blocked" },
  { value: "high_risk", label: "High-risk candidate" },
  { value: "limited_risk", label: "Limited risk (transparency)" },
  { value: "minimal_risk", label: "Minimal risk" },
  { value: "needs_review", label: "Needs review" },
];

export const STAFF_ROLES = [
  { value: "operators", label: "Operators" },
  { value: "reviewers", label: "Reviewers" },
  { value: "managers", label: "Managers" },
  { value: "hr", label: "HR" },
  { value: "support", label: "Support" },
  { value: "engineers", label: "Engineers" },
  { value: "other", label: "Other" },
];

// Step definitions for the wizard
export const WIZARD_STEPS: WizardStep[] = [
  { id: 0, key: "mode", title: "Start", description: "Choose wizard mode", icon: "Settings", quickCapture: true },
  { id: 1, key: "basics", title: "Basics", description: "Tell us about this AI system", icon: "Cpu", quickCapture: true },
  { id: 2, key: "vendor", title: "Vendor", description: "Who provides this AI system?", icon: "Building2", quickCapture: true },
  { id: 3, key: "ownership", title: "Ownership", description: "Who's responsible?", icon: "User", quickCapture: true },
  { id: 4, key: "scope", title: "Scope", description: "Where used & who is affected", icon: "Globe", quickCapture: false },
  { id: 5, key: "value_chain", title: "Value Chain", description: "Your role in the AI value chain", icon: "GitBranch", quickCapture: false },
  { id: 6, key: "definition", title: "AI Definition", description: "Is this an AI system?", icon: "HelpCircle", quickCapture: false },
  { id: 7, key: "use_case", title: "Use Case", description: "What it does operationally", icon: "Workflow", quickCapture: false },
  { id: 8, key: "prohibited", title: "Prohibited", description: "Article 5 screening", icon: "ShieldX", quickCapture: false },
  { id: 9, key: "high_risk", title: "High-Risk", description: "Annex III screening", icon: "AlertTriangle", quickCapture: false },
  { id: 10, key: "transparency", title: "Transparency", description: "Article 50 obligations", icon: "Eye", quickCapture: false },
  { id: 11, key: "data_privacy", title: "Data & Privacy", description: "GDPR-aligned questions", icon: "Database", quickCapture: false },
  { id: 12, key: "oversight", title: "Oversight", description: "Human oversight model", icon: "Users", quickCapture: false },
  { id: 13, key: "logging", title: "Logging", description: "Record-keeping & traceability", icon: "FileText", quickCapture: false },
  { id: 14, key: "incidents", title: "Incidents", description: "Risk & incident handling", icon: "AlertCircle", quickCapture: false },
  { id: 15, key: "workplace", title: "Workplace", description: "Workplace-specific obligations", icon: "Briefcase", quickCapture: false },
  { id: 16, key: "authority", title: "Authority", description: "Public authority registration", icon: "Building", quickCapture: false },
  { id: 17, key: "training", title: "Training", description: "AI literacy requirements", icon: "GraduationCap", quickCapture: false },
  { id: 18, key: "fria", title: "FRIA", description: "Fundamental Rights Impact", icon: "Scale", quickCapture: false },
  { id: 19, key: "signoff", title: "Sign-off", description: "Review & complete", icon: "CheckCircle", quickCapture: false },
  { id: 20, key: "done", title: "Done", description: "System added", icon: "Check", quickCapture: true },
];

export const QUICK_CAPTURE_STEPS = WIZARD_STEPS.filter(s => s.quickCapture);
export const FULL_ASSESSMENT_STEPS = WIZARD_STEPS;
