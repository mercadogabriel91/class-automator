import { Module } from '@nestjs/common';
// Modules
import { ContentLevelModule } from '../content-level/content-level.module';
import { PdfModule } from '../pdf/pdf.module';
import { ClassModule } from '../class/class.module';
// Controllers
import { TaskController } from './task.controller';
// Services
import { TaskService } from './task.service';

@Module({
  imports: [ContentLevelModule, PdfModule, ClassModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
