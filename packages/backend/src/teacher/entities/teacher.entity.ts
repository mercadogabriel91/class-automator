import { Optional } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// Entities
import { Class } from '../../class/entities/class.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  @Optional()
  email?: string;

  @Column({ nullable: true })
  @Optional()
  phone?: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Class, (klass) => klass.teacher)
  classes: Class[];
}
