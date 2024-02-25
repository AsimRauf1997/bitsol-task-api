import {
  IsEmail,
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDTO } from './create-user.dto';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  phoneNo: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  adresses: AddressDTO[];
}
