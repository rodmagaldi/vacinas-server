import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import { User, Address } from '@data/db/entity';
import { CreateUserDTO } from '@domain/model';

@Service()
export class AuthDatasource {
  listUsers = async (): Promise<User[]> => {
    const repository = getRepository(User);
    const users = await repository.find();
    return users;
  };

  createUser = async (input: CreateUserDTO): Promise<User> => {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    const address = addressRepository.create(input.address);
    const savedAddress = await addressRepository.save(address);

    const user = userRepository.create(input.user);
    user.address = savedAddress;
    const savedUser = await userRepository.save(user);

    return savedUser;
  };
}
