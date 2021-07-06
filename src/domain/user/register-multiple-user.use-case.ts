import Container, { Service } from 'typedi';
import { AuthDatasource } from '@server/data/source/auth.datasource';
import { User } from '@data/db/entity';
import { CreateUserDTO } from '@domain/model';

@Service()
export class RegisterMultipleUserUseCase {
  async exec(input: CreateUserDTO[]): Promise<User[]> {
    const authDatasource = Container.get(AuthDatasource);
    const user = await authDatasource.createMultipleUser(input);
    return user;
  }
}
