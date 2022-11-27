import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDisciplineValidationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
