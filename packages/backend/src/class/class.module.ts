import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// Modules
import { ContentLevelModule } from '../content-level/content-level.module';
import { PdfModule } from '../pdf/pdf.module';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentModule } from '../student/student.module';
// Entities
import { Class } from './entities/class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    ContentLevelModule,
    PdfModule,
    TeacherModule,
    StudentModule,
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
