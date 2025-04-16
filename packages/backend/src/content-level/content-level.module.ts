import { Module } from '@nestjs/common';
import { ContentLevelController } from './content-level.controller';
import { ContentLevelService } from './content-level.service';

@Module({
  controllers: [ContentLevelController],
  providers: [ContentLevelService]
})
export class ContentLevelModule {}
