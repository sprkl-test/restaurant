import { Items } from '../entities/order.entity';

export class CreateOrderDto {
  items: Items;
  address: string;
  creditCard: string;
}
