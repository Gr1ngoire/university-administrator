import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'src/common/decorators/decorators';

export class UpdateTeacherValidationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  surname: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber('UA')
  @IsOptional()
  phone: string;
}
