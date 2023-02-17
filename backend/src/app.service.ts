import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GlobalService } from './utils/global.service';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  health_check() {
    return { status: 'server is up' };
  }

  updateToken() {
    return new Promise<void>((resolve, reject) => {
      const headersRequest = {
          'Content-Type': 'application/json',
          'X-Client-Id': '30878566',
        },
        url = 'https://test.gnzs.ru/oauth/get-token.php';

      console.log(url);

      firstValueFrom(this.httpService.get(url, { headers: headersRequest }))
        .then((res) => {
          if (
            res.status === 200 &&
            res.data.access_token &&
            res.data.base_domain
          ) {
            GlobalService.accessToken = res.data.access_token;
            GlobalService.baseDomain = 'https://' + res.data.base_domain;
            console.log(
              `Access token is:\n${GlobalService.accessToken}\n\nBase domain is:\n${GlobalService.baseDomain}\n`,
            );
            resolve();
          } else {
            throw {
              response: { status: res.status, statusText: res.statusText },
            };
          }
        })
        .catch((req) => {
          reject({
            status: req.response.status,
            title: req.response.statusText,
          });
        });
    });
  }

  async sendPostReq(url, headers) {
    if (!GlobalService.accessToken || !GlobalService.baseDomain) {
      try {
        await this.updateToken();
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return new Promise(async (resolve, reject) => {
      const headersRequest = {
        ...headers,
        Authorization: `Bearer ${GlobalService.accessToken}`,
      };
      console.log(GlobalService.baseDomain + url);
      await firstValueFrom(
        this.httpService.post(GlobalService.baseDomain + url, [{}], {
          headers: headersRequest,
        }),
      )
        .then((req) => {
          resolve(req.data);
        })
        .catch((req) => {
          req.response.data['validation-errors']
            ? console.error(req.response.data['validation-errors'][0].errors)
            : null;
          reject({
            status: req.response.data.status,
            title: req.response.data.title + '; ' + req.response.data.detail,
          });
        });
    });
  }
}
