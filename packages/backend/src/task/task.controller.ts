import { Controller, Post } from '@nestjs/common';
// Entities
import { TaskService } from './task.service';
import { AdvanceLevelResponse } from './entities/task-classes';
// Constants
import TASK_ENDPOINTS from './constants/endpoints/task.endpoints';

@Controller(TASK_ENDPOINTS.BASENAME)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(): Promise<AdvanceLevelResponse | undefined | string> {
    return this.taskService.advanceAllclassesLevel();
  }
}
