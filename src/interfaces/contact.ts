import { ICodeableConcept, ICustomerOrganization } from '.';
import { IAddress } from './address';
import { IContactPoint } from './contactPoint';
import { IHumanName } from './humanName';
import { IIdentification } from './identification';
import { IPeriod } from './period';

export type RelationshipType = 'C' | 'E' | 'F' | 'I' | 'N' | 'S' | 'MOTHER' | 'FATHER' | 'REP' | 'U';
// 'Emergency Contact' | 'Employer' | 'Federal Agency' | 'Insurance Company' | 'Next-of-Kin' | 'State of Agency' | 'Mother' | 'Father' | 'Unknown';

export interface IContact {
  relationship: ICodeableConcept;
  name: IHumanName;
  identifier: IIdentification[];
  telecom: IContactPoint[];
  address: IAddress;
  gender: ICodeableConcept;
  organization: ICustomerOrganization;
  period: IPeriod;
}
