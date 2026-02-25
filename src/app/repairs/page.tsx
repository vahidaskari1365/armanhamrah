
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle, FileSignature, CheckCircle } from "lucide-react";

export default function RepairsPage() {
  const { t, loading } = useLanguage();

  if (loading) {
    return <div className="container mx-auto text-center p-20">در حال بارگذاری...</div>;
  }

  // Using a simple function to handle the <br/> tag from the database
  const formatText = (text) => {
    if (!text) return null;
    return text.split('<br/>').map((line, index) => (
      <p key={index} className="mb-4 text-right leading-loose">
        {line}
      </p>
    ));
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Card className="border-yellow-500 border-2">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 ml-4 text-yellow-500" />
            {t('repairs_main_page_title', 'شرایط تعمیرات')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <div className="bg-muted p-6 rounded-lg">
            {formatText(t('repairs_main_info_paragraph'))}
          </div>
          <div className="flex items-center justify-center pt-4">
            <FileSignature className="h-6 w-6 ml-2 text-primary" />
            <p className="font-semibold">کدملی، امضاء و اثرانگشت در فرم رضایت الزامی می باشد.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
