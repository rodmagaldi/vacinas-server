/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import Router from 'express';
import Container from 'typedi';
import { Request, Response } from 'express';
import { GetAddressFromPostalCodeUseCase } from '@domain/address';

export const addressRouter = Router();

const getAddressFromPostalCodeUseCase = Container.get(GetAddressFromPostalCodeUseCase);

addressRouter.patch('/postal-code', async (req: Request, res: Response) => {
  const response = await getAddressFromPostalCodeUseCase.exec(req.body);
  return res.json(response);
});
