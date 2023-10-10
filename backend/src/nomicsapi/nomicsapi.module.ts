import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NomicsapiController } from './nomicsapi.controller';
import { NomicsapiService } from './nomicsapi.service';
import { GlobalData, GlobalDataSchema } from './schema/globalData.schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
                               { name: GlobalData.name, schema: GlobalDataSchema }
                              ]),
    HttpModule,
  ],
  controllers: [NomicsapiController],
  providers: [NomicsapiService],
})
export class NomicsapiModule {}
