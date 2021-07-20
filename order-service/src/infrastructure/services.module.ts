import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { KitchenService } from './kitchen.service';
import { PaymentService } from './payment.service';

@Module({
  imports: [HttpModule],
  providers: [DeliveryService, KitchenService, PaymentService],
  exports: [DeliveryService, KitchenService, PaymentService],
})
export class ServicesModule {}
