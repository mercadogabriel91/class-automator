import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
// Entities
import { Student } from './entities/student.entity';
// Constants
import STUDENT_ENDPOINTS from './constants/endpoints/student.endpoints';

@Controller(STUDENT_ENDPOINTS.BASENAME)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(STUDENT_ENDPOINTS.GET_ALL)
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(STUDENT_ENDPOINTS.FIND_ONE)
  findOne(@Query('id') id: string): Promise<Student | null> {
    return this.studentService.findOne(id);
  }

  @Post()
  create(@Body() body): Promise<Student[]> {
    return this.studentService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.studentService.remove(+id);
  }
}
