import { Grants } from 'src/common/enums/enums';
import { IsEnum, IsInt, Type } from 'src/common/decorators/decorators';

export class CreateGrantValidationDto {
  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsEnum(Grants)
  grant: Grants;

  @IsInt()
  @Type(() => Number)
  granterId: number;
}
