import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { envConfig } from 'env-config';
import { routes } from '@rest/index.routes';

export async function setup() {
  envConfig();
  await connectToDatabase();
  await runServer();
}

export async function connectToDatabase() {
  try {
    const connection = await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/data/db/entity/index.{ts,js}'],
      synchronize: false,
      logging: false,
    });
    // Run migrations so test database is properly setup to Github's testing workflow
    if (process.env.NODE_ENV === 'test') {
      await connection.runMigrations();
    }
    console.log('Database connection successful');
  } catch (err) {
    throw err;
  }
}

export function runServer() {
  const app = express();

  app.use(express.json());
  app.use(routes);

  app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}\n`));
}
