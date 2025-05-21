import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Base class response DTO
export class ClassResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the Class',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiPropertyOptional({
    description: 'The name of the class',
    example: 'Class Boron',
  })
  name?: string;

  @ApiProperty({
    description: 'Whether the class is automated or not',
    example: true,
  })
  automated: boolean;
}
