import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { CsvModule } from 'src/csv/csv.module';

import { CoingeckoapiController } from './coingeckoapi.controller';
import { CoingeckoapiService } from './coingeckoapi.service';
import { coingecko, coingeckoSchema } from './schema/coingeckoapi.schema';

@Module({
  imports: [
    CsvModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: coingecko.name, schema: coingeckoSchema },
    ]),
    HttpModule,
  ],
  controllers: [CoingeckoapiController],
  providers: [CoingeckoapiService],
})
export class CoingeckoapiModule {}
