/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import Router from 'express';
import { ListUsersUseCase, RegisterUserUseCase } from '@server/domain/user';
import Container from 'typedi';
import { Request, Response } from 'express';

export const userRouter = Router();
const listUsersUseCase = Container.get(ListUsersUseCase);
const registerUserUseCase = Container.get(RegisterUserUseCase);

userRouter.get('/', async (req: Request, res: Response) => {
  const response = await listUsersUseCase.exec();
  return res.json(response);
});

userRouter.post('/register', async (req: Request, res: Response) => {
  const response = await registerUserUseCase.exec(req.body);
  return res.json(response);
});

// TODO:
// - enviar infos de endereco no request de criacao de usuario
//   - deve ter validacao? e se for no caso sem internet?
//   - poderia cair no caso de ter coletado dados que nao vao poder ser validados no final
// - atualizar e completar casos de teste
// - APIs para validacao de um campo por vez? (cpf, teleofne...)
// - documentacao (swagger?)
