import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import AdminToolbar from "@/components/admin/AdminToolbar";
import AdminEditSidebar from "@/components/admin/AdminEditSidebar";
import { usePageTracking } from "@/hooks/usePageTracking";
import AuthRecoveryRedirect from "@/components/AuthRecoveryRedirect";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/Contact";
import ExportPage from "./pages/ExportPage";
import AboutPage from './pages/AboutPage';
import WarrantyPage from "./pages/WarrantyPage";
import WarrantyConditionsPage from "./pages/warranty/Conditions";
import WarrantyAccessoriesPage from "./pages/warranty/Accessories";
import WarrantyRepairsPage from "./pages/warranty/Repairs";
import RepresentativesPage from "./pages/RepresentativesPage";
import RepairsHubPage from "./pages/repair/RepairsHubPage";
import MobileRepairPage from "./pages/repair/MobileRepairPage";
import PS5RepairPage from "./pages/repair/PS5RepairPage";
import AirPodsRepairPage from "./pages/repair/AirPodsRepairPage";
import HeadphoneRepairPage from "./pages/repair/HeadphoneRepairPage";
import WatchRepairPage from "./pages/repair/WatchRepairPage";
import SpeakerRepairPage from "./pages/repair/SpeakerRepairPage";
import ModelRepairPage from "./pages/repair/ModelRepairPage";
import IronSteelPage from "./pages/export/IronSteelPage";
import CopperRodPage from "./pages/export/CopperRodPage";
import BitumenPage from "./pages/export/BitumenPage";
import OilPage from "./pages/export/OilPage";
import PipingEquipmentPage from "./pages/export/PipingEquipmentPage";
import PetrochemicalDownstreamPage from "./pages/export/PetrochemicalDownstreamPage";
import GeneralIndustrialSuppliesPage from "./pages/export/GeneralIndustrialSuppliesPage";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const queryClient = new QueryClient();

const PageTracker = ({ children }: { children: React.ReactNode }) => {
  usePageTracking();
  return <>{children}</>;
};

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={isHome ? '' : 'not-home-page'}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path="/export/iron-steel" element={<IronSteelPage />} />
        <Route path="/export/copper-rod" element={<CopperRodPage />} />
        <Route path="/export/bitumen" element={<BitumenPage />} />
        <Route path="/export/oil" element={<OilPage />} />
        <Route path="/export/piping-equipment" element={<PipingEquipmentPage />} />
        <Route path="/export/petrochemical-downstream" element={<PetrochemicalDownstreamPage />} />
        <Route path="/export/general-industrial-supplies" element={<GeneralIndustrialSuppliesPage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/warranty/conditions" element={<WarrantyConditionsPage />} />
        <Route path="/warranty/accessories" element={<WarrantyAccessoriesPage />} />
        <Route path="/warranty/repairs" element={<WarrantyRepairsPage />} />
        <Route path="/repair" element={<RepairsHubPage />} />
        <Route path="/repair/mobile" element={<MobileRepairPage />} />
        <Route path="/repair/ps5" element={<PS5RepairPage />} />
        <Route path="/repair/airpods" element={<AirPodsRepairPage />} />
        <Route path="/repair/headphone" element={<HeadphoneRepairPage />} />
        <Route path="/repair/smartwatch" element={<WatchRepairPage />} />
        <Route path="/repair/watch" element={<WatchRepairPage />} />
        <Route path="/repair/speaker" element={<SpeakerRepairPage />} />
        <Route path="/repair/speaker-band" element={<SpeakerRepairPage />} />
        {/* Brand Model Landing Pages - SEO domination */}
        <Route path="/repair/iphone-17-pro" element={<ModelRepairPage />} />
        <Route path="/repair/iphone-16-pro" element={<ModelRepairPage />} />
        <Route path="/repair/samsung-s25-ultra" element={<ModelRepairPage />} />
        <Route path="/repair/samsung-s24-ultra" element={<ModelRepairPage />} />
        <Route path="/repair/ps5-slim" element={<ModelRepairPage />} />
        <Route path="/repair/airpods-pro-2" element={<ModelRepairPage />} />
        <Route path="/repair/galaxy-buds3-pro" element={<ModelRepairPage />} />
        <Route path="/repair/apple-watch-ultra-3" element={<ModelRepairPage />} />
        <Route path="/repair/galaxy-watch-8" element={<ModelRepairPage />} />
        <Route path="/repair/jbl-charge-5" element={<ModelRepairPage />} />
        <Route path="/repair/:model" element={<ModelRepairPage />} />
        <Route path="/representatives" element={<RepresentativesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <Toaster />
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <BrowserRouter>
                <ScrollToTop />
                <PageTracker>
                  <AuthRecoveryRedirect />
                  <AdminToolbar />
                  <AdminEditSidebar />
                  <AppContent />
                </PageTracker>
              </BrowserRouter>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
