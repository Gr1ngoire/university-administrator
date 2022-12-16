import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'src/common/decorators/decorators';

export class UpdateNewsValidationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  imgUrl: string;
}
