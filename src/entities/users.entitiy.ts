import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column('varchar', { name: 'user_name' })
  userName!: string;

  @Column('varchar', { name: 'user_email', unique: true })
  userEmail!: string;

  @Column('varchar', { name: 'user_account', unique: true })
  userAccount!: string;

  @Column('varchar', { name: 'user_password' })
  userPassword!: string;

  @Column({
    name: 'user_type',
    default: 'manufacturer',
    comment: 'genuio, manufacturer',
  })
  userType!: string;
  // User Entity
  @OneToMany(() => Product, (products) => products.user)
  products?: Product[];
}
