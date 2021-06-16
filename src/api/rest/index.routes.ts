import Router from 'express';
import { helloWorldRouter } from '@rest/module/hello-world/routes';
import { userRouter } from '@rest/module/user/routes';
import { addressRouter } from './module/address/routes';

export const routes = Router();

// Use routes from all modules
routes.use(helloWorldRouter);
routes.use('/users', userRouter);
routes.use('/address', addressRouter);
