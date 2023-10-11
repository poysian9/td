import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';
import { CSVDto } from './dto/csv.dto';
import { CSVDocument, CSV } from './schema/csv.schema';

@Injectable()
export class CsvService {
  constructor(
    @InjectModel(CSV.name)
    private cryptoModel: Model<CSVDocument>,
  ) {}

  readCSV(filePath: string, headers: string[]): any[] {
    const csvFilePath = path.resolve(filePath);
    const data = fs.readFileSync(csvFilePath, 'utf8');
    const linesExceptFirst = data.split('\r\n').slice(1);
    const linesArr = linesExceptFirst.map((line) => line.split(','));
    const processed = linesArr.map((x) => {
      const row: any = {};
      for (const [index, header] of Object.entries(headers)) {
        row[header] = x[index];
      }
      return row;
    });

    return processed;
  }

  formatCSV(rows: CSVDto[]): CSV[] {
    return rows.map((x) => {
      return {
        name: x.name,
        ticker: x.ticker,
        nomicsid: x.nomicsid,
        coingeckoid: x.coingeckoid,
        statuses: x.statuses,
        statusreasoning: x.statusreasoning,
        primarysector: x.primarysector,
        secondarysector: x.secondarysector,
        factsdata: x.facts_data,
        opinions: x.opinions,
        rmtr: x.rm_tr,
        format: x.format,
        coingeckolink: x.coingeckolink,
        assetdescription: x.assetdescription,
        tokendescription: x.tokendescription,
        watchlist: x.watchlist,
        messari: x.messarilink,
      };
    });
  }

  async uploadCSV() {
    const rows: CSVDto[] = this.readCSV('./src/csv/DatabaseCSV.csv', 
    [
      'name',
      'ticker',
      'nomicsid',
      'coingeckoid',
      'statuses',
      'statusreasoning',
      'primarysector',
      'secondarysector',
      'facts_data',
      'opinions',
      'rm_tr',
      'format',
      'coingeckolink',
      'assetdescription',
      'tokendescription',
      'watchlist',
      'messarilink',
    ]);

    const formatted: CSV[] = this.formatCSV(rows);

    // return this.create(formatted);
    return this.create(formatted);
  }

  async create(docs: CSV[]) {
    return await this.cryptoModel.create(docs);
  }

  async upsert(docs: CSV[]) {
    return await this.cryptoModel.bulkWrite(
      docs.map((doc) => ({
        updateOne: {
          filter: {
            name: doc.name,
          },
          update: doc,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      })) as any,
    );
  }

  async readAll() {
    return await this.cryptoModel.find().lean().exec();
  }

  async readName(name: string) {
    return await this.cryptoModel.findOne({ name }).lean().exec();
  }

  async readCoingeckoid(coingeckoid: string) {
    return await this.cryptoModel.findOne({ coingeckoid }).lean().exec();
  }

  async readTicker(ticker: string) {
    return await this.cryptoModel.findOne({ ticker }).lean().exec();
  }

  async readStatus(statuses: string) {
    return await this.cryptoModel.find({ statuses }).lean().exec();
  }

  async readSector(primarysector: string) {
    return await this.cryptoModel.find({ primarysector }).lean().exec();
  }

  async updateCoingeckoid(coingeckoid: string, updatedProperties: any ) {
    const updateObject = {
      $set: updatedProperties,
    };
  
    return await this.cryptoModel
      .findOneAndUpdate({ coingeckoid }, updateObject, { new: true })
      .lean()
      .exec();
  };

  async delete(name: string) {
    return await this.cryptoModel.findOneAndDelete({ name }).lean().exec();
  }

  async assetStatuses() {
    const allDocs = await this.cryptoModel.find({}, ['statuses']).lean().exec();
    const allStatus = allDocs.map((doc) => doc.statuses);
    const assetStatuses = [
      allStatus.filter((x) => x == 'Active').length,
      allStatus.filter((x) => x == 'Sell_Only').length,
      allStatus.filter((x) => x == 'Delisted').length,
    ];
    return assetStatuses;
  }
}
