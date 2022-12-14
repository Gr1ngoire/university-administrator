import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
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
  @IsOptional()
  course: number;
}
