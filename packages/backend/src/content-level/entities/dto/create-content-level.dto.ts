import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class PhonicsDto {
  @ApiProperty({
    description: 'Phonics unit number',
    example: 1,
  })
  @IsNumber()
  unit: number;

  @ApiPropertyOptional({
    description: 'Focus letter for this phonics lesson',
    example: 'A',
  })
  @IsString()
  letter: string;

  @ApiProperty({
    description: 'Title of the phonics lesson',
    example: 'Learning the Letter A',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Array of picture filenames or URLs for the phonics lesson',
    example: ['apple.jpg', 'ant.jpg', 'airplane.jpg'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  pictures: string[];
}

class ReadingDto {
  @ApiProperty({
    description: 'Reading difficulty level',
    example: 'Beginner',
  })
  @IsString()
  level: string;

  @ApiProperty({
    description: 'Main title of the reading content',
    example: 'My First Reading Book',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Array of chapter or section titles',
    example: ['Chapter 1: The Cat', 'Chapter 2: The Dog', 'Chapter 3: Friends'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  titles: string[];

  @ApiPropertyOptional({
    description: 'Main cover image filename or URL',
    example: 'cover.jpg',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: 'Array of page or content image filenames or URLs',
    example: ['page1.jpg', 'page2.jpg', 'page3.jpg'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];
}

export class CreateContentLevelDto {
  @ApiPropertyOptional({
    description: 'Lesson number for this content level',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  lessonNumber?: number;

  @ApiProperty({
    description: 'Array of song titles or identifiers',
    example: [
      'Twinkle Twinkle Little Star',
      'ABC Song',
      'Head Shoulders Knees and Toes',
    ],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  songs: string[];

  @ApiPropertyOptional({
    description:
      'Phonics learning content with unit information, letter focus, title and related pictures',
    type: PhonicsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PhonicsDto)
  phonics?: PhonicsDto;

  @ApiPropertyOptional({
    description: 'Reading content with level, titles, and associated images',
    type: ReadingDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ReadingDto)
  reading?: ReadingDto;

  @ApiPropertyOptional({
    description: 'Array of conversation topics or dialogue examples',
    example: [
      'Greeting a friend',
      'Ordering food at a restaurant',
      'Asking for directions',
    ],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  conversations?: string[];

  @ApiPropertyOptional({
    description: 'Array of writing exercises or prompts',
    example: [
      'Write about your family',
      'Describe your favorite animal',
      'Create a short story',
    ],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  writing?: string[];

  @ApiPropertyOptional({
    description: 'Array of vocabulary words to learn',
    example: ['apple', 'banana', 'cat', 'dog', 'elephant', 'friend'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vocabulary?: string[];
}
