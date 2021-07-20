import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KitchenService {
  constructor(private readonly httpService: HttpService) {}
  async cookOrder(
    id: number,
    items: { [item: string]: number },
  ): Promise<void> {
    await firstValueFrom(
      this.httpService.post(`${process.env.KITCHEN_SERVICE_URL}/order`, {
        id,
        items,
      }),
    );
  }
}
