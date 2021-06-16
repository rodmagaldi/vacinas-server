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

  it('Should retrieve all users from the database', async () => {
    const response = await request(requestUrl).post('/users/register').send(requestBody);

    expect(response.body.firstName).to.eq(requestBody.firstName);
    expect(response.body.lastName).to.eq(requestBody.lastName);
    expect(response.body.cpf).to.eq(requestBody.cpf);
    expect(response.body.cns).to.eq(requestBody.cns);
    expect(response.body.email).to.eq(requestBody.email);
    expect(response.body.phone).to.eq(requestBody.phone);
    expect(response.body.race).to.eq(requestBody.race);
    expect(response.body.gender).to.eq(requestBody.gender);
    expect(response.body.motherName).to.eq(requestBody.motherName);

    const usersRepository = getRepository(User);
    const numberOfDBUsers = await usersRepository.count();
    expect(numberOfDBUsers).to.eq(1);
  });
});
