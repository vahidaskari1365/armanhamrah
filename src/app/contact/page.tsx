
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactInfoCard = ({ title, address, postalCode, phone, phone2, email }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 text-right">
      <div className="flex items-start justify-end">
        <p className="flex-1 mr-4">{address}<br/>کد پستی: {postalCode}</p>
        <MapPin className="mt-1 h-5 w-5 text-primary" />
      </div>
      <div className="flex items-center justify-end">
        <p>{phone}</p>
        <Phone className="ml-4 h-5 w-5 text-primary" />
      </div>
      {phone2 && (
        <div className="flex items-center justify-end">
          <p>{phone2}</p>
          <Phone className="ml-4 h-5 w-5 text-primary" />
        </div>
      )}
      {email && (
        <div className="flex items-center justify-end">
          <p>{email}</p>
          <Mail className="ml-4 h-5 w-5 text-primary" />
        </div>
      )}
    </CardContent>
  </Card>
);


export default function ContactPage() {
  const { t, loading } = useLanguage();

  if (loading) {
    return <div className="container mx-auto text-center p-20">در حال بارگذاری...</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">{t('contact_us_title', 'تماس با ما')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactInfoCard 
          title={t('contact_main_office_title', 'دفتر مرکزی')}
          address={t('contact_main_office_address')}
          postalCode={t('contact_main_office_postal_code')}
          phone={t('contact_main_office_phone')}
          email={t('contact_main_office_email')}
        />
        <ContactInfoCard 
          title={t('contact_after_sales_title', 'خدمات پس از فروش')}
          address={t('contact_after_sales_address')}
          postalCode={t('contact_after_sales_postal_code')}
          phone={t('contact_after_sales_phone')}
          phone2={t('contact_after_sales_phone2')}
        />
      </div>
    </div>
  );
}
