import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BaseError } from '@server/error/error';

export const validate = (checks: any, message: string) => [
  ...checks,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors['errors'].length > 0) {
      throw new BaseError(message);
    }

    next();
  },
];
