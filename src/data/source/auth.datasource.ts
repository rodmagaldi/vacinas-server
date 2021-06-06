import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import { User } from '../db/entity';

@Service()
export class AuthDatasource {
  listUsers = async (): Promise<User[]> => {
    const repository = getRepository(User);
    const users = await repository.find();
    return users;
  };
}
