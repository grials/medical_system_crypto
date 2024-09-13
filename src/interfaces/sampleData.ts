import { IQuantity } from './quantity';
export interface ISampleData {
  origin: IQuantity;
  period: number;
  factor: number;
  lowerLimit: number;
  upperLimit: number;
  dimensions: number;
  data: string;
}
