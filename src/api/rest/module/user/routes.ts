/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import Router from 'express';
import { ListUsersUseCase } from '@server/domain/user';
import Container from 'typedi';
import { Request, Response } from 'express';

export const userRouter = Router();
const listUsersUseCase = Container.get(ListUsersUseCase);

userRouter.get('/', async (req: Request, res: Response) => {
  const response = await listUsersUseCase.exec();
  return res.json(response);
});
