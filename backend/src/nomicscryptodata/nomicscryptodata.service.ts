import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { lastValueFrom, map, Observable } from 'rxjs';
import { CSV, CSVDocument } from 'src/csv/schema/csv.schema';
import { NomicsCryptoDataDto } from './dto/nomics.dto';
import {
  NomicsCryptoData,
  NomicsCryptoDataDocument,
} from './schema/nomicscryptodata.schema';

@Injectable()
export class NomicsCryptoDataService {
  private CG_API_KEY: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,

    @InjectModel(CSV.name)
    private cryptoModel: Model<CSVDocument>,

    @InjectModel(NomicsCryptoData.name)
    private nomicsModel: Model<NomicsCryptoDataDocument>,
  ) {
    this.CG_API_KEY = this.configService.get<string>('CG_API_KEY');
  }

  formatCoingecko(rows: NomicsCryptoDataDto[]): NomicsCryptoData[] {
    return rows.map((x) => {
      const formatted = {
        id: x.id,
        symbol: x.symbol,
        name: x.name,
        logo_url: x.image,
        price: x.current_price,
        volume_24h: x.total_volume,
        market_cap: x.market_cap,
        rank: x.market_cap_rank,
        max_supply: x.max_supply,
        circulating_supply: x.circulating_supply,
        high: x.ath,
        high_timestamp: x.ath_date,
        high_change_percentage: x.ath_change_percentage,
        low: x.atl,
        low_timestamp: x.atl_date,
        low_change_percentage: x.atl_change_percentage,
        price_change_24h: x.price_change_24h,
        price_change_percentage_24h: x.price_change_percentage_24h,
        price_change_percentage_1h: x.price_change_percentage_1h_in_currency,
        price_change_percentage_7d: x.price_change_percentage_7d_in_currency,
        price_change_percentage_14d: x.price_change_percentage_14d_in_currency,
        price_change_percentage_30d: x.price_change_percentage_30d_in_currency,
        price_change_percentage_1y: x.price_change_percentage_1y_in_currency,
        market_cap_change_24h: x.market_cap_change_24h,
        market_cap_change_percentage_24h: x.market_cap_change_percentage_24h,
        price_date: x.last_updated,        
      };

      return formatted;
    });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async updatenomicsdata() {
    const allDocs = await this.cryptoModel.find({}, ['coingeckoid']).lean().exec();
    const allIds = allDocs.map((doc) => doc.coingeckoid);
    const perPage = 250; // Number of items per page
    const totalPages = Math.ceil(allIds.length / perPage);
    const formatted: NomicsCryptoData[] = [];
    let currentRank = 6969
  
    for (let page = 1; page <= totalPages; page++) {
      const rows: Observable<NomicsCryptoDataDto[]> = this.httpService
        .get(
          `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${allIds.join(',')}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C7d%2C14d%2C30d%2C1y&locale=en&x_cg_pro_api_key=${this.CG_API_KEY}`,
        )
        .pipe(map((response) => response.data));
  
      const pageData: NomicsCryptoDataDto[] = await lastValueFrom(rows) as NomicsCryptoDataDto[];
  
      // Check and replace null rank with 6969
      const formattedPage: NomicsCryptoData[] = this.formatCoingecko(pageData).map((item) => {
        if (item.rank === null) {
          item.rank = currentRank;
          currentRank++; // Increment the rank for the next item
        }
        return item;
      });
  
      formatted.push(...formattedPage);
    }
  
    await this.upsert(formatted);
  }

  async upsert(docs: NomicsCryptoData[]) {
    return await this.nomicsModel.bulkWrite(
      docs.map((doc) => ({
        updateOne: {
          filter: {
            id: doc.id,
          },
          update: doc,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      })) as any,
    );
  }

  async merge() {
    return await this.nomicsModel
      .aggregate([
        {
          $lookup: {
            from: 'database',
            localField: 'id',
            foreignField: 'coingeckoid',
            as: 'coindata',
          },
        },
      ])
      .exec();
  }

  async readCurrency(id: string) {
    return await this.nomicsModel.findOne({ id }).lean().exec();
  }

  async biggestDailyGainer() {
    return await this.nomicsModel
      .aggregate([
        {
          $lookup: {
            from: 'database',
            localField: 'id',
            foreignField: 'coingeckoid',
            as: 'coindata',
          },
        },
      ])
      .sort({ 'price_change_percentage_24h': 'desc' })
      .exec();
  }

  async biggestWeeklyGainer() {
    return await this.nomicsModel
      .aggregate([
        {
          $lookup: {
            from: 'database',
            localField: 'id',
            foreignField: 'coingeckoid',
            as: 'coindata',
          },
        },
      ])
      .sort({ 'price_change_percentage_7d': 'desc' })
      .exec();
  }

  async readAll() {
    return await this.nomicsModel.find().lean().exec();
  }
}
