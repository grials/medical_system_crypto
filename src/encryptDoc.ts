import { IAddress, IContactPoint, IHumanName, IIdentification } from './interfaces';
import { symmetricalEncryption } from './utils';

// Encrypt nested array
export const encryptIdentifier = (key: string, identifier: IIdentification[]) => {
  const mr = identifier.filter((ident: IIdentification) => ident?.identifierType?.text === 'medical_record.MR');
  const identifierWithoutMR = identifier
    .filter((ident: IIdentification) => ident?.identifierType?.text !== 'medical_record.MR')
    .map((item: IIdentification) => {
      return { ...item, ...{ value: symmetricalEncryption(item?.value, key) } };
    });

  return [...identifierWithoutMR, ...mr];
};

export const encryptName = (key: string, name: IHumanName | IHumanName[]): IHumanName | IHumanName[] => {
  if (name instanceof Array) {
    return name.map((item: IHumanName) => {
      if (item?.text && typeof item?.text === 'string') {
        item.text = symmetricalEncryption(item?.text, key);
      }
      if (item?.family && typeof item?.family === 'string') {
        item.family = symmetricalEncryption(item?.family, key);
      }
      return {
        ...item,
      };
    });
  } else {
    if (name?.text && typeof name?.text === 'string') {
      name.text = symmetricalEncryption(name?.text, key);
    }
    if (name?.family && typeof name?.family === 'string') {
      name.family = symmetricalEncryption(name?.family, key);
    }

    return {
      ...name,
    };
  }
};

export const encryptAddress = (key: string, address: IAddress[]) =>
  address.map((item: IAddress) => {
    const newItem = { ...item };

    if (newItem?.text && typeof newItem?.text === 'string') {
      newItem.text = symmetricalEncryption(newItem?.text, key);
    }
    if (newItem?.postalCode && typeof newItem?.postalCode === 'string') {
      newItem.postalCode = symmetricalEncryption(newItem?.postalCode, key);
    }
    if (newItem?.geoReference && typeof newItem?.geoReference === 'string') {
      newItem.geoReference = symmetricalEncryption(newItem?.geoReference, key);
    }
    return newItem;
  });

export const encryptTelecom = (key: string, telecom: IContactPoint[]) =>
  telecom.map((item: IContactPoint) => {
    const newItem = { ...item };
    if (newItem?.value && typeof newItem?.value === 'string') {
      newItem.value = symmetricalEncryption(newItem.value, key);
    }
    return newItem;
  });

//  Encrypt main document
export const encryptDoc = (key: string, document: any) => {
  if (!document) {
    return document;
  }
  // Encrypt specific value to validations
  if (document.identifier && document.identifier.length > 0) {
    document = {
      ...document,
      ...{
        identifier: encryptIdentifier(key, document.identifier),
      },
    };
  }

  if (document.name && typeof document.name !== 'string') {
    document = {
      ...document,
      ...{
        name: encryptName(key, document.name),
      },
    };
  }

  if (document.address && document.address.length > 0) {
    document = {
      ...document,
      ...{
        address: encryptAddress(key, document.address),
      },
    };
  }

  if (document.telecom && document.telecom.length > 0) {
    document = {
      ...document,
      ...{
        telecom: encryptTelecom(key, document.telecom),
      },
    };
  }

  if (document.practitioner) {
    document = {
      ...document,
      ...{
        practitioner: encryptDoc(key, document.practitioner),
      },
    };
  }

  if (document.patient) {
    document = {
      ...document,
      patient: encryptDoc(key, document.patient),
    };
  }

  return document;
};
