import { createIndexes } from './blindIndex';
import { decryptDoc } from './decryptDoc';
import { encryptDoc } from './encryptDoc';
import { symmetricalDecryption, symmetricalEncryption, generateSymmetricalBlindValue } from './utils';

export const encryptDocument = (password: string, document: any) => encryptDoc(password, document);

export const decryptDocument = (password: string, document: any) => decryptDoc(password, document);

export const generateBlindValue = (password: string, text: string): number =>
  generateSymmetricalBlindValue(text, password);

export const encryptValue = (password: string, text: string) => symmetricalEncryption(text, password);

export const decryptValue = (password: string, text: string) => symmetricalDecryption(text, password);

export const createBlindIndex = (password: string, document: any): string[] =>
  createIndexes(document)
    .map((value: any) => generateSymmetricalBlindValue(value, password)?.toString())
    .filter((value) => value);

export * from './utils';
