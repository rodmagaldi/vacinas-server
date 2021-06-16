/* eslint-disable @typescript-eslint/no-misused-promises */
import { getRepository } from 'typeorm';
import request from 'supertest';
import { expect } from 'chai';
import { User } from '@data/db/entity';
import { seedUsers } from '@test/seed';

let requestUrl: string;
const NUMBER_OF_USERS = 10;

describe('User - list test', async () => {
  before(async () => {
    await seedUsers(NUMBER_OF_USERS);
    requestUrl = `http://localhost:${process.env.PORT}`;
  });

  after(async () => {
    const usersRepository = getRepository(User);
    usersRepository.clear();
    expect(await usersRepository.count()).to.eq(0);
  });

  it('Should retrieve all users from the database', async () => {
    const response = await request(requestUrl).get('/users');

    expect(response.body.length).to.eq(NUMBER_OF_USERS);
    const usersRepository = getRepository(User);
    const numberOfDBUsers = await usersRepository.count();
    expect(numberOfDBUsers).to.eq(NUMBER_OF_USERS);
  });
});
