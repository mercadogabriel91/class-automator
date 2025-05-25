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
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
// Services
import { ContentLevelService } from './content-level.service';
// Entities
import { ContentLevel } from './entities/content-level.entity';
import { CreateContentLevelDto } from './entities/dto/create-content-level.dto';
import { DeleteContentLevelResponseDto } from './entities/dto/common-content-level.dto';
// Constants
import CONTENT_LEVEL_ENDPOINTS from './constants/endpoints/content-level.endpoints';

@Controller(CONTENT_LEVEL_ENDPOINTS.BASENAME)
export class ContentLevelController {
  constructor(private readonly contentLevelService: ContentLevelService) {}

  @ApiOperation({
    summary: 'Get all content levels',
    description: 'Retrieves a list of all content levels.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all content levels',
    type: [ContentLevel],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get(CONTENT_LEVEL_ENDPOINTS.GET_ALL)
  findAll(): Promise<ContentLevel[]> {
    return this.contentLevelService.findAll();
  }

  @ApiOperation({
    summary: 'Get one content level',
    description: 'Retrieves a single content level record.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved content level',
    type: ContentLevel,
  })
  @ApiNotFoundResponse({
    description: 'Content level not found',
  })
  @Get(CONTENT_LEVEL_ENDPOINTS.FIND_ONE)
  findOne(@Query('id') id: string): Promise<ContentLevel> {
    return this.contentLevelService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create new content level',
    description: 'Creates a new content level record.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully created content level',
    type: ContentLevel,
  })
  @ApiResponse({
    status: 400,
    description: 'bad request',
  })
  @Post()
  create(
    @Body('contentLevel') contentLevel: CreateContentLevelDto,
  ): Promise<ContentLevel> {
    return this.contentLevelService.create(contentLevel);
  }

  @ApiOperation({
    summary: 'Delete content level',
    description: 'Deletes a content level record.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted content level',
    type: DeleteContentLevelResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Content level not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteContentLevelResponseDto> {
    return this.contentLevelService.remove(id);
  }
}
