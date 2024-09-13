import { ICodeableConcept, ICustomerOrganization } from '.';
import { ICoding } from './coding';
import { IContact } from './contact';
import { IIdentification } from './identification';
import { IPeriod } from './period';

export type Status = 'active' | 'suspended' | 'error' | 'off' | 'entered-in-error' | 'test';

export interface IEndpoint {
  identifier: IIdentification;
  status: Status;
  connectionType: ICoding;
  name: string;
  managingOrganization: ICustomerOrganization;
  contact: IContact[];
  period: IPeriod;
  payloadType: ICodeableConcept;
  address: string;
  header: string;
}
