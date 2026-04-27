import { Region } from './types';

export interface CountryInfo {
  name: string;
  flag: string;
  continent: string;
  isoCode: string;
}

export const countryData: Record<Region, CountryInfo> = {
  us: { name: 'United States', flag: '🇺🇸', continent: 'Americas', isoCode: 'US' },
  india: { name: 'India', flag: '🇮🇳', continent: 'Asia', isoCode: 'IN' },
  mexico: { name: 'Mexico', flag: '🇲🇽', continent: 'Americas', isoCode: 'MX' },
  romania: { name: 'Romania', flag: '🇷🇴', continent: 'Europe', isoCode: 'RO' },
  ireland: { name: 'Ireland', flag: '🇮🇪', continent: 'Europe', isoCode: 'IE' },
  uk: { name: 'United Kingdom', flag: '🇬🇧', continent: 'Europe', isoCode: 'GB' },
  canada: { name: 'Canada', flag: '🇨🇦', continent: 'Americas', isoCode: 'CA' },
  australia: { name: 'Australia', flag: '🇦🇺', continent: 'Oceania', isoCode: 'AU' },
  pakistan: { name: 'Pakistan', flag: '🇵🇰', continent: 'Asia', isoCode: 'PK' },
  germany: { name: 'Germany', flag: '🇩🇪', continent: 'Europe', isoCode: 'DE' },
  switzerland: { name: 'Switzerland', flag: '🇨🇭', continent: 'Europe', isoCode: 'CH' },
};
