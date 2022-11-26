import { IsString } from 'class-validator';

export class UpdateDisciplineDto {
  @IsString()
  name: string;
}
