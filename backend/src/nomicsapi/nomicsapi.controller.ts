import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NomicsapiService } from './nomicsapi.service';

@Controller('cryptodata')
export class NomicsapiController {
  constructor(private readonly nomicsapiService: NomicsapiService) {}

  @Get('max/:coinid')
  @ApiTags('History')
  getmaxHistory(@Param('coinid') coinid: string) {
    return this.nomicsapiService.getmaxHistory({ coinid });
  }

  @Get('3y/:coinid')
  @ApiTags('History')
  get3yHistory(@Param('coinid') coinid: string) {
    return this.nomicsapiService.get3yHistory({ coinid });
  }

  @Get('1y/:coinid')
  @ApiTags('History')
  get1yHistory(@Param('coinid') coinid: string) {
    return this.nomicsapiService.get1yHistory({ coinid });
  }

  @Get('30d/:coinid')
  @ApiTags('History')
  get30dHistory(@Param('coinid') coinid: string) {
    return this.nomicsapiService.get30dHistory({ coinid });
  }

  @Get('7d/:coinid')
  @ApiTags('History')
  get7dHistory(@Param('coinid') coinid: string) {
    return this.nomicsapiService.get7dHistory({ coinid });
  }
  @Get('24h/:coinid')
  @ApiTags('History')
  get24hHistory(@Param('coinid') coinid: string) {
    return this.nomicsapiService.get24hHistory({ coinid });
  }
  @Get('website/:coinid')
  @ApiTags('Coin Data')
  getWebsites(@Param('coinid') coinid: string) {
    return this.nomicsapiService.getWebsites(coinid);
  }
  @Get('global')
  @ApiTags('Coin Data')
  getGlobal() {
    return this.nomicsapiService.getGlobal();
  }
}
