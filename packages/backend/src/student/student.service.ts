import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  findOne(id: string): Promise<Student | null> {
    return this.studentRepository.findOneBy({ id });
  }

  async create(body): Promise<Student[]> {
    const { student } = body;
    const newStudent = this.studentRepository.create(student);
    return this.studentRepository.save(newStudent);
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
