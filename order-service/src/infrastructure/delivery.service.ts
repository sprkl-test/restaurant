import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DeliveryService {
  constructor(private readonly httpService: HttpService) {}
  async deliver(id: number, address: string): Promise<void> {
    await firstValueFrom(
      this.httpService.post(`${process.env.DELIVERY_SERVICE_URL}`, {
        id,
        address,
      }),
    );
  }
}
