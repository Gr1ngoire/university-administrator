import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Type,
} from 'src/common/decorators/decorators';

export class UpdateScheduleValidationDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  teacherId: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  disciplineId: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  groupId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  time: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  classroom: string;
}
