import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
// Entities
import { Teacher } from './entities/teacher.entity';
// constants
import TEACHER_ENDPOINTS from './constants/endpoints/teacher.endpoints';

@Controller(TEACHER_ENDPOINTS.BASENAME)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get(TEACHER_ENDPOINTS.GET_ALL)
  findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Get(TEACHER_ENDPOINTS.FIND_ONE)
  findOne(@Query('id') id: string): Promise<Teacher | null> {
    return this.teacherService.findOne(id);
  }

  @Post()
  create(@Body() body): Promise<Teacher[]> {
    return this.teacherService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.teacherService.remove(+id);
  }
}
