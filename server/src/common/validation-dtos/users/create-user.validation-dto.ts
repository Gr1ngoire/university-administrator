import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'src/common/decorators/decorators';
import { UniversityUserRoles } from 'src/common/enums/enums';

const PASSWORD_VALIDATION =
  /^(?=.*[!&#%])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;
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
  @Matches(PASSWORD_VALIDATION)
  password: string;
}
