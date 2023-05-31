import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessariDataDto } from './dto/messari.dto';
import { MessariSchema, MessariSchemaDocument } from './schema/messari.schema';
import axios from 'axios';

@Injectable()
export class MessariService {
  constructor(
    @InjectModel(MessariSchema.name)
    private MessariModel: Model<MessariSchemaDocument>,
  ) {}

  formatMessari(rows: MessariDataDto[]): MessariSchema[] {
    return rows.map((x) => {
      const formatted: MessariSchema = {
        symbol: x.symbol,
        name: x.name,
        tagline: x.profile.general.overview.tagline,
        category: x.profile.general.overview.category,
        sector: x.profile.general.overview.sector,
        project_details: x.profile.general.overview.project_details,
        regulatory_details: x.profile.general.regulation.regulatory_details,
        sfar_score: x.profile.general.regulation.sfar_score,
        sfar_summary: x.profile.general.regulation.sfar_summary,
        token_type: x.profile.economics.token.token_type,
        token_usage: x.profile.economics.token.token_usage,
        token_usage_details: x.profile.economics.token.token_usage_details,
        general_emission_type:
          x.profile.economics.consensus_and_emission.supply
            .general_emission_type,
        precise_emission_type:
          x.profile.economics.consensus_and_emission.supply
            .precise_emission_type,
        is_capped_supply:
          x.profile.economics.consensus_and_emission.supply.is_capped_supply,
        max_supply:
          x.profile.economics.consensus_and_emission.supply.max_supply,
        general_consensus_mechanism:
          x.profile.economics.consensus_and_emission.consensus
            .general_consensus_mechanism,
        technology_details: x.profile.technology.overview.technology_details,
        governance_details: x.profile.governance.governance_details,
      };
      return formatted;
    });
  }

  //  Upserts Messari data onto MongoDB
  async postMessariData(body: MessariSchema[]) {
    return await this.upsert(body);
  }

  async upsert(body: MessariSchema[]) {
    return await this.MessariModel.bulkWrite(
      body.map((body) => ({
        updateOne: {
          filter: {
            name: body.name,
          },
          update: body,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      })) as any,
    );
  }

  // Reads Messari data based on input parameters (symbol, getAll)
  async readMessariData(
    symbol: string,
    getAll: boolean,
  ): Promise<MessariDataDto[]> {
    if (getAll) {
      let array: MessariDataDto[] = [];
      for (var pagenumber = 1; pagenumber < 3; pagenumber++) {
        const options = {
          method: 'GET',
          url: 'https://data.messari.io/api/v2/assets',
          params: {
            page: pagenumber,
            limit: 500,
          },
        };
        const resp: { data: MessariDataDto[] } = await axios
          .request(options)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            return error;
          });
        array = array.concat(resp.data);
      }
      return array;
    } else {
      const options = {
        method: 'GET',
        url: `https://data.messari.io/api/v2/assets/${symbol}/profile`,
      };
      const resp: { data: MessariDataDto } = await axios
        .request(options)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return error;
        });
      return [resp.data];
    }
  }

  // getAll boolean = true -> returns all Messari data
  async readAll() {
    const messariResult = await this.readMessariData(null, true);
    return this.formatMessari(messariResult);
  }

  // symbol = string -> returns specific token Messari data
  async returnAssetData(symbol: string) {
    const messariResult = await this.readMessariData(symbol, false);
    return messariResult;
  }

  async readAsset(symbol: string) {
    const symbolmessariResult = await this.returnAssetData(symbol);
    return this.formatMessari(symbolmessariResult);
  }
}
