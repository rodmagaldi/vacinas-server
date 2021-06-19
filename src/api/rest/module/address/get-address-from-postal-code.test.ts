/* eslint-disable @typescript-eslint/no-misused-promises */
import request from 'supertest';
import { expect } from 'chai';
import { Address } from '@data/db/entity';
import { checkError } from '@test/checker';

let requestUrl: string;
let requestBody;
const postalCode = '04016002';
const invalidPostalCode = '99999999';
const badPostalCode1 = '000';
const badPostalCode2 = '04016-002';

describe('Address - get address from postal code test', async () => {
  before(async () => {
    requestUrl = `http://localhost:${process.env.PORT}`;
    requestBody = { postalCode };
  });

  it('Should retrieve address info when passing postal code', async () => {
    const response = await request(requestUrl).patch('/address/postal-code').send(requestBody);
    checkAddress(response.body);
  });

  it('Should throw error for non-existing postal code', async () => {
    const response = await request(requestUrl).patch('/address/postal-code').send({ postalCode: invalidPostalCode });
    checkError(response, 'Não foi possível obter o endereço.');
  });

  it('Should throw error for bad postal codes', async () => {
    let response = await request(requestUrl).patch('/address/postal-code').send({ postalCode: badPostalCode1 });
    checkError(response, 'CEP inválido. Digite apenas 8 números.');

    response = await request(requestUrl).patch('/address/postal-code').send({ postalCode: badPostalCode2 });
    checkError(response, 'CEP inválido. Digite apenas 8 números.');
  });
});

const checkAddress = (address: Partial<Address>): void => {
  expect(address.city).to.eq('São Paulo');
  expect(address.postalCode).to.eq(postalCode);
  expect(address.neighborhood).to.eq('Vila Mariana');
  expect(address.state).to.eq('SP');
  expect(address.streetName).to.eq('Rua França Pinto');
};
