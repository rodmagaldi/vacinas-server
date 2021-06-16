import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { GenderOptions, RaceOptions } from '@domain/model';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ nullable: true })
  cns?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  motherName: string;

  @Column({ type: 'enum', enum: GenderOptions })
  gender: GenderOptions;

  @Column({ type: 'enum', enum: RaceOptions })
  race: RaceOptions;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
