import Container, { Service } from 'typedi';
import { AuthDatasource } from '@server/data/source/auth.datasource';
import { User } from '@data/db/entity';
import { CreateUserDTO } from '@domain/model';

@Service()
export class RegisterUserUseCase {
  async exec(input: CreateUserDTO): Promise<User> {
    const authDatasource = Container.get(AuthDatasource);
    const user = await authDatasource.createUser(input);
    return user;
  }
}
