import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create Application context
  const app = await NestFactory.createApplicationContext(AppModule);

  {
    /*Enable the following line to run the app as a server
    ************************************************
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
    ************************************************
    */
  }

  // 0 9 * * 0 export PATH=/Users/gaben/.nvm/versions/node/v20.16.0/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin && cd /Users/gaben/dev/school/class-automator && /opt/homebrew/bin/pnpm run dev:backend >> /Users/gaben/nest-cron.log 2>&1


  console.log('-----------------------------------------');
  console.log('Cron job ran at:', new Date().toLocaleString());

  console.log('Task completed at:', new Date().toLocaleString());
  console.log('-----------------------------------------');

  // Close the application context once finished
  await app.close();
}

bootstrap();
