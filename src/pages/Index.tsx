import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Brands from '@/components/Brands';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FAQSchema from '@/components/FAQSchema';
import Subsidiaries from '@/components/Subsidiaries';
import pageBg from '@/assets/page-bg.jpeg';

const Index = () => {
  return (
    <HelmetProvider>
      <SEO />
      <FAQSchema />
      <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties}>
        <Navbar />
        <main>
          <Hero />
          <Brands />
          <Services />
          <Subsidiaries />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Index;