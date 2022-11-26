import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateTeacherValidatonDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber('UA')
  @IsOptional()
  phone: string;
}
