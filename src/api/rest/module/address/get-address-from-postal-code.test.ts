/* eslint-disable @typescript-eslint/no-misused-promises */
import request from 'supertest';
import { expect } from 'chai';
import { Address } from '@server/data/db/entity';

let requestUrl: string;
let requestBody;
const postalCode = '04016002';

describe('Address - get address from postal code test', async () => {
  before(async () => {
    requestUrl = `http://localhost:${process.env.PORT}`;
    requestBody = { postalCode };
  });

  it('Should retrieve address info when passing postal code', async () => {
    const response = await request(requestUrl).patch('/address/postal-code').send(requestBody);
    checkAddress(response.body);
  });
});

const checkAddress = (address: Partial<Address>): void => {
  expect(address.city).to.eq('São Paulo');
  expect(address.postalCode).to.eq(postalCode);
  expect(address.neighborhood).to.eq('Vila Mariana');
  expect(address.state).to.eq('SP');
  expect(address.streetName).to.eq('Rua França Pinto');
};
