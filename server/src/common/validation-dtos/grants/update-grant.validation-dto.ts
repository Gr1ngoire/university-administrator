import { Grants } from 'src/common/enums/enums';
import { IsEnum, IsInt, Type } from 'src/common/decorators/decorators';

export class UpdateGrantValidationDto {
  @IsEnum(Grants)
  grant: Grants;

  @IsInt()
  @Type(() => Number)
  granterId: number;
}
