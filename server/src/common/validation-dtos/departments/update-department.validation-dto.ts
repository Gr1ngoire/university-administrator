import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'src/common/decorators/decorators';

export class UpdateDepartmentValidationDto {
  @IsNumber()
  @IsOptional()
  facultyId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  shortName: string;
}
