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
  ApiNotFoundResponse,
} from '@nestjs/swagger';
// Services
import { StudentService } from './student.service';
// Entities
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './entities/dto/create.student.dto';
import {
  DeleteStudentResponseDto,
  FindOneStudentQueryDto,
  FindOneStudentResponseDto,
} from './entities/dto/common.student.dto';
// Constants
import STUDENT_ENDPOINTS from './constants/endpoints/student.endpoints';

@ApiTags(STUDENT_ENDPOINTS.BASENAME)
@Controller(STUDENT_ENDPOINTS.BASENAME)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'Find all students' })
  @ApiResponse({
    status: 200,
    description: 'Students list.',
    type: [Student],
  })
  @Get(STUDENT_ENDPOINTS.GET_ALL)
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @ApiOperation({ summary: 'Find a student by ID' })
  @ApiResponse({
    status: 200,
    description: 'Student found.',
    type: FindOneStudentResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Student not found' })
  @Get(STUDENT_ENDPOINTS.FIND_ONE)
  async findOne(
    @Query() query: FindOneStudentQueryDto,
  ): Promise<FindOneStudentResponseDto> {
    return this.studentService.findOne(query.id);
  }

  @ApiOperation({ summary: 'Create a new student' })
  @ApiOkResponse({
    description: 'The student has been successfully created.',
    type: Student,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @ApiOkResponse({ type: DeleteStudentResponseDto })
  @ApiOperation({ summary: 'Delete a student' })
  @ApiOkResponse({
    description: 'The student has been successfully deleted.',
    type: DeleteStudentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteStudentResponseDto> {
    return this.studentService.remove(id);
  }
}
