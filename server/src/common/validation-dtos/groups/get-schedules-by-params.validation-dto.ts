import { IsInt, IsOptional, Type } from 'src/common/decorators/decorators';

export class GetSchedulesByParams {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  groupId: number;
}
