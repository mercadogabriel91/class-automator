import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './entities/dto/create.teacher.dto';
import { DeleteTeacherResponseDto } from './entities/dto/common-teacher.dto';

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

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const newTeacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(newTeacher);
  }

  async remove(id: string): Promise<DeleteTeacherResponseDto> {
    try {
      await this.teacherRepository.findOneBy({ id });
    } catch (err) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    try {
      await this.teacherRepository.delete(id);
      return { message: `Teacher with ID ${id} successfully deleted` };
    } catch (error) {
      throw new Error(`Error deleting teacher with ID ${id}: ${error.message}`);
    }
  }
}
