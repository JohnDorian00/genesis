import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Observable} from "rxjs";
import {AxiosResponse} from "axios/index";

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health_check')
  health_check()  {
    return this.appService.health_check();
  }

  @Get('test')
  test() {
    return this.appService.getAccessToken()
  }
}
