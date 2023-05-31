import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { CSV, CSVSchema } from './schema/csv.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: CSV.name, schema: CSVSchema }])],
  controllers: [CsvController],
  providers: [CsvService],
  exports: [CsvService],
})
export class CsvModule {}
