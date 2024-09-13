import { IAddress, ICodeableConcept, IContactPoint } from '.';
import { IAttachment } from './attachment';

export interface IOrganizationalChart {
  name: string;
  administrable: boolean;
  dependency: any;
  user: string;
  email: string;
  telecom: IContactPoint[];
  address: IAddress[];
  attributes: ICodeableConcept[];
  adminAttributes: ICodeableConcept[];
  logo: IAttachment;
  seal: IAttachment;
  signing: IAttachment;
  licenseKey: string;
  active: boolean;
}
