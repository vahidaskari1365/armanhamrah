import subsidiary2 from '@/assets/subsidiary-2.jpeg';
import subsidiary8 from '@/assets/subsidiary-8.jpeg';
import subsidiary10 from '@/assets/subsidiary-10.jpeg';
import EditableImage from '@/components/admin/EditableImage';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';

const defaultSubsidiaries = [
  { id: 2, name: 'subsidiary.2.name', logo: subsidiary2 },
  { id: 8, name: 'subsidiary.8.name', logo: subsidiary8 },
  { id: 10, name: 'subsidiary.10.name', logo: subsidiary10 },
];

const Subsidiaries = () => {
  const { isEditMode } = useAdmin();
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
          {t('subsidiaries.title')}
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {defaultSubsidiaries.map((company) => (
            <div
              key={company.id}
              className="group flex flex-col items-center cursor-pointer gap-3"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden p-2 transition-transform duration-300 ease-out group-hover:scale-110">
                {isEditMode ? (
                  <EditableImage
                    contentKey={`subsidiary-logo-${company.id}`}
                    page="home"
                    section="subsidiaries"
                    defaultSrc={company.logo}
                    alt={t(company.name)}
                    className="w-full h-full object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <img
                    src={company.logo}
                    alt={t(company.name)}
                    className="w-full h-full object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                  />
                )}
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300 whitespace-nowrap text-center">
                {t(company.name)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subsidiaries;
