import subsidiary1 from '@/assets/subsidiary-1.jpeg';
import subsidiary2 from '@/assets/subsidiary-2.jpeg';
import subsidiary3 from '@/assets/subsidiary-3.jpeg';
import subsidiary4 from '@/assets/subsidiary-4.jpeg';
import subsidiary5 from '@/assets/subsidiary-5.jpeg';
import subsidiary6 from '@/assets/subsidiary-6.jpeg';
import subsidiary7 from '@/assets/subsidiary-7.jpeg';
import subsidiary8 from '@/assets/subsidiary-8.jpeg';
import subsidiary9 from '@/assets/subsidiary-9.jpeg';
import EditableText from '@/components/admin/EditableText';
import EditableImage from '@/components/admin/EditableImage';
import { useAdmin } from '@/contexts/AdminContext';

const defaultSubsidiaries = [
  { id: 1, name: 'آیین تجارت آران', logo: subsidiary1 },
  { id: 2, name: 'آرشا فن آوران رادان', logo: subsidiary2 },
  { id: 3, name: 'آرتا تجارت کیهان', logo: subsidiary3 },
  { id: 4, name: 'بازرگانی فرنام تجارت', logo: subsidiary4 },
  { id: 5, name: 'دانیال تجارت دارا', logo: subsidiary5 },
  { id: 6, name: 'فرنام تجارت کارا', logo: subsidiary6 },
  { id: 7, name: 'کارزین تجارت آرشان', logo: subsidiary7 },
  { id: 8, name: 'مانیا تجارت ماکان', logo: subsidiary8 },
  { id: 9, name: 'کارزین تجارت پرگون', logo: subsidiary9 },
];

const Subsidiaries = () => {
  const { isEditMode } = useAdmin();

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
          <EditableText
            contentKey="subsidiaries-title"
            page="home"
            section="subsidiaries"
            defaultValue="شرکت‌های زیرمجموعه"
          />
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {defaultSubsidiaries.map((company) => (
            <div
              key={company.id}
              className="group flex flex-col items-center"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-background p-2 transition-all duration-300">
                {isEditMode ? (
                  <EditableImage
                    contentKey={`subsidiary-logo-${company.id}`}
                    page="home"
                    section="subsidiaries"
                    defaultSrc={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                  />
                )}
              </div>
              <span className="mt-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <EditableText
                  contentKey={`subsidiary-name-${company.id}`}
                  page="home"
                  section="subsidiaries"
                  defaultValue={company.name}
                  className="text-xs"
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subsidiaries;
