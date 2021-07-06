/* eslint-disable @typescript-eslint/no-misused-promises */
import { getRepository } from 'typeorm';
import request from 'supertest';
import { expect } from 'chai';
import { User, Address } from '@data/db/entity';
import { CreateUserDTO } from '@domain/model';
import { mockUser, mockAddress } from '@server/test/mock';

let requestUrl: string;
const requestBody: CreateUserDTO[] = [];
const NUMBER_OF_USERS = 10;

describe('User - register multiple test', async () => {
  before(async () => {
    for (let i = 0; i < NUMBER_OF_USERS; i++) {
      requestBody.push({
        user: mockUser(),
        address: mockAddress(),
      });
    }
    requestUrl = `http://localhost:${process.env.PORT}`;
  });

  after(async () => {
    const usersRepository = getRepository(User);
    const addressRespository = getRepository(Address);

    await usersRepository.delete({});
    await addressRespository.delete({});

    const numberOfUsers = await usersRepository.count();
    const numberOfAddresses = await addressRespository.count();

    expect(numberOfUsers).to.eq(0);
    expect(numberOfAddresses).to.eq(0);
  });

  it('Should create multiple users in database', async () => {
    const response = await request(requestUrl).post('/users/register-multiple').send(requestBody);
    const usersRepository = getRepository(User);
    const addressRespository = getRepository(Address);

    for (const [index, element] of response.body.entries()) {
      checkUser(element, index);

      const DBUser = await usersRepository.findOne({ id: response.body[index].id }, { relations: ['address'] });
      checkUser(DBUser, index);
    }

    const numberOfDBUsers = await usersRepository.count();
    expect(numberOfDBUsers).to.eq(response.body.length);
    expect(numberOfDBUsers).to.eq(NUMBER_OF_USERS);

    const numberOfDBAddresses = await addressRespository.count();
    expect(numberOfDBAddresses).to.eq(response.body.length);
    expect(numberOfDBAddresses).to.eq(NUMBER_OF_USERS);
  });
});

const checkUser = (user: Partial<User>, iterator: number): void => {
  expect(user.firstName).to.eq(requestBody[iterator].user.firstName);
  expect(user.lastName).to.eq(requestBody[iterator].user.lastName);
  expect(user.cpf).to.eq(requestBody[iterator].user.cpf);
  expect(user.cns).to.eq(requestBody[iterator].user.cns);
  expect(user.email).to.eq(requestBody[iterator].user.email);
  expect(user.phone).to.eq(requestBody[iterator].user.phone);
  expect(user.race).to.eq(requestBody[iterator].user.race);
  expect(user.gender).to.eq(requestBody[iterator].user.gender);
  expect(user.motherName).to.eq(requestBody[iterator].user.motherName);
  checkAddress(user.address, iterator);
};

const checkAddress = (address: Partial<Address>, iterator: number): void => {
  expect(address.postalCode).to.eq(requestBody[iterator].address.postalCode);
  expect(address.state).to.eq(requestBody[iterator].address.state);
  expect(address.city).to.eq(requestBody[iterator].address.city);
  expect(address.neighborhood).to.eq(requestBody[iterator].address.neighborhood);
  expect(address.streetName).to.eq(requestBody[iterator].address.streetName);
  expect(address.streetNumber).to.eq(requestBody[iterator].address.streetNumber);
  expect(address.complement).to.eq(requestBody[iterator].address.complement);
};
