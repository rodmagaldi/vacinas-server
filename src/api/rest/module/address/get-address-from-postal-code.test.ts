/* eslint-disable @typescript-eslint/no-misused-promises */
import request from 'supertest';
import { expect } from 'chai';
import { Address } from '@data/db/entity';
import { checkError } from '@test/checker';

let requestUrl: string;
let requestBody;
const postalCode = '04016002';
const invalidPostalCode = '000000';

describe('Address - get address from postal code test', async () => {
  before(async () => {
    requestUrl = `http://localhost:${process.env.PORT}`;
    requestBody = { postalCode };
  });

  it('Should retrieve address info when passing postal code', async () => {
    const response = await request(requestUrl).patch('/address/postal-code').send(requestBody);
    checkAddress(response.body);
  });

  it('Should throw error for invalid postal code', async () => {
    const response = await request(requestUrl).patch('/address/postal-code').send({ postalCode: invalidPostalCode });
    checkError(response, 'Não foi possível obter o endereço.');
  });
});

const checkAddress = (address: Partial<Address>): void => {
  expect(address.city).to.eq('São Paulo');
  expect(address.postalCode).to.eq(postalCode);
  expect(address.neighborhood).to.eq('Vila Mariana');
  expect(address.state).to.eq('SP');
  expect(address.streetName).to.eq('Rua França Pinto');
};
