import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<number> {
    return await this.orderService.create(createOrderDto);
  }

  @Get(':id')
  async getStatus(@Param('id') id: number): Promise<OrderStatus> {
    const status = await this.orderService.getStatus(id);
    if (status == undefined)
      throw new HttpException(
        `Order with id ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    return status;
  }

  @Post(':id/paymentAccepted')
  async paymentAccepted(@Param('id') id: number): Promise<void> {
    await this.orderService.orderPaymentAccepted(id);
  }

  @Post(':id/paymentRejected')
  async paymentRejected(@Param('id') id: number): Promise<void> {
    await this.orderService.orderPaymentRejected(id);
  }

  @Post(':id/cooked')
  async cooked(@Param('id') id: number): Promise<void> {
    await this.orderService.orderCooked(id);
  }

  @Post(':id/delivered')
  async delivered(@Param('id') id: number): Promise<void> {
    await this.orderService.orderDelivered(id);
  }
}
