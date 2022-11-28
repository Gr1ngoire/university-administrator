import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'src/common/decorators/decorators';

export class CreateDepartmentValidationDto {
  @IsNumber()
  facultyId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  shortName: string;
}
