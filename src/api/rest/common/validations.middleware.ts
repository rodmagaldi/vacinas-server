import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { BaseError } from '@server/error/error';

export const validate = (checks: ValidationChain[], message: string) => [
  ...checks,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors['errors'].length > 0) {
      throw new BaseError(message);
    }

    next();
  },
];
