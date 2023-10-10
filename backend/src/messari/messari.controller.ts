import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessariService } from './messari.service';
import { Messari } from './schema/messari.schema';

@Controller('messari')
export class MessariController {
  constructor(private readonly messariService: MessariService,
    ) {}

  @Post('updatemessaridata')
  @ApiResponse({
    type: [Messari],
    description: 'Messari data of all assets to database',
  })
  @ApiTags('Messari')
  async updateMessariData() {
    return await this.messariService.updateMessariData();
  }

  @Get('assets')
  @ApiResponse({
    type: [Messari],
    description: 'List of all assets and their metrics and profiles',
  })
  @ApiTags('Messari')
  async readAll() {
    return await this.messariService.readAll();
  }

  @Get('assets/:id')
  @ApiResponse({
    type: Messari,
    description: 'Asset profile',
  })
  @ApiTags('Messari')
  async readAsset(@Param('id') id: string) {
    return await this.messariService.readAsset(id);
  }
}
