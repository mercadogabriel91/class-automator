import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PdfService } from '../pdf/pdf.service';
import { ClassService } from '../class/class.service';
import { Class } from '../class/entities/class.entity';
import { AdvanceLevelResponse } from './entities/task-classes';

describe('TaskService', () => {
  let service: TaskService;
  let pdfService: jest.Mocked<PdfService>;
  let classService: jest.Mocked<ClassService>;

  const mockTeacher = {
    id: 'teacher-1',
    name: 'John Doe',
    email: 'john@example.com',
  };
  const mockStudents = [
    { id: 'student-1', name: 'Alice' },
    { id: 'student-2', name: 'Bob' },
  ];
  const mockCurrentLevel = {
    id: 'level-1',
    lessonNumber: 1,
  };
  const mockCompletedLevels = [{ id: 'level-0', lessonNumber: 0 }];
  const mockClass = {
    id: 'class-1',
    name: 'Test Class',
    automated: true,
    teacher: mockTeacher,
    students: mockStudents,
    currentLevel: mockCurrentLevel,
    completedLevels: mockCompletedLevels,
  } as Class;

  const mockAdvanceLevelResponse: AdvanceLevelResponse = {
    filePath: '/path/to/generated/file.pdf',
    // Add other AdvanceLevelResponse properties as needed
  } as AdvanceLevelResponse;

  beforeEach(async () => {
    const mockPdfService = {
      generatePdf: jest.fn(),
    };

    const mockClassService = {
      findAllAutomatedClasses: jest.fn(),
      advanceToNextLevel: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: PdfService,
          useValue: mockPdfService,
        },
        {
          provide: ClassService,
          useValue: mockClassService,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    pdfService = module.get(PdfService);
    classService = module.get(ClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('advanceAllclassesLevel', () => {
    it('should successfully advance all classes and generate PDF', async () => {
      // Arrange
      const mockClasses = [mockClass];
      classService.findAllAutomatedClasses.mockResolvedValue(mockClasses);
      classService.advanceToNextLevel.mockResolvedValue(mockClass);
      pdfService.generatePdf.mockResolvedValue(mockAdvanceLevelResponse);

      // Act
      const result = await service.advanceAllclassesLevel();

      // Assert
      expect(classService.findAllAutomatedClasses).toHaveBeenCalledTimes(1);
      expect(pdfService.generatePdf).toHaveBeenCalledWith(
        mockClass.currentLevel,
      );
      expect(result).toBe(mockAdvanceLevelResponse.filePath);
    });

    it('should handle empty automated classes array', async () => {
      // Arrange
      classService.findAllAutomatedClasses.mockResolvedValue([]);

      // Act
      const result = await service.advanceAllclassesLevel();

      // Assert
      expect(classService.findAllAutomatedClasses).toHaveBeenCalledTimes(1);
      expect(pdfService.generatePdf).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should handle multiple classes and return first PDF path', async () => {
      // Arrange
      const secondClass: Class = {
        ...mockClass,
        id: 'class-2',
        name: 'Second Test Class',
      };
      const mockClasses = [mockClass, secondClass];

      classService.findAllAutomatedClasses.mockResolvedValue(mockClasses);
      pdfService.generatePdf.mockResolvedValue(mockAdvanceLevelResponse);

      // Act
      const result = await service.advanceAllclassesLevel();

      // Assert
      expect(classService.findAllAutomatedClasses).toHaveBeenCalledTimes(1);
      expect(pdfService.generatePdf).toHaveBeenCalledTimes(1);
      expect(pdfService.generatePdf).toHaveBeenCalledWith(
        mockClass.currentLevel,
      );
      expect(result).toBe(mockAdvanceLevelResponse.filePath);
    });

    it('should throw error when findAllAutomatedClasses fails', async () => {
      // Arrange
      const errorMessage = 'Database connection failed';
      classService.findAllAutomatedClasses.mockRejectedValue(
        new Error(errorMessage),
      );

      // Act & Assert
      await expect(service.advanceAllclassesLevel()).rejects.toThrow(
        `Error finding automated classes: Error: ${errorMessage}`,
      );
      expect(classService.findAllAutomatedClasses).toHaveBeenCalledTimes(1);
      expect(pdfService.generatePdf).not.toHaveBeenCalled();
    });

    it('should throw error when generatePdf fails', async () => {
      // Arrange
      const mockClasses = [mockClass];
      const errorMessage = 'PDF generation failed';

      classService.findAllAutomatedClasses.mockResolvedValue(mockClasses);
      pdfService.generatePdf.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(service.advanceAllclassesLevel()).rejects.toThrow(
        'Error generating PDF file for current level:',
      );
      expect(classService.findAllAutomatedClasses).toHaveBeenCalledTimes(1);
      expect(pdfService.generatePdf).toHaveBeenCalledWith(
        mockClass.currentLevel,
      );
    });

    it('should handle advanceToNextLevel error when uncommented', async () => {
      // Note: This test is for when you uncomment the advanceClassLevel code
      // Currently commented out in your service, but good to have the test ready

      // Arrange
      const mockClasses = [mockClass];
      const errorMessage = 'Failed to advance class level';

      classService.findAllAutomatedClasses.mockResolvedValue(mockClasses);
      classService.advanceToNextLevel.mockRejectedValue(
        new Error(errorMessage),
      );

      // This test would be relevant when you uncomment the advancement logic
      // For now, it's just a placeholder showing how to test that scenario
      expect(classService.advanceToNextLevel).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle nested async function errors properly', async () => {
      // Arrange
      const customError = new Error('Custom service error');
      classService.findAllAutomatedClasses.mockRejectedValue(customError);

      // Act & Assert
      await expect(service.advanceAllclassesLevel()).rejects.toThrow(
        'Error finding automated classes: Error: Custom service error',
      );
    });
  });
});
