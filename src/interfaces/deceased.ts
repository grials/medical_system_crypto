import { ICodeableConcept } from '.';

export interface IDeceased {
  deceasedBoolean: boolean;
  deceasedDateTime?: Date;
  deceasedPlace?: ICodeableConcept;
}
