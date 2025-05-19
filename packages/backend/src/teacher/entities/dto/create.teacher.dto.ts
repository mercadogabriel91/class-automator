import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsBoolean,
} from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    description: "Teacher's first name",
    example: 'John',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: "Teacher's email",
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: "Teacher's phone number",
    example: '+1234567890',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Teacher active status',
    default: true,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
