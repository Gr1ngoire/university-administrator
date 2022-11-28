import { IsNumberString } from 'src/common/decorators/decorators';

export class GetByIdParams {
  @IsNumberString()
  id: number;
}
