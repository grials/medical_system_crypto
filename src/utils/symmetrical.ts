import { createCipheriv, createDecipheriv } from 'crypto';
import { createHmac } from './hash';
import { SIMETRIC_ENSCRYPTION_ALGORITHM } from '../contants';
import { validData } from '.';

export interface IKey {
  key: Buffer;
  iv: Buffer;
}

export const symmetricalKeyFromPassword = (password: string, iv?: Buffer): IKey => {
  let hmac = createHmac(password, 'salt');
  if (hmac.length < 32) {
    hmac = [hmac, Array(32 - hmac.length).map(() => '#')].join('');
  }
  return {
    key: Buffer.from(hmac.slice(0, 32)),
    iv: iv || Buffer.alloc(16, 0),
  };
};

export const generateSymmetricalBlindValue = (value: any, password: string): number => {
  if (!validData(value)) {
    return value;
  }
  return Buffer.from(createHmac(value, password)).readUIntLE(0, 6);
};

export const symmetricalEncryption = (value: any, password: string, _iv?: Buffer): string => {
  if (!validData(value)) {
    return value;
  }

  const { key, iv } = symmetricalKeyFromPassword(password, _iv);

  const cipher = createCipheriv(SIMETRIC_ENSCRYPTION_ALGORITHM, key, iv);
  return [cipher.update(value, 'utf8', 'hex'), cipher.final('hex')].join('');
};

export const symmetricalDecryption = (value: string, password: string, _iv?: Buffer): string => {
  try {
    if (!validData(value)) {
      return value;
    }
    const { key, iv } = symmetricalKeyFromPassword(password, _iv);
    const decipher = createDecipheriv(SIMETRIC_ENSCRYPTION_ALGORITHM, key, iv);

    return [decipher.update(value, 'hex', 'utf8'), decipher.final('utf8')].join('');
  } catch (error: any) {
    switch (error.code) {
      case 'ERR_OSSL_BAD_DECRYPT':
        throw error;
      default:
        throw new Error(`Bad decryption: ${error.toString()}`);
    }
  }
};
