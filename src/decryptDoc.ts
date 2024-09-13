import { IAddress, IContactPoint, IHumanName, IIdentification } from './interfaces';
import { symmetricalDecryption } from './utils';

// Encrypt nested array
export const decryptIdentifier = (key: string, identifier: IIdentification[]) => {
  const mr = identifier.filter((ident: IIdentification) => ident?.identifierType?.text === 'medical_record.MR');
  const identifierWithoutMR = identifier
    .filter((ident: IIdentification) => ident?.identifierType?.text !== 'medical_record.MR')
    .map((item: IIdentification) => {
      return { ...item, ...{ value: symmetricalDecryption(item?.value, key) } };
    });

  return [...identifierWithoutMR, ...mr];
};

export const decryptName = (key: string, name: IHumanName | IHumanName[]): IHumanName | IHumanName[] => {
  if (name instanceof Array) {
    return name.map((item: IHumanName) => {
      if (item?.text && typeof item?.text === 'string') {
        item.text = symmetricalDecryption(item?.text, key);
      }
      if (item?.family && typeof item?.family === 'string') {
        item.family = symmetricalDecryption(item?.family, key);
      }
      return {
        ...item,
      };
    });
  } else {
    if (name?.text && typeof name?.text === 'string') {
      name.text = symmetricalDecryption(name?.text, key);
    }
    if (name?.family && typeof name?.family === 'string') {
      name.family = symmetricalDecryption(name?.family, key);
    }

    return {
      ...name,
    };
  }
};

export const decryptAddress = (key: string, address: IAddress[]) =>
  address.map((item: IAddress) => {
    const newItem = { ...item };

    if (newItem?.text && typeof newItem?.text === 'string') {
      newItem.text = symmetricalDecryption(newItem?.text, key);
    }
    if (newItem?.postalCode && typeof newItem?.postalCode === 'string') {
      newItem.postalCode = symmetricalDecryption(newItem?.postalCode, key);
    }
    if (newItem?.geoReference && typeof newItem?.geoReference === 'string') {
      newItem.geoReference = symmetricalDecryption(newItem?.geoReference, key);
    }
    return newItem;
  });

export const decryptTelecom = (key: string, telecom: IContactPoint[]) =>
  telecom.map((item: IContactPoint) => {
    const newItem = { ...item };
    if (newItem?.value && typeof newItem?.value === 'string') {
      newItem.value = symmetricalDecryption(newItem.value, key);
    }
    return newItem;
  });

//  Encrypt main document
export const decryptDoc = (key: string, document: any) => {
  if (!document) {
    return document;
  }
  // Encrypt specific value to validations
  if (document.identifier && document.identifier.length > 0) {
    document = {
      ...document,
      ...{
        identifier: decryptIdentifier(key, document.identifier),
      },
    };
  }

  if (document.name && typeof document.name !== 'string') {
    document = {
      ...document,
      ...{
        name: decryptName(key, document.name),
      },
    };
  }

  if (document.address && document.address.length > 0) {
    document = {
      ...document,
      ...{
        address: decryptAddress(key, document.address),
      },
    };
  }

  if (document.telecom && document.telecom.length > 0) {
    document = {
      ...document,
      ...{
        telecom: decryptTelecom(key, document.telecom),
      },
    };
  }

  if (document.practitioner) {
    document = {
      ...document,
      ...{
        practitioner: decryptDoc(key, document.practitioner),
      },
    };
  }

  if (document.patient) {
    document = {
      ...document,
      patient: decryptDoc(key, document.patient),
    };
  }

  return document;
};
