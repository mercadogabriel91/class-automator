import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
// Services
import { ContentLevelService } from './content-level.service';
// Entities
import { ContentLevel } from './entities/content-level.entity';
import { CreateContentLevelDto } from './entities/dto/create-content-level.dto';

@Controller('content-level')
export class ContentLevelController {
  constructor(private readonly contentLevelService: ContentLevelService) {}

  @Get('getall')
  findAll(): Promise<ContentLevel[]> {
    return this.contentLevelService.findAll();
  }

  @Get('findone')
  findOne(@Query('id') id: string): Promise<ContentLevel | null> {
    return this.contentLevelService.findOne(id);
  }

  @Post()
  create(
    @Body('contentLevel') contentLevel: CreateContentLevelDto,
  ): Promise<ContentLevel> {
    return this.contentLevelService.create(contentLevel);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.contentLevelService.remove(+id);
  }
}
