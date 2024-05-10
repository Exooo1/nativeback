import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

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
  @ArrayNotEmpty()
  @IsString({ each: true })
  examples: string[];
  userId?: number;
}
