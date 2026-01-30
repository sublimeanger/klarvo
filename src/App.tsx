import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";

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
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
