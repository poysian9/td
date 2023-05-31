import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessariService } from './messari.service';
import { MessariSchema } from './schema/messari.schema';

@Controller('messari')
export class MessariController {
  constructor(private readonly messariService: MessariService) {}

  @Get('allmessaridata')
  @ApiOperation({
    description: 'Get Messari data of all assets to database',
  })
  @ApiResponse({
    type: [MessariSchema],
    description: 'Messari data of all assets to database',
  })
  @ApiTags('Messari')
  async postMessariData() {
    const messariResult = await this.messariService.readAll();
    return this.messariService.postMessariData(messariResult);
  }

  @Get('api/v2/assets')
  @ApiOperation({
    description: 'Get a list of all assets and their metrics and profiles',
  })
  @ApiResponse({
    type: [MessariSchema],
    description: 'List of all assets and their metrics and profiles',
  })
  @ApiTags('Messari')
  async readAll() {
    return await this.messariService.readAll();
  }

  @Get('api/v2/assets/:symbol/profile')
  @ApiOperation({
    description: 'Get profile for an asset.',
  })
  @ApiResponse({
    type: [MessariSchema],
    description: 'Asset profile',
  })
  @ApiTags('Messari')
  async readAsset(@Param('symbol') symbol: string) {
    return await this.messariService.readAsset(symbol);
  }
}
