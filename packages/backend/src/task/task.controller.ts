import { Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { AdvanceLevelResponse } from './entities/task-classes';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // @Post()
  @Get()
  create(): Promise<AdvanceLevelResponse | undefined> {
    return this.taskService.advanceAllclassesLevel();
  }
}
