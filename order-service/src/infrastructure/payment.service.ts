import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(private readonly httpService: HttpService) {}
  async pay(id: number, creditCard: string, amount: number): Promise<void> {
    await firstValueFrom(
      this.httpService.post(`${process.env.PAYMENT_SERVICE_URL}`, {
        id,
        creditCard,
        amount,
      }),
    );
  }
}
