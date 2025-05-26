import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  Column,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// Entities
import { Teacher } from '../../teacher/entities/teacher.entity';
import { Student } from '../../student/entities/student.entity';
import { ContentLevel } from '../../content-level/entities/content-level.entity';

@Entity()
export class Class {
  @ApiProperty({
    description: 'Unique identifier for the class',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiPropertyOptional({
    description: 'Name of the class',
    example: 'Advanced Mathematics',
    nullable: true,
  })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({
    description: 'Whether the class is automated or manually managed',
    example: true,
    default: true,
  })
  @Column({ default: true })
  automated: boolean;

  @ApiProperty({
    description: 'The teacher assigned to this class',
    type: () => Teacher,
  })
  @ManyToOne(() => Teacher, (teacher) => teacher.classes)
  teacher: Teacher;

  @ApiProperty({
    description: 'Students enrolled in this class',
    type: () => [Student],
    isArray: true,
  })
  @ManyToMany(() => Student, (student) => student.classes)
  @JoinTable()
  students: Student[];

  @ApiProperty({
    description: 'Current content level for the class',
    type: () => ContentLevel,
  })
  @ManyToOne(() => ContentLevel)
  currentLevel: ContentLevel;

  @ApiProperty({
    description: 'Content levels that have been completed by this class',
    type: () => [ContentLevel],
    isArray: true,
  })
  @ManyToMany(() => ContentLevel)
  @JoinTable()
  completedLevels: ContentLevel[];
}
