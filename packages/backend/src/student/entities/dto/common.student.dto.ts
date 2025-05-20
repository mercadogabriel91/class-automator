import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { Class } from '../../../class/entities/class.entity';

export class DeleteStudentResponseDto {
  @ApiProperty({
    description: 'Indicates if the delete operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example:
      'Student with ID "123e4567-e89b-12d3-a456-426614174000" has been successfully deleted',
  })
  message: string;

  @ApiProperty({
    description: 'ID of the deleted student',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}

export class FindOneStudentResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the student',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the student',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Whether the student is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'The classes the student is enrolled in',
    type: [Class],
  })
  classes: Class[];
}

export class FindOneStudentQueryDto {
  @ApiProperty({
    description: 'The unique identifier of the student',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4')
  @IsNotEmpty()
  id: string;
}
