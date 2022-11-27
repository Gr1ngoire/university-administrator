import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDisciplineValidationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
