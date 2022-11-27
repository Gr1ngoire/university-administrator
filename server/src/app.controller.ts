import { AppService } from './app.service';
import { Controller, Get } from './common/decorators/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
