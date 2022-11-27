import { IsNotEmpty, IsString } from 'src/common/decorators/decorators';

export class UpdateDisciplineValidationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
