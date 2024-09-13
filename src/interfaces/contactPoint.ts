import { IPeriod } from './period';

export type ContactPointSystem = 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
export type ContactPointUse = 'home' | 'work' | 'temp' | 'old' | 'mobile' | 'administrative';

export interface IContactPoint {
  system: ContactPointSystem;
  value: string;
  use: ContactPointUse;
  rank: number;
  period: IPeriod;
}
