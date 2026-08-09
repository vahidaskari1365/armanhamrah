import { Helmet } from 'react-helmet-async';
import { businessInfo } from '@/data/business';

interface ServiceSchemaProps {
  name: string;
  description: string;
  serviceType: string;
  provider?: string;
  areaServed?: string;
  offers?: { name: string; price?: string; priceCurrency?: string }[];
}

const ServiceSchema = ({ name, description, serviceType, provider, areaServed = "Tehran, Iran", offers }: ServiceSchemaProps) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "serviceType": serviceType,
    "provider": {
      "@type": "LocalBusiness",
      "@id": businessInfo.afterSales.id,
      "name": provider || businessInfo.afterSales.name,
      "areaServed": { "@type": "City", "name": areaServed },
      "telephone": businessInfo.afterSales.telephone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": businessInfo.afterSales.streetAddress,
        "addressLocality": businessInfo.afterSales.addressLocality,
        "addressRegion": businessInfo.afterSales.addressRegion,
        "postalCode": businessInfo.afterSales.postalCode,
        "addressCountry": businessInfo.afterSales.addressCountry
      }
    },
    ...(offers && offers.length > 0 ? {
      "offers": offers.map(o => ({
        "@type": "Offer",
        "name": o.name,
        ...(o.price ? { "price": o.price, "priceCurrency": o.priceCurrency || "IRR" } : {})
      }))
    } : {})
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

export default ServiceSchema;
