import { CustomValidator } from 'express-validator';

export const isValidPostalCode: CustomValidator = (value: any) => {
  const POSTAL_CODE_PATTERN = /^\d{8}$/;
  return POSTAL_CODE_PATTERN.test(value);
};
