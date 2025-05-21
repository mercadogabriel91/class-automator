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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
//Services
import { ClassService } from './class.service';
// Entities
import { Class } from './entities/class.entity';
import { FindClassInformationResponseDto } from './entities/dto/common.class.dto';
import { CreateClassDto } from './entities/dto/create-class.dto';
import { ClassResponseDto } from './entities/dto/class-response.dto';
// Constants
import CLASS_ENDPOINTS from './constants/endpoints/class.endpoints';

@Controller(CLASS_ENDPOINTS.BASENAME)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiOperation({ summary: 'Find all classes' })
  @ApiResponse({
    status: 200,
    description: 'Classes list.',
    type: [Class],
  })
  @Get(CLASS_ENDPOINTS.GET_ALL)
  findAll(): Promise<Class[]> {
    return this.classService.findAll();
  }

  @ApiOperation({ summary: 'Find one clase by id' })
  @ApiResponse({
    status: 200,
    description: 'Class found.',
    type: Class,
  })
  @ApiNotFoundResponse({ description: 'Class not found' })
  @Get(CLASS_ENDPOINTS.FIND_ONE)
  findOne(@Query('id') id: string): Promise<Class | null> {
    return this.classService.findOne(id);
  }

  @ApiOperation({ summary: 'Get class information' })
  @ApiResponse({
    status: 200,
    description: 'Class found.',
    type: FindClassInformationResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Class not found' })
  @Get(CLASS_ENDPOINTS.GET_CLASS_INFO)
  getClassInfo(
    @Query('id') id: string,
  ): Promise<FindClassInformationResponseDto> {
    return this.classService.getClassInfo(id);
  }

  
  @ApiOperation({ summary: 'Create a new class' })
  @ApiResponse({
    status: 201,
    description: 'Class created successfully',
    type: ClassResponseDto,
  })
  @Post()
  create(@Body() createClassDto: CreateClassDto): Promise<ClassResponseDto> {
    return this.classService.createClass(createClassDto);
  }

  @ApiOperation({ summary: 'Delete one class' })
  @ApiResponse({
    status: 200,
    description: 'Class deleted.',
    type: FindClassInformationResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Class not found' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.classService.remove(id);
  }

  @Patch(CLASS_ENDPOINTS.ADVANCE)
  advanceClassLevel(@Query('id') id: string): Promise<Class | string> {
    return this.classService.advanceToNextLevel(id);
  }
}
