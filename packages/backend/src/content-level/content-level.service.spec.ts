import { Test, TestingModule } from '@nestjs/testing';
import { ContentLevelService } from './content-level.service';

describe('ContentLevelService', () => {
  let service: ContentLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentLevelService],
    }).compile();

    service = module.get<ContentLevelService>(ContentLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
