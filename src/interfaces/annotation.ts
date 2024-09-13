import { IPractitioner } from '.';

export interface IAnnotation {
  author: IPractitioner;
  time: Date;
  text: string;
}
