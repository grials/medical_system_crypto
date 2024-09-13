import { IDeceased, IOrganizationalChart } from '.';
import { IAddress } from './address';
import { IAttachment } from './attachment';
import { ICodeableConcept } from './codeableConcept';
import { ICommunication } from './communication';
import { IContact } from './contact';
import { IContactPoint } from './contactPoint';
import { IHumanName } from './humanName';
import { IIdentification } from './identification';
import { ILink } from './link';
import { IPractitioner } from './practitioner';

export interface IPatient {
  resourceType: 'Patient';
  identifier: IIdentification[];
  active: boolean;
  name: IHumanName[];
  telecom: IContactPoint[];
  gender: ICodeableConcept;
  handedness: ICodeableConcept;
  birthDate: Date;
  birthPlace: ICodeableConcept;
  nationality: ICodeableConcept[];
  citizenship: ICodeableConcept[];
  deceased: IDeceased;
  address: IAddress[];
  maritalStatus: ICodeableConcept;
  multipleBirth: ICodeableConcept;
  photo: IAttachment[];
  profession: ICodeableConcept;
  contact: IContact[] /* contact: [contactSubSchemaDefinition] Fix temporal 28/01/2022*/;
  communication: ICommunication[];
  generalPractitioner: IPractitioner[];
  managingOrganization: IOrganizationalChart;
  link: ILink[];
  notes: string;
  admission?: {
    status: boolean;
    encounter: any;
  };
  licenseKey: string;
  user: string;
}
