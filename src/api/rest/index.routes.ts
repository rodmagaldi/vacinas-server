import Router from 'express';
import { helloWorldRouter } from '@rest/module/hello-world/routes';

export const routes = Router();

routes.use(helloWorldRouter);
