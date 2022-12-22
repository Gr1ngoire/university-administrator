import { IsInt, IsOptional, Type } from 'src/common/decorators/decorators';

export class UpdateTeacherValidationDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  departmentId: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  userId: number;
}
