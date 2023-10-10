import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NomicsapiService } from './nomicsapi.service';

@Controller('cryptodata')
export class NomicsapiController {
  constructor(private readonly nomicsapiService: NomicsapiService) {}

  @Get('max/:coinid')
  @ApiTags('Coin History')
  getmaxHistory(@Param('coinid') coinid: string) {
    return this.nomicsapiService.getmaxHistory({ coinid });
  }

  @Get('1y/:coinid')
  @ApiTags('Coin History')
  get1yHistory(@Param('coinid') coinid: string) {
    return this.nomicsapiService.get1yHistory({ coinid });
  }

  @Get('30d/:coinid')
  @ApiTags('Coin History')
  get30dHistory(@Param('coinid') coinid: string) {
    return this.nomicsapiService.get1mHistory({ coinid });
  }

  @Get('7d/:coinid')
  @ApiTags('Coin History')
  get7dHistory(@Param('coinid') coinid: string) {
    return this.nomicsapiService.get7dHistory({ coinid });
  }

  @Get('24h/:coinid')
  @ApiTags('Coin History')
  get24hHistory(@Param('coinid') coinid: string) {
    return this.nomicsapiService.get1dHistory({ coinid });
  }

  @Get('global')
  @ApiTags('Global Data')
  getGlobal() {
    return this.nomicsapiService.getGlobal();
  }
  
  @Get('readGlobal')
  @ApiTags('Global Data')
  readGlobal() {
    return this.nomicsapiService.readGlobal();
  }

}
