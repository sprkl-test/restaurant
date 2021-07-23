import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  async pay(
    @Body() payment: { id: number; creditCard: string; amount: number },
  ): Promise<void> {
    setTimeout(async () => {
      if (payment.creditCard.includes('0')) {
        await firstValueFrom(
          this.httpService.post(
            `${process.env.ORDER_SERVICE_URL}/order/${payment.id}/paymentAccepted`,
          ),
        );
      } else {
        await firstValueFrom(
          this.httpService.post(
            `${process.env.ORDER_SERVICE_URL}/order/${payment.id}/paymentRejected`,
          ),
        );
      }
    }, 10000);
  }
}
