import { envConfig } from 'env-config';
import { connectToDatabase } from 'setup-server';
import { mockUsers } from '@test/mock';

export async function seedUsers(numberOfUsers: number) {
  envConfig();
  await connectToDatabase();
  await mockUsers(numberOfUsers);
}

seedUsers(10);
