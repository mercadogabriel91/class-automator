import { Module } from '@nestjs/common';
import { ContentLevelController } from './content-level.controller';
import { ContentLevelService } from './content-level.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// Entities
import { ContentLevel } from './entities/content-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentLevel])],
  controllers: [ContentLevelController],
  providers: [ContentLevelService],
  exports: [ContentLevelService],
})
export class ContentLevelModule {}
