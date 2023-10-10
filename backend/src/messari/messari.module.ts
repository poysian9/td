import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MessariController } from './messari.controller';
import { MessariService } from './messari.service';
import { Messari, MessariDataSchema } from './schema/messari.schema';
import { CSV, CSVSchema } from 'src/csv/schema/csv.schema';
import { HttpModule } from '@nestjs/axios';
import { CsvModule } from 'src/csv/csv.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Messari.name, schema: MessariDataSchema },
      { name: CSV.name, schema: CSVSchema },
    ]),
    HttpModule,
    CsvModule,
  ],
  controllers: [MessariController],
  providers: [MessariService],
})
export class MessariModule {}
