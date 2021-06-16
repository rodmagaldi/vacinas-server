import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  postalCode: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  neighborhood?: string;

  @Column()
  streetName: string;

  @Column()
  streetNumber: string;

  @Column({ nullable: true })
  complement: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
