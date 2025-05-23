import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
// Entities
import { Class } from '../../class/entities/class.entity';

@Entity()
export class Student {
  @ApiProperty({
    description: 'Unique identifier for the student',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Full name of the student',
    example: 'John Doe',
    minLength: 1,
    maxLength: 255,
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Indicates if the student is currently active',
    example: true,
    default: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Classes that the student is enrolled in',
    type: () => Class,
    isArray: true,
    example: [],
  })
  @ManyToMany(() => Class, (klass) => klass.students)
  classes: Class[];
}
