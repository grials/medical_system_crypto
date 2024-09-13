import { ICodeableConcept } from '.';
import { IQuantity } from './quantity';
import { IRange } from './range';
export interface IReferenceRange {
  low?: IQuantity;
  high?: IQuantity;
  type?: ICodeableConcept;
  appliesTo?: ICodeableConcept;
  age?: IRange;
  text?: string;
}
