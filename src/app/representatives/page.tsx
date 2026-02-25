'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Editable } from "@/components/inline-editing/Editable";
// Corrected the import from useContent to useLanguage
import { useLanguage } from "@/contexts/LanguageContext";

const representatives = Array.from({ length: 12 }, (_, i) => i + 1);

export default function RepresentativesPage() {
  // Corrected the hook from useContent to useLanguage
  const { loading, t } = useLanguage();

  if (loading) {
      return <div className="container mx-auto text-center p-20">در حال بارگذاری محتوا...</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold mb-4">
            {/* Using t() function directly for the title as Editable might have issues */}
            <h1>{t('representatives_page_title')}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">{t('rep_col_name')}</TableHead>
                  <TableHead className="font-semibold">{t('rep_col_province')}</TableHead>
                  <TableHead className="font-semibold">{t('rep_col_city')}</TableHead>
                  <TableHead className="font-semibold">{t('rep_col_phone')}</TableHead>
                  <TableHead className="font-semibold">{t('rep_col_address')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {representatives.map((repId) => (
                  <TableRow key={repId}>
                    <TableCell>{t(`rep_${repId}_name`)}</TableCell>
                    <TableCell>{t(`rep_${repId}_province`)}</TableCell>
                    <TableCell>{t(`rep_${repId}_city`)}</TableCell>
                    <TableCell>{t(`rep_${repId}_phone`)}</TableCell>
                    <TableCell>{t(`rep_${repId}_address`)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
