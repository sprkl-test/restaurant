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
}
