import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'src/common/decorators/decorators';
import { UniversityUserRoles } from 'src/common/enums/enums';

export class CreateUserValidationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  secondName: string;

  @IsPhoneNumber('UA')
  phone: string;

  @IsEnum(UniversityUserRoles)
  role: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
