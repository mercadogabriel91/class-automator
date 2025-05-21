import { ApiProperty } from '@nestjs/swagger';

// Teacher DTO for Class response
export class TeacherDto {
  @ApiProperty({
    description: 'The unique identifier of the Teacher',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the Teacher',
    example: 'Jane Smith',
  })
  name: string;

  // Add only necessary Teacher properties
  @ApiProperty({
    description: 'The email of the Teacher',
    example: 'jane.smith@example.com',
  })
  email: string;
}

// Student DTO for Class response
export class StudentDto {
  @ApiProperty({
    description: 'The unique identifier of the Student',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the Student',
    example: 'Michael Johnson',
  })
  name: string;
}

// ContentLevel DTO for Class response
export class ContentLevelDto {
  @ApiProperty({
    description: 'The unique identifier of the ContentLevel',
    example: '123e4567-e89b-12d3-a456-426614174003',
  })
  id: string;

  @ApiProperty({
    description: 'The level number',
    example: 1,
  })
  lessonNumber: number;
}

export class FindClassInformationResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the Class',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the class',
    example: 'Afternoon class',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Whether the class is automated or not',
    example: true,
  })
  automated: boolean;

  @ApiProperty({
    description: 'The Teacher assigned to the class',
    type: () => TeacherDto,
  })
  teacher: TeacherDto;

  @ApiProperty({
    description: 'The students enrolled in the class',
    type: [StudentDto],
  })
  students: StudentDto[];

  @ApiProperty({
    description: 'The current content level',
    type: ContentLevelDto,
  })
  currentLevel: ContentLevelDto;

  @ApiProperty({
    description: 'The completed content levels by this class',
    type: [ContentLevelDto],
  })
  completedLevels: ContentLevelDto[];
}
