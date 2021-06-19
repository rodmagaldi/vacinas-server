import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { createConnection, useContainer } from 'typeorm';
import Container from 'typedi';
import { envConfig } from 'env-config';
import { routes } from '@rest/index.routes';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { BaseError } from './error/error';

export async function setup() {
  envConfig();
  await connectToDatabase();
  await runServer();
}

export async function connectToDatabase() {
  try {
    useContainer(Container);
    const connection = await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/data/db/entity/index.{ts,js}'],
      synchronize: false,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
      migrations: [__dirname + '/data/db/migration/*.{ts,js}'],
    });
    // Run migrations so test database is properly setup to Github's testing workflow
    if (process.env.NODE_ENV === 'test') {
      await connection.runMigrations();
    }
    console.log('Database connection successful');
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function runServer() {
  const app = express();

  app.use(express.json());
  app.use(routes);
  app.use(cors());

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof BaseError) {
      return res.status(err.code).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err);

    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  });

  app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}\n`));
}
