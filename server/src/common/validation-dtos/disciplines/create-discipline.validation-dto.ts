import { IsString } from 'class-validator';

export class CreateDisciplineValidationDto {
  @IsString()
  name: string;
}
