import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { ClassService } from './class.service';
// Entities
import { Class } from './entities/class.entity';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get('getall')
  findAll(): Promise<Class[]> {
    return this.classService.findAll();
  }

  @Get('findone')
  findOne(@Query('id') id: string): Promise<Class | null> {
    return this.classService.findOne(id);
  }

  @Get('getclassinfo')
  getClassInfo(@Query('id') id: string): Promise<Class | null> {
    return this.classService.getClassInfo(id);
  }

  @Post()
  create(@Body() body): Promise<Class[]> {
    return this.classService.createClass(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.classService.remove(+id);
  }

  @Patch('advance/')
  advanceClassLevel(@Query('id') id: string): Promise<Class | string> {
    return this.classService.advanceToNextLevel(id);
  }
}
