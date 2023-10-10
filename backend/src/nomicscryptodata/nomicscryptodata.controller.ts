import { Controller, Get, Post, Param, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NomicsCryptoDataService } from './nomicscryptodata.service';
import { NomicsCryptoData } from './schema/nomicscryptodata.schema';

@Controller('nomicsdata')
export class NomicsCryptoDataController {
  constructor(
    private readonly nomicscryptodataService: NomicsCryptoDataService,
  ) {}

  @Post('updatecryptodata')
  @ApiTags('Coin Data')
  async updatenomicsdata() {
    return this.nomicscryptodataService.updatenomicsdata();
  }

  @Get('coinid')
  @ApiResponse({
    type: [NomicsCryptoData],
    description: 'All token data from coingecko',
  })
  @ApiTags('Coin Data')
  async readAll() {
    return await this.nomicscryptodataService.readAll();
  }

  @Get('coinid/:id')
  @ApiResponse({
    type: NomicsCryptoData,
    description: "A single token's data from coingecko",
  })
  @ApiTags('Coin Data')
  async readCurrency(@Param('id') id: string) {
    return await this.nomicscryptodataService.readCurrency(id);
  }

  @Get('biggestdailygainer')
  @ApiResponse({
    type: [NomicsCryptoData],
    description: 'Biggest Gains Daily',
  })
  @ApiTags('Coin Data')
  async biggestDailyGainer() {
    return await this.nomicscryptodataService.biggestDailyGainer();
  }

  @Get('biggestweeklygainer')
  @ApiResponse({
    type: [NomicsCryptoData],
    description: 'Biggest Gainers Weekly',
  })
  @ApiTags('Coin Data')
  async biggestWeeklyGainer() {
    return await this.nomicscryptodataService.biggestWeeklyGainer();
  }

  // @Get('coins/:fiat')
  // @ApiTags('FIAT')
  // updatefiatnomics(@Param('fiat') fiat: string) {
  //   return this.nomicscryptodataService.updatefiatnomics(fiat);
  // }

  @Get('merge')
  @ApiResponse({
    type: [NomicsCryptoData],
    description: 'Merge Database and nomics Data',
  })
  @ApiTags('Coin Data')
  async merge() {
    return await this.nomicscryptodataService.merge();
  }
}
