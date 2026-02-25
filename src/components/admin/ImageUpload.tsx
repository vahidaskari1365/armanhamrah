
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Upload } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentImageUrl?: string;
}

const ImageUpload = ({ onUpload, currentImageUrl }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
        toast({ title: 'خطا', description: 'لطفا ابتدا یک فایل انتخاب کنید.', variant: 'destructive' });
        return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products') // Assumes a 'products' bucket exists in Supabase Storage
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      if (!data.publicUrl) {
          throw new Error('Could not get public URL for the uploaded image.');
      }
        
      onUpload(data.publicUrl);
      toast({ title: 'موفق', description: 'عکس با موفقیت آپلود شد.'});
      setFile(null); // Reset file input

    } catch (error: any) {
      toast({ title: 'خطا در آپلود عکس', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
        {currentImageUrl && (
            <div>
                <p className="text-sm font-medium">عکس فعلی:</p>
                <img src={currentImageUrl} alt="Current Product" className="w-24 h-24 object-contain rounded-md border p-1" />
            </div>
        )}
        <p className="text-sm font-medium">آپلود عکس جدید:</p>
        <div className="flex items-center gap-2">
            <Input type="file" onChange={handleFileChange} className="flex-1" accept="image/*" />
            <Button onClick={handleUpload} disabled={uploading || !file}>
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                <span className="mr-2">آپلود</span>
            </Button>
        </div>
    </div>
  );
};

export default ImageUpload;
