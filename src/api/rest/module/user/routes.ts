/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import Router from 'express';
import { ListUsersUseCase, RegisterUserUseCase, RegisterMultipleUserUseCase } from '@server/domain/user';
import Container from 'typedi';
import { Request, Response } from 'express';

export const userRouter = Router();
const listUsersUseCase = Container.get(ListUsersUseCase);
const registerUserUseCase = Container.get(RegisterUserUseCase);
const registerMultipleUserUseCase = Container.get(RegisterMultipleUserUseCase);

userRouter.get('/', async (req: Request, res: Response) => {
  const response = await listUsersUseCase.exec();
  return res.json(response);
});

userRouter.post('/register', async (req: Request, res: Response) => {
  const response = await registerUserUseCase.exec(req.body);
  return res.json(response);
});

userRouter.post('/register-multiple', async (req: Request, res: Response) => {
  const response = await registerMultipleUserUseCase.exec(req.body);
  return res.json(response);
});

// TODO:
// - APIs para validacao de um campo por vez? (cpf, teleofne...)
// - documentacao (swagger?)
