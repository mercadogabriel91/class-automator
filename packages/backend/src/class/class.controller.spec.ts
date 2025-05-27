import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { CreateClassDto } from './entities/dto/create-class.dto';

describe('ClassController', () => {
  let controller: ClassController;
  let service: ClassService;

  // Mock service
  const mockClassService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    getClassInfo: jest.fn(),
    createClass: jest.fn(),
    remove: jest.fn(),
    advanceToNextLevel: jest.fn(),
  };

  // Mock data
  const classesList = [
    {
      id: 'f0162d84-9858-4bca-97ff-803d110c3bcc',
      name: 'Class 1',
      automated: true,
    },
    {
      id: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
      name: 'Class 2',
      automated: false,
    },
  ];

  const mockClass = {
    id: 'f0162d84-9858-4bca-97ff-803d110c3bcc',
    name: 'Test Class',
    automated: true,
    teacher: {
      id: 'teacher-1',
      name: 'John Doe',
      email: 'john@example.com',
    },
    students: [
      { id: 'student-1', name: 'Alice' },
      { id: 'student-2', name: 'Bob' },
    ],
    currentLevel: {
      id: 'level-1',
      lessonNumber: 1,
    },
    completedLevels: [],
  };

  const mockClassInfo = {
    id: 'f0162d84-9858-4bca-97ff-803d110c3bcc',
    name: 'Test Class',
    automated: true,
    teacher: {
      id: 'teacher-1',
      name: 'John Doe',
      email: 'john@example.com',
    },
    students: [
      { id: 'student-1', name: 'Alice' },
      { id: 'student-2', name: 'Bob' },
    ],
    currentLevel: {
      id: 'level-1',
      lessonNumber: 1,
    },
    completedLevels: [],
  };

  const mockCreateClassDto: CreateClassDto = {
    name: 'New Test Class',
    automated: true,
    teacherId: 'teacher-1',
    currentLevelId: 'level-1',
    studentIds: ['student-1', 'student-2'],
    completedLevelIds: [],
  };

  const mockClassResponse = {
    id: 'new-class-id',
    name: 'New Test Class',
    automated: true,
  };

  const mockDeleteResponse = {
    success: true,
    message: 'Class deleted successfully',
    classId: 'f0162d84-9858-4bca-97ff-803d110c3bcc',
    affectedRows: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassController],
      providers: [
        {
          provide: ClassService,
          useValue: mockClassService,
        },
      ],
    }).compile();

    controller = module.get<ClassController>(ClassController);
    service = module.get<ClassService>(ClassService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of classes', async () => {
      mockClassService.findAll.mockResolvedValue(classesList);

      const result = await controller.findAll();

      expect(result).toEqual(classesList);
      expect(mockClassService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no classes exist', async () => {
      mockClassService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(mockClassService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    const classId = 'f0162d84-9858-4bca-97ff-803d110c3bcc';

    it('should return a class when found', async () => {
      mockClassService.findOne.mockResolvedValue(mockClass);

      const result = await controller.findOne(classId);

      expect(result).toEqual(mockClass);
      expect(mockClassService.findOne).toHaveBeenCalledWith(classId);
      expect(mockClassService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return null when class not found', async () => {
      mockClassService.findOne.mockResolvedValue(null);

      const result = await controller.findOne('non-existent-id');

      expect(result).toBeNull();
      expect(mockClassService.findOne).toHaveBeenCalledWith('non-existent-id');
      expect(mockClassService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when service throws', async () => {
      const errorMessage = 'Class with id non-existent-id not found';
      mockClassService.findOne.mockRejectedValue(
        new NotFoundException(errorMessage),
      );

      await expect(controller.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockClassService.findOne).toHaveBeenCalledWith('non-existent-id');
    });
  });

  describe('getClassInfo', () => {
    const classId = 'f0162d84-9858-4bca-97ff-803d110c3bcc';

    it('should return detailed class information', async () => {
      mockClassService.getClassInfo.mockResolvedValue(mockClassInfo);

      const result = await controller.getClassInfo(classId);

      expect(result).toEqual(mockClassInfo);
      expect(mockClassService.getClassInfo).toHaveBeenCalledWith(classId);
      expect(mockClassService.getClassInfo).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when class not found', async () => {
      const errorMessage = 'Class with id non-existent-id not found';
      mockClassService.getClassInfo.mockRejectedValue(
        new NotFoundException(errorMessage),
      );

      await expect(controller.getClassInfo('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockClassService.getClassInfo).toHaveBeenCalledWith(
        'non-existent-id',
      );
    });
  });

  describe('create', () => {
    it('should create a new class successfully', async () => {
      mockClassService.createClass.mockResolvedValue(mockClassResponse);

      const result = await controller.create(mockCreateClassDto);

      expect(result).toEqual(mockClassResponse);
      expect(mockClassService.createClass).toHaveBeenCalledWith(
        mockCreateClassDto,
      );
      expect(mockClassService.createClass).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when teacher not found', async () => {
      const errorMessage = 'Teacher with ID teacher-1 not found';
      mockClassService.createClass.mockRejectedValue(
        new NotFoundException(errorMessage),
      );

      await expect(controller.create(mockCreateClassDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockClassService.createClass).toHaveBeenCalledWith(
        mockCreateClassDto,
      );
    });

    it('should throw NotFoundException when content level not found', async () => {
      const errorMessage = 'Content level with ID level-1 not found';
      mockClassService.createClass.mockRejectedValue(
        new NotFoundException(errorMessage),
      );

      await expect(controller.create(mockCreateClassDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockClassService.createClass).toHaveBeenCalledWith(
        mockCreateClassDto,
      );
    });

    it('should create class with minimal required data', async () => {
      const minimalDto: CreateClassDto = {
        name: 'Minimal Class',
        teacherId: 'teacher-1',
        currentLevelId: 'level-1',
      };
      const minimalResponse = {
        id: 'minimal-class-id',
        name: 'Minimal Class',
        automated: true,
      };

      mockClassService.createClass.mockResolvedValue(minimalResponse);

      const result = await controller.create(minimalDto);

      expect(result).toEqual(minimalResponse);
      expect(mockClassService.createClass).toHaveBeenCalledWith(minimalDto);
    });
  });

  describe('remove', () => {
    const classId = 'f0162d84-9858-4bca-97ff-803d110c3bcc';

    it('should delete a class successfully', async () => {
      mockClassService.remove.mockResolvedValue(mockDeleteResponse);

      const result = await controller.remove(classId);

      expect(result).toEqual(mockDeleteResponse);
      expect(mockClassService.remove).toHaveBeenCalledWith(classId);
      expect(mockClassService.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when class not found', async () => {
      const errorMessage = 'Class with id non-existent-id not found';
      mockClassService.remove.mockRejectedValue(
        new NotFoundException(errorMessage),
      );

      await expect(controller.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockClassService.remove).toHaveBeenCalledWith('non-existent-id');
    });
  });

  describe('advanceClassLevel', () => {
    const classId = 'f0162d84-9858-4bca-97ff-803d110c3bcc';

    const advancedClass = {
      ...mockClass,
      currentLevel: {
        id: 'level-2',
        lessonNumber: 2,
      },
      completedLevels: [
        {
          id: 'level-1',
          lessonNumber: 1,
        },
      ],
    };

    it('should advance class to next level successfully', async () => {
      mockClassService.advanceToNextLevel.mockResolvedValue(advancedClass);

      const result = await controller.advanceClassLevel(classId);

      expect(result).toEqual(advancedClass);
      expect(mockClassService.advanceToNextLevel).toHaveBeenCalledWith(classId);
      expect(mockClassService.advanceToNextLevel).toHaveBeenCalledTimes(1);
    });

    it('should throw error when class not found', async () => {
      const errorMessage = 'Class or current level not found';
      mockClassService.advanceToNextLevel.mockRejectedValue(
        new Error(errorMessage),
      );

      await expect(
        controller.advanceClassLevel('non-existent-id'),
      ).rejects.toThrow(errorMessage);
      expect(mockClassService.advanceToNextLevel).toHaveBeenCalledWith(
        'non-existent-id',
      );
    });

    it('should throw error when no next level exists', async () => {
      const errorMessage = 'No next level found for lesson 5';
      mockClassService.advanceToNextLevel.mockRejectedValue(
        new Error(errorMessage),
      );

      await expect(controller.advanceClassLevel(classId)).rejects.toThrow(
        errorMessage,
      );
      expect(mockClassService.advanceToNextLevel).toHaveBeenCalledWith(classId);
    });
  });

  describe('error handling', () => {
    it('should handle service errors gracefully', async () => {
      const genericError = new Error('Database connection failed');
      mockClassService.findAll.mockRejectedValue(genericError);

      await expect(controller.findAll()).rejects.toThrow(
        'Database connection failed',
      );
    });

    it('should handle invalid UUID format', async () => {
      const invalidId = 'invalid-uuid';
      mockClassService.findOne.mockRejectedValue(
        new Error('Invalid UUID format'),
      );

      await expect(controller.findOne(invalidId)).rejects.toThrow(
        'Invalid UUID format',
      );
    });
  });
});
