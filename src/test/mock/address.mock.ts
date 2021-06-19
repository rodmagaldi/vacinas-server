import { address, random } from 'faker';
import { Address } from '@data/db/entity';

export async function mockAddresses(numberOfUsers: number): Promise<Partial<Address[]>> {
  const addressesList = [];

  for (let i = 0; i < numberOfUsers; i++) {
    const address = mockAddress();
    addressesList.push(address);
  }

  return addressesList;
}

export function mockAddress(): Partial<Address> {
  return {
    city: address.city(),
    state: address.state(),
    neighborhood: address.county(),
    postalCode: address.zipCode(),
    streetName: address.streetName(),
    streetNumber: random.number(1000).toString(),
    complement: 'Apto. 61',
  };
}
