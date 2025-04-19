import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// Modules
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { ContentLevelModule } from './content-level/content-level.module';
//import { hello } from '@class-automator/shared';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // synchronize: process.env.NODE_ENV !== 'production',
        synchronize: true,
      }),
    }),
    TeacherModule,
    StudentModule,
    ClassModule,
    ContentLevelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
