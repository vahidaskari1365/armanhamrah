import { Helmet } from 'react-helmet-async';

interface ServiceSchemaProps {
  name: string;
  description: string;
  serviceType: string;
  provider: string;
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
      "name": provider,
      "areaServed": { "@type": "City", "name": areaServed },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۲، واحد ۲۰۴",
        "addressLocality": "تهران",
        "addressRegion": "تهران",
        "addressCountry": "IR"
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
