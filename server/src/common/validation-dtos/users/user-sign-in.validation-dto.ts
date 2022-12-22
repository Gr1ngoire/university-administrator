import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'src/common/decorators/decorators';

const PASSWORD_VALIDATION =
  /^(?=.*[!&#%])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;
export class UserSignInValidationDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_VALIDATION)
  password: string;
}
