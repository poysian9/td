import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NomicsCryptoData,
  NomicsCryptoDataSchema,
} from './schema/nomicscryptodata.schema';
import { NomicsCryptoDataController } from './nomicscryptodata.controller';
import { NomicsCryptoDataService } from './nomicscryptodata.service';

import { ScheduleModule } from '@nestjs/schedule';
import { CsvModule } from 'src/csv/csv.module';
import { CSV, CSVSchema } from 'src/csv/schema/csv.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: NomicsCryptoData.name, schema: NomicsCryptoDataSchema },
      { name: CSV.name, schema: CSVSchema },
    ]),
    HttpModule,
    CsvModule,
  ],
  controllers: [NomicsCryptoDataController],
  providers: [NomicsCryptoDataService],
})
export class NomicsCryptoDataModule {}
