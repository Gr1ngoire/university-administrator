import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateTeacherValidationDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('UA')
  phone: string;
}
