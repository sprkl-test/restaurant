import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<number> {
    const order = new Order();
    order.address = createOrderDto.address;
    order.items = createOrderDto.items;
    order.creditCard = createOrderDto.creditCard;
    order.status = OrderStatus.PLACED;
    return (await this.ordersRepository.save(order)).id;
  }

  async getStatus(id: number): Promise<OrderStatus | undefined> {
    const order = await this.ordersRepository.findOne(id);
    if (order != undefined) return order.status;
    return undefined;
  }
}
