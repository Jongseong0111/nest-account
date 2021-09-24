import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @IsNotEmpty()
  @IsString()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/)
  userAccount: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]*$/)
  userPassword: string;

  @IsNotEmpty()
  @IsString()
  userType: string;
}
