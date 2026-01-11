import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Brands from '@/components/Brands';
import Services from '@/components/Services';
import Products from '@/components/Products';
import Guarantee from '@/components/Guarantee';

import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ChatWidget from '@/components/ChatWidget';
import Subsidiaries from '@/components/Subsidiaries';
import pageBg from '@/assets/page-bg.jpeg';

const Index = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO />
          <div className="page-background bg-background" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties}>
            <Navbar />
            <main>
              <Hero />
              <Brands />
              <Services />
              <Products />
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
