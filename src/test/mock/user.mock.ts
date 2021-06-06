import * as cpf from 'cpf';
import { name, internet } from 'faker';
import { User } from '@server/data/db/entity';
import { getRepository } from 'typeorm';

export async function mockUsers(numberOfUsers: number): Promise<void> {
  const usersRepository = getRepository(User);

  const usersList = [];

  for (let i = 0; i < numberOfUsers; i++) {
    const user: Partial<User> = {
      firstName: name.firstName(),
      lastName: name.lastName(),
      email: internet.email(),
      cpf: cpf.generate(),
    };
    const newUser = usersRepository.create(user);
    usersList.push(newUser);
  }

  await usersRepository.save(usersList);
}
