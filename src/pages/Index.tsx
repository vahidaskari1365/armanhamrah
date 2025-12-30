import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Brands from '@/components/Brands';
import Services from '@/components/Services';
import Products from '@/components/Products';
import Export from '@/components/Export';
import Guarantee from '@/components/Guarantee';
import AppSection from '@/components/AppSection';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ChatWidget from '@/components/ChatWidget';
import Subsidiaries from '@/components/Subsidiaries';

const Index = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO />
          <div className="min-h-screen bg-background">
            <Navbar />
            <main>
              <Hero />
              <Brands />
              <Services />
              <Products />
              <Export />
              <Guarantee />
              <AppSection />
              <Blog />
              <Subsidiaries />
            </main>
            <Footer />
            <ChatWidget />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default Index;
