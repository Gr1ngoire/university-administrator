import {
  IsInt,
  IsNotEmpty,
  IsString,
  Type,
} from 'src/common/decorators/decorators';

export class CreateScheduleValidationDto {
  @IsInt()
  @Type(() => Number)
  teacherId: number;

  @IsInt()
  @Type(() => Number)
  disciplineId: number;

  @IsInt()
  @Type(() => Number)
  groupId: number;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  classroom: string;
}
