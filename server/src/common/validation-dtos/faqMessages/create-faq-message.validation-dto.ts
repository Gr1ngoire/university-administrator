import {
  IsInt,
  IsNotEmpty,
  IsString,
  Type,
} from 'src/common/decorators/decorators';

export class CreateFaqMessageValidationDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsInt()
  @Type(() => Number)
  authorId: number;
}
