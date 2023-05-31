import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NomicsapiController } from './nomicsapi.controller';
import { NomicsapiService } from './nomicsapi.service';
import { Nomics, NomicsSchema } from './schema/nomicsapi.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Nomics.name, schema: NomicsSchema }]),
    HttpModule,
  ],
  controllers: [NomicsapiController],
  providers: [NomicsapiService],
})
export class NomicsapiModule {}
