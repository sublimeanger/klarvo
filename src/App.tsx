import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import AISystems from "@/pages/AISystems";
import Pricing from "@/pages/Pricing";
import Placeholder from "@/pages/Placeholder";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public pricing page (no sidebar) */}
          <Route path="/pricing" element={<Pricing />} />
          
          {/* App routes with sidebar */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai-systems" element={<AISystems />} />
            <Route path="/ai-systems/:id" element={<Placeholder />} />
            <Route path="/ai-systems/new" element={<Placeholder />} />
            <Route path="/vendors" element={<Placeholder />} />
            <Route path="/assessments" element={<Placeholder />} />
            <Route path="/evidence" element={<Placeholder />} />
            <Route path="/policies" element={<Placeholder />} />
            <Route path="/training" element={<Placeholder />} />
            <Route path="/tasks" element={<Placeholder />} />
            <Route path="/incidents" element={<Placeholder />} />
            <Route path="/exports" element={<Placeholder />} />
            <Route path="/settings" element={<Placeholder />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
