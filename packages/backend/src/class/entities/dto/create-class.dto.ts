import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClassDto {
  @ApiPropertyOptional({
    description: 'The name of the class',
    example: 'Morning A level',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    description: 'Whether the class is automated or not',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  automated?: boolean;

  @ApiProperty({
    description: 'The ID of the teacher assigned to the class',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  teacherId: string;

  @ApiPropertyOptional({
    description: 'The IDs of students to be enrolled in the class',
    example: [
      '123e4567-e89b-12d3-a456-426614174002',
      '123e4567-e89b-12d3-a456-426614174003',
    ],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  studentIds?: string[];

  @ApiProperty({
    description: 'The ID of the current content level',
    example: '123e4567-e89b-12d3-a456-426614174004',
  })
  @IsUUID()
  currentLevelId: string;

  @ApiPropertyOptional({
    description: 'The IDs of completed content levels',
    example: [
      '123e4567-e89b-12d3-a456-426614174005',
      '123e4567-e89b-12d3-a456-426614174006',
    ],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  completedLevelIds?: string[];
}