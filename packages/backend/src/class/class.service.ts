import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//Services
import { ContentLevelService } from '../content-level/content-level.service';
// Entities
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    private readonly contentLevelService: ContentLevelService,
  ) {}

  findAll(): Promise<Class[]> {
    return this.classRepository.find();
  }

  findOne(id: string): Promise<Class | null> {
    return this.classRepository.findOneBy({ id });
  }

  getClassInfo(id: string): Promise<Class | null> {
    return this.classRepository.findOne({
      where: { id },
      relations: ['teacher', 'students', 'currentLevel', 'completedLevels'],
    });
  }

  createClass = async (body): Promise<Class[] | any> => {
    const { class: classData } = body;
    const newClass = this.classRepository.create(classData);
    return this.classRepository.save(newClass);
  };

  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }

  async advanceToNextLevel(classId: string): Promise<Class> {
    const cls = await this.classRepository.findOne({
      where: { id: classId },
      relations: ['currentLevel', 'completedLevels'],
    });

    if (!cls || !cls.currentLevel) {
      throw new Error('Class or current level not found');
    }

    const currentLesson = cls.currentLevel.lessonNumber;

    // Add current to completed
    cls.completedLevels.push(cls.currentLevel);

    // Find next content level
    const nextLevel = await this.contentLevelService.findByLessonNumber(
      currentLesson + 1,
    );
    // const nextLevel = await this.contentLevelService.findOne({
    //   where: { lessonNumber: currentLesson + 1 },
    // });

    if (!nextLevel) {
      throw new Error(`No next level found for lesson ${currentLesson + 1}`);
    }

    cls.currentLevel = nextLevel;
    return this.classRepository.save(cls);
  }
}
