import { lazy, Suspense } from "react";
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
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const ContactPage = lazy(() => import("./pages/Contact"));
const ExportPage = lazy(() => import("./pages/ExportPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const WarrantyPage = lazy(() => import("./pages/WarrantyPage"));
const WarrantyConditionsPage = lazy(() => import("./pages/warranty/Conditions"));
const WarrantyAccessoriesPage = lazy(() => import("./pages/warranty/Accessories"));
const WarrantyRepairsPage = lazy(() => import("./pages/warranty/Repairs"));
const CustomerSurveyPage = lazy(() => import("./pages/warranty/CustomerSurvey"));
const CustomerComplaintPage = lazy(() => import("./pages/warranty/CustomerComplaint"));
const RepresentativesPage = lazy(() => import("./pages/RepresentativesPage"));
const RepairsHubPage = lazy(() => import("./pages/repair/RepairsHubPage"));
const MobileRepairPage = lazy(() => import("./pages/repair/MobileRepairPage"));
const PS5RepairPage = lazy(() => import("./pages/repair/PS5RepairPage"));
const AirPodsRepairPage = lazy(() => import("./pages/repair/AirPodsRepairPage"));
const HeadphoneRepairPage = lazy(() => import("./pages/repair/HeadphoneRepairPage"));
const WatchRepairPage = lazy(() => import("./pages/repair/WatchRepairPage"));
const SpeakerRepairPage = lazy(() => import("./pages/repair/SpeakerRepairPage"));
const ModelRepairPage = lazy(() => import("./pages/repair/ModelRepairPage"));
const AreaRepairPage = lazy(() => import("./pages/repair/AreaRepairPage"));
const IronSteelPage = lazy(() => import("./pages/export/IronSteelPage"));
const CopperRodPage = lazy(() => import("./pages/export/CopperRodPage"));
const BitumenPage = lazy(() => import("./pages/export/BitumenPage"));
const OilPage = lazy(() => import("./pages/export/OilPage"));
const PipingEquipmentPage = lazy(() => import("./pages/export/PipingEquipmentPage"));
const PetrochemicalDownstreamPage = lazy(() => import("./pages/export/PetrochemicalDownstreamPage"));
const GeneralIndustrialSuppliesPage = lazy(() => import("./pages/export/GeneralIndustrialSuppliesPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

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
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        }
      >
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
          <Route path="/warranty/customer-survey" element={<CustomerSurveyPage />} />
          <Route path="/warranty/complaints" element={<CustomerComplaintPage />} />
          <Route path="/repair" element={<RepairsHubPage />} />
          <Route path="/repair/mobile" element={<MobileRepairPage />} />
          <Route path="/repair/ps5" element={<PS5RepairPage />} />
          <Route path="/repair/airpods" element={<AirPodsRepairPage />} />
          <Route path="/repair/headphone" element={<HeadphoneRepairPage />} />
          <Route path="/repair/smartwatch" element={<WatchRepairPage />} />
          <Route path="/repair/speaker" element={<SpeakerRepairPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
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
          <Route path="/repair/areas/:area" element={<AreaRepairPage />} />
          <Route path="/representatives" element={<RepresentativesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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