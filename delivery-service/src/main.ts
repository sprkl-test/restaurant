import { init } from '@sprkl/sprkl';
const process = require('process');
init({ serviceName: 'DeliveryService', agent: { host: process.env['SPRKL_AGENT'] } });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
