import {
  IsNotEmpty,
  IsInt,
  IsString,
  Type,
} from 'src/common/decorators/decorators';

export class CreateGroupValidationDto {
  @IsInt()
  @Type(() => Number)
  departmentId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  course: number;
}
