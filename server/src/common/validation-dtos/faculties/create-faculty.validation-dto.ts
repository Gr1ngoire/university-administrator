import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFacultyValidationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  shortName: string;
}
