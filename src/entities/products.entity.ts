import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entitiy';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'product_id' })
  productId: number;

  @Column('varchar', {
    name: 'product_name',
    length: 255,
    unique: true,
  })
  productName!: string;

  @Column('varchar', { name: 'product_color', nullable: true, length: 30 })
  productColor: string | null;

  @Column('decimal', {
    name: 'product_size',
    nullable: true,
    precision: 3,
    scale: 1,
  })
  productSize: string | null;

  @Column('int', { name: 'create_user_id', nullable: true })
  createUserId: number | null;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createAt: Date | null;

  @Column('timestamp', {
    name: 'update_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP()',
  })
  updateAt: Date | null;

  // Product Entity
  @ManyToOne(() => Users, (user) => user.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  user: Users;
}
