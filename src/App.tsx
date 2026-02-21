import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import AdminToolbar from "@/components/admin/AdminToolbar";
import AdminEditSidebar from "@/components/admin/AdminEditSidebar";
import { usePageTracking } from "@/hooks/usePageTracking";
import AuthRecoveryRedirect from "@/components/AuthRecoveryRedirect";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/Contact";
import ExportPage from "./pages/ExportPage";
import WarrantyPage from "./pages/WarrantyPage";
import WarrantyConditionsPage from "./pages/warranty/Conditions";
import WarrantyAccessoriesPage from "./pages/warranty/Accessories";
import WarrantyRepairsPage from "./pages/warranty/Repairs";
import RepresentativesPage from "./pages/RepresentativesPage";
import AdminAuth from "./pages/AdminAuth";
import AdminResetPassword from "./pages/AdminResetPassword";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";
import IronSteelPage from "./pages/export/IronSteelPage";
import CopperRodPage from "./pages/export/CopperRodPage";
import BitumenPage from "./pages/export/BitumenPage";
import OilPage from "./pages/export/OilPage";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const queryClient = new QueryClient();

// Component to handle page tracking inside BrowserRouter
const PageTracker = ({ children }: { children: React.ReactNode }) => {
  usePageTracking();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider>
          <ThemeProvider>
            <BrowserRouter>
              <PageTracker>
                <AuthRecoveryRedirect />
                <AdminToolbar />
                <AdminEditSidebar />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:slug" element={<ProductDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/export" element={<ExportPage />} />
                  <Route path="/export/iron-steel" element={<IronSteelPage />} />
                  <Route path="/export/copper-rod" element={<CopperRodPage />} />
                  <Route path="/export/bitumen" element={<BitumenPage />} />
                  <Route path="/export/oil" element={<OilPage />} />
                  <Route path="/warranty" element={<WarrantyPage />} />
                  <Route path="/warranty/conditions" element={<WarrantyConditionsPage />} />
                  <Route path="/warranty/accessories" element={<WarrantyAccessoriesPage />} />
                  <Route path="/warranty/repairs" element={<WarrantyRepairsPage />} />
                  <Route path="/representatives" element={<RepresentativesPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/admin/auth" element={<AdminAuth />} />
                  <Route path="/admin/reset-password" element={<AdminResetPassword />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTracker>
            </BrowserRouter>
          </ThemeProvider>
        </LanguageProvider>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
