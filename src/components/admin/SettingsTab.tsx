interface SiteSetting {
  id: string;
  key: string;
  value: string;
  category: string;
}

interface SettingsTabProps {
  siteSettings: SiteSetting[];
  onRefresh: () => void;
}

const SettingsTab = ({ siteSettings, onRefresh }: SettingsTabProps) => {
  return (
    <div className="card-premium p-6">
      <h2 className="text-lg font-semibold">تنظیمات سایت</h2>
      <p className="text-muted-foreground">این بخش در حال توسعه است. به زودی امکان مدیریت تنظیمات کلی سایت از این بخش فراهم خواهد شد.</p>
    </div>
  );
};

export default SettingsTab;
