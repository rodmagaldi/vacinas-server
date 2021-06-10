import { Service } from 'typedi';
import { Request, Response } from 'express';

@Service()
export class HelloWorldUseCase {
  exec(request: Request, response: Response): Response {
    return response.json({
      helloWorld: 'Hello World!',
    });
  }
}
