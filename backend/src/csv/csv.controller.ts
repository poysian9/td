import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CsvService } from './csv.service';
import { CSVDto } from './dto/crypto-ids.dto';
import { CSV } from './schema/csv.schema';

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

  @Get('nomicsid/:nomicsid')
  @ApiOperation({
    description: 'Get a specific crypto by nomicsid',
  })
  @ApiResponse({
    type: CSV,
    description: 'Crypto details',
  })
  @ApiTags('Crypto CSV')
  readNomicsid(@Param('nomicsid') token: string) {
    return this.cryptoService.readNomicsid(token);
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

  @Get('status/:statuses')
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

  @Get('watchlist/:watchlist')
  @ApiOperation({
    description: 'Get cryptos by watchlist',
  })
  @ApiResponse({
    type: [CSV],
    description: 'Crypto details by watchlist',
  })
  @ApiTags('Crypto CSV')
  async readWatchlist(@Param('watchlist') token: string) {
    return await this.cryptoService.readWatchlist(token);
  }

  @Get('status')
  @ApiOperation({
    description: 'Get cryptos by status',
  })
  @ApiResponse({
    type: CSV,
    description: 'Get cryptos by status',
  })
  @ApiTags('statuses')
  async assetStatuses() {
    return await this.cryptoService.assetStatuses();
  }

  // @Put(':token')
  // @ApiOperation({
  //   description: 'Update a specific crypto price',
  // })
  // @ApiResponse({
  //   type: CSV,
  //   description: 'A crypto price',
  // })
  // @ApiTags('Crypto CSV')
  // update(@Param('token') token: string, @Body() body: CSVDto) {
  //   return this.cryptoService.update(token, body);
  // }

  // @Delete(':token')
  // @ApiOperation({
  //   description: 'Delete a specific crypto price',
  // })
  // @ApiResponse({
  //   type: CSV,
  //   description: 'A crypto price',
  // })
  // @ApiTags('Crypto CSV')
  // delete(@Param('token') token: string) {
  //   return this.cryptoService.delete(token);
  // }
}
