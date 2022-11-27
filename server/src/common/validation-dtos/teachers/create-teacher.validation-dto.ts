import { IsString, IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CreateTeacherValidationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('UA')
  phone: string;
}
