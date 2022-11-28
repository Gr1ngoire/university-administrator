import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'src/common/decorators/decorators';

export class UpdateFacultyValidationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  shortName: string;
}
