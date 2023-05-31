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
  @ApiTags('Coins')
  updatenomicsdata() {
    return this.nomicscryptodataService.updatenomicsdata();
  }

  @Get('coinid')
  @ApiResponse({
    type: [NomicsCryptoData],
    description: 'All token data from nomics',
  })
  @ApiTags('Coins')
  async readAll() {
    return await this.nomicscryptodataService.readAll();
  }

  @Get('coinid/:id')
  @ApiResponse({
    type: NomicsCryptoData,
    description: 'A tokens data from nomics',
  })
  @ApiTags('Coins')
  async readCurrency(@Param('id') id: string) {
    return await this.nomicscryptodataService.readCurrency(id);
  }

  @Get('biggestdailygainer')
  @ApiResponse({
    type: [NomicsCryptoData],
    description: 'Biggest Gains Daily',
  })
  @ApiTags('Coins')
  async biggestDailyGainer() {
    return await this.nomicscryptodataService.biggestDailyGainer();
  }

  @Get('biggestweeklygainer')
  @ApiResponse({
    type: [NomicsCryptoData],
    description: 'Biggest Gainers weekly',
  })
  @ApiTags('Coins')
  async biggestWeeklyGainer() {
    return await this.nomicscryptodataService.biggestWeeklyGainer();
  }

  @Get('coins/:fiat')
  @ApiTags('FIAT')
  updatefiatnomics(@Param('fiat') fiat: string) {
    return this.nomicscryptodataService.updatefiatnomics(fiat);
  }

  @Get('merge')
  @ApiResponse({
    type: [NomicsCryptoData],
    description: 'Merge Database and nomics Data',
  })
  @ApiTags('Coins')
  async merge() {
    return await this.nomicscryptodataService.merge();
  }
}
