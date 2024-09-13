export interface IConfig {
  demographicDataRequired: boolean;
  historySerialization: {
    active: boolean;
    currentNumber: number;
  };
  licenseKey: string;
  active: boolean;
}
