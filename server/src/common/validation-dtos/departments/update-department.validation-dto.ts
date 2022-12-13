import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Type,
} from 'src/common/decorators/decorators';

export class UpdateDepartmentValidationDto {
  @IsInt()
  @Type(() => Number)
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
