import {
  IsEmail,
  IsString,
  IsEnum,
  Matches,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../schema/auth.schema';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{6,})$/, {
    message:
      'Password must be at least 6 characters long with a capital letter and one special character',
  })
  password: string;

  @IsEnum(UserRole, { message: 'Invalid role' })
  @IsOptional()
  role: UserRole;
}

export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{6,})$/, {
    message:
      'Password must be at least 6 characters long with a capital letter and one special character',
  })
  password: string;
}
