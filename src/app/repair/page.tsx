
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Editable } from "@/components/inline-editing/Editable";
import { useContent } from "@/contexts/ContentContext";

export default function RepairPage() {
  const { loading } = useContent();

  if (loading) {
      return <div className="container mx-auto text-center p-20">در حال بارگذاری محتوا...</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            <Editable contentKey="repair_page_title" as="h1" />
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none mx-auto text-muted-foreground">
          <Editable contentKey="repair_page_content" isRichText={true} />
        </CardContent>
      </Card>
    </div>
  );
}
