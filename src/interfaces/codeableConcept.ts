import { ICoding } from './coding';

export interface IDisplay {
  language: string;
  value: string;
  abbreviation?: string;
}
export interface ICodeableConcept {
  coding?: ICoding[];
  text?: string;
  displays?: IDisplay[];
  value?: number;
  active: boolean;
}
