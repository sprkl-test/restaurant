import { init } from '@sprkl/sprkl';
init({ serviceName: 'PaymentService', agent: { host: 'e2e-otel-collector' } });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
