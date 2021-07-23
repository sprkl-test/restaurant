import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryService } from 'src/infrastructure/delivery.service';
import { KitchenService } from 'src/infrastructure/kitchen.service';
import { PaymentService } from 'src/infrastructure/payment.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly paymentService: PaymentService,
    private readonly kitchenService: KitchenService,
    private readonly deliveryService: DeliveryService,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<number> {
    const order = new Order();
    order.address = createOrderDto.address;
    order.items = createOrderDto.items;
    order.creditCard = createOrderDto.creditCard;
    order.status = OrderStatus.PLACED;
    const id = (await this.ordersRepository.save(order)).id;
    const amount = Object.values(order.items).reduce((a, b) => a + b, 0);
    await this.paymentService.pay(id, order.creditCard, amount);
    return id;
  }

  async getStatus(id: number): Promise<OrderStatus | undefined> {
    const order = await this.ordersRepository.findOne(id);
    if (order != undefined) return order.status;
    return undefined;
  }

  async orderPaymentAccepted(id: number): Promise<void> {
    const order = await this.ordersRepository.findOne(id);
    await this.ordersRepository.update(id, { status: OrderStatus.COOKING });
    await this.kitchenService.cookOrder(id, order.items);
  }

  async orderPaymentRejected(id: number): Promise<void> {
    await this.ordersRepository.update(id, {
      status: OrderStatus.REJECTED_PAYMENT,
    });
  }

  async orderCooked(id: number): Promise<void> {
    const order = await this.ordersRepository.findOne(id);
    await this.ordersRepository.update(id, { status: OrderStatus.ON_DELIVERY });
    await this.deliveryService.deliver(id, order.address);
  }

  async orderDelivered(id: number): Promise<void> {
    await this.ordersRepository.update(id, { status: OrderStatus.DELIVERED });
  }
}
