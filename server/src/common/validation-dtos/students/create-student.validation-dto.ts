import { IsInt, Type } from 'src/common/decorators/decorators';

export class CreateStudentValidationDto {
  @IsInt()
  @Type(() => Number)
  groupId: number;

  @IsInt()
  @Type(() => Number)
  userId: number;
}
