import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'src/common/decorators/decorators';
import { UniversityUserRoles } from 'src/common/enums/enums';

export class UpdateUserValidationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  surname: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  secondName: string;

  @IsPhoneNumber('UA')
  @IsOptional()
  phone: string;

  @IsEnum(UniversityUserRoles)
  @IsOptional()
  role: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;
}
