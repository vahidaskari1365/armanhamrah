export const siteUrl = 'https://armanhamrah.com';

export interface BusinessLocation {
  id: string;
  name: string;
  telephone: string;
  telephoneDisplay?: string;
  mobile?: string;
  email?: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
}

export const businessInfo = {
  name: 'آرمان همراه ارتباطات آریا',
  brandName: 'آرمان همراه',
  email: 'info@armanhamrah.com',
  siteUrl,

  headOffice: {
    id: `${siteUrl}/#head-office`,
    name: 'آرمان همراه ارتباطات آریا',
    telephone: '+98-21-88321030',
    telephoneDisplay: '۰۲۱-۸۸۳۲۱۰۳۰-۲',
    streetAddress: 'تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴',
    addressLocality: 'تهران',
    addressRegion: 'تهران',
    postalCode: '1575945341',
    addressCountry: 'IR',
  } as BusinessLocation,

  afterSales: {
    id: `${siteUrl}/#after-sales`,
    name: 'آرمان همراه - خدمات پس از فروش',
    telephone: '+98-21-58798',
    telephoneDisplay: '۰۲۱-۵۸۷۹۸',
    streetAddress: 'تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴',
    addressLocality: 'تهران',
    addressRegion: 'تهران',
    postalCode: '1575945335',
    addressCountry: 'IR',
  } as BusinessLocation,

  store: {
    id: `${siteUrl}/#store`,
    name: 'آرمان همراه - فروشگاه',
    telephone: '+98-21-66745916',
    mobile: '+98-993-1635153',
    telephoneDisplay: '۰۲۱-۶۶۷۴۵۹۱۶ / ۰۹۹۳۱۶۳۵۱۵۳',
    streetAddress: 'تهران، خیابان جمهوری، پاساژ علاءالدین، طبقه ششم، پلاک ۶۱۴',
    addressLocality: 'تهران',
    addressRegion: 'تهران',
    addressCountry: 'IR',
  } as BusinessLocation,

  geo: {
    latitude: 35.6892,
    longitude: 51.389,
  },

  openingHours: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '09:00',
    closes: '18:00',
  },
};

export default businessInfo;
