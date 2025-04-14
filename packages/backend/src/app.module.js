import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { hello } from '../../shared/dist';
import { hello } from 'shared';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
console.log(hello);
@Module({
    imports: [TeacherModule, StudentModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
