import { ICodeableConcept } from '.';

export interface IDuration {
  value: string;
  unit: ICodeableConcept;
}
