import { mockUsers } from '@test/mock';
import { getRepository } from 'typeorm';
import { User } from '@data/db/entity';

export async function seedUsers(numberOfUsers: number) {
  const usersRepository = getRepository(User);
  const usersList = await mockUsers(numberOfUsers);

  const savedUsers = usersRepository.create(usersList);
  await usersRepository.save(savedUsers);
}
