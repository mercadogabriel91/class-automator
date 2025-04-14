import { Optional } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Optional()
  email?: string;

  @Column()
  @Optional()
  phone?: string;

  @Column({ default: true })
  isActive: boolean;
}
