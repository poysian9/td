import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdviceController } from './advice.controller';
import { AdviceService } from './advice.service';
import { adviceCSV, adviceCSVSchema } from './schema/advice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: adviceCSV.name, schema: adviceCSVSchema },
    ]),
  ],
  controllers: [AdviceController],
  providers: [AdviceService],
})
export class adviceModule {}
