import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MessariController } from './messari.controller';
import { MessariService } from './messari.service';
import { MessariSchema, MessariDataSchema } from './schema/messari.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: MessariSchema.name, schema: MessariDataSchema },
    ]),
  ],
  controllers: [MessariController],
  providers: [MessariService],
})
export class MessariModule {}
