import { User, Address } from '@server/data/db/entity';

export enum GenderOptions {
  masculino = 'masculino',
  feminino = 'feminino',
  outro = 'outro',
  desconhecido = 'desconhecido',
}

export enum RaceOptions {
  branco = 'branco',
  preto = 'preto',
  pardo = 'pardo',
  amarelo = 'amarelo',
  indigena = 'indigena',
  outro = 'outro',
}

export interface CreateUserDTO {
  user: UserInfoDTO;
  address: AddressInfoDTO;
}

interface UserInfoDTO extends Partial<User> {
  firstName?: string;
  lastName?: string;
  cpf?: string;
  cns?: string;
  email?: string;
  phone?: string;
  motherName?: string;
  gender?: GenderOptions;
  race?: RaceOptions;
}

interface AddressInfoDTO extends Partial<Address> {
  postalCode?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
  streetName?: string;
  streetNumber?: string;
  complement?: string;
}
