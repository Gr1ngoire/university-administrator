import { Injectable } from './common/decorators/decorators';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
