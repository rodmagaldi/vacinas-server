/* eslint-disable @typescript-eslint/no-misused-promises */
import { getRepository } from 'typeorm';
import request from 'supertest';
import { expect } from 'chai';
import { User } from '@server/data/db/entity';
import { CreateUserDTO, RaceOptions, GenderOptions } from '@domain/model';
import * as cpf from 'cpf';
import { name, internet, phone } from 'faker';

let requestUrl: string;
let requestBody: CreateUserDTO;

describe('User - list test', async () => {
  before(async () => {
    requestUrl = `http://localhost:${process.env.PORT}`;
    requestBody = {
      firstName: name.firstName(),
      lastName: name.lastName(),
      email: internet.email(),
      cpf: cpf.generate(),
      cns: cpf.generate(),
      phone: phone.phoneNumber(),
      race: RaceOptions.branco,
      gender: GenderOptions.masculino,
      motherName: name.firstName(),
    };
  });

  after(async () => {
    const usersRepository = getRepository(User);
    usersRepository.clear();
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
