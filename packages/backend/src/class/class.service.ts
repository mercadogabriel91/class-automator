import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//Services
import { ContentLevelService } from '../content-level/content-level.service';
import { PdfService } from '../pdf/pdf.service';
// Entities
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    private readonly contentLevelService: ContentLevelService,
    private readonly pdfService: PdfService,
  ) {}

  private async runStartupTask() {
    try {
      // 1) Find all automated classes for specific teacher:
      // const automatedC: Class[] = await this.findAllAutomatedClasses(
      //   '67478a61-9cd7-4297-867e-514a7b652986',
      // );

      // // 2) Level up each automated class
      // for (const cls of automatedC) {
      //   try {
      //     await this.advanceToNextLevel(cls.id);
      //   } catch (error) {
      //     console.error(`Error advancing class ${cls.id}:`, error);
      //   }
      // }

      // 3) Generate lesson plan pdf
      await this.pdfService.generatePdf({
        message: `created by teacher id: 67478a61-9cd7-4297-867e-514a7b652986`,
      });

      // 4) Send the lesson plan file

      console.log('Startup task completed successfully');
    } catch (error) {
      console.error('Error executing startup task:', error);
    }
  }

  async onApplicationBootstrap() {
    // Your startup task goes here
    await this.runStartupTask();
  }

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

  /**
   *
   *  --- Advanced functions section ---
   *
   **/

  // Advance class level
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

  async findAllAutomatedClasses(teacherid: string): Promise<Class[]> {
    return this.classRepository.find({
      where: { teacher: { id: teacherid }, automated: true },
      relations: ['currentLevel', 'completedLevels'],
    });
  }
}
