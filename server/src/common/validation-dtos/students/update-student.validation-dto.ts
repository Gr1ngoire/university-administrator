import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Type,
} from 'src/common/decorators/decorators';

export class UpdateStudentValidatonDto {
  @IsInt()
  @Type(() => Number)
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
