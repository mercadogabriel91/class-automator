import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }

  findOne(id: string): Promise<Teacher | null> {
    return this.teacherRepository.findOneBy({ id });
  }

  async create(body): Promise<Teacher[]> {
    const { teacher } = body;
    const newTeacher = this.teacherRepository.create(teacher);
    return this.teacherRepository.save(newTeacher);
  }

  async remove(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
