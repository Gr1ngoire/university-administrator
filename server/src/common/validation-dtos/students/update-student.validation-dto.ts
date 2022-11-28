import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'src/common/decorators/decorators';

export class UpdateStudentValidatonDto {
  @IsNumber()
  @IsOptional()
  groupId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber('UA')
  @IsOptional()
  phone: string;
}
