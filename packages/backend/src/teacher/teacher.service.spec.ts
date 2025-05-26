import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './entities/dto/create.teacher.dto';

describe('TeacherService', () => {
  let service: TeacherService;
  let repository: Repository<Teacher>;

  // Mock repository
  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        {
          provide: getRepositoryToken(Teacher),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
    repository = module.get<Repository<Teacher>>(getRepositoryToken(Teacher));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of teachers', async () => {
      const teachers = [
        {
          id: '67478a61-9cd7-4297-867e-514a7q658986',
          name: 'Malcom',
          email: 'malcom@email',
          phone: '99999999',
          isActive: true,
        },
        {
          id: '67478a61-9cd7-4297-867e-514a7q658987',
          name: 'John',
          email: 'john@email',
          phone: '88888888',
          isActive: true,
        },
      ] as Teacher[];

      mockRepository.find.mockResolvedValue(teachers);

      const result = await service.findAll();

      expect(result).toEqual(teachers);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a teacher by id', async () => {
      const teacher = {
        id: '67478a61-9cd7-4297-867e-514a7q658986',
        name: 'Malcom',
        email: 'malcom@email',
        phone: '99999999',
        isActive: true,
      } as Teacher;

      mockRepository.findOneBy.mockResolvedValue(teacher);

      const result = await service.findOne('1');

      expect(result).toEqual(teacher);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });

    it('should return null if teacher not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne('999');

      expect(result).toBeNull();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '999' });
    });
  });

  describe('create', () => {
    it('should create and return a new teacher', async () => {
      const createTeacherDto: CreateTeacherDto = {
        name: 'Malcom',
        email: 'malcom@email',
        phone: '99999999',
      };

      const createdTeacher = {
        id: '67478a61-9cd7-4297-867e-514a7q658986',
        ...createTeacherDto,
      } as Teacher;

      mockRepository.create.mockReturnValue(createdTeacher);
      mockRepository.save.mockResolvedValue(createdTeacher);

      const result = await service.create(createTeacherDto);

      expect(result).toEqual(createdTeacher);
      expect(repository.create).toHaveBeenCalledWith(createTeacherDto);
      expect(repository.save).toHaveBeenCalledWith(createdTeacher);
    });
  });

  describe('remove', () => {
    it('should successfully delete a teacher', async () => {
      const teacherId = '1';
      const teacher = { id: teacherId, name: 'John Doe' } as Teacher;

      mockRepository.findOneBy.mockResolvedValue(teacher);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(teacherId);

      expect(result).toEqual({
        message: `Teacher with ID ${teacherId} successfully deleted`,
      });
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: teacherId });
      expect(repository.delete).toHaveBeenCalledWith(teacherId);
    });

    it('should throw NotFoundException if teacher not found', async () => {
      const teacherId = '999';

      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(teacherId)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: teacherId });
    });

    it('should throw Error if deletion fails', async () => {
      const teacherId = '1';
      const teacher = { id: teacherId, name: 'John Doe' } as Teacher;

      mockRepository.findOneBy.mockResolvedValue(teacher);
      mockRepository.delete.mockRejectedValue(new Error('Database error'));

      await expect(service.remove(teacherId)).rejects.toThrow(
        `Error deleting teacher with ID ${teacherId}: Database error`,
      );
    });
  });
});
