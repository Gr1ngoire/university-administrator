import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
