import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  surname: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  email: string;
}

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  email: string;
}
