import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  Type,
} from 'src/common/decorators/decorators';

export class UpdateGroupValidationDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  departmentId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsInt()
  @Type(() => Number)
  @Max(6)
  @Min(1)
  @IsOptional()
  course: number;
}
