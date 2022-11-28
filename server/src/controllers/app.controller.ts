import { AppService } from 'src/services/services';
import { Controller, Get } from 'src/common/decorators/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
