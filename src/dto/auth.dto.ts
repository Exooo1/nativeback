import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { returnValidatorMessage, validatorTypes } from '../utils/validator';

export class SignUpDTO {
  @IsString({ message: returnValidatorMessage('name', validatorTypes.tString) })
  @IsNotEmpty({ message: returnValidatorMessage('name', validatorTypes.emptyField) })
  @MinLength(2)
  name: string;
  @IsString({ message: returnValidatorMessage('surname', validatorTypes.tString) })
  @IsNotEmpty({ message: returnValidatorMessage('surname', validatorTypes.emptyField) })
  @MinLength(2)
  surname: string;
  @IsString({ message: returnValidatorMessage('password', validatorTypes.tString) })
  @IsNotEmpty({ message: returnValidatorMessage('password', validatorTypes.emptyField) })
  @MinLength(5)
  password: string;
  @IsString({ message: returnValidatorMessage('email', validatorTypes.tString) })
  @IsNotEmpty({ message: returnValidatorMessage('email', validatorTypes.emptyField) })
  @MinLength(5)
  email: string;
}

export class LoginDTO {
  @IsString({ message: returnValidatorMessage('password', validatorTypes.tString) })
  @IsNotEmpty({ message: returnValidatorMessage('password', validatorTypes.emptyField) })
  @MinLength(5)
  password: string;
  @IsString({ message: returnValidatorMessage('email', validatorTypes.tString) })
  @IsNotEmpty({ message: returnValidatorMessage('email', validatorTypes.emptyField) })
  @MinLength(5)
  email: string;
}
