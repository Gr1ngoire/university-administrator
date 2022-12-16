import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Type,
} from 'src/common/decorators/decorators';

const SCHEDULE_RECORD_TIME_VALIDATION =
  /^([1-9]|1[0-2])\.([1-9]|1[0-9]|2[0-9]|3[0-1])\.([1-9][0-9]*) ([1-9]|1[0-9]|2[0-4]):([1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/;
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
  @Matches(SCHEDULE_RECORD_TIME_VALIDATION, {
    message: 'Time field format should be DD.MM.YYYY HH:MM',
  })
  time: string;

  @IsString()
  @IsNotEmpty()
  classroom: string;
}
