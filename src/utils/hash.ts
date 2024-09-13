import { scryptSync, createHmac as HMAC, createHash as HASH, timingSafeEqual } from 'crypto';

const defualtSalt = ['SALT_', ...Array(11).map(() => '0')].join('');

export const createHmac = (value: string, key: string) => {
  return HMAC('sha256', key).update(value).digest('hex');
};
export const verifyHmac = (value: string, key: string, hmac: string) => {
  return HMAC('sha256', key).update(value).digest('hex') === hmac;
};

export const createHash = (value: string, salt?: string): string => {
  return scryptSync(value, salt || defualtSalt, 64).toString('hex');
};
export const verifyHash = (value: string, hash: string, salt?: string): boolean => {
  const hashToVerify = createHash(value, salt);
  return timingSafeEqual(Buffer.from(hashToVerify, 'hex'), Buffer.from(hash, 'hex'));
};

export const createBasicHash = (str: string | number): string => {
  return HASH('sha256').update(str.toString()).digest('hex');
};
export const verifyBasicHash = (value: string | number, hash: string) => {
  return hash === createBasicHash(value);
};
