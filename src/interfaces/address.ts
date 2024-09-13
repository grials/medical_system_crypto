import { ICodeableConcept } from '.';
import { IPeriod } from './period';

export type AddressUse = 'home' | 'work' | 'temp' | 'old' | 'billing';
export type AddressType = 'postal' | 'physical' | 'both';

export interface IAddress {
  use: AddressUse;
  type: AddressType;
  text: string;
  line: string[];
  city: string;
  district: string;
  state: string;
  postalCode: string;
  country: ICodeableConcept;
  period: IPeriod;
  geoReference: string;
  geoZone?: string;
}
