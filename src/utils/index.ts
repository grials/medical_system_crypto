export * from './hash';
export * from './rsaEncryption';
export * from './symmetrical';

export const validData = (data: any) => {
  if (typeof data === 'string' && data) return true;
  if (typeof data === 'number') return true;

  return false;
};
