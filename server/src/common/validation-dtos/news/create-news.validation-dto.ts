import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'src/common/decorators/decorators';

export class CreateNewsValidationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  imgUrl: string;
}
