import { ICodeableConcept } from '.';
import { IPeriod } from './period';

export type IdentificationUse = 'usual' | 'official' | 'temp' | 'secondary' | 'old';

export interface IIdentification {
  use: IdentificationUse;
  identifierType: ICodeableConcept;
  system: string;
  value: string;
  period: IPeriod;
  assigner: string;
}
