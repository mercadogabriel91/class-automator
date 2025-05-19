import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  /*
   * Create a new Nest application instance
   */
  const app: INestApplication = await NestFactory.create(AppModule);

  /*
   *  Apply global pipes for validation
   */
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  /*
   *  Set up Swagger for API documentation
   */
  const config = new DocumentBuilder()
    .setTitle('Class Automator API')
    .setDescription('API documentation for Class Automator')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
