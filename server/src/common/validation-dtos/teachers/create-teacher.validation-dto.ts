import { IsInt, Type } from 'src/common/decorators/decorators';

export class CreateTeacherValidationDto {
  @IsInt()
  @Type(() => Number)
  departmentId: number;

  @IsInt()
  @Type(() => Number)
  userId: number;
}
