import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';

import { adviceCSVDocument, adviceCSV } from './schema/advice.schema';

interface adviceCSVRow {
  Market_or_Asset: string;
  Specificity: string;
  CB_Listed: string;
  Regulatory_Req: string;
  Facts_Data: string;
  Opinions: string;
  Risk_Mitigation_Trade_Recommendations: string;
  General_Advice_RG244: string;
  Personal_Advice_RG244: string;
}

@Injectable()
export class AdviceService {
  constructor(
    @InjectModel(adviceCSV.name)
    private cryptoModel: Model<adviceCSVDocument>,
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

  formatCSV(rows: adviceCSVRow[]) {
    return rows.map((x) => {
      return {
        Market_or_Asset: x.Market_or_Asset,
        Specificity: x.Specificity,
        CB_Listed: x.CB_Listed,
        Regulatory_Req: x.Regulatory_Req,
        Facts_Data: x.Facts_Data,
        Opinions: x.Opinions,
        Risk_Mitigation_Trade_Recommendations:
          x.Risk_Mitigation_Trade_Recommendations,
        General_Advice_RG244: x.General_Advice_RG244,
        Personal_Advice_RG244: x.Personal_Advice_RG244,
      };
    });
  }

  async uploadCSV() {
    const rows: adviceCSVRow[] = this.readCSV(
      '/Users/jlow/Development/Asset-Database/backend/src/advice/ResearchMatrix.csv',
      [
        'Market_or_Asset',
        'Specificity',
        'CB_Listed',
        'Regulatory_Req',
        'Facts_Data',
        'Opinions',
        'Risk_Mitigation_Trade_Recommendations',
        'General_Advice_RG244',
        'Personal_Advice_RG244',
      ],
    );

    const formatted: adviceCSV[] = this.formatCSV(rows);

    // return this.create(formatted);
    return this.upsert(formatted);
  }

  async create(docs: adviceCSV[]) {
    return await this.cryptoModel.insertMany(docs);
  }

  async upsert(docs: adviceCSV[]) {
    return await this.cryptoModel.bulkWrite(
      docs.map((doc) => ({
        updateOne: {
          filter: {
            Market_or_Asset: doc.Market_or_Asset,
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
}
