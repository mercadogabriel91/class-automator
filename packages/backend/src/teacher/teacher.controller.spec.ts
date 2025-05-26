import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './entities/dto/create.teacher.dto';
import { Teacher } from './entities/teacher.entity';

describe('TeacherController', () => {
  let controller: TeacherController;
  let service: TeacherService;

  // Mock service
  const mockTeacherService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  // Mock data
  const mockTeacherList = [
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherService,
          useValue: mockTeacherService,
        },
      ],
    }).compile();

    controller = module.get<TeacherController>(TeacherController);
    service = module.get<TeacherService>(TeacherService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of teachers', async () => {
      mockTeacherService.findAll.mockResolvedValue(mockTeacherList);

      const result = await controller.findAll();

      expect(result).toEqual(mockTeacherList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a teacher by id', async () => {
      const teacher = mockTeacherList[0];

      mockTeacherService.findOne.mockResolvedValue(teacher);

      const result = await controller.findOne('1');

      expect(result).toEqual(teacher);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create and return a new teacher', async () => {
      const createTeacherDto: CreateTeacherDto = {
        name: 'New Teacher',
        email: 'newTeacher@email',
        phone: '99999999',
      };

      const createdTeacher = { id: '1', ...createTeacherDto } as Teacher;

      mockTeacherService.create.mockResolvedValue(createdTeacher);

      const result = await controller.create(createTeacherDto);

      expect(result).toEqual(createdTeacher);
      expect(service.create).toHaveBeenCalledWith(createTeacherDto);
    });
  });

  describe('remove', () => {
    it('should delete a teacher and return success message', async () => {
      const teacherId = '1';
      const deleteResponse = {
        message: `Teacher with ID ${teacherId} successfully deleted`,
      };

      mockTeacherService.remove.mockResolvedValue(deleteResponse);

      const result = await controller.remove(teacherId);

      expect(result).toEqual(deleteResponse);
      expect(service.remove).toHaveBeenCalledWith(teacherId);
    });
  });
});
