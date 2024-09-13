import { IHumanName, IIdentification } from './interfaces';

const capitalizeString = (text: string) =>
  text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const removeAccents = (text: string) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const formatStrings = (text: string) =>
  `${removeAccents(text.toLowerCase())},${removeAccents(text.toUpperCase())},${removeAccents(capitalizeString(text))}`;

export const createIndexes = (document: any) => {
  const indexes: any[] = [];

  if (document.identifier) {
    document.identifier.map((item: IIdentification) => indexes.push(`${item.value}`));
  }

  if (document.name && document.name instanceof Array) {
    const names: any[] = [];
    document.name.map((item: IHumanName) => {
      names.push(...item.text.split(' '));
      names.push(...item.family.split(' '));

      if (item.prefix && item.prefix.length) {
        names.push(...item.prefix[0].split(' '));
      }

      if (item.suffix && item.suffix.length) {
        names.push(...item.suffix[0].split(' '));
      }
    });
    names.map((items) => {
      indexes.push(...formatStrings(items).split(','));
    });
  }
  return indexes.filter((value) => value !== null);
};
