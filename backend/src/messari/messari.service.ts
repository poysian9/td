import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom, map, Observable, toArray } from 'rxjs';
import { CSV, CSVDocument } from 'src/csv/schema/csv.schema';
import { MessariDataDto } from './dto/messari.dto';
import { Messari, MessariDocument } from './schema/messari.schema';

@Injectable()
export class MessariService {
  private MESSARI_API_KEY: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,

    @InjectModel(CSV.name)
    private cryptoModel: Model<CSVDocument>,  

    @InjectModel(Messari.name)
    private messariModel: Model<MessariDocument>,
  ) {
    this.MESSARI_API_KEY = this.configService.get<string>('MESSARI_API_KEY');

  }

  formatMessari(rows: MessariDataDto[]): Messari[] {
    return rows.map((x) => {
      const formatted: Messari = {
        symbol: x.data.symbol,
        name: x.data.name,
        id: x.data.slug,
        category: x.data.profile.general.overview.category,
        sector: x.data.profile.general.overview.sector,
        project_details: x.data.profile.general.overview.project_details,
        token_type: x.data.profile.economics.token.token_type,
        token_usage: x.data.profile.economics.token.token_usage,
        token_usage_details: x.data.profile.economics.token.token_usage_details,
        technology_details:
          x.data.profile.technology.overview.technology_details,
        general_consensus_mechanism:
          x.data.profile.economics.consensus_and_emission.consensus
            .general_consensus_mechanism,
      };
      return formatted;
    });
  }

  async updateMessariData(){
    try {
      const allDocs = await this.cryptoModel.find({}, ['coingeckoid']).lean().exec();
      const allIds = allDocs.map((doc) => doc.coingeckoid);
      const formattedDataArray: Messari[]= [];

      for (const id of allIds) {
        try {
          const rows: Observable<MessariDataDto[]> = await this.httpService
            .get(
              `https://data.messari.io/api/v2/assets/${id}/profile`, {
              headers: {
                'x-messari-api-key': this.MESSARI_API_KEY,
              },
            })
            .pipe(map((response) => response.data), toArray());
            
          const formattedData = this.formatMessari(
            await lastValueFrom(rows) as MessariDataDto[],
          );

          formattedDataArray.push(...formattedData);
        } catch (error) {
          formattedDataArray.push({
            symbol: "",
            name: "",
            id: id,
            category: "",
            sector: "",
            project_details: "",
            token_type: "",
            token_usage: "",
            token_usage_details: "",
            technology_details: "",
            general_consensus_mechanism: ""
          }); // Push empty strings if there's an error
        }
      }
      this.upsert(formattedDataArray);
      return formattedDataArray;

    } catch (error) {
      // Handle errors here
      throw error;
    }
  }

  async upsert(body: Messari[]) {
    return await this.messariModel.bulkWrite(
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

  async readAsset(id: string) {
    return await this.messariModel.findOne({ id }).lean().exec();
  }

  async readAll() {
    return await this.messariModel.find().lean().exec();
  }  
}
