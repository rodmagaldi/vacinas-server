import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import { User } from '../db/entity';
import { CreateUserDTO } from '@domain/model';

@Service()
export class AuthDatasource {
  listUsers = async (): Promise<User[]> => {
    const repository = getRepository(User);
    const users = await repository.find();
    return users;
  };

  createUser = async (input: CreateUserDTO): Promise<User> => {
    const repository = getRepository(User);
    const user = repository.create(input);
    await repository.save(user);
    return user;
  };
}
