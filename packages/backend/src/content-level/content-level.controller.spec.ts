import { Test, TestingModule } from '@nestjs/testing';
import { ContentLevelController } from './content-level.controller';

describe('ContentLevelController', () => {
  let controller: ContentLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentLevelController],
    }).compile();

    controller = module.get<ContentLevelController>(ContentLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
