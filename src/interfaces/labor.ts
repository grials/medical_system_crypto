import { IAddress } from './address';
import { IContact } from './contact';
import { IIdentification } from './identification';

export interface ILabor {
  identifier: IIdentification;
  department: string;
  cargo: string;
  address: IAddress;
  contact: IContact[];
  name: string;
}
