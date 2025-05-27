import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ClassService } from './class.service';
import { Class } from './entities/class.entity';
import { ContentLevelService } from '../content-level/content-level.service';
import { TeacherService } from '../teacher/teacher.service';
import { StudentService } from '../student/student.service';
import { CreateClassDto } from './entities/dto/create-class.dto';

describe('ClassService', () => {
  let service: ClassService;
  let classRepository: Repository<Class>;
  let contentLevelService: ContentLevelService;
  let teacherService: TeacherService;
  let studentService: StudentService;

  // Mock repository
  const mockClassRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  // Mock services
  const mockContentLevelService = {
    findOne: jest.fn(),
    findByIds: jest.fn(),
    findByLessonNumber: jest.fn(),
  };

  const mockTeacherService = {
    findOne: jest.fn(),
  };

  const mockStudentService = {
    findByIds: jest.fn(),
  };

  // Mock data
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
  };

  const mockClasses = [
    {
      id: 'class-1',
      name: 'Class 1',
      automated: true,
    },
    {
      id: 'class-2',
      name: 'Class 2',
      automated: false,
    },
  ];

  const mockCreateClassDto: CreateClassDto = {
    name: 'New Test Class',
    automated: true,
    teacherId: 'teacher-1',
    currentLevelId: 'level-1',
    studentIds: ['student-1', 'student-2'],
    completedLevelIds: ['level-0'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassService,
        {
          provide: getRepositoryToken(Class),
          useValue: mockClassRepository,
        },
        {
          provide: ContentLevelService,
          useValue: mockContentLevelService,
        },
        {
          provide: TeacherService,
          useValue: mockTeacherService,
        },
        {
          provide: StudentService,
          useValue: mockStudentService,
        },
      ],
    }).compile();

    service = module.get<ClassService>(ClassService);
    classRepository = module.get<Repository<Class>>(getRepositoryToken(Class));
    contentLevelService = module.get<ContentLevelService>(ContentLevelService);
    teacherService = module.get<TeacherService>(TeacherService);
    studentService = module.get<StudentService>(StudentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of classes', async () => {
      mockClassRepository.find.mockResolvedValue(mockClasses);

      const result = await service.findAll();

      expect(result).toEqual(mockClasses);
      expect(mockClassRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no classes exist', async () => {
      mockClassRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockClassRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    const classId = 'class-1';

    it('should return a class when found', async () => {
      mockClassRepository.findOne.mockResolvedValue(mockClass);

      const result = await service.findOne(classId);

      expect(result).toEqual(mockClass);
      expect(mockClassRepository.findOne).toHaveBeenCalledWith({
        where: { id: classId },
      });
    });

    it('should return null when class not found', async () => {
      mockClassRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne('non-existent-id');

      expect(result).toBeNull();
      expect(mockClassRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'non-existent-id' },
      });
    });

    it('should throw NotFoundException when database error occurs', async () => {
      const dbError = new NotFoundException('Database connection failed');
      mockClassRepository.findOne.mockRejectedValue(dbError);

      await expect(service.findOne(classId)).rejects.toThrow(NotFoundException);
      expect(mockClassRepository.findOne).toHaveBeenCalledWith({
        where: { id: classId },
      });
    });
  });

  describe('getClassInfo', () => {
    const classId = 'class-1';

    it('should return detailed class information', async () => {
      mockClassRepository.findOne.mockResolvedValue(mockClass);

      const result = await service.getClassInfo(classId);

      expect(result).toEqual({
        id: mockClass.id,
        name: mockClass.name,
        automated: mockClass.automated,
        teacher: {
          id: mockClass.teacher.id,
          name: mockClass.teacher.name,
          email: mockClass.teacher.email,
        },
        students: mockClass.students.map((student) => ({
          id: student.id,
          name: student.name,
        })),
        currentLevel: {
          id: mockClass.currentLevel.id,
          lessonNumber: mockClass.currentLevel.lessonNumber,
        },
        completedLevels: mockClass.completedLevels.map((level) => ({
          id: level.id,
          lessonNumber: level.lessonNumber,
        })),
      });

      expect(mockClassRepository.findOne).toHaveBeenCalledWith({
        where: { id: classId },
        relations: ['teacher', 'students', 'currentLevel', 'completedLevels'],
      });
    });

    it('should throw NotFoundException when class not found', async () => {
      mockClassRepository.findOne.mockResolvedValue(null);

      await expect(service.getClassInfo('non-existent-id')).rejects.toThrow(
        new NotFoundException('Class with id non-existent-id not found'),
      );
    });
  });

  describe('createClass', () => {
    it('should create a class successfully with all data', async () => {
      const createdClass = { ...mockClass, name: 'New Test Class' };
      const savedClass = {
        id: 'new-class-id',
        name: 'New Test Class',
        automated: true,
      };

      mockTeacherService.findOne.mockResolvedValue(mockTeacher);
      mockContentLevelService.findOne.mockResolvedValue(mockCurrentLevel);
      mockStudentService.findByIds.mockResolvedValue(mockStudents);
      mockContentLevelService.findByIds.mockResolvedValue(mockCompletedLevels);
      mockClassRepository.create.mockReturnValue(createdClass);
      mockClassRepository.save.mockResolvedValue(savedClass);

      const result = await service.createClass(mockCreateClassDto);

      expect(result).toEqual({
        id: savedClass.id,
        name: savedClass.name,
        automated: savedClass.automated,
      });

      expect(mockTeacherService.findOne).toHaveBeenCalledWith(
        mockCreateClassDto.teacherId,
      );
      expect(mockContentLevelService.findOne).toHaveBeenCalledWith(
        mockCreateClassDto.currentLevelId,
      );
      expect(mockStudentService.findByIds).toHaveBeenCalledWith(
        mockCreateClassDto.studentIds,
      );
      expect(mockContentLevelService.findByIds).toHaveBeenCalledWith(
        mockCreateClassDto.completedLevelIds,
      );
      expect(mockClassRepository.create).toHaveBeenCalled();
      expect(mockClassRepository.save).toHaveBeenCalledWith(createdClass);
    });

    it('should create a class with minimal data (no students or completed levels)', async () => {
      const minimalDto: CreateClassDto = {
        name: 'Minimal Class',
        teacherId: 'teacher-1',
        currentLevelId: 'level-1',
      };
      const createdClass = {
        name: 'Minimal Class',
        automated: true,
        teacher: mockTeacher,
        currentLevel: mockCurrentLevel,
      };
      const savedClass = {
        id: 'minimal-class-id',
        name: 'Minimal Class',
        automated: true,
      };

      mockTeacherService.findOne.mockResolvedValue(mockTeacher);
      mockContentLevelService.findOne.mockResolvedValue(mockCurrentLevel);
      mockClassRepository.create.mockReturnValue(createdClass);
      mockClassRepository.save.mockResolvedValue(savedClass);

      const result = await service.createClass(minimalDto);

      expect(result).toEqual({
        id: savedClass.id,
        name: savedClass.name,
        automated: savedClass.automated,
      });

      expect(mockStudentService.findByIds).not.toHaveBeenCalled();
      expect(mockContentLevelService.findByIds).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when teacher not found', async () => {
      mockTeacherService.findOne.mockResolvedValue(null);

      await expect(service.createClass(mockCreateClassDto)).rejects.toThrow(
        new NotFoundException(
          `Teacher with ID ${mockCreateClassDto.teacherId} not found`,
        ),
      );

      expect(mockContentLevelService.findOne).not.toHaveBeenCalled();
      expect(mockClassRepository.create).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when content level not found', async () => {
      mockTeacherService.findOne.mockResolvedValue(mockTeacher);
      mockContentLevelService.findOne.mockResolvedValue(null);

      await expect(service.createClass(mockCreateClassDto)).rejects.toThrow(
        new NotFoundException(
          `Content level with ID ${mockCreateClassDto.currentLevelId} not found`,
        ),
      );

      expect(mockClassRepository.create).not.toHaveBeenCalled();
    });

    it('should set automated to true by default when not provided', async () => {
      const dtoWithoutAutomated = { ...mockCreateClassDto };
      delete dtoWithoutAutomated.automated;

      const createdClass = {
        name: 'Test Class',
        automated: true,
        teacher: mockTeacher,
        currentLevel: mockCurrentLevel,
      };

      mockTeacherService.findOne.mockResolvedValue(mockTeacher);
      mockContentLevelService.findOne.mockResolvedValue(mockCurrentLevel);
      mockStudentService.findByIds.mockResolvedValue([]);
      mockContentLevelService.findByIds.mockResolvedValue([]);
      mockClassRepository.create.mockReturnValue(createdClass);
      mockClassRepository.save.mockResolvedValue({
        id: 'test-id',
        name: 'Test Class',
        automated: true,
      });

      await service.createClass(dtoWithoutAutomated);

      expect(mockClassRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ automated: true }),
      );
    });
  });

  describe('remove', () => {
    const classId = 'class-1';

    it('should delete a class successfully', async () => {
      const deleteResult = { affected: 1 };
      mockClassRepository.findOne.mockResolvedValue(mockClass);
      mockClassRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.remove(classId);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Class deleted successfully');
      expect(result.deletedId).toBe(classId);
      expect(result.affected).toBe(1);

      expect(mockClassRepository.findOne).toHaveBeenCalledWith({
        where: { id: classId },
      });
      expect(mockClassRepository.delete).toHaveBeenCalledWith(mockClass.id);
    });

    it('should throw NotFoundException when class not found', async () => {
      mockClassRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        new NotFoundException('Class with id non-existent-id not found'),
      );

      expect(mockClassRepository.delete).not.toHaveBeenCalled();
    });

    it('should handle delete result with no affected rows', async () => {
      const deleteResult = { affected: 0 };
      mockClassRepository.findOne.mockResolvedValue(mockClass);
      mockClassRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.remove(classId);

      expect(result.affected).toBe(0);
    });
  });

  describe('advanceToNextLevel', () => {
    const classId = 'class-1';
    const nextLevel = { id: 'level-2', lessonNumber: 2 };

    it('should advance class to next level successfully', async () => {
      const classWithRelations = {
        ...mockClass,
        completedLevels: [...mockCompletedLevels],
      };
      const updatedClass = {
        ...classWithRelations,
        currentLevel: nextLevel,
        completedLevels: [...mockCompletedLevels, mockCurrentLevel],
      };

      mockClassRepository.findOne.mockResolvedValue(classWithRelations);
      mockContentLevelService.findByLessonNumber.mockResolvedValue(nextLevel);
      mockClassRepository.save.mockResolvedValue(updatedClass);

      const result = await service.advanceToNextLevel(classId);

      expect(result).toEqual(updatedClass);
      expect(mockClassRepository.findOne).toHaveBeenCalledWith({
        where: { id: classId },
        relations: ['currentLevel', 'completedLevels'],
      });
      expect(mockContentLevelService.findByLessonNumber).toHaveBeenCalledWith(
        2,
      );
      expect(mockClassRepository.save).toHaveBeenCalled();
    });

    it('should throw error when class not found', async () => {
      mockClassRepository.findOne.mockResolvedValue(null);

      await expect(service.advanceToNextLevel(classId)).rejects.toThrow(
        'Class or current level not found',
      );

      expect(mockContentLevelService.findByLessonNumber).not.toHaveBeenCalled();
      expect(mockClassRepository.save).not.toHaveBeenCalled();
    });

    it('should throw error when current level not found', async () => {
      const classWithoutLevel = { ...mockClass, currentLevel: null };
      mockClassRepository.findOne.mockResolvedValue(classWithoutLevel);

      await expect(service.advanceToNextLevel(classId)).rejects.toThrow(
        'Class or current level not found',
      );
    });

    it('should throw error when next level not found', async () => {
      mockClassRepository.findOne.mockResolvedValue(mockClass);
      mockContentLevelService.findByLessonNumber.mockResolvedValue(null);

      await expect(service.advanceToNextLevel(classId)).rejects.toThrow(
        'No next level found for lesson 2',
      );

      expect(mockClassRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('findAllAutomatedClassesByTeacher', () => {
    const teacherId = 'teacher-1';

    it('should return automated classes for a specific teacher', async () => {
      const automatedClasses = [{ ...mockClass, automated: true }];
      mockClassRepository.find.mockResolvedValue(automatedClasses);

      const result = await service.findAllAutomatedClassesByTeacher(teacherId);

      expect(result).toEqual(automatedClasses);
      expect(mockClassRepository.find).toHaveBeenCalledWith({
        where: { teacher: { id: teacherId }, automated: true },
        relations: ['currentLevel', 'completedLevels'],
      });
    });

    it('should return empty array when no automated classes found', async () => {
      mockClassRepository.find.mockResolvedValue([]);

      const result = await service.findAllAutomatedClassesByTeacher(teacherId);

      expect(result).toEqual([]);
    });
  });

  describe('findAllAutomatedClasses', () => {
    it('should return all automated classes', async () => {
      const automatedClasses = [{ ...mockClass, automated: true }];
      mockClassRepository.find.mockResolvedValue(automatedClasses);

      const result = await service.findAllAutomatedClasses();

      expect(result).toEqual(automatedClasses);
      expect(mockClassRepository.find).toHaveBeenCalledWith({
        where: { automated: true },
        relations: ['currentLevel', 'completedLevels', 'teacher'],
      });
    });

    it('should return empty array when no automated classes exist', async () => {
      mockClassRepository.find.mockResolvedValue([]);

      const result = await service.findAllAutomatedClasses();

      expect(result).toEqual([]);
    });
  });

  describe('error handling', () => {
    it('should handle repository errors gracefully', async () => {
      const dbError = new Error('Database connection failed');
      mockClassRepository.find.mockRejectedValue(dbError);

      await expect(service.findAll()).rejects.toThrow(
        'Database connection failed',
      );
    });

    it('should handle service dependency errors', async () => {
      const serviceError = new Error('External service unavailable');
      mockTeacherService.findOne.mockRejectedValue(serviceError);

      await expect(service.createClass(mockCreateClassDto)).rejects.toThrow(
        'External service unavailable',
      );
    });
  });
});
