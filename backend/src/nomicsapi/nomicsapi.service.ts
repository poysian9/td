import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, map, tap } from 'rxjs';
import { GlobalDataDto } from './dto/globalData.dto';
import { 
  GlobalData,
  GlobalDataDocument, 
} from './schema/globalData.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NomicsapiService {
  private CG_API_KEY: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,

    @InjectModel(GlobalData.name)
    private globalModel: Model<GlobalDataDocument>,
  ) {
    this.CG_API_KEY = this.configService.get<string>('CG_API_KEY');
  }

  getmaxHistory({ coinid }) {
    return this.httpService
      .get(
        `https://pro-api.coingecko.com/api/v3/coins/${coinid}/market_chart?x_cg_pro_api_key=${this.CG_API_KEY}&vs_currency=usd&days=max&interval=daily`,
      )
      .pipe(map((response) => response.data));
  }

  get1yHistory({ coinid }) {
    return this.httpService
      .get(
        `https://pro-api.coingecko.com/api/v3/coins/${coinid}/market_chart?x_cg_pro_api_key=${this.CG_API_KEY}&vs_currency=usd&days=365&interval=daily`,
      )
      .pipe(map((response) => response.data));
  }

  get1mHistory({ coinid }) {
    return this.httpService
      .get(
        `https://pro-api.coingecko.com/api/v3/coins/${coinid}/market_chart?x_cg_pro_api_key=${this.CG_API_KEY}&vs_currency=usd&days=30`,
      )
      .pipe(map((response) => response.data));
  }

  get7dHistory({ coinid }) {
    return this.httpService
      .get(
        `https://pro-api.coingecko.com/api/v3/coins/${coinid}/market_chart?x_cg_pro_api_key=${this.CG_API_KEY}&vs_currency=usd&days=7`,
      )
      .pipe(map((response) => response.data));
  }

  get1dHistory({ coinid }) {
    return this.httpService
      .get(
        `https://pro-api.coingecko.com/api/v3/coins/${coinid}/market_chart?x_cg_pro_api_key=${this.CG_API_KEY}&vs_currency=usd&days=1`,
      )
      .pipe(map((response) => response.data));
  }

  formatGlobal(rows: GlobalDataDto): GlobalData {
    const formatted = {
      total_market_cap: rows.data.total_market_cap.usd,
      market_cap_percentage: rows.data.market_cap_percentage.btc,
      market_cap_change_pct: rows.data.market_cap_change_percentage_24h_usd,
    };
    return formatted;
  }
  @Cron(CronExpression.EVERY_10_MINUTES)
  getGlobal(): Observable<GlobalData> {
    return this.httpService
      .get(`https://pro-api.coingecko.com/api/v3/global?x_cg_pro_api_key=${this.CG_API_KEY}`)
      .pipe(
        map((response) => this.formatGlobal(response.data)),
        tap((globalObject) => this.upsert(globalObject))
      );
  }

  async upsert(body: GlobalData) {
      return await this.globalModel.findOneAndUpdate(
        {},
        body,
        { upsert: true, new: true },
      );
  }  

  async readGlobal() {
    return await this.globalModel.findOne({}).lean().exec();
  }

}
