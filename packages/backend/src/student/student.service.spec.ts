import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './entities/dto/create.student.dto';

describe('StudentService', () => {
  let service: StudentService;
  let repository: Repository<Student>;

  // Mock repository - updated to include all methods used by the service
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  // Mock data
  const studentsList = [
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    repository = module.get<Repository<Student>>(getRepositoryToken(Student));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      mockRepository.find.mockResolvedValue(studentsList);

      const result = await service.findAll();

      expect(result).toEqual(studentsList);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a student by id', async () => {
      const expectedStudent = studentsList[0];
      mockRepository.findOne.mockResolvedValue(expectedStudent);

      const result = await service.findOne(expectedStudent.id);

      expect(result).toEqual(expectedStudent);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: expectedStudent.id },
        relations: ['classes'],
      });
    });

    it('should throw NotFoundException when student not found', async () => {
      const nonExistentId = 'non-existent-id';
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(nonExistentId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findOne(nonExistentId)).rejects.toThrow(
        `Student with ID "${nonExistentId}" not found`,
      );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: nonExistentId },
        relations: ['classes'],
      });
    });
  });

  describe('create', () => {
    it('should create and return a new student', async () => {
      const createStudentDto: CreateStudentDto = {
        name: 'Alice',
        isActive: true,
      };
      const createdStudent = { ...createStudentDto, id: 'new-id' } as Student;

      mockRepository.create.mockReturnValue(createdStudent);
      mockRepository.save.mockResolvedValue(createdStudent);

      const result = await service.create(createStudentDto);

      expect(result).toEqual(createdStudent);
      expect(repository.create).toHaveBeenCalledWith(createStudentDto);
      expect(repository.save).toHaveBeenCalledWith(createdStudent);
    });
  });

  describe('remove', () => {
    it('should delete a student and return success response', async () => {
      const studentId = studentsList[0].id;
      const existingStudent = studentsList[0];

      mockRepository.findOne.mockResolvedValue(existingStudent);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(studentId);

      expect(result).toEqual({
        success: true,
        message: `Student with ID "${studentId}" has been successfully deleted`,
        id: studentId,
      });
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: studentId },
      });
      expect(repository.delete).toHaveBeenCalledWith(studentId);
    });

    it('should throw NotFoundException when trying to delete non-existent student', async () => {
      const nonExistentId = 'non-existent-id';
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(nonExistentId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.remove(nonExistentId)).rejects.toThrow(
        `Student with ID "${nonExistentId}" not found`,
      );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: nonExistentId },
      });
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });

  describe('findByIds', () => {
    it('should return students for all provided ids', async () => {
      const ids = [studentsList[0].id, studentsList[1].id];

      mockRepository.findOne
        .mockResolvedValueOnce(studentsList[0])
        .mockResolvedValueOnce(studentsList[1]);

      const result = await service.findByIds(ids);

      expect(result).toEqual(studentsList);
      expect(repository.findOne).toHaveBeenCalledTimes(2);
      expect(repository.findOne).toHaveBeenNthCalledWith(1, {
        where: { id: ids[0] },
      });
      expect(repository.findOne).toHaveBeenNthCalledWith(2, {
        where: { id: ids[1] },
      });
    });

    it('should throw NotFoundException when any student id is not found', async () => {
      const ids = [studentsList[0].id, 'non-existent-id'];

      mockRepository.findOne
        .mockResolvedValueOnce(studentsList[0])
        .mockResolvedValueOnce(null);

      await expect(service.findByIds(ids)).rejects.toThrow(NotFoundException);
      await expect(service.findByIds(ids)).rejects.toThrow(
        `Student with ID \"${studentsList[0].id}\" not found`,
      );
    });
  });
});
