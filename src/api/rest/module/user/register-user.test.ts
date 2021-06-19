/* eslint-disable @typescript-eslint/no-misused-promises */
import { getRepository } from 'typeorm';
import request from 'supertest';
import { expect } from 'chai';
import { User, Address } from '@data/db/entity';
import { CreateUserDTO } from '@domain/model';
import { mockUser, mockAddress } from '@server/test/mock';

let requestUrl: string;
let requestBody: CreateUserDTO;

describe('User - register test', async () => {
  before(async () => {
    requestUrl = `http://localhost:${process.env.PORT}`;
    requestBody = {
      user: mockUser(),
      address: mockAddress(),
    };
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

  it('Should create user in database', async () => {
    const response = await request(requestUrl).post('/users/register').send(requestBody);
    checkUser(response.body);

    const usersRepository = getRepository(User);
    const numberOfDBUsers = await usersRepository.count();
    expect(numberOfDBUsers).to.eq(1);

    const addressRespository = getRepository(Address);
    const numberOfDBAddresses = await addressRespository.count();
    expect(numberOfDBAddresses).to.eq(1);

    const DBUser = await usersRepository.findOne({ id: response.body.id }, { relations: ['address'] });
    checkUser(DBUser);
  });
});

const checkUser = (user: Partial<User>): void => {
  expect(user.firstName).to.eq(requestBody.user.firstName);
  expect(user.lastName).to.eq(requestBody.user.lastName);
  expect(user.cpf).to.eq(requestBody.user.cpf);
  expect(user.cns).to.eq(requestBody.user.cns);
  expect(user.email).to.eq(requestBody.user.email);
  expect(user.phone).to.eq(requestBody.user.phone);
  expect(user.race).to.eq(requestBody.user.race);
  expect(user.gender).to.eq(requestBody.user.gender);
  expect(user.motherName).to.eq(requestBody.user.motherName);
  checkAddress(user.address);
};

const checkAddress = (address: Partial<Address>): void => {
  expect(address.postalCode).to.eq(requestBody.address.postalCode);
  expect(address.state).to.eq(requestBody.address.state);
  expect(address.city).to.eq(requestBody.address.city);
  expect(address.neighborhood).to.eq(requestBody.address.neighborhood);
  expect(address.streetName).to.eq(requestBody.address.streetName);
  expect(address.streetNumber).to.eq(requestBody.address.streetNumber);
  expect(address.complement).to.eq(requestBody.address.complement);
};
