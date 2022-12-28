import { Injectable } from 'src/common/decorators/decorators';

@Injectable()
export class AppService {
  checkHealthy(): string {
    return 'Healthy';
  }
}
