import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './entities/dto/create.student.dto';
import { DeleteStudentResponseDto } from './entities/dto/common.student.dto';
import { FindOneStudentResponseDto } from './entities/dto/common.student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: string): Promise<FindOneStudentResponseDto> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['classes'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }

    return student;
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(newStudent);
  }

  async remove(id: string): Promise<DeleteStudentResponseDto> {
    // First check if the student exists
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }

    // Delete the student
    await this.studentRepository.delete(id);

    // Return response object
    return {
      success: true,
      message: `Student with ID "${id}" has been successfully deleted`,
      id,
    };
  }
}
