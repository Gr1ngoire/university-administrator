import { IsNotEmpty, IsString } from 'src/common/decorators/decorators';

export class CreateFacultyValidationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  shortName: string;
}
