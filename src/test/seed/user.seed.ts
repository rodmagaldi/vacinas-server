import { mockUsers } from '@test/mock';
import { getRepository } from 'typeorm';
import { User } from '@data/db/entity';
import { BaseError } from '@server/error/error';

export async function seedUsers(numberOfUsers: number) {
  const usersRepository = getRepository(User);
  const usersList = await mockUsers(numberOfUsers);
  const savedUsers = usersRepository.create(usersList);
  try {
    await usersRepository.save(savedUsers);
  } catch (err) {
    console.log(err);
    throw new BaseError('Não foi possível realizar o seed.');
  }
}
