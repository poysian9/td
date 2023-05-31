import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CoingeckoapiModule } from './coingeckoapi/coingeckoapi.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NomicsapiModule } from './nomicsapi/nomicsapi.module';
import { CsvModule } from './csv/csv.module';
import { adviceModule } from './advice/advice.module';
import { NomicsCryptoDataModule } from './nomicscryptodata/nomicscryptodata.module';
import { MessariModule } from './messari/messari.module';

// Put the MongoDB URI in between the .forRoot() Brackets.
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    NomicsapiModule,
    CoingeckoapiModule,
    CsvModule,
    adviceModule,
    ConfigModule.forRoot({ isGlobal: true }),
    NomicsCryptoDataModule,
    MessariModule,
  ],
})
export class AppModule {}
