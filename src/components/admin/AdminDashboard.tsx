import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Cog, LogOut, Shield, Edit } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, isEditMode, toggleEditMode, isLoading } = useAdmin();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
  };

  if (isLoading) {
    return null;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
       <Button onClick={toggleEditMode} size="icon" className={`rounded-full shadow-lg transition-colors ${isEditMode ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
          <Edit className="h-6 w-6" />
        </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="icon" className="rounded-full shadow-lg">
            <Cog className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:w-[500px]" dir="rtl">
          <SheetHeader className="flex-row justify-between items-center pr-10">
            <SheetTitle>پنل مدیریت</SheetTitle>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 ml-2" />
              خروج
            </Button>
          </SheetHeader>
          <div className="p-4 text-muted-foreground">
            <p>برای مدیریت سایت به پنل ادمین مراجعه کنید.</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminDashboard;