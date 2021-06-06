import { Service } from 'typedi';
import { Response } from 'express';

@Service()
export class HelloWorldUseCase {
  exec(response: Response): Response {
    return response.json({
      helloWorld: 'Hello, world!',
    });
  }
}
