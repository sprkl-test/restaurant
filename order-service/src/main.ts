import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { tracing } from './tracing';

async function bootstrap() {
  tracing();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
