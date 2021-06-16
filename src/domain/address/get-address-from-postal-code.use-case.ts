import { Service } from 'typedi';
import { PostalCodeDTO, PostalCodeAddressModel } from '@domain/model';
import cep from 'cep-promise';
import { Address } from '@server/data/db/entity';

@Service()
export class GetAddressFromPostalCodeUseCase {
  async exec(input: PostalCodeDTO): Promise<Partial<Address>> {
    const address = await cep(input.postalCode);
    return this.mapAddress(address);
  }

  private mapAddress(input: PostalCodeAddressModel): Partial<Address> {
    return {
      postalCode: input.cep,
      city: input.city,
      neighborhood: input.neighborhood,
      state: input.state,
      streetName: input.street,
    };
  }
}
