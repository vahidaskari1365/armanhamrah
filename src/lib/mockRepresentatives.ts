export interface Representative {
  id?: number;
  name: string; // Will now be a translation key
  province: string; // Will now be a translation key
  city: string; // Will now be a translation key
  phone: string; // Phone numbers are universal
  address: string; // Will now be a translation key
}

export const mockRepresentatives: Representative[] = [
  {
    id: 1,
    name: 'rep.store.mobile_house',
    province: 'province.tehran',
    city: 'city.tehran',
    phone: '021-44643358',
    address: 'rep.address.1'
  },
  {
    id: 2,
    name: 'rep.store.classic_mobile',
    province: 'province.tehran',
    city: 'city.tehran',
    phone: '021-66347230',
    address: 'rep.address.2'
  },
  {
    id: 3,
    name: 'rep.store.persian_mobile',
    province: 'province.tehran',
    city: 'city.tehran',
    phone: '021-66728954',
    address: 'rep.address.3'
  },
  {
    id: 4,
    name: 'rep.store.paytakht_mobile',
    province: 'province.tehran',
    city: 'city.tehran',
    phone: '021-88776655',
    address: 'rep.address.4'
  },
  {
    id: 5,
    name: 'rep.store.mobile_world_isfahan',
    province: 'province.isfahan',
    city: 'city.isfahan',
    phone: '031-32214567',
    address: 'rep.address.5'
  },
  {
    id: 6,
    name: 'rep.store.mobile_world_shiraz',
    province: 'province.fars',
    city: 'city.shiraz',
    phone: '071-32334455',
    address: 'rep.address.6'
  },
  {
    id: 7,
    name: 'rep.store.communication_era',
    province: 'province.khorasan_razavi',
    city: 'city.mashhad',
    phone: '051-38445566',
    address: 'rep.address.7'
  },
  {
    id: 8,
    name: 'rep.store.online_mobile',
    province: 'province.east_azerbaijan',
    city: 'city.tabriz',
    phone: '041-35556677',
    address: 'rep.address.8'
  }
];
