import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom, map, Observable } from 'rxjs';
import { CoingeckoCryptoDataDto } from './dto/coingeckoapi.dto';
import { coingecko, coingeckoDocument } from './schema/coingeckoapi.schema';

const exchanges = ['binance', 'kucoin', 'gdax', 'kraken', 'uniswap_v2', 'uniswap_v3'];

@Injectable()
export class CoingeckoapiService {
  private CG_API_KEY: string;

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,

    @InjectModel(coingecko.name)
    private coingeckoModel: Model<coingeckoDocument>,
  ) {
    this.CG_API_KEY = this.configService.get<string>('CG_API_KEY');
  }

  formatNomics(rows: CoingeckoCryptoDataDto[]): coingecko[] {
    const allCG: coingecko[] = [];
    rows.map((exchange) => {
      exchange.tickers.map((ticker) => {
        const formatted: coingecko = {
          exchange: exchange.name,
          base: ticker.base,
          target: ticker.target,
          volume: ticker.volume,
          cost_to_move_up_usd: ticker.cost_to_move_up_usd,
          cost_to_move_down_usd: ticker.cost_to_move_down_usd,
          coin_id: ticker.coin_id,
          target_coin_id: ticker.target_coin_id,
          spread: ticker.bid_ask_spread_percentage,
        };

        allCG.push(formatted);
      });
    });

    return allCG;
  }

  async getdepthData({ coinid }) {
    let data = [];

    for (let i = 0; i < exchanges.length; i++) {
      data.push(
        await lastValueFrom(
          this.httpService
            .get(
              `https://pro-api.coingecko.com/api/v3/exchanges/${exchanges[i]}/tickers?coin_ids=${coinid}&depth=true&x_cg_pro_api_key=${this.CG_API_KEY}`,
            )
            .pipe(map((response) => response.data)),
        ),
      );
    }
    return this.filterdata(data);
  }

  filterdata(data: CoingeckoCryptoDataDto[]) {
    const filtered = data.map((exchange) => {
      const filteredticker = exchange.tickers.filter(
        (ticker) => ticker.volume > 100,
      );

      exchange.tickers = filteredticker;
      return exchange;
    });
    return filtered;
  }

  async getcoingeckomarketdepth({ coinid }) {
    const rows: CoingeckoCryptoDataDto[] = this.filterdata(
      await this.getdepthData({ coinid }),
    );

    const formatted: coingecko[] = this.formatNomics(rows);
      
    return formatted;
  }

  // async create(docs: coingecko[]) {
  //   return await this.coingeckoModel.insertMany(docs);
  // }

  async upsert(docs: coingecko[]) {
    return await this.coingeckoModel.bulkWrite(
      docs.map((doc) => ({
        updateOne: {
          filter: {
            id: doc.coin_id,
          },
          update: doc,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      })) as any,
    );
  }

  async readAll() {
    return await this.coingeckoModel.find().lean().exec();
  }
}
