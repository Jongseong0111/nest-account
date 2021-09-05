import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserType } from '../users.entitiy';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  user_name: string;

  @IsNotEmpty()
  @IsString()
  user_email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/)
  user_account: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]*$/)
  user_password: string;

  @IsNotEmpty()
  @IsString()
  user_type: UserType;
}
