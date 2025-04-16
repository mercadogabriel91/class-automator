import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
// Entities
import { Class } from '../../class/entities/class.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Class, (klass) => klass.students)
  classes: Class[];
}
