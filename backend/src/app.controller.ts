import { Controller, Get, HttpException, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health_check')
  health_check() {
    return this.appService.health_check();
  }

  @Post('create_lead')
  async createLead() {
    try {
      return {
        id: (
          await this.appService.sendPostReq('/api/v4/leads', {
            'Content-Type': 'application/json',
          })
        )['_embedded']['leads'][0].id,
      };
    } catch (e) {
      console.log(e);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @Post('create_contact')
  async createContact() {
    try {
      return {
        id: (
          await this.appService.sendPostReq('/api/v4/contacts', {
            'Content-Type': 'application/json',
          })
        )['_embedded']['contacts'][0].id,
      };
    } catch (e) {
      console.log(e);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @Post('create_company')
  async createCompany() {
    try {
      return {
        id: (
          await this.appService.sendPostReq('/api/v4/companies', {
            'Content-Type': 'application/json',
          })
        )['_embedded']['companies'][0].id,
      };
    } catch (e) {
      console.log(e);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
