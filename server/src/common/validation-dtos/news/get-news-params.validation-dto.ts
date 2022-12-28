import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'src/common/decorators/decorators';

export class GetNewsParams {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}
