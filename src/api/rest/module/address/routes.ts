/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import Router from 'express';
import Container from 'typedi';
import { Request, Response } from 'express';
import { GetAddressFromPostalCodeUseCase } from '@domain/address';
import { body } from 'express-validator';
import { isValidPostalCode, validate } from '@rest/common';

export const addressRouter = Router();

const getAddressFromPostalCodeUseCase = Container.get(GetAddressFromPostalCodeUseCase);

const postalCodeValidators = [body('postalCode').custom(isValidPostalCode)];
addressRouter.patch(
  '/postal-code',
  validate(postalCodeValidators, 'CEP inválido. Digite apenas 8 números.'),
  async (req: Request, res: Response) => {
    const response = await getAddressFromPostalCodeUseCase.exec(req.body);
    return res.json(response);
  },
);
