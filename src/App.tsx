import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import AISystems from "@/pages/AISystems";
import AISystemWizard from "@/pages/AISystemWizard";
import AISystemDetail from "@/pages/AISystemDetail";
import ClassificationWizard from "@/pages/ClassificationWizard";
import Vendors from "@/pages/Vendors";
import Evidence from "@/pages/Evidence";
import Tasks from "@/pages/Tasks";
import Pricing from "@/pages/Pricing";
import Placeholder from "@/pages/Placeholder";
import BillingSettings from "@/pages/Settings/Billing";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Callback from "@/pages/auth/Callback";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Onboarding from "@/pages/Onboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/callback" element={<Callback />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            
            {/* Onboarding (authenticated but no org yet) */}
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
              <Route path="/" element={<Dashboard />} />
              <Route path="/ai-systems" element={<AISystems />} />
              <Route path="/ai-systems/:id" element={<AISystemDetail />} />
              <Route path="/ai-systems/new" element={<AISystemWizard />} />
              <Route path="/ai-systems/:id/classify" element={<ClassificationWizard />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/assessments" element={<Placeholder />} />
              <Route path="/evidence" element={<Evidence />} />
              <Route path="/policies" element={<Placeholder />} />
              <Route path="/training" element={<Placeholder />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/incidents" element={<Placeholder />} />
              <Route path="/exports" element={<Placeholder />} />
              <Route path="/settings" element={<Placeholder />} />
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
