import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  // EXPERIMENTAL
  // Your task here (like DB stuff, sending a notification, etc.)
  console.log('-----------------------------------------');
  console.log('Cron job ran a:', new Date().toLocaleString());
  console.log('-----------------------------------------');
  await app.close();
}
bootstrap();
