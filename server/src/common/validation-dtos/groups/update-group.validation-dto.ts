import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'src/common/decorators/decorators';

export class UpdateGroupValidationDto {
  @IsNumber()
  @IsOptional()
  departmentId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  course: number;
}
