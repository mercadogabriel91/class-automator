import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentLevelModule } from '../content-level/content-level.module';
// Entities
import { Class } from './entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class]), ContentLevelModule],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
