import { generateKeyPairSync, privateDecrypt, createSign, createVerify, publicEncrypt } from 'crypto';
import { validData } from '.';
import { RSA_SIGN_ALGORITHM } from '../contants';

interface IRsaKeys {
  privateKey: string;
  publicKey: string;
}

export const generateRsaKeys = (): IRsaKeys => {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  return {
    privateKey,
    publicKey,
  };
};

export const rsaEncryption = (value: any, publicKey: string): string => {
  if (!validData(value)) {
    return value;
  }

  return publicEncrypt(publicKey, Buffer.from(value)).toString('hex');
};

export const rsaDecryption = (value: any, privateKey: string) => {
  if (!validData(value)) {
    return value;
  }

  try {
    return privateDecrypt(privateKey, Buffer.from(value?.toString(), 'hex')).toString('utf-8');
  } catch (error: any) {
    throw new Error(`Bad decryption: ${error.toString()}`);
  }
};

export const createRsaDataSign = (value: any, privateKey: string): string => {
  if (!validData(value)) {
    return value;
  }
  return createSign(RSA_SIGN_ALGORITHM).update(value).sign(privateKey, 'hex');
};

export const verifyRsaDataSign = (value: any, dataSigned: string, publicKey: string): boolean => {
  if (!validData(value)) {
    return false;
  }

  return createVerify(RSA_SIGN_ALGORITHM).update(value).verify(publicKey, dataSigned, 'hex');
};
