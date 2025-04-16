import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
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
}
