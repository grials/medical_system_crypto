import { IOrganizationalChart } from '.';
import { ICodeableConcept } from './codeableConcept';
import { ICoding } from './coding';
export interface IProcedureType {
  code: ICoding[];
  specialty: ICodeableConcept;
  name: string;
  description: string;
  findings: string;
  duration: number;
  aplicableToProcedures: boolean;
  aplicableToAppointments: boolean;
  licenseKey: string;
  active: boolean;
  category: 'appointment' | 'clinical' | 'surgery';
  assistanceMode?: ICodeableConcept; // enumerables/consultationTypes/
  attachedTo?: IOrganizationalChart[];
}
