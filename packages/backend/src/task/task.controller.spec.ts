import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AdvanceLevelResponse } from './entities/task-classes';

describe('TaskController', () => {
  let controller: TaskController;
  let taskService: jest.Mocked<TaskService>;

  const mockAdvanceLevelResponse: AdvanceLevelResponse = {
    filePath: '/path/to/generated/file.pdf',
    // Add other AdvanceLevelResponse properties as needed
  } as AdvanceLevelResponse;

  beforeEach(async () => {
    const mockTaskService = {
      advanceAllclassesLevel: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    taskService = module.get(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should successfully call taskService.advanceAllclassesLevel and return AdvanceLevelResponse', async () => {
      // Arrange
      taskService.advanceAllclassesLevel.mockResolvedValue(
        mockAdvanceLevelResponse,
      );

      // Act
      const result = await controller.create();

      // Assert
      expect(taskService.advanceAllclassesLevel).toHaveBeenCalledTimes(1);
      expect(taskService.advanceAllclassesLevel).toHaveBeenCalledWith();
      expect(result).toBe(mockAdvanceLevelResponse);
    });

    it('should return string when taskService returns a file path string', async () => {
      // Arrange
      const filePath = '/path/to/generated/file.pdf';
      taskService.advanceAllclassesLevel.mockResolvedValue(filePath);

      // Act
      const result = await controller.create();

      // Assert
      expect(taskService.advanceAllclassesLevel).toHaveBeenCalledTimes(1);
      expect(result).toBe(filePath);
      expect(typeof result).toBe('string');
    });

    it('should return undefined when taskService returns undefined', async () => {
      // Arrange
      taskService.advanceAllclassesLevel.mockResolvedValue(undefined);

      // Act
      const result = await controller.create();

      // Assert
      expect(taskService.advanceAllclassesLevel).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });

    it('should handle and propagate errors from taskService', async () => {
      // Arrange
      const errorMessage = 'Service unavailable';
      const serviceError = new Error(errorMessage);
      taskService.advanceAllclassesLevel.mockRejectedValue(serviceError);

      // Act & Assert
      await expect(controller.create()).rejects.toThrow(errorMessage);
      expect(taskService.advanceAllclassesLevel).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors with proper error propagation', async () => {
      // Arrange
      const customError = new Error('Database connection failed');
      taskService.advanceAllclassesLevel.mockRejectedValue(customError);

      // Act & Assert
      try {
        await controller.create();
        fail('Expected error to be thrown');
      } catch (error) {
        expect(error).toBe(customError);
        expect(taskService.advanceAllclassesLevel).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('dependency injection', () => {
    it('should inject TaskService correctly', () => {
      expect(taskService).toBeDefined();
      expect(taskService.advanceAllclassesLevel).toBeDefined();
    });
  });

  describe('method signature', () => {
    it('should not require any parameters', () => {
      // This test ensures the method signature matches the controller
      expect(controller.create.length).toBe(0);
    });
  });
});
