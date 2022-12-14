import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  IsInt,
  Type,
} from 'src/common/decorators/decorators';

export class CreateStudentValidationDto {
  @IsInt()
  @Type(() => Number)
  groupId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('UA')
  phone: string;
}
