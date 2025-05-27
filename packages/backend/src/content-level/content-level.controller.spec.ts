import { Test, TestingModule } from '@nestjs/testing';
import { ContentLevelController } from './content-level.controller';
import { ContentLevelService } from './content-level.service';
import { ContentLevel } from './entities/content-level.entity';
import { CreateContentLevelDto } from './entities/dto/create-content-level.dto';
import { DeleteContentLevelResponseDto } from './entities/dto/common-content-level.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ContentLevelController', () => {
  let controller: ContentLevelController;
  let service: ContentLevelService;

  // Mock data
  const mockContentLevel: ContentLevel = {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    lessonNumber: 5,
    songs: [
      'Twinkle Twinkle Little Star',
      'ABC Song',
      'Head Shoulders Knees and Toes',
    ],
    phonics: {
      unit: 1,
      letter: 'A',
      title: 'Learning the Letter A',
      pictures: ['apple.jpg', 'ant.jpg', 'airplane.jpg'],
    },
    reading: {
      level: 'Beginner',
      title: 'My First Reading Book',
      titles: [
        'Chapter 1: The Cat',
        'Chapter 2: The Dog',
        'Chapter 3: Friends',
      ],
      image: 'cover.jpg',
      images: ['page1.jpg', 'page2.jpg', 'page3.jpg'],
    },
    conversations: [
      'Greeting a friend',
      'Ordering food at a restaurant',
      'Asking for directions',
    ],
    writing: [
      'Write about your family',
      'Describe your favorite animal',
      'Create a short story',
    ],
    vocabulary: ['apple', 'banana', 'cat', 'dog', 'elephant', 'friend'],
  };

  const mockContentLevels: ContentLevel[] = [
    mockContentLevel,
    {
      id: 'b2c3d4e5-f6g7-8901-bcde-f23456789012',
      lessonNumber: 10,
      songs: ['Old MacDonald', "If You're Happy and You Know It"],
      phonics: {
        unit: 2,
        letter: 'B',
        title: 'Learning the Letter B',
        pictures: ['ball.jpg', 'book.jpg', 'butterfly.jpg'],
      },
      reading: {
        level: 'Intermediate',
        title: 'Adventure Stories',
        titles: ['The Magic Forest', 'The Lost Treasure', 'Brave Little Mouse'],
        images: ['forest.jpg', 'treasure.jpg', 'mouse.jpg'],
      },
      conversations: ['Talking about hobbies', 'Making plans with friends'],
      writing: ['Describe your dream vacation', 'Write a letter to a friend'],
      vocabulary: ['house', 'garden', 'bicycle', 'library', 'playground'],
    },
    {
      id: 'c3d4e5f6-g7h8-9012-cdef-345678901234',
      lessonNumber: 17,
      songs: ['Mary Had a Little Lamb'],
      phonics: {
        unit: 1,
        letter: 'a',
        title: 'unit title',
        pictures: ['picture1'],
      },
      reading: {
        level: 'B',
        title: 'reading title',
        titles: ['raz book 1'],
        images: ['reading 1'],
      },
      conversations: ['conversations'],
      writing: ['writing'],
      vocabulary: ['Pit | Hit | Six'],
    },
  ];

  const mockCreateContentLevelDto: CreateContentLevelDto = {
    lessonNumber: 15,
    songs: ['London Bridge', 'Ring Around the Rosie'],
    phonics: {
      unit: 3,
      letter: 'C',
      title: 'Learning the Letter C',
      pictures: ['cat.jpg', 'car.jpg', 'cake.jpg'],
    },
    reading: {
      level: 'Advanced',
      title: 'Mystery Stories',
      titles: ['The Secret Garden', 'Detective Sam', 'Hidden Clues'],
      image: 'mystery.jpg',
      images: ['garden.jpg', 'detective.jpg', 'clues.jpg'],
    },
    conversations: ['Discussing favorite books', 'Planning a birthday party'],
    writing: ['Create a mystery story', 'Write a book review'],
    vocabulary: ['mystery', 'adventure', 'courage', 'friendship', 'discovery'],
  };

  const mockDeleteResponse: DeleteContentLevelResponseDto = {
    success: true,
    message: 'Content level deleted successfully',
    deletedId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    affected: 1,
  };

  // Mock service
  const mockContentLevelService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentLevelController],
      providers: [
        {
          provide: ContentLevelService,
          useValue: mockContentLevelService,
        },
      ],
    }).compile();

    controller = module.get<ContentLevelController>(ContentLevelController);
    service = module.get<ContentLevelService>(ContentLevelService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of content levels', async () => {
      // Arrange
      mockContentLevelService.findAll.mockResolvedValue(mockContentLevels);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(mockContentLevels);
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith();
    });

    it('should return empty array when no content levels exist', async () => {
      // Arrange
      mockContentLevelService.findAll.mockResolvedValue([]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors', async () => {
      // Arrange
      const error = new Error('Database connection failed');
      mockContentLevelService.findAll.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.findAll()).rejects.toThrow(
        'Database connection failed',
      );
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single content level', async () => {
      // Arrange
      const id = '1';
      mockContentLevelService.findOne.mockResolvedValue(mockContentLevel);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(result).toEqual(mockContentLevel);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });

    it('should handle valid UUID string', async () => {
      // Arrange
      const uuid = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
      mockContentLevelService.findOne.mockResolvedValue(mockContentLevel);

      // Act
      const result = await controller.findOne(uuid);

      // Assert
      expect(result).toEqual(mockContentLevel);
      expect(service.findOne).toHaveBeenCalledWith(uuid);
    });

    it('should throw NotFoundException when content level not found', async () => {
      // Arrange
      const id = 'non-existent-id';
      mockContentLevelService.findOne.mockRejectedValue(
        new NotFoundException('Content level not found'),
      );

      // Act & Assert
      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });

    it('should handle empty string id', async () => {
      // Arrange
      const id = '';
      mockContentLevelService.findOne.mockRejectedValue(
        new BadRequestException('Invalid ID provided'),
      );

      // Act & Assert
      await expect(controller.findOne(id)).rejects.toThrow(BadRequestException);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });

    it('should handle service errors', async () => {
      // Arrange
      const id = '1';
      const error = new Error('Service unavailable');
      mockContentLevelService.findOne.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.findOne(id)).rejects.toThrow(
        'Service unavailable',
      );
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should create and return a new content level', async () => {
      // Arrange
      const newContentLevel = {
        ...mockCreateContentLevelDto,
        id: '4',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockContentLevelService.create.mockResolvedValue(newContentLevel);

      // Act
      const result = await controller.create(mockCreateContentLevelDto);

      // Assert
      expect(result).toEqual(newContentLevel);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(mockCreateContentLevelDto);
    });

    it('should throw BadRequestException for invalid data', async () => {
      // Arrange
      const invalidDto = {
        songs: [], // Empty songs array
        lessonNumber: -1,
        phonics: {
          unit: -1,
          letter: '',
          title: '',
          pictures: [],
        },
      } as CreateContentLevelDto;
      mockContentLevelService.create.mockRejectedValue(
        new BadRequestException('Invalid content level data'),
      );

      // Act & Assert
      await expect(controller.create(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(service.create).toHaveBeenCalledWith(invalidDto);
    });

    it('should handle duplicate lesson number errors', async () => {
      // Arrange
      const duplicateDto: CreateContentLevelDto = {
        lessonNumber: 5, // Already exists in mockContentLevel
        songs: ['Test Song'],
      };
      mockContentLevelService.create.mockRejectedValue(
        new BadRequestException(
          'Content level with this lesson number already exists',
        ),
      );

      // Act & Assert
      await expect(controller.create(duplicateDto)).rejects.toThrow(
        'Content level with this lesson number already exists',
      );
      expect(service.create).toHaveBeenCalledWith(duplicateDto);
    });

    it('should handle service errors during creation', async () => {
      // Arrange
      const error = new Error('Database write failed');
      mockContentLevelService.create.mockRejectedValue(error);

      // Act & Assert
      await expect(
        controller.create(mockCreateContentLevelDto),
      ).rejects.toThrow('Database write failed');
      expect(service.create).toHaveBeenCalledWith(mockCreateContentLevelDto);
    });
  });

  describe('remove', () => {
    it('should delete a content level and return success response', async () => {
      // Arrange
      const id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
      mockContentLevelService.remove.mockResolvedValue(mockDeleteResponse);

      // Act
      const result = await controller.remove(id);

      // Assert
      expect(result).toEqual(mockDeleteResponse);
      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should handle UUID format ids', async () => {
      // Arrange
      const uuid = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
      const deleteResponse = { ...mockDeleteResponse, id: uuid };
      mockContentLevelService.remove.mockResolvedValue(deleteResponse);

      // Act
      const result = await controller.remove(uuid);

      // Assert
      expect(result).toEqual(deleteResponse);
      expect(service.remove).toHaveBeenCalledWith(uuid);
    });

    it('should throw NotFoundException when content level not found', async () => {
      // Arrange
      const id = 'non-existent-id';
      mockContentLevelService.remove.mockRejectedValue(
        new NotFoundException('Content level not found'),
      );

      // Act & Assert
      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should handle deletion of content level with dependencies', async () => {
      // Arrange
      const id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
      mockContentLevelService.remove.mockRejectedValue(
        new BadRequestException(
          'Cannot delete content level with existing dependencies',
        ),
      );

      // Act & Assert
      await expect(controller.remove(id)).rejects.toThrow(
        'Cannot delete content level with existing dependencies',
      );
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should handle empty or invalid id', async () => {
      // Arrange
      const invalidId = '';
      mockContentLevelService.remove.mockRejectedValue(
        new BadRequestException('Invalid ID provided'),
      );

      // Act & Assert
      await expect(controller.remove(invalidId)).rejects.toThrow(
        BadRequestException,
      );
      expect(service.remove).toHaveBeenCalledWith(invalidId);
    });

    it('should handle service errors during deletion', async () => {
      // Arrange
      const id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
      const error = new Error('Database deletion failed');
      mockContentLevelService.remove.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.remove(id)).rejects.toThrow(
        'Database deletion failed',
      );
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('Service Integration', () => {
    it('should properly inject ContentLevelService', () => {
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(Object);
    });

    it('should have all required service methods', () => {
      expect(service.findAll).toBeDefined();
      expect(service.findOne).toBeDefined();
      expect(service.create).toBeDefined();
      expect(service.remove).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should propagate async errors correctly', async () => {
      // Arrange
      const asyncError = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Async operation failed')), 10);
      });
      mockContentLevelService.findAll.mockReturnValue(asyncError);

      // Act & Assert
      await expect(controller.findAll()).rejects.toThrow(
        'Async operation failed',
      );
    });

    it('should handle undefined service responses', async () => {
      // Arrange
      mockContentLevelService.findOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.findOne(
        'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      );

      // Assert
      expect(result).toBeUndefined();
      expect(service.findOne).toHaveBeenCalledWith(
        'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      );
    });
  });

  describe('Parameter Validation', () => {
    it('should pass string ids correctly to service', async () => {
      // Arrange
      const stringId = 'string-id-123';
      mockContentLevelService.findOne.mockResolvedValue(mockContentLevel);

      // Act
      await controller.findOne(stringId);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(stringId);
    });

    it('should pass numeric string ids correctly', async () => {
      // Arrange
      const numericId = '12345';
      mockContentLevelService.remove.mockResolvedValue(mockDeleteResponse);

      // Act
      await controller.remove(numericId);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(numericId);
    });
  });

  describe('Complex Data Structure Tests', () => {
    it('should handle content level with all nested data populated', async () => {
      // Arrange
      const complexContentLevel: ContentLevel = {
        id: 'e5f6g7h8-i9j0-1234-efgh-567890123456',
        lessonNumber: 25,
        songs: ['Complex Song 1', 'Complex Song 2', 'Complex Song 3'],
        phonics: {
          unit: 5,
          letter: 'Z',
          title: 'Advanced Letter Z',
          pictures: ['zebra.jpg', 'zoo.jpg', 'zigzag.jpg', 'zero.jpg'],
        },
        reading: {
          level: 'Expert',
          title: 'Advanced Reading Comprehension',
          titles: [
            'Chapter 1: Complex Narratives',
            'Chapter 2: Critical Analysis',
            'Chapter 3: Literary Devices',
            'Chapter 4: Advanced Vocabulary',
          ],
          image: 'advanced-cover.jpg',
          images: ['narrative.jpg', 'analysis.jpg', 'devices.jpg', 'vocab.jpg'],
        },
        conversations: [
          'Discussing complex topics',
          'Debating different viewpoints',
          'Presenting arguments',
          'Academic discussions',
        ],
        writing: [
          'Write a research paper',
          'Create a persuasive essay',
          'Develop a character study',
          'Compose a critical review',
        ],
        vocabulary: [
          'sophisticated',
          'analysis',
          'comprehension',
          'articulate',
          'perspective',
          'methodology',
        ],
      };
      mockContentLevelService.findOne.mockResolvedValue(complexContentLevel);

      // Act
      const result = await controller.findOne(
        'e5f6g7h8-i9j0-1234-efgh-567890123456',
      );

      // Assert
      expect(result).toEqual(complexContentLevel);
      expect(result.phonics).toHaveProperty('unit', 5);
      expect(result.phonics).toHaveProperty('letter', 'Z');
      expect(result.reading).toHaveProperty('level', 'Expert');
      expect(result.songs).toHaveLength(3);
      expect(result.vocabulary).toContain('sophisticated');
    });
  });
});
