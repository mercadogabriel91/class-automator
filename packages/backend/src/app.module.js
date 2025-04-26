import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { hello } from '../../shared/dist';
import { hello } from 'shared';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { ContentLevelModule } from './content-level/content-level.module';
import { TaskModule } from './task/task.module';
console.log(hello);
@Module({
  imports: [
    TeacherModule,
    StudentModule,
    ClassModule,
    ContentLevelModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
