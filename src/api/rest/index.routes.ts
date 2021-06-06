import Router from 'express';
import { helloWorldRouter } from '@rest/module/hello-world/routes';
import { userRouter } from '@rest/module/user/routes';

export const routes = Router();

// Use routes from all modules
routes.use(helloWorldRouter);
routes.use('/users', userRouter);
