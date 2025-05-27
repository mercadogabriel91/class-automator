import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './entities/dto/create.student.dto';
import {
  DeleteStudentResponseDto,
  FindOneStudentQueryDto,
  FindOneStudentResponseDto,
} from './entities/dto/common.student.dto';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  // Mock service
  const mockStudentService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  // Mock data
  const studentsList: Student[] = [
    {
      id: '6c74e933-cdd7-43a4-aa40-31a8bd8be1fc',
      name: 'Bob',
      isActive: true,
    },
    {
      id: '610a7718-4c84-4240-bf48-73f71a7b2abe',
      name: 'Tony',
      isActive: true,
    },
  ] as Student[];

  const mockStudent: FindOneStudentResponseDto = {
    id: '6c74e933-cdd7-43a4-aa40-31a8bd8be1fc',
    name: 'Bob',
    isActive: true,
    classes: [],
  } as FindOneStudentResponseDto;

  const mockDeleteResponse: DeleteStudentResponseDto = {
    success: true,
    message:
      'Student with ID "6c74e933-cdd7-43a4-aa40-31a8bd8be1fc" has been successfully deleted',
    id: '6c74e933-cdd7-43a4-aa40-31a8bd8be1fc',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: mockStudentService,
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      mockStudentService.findAll.mockResolvedValue(studentsList);

      const result = await controller.findAll();

      expect(result).toEqual(studentsList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith();
    });

    it('should return empty array when no students exist', async () => {
      mockStudentService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a student by id', async () => {
      const query: FindOneStudentQueryDto = { id: mockStudent.id };
      mockStudentService.findOne.mockResolvedValue(mockStudent);

      const result = await controller.findOne(query);

      expect(result).toEqual(mockStudent);
      expect(service.findOne).toHaveBeenCalledWith(query.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when student not found', async () => {
      const query: FindOneStudentQueryDto = { id: 'non-existent-id' };
      const notFoundError = new NotFoundException(
        `Student with ID "${query.id}" not found`,
      );

      mockStudentService.findOne.mockRejectedValue(notFoundError);

      await expect(controller.findOne(query)).rejects.toThrow(
        NotFoundException,
      );
      await expect(controller.findOne(query)).rejects.toThrow(
        `Student with ID "${query.id}" not found`,
      );

      expect(service.findOne).toHaveBeenCalledWith(query.id);
      expect(service.findOne).toHaveBeenCalledTimes(2);
    });
  });

  describe('create', () => {
    it('should create and return a new student', async () => {
      const createStudentDto: CreateStudentDto = {
        name: 'Alice',
        isActive: true,
      };
      const createdStudent: Student = {
        ...createStudentDto,
        id: 'new-student-id',
      } as Student;

      mockStudentService.create.mockResolvedValue(createdStudent);

      const result = await controller.create(createStudentDto);

      expect(result).toEqual(createdStudent);
      expect(service.create).toHaveBeenCalledWith(createStudentDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should handle creation with minimal data', async () => {
      const createStudentDto: CreateStudentDto = {
        name: 'Minimal Student',
      } as CreateStudentDto;
      const createdStudent: Student = {
        ...createStudentDto,
        id: 'minimal-student-id',
        isActive: true,
      } as Student;

      mockStudentService.create.mockResolvedValue(createdStudent);

      const result = await controller.create(createStudentDto);

      expect(result).toEqual(createdStudent);
      expect(service.create).toHaveBeenCalledWith(createStudentDto);
    });
  });

  describe('remove', () => {
    it('should delete a student and return success response', async () => {
      const studentId = mockDeleteResponse.id;
      mockStudentService.remove.mockResolvedValue(mockDeleteResponse);

      const result = await controller.remove(studentId);

      expect(result).toEqual(mockDeleteResponse);
      expect(service.remove).toHaveBeenCalledWith(studentId);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when trying to delete non-existent student', async () => {
      const nonExistentId = 'non-existent-id';
      const notFoundError = new NotFoundException(
        `Student with ID "${nonExistentId}" not found`,
      );

      mockStudentService.remove.mockRejectedValue(notFoundError);

      await expect(controller.remove(nonExistentId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(controller.remove(nonExistentId)).rejects.toThrow(
        `Student with ID "${nonExistentId}" not found`,
      );

      expect(service.remove).toHaveBeenCalledWith(nonExistentId);
      expect(service.remove).toHaveBeenCalledTimes(2);
    });
  });

  describe('error handling', () => {
    it('should propagate service errors correctly', async () => {
      const unexpectedError = new Error('Database connection failed');
      mockStudentService.findAll.mockRejectedValue(unexpectedError);

      await expect(controller.findAll()).rejects.toThrow(
        'Database connection failed',
      );
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
