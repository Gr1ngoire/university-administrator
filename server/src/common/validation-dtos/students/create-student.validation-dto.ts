import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  IsNumber,
} from 'src/common/decorators/decorators';

export class CreateStudentValidationDto {
  @IsNumber()
  groupId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('UA')
  phone: string;
}
