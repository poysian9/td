import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CsvService } from './csv.service';
import { CSV } from './schema/csv.schema';

class updateId {
  coingeckoid: string;
}

@Controller('csv')
export class CsvController {
  constructor(private readonly cryptoService: CsvService) {}

  @Post('upload')
  @ApiOperation({
    description: 'Upload a CSV of database and ids',
  })
  @ApiResponse({
    type: [CSV],
    description: 'The crypto database and ids uploaded',
  })
  @ApiTags('Crypto CSV')
  create() {
    return this.cryptoService.uploadCSV();
  }

  @Get('')
  @ApiOperation({
    description: 'Get all crypto database information',
  })
  @ApiResponse({
    type: [CSV],
    description: 'All crypto database information',
  })
  @ApiTags('Crypto CSV')
  readAll() {
    return this.cryptoService.readAll();
  }

  @Get('name/:name')
  @ApiOperation({
    description: 'Get a specific crypto by name',
  })
  @ApiResponse({
    type: CSV,
    description: 'Crypto details',
  })
  @ApiTags('Crypto CSV')
  readName(@Param('name') token: string) {
    return this.cryptoService.readName(token);
  }

  @Get('coingeckoid/:coingeckoid')
  @ApiOperation({
    description: 'Get cryptos by coingeckoid',
  })
  @ApiResponse({
    type: [CSV],
    description: 'Crypto details by coingeckoid',
  })
  @ApiTags('Crypto CSV')
  async readCoingeckoid(@Param('coingeckoid') token: string) {
    return await this.cryptoService.readCoingeckoid(token);
  }
  @Get('ticker/:ticker')
  @ApiOperation({
    description: 'Get cryptos by ticker',
  })
  @ApiResponse({
    type: [CSV],
    description: 'Crypto details by ticker',
  })
  @ApiTags('Crypto CSV')
  async readTicker(@Param('ticker') token: string) {
    return await this.cryptoService.readTicker(token);
  }

  @Get('statuses/:statuses')
  @ApiOperation({
    description: 'Get crypto by status',
  })
  @ApiResponse({
    type: CSV,
    description: 'A crypto status',
  })
  @ApiTags('Crypto CSV')
  async readStatus(@Param('statuses') token: string) {
    return await this.cryptoService.readStatus(token);
  }

  @Get('sector/:sector')
  @ApiOperation({
    description: 'Get cryptos by sector',
  })
  @ApiResponse({
    type: [CSV],
    description: 'Crypto details by sector',
  })
  @ApiTags('Crypto CSV')
  async readSector(@Param('sector') token: string) {
    return await this.cryptoService.readSector(token);
  }

  @Get('status')
  @ApiOperation({
    description: 'Get cryptos by status',
  })
  @ApiResponse({
    type: CSV,
    description: 'Get cryptos by status',
  })
  @ApiTags('Crypto CSV')
  async assetStatuses() {
    return await this.cryptoService.assetStatuses();
  }

  @Put('update/:coingeckoid')
  @ApiOperation({
    description: 'Update a specific crypto id',
  })
  @ApiResponse({
    type: CSV,
    description: 'A crypto id',
  })
  @ApiTags('Crypto CSV')
  updateCoingeckoid(
    @Param('coingeckoid') coingeckoid: string, 
    @Body() body: CSV) {
    return this.cryptoService.updateCoingeckoid(coingeckoid, body);
  }

  @Delete('delete/:coingeckoid')
  @ApiOperation({
    description: 'Delete a specific crypto from the database',
  })
  @ApiResponse({
    type: CSV,
    description: 'A crypto id',
  })
  @ApiTags('Crypto CSV')
  delete(@Param('coingeckoid') token: string) {
    return this.cryptoService.delete(token);
  }
}
