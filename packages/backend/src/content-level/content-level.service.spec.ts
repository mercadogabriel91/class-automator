import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ContentLevelService } from './content-level.service';
import {
  ContentLevel,
  PhonicsData,
  ReadingData,
} from './entities/content-level.entity';
import { CreateContentLevelDto } from './entities/dto/create-content-level.dto';
import { DeleteContentLevelResponseDto } from './entities/dto/common-content-level.dto';

describe('ContentLevelService', () => {
  let service: ContentLevelService;
  let repository: Repository<ContentLevel>;

  // Mock data
  const mockContentLevel: ContentLevel = {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    lessonNumber: 1,
    songs: ['Twinkle Twinkle Little Star', 'ABC Song'],
    phonics: {
      unit: 1,
      letter: 'A',
      title: 'Learning the Letter A',
      pictures: ['apple.jpg', 'ant.jpg', 'airplane.jpg'],
    },
    reading: {
      level: 'Beginner',
      title: 'My First Reading Book',
      titles: ['Chapter 1: The Cat', 'Chapter 2: The Dog'],
      image: 'cover.jpg',
      images: ['page1.jpg', 'page2.jpg'],
    },
    conversations: ['Greeting a friend', 'Introducing yourself'],
    writing: ['Write about your family', 'Describe your pet'],
    vocabulary: ['apple', 'ant', 'cat', 'dog'],
  };

  const mockContentLevels: ContentLevel[] = [
    mockContentLevel,
    {
      id: 'b2c3d4e5-f6g7-8901-bcde-f23456789012',
      lessonNumber: 2,
      songs: ['Head Shoulders Knees and Toes', "If You're Happy"],
      phonics: {
        unit: 2,
        letter: 'B',
        title: 'Learning the Letter B',
        pictures: ['ball.jpg', 'banana.jpg', 'bird.jpg'],
      },
      reading: {
        level: 'Intermediate',
        title: 'Stories for Growing Readers',
        titles: ['Chapter 1: The Park', 'Chapter 2: My School'],
        image: 'intermediate-cover.jpg',
        images: ['park1.jpg', 'school1.jpg'],
      },
      conversations: ['Ordering food', 'Asking for directions'],
      writing: ['Describe your day', 'Write a short story'],
      vocabulary: ['ball', 'banana', 'bird', 'book'],
    },
  ];

  const mockCreateDto: CreateContentLevelDto = {
    lessonNumber: 3,
    songs: ['Mary Had a Little Lamb', 'Old MacDonald'],
    phonics: {
      unit: 3,
      letter: 'C',
      title: 'Learning the Letter C',
      pictures: ['cat.jpg', 'car.jpg', 'cake.jpg'],
    },
    reading: {
      level: 'Advanced',
      title: 'Advanced Reading Adventures',
      titles: ['Chapter 1: The Adventure', 'Chapter 2: New Friends'],
      image: 'advanced-cover.jpg',
      images: ['adventure1.jpg', 'friends1.jpg'],
    },
    conversations: ['Shopping at the store', 'Talking about hobbies'],
    writing: ['Write a letter to a friend', 'Create your own story'],
    vocabulary: ['cat', 'car', 'cake', 'cookie'],
  };

  // Mock repository
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentLevelService,
        {
          provide: getRepositoryToken(ContentLevel),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ContentLevelService>(ContentLevelService);
    repository = module.get<Repository<ContentLevel>>(
      getRepositoryToken(ContentLevel),
    );

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of content levels', async () => {
      mockRepository.find.mockResolvedValue(mockContentLevels);

      const result = await service.findAll();

      expect(result).toEqual(mockContentLevels);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no content levels exist', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a content level when found', async () => {
      mockRepository.findOne.mockResolvedValue(mockContentLevel);

      const result = await service.findOne(
        'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      );

      expect(result).toEqual(mockContentLevel);
      expect(result.songs).toEqual(['Twinkle Twinkle Little Star', 'ABC Song']);
      expect(result.phonics.letter).toBe('A');
      expect(result.reading.level).toBe('Beginner');
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
      });
    });

    it('should throw NotFoundException when content level not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(
        new NotFoundException('ContentLevel with ID "999" not found'),
      );

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '999' },
      });
    });
  });

  describe('create', () => {
    it('should create and return a new content level', async () => {
      const createdContentLevel = {
        ...mockCreateDto,
        id: 'c3d4e5f6-g7h8-9012-cdef-345678901234',
      } as ContentLevel;

      mockRepository.create.mockReturnValue(createdContentLevel);
      mockRepository.save.mockResolvedValue(createdContentLevel);

      const result = await service.create(mockCreateDto);

      expect(result).toEqual(createdContentLevel);
      expect(result.songs).toEqual(['Mary Had a Little Lamb', 'Old MacDonald']);
      expect(result.phonics.letter).toBe('C');
      expect(result.reading.level).toBe('Advanced');
      expect(result.vocabulary).toContain('cat');
      expect(mockRepository.create).toHaveBeenCalledWith(mockCreateDto);
      expect(mockRepository.save).toHaveBeenCalledWith(createdContentLevel);
    });

    it('should handle repository errors during creation', async () => {
      const error = new Error('Database error');
      mockRepository.create.mockReturnValue(mockCreateDto);
      mockRepository.save.mockRejectedValue(error);

      await expect(service.create(mockCreateDto)).rejects.toThrow(error);
    });
  });

  describe('remove', () => {
    it('should successfully delete a content level', async () => {
      const deleteResult = { affected: 1 };
      const mockedContentCopy = { ...mockContentLevel };
      mockedContentCopy.id = '1';

      mockRepository.findOne.mockResolvedValue(mockedContentCopy);
      mockRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.remove('1');

      expect(result).toBeInstanceOf(DeleteContentLevelResponseDto);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Content level deleted successfully');
      expect(result.deletedId).toBe('1');
      expect(result.affected).toBe(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when trying to delete non-existent content level', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('999')).rejects.toThrow(
        new NotFoundException('ContentLevel with ID "999" not found'),
      );

      expect(mockRepository.delete).not.toHaveBeenCalled();
    });

    it('should handle case when delete operation affects 0 rows', async () => {
      const deleteResult = { affected: 0 };

      mockRepository.findOne.mockResolvedValue(mockContentLevel);
      mockRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.remove(
        'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      );

      expect(result.affected).toBe(0);
    });

    it('should handle case when affected is undefined', async () => {
      const deleteResult = { affected: undefined };

      mockRepository.findOne.mockResolvedValue(mockContentLevel);
      mockRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.remove(
        'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      );

      expect(result.affected).toBe(0);
    });
  });

  describe('findByLessonNumber', () => {
    it('should return content level by lesson number', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockContentLevel);

      const result = await service.findByLessonNumber(1);

      expect(result).toEqual(mockContentLevel);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        lessonNumber: 1,
      });
    });

    it('should return null when no content level found for lesson number', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findByLessonNumber(999);

      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        lessonNumber: 999,
      });
    });
  });

  describe('findByIds', () => {
    it('should return array of content levels for valid ids', async () => {
      const ids = [
        'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        'b2c3d4e5-f6g7-8901-bcde-f23456789012',
      ];
      mockRepository.findOne
        .mockResolvedValueOnce(mockContentLevels[0])
        .mockResolvedValueOnce(mockContentLevels[1]);

      const result = await service.findByIds(ids);

      expect(result).toEqual(mockContentLevels);
      expect(result[0].phonics.letter).toBe('A');
      expect(result[1].phonics.letter).toBe('B');
      expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
      expect(mockRepository.findOne).toHaveBeenNthCalledWith(1, {
        where: { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
      });
      expect(mockRepository.findOne).toHaveBeenNthCalledWith(2, {
        where: { id: 'b2c3d4e5-f6g7-8901-bcde-f23456789012' },
      });
    });

    it('should throw NotFoundException when one of the ids is not found', async () => {
      const ids = ['a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'invalid-uuid-9999'];
      mockRepository.findOne
        .mockResolvedValueOnce(mockContentLevels[0])
        .mockResolvedValueOnce(null);

      await expect(service.findByIds(ids)).rejects.toThrow(
        new NotFoundException(
          'ContentLevel with ID "invalid-uuid-9999" not found',
        ),
      );

      expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
    });

    it('should return empty array for empty ids array', async () => {
      const result = await service.findByIds([]);

      expect(result).toEqual([]);
      expect(mockRepository.findOne).not.toHaveBeenCalled();
    });

    it('should handle single id in array', async () => {
      const ids = ['a1b2c3d4-e5f6-7890-abcd-ef1234567890'];
      mockRepository.findOne.mockResolvedValue(mockContentLevel);

      const result = await service.findByIds(ids);

      expect(result).toEqual([mockContentLevel]);
      expect(result[0].songs).toEqual([
        'Twinkle Twinkle Little Star',
        'ABC Song',
      ]);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException on first invalid id', async () => {
      const ids = ['invalid-uuid-9999', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'];
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.findByIds(ids)).rejects.toThrow(
        new NotFoundException(
          'ContentLevel with ID "invalid-uuid-9999" not found',
        ),
      );

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Repository interaction edge cases', () => {
    it('should handle repository connection errors', async () => {
      const dbError = new Error('Database connection failed');
      mockRepository.find.mockRejectedValue(dbError);

      await expect(service.findAll()).rejects.toThrow(dbError);
    });

    it('should handle repository timeout errors', async () => {
      const timeoutError = new Error('Query timeout');
      mockRepository.findOne.mockRejectedValue(timeoutError);

      await expect(service.findOne('1')).rejects.toThrow(timeoutError);
    });
  });
});
