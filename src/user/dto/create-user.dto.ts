import {
  IsEmail,
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddressDTO {
  @IsString()
  addressLine1: string;

  @IsString()
  addressLine2: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;
}

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  role: string;

  @IsString()
  phoneNo: string;

  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  addresses: AddressDTO[];
}
