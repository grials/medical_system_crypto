import { ICodeableConcept, IIdentification } from '.';
import { IAddress } from './address';
import { IContactPoint } from './contactPoint';
import { IHumanName } from './humanName';

export interface ICustomerOrganization {
  name: string;
  identifier: IIdentification[];
  contact: [
    {
      name: IHumanName[];
      position: string;
    },
  ];
  address: IAddress[];
  contactInformation: IContactPoint[];
  comercialActivity: string[];
  personType: ICodeableConcept;
  licenseKey: string;
  user: string;
  active: boolean;
  organizationType: ICodeableConcept;
  organizationActivity: ICodeableConcept;
}
