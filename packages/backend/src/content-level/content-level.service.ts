import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities
import { ContentLevel } from './entities/content-level.entity';
import { CreateContentLevelDto } from './entities/dto/create-content-level.dto';

@Injectable()
export class ContentLevelService {
  constructor(
    @InjectRepository(ContentLevel)
    private readonly contentLevelRepository: Repository<ContentLevel>,
  ) {}

  findAll(): Promise<ContentLevel[]> {
    return this.contentLevelRepository.find();
  }

  findOne(id: string): Promise<ContentLevel | null> {
    return this.contentLevelRepository.findOneBy({ id });
  }

  async create(contentLevel: CreateContentLevelDto): Promise<ContentLevel> {
    const newContentLevel = this.contentLevelRepository.create(contentLevel);
    return this.contentLevelRepository.save(newContentLevel);
  }

  async remove(id: number): Promise<void> {
    await this.contentLevelRepository.delete(id);
  }

  async findByLessonNumber(lessonNumber: number) {
    return this.contentLevelRepository.findOneBy({ lessonNumber });
  }
}
