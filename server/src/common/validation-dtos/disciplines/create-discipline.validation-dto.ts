import { IsNotEmpty, IsString } from 'src/common/decorators/decorators';

export class CreateDisciplineValidationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
