import { NestFactory } from '@nestjs/core';
import { INestApplicationContext, INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  /*
   * Enable the following code to get app context if you need to just run a task and exit
   * const app: INestApplicationContext = await NestFactory.createApplicationContext(AppModule);
   * Close the application context once finished
   * await app.close();
   */
  const app: INestApplication = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
