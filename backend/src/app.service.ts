import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import {config, firstValueFrom, Observable} from "rxjs";
import {AxiosResponse} from "axios";
import {GlobalService} from "./utils/global.service";

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {
    if (!GlobalService.accessToken) {
      this.getAccessToken().then((token)=> {
        GlobalService.accessToken = token.access_token;
        console.log('Access token is:\n' + GlobalService.accessToken)
      })
    }
  }

  health_check()  {
    return {status: 'server is up'};
  }

  async getAccessToken() {
    const headersRequest = {
      'Content-Type': 'application/json',
      'X-Client-Id': 30878566
    }

    return (await firstValueFrom(this.httpService.get('https://test.gnzs.ru/oauth/get-token.php', {headers: headersRequest}))).data;
  }
}
