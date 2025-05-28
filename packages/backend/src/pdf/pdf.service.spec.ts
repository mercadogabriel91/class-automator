import { Test, TestingModule } from '@nestjs/testing';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';

describe('PdfService', () => {
  let controller: PdfController;
  let service: PdfService;

  // Mock service
  const mockPdfService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfController],
      providers: [
        {
          provide: PdfService,
          useValue: mockPdfService,
        },
      ],
    }).compile();

    controller = module.get<PdfController>(PdfController);
    service = module.get<PdfService>(PdfService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
