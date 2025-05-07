import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContentLevel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  lessonNumber: number;

  @Column('simple-array')
  songs: string[];

  @Column('jsonb', { nullable: true })
  phonics: {
    unit: number;
    letter?: string;
    title: string;
    pictures: string[];
  };

  @Column('jsonb', { nullable: true })
  reading: {
    level: string;
    title: string;
    titles: string[];
    image?: string;
    images: string[];
  };

  @Column('simple-array', { nullable: true })
  conversations: string[];

  @Column('simple-array', { nullable: true })
  writing: string[];

  @Column('simple-array', { nullable: true })
  vocabulary: string[];
}
