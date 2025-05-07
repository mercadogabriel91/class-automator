import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class PhonicsDto {
  @IsNumber()
  unit: number;

  @IsOptional()
  @IsString()
  letter?: string;

  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  pictures: string[];
}

class ReadingDto {
  @IsString()
  level: string;

  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  titles: string[];

  @IsOptional()
  @IsString()
  image?: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];
}

export class CreateContentLevelDto {
  @IsArray()
  @IsString({ each: true })
  songs: string[];

  @ValidateNested()
  @Type(() => PhonicsDto)
  phonics?: PhonicsDto;

  @ValidateNested()
  @Type(() => ReadingDto)
  reading?: ReadingDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  conversations?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  writing?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vocabulary?: string[];
}
