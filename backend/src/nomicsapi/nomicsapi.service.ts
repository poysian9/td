import { HttpService } from '@nestjs/axios';
import { Dependencies, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { response } from 'express';
import { map } from 'rxjs';

const today = new Date().toISOString();
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const sevendays = new Date();
sevendays.setDate(sevendays.getDate() - 7);
const thirty = new Date();
thirty.setDate(thirty.getDate() - 30);
const yearly = new Date();
yearly.setDate(yearly.getDate() - 365);

const threeyears = new Date();
threeyears.setDate(threeyears.getDate() - 365 * 3);

@Injectable()
export class NomicsapiService {
  private NOMICS_API_KEY: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.NOMICS_API_KEY = this.configService.get<string>('NOMICS_API_KEY');
  }

  getmaxHistory({ coinid }) {
    return this.httpService
      .get(
        `https://api.nomics.com/v1/markets/candles?key=${this.NOMICS_API_KEY}&base=${coinid}&quote=USD&interval=1d&start=&end=${today}`,
      )
      .pipe(map((response) => response.data));
  }
  get1yHistory({ coinid }) {
    return this.httpService
      .get(
        `https://api.nomics.com/v1/markets/candles?key=${
          this.NOMICS_API_KEY
        }&base=${coinid}&quote=USD&interval=1d&start=${yearly.toISOString()}&end=${today}`,
      )
      .pipe(map((response) => response.data));
  }

  get3yHistory({ coinid }) {
    const threeyears2 = new Date();
    threeyears2.setDate(threeyears2.getDate() - 365 * 3 + 2);

    return this.httpService
      .get(
        `https://api.nomics.com/v1/markets/candles?key=${
          this.NOMICS_API_KEY
        }&base=${coinid}&quote=USD&interval=1d&start=${threeyears.toISOString()}&end=${today}`,
      )
      .pipe(
        map((response) =>
          response.data[0].timestamp < threeyears2.toISOString()
            ? ((response.data[response.data.length - 1].close -
                response.data[0].close) /
                response.data[0].close) *
              100
            : 'undefined',
        ),
      );
  }

  get30dHistory({ coinid }) {
    return this.httpService
      .get(
        `https://api.nomics.com/v1/markets/candles?key=${
          this.NOMICS_API_KEY
        }&base=${coinid}&quote=USD&interval=1h&start=${thirty.toISOString()}&end=${today}`,
      )
      .pipe(map((response) => response.data));
  }

  get7dHistory({ coinid }) {
    return this.httpService
      .get(
        `https://api.nomics.com/v1/markets/candles?key=${
          this.NOMICS_API_KEY
        }&base=${coinid}&quote=USD&interval=1h&start=${sevendays.toISOString()}&end=${today}`,
      )
      .pipe(map((response) => response.data));
  }
  get24hHistory({ coinid }) {
    return this.httpService
      .get(
        `https://api.nomics.com/v1/markets/candles?key=${
          this.NOMICS_API_KEY
        }&base=${coinid}&quote=USD&interval=5m&start=${yesterday.toISOString()}&end=${today}`,
      )
      .pipe(map((response) => response.data));
  }
  getWebsites(coinid: string) {
    return this.httpService
      .get(
        `https://api.nomics.com/v1/currencies?key=${this.NOMICS_API_KEY}&ids=${coinid}&attributes=id,name,block_explorer_url,twitter_url,medium_url,website_url,telegram_url,whitepaper_url`,
      )
      .pipe(map((response) => response.data));
  }
  getGlobal() {
    return this.httpService
      .get(`https://api.nomics.com/v1/global-ticker?key=${this.NOMICS_API_KEY}`)
      .pipe(map((response) => response.data));
  }
}
