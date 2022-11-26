import { IsString } from 'class-validator';

export class UpdateDisciplineValidationDto {
  @IsString()
  name: string;
}
