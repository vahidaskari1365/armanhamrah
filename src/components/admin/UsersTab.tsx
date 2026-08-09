import { User } from '@supabase/supabase-js';

interface UserWithRole {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  created_at: string;
}

interface UsersTabProps {
  users: UserWithRole[];
  currentUser: User | null;
  onRefresh: () => void;
}

const UsersTab = ({ users, currentUser, onRefresh }: UsersTabProps) => {
  return (
    <div className="card-premium p-6">
      <h2 className="text-lg font-semibold">مدیریت کاربران</h2>
      <p className="text-muted-foreground">این بخش در حال توسعه است. به زودی امکان مدیریت کاربران و نقش‌های آن‌ها در اینجا فراهم خواهد شد.</p>
       {/* Basic user list display */}
       <div className="mt-4 space-y-2">
        {users.map(user => (
          <div key={user.id} className="flex justify-between items-center p-2 bg-secondary/30 rounded-md">
            <span>{user.email}</span>
            <span className="text-sm text-muted-foreground">{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTab;
