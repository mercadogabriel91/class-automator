import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  Column,
} from 'typeorm';
// Entities
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Student } from 'src/student/entities/student.entity';
import { ContentLevel } from 'src/content-level/entities/content-level.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: true })
  automated: boolean;

  @ManyToOne(() => Teacher, (teacher) => teacher.classes)
  teacher: Teacher;

  @ManyToMany(() => Student, (student) => student.classes)
  @JoinTable()
  students: Student[];

  @ManyToOne(() => ContentLevel)
  currentLevel: ContentLevel;

  @ManyToMany(() => ContentLevel)
  @JoinTable()
  completedLevels: ContentLevel[];
}
