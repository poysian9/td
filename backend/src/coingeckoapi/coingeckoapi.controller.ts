import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoingeckoapiService } from './coingeckoapi.service';

@Controller('marketdepth')
export class CoingeckoapiController {
  constructor(private readonly coingeckoapiService: CoingeckoapiService) {}

  @Get(':coinid')
  @ApiTags('Market Depth')
  async getcoingeckomarketdepth(@Param('coinid') coinid: string) {
    return await this.coingeckoapiService.getcoingeckomarketdepth({ coinid });
  }
}
