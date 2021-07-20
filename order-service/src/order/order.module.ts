import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ServicesModule } from 'src/infrastructure/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ServicesModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
