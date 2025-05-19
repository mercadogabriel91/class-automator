import { Optional } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
// Entities
import { Class } from '../../class/entities/class.entity';

@Entity()
export class Teacher {
  @ApiProperty({ description: 'The unique identifier of the teacher UUID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: "Teacher's first name" })
  @Column()
  name: string;

  @ApiProperty({ description: "Teacher's email" })
  @Column({ nullable: true })
  @Optional()
  email?: string;

  @ApiProperty({ description: "Teacher's email" })
  @Column({ nullable: true })
  @Optional()
  phone?: string;

  @ApiProperty({ description: 'Teacher active status' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    type: () => [Class],
    description: 'Classes taught by this teacher',
  })
  @OneToMany(() => Class, (klass) => klass.teacher)
  classes: Class[];
}
