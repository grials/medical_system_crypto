import { IPeriod } from './period';

export type HumanNameUse = 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';

export interface IHumanName {
  use: HumanNameUse;
  text: string;
  family: string;
  given: string[];
  prefix: string[];
  suffix: string[];
  period: IPeriod;
}
