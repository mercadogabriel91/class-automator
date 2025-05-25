import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// First, let's create interfaces for the nested objects
export interface PhonicsData {
  unit: number;
  letter: string;
  title: string;
  pictures: string[];
}

export interface ReadingData {
  level: string;
  title: string;
  titles: string[];
  image?: string;
  images: string[];
}

@Entity()
export class ContentLevel {
  @ApiProperty({
    description: 'Unique identifier for the content level',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Lesson number for this content level',
    example: 5,
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  lessonNumber: number;

  @ApiProperty({
    description: 'Array of song titles or identifiers',
    example: [
      'Twinkle Twinkle Little Star',
      'ABC Song',
      'Head Shoulders Knees and Toes',
    ],
    type: [String],
  })
  @Column('simple-array')
  songs: string[];

  @ApiProperty({
    description:
      'Phonics learning content with unit information, letter focus, title and related pictures',
    example: {
      unit: 1,
      letter: 'A',
      title: 'Learning the Letter A',
      pictures: ['apple.jpg', 'ant.jpg', 'airplane.jpg'],
    },
    required: false,
    nullable: true,
  })
  @Column('jsonb', { nullable: true })
  phonics: PhonicsData;

  @ApiProperty({
    description: 'Reading content with level, titles, and associated images',
    example: {
      level: 'Beginner',
      title: 'My First Reading Book',
      titles: [
        'Chapter 1: The Cat',
        'Chapter 2: The Dog',
        'Chapter 3: Friends',
      ],
      image: 'cover.jpg',
      images: ['page1.jpg', 'page2.jpg', 'page3.jpg'],
    },
    required: false,
    nullable: true,
  })
  @Column('jsonb', { nullable: true })
  reading: ReadingData;

  @ApiProperty({
    description: 'Array of conversation topics or dialogue examples',
    example: [
      'Greeting a friend',
      'Ordering food at a restaurant',
      'Asking for directions',
    ],
    type: [String],
    required: false,
    nullable: true,
  })
  @Column('simple-array', { nullable: true })
  conversations: string[];

  @ApiProperty({
    description: 'Array of writing exercises or prompts',
    example: [
      'Write about your family',
      'Describe your favorite animal',
      'Create a short story',
    ],
    type: [String],
    required: false,
    nullable: true,
  })
  @Column('simple-array', { nullable: true })
  writing: string[];

  @ApiProperty({
    description: 'Array of vocabulary words to learn',
    example: ['apple', 'banana', 'cat', 'dog', 'elephant', 'friend'],
    type: [String],
    required: false,
    nullable: true,
  })
  @Column('simple-array', { nullable: true })
  vocabulary: string[];
}
