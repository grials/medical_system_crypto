import { IAddress } from './address';
import { IAttachment } from './attachment';
import { ICodeableConcept } from './codeableConcept';
import { IContactPoint } from './contactPoint';
import { IHumanName } from './humanName';
import { IIdentification } from './identification';
import { IOrganizationalChart } from './organizationalChart';
import { IPeriod } from './period';

export interface IPractitioner {
  resourceType: 'Practitioner';
  identifier: IIdentification[];
  active: boolean;
  name: IHumanName[];
  telecom: IContactPoint[];
  address: IAddress[];
  gender: ICodeableConcept;
  birthDate: Date;
  photo: IAttachment;
  licenseKey: string;
  qualification: [
    {
      identifier: IIdentification[];
      code: ICodeableConcept;
      period: IPeriod;
      issuer: string;
    },
  ];
  communication: ICodeableConcept[];
  code: string;
  specialty: ICodeableConcept[];
  joinDate: Date;
  notes: string;
  organization: IOrganizationalChart;
  user: string;
  administrativeProfile: {
    isShareholder: boolean;
    withholding: [
      {
        withholdingType: string;
        percentage: number;
      },
    ];
    taxpayerType: string;
    taxWithholding: [
      {
        taxWithholdingType: string;
        percentage: number;
      },
    ];
    bankAccount: {
      accountNumber: number;
      accountType: string;
      accountBank: string;
    };
    association: {
      associationWith: any;
      associationType: string;
      associationDetail: string;
    };
  };
}
