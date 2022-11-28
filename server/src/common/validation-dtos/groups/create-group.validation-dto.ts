import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'src/common/decorators/decorators';

export class CreateGroupValidationDto {
  @IsNumber()
  departmentId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  course: number;
}
