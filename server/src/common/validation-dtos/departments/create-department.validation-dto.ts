import {
  IsInt,
  IsNotEmpty,
  IsString,
  Type,
} from 'src/common/decorators/decorators';

export class CreateDepartmentValidationDto {
  @IsInt()
  @Type(() => Number)
  facultyId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  shortName: string;
}
