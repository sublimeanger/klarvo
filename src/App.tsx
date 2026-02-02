import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { AIAssistant } from "@/components/ai-assistant";
import { ScrollToTop } from "@/components/ScrollToTop";

// Loading fallback component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// LAZY-LOADED PAGES - Code-splitting for better initial load performance
// ═══════════════════════════════════════════════════════════════════

// Core App pages (high priority - prefetched)
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const AISystems = lazy(() => import("@/pages/AISystems"));
const AISystemWizard = lazy(() => import("@/pages/AISystemWizard"));
const AISystemDetail = lazy(() => import("@/pages/AISystemDetail"));
const ClassificationWizard = lazy(() => import("@/pages/ClassificationWizard"));
const FRIAWizard = lazy(() => import("@/pages/FRIAWizard"));
const Vendors = lazy(() => import("@/pages/Vendors"));
const VendorDetail = lazy(() => import("@/pages/VendorDetail"));
const Evidence = lazy(() => import("@/pages/Evidence"));
const Tasks = lazy(() => import("@/pages/Tasks"));
const Policies = lazy(() => import("@/pages/Policies"));
const Assessments = lazy(() => import("@/pages/Assessments"));
const Controls = lazy(() => import("@/pages/Controls"));
const Training = lazy(() => import("@/pages/Training"));
const Incidents = lazy(() => import("@/pages/Incidents"));
const Exports = lazy(() => import("@/pages/Exports"));
const Disclosures = lazy(() => import("@/pages/Disclosures"));
const AuditLog = lazy(() => import("@/pages/AuditLog"));
const Discovery = lazy(() => import("@/pages/Discovery"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const BillingSettings = lazy(() => import("@/pages/Settings/Billing"));
const GeneralSettings = lazy(() => import("@/pages/Settings/General"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Auth pages
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Callback = lazy(() => import("@/pages/auth/Callback"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));
const AcceptInvite = lazy(() => import("@/pages/invite/AcceptInvite"));

// Marketing pages - Landing page loaded eagerly for SEO/performance
import LandingPage from "@/pages/marketing/LandingPage";

const Features = lazy(() => import("@/pages/marketing/Features"));
const About = lazy(() => import("@/pages/marketing/About"));
const Contact = lazy(() => import("@/pages/marketing/Contact"));
const Resources = lazy(() => import("@/pages/marketing/Resources"));
const Integrations = lazy(() => import("@/pages/marketing/Integrations"));
const Partners = lazy(() => import("@/pages/marketing/Partners"));
const Careers = lazy(() => import("@/pages/marketing/Careers"));
const Press = lazy(() => import("@/pages/marketing/Press"));
const Status = lazy(() => import("@/pages/marketing/Status"));
const Changelog = lazy(() => import("@/pages/marketing/Changelog"));
const Docs = lazy(() => import("@/pages/marketing/Docs"));
const DocsArticle = lazy(() => import("@/pages/marketing/DocsArticle"));
const FAQ = lazy(() => import("@/pages/marketing/FAQ"));
const Blog = lazy(() => import("@/pages/marketing/Blog"));
const BlogArticle = lazy(() => import("@/pages/marketing/BlogArticle"));
const APIReference = lazy(() => import("@/pages/marketing/APIReference"));
const Templates = lazy(() => import("@/pages/marketing/Templates"));
const EUAIActGuide = lazy(() => import("@/pages/marketing/EUAIActGuide"));
const Samples = lazy(() => import("@/pages/marketing/Samples"));
const SystemSpec = lazy(() => import("@/pages/marketing/SystemSpec"));

// SEO Hub pages
const TemplatesHub = lazy(() => import("@/pages/marketing/TemplatesHub"));
const ToolsHub = lazy(() => import("@/pages/marketing/ToolsHub"));
const GuidesHub = lazy(() => import("@/pages/marketing/GuidesHub"));
const CompareHub = lazy(() => import("@/pages/marketing/CompareHub"));
const IndustriesHub = lazy(() => import("@/pages/marketing/IndustriesHub"));
const ComplianceSoftwarePage = lazy(() => import("@/pages/marketing/ComplianceSoftwarePage"));
const AIInventorySoftwarePage = lazy(() => import("@/pages/marketing/AIInventorySoftwarePage"));
const FRIASoftwarePage = lazy(() => import("@/pages/marketing/FRIASoftwarePage"));

// Template pages
const AIInventoryTemplate = lazy(() => import("@/pages/marketing/templates/AIInventoryTemplate"));
const FRIATemplate = lazy(() => import("@/pages/marketing/templates/FRIATemplate"));
const Article26Checklist = lazy(() => import("@/pages/marketing/templates/Article26Checklist"));
const Article50Disclosure = lazy(() => import("@/pages/marketing/templates/Article50Disclosure"));
const AIAcceptableUsePolicy = lazy(() => import("@/pages/marketing/templates/AIAcceptableUsePolicy"));
const VendorDueDiligence = lazy(() => import("@/pages/marketing/templates/VendorDueDiligence"));
const HumanOversightPlan = lazy(() => import("@/pages/marketing/templates/HumanOversightPlan"));
const AIIncidentRegister = lazy(() => import("@/pages/marketing/templates/AIIncidentRegister"));

// Tool pages
const AIDefinitionChecker = lazy(() => import("@/pages/marketing/tools/AIDefinitionChecker"));
const HighRiskChecker = lazy(() => import("@/pages/marketing/tools/HighRiskChecker"));
const TransparencyChecker = lazy(() => import("@/pages/marketing/tools/TransparencyChecker"));
const ProhibitedPracticesScreening = lazy(() => import("@/pages/marketing/tools/ProhibitedPracticesScreening"));

// Guide pages
const EUAIActForSMEs = lazy(() => import("@/pages/marketing/guides/EUAIActForSMEs"));
const Article26Guide = lazy(() => import("@/pages/marketing/guides/Article26Guide"));
const Article50Guide = lazy(() => import("@/pages/marketing/guides/Article50Guide"));
const ProhibitedPracticesGuide = lazy(() => import("@/pages/marketing/guides/ProhibitedPracticesGuide"));
const HighRiskGuide = lazy(() => import("@/pages/marketing/guides/HighRiskGuide"));
const AIInventoryGuide = lazy(() => import("@/pages/marketing/guides/AIInventoryGuide"));
const AIDefinitionGuide = lazy(() => import("@/pages/marketing/guides/AIDefinitionGuide"));
const AILiteracyGuide = lazy(() => import("@/pages/marketing/guides/AILiteracyGuide"));
const FRIAGuide = lazy(() => import("@/pages/marketing/guides/FRIAGuide"));
const EvidencePackGuide = lazy(() => import("@/pages/marketing/guides/EvidencePackGuide"));

// Comparison pages
const KlarvoVsSpreadsheets = lazy(() => import("@/pages/marketing/compare/KlarvoVsSpreadsheets"));
const KlarvoVsTrustPlatforms = lazy(() => import("@/pages/marketing/compare/KlarvoVsTrustPlatforms"));

// BOFU product pages
const EvidencePacksPage = lazy(() => import("@/pages/marketing/EvidencePacksPage"));
const TrainingTrackerPage = lazy(() => import("@/pages/marketing/TrainingTrackerPage"));
const EvidenceVaultPage = lazy(() => import("@/pages/marketing/EvidenceVaultPage"));

// Industry pages
const HRRecruitmentPage = lazy(() => import("@/pages/marketing/industries/HRRecruitmentPage"));
const FintechPage = lazy(() => import("@/pages/marketing/industries/FintechPage"));
const EducationPage = lazy(() => import("@/pages/marketing/industries/EducationPage"));
const SaaSPage = lazy(() => import("@/pages/marketing/industries/SaaSPage"));

// Use case pages
const SMEUseCase = lazy(() => import("@/pages/use-cases/SME"));
const EnterpriseUseCase = lazy(() => import("@/pages/use-cases/Enterprise"));
const HRUseCase = lazy(() => import("@/pages/use-cases/HR"));
const FintechUseCase = lazy(() => import("@/pages/use-cases/Fintech"));
const HealthcareUseCase = lazy(() => import("@/pages/use-cases/Healthcare"));

// Legal pages
const Terms = lazy(() => import("@/pages/legal/Terms"));
const Privacy = lazy(() => import("@/pages/legal/Privacy"));
const Cookies = lazy(() => import("@/pages/legal/Cookies"));
const Security = lazy(() => import("@/pages/legal/Security"));
const DPA = lazy(() => import("@/pages/legal/DPA"));
const GDPR = lazy(() => import("@/pages/legal/GDPR"));
const AUP = lazy(() => import("@/pages/legal/AUP"));

// Provider Track pages (hidden, non-indexable)
const ProviderDashboard = lazy(() => import("@/pages/provider-track/Dashboard"));
const ProviderTechnicalDocs = lazy(() => import("@/pages/provider-track/TechnicalDocs"));
const ProviderRiskManagement = lazy(() => import("@/pages/provider-track/RiskManagement"));
const ProviderQMS = lazy(() => import("@/pages/provider-track/QMS"));
const ProviderConformity = lazy(() => import("@/pages/provider-track/Conformity"));
const ProviderDeclaration = lazy(() => import("@/pages/provider-track/Declaration"));
const ProviderCEMarking = lazy(() => import("@/pages/provider-track/CEMarking"));
const ProviderRegistration = lazy(() => import("@/pages/provider-track/Registration"));
const ProviderMonitoring = lazy(() => import("@/pages/provider-track/Monitoring"));
const ProviderSeriousIncidents = lazy(() => import("@/pages/provider-track/SeriousIncidents"));
const ProviderDataGovernance = lazy(() => import("@/pages/provider-track/DataGovernance"));
const ProviderImporterVerification = lazy(() => import("@/pages/provider-track/ImporterVerification"));
const ProviderDistributorVerification = lazy(() => import("@/pages/provider-track/DistributorVerification"));

// ═══════════════════════════════════════════════════════════════════
// QUERY CLIENT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - prevents refetch on navigation
      gcTime: 10 * 60 * 1000,   // 10 minutes cache
    },
  },
});

