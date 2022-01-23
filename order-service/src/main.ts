import { init } from '@sprkl/sprkl';
const process = require('process');
init({ serviceName: 'OrderService', agent: { host: process.env['SPRKL_AGENT'] } });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
