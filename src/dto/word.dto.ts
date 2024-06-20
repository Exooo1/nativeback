import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class AddWordDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  word: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  translate: string;
  @IsOptional()
  @IsArray()
  @Type(() => String)
  @IsString({ each: true })
  examples?: string[];
  userId?: string;
}

export class EditWordDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  word: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  translate: string;
  @IsOptional()
  @IsArray()
  @Type(() => String)
  @IsString({ each: true })
  examples?: string[];
  @IsNumber()
  @IsNotEmpty()
  id: number;
  userId?: string;
  @IsOptional()
  createdAt?: Date;
  @IsOptional()
  updatedAt?: Date;
}

export class GetWordsDTO {
  @IsString()
  limit: number;
  @IsString()
  offset: number;
}
