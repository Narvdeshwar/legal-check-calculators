import { Region } from './types';

export interface CountryInfo {
  name: string;
  flag: string;
  continent: string;
}

export const countryData: Record<Region, CountryInfo> = {
  us: { name: 'United States', flag: '🇺🇸', continent: 'Americas' },
  india: { name: 'India', flag: '🇮🇳', continent: 'Asia' },
  mexico: { name: 'Mexico', flag: '🇲🇽', continent: 'Americas' },
  romania: { name: 'Romania', flag: '🇷🇴', continent: 'Europe' },
  ireland: { name: 'Ireland', flag: '🇮🇪', continent: 'Europe' },
  uk: { name: 'United Kingdom', flag: '🇬🇧', continent: 'Europe' },
  canada: { name: 'Canada', flag: '🇨🇦', continent: 'Americas' },
  australia: { name: 'Australia', flag: '🇦🇺', continent: 'Oceania' },
  pakistan: { name: 'Pakistan', flag: '🇵🇰', continent: 'Asia' },
  germany: { name: 'Germany', flag: '🇩🇪', continent: 'Europe' },
  switzerland: { name: 'Switzerland', flag: '🇨🇭', continent: 'Europe' },
};
