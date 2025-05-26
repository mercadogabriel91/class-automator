import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// Entities
import { TaskService } from './task.service';
import { AdvanceLevelResponse } from './entities/task-classes';
// Constants
import TASK_ENDPOINTS from './constants/endpoints/task.endpoints';

@ApiTags('Tasks')
@Controller(TASK_ENDPOINTS.BASENAME)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    summary: 'Advance all classes to next level',
    description:
      'Executes a task to advance all classes to their next level and generate PDF report. This is meant to be triggered by the task script and the CRON service.',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully advanced all classes to next level',
    type: AdvanceLevelResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post()
  create(): Promise<AdvanceLevelResponse | undefined | string> {
    return this.taskService.advanceAllclassesLevel();
  }
}
