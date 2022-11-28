import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'src/common/decorators/decorators';

export class UpdateScheduleValidationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  teacherId: number;

  @IsNumber()
  @IsOptional()
  disciplineId: number;

  @IsNumber()
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
