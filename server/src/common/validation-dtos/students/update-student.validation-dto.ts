import { IsInt, IsOptional, Type } from 'src/common/decorators/decorators';

export class UpdateStudentValidatonDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  groupId: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  userId: number;
}
