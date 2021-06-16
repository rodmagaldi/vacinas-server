import * as cpf from 'cpf';
import { name, internet, phone } from 'faker';
import { User } from '@server/data/db/entity';
import { RaceOptions, GenderOptions } from '@server/domain/model';

export async function mockUsers(numberOfUsers: number): Promise<Partial<User[]>> {
  const usersList = [];

  for (let i = 0; i < numberOfUsers; i++) {
    const user = mockUser();
    usersList.push(user);
  }

  return usersList;
}

export function mockUser(): Partial<User> {
  return {
    firstName: name.firstName(),
    lastName: name.lastName(),
    email: internet.email(),
    cpf: cpf.generate(),
    cns: cpf.generate(),
    phone: phone.phoneNumber(),
    race: RaceOptions.branco,
    gender: GenderOptions.feminino,
    motherName: name.firstName(),
  };
}
