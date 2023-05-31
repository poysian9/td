import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoingeckoapiService } from './coingeckoapi.service';
import { coinid } from './dto/coingeckoapi.dto';

@Controller('marketdepth')
export class CoingeckoapiController {
  constructor(private readonly coingeckoapiService: CoingeckoapiService) {}

  // @Get('binance/:coinid')
  // @ApiTags('Market Data')
  // getbinanceData(@Param('coinid') coinid: string) {
  //   return this.coingeckoapiService.getbinanceData({ coinid });
  // }
  // @Get('ftx/:coinid')
  // @ApiTags('Market Data')
  // getftxData(@Param('coinid') coinid: string) {
  //   return this.coingeckoapiService.getftxData({ coinid });
  // }

  // @Get(':coinid')
  // @ApiTags('Market Data')
  // async getdepthData(@Param('coinid') coinid: string) {
  //   return await this.coingeckoapiService.getdepthData({ coinid });
  // }

  @Get(':coinid')
  @ApiTags('Market Data')
  async getcoingeckomarketdepth(@Param('coinid') coinid: string) {
    return await this.coingeckoapiService.getcoingeckomarketdepth({ coinid });
  }
}
