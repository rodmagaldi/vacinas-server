import { Service } from 'typedi';
import { PostalCodeDTO, PostalCodeAddressModel } from '@domain/model';
import cep from 'cep-promise';
import { Address } from '@server/data/db/entity';
import { BaseError } from '@server/error/error';

@Service()
export class GetAddressFromPostalCodeUseCase {
  async exec(input: PostalCodeDTO): Promise<Partial<Address>> {
    try {
      const address = await cep(input.postalCode);
      return this.mapAddress(address);
    } catch (err) {
      throw new BaseError('Não foi possível obter o endereço.');
    }
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
