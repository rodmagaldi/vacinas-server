import Container, { Service } from 'typedi';
import { AuthDatasource } from '@server/data/source/auth.datasource';
import { User } from '@data/db/entity';

@Service()
export class ListUsersUseCase {
  async exec(): Promise<User[]> {
    const authDatasource = Container.get(AuthDatasource);
    const users = await authDatasource.listUsers();
    return users;
  }
}
