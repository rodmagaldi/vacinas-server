import Router from 'express';
import { HelloWorldUseCase } from '@server/domain/hello-world';
import Container from 'typedi';

export const helloWorldRouter = Router();
const helloWorldUseCase = Container.get(HelloWorldUseCase);

// eslint-disable-next-line @typescript-eslint/unbound-method
helloWorldRouter.get('/hello-world', helloWorldUseCase.exec);
