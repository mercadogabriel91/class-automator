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
// Constants
import CLASS_ENDPOINTS from './constants/endpoints/class.endpoints';

@Controller(CLASS_ENDPOINTS.BASENAME)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get(CLASS_ENDPOINTS.GET_ALL)
  findAll(): Promise<Class[]> {
    return this.classService.findAll();
  }

  @Get(CLASS_ENDPOINTS.FIND_ONE)
  findOne(@Query('id') id: string): Promise<Class | null> {
    return this.classService.findOne(id);
  }

  @Get(CLASS_ENDPOINTS.GET_CLASS_INFO)
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

  @Patch(CLASS_ENDPOINTS.ADVANCE)
  advanceClassLevel(@Query('id') id: string): Promise<Class | string> {
    return this.classService.advanceToNextLevel(id);
  }
}
