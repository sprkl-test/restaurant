import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  status: OrderStatus;
  @Column({ type: 'json' })
  items: Items;
  @Column()
  address: string;
  @Column()
  creditCard: string;
}

export enum OrderStatus {
  PLACED = 'placed',
  COOKING = 'cooking',
  ON_DELIVERY = 'on delivery',
  DELIVERED = 'delivered',
  REJECTED_PAYMENT = 'rejected payment',
}

export type Items = { [item: string]: number };
