import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { TeacherService } from './teacher.service';
// Entities
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './entities/dto/create.teacher.dto';
import { DeleteTeacherResponseDto } from './entities/dto/common-teacher.dto';
// constants
import TEACHER_ENDPOINTS from './constants/endpoints/teacher.endpoints';

@ApiTags(TEACHER_ENDPOINTS.BASENAME)
@Controller(TEACHER_ENDPOINTS.BASENAME)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({ summary: 'Find all teachers' })
  @ApiResponse({
    status: 200,
    description: 'Teacher list.',
    type: [Teacher],
  })
  @Get(TEACHER_ENDPOINTS.GET_ALL)
  findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @ApiOperation({ summary: 'find a new teacher' })
  @ApiResponse({
    status: 200,
    description: 'Teacher found.',
    type: Teacher,
  })
  @Get(TEACHER_ENDPOINTS.FIND_ONE)
  findOne(@Query('id') id: string): Promise<Teacher | null> {
    return this.teacherService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new teacher' })
  @ApiOkResponse({
    description: 'The teacher has been successfully created.',
    type: Teacher,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiOkResponse({ type: DeleteTeacherResponseDto })
  @ApiOperation({ summary: 'Delete a teacher' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteTeacherResponseDto> {
    return this.teacherService.remove(id);
  }
}
