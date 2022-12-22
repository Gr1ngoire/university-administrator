import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'src/common/decorators/decorators';

const PASSWORD_VALIDATION =
  /^(?=.*[!&#%])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;
export class UserSignUpValidationDto {
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

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_VALIDATION)
  password: string;
}
