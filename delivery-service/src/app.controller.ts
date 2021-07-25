import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  async deliver(
    @Body() delivery: { id: number; address: string },
  ): Promise<void> {
    new Promise(async () => {
      for (let i = 0; i < 10000000; i++);
      await firstValueFrom(
        this.httpService.post(
          `${process.env.ORDER_SERVICE_URL}/order/${delivery.id}/delivered`,
        ),
      );
    });
  }
}
