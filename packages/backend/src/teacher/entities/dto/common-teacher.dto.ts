import { ApiProperty } from '@nestjs/swagger';

export class DeleteTeacherResponseDto {
  @ApiProperty({ example: 'Teacher deleted successfully' })
  message: string;
}
