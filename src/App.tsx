import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { AIAssistant } from "@/components/ai-assistant";

// App pages
import Dashboard from "@/pages/Dashboard";
import AISystems from "@/pages/AISystems";
import AISystemWizard from "@/pages/AISystemWizard";
import AISystemDetail from "@/pages/AISystemDetail";
import ClassificationWizard from "@/pages/ClassificationWizard";
import FRIAWizard from "@/pages/FRIAWizard";
import Vendors from "@/pages/Vendors";
import VendorDetail from "@/pages/VendorDetail";
import Evidence from "@/pages/Evidence";
import Tasks from "@/pages/Tasks";
import Policies from "@/pages/Policies";
import Assessments from "@/pages/Assessments";
import Controls from "@/pages/Controls";
import Training from "@/pages/Training";
import Incidents from "@/pages/Incidents";
import Exports from "@/pages/Exports";
import AuditLog from "@/pages/AuditLog";
import Pricing from "@/pages/Pricing";
import BillingSettings from "@/pages/Settings/Billing";
import GeneralSettings from "@/pages/Settings/General";
import NotFound from "@/pages/NotFound";

// Auth pages
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Callback from "@/pages/auth/Callback";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Onboarding from "@/pages/Onboarding";

// Marketing pages
import LandingPage from "@/pages/marketing/LandingPage";
import Features from "@/pages/marketing/Features";
import About from "@/pages/marketing/About";
import Contact from "@/pages/marketing/Contact";
// Demo page removed - system is self-explanatory
import Resources from "@/pages/marketing/Resources";
import Integrations from "@/pages/marketing/Integrations";
import Partners from "@/pages/marketing/Partners";
import Careers from "@/pages/marketing/Careers";
import Press from "@/pages/marketing/Press";
import Status from "@/pages/marketing/Status";
import Changelog from "@/pages/marketing/Changelog";
import Docs from "@/pages/marketing/Docs";
import DocsArticle from "@/pages/marketing/DocsArticle";
import FAQ from "@/pages/marketing/FAQ";
import Blog from "@/pages/marketing/Blog";
import APIReference from "@/pages/marketing/APIReference";
import Templates from "@/pages/marketing/Templates";
import EUAIActGuide from "@/pages/marketing/EUAIActGuide";

// Use case pages
import SMEUseCase from "@/pages/use-cases/SME";
import EnterpriseUseCase from "@/pages/use-cases/Enterprise";
import HRUseCase from "@/pages/use-cases/HR";
import FintechUseCase from "@/pages/use-cases/Fintech";
import HealthcareUseCase from "@/pages/use-cases/Healthcare";

// Legal pages
import Terms from "@/pages/legal/Terms";
import Privacy from "@/pages/legal/Privacy";
import Cookies from "@/pages/legal/Cookies";
import Security from "@/pages/legal/Security";
import DPA from "@/pages/legal/DPA";
import GDPR from "@/pages/legal/GDPR";
import AUP from "@/pages/legal/AUP";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Marketing pages (public) */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Demo route removed - system is self-explanatory */}
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
            <Route path="/api" element={<APIReference />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/eu-ai-act" element={<EUAIActGuide />} />
            
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
              <Route path="/audit-log" element={<AuditLog />} />
              <Route path="/settings" element={<GeneralSettings />} />
              <Route path="/settings/billing" element={<BillingSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIAssistant />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