// ═══════════════════════════════════════════════════════════════════
// APP COMPONENT
// ═══════════════════════════════════════════════════════════════════

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Landing page - loaded eagerly */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Marketing pages */}
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/status" element={<Status />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/docs/:slug" element={<DocsArticle />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/api" element={<APIReference />} />
            <Route path="/templates" element={<TemplatesHub />} />
            <Route path="/samples" element={<Samples />} />
            <Route path="/system-spec" element={<SystemSpec />} />
            <Route path="/eu-ai-act" element={<EUAIActGuide />} />
            
            {/* SEO Hub Pages */}
            <Route path="/tools" element={<ToolsHub />} />
            <Route path="/guides" element={<GuidesHub />} />
            <Route path="/compare" element={<CompareHub />} />
            <Route path="/industries" element={<IndustriesHub />} />
            
            {/* BOFU Product Pages */}
            <Route path="/eu-ai-act-compliance-software" element={<ComplianceSoftwarePage />} />
            <Route path="/ai-inventory-software" element={<AIInventorySoftwarePage />} />
            <Route path="/fria-software" element={<FRIASoftwarePage />} />
            
            {/* Template Pages */}
            <Route path="/templates/ai-inventory-template" element={<AIInventoryTemplate />} />
            <Route path="/templates/fria-template" element={<FRIATemplate />} />
            <Route path="/templates/article-26-checklist" element={<Article26Checklist />} />
            <Route path="/templates/article-50-disclosure-templates" element={<Article50Disclosure />} />
            <Route path="/templates/ai-acceptable-use-policy" element={<AIAcceptableUsePolicy />} />
            <Route path="/templates/vendor-due-diligence-questionnaire" element={<VendorDueDiligence />} />
            <Route path="/templates/human-oversight-plan-template" element={<HumanOversightPlan />} />
            <Route path="/templates/ai-incident-register-template" element={<AIIncidentRegister />} />
            
            {/* Tool Pages */}
            <Route path="/tools/ai-system-definition-checker" element={<AIDefinitionChecker />} />
            <Route path="/tools/high-risk-checker-annex-iii" element={<HighRiskChecker />} />
            <Route path="/tools/transparency-obligation-checker" element={<TransparencyChecker />} />
            <Route path="/tools/prohibited-practices-screening" element={<ProhibitedPracticesScreening />} />
            
            {/* Guide Pages */}
            <Route path="/guides/eu-ai-act-for-smes" element={<EUAIActForSMEs />} />
            <Route path="/guides/article-26-deployer-obligations" element={<Article26Guide />} />
            <Route path="/guides/article-50-transparency-obligations" element={<Article50Guide />} />
            <Route path="/guides/prohibited-ai-practices-article-5" element={<ProhibitedPracticesGuide />} />
            <Route path="/guides/high-risk-ai-annex-iii" element={<HighRiskGuide />} />
            <Route path="/guides/ai-inventory-eu-ai-act" element={<AIInventoryGuide />} />
            <Route path="/guides/is-this-an-ai-system" element={<AIDefinitionGuide />} />
            <Route path="/guides/ai-literacy-article-4" element={<AILiteracyGuide />} />
            <Route path="/guides/fria-article-27" element={<FRIAGuide />} />
            <Route path="/guides/evidence-pack-procurement" element={<EvidencePackGuide />} />
            
            {/* Comparison Pages */}
            <Route path="/compare/klarvo-vs-spreadsheets" element={<KlarvoVsSpreadsheets />} />
            <Route path="/compare/klarvo-vs-trust-platforms" element={<KlarvoVsTrustPlatforms />} />
            
            {/* Additional BOFU Product Pages */}
            <Route path="/ai-governance-evidence-packs" element={<EvidencePacksPage />} />
            <Route path="/ai-literacy-training-tracker" element={<TrainingTrackerPage />} />
            <Route path="/evidence-vault-software" element={<EvidenceVaultPage />} />
            
            {/* Industry Pages */}
            <Route path="/industries/hr-recruitment-ai-act" element={<HRRecruitmentPage />} />
            <Route path="/industries/fintech-credit-ai-act" element={<FintechPage />} />
            <Route path="/industries/education-edtech-ai-act" element={<EducationPage />} />
            <Route path="/industries/saas-ai-act" element={<SaaSPage />} />
            
            {/* Use case pages */}
            <Route path="/use-cases/sme" element={<SMEUseCase />} />
            <Route path="/use-cases/enterprise" element={<EnterpriseUseCase />} />
            <Route path="/use-cases/hr" element={<HRUseCase />} />
            <Route path="/use-cases/fintech" element={<FintechUseCase />} />
            <Route path="/use-cases/healthcare" element={<HealthcareUseCase />} />
            
            {/* Legal pages (public) */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/security" element={<Security />} />
            <Route path="/dpa" element={<DPA />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="/aup" element={<AUP />} />
            
            {/* Auth pages */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/callback" element={<Callback />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            
            {/* Team Invite */}
            <Route path="/invite/:token" element={<AcceptInvite />} />
            
            {/* Onboarding */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute requireOnboarding={false}>
                  <Onboarding />
                </ProtectedRoute>
              }
            />

            {/* Protected app routes with sidebar */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-systems" element={<AISystems />} />
              <Route path="/ai-systems/:id" element={<AISystemDetail />} />
              <Route path="/ai-systems/new" element={<AISystemWizard />} />
              <Route path="/ai-systems/:id/classify" element={<ClassificationWizard />} />
              <Route path="/ai-systems/:id/fria" element={<FRIAWizard />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/vendors/:id" element={<VendorDetail />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/controls" element={<Controls />} />
              <Route path="/evidence" element={<Evidence />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/training" element={<Training />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/exports" element={<Exports />} />
              <Route path="/disclosures" element={<Disclosures />} />
              <Route path="/audit-log" element={<AuditLog />} />
              <Route path="/discovery" element={<Discovery />} />
              <Route path="/settings" element={<GeneralSettings />} />
              <Route path="/settings/billing" element={<BillingSettings />} />
              
              {/* Provider Track Routes (hidden, non-indexable) */}
              <Route path="/provider-track" element={<ProviderDashboard />} />
              <Route path="/provider-track/technical-docs" element={<ProviderTechnicalDocs />} />
              <Route path="/provider-track/risk-management" element={<ProviderRiskManagement />} />
              <Route path="/provider-track/qms" element={<ProviderQMS />} />
              <Route path="/provider-track/conformity" element={<ProviderConformity />} />
              <Route path="/provider-track/declaration" element={<ProviderDeclaration />} />
              <Route path="/provider-track/ce-marking" element={<ProviderCEMarking />} />
              <Route path="/provider-track/registration" element={<ProviderRegistration />} />
              <Route path="/provider-track/monitoring" element={<ProviderMonitoring />} />
              <Route path="/provider-track/serious-incidents" element={<ProviderSeriousIncidents />} />
              <Route path="/provider-track/data-governance" element={<ProviderDataGovernance />} />
              <Route path="/provider-track/importer-verification" element={<ProviderImporterVerification />} />
              <Route path="/provider-track/distributor-verification" element={<ProviderDistributorVerification />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <AIAssistant />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
