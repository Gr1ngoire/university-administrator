import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'src/common/decorators/decorators';

export class CreateScheduleValidationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  teacherId: number;

  @IsNumber()
  disciplineId: number;

  @IsNumber()
  groupId: number;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  classroom: string;
}
