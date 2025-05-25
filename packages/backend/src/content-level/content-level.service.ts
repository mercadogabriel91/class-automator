import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities
import { ContentLevel } from './entities/content-level.entity';
import { CreateContentLevelDto } from './entities/dto/create-content-level.dto';
import { DeleteContentLevelResponseDto } from './entities/dto/common-content-level.dto';

@Injectable()
export class ContentLevelService {
  constructor(
    @InjectRepository(ContentLevel)
    private readonly contentLevelRepository: Repository<ContentLevel>,
  ) {}

  findAll(): Promise<ContentLevel[]> {
    return this.contentLevelRepository.find();
  }

  async findOne(id: string): Promise<ContentLevel> {
    const contentLevel = await this.contentLevelRepository.findOne({
      where: { id },
    });

    if (!contentLevel) {
      throw new NotFoundException(`ContentLevel with ID "${id}" not found`);
    }
    return contentLevel;
  }

  async create(contentLevel: CreateContentLevelDto): Promise<ContentLevel> {
    const newContentLevel = this.contentLevelRepository.create(contentLevel);
    return this.contentLevelRepository.save(newContentLevel);
  }

  async remove(id: string): Promise<DeleteContentLevelResponseDto> {
    const contentLevelToDelete = await this.findOne(id);
    const deleteResult = await this.contentLevelRepository.delete(
      contentLevelToDelete.id,
    );

    return new DeleteContentLevelResponseDto(
      true,
      'Content level deleted successfully',
      id,
      deleteResult.affected || 0,
    );
  }

  async findByLessonNumber(lessonNumber: number) {
    return this.contentLevelRepository.findOneBy({ lessonNumber });
  }

  async findByIds(ids: string[]): Promise<ContentLevel[]> {
    const contentLevelsList: ContentLevel[] = [];
    for (const id of ids) {
      const contentLevel = await this.contentLevelRepository.findOne({
        where: { id },
      });

      if (!contentLevel) {
        throw new NotFoundException(`ContentLevel with ID "${id}" not found`);
      }

      contentLevelsList.push(contentLevel);
    }
    return contentLevelsList;
  }
}
