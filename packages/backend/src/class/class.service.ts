import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//Services
import { ContentLevelService } from '../content-level/content-level.service';
import { TeacherService } from '../teacher/teacher.service';
import { StudentService } from '../student/student.service';
// Entities
import { Class } from './entities/class.entity';
import {
  FindClassInformationResponseDto,
  DeleteClassResponseDto,
} from './entities/dto/common.class.dto';
import { CreateClassDto } from './entities/dto/create-class.dto';
import { ClassResponseDto } from './entities/dto/class-response.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    private readonly contentLevelService: ContentLevelService,
    private readonly teacherSerice: TeacherService,
    private readonly studentService: StudentService,
  ) {}

  findAll(): Promise<Class[]> {
    return this.classRepository.find();
  }

  async findOne(id: string): Promise<Class | null> {
    try {
      return this.classRepository.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException(
        `Class with id ${id} not found. Error: ${error}`,
      );
    }
  }

  async getClassInfo(id: string): Promise<FindClassInformationResponseDto> {
    const classData = await this.classRepository.findOne({
      where: { id },
      relations: ['teacher', 'students', 'currentLevel', 'completedLevels'],
    });

    if (!classData) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }

    return {
      id: classData.id,
      name: classData.name,
      automated: classData.automated,
      teacher: {
        id: classData.teacher.id,
        name: classData.teacher.name,
        email: classData.teacher.email,
      },
      students: classData.students.map((student) => ({
        id: student.id,
        name: student.name,
      })),
      currentLevel: {
        id: classData.currentLevel.id,
        lessonNumber: classData.currentLevel.lessonNumber,
      },
      completedLevels: classData.completedLevels.map((level) => ({
        id: level.id,
        lessonNumber: level.lessonNumber,
      })),
    };
  }

  // Create a new class
  async createClass(createClassDto: CreateClassDto): Promise<ClassResponseDto> {
    // Find related entities
    const teacher = await this.teacherSerice.findOne(createClassDto.teacherId);

    if (!teacher) {
      throw new NotFoundException(
        `Teacher with ID ${createClassDto.teacherId} not found`,
      );
    }

    const currentLevel = await this.contentLevelService.findOne(
      createClassDto.currentLevelId,
    );

    if (!currentLevel) {
      throw new NotFoundException(
        `Content level with ID ${createClassDto.currentLevelId} not found`,
      );
    }

    // Create new class
    const newClass = this.classRepository.create({
      name: createClassDto.name,
      automated: createClassDto.automated ?? true,
      teacher,
      currentLevel,
    });

    // Add students if provided
    if (createClassDto.studentIds && createClassDto.studentIds.length > 0) {
      const students = await this.studentService.findByIds(
        createClassDto.studentIds,
      );
      newClass.students = students;
    }

    // Add completed levels if provided
    if (
      createClassDto.completedLevelIds &&
      createClassDto.completedLevelIds.length > 0
    ) {
      const completedLevels = await this.contentLevelService.findByIds(
        createClassDto.completedLevelIds,
      );
      newClass.completedLevels = completedLevels;
    }

    // Save and return
    const savedClass = await this.classRepository.save(newClass);
    return {
      id: savedClass.id,
      name: savedClass.name,
      automated: savedClass.automated,
    };
  }

  async remove(id: string): Promise<DeleteClassResponseDto> {
    const classToDelete = await this.classRepository.findOne({ where: { id } });

    if (!classToDelete) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }

    const deleteResult = await this.classRepository.delete(classToDelete.id);

    return new DeleteClassResponseDto(
      true,
      'Class deleted successfully',
      id,
      deleteResult.affected || 0,
    );
  }

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

    if (!nextLevel) {
      throw new Error(`No next level found for lesson ${currentLesson + 1}`);
    }

    cls.currentLevel = nextLevel;
    return this.classRepository.save(cls);
  }

  async findAllAutomatedClassesByTeacher(teacherid: string): Promise<Class[]> {
    return this.classRepository.find({
      where: { teacher: { id: teacherid }, automated: true },
      relations: ['currentLevel', 'completedLevels'],
    });
  }

  async findAllAutomatedClasses(): Promise<Class[]> {
    return this.classRepository.find({
      where: { automated: true },
      relations: ['currentLevel', 'completedLevels', 'teacher'],
    });
  }
}
