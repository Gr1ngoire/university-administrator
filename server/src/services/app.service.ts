import { Injectable } from 'src/common/decorators/decorators';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
