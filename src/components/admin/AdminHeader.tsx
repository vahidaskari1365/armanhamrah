import { Button } from '@/components/ui/button';
import { Shield, LogOut, Home } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  user: User | null;
  onLogout: () => void;
}

const AdminHeader = ({ user, onLogout }: AdminHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground">پنل مدیریت</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} title="مشاهده سایت">
            <Home className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onLogout} title="خروج">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
