/* eslint-disable @typescript-eslint/no-misused-promises */
import { getRepository } from 'typeorm';
import request from 'supertest';
import { expect } from 'chai';
import { User } from '@server/data/db/entity';
import { CreateUserDTO } from '@domain/model';
import { mockUser } from '@server/test/mock';

let requestUrl: string;
let requestBody: CreateUserDTO | Partial<User>;

describe('User - register test', async () => {
  before(async () => {
    requestUrl = `http://localhost:${process.env.PORT}`;
    requestBody = mockUser();
  });

  after(async () => {
    const usersRepository = getRepository(User);
    await usersRepository.clear();
    expect(await usersRepository.count()).to.eq(0);
  });

  it('Should create user in database', async () => {
    const response = await request(requestUrl).post('/users/register').send(requestBody);
    checkUser(response.body);

    const usersRepository = getRepository(User);
    const numberOfDBUsers = await usersRepository.count();
    expect(numberOfDBUsers).to.eq(1);

    const DBUser = await usersRepository.findOne({ id: response.body.id });
    checkUser(DBUser);
  });
});

const checkUser = (user: Partial<User>): void => {
  expect(user.firstName).to.eq(requestBody.firstName);
  expect(user.lastName).to.eq(requestBody.lastName);
  expect(user.cpf).to.eq(requestBody.cpf);
  expect(user.cns).to.eq(requestBody.cns);
  expect(user.email).to.eq(requestBody.email);
  expect(user.phone).to.eq(requestBody.phone);
  expect(user.race).to.eq(requestBody.race);
  expect(user.gender).to.eq(requestBody.gender);
  expect(user.motherName).to.eq(requestBody.motherName);
};
