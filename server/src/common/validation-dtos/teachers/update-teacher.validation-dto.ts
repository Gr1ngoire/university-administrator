import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateTeacherValidatonDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('UA')
  phone: string;
}
