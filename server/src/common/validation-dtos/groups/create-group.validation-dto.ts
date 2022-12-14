import {
  IsNotEmpty,
  IsInt,
  IsString,
  Type,
  Max,
  Min,
} from 'src/common/decorators/decorators';

export class CreateGroupValidationDto {
  @IsInt()
  @Type(() => Number)
  departmentId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Type(() => Number)
  @Max(6)
  @Min(1)
  course: number;
}
