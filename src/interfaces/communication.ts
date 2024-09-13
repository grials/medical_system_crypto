import { ICodeableConcept } from '.';

export interface ICommunication {
  language: ICodeableConcept;
  preferred: boolean;
}
